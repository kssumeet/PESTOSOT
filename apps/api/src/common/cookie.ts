import type { CookieOptions, Request } from 'express';

export const ADMIN_COOKIE = 'pst_admin';
export const CUSTOMER_COOKIE = 'pst_customer';

/** httpOnly auth-cookie options. SameSite=Strict + the CORS origin lock together
 * neutralise CSRF; Secure is enabled in production (HTTPS). */
export function authCookieOptions(): CookieOptions {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    sameSite: 'strict',
    secure: isProd,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
}

function parseCookies(header?: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx > -1) {
      const key = part.slice(0, idx).trim();
      out[key] = decodeURIComponent(part.slice(idx + 1).trim());
    }
  }
  return out;
}

/** passport-jwt extractor that reads the JWT from a named cookie. */
export function cookieExtractor(name: string) {
  return (req: Request): string | null => {
    const cookies = parseCookies(req.headers?.cookie);
    return cookies[name] ?? null;
  };
}
