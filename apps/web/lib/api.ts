import type { LeadInput, LeadResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Submit a lead to the NestJS backend. */
export async function submitLead(input: LeadInput): Promise<LeadResponse> {
  // Strip empty optional strings so the API's whitelist validation is happy.
  const payload = Object.fromEntries(
    Object.entries(input).filter(([, v]) => v !== "" && v !== undefined),
  );

  let res: Response;
  try {
    res = await fetch(`${API_URL}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "website-homepage", ...payload }),
    });
  } catch {
    throw new ApiError(
      "We couldn't reach our servers. Please call or WhatsApp us instead.",
      0,
    );
  }

  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const data = (await res.json()) as { message?: string | string[] };
      if (data.message) {
        message = Array.isArray(data.message) ? data.message[0] : data.message;
      }
    } catch {
      /* ignore parse errors */
    }
    throw new ApiError(message, res.status);
  }

  return (await res.json()) as LeadResponse;
}
