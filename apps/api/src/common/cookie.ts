import type { CookieOptions, Request } from 'express';

export const ADMIN_COOKIE = 'pst_admin';
export const CUSTOMER_COOKIE = 'pst_customer';

/**
 * httpOnly auth-cookie options.
 *
 * SameSite + the CORS origin lock together neutralise CSRF.
 * - Same domain (e.g. pestosot.com + api.pestosot.com via COOKIE_DOMAIN): keep
 *   the default `strict`/`lax` — most secure.
 * - Different domains (e.g. *.vercel.app frontend + *.railway.app API): set
 *   `COOKIE_SAMESITE=none` so the browser sends the cookie cross-site (requires
 *   Secure, which is forced on). CORS still restricts who can call the API.
 */
export function authCookieOptions(): CookieOptions {
  const isProd = process.env.NODE_ENV === 'production';
  const sameSite = (process.env.COOKIE_SAMESITE as 'strict' | 'lax' | 'none' | undefined) ?? 'strict';
  return {
    httpOnly: true,
    sameSite,
    secure: isProd || sameSite === 'none',
    domain: process.env.COOKIE_DOMAIN || undefined,
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
