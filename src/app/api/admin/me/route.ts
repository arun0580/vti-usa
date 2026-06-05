import { NextResponse } from "next/server";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const token = await getServerAdminToken();
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Not authenticated", code: "UNAUTHORIZED" },
      { status: 401 },
    );
  }

  const upstream = await proxyToAdminApi("/api/admin/me", undefined, token);
  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.success) {
    return NextResponse.json(data ?? { success: false, error: "Unauthorized" }, {
      status: upstream.status || 401,
    });
  }

  return NextResponse.json(data);
}
