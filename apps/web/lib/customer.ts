/** Customer portal API client — talks to the NestJS customer endpoints. */

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

export interface CustomerAuthResult {
  accessToken: string;
  customer: Customer;
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

async function request<T>(path: string, token: string | null, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init?.headers,
      },
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
  return request<CustomerAuthResult>("/customer/register", null, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function loginCustomer(email: string, password: string) {
  return request<CustomerAuthResult>("/customer/login", null, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getCustomerMe(token: string) {
  return request<Customer>("/customer/me", token);
}

export function getCustomerBookings(token: string) {
  return request<Booking[]>("/customer/leads", token);
}
