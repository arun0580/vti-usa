import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  getApiBase,
  proxyToApi,
} from "@/lib/reseller-auth/server";
import {
  ADMIN_TOKEN_COOKIE,
  adminTokenCookieOptions,
} from "@/lib/admin-auth/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body", code: "BAD_REQUEST" },
      { status: 400 },
    );
  }

  let upstream: Response;
  try {
    upstream = await proxyToApi("/api/admin/signin", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("[admin signin] API unreachable at", getApiBase(), err);
    return NextResponse.json(
      {
        success: false,
        error:
          "Auth service unavailable. Set RESELLER_API_URL on the web server to your API URL.",
        code: "API_UNREACHABLE",
      },
      { status: 503 },
    );
  }

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.success) {
    return NextResponse.json(
      data ?? { success: false, error: "Signin failed", code: "SIGNIN_FAILED" },
      { status: upstream.status || 500 },
    );
  }

  const token = (data.data?.token ?? data.token) as string | undefined;
  if (!token) {
    console.error("[admin signin] API response missing token:", data);
    return NextResponse.json(
      {
        success: false,
        error: "Sign-in succeeded but no session token was returned by the API.",
        code: "NO_TOKEN",
      },
      { status: 500 },
    );
  }

  const cookieOpts = adminTokenCookieOptions(60 * 60 * 8, request);
  const response = NextResponse.json({
    success: true,
    message: data.message,
    data: { admin: data.data?.admin ?? data.admin },
  });

  response.cookies.set(ADMIN_TOKEN_COOKIE, token, cookieOpts);

  const store = await cookies();
  store.set(ADMIN_TOKEN_COOKIE, token, cookieOpts);

  return response;
}
