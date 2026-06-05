import { NextResponse } from "next/server";
import { clearServerAdminToken } from "@/lib/admin-auth/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  await clearServerAdminToken();
  return NextResponse.json({ success: true });
}
