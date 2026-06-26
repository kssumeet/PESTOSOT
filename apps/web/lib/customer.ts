/** Customer portal API client — authenticates via httpOnly cookie. */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string;
  serviceType: string;
  propertyType: string;
  city: string;
  locality: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string | null;
  status: string;
  createdAt: string;
}

export class CustomerApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "CustomerApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new CustomerApiError("Can't reach our servers. Please try again shortly.", 0);
  }
  if (!res.ok) {
    let message = res.statusText || "Request failed";
    try {
      const body = (await res.json()) as { message?: string | string[] };
      if (body.message) message = Array.isArray(body.message) ? body.message[0] : body.message;
    } catch {
      /* ignore */
    }
    throw new CustomerApiError(message, res.status);
  }
  return (await res.json()) as T;
}

export function registerCustomer(input: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  return request<{ customer: Customer }>("/customer/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function loginCustomer(email: string, password: string) {
  return request<{ customer: Customer }>("/customer/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logoutCustomer() {
  return request<{ ok: true }>("/customer/logout", { method: "POST" });
}

export function getCustomerMe() {
  return request<Customer>("/customer/me");
}

export function getCustomerBookings() {
  return request<Booking[]>("/customer/leads");
}
