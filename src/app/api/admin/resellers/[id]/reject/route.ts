import { NextResponse } from "next/server";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import { deriveBaseUrl } from "@/lib/email/service";
import { sendResellerRejectionEmail } from "@/lib/reseller-auth/rejection-email";

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
    `/api/admin/resellers/${id}/reject`,
    { method: "POST" },
    token,
  );
  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.success) {
    return NextResponse.json(data ?? { success: false, error: "Rejection failed" }, {
      status: upstream.status || 500,
    });
  }

  const reseller = data.data?.reseller as
    | { email: string; firstName: string }
    | undefined;
  const newlyRejected = Boolean(data.data?.newlyRejected);

  if (newlyRejected && reseller?.email) {
    const baseUrl = deriveBaseUrl(request);
    const emailResult = await sendResellerRejectionEmail({
      to: reseller.email,
      firstName: reseller.firstName || "there",
      baseUrl,
    });

    if (!emailResult.ok) {
      console.error("[admin reject] Rejection email failed:", emailResult.error);
      return NextResponse.json({
        success: true,
        message:
          "Reseller rejected, but the notification email could not be sent.",
        data: data.data,
        emailSent: false,
      });
    }
  }

  return NextResponse.json({
    ...data,
    emailSent: newlyRejected ? true : undefined,
  });
}
