import { NextResponse } from "next/server";
import {
  ADMIN_TOKEN_COOKIE,
  adminTokenCookieOptions,
} from "@/lib/admin-auth/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_TOKEN_COOKIE, "", {
    ...adminTokenCookieOptions(0, request),
    maxAge: 0,
  });
  return response;
}
