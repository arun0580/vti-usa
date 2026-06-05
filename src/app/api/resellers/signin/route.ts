import { NextResponse } from "next/server";
import {
  RESELLER_TOKEN_COOKIE,
  proxyToApi,
  tokenCookieOptions,
} from "@/lib/reseller-auth/server";

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

  const upstream = await proxyToApi("/api/resellers/signin", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.success) {
    return NextResponse.json(data ?? { success: false, error: "Signin failed" }, {
      status: upstream.status || 500,
    });
  }

  const token = data.data?.token as string | undefined;
  const response = NextResponse.json({
    success: true,
    message: data.message,
    data: { reseller: data.data.reseller },
  });

  if (token) {
    response.cookies.set(
      RESELLER_TOKEN_COOKIE,
      token,
      tokenCookieOptions(60 * 60 * 24 * 7, request),
    );
  }

  return response;
}
