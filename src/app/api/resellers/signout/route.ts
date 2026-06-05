import { NextResponse } from "next/server";
import { clearServerResellerToken } from "@/lib/reseller-auth/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  await clearServerResellerToken();
  return NextResponse.json({ success: true, message: "Signed out" });
}
