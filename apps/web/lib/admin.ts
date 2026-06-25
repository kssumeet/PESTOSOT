/** Admin API client — talks to the NestJS backend with a Bearer token. */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "SCHEDULED",
  "WON",
  "LOST",
  "CLOSED",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Role = "ADMIN" | "MANAGER" | "SALES" | "CONTENT" | "EDITOR";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  serviceType: string;
  propertyType: string;
  city: string;
  locality: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string | null;
  source: string;
  status: LeadStatus;
  assignedToId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadsPage {
  data: Lead[];
  total: number;
  page: number;
  limit: number;
}

export class AdminApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "AdminApiError";
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
    throw new AdminApiError("Cannot reach the API. Is the backend running on " + API_URL + "?", 0);
  }
  if (!res.ok) {
    let message = res.statusText || "Request failed";
    try {
      const body = (await res.json()) as { message?: string | string[] };
      if (body.message) message = Array.isArray(body.message) ? body.message[0] : body.message;
    } catch {
      /* ignore */
    }
    throw new AdminApiError(message, res.status);
  }
  return (await res.json()) as T;
}

export function adminLogin(email: string, password: string) {
  return request<{ accessToken: string; user: AdminUser }>("/auth/login", null, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getMe(token: string) {
  return request<AdminUser>("/auth/me", token);
}

export function getLeads(
  token: string,
  params: { status?: string; city?: string; page?: number; limit?: number } = {},
) {
  const qs = new URLSearchParams();
  if (params.status) qs.set("status", params.status);
  if (params.city) qs.set("city", params.city);
  qs.set("page", String(params.page ?? 1));
  qs.set("limit", String(params.limit ?? 20));
  return request<LeadsPage>(`/leads?${qs.toString()}`, token);
}

export function updateLeadStatus(token: string, id: string, status: LeadStatus) {
  return request<Lead>(`/leads/${id}`, token, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
