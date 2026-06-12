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

  const upstream = await proxyToAdminApi("/api/admin/announcements", undefined, token);
  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.success) {
    return NextResponse.json(data ?? { success: false, error: "Request failed" }, {
      status: upstream.status || 500,
    });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const token = await getServerAdminToken();
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Not authenticated", code: "UNAUTHORIZED" },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body", code: "BAD_REQUEST" },
      { status: 400 },
    );
  }

  const upstream = await proxyToAdminApi(
    "/api/admin/announcements",
    { method: "POST", body: JSON.stringify(body) },
    token,
  );
  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.success) {
    return NextResponse.json(data ?? { success: false, error: "Create failed" }, {
      status: upstream.status || 500,
    });
  }

  return NextResponse.json(data, { status: upstream.status });
}
