import { NextResponse } from "next/server";
import { proxyToApi } from "@/lib/reseller-auth/server";
import {
  buildVerificationUrl,
  sendResellerVerificationEmail,
} from "@/lib/reseller-auth/verification-email";
import { deriveBaseUrl } from "@/lib/email/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body", code: "BAD_REQUEST" },
      { status: 400 },
    );
  }

  const upstream = await proxyToApi("/api/resellers/resend-verification", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.success) {
    return NextResponse.json(
      data ?? { success: false, error: "Request failed" },
      { status: upstream.status || 500 },
    );
  }

  const verificationToken = data.data?.verificationToken as string | undefined;
  const email = data.data?.email as string | undefined;
  const firstName =
    (data.data?.firstName as string | undefined)?.trim() ||
    (body as { firstName?: string })?.firstName?.trim() ||
    "there";

  if (verificationToken && email) {
    const baseUrl = deriveBaseUrl(request);
    const verifyUrl = buildVerificationUrl(verificationToken, baseUrl);
    const emailResult = await sendResellerVerificationEmail({
      to: email,
      firstName,
      verifyUrl,
    });

    if (!emailResult.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not send verification email. Try again later.",
          code: "EMAIL_SEND_FAILED",
        },
        { status: 503 },
      );
    }
  }

  return NextResponse.json({
    success: true,
    message: data.message,
  });
}
