import { NextResponse } from "next/server";
import {
  getServerResellerToken,
  proxyToApi,
} from "@/lib/reseller-auth/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const token = await getServerResellerToken();
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Authentication required", code: "UNAUTHORIZED" },
      { status: 401 },
    );
  }

  const upstream = await proxyToApi("/api/resellers/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await upstream.json().catch(() => null);
  return NextResponse.json(data ?? { success: false, error: "Profile unavailable" }, {
    status: upstream.status || 500,
  });
}
