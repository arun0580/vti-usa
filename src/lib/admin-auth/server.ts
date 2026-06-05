import { cookies } from "next/headers";
import { getApiBase, proxyToApi } from "@/lib/reseller-auth/server";

export const ADMIN_TOKEN_COOKIE = "admin_token";

export function adminTokenCookieOptions(maxAgeSeconds = 60 * 60 * 8) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

export async function getServerAdminToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ADMIN_TOKEN_COOKIE)?.value;
}

export async function setServerAdminToken(token: string): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_TOKEN_COOKIE, token, adminTokenCookieOptions());
}

export async function clearServerAdminToken(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_TOKEN_COOKIE);
}

export async function proxyToAdminApi(
  path: string,
  init?: RequestInit,
  token?: string,
): Promise<Response> {
  const adminToken = token ?? (await getServerAdminToken());
  return proxyToApi(path, {
    ...init,
    headers: {
      ...init?.headers,
      ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
    },
  });
}

export { getApiBase };
