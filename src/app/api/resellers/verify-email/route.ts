import { NextResponse } from "next/server";
import {
  proxyToApi,
  setServerResellerToken,
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

  const upstream = await proxyToApi("/api/resellers/verify-email", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.success) {
    return NextResponse.json(
      data ?? { success: false, error: "Verification failed" },
      { status: upstream.status || 500 },
    );
  }

  const token = data.data?.token as string | undefined;
  if (token) {
    await setServerResellerToken(token);
  }

  return NextResponse.json({
    success: true,
    message: data.message,
    data: {
      reseller: data.data.reseller,
      pendingApproval: Boolean(data.data.pendingApproval),
    },
  });
}
