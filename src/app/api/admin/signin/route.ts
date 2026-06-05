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

  const token = data.data?.token as string | undefined;
  const response = NextResponse.json({
    success: true,
    message: data.message,
    data: { admin: data.data.admin },
  });

  if (token) {
    response.cookies.set(
      ADMIN_TOKEN_COOKIE,
      token,
      adminTokenCookieOptions(),
    );
  }

  return response;
}
