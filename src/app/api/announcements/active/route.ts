import { NextResponse } from "next/server";
import { proxyToApi } from "@/lib/reseller-auth/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const upstream = await proxyToApi("/api/announcements/active");
  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.success) {
    return NextResponse.json(
      data ?? { success: false, error: "Request failed" },
      { status: upstream.status || 500 },
    );
  }

  return NextResponse.json(data);
}
