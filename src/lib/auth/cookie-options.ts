/** Whether auth cookies should use the Secure flag */
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

  return process.env.NODE_ENV === "production";
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
