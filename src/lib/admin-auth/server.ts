import { cookies } from "next/headers";
import { baseAuthCookieOptions } from "@/lib/auth/cookie-options";
import { getApiBase, proxyToApi } from "@/lib/reseller-auth/server";

export const ADMIN_TOKEN_COOKIE = "admin_token";

export function adminTokenCookieOptions(
  maxAgeSeconds = 60 * 60 * 8,
  request?: Request,
) {
  return baseAuthCookieOptions(maxAgeSeconds, request);
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
  store.delete({ name: ADMIN_TOKEN_COOKIE, path: "/" });
}

export async function proxyToAdminApi(
  path: string,
  init?: RequestInit,
  token?: string,
): Promise<Response> {
  const adminToken = token ?? (await getServerAdminToken());
  try {
    return await proxyToApi(path, {
      ...init,
      headers: {
        ...init?.headers,
        ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
      },
    });
  } catch (err) {
    console.error("[admin api] upstream unreachable at", getApiBase(), err);
    return new Response(
      JSON.stringify({
        success: false,
        error:
          "Auth service unavailable. Start the API server or check RESELLER_API_URL.",
        code: "API_UNREACHABLE",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }
}

export { getApiBase };
