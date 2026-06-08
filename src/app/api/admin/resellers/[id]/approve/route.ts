import { NextResponse } from "next/server";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import {
  buildResellerSignInUrl,
  sendResellerApprovalEmail,
} from "@/lib/reseller-auth/approval-email";
import { deriveBaseUrl } from "@/lib/email/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const token = await getServerAdminToken();
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Not authenticated", code: "UNAUTHORIZED" },
      { status: 401 },
    );
  }

  const { id } = await context.params;
  const upstream = await proxyToAdminApi(
    `/api/admin/resellers/${id}/approve`,
    { method: "POST" },
    token,
  );
  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.success) {
    return NextResponse.json(data ?? { success: false, error: "Approval failed" }, {
      status: upstream.status || 500,
    });
  }

  const reseller = data.data?.reseller as
    | { email: string; firstName: string }
    | undefined;
  const newlyApproved = Boolean(data.data?.newlyApproved);

  if (newlyApproved && reseller?.email) {
    const baseUrl = deriveBaseUrl(request);
    const signInUrl = buildResellerSignInUrl(baseUrl);
    const emailResult = await sendResellerApprovalEmail({
      to: reseller.email,
      firstName: reseller.firstName || "there",
      signInUrl,
    });

    if (!emailResult.ok) {
      console.error("[admin approve] Approval email failed:", emailResult.error);
      return NextResponse.json({
        success: true,
        message:
          "Reseller approved, but the notification email could not be sent. Ask them to sign in at /resellers.",
        data: data.data,
        emailSent: false,
      });
    }
  }

  return NextResponse.json({
    ...data,
    emailSent: newlyApproved ? true : undefined,
  });
}
