import { NextResponse } from "next/server";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = await getServerAdminToken();
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Not authenticated", code: "UNAUTHORIZED" },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const qs = status ? `?status=${encodeURIComponent(status)}` : "";

  const upstream = await proxyToAdminApi(
    `/api/admin/resellers${qs}`,
    undefined,
    token,
  );
  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.success) {
    return NextResponse.json(data ?? { success: false, error: "Request failed" }, {
      status: upstream.status || 500,
    });
  }

  return NextResponse.json(data);
}
