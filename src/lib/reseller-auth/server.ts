import { cookies } from "next/headers";

export const RESELLER_TOKEN_COOKIE = "reseller_token";

const API_BASE =
  process.env.RESELLER_API_URL?.replace(/\/$/, "") ??
  "http://localhost:4000";

export function getApiBase(): string {
  return API_BASE;
}

/** Cookie options — httpOnly keeps JWT out of JavaScript (XSS-safe) */
export function tokenCookieOptions(maxAgeSeconds = 60 * 60 * 24 * 7) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

export async function getServerResellerToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(RESELLER_TOKEN_COOKIE)?.value;
}

export async function setServerResellerToken(token: string): Promise<void> {
  const store = await cookies();
  store.set(RESELLER_TOKEN_COOKIE, token, tokenCookieOptions());
}

export async function clearServerResellerToken(): Promise<void> {
  const store = await cookies();
  store.delete(RESELLER_TOKEN_COOKIE);
}

/** Proxy request to Express API */
export async function proxyToApi(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const url = `${getApiBase()}${path}`;
  return fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}
