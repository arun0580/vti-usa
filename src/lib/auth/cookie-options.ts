/**
 * Whether auth cookies should use the Secure flag.
 * Defaults to false so cookies are not silently dropped when nginx omits
 * X-Forwarded-Proto or the app is served over plain HTTP.
 * Set COOKIE_SECURE=true in production HTTPS once proxy headers are confirmed.
 */
export function resolveCookieSecure(request?: Request): boolean {
  if (process.env.COOKIE_SECURE === "true") return true;
  if (process.env.COOKIE_SECURE === "false") return false;

  if (request) {
    const forwarded = request.headers.get("x-forwarded-proto");
    if (forwarded) {
      return forwarded.split(",")[0]?.trim().toLowerCase() === "https";
    }
    try {
      return new URL(request.url).protocol === "https:";
    } catch {
      /* fall through */
    }
  }

  return false;
}
export function baseAuthCookieOptions(
  maxAgeSeconds: number,
  request?: Request,
): {
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  path: "/";
  maxAge: number;
} {
  return {
    httpOnly: true,
    secure: resolveCookieSecure(request),
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
