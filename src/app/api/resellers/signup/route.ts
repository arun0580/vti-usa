import { NextResponse } from "next/server";
import { proxyToApi } from "@/lib/reseller-auth/server";
import {
  buildVerificationUrl,
  sendResellerVerificationEmail,
} from "@/lib/reseller-auth/verification-email";
import { sendResellerSignupAdminNotification } from "@/lib/reseller-auth/signup-admin-notification";
import type { ResellerSignupPayload } from "@/lib/reseller-auth/types";
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

  const upstream = await proxyToApi("/api/resellers/signup", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.success) {
    return NextResponse.json(data ?? { success: false, error: "Signup failed" }, {
      status: upstream.status || 500,
    });
  }

  const reseller = data.data?.reseller as {
    id: string;
    email: string;
    firstName: string;
  } | undefined;
  const verificationToken = data.data?.verificationToken as string | undefined;
  const baseUrl = deriveBaseUrl(request);

  if (reseller && verificationToken) {
    const verifyUrl = buildVerificationUrl(verificationToken, baseUrl);
    const emailResult = await sendResellerVerificationEmail({
      to: reseller.email,
      firstName: reseller.firstName,
      verifyUrl,
      baseUrl,
    });

    if (!emailResult.ok) {
      console.error("[reseller signup] Verification email failed:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          error:
            "Account was created but we could not send the verification email. Use resend verification or contact support.",
          code: "EMAIL_SEND_FAILED",
        },
        { status: 503 },
      );
    }
  }

  const signupPayload = body as ResellerSignupPayload;
  const adminEmailResult = await sendResellerSignupAdminNotification({
    signup: {
      fullName: signupPayload.fullName,
      companyName: signupPayload.companyName,
      email: signupPayload.email,
      phone: signupPayload.phone,
      city: signupPayload.city,
      state: signupPayload.state,
      businessType: signupPayload.businessType,
      about: signupPayload.about,
    },
    baseUrl,
    resellerId: reseller?.id,
  });

  if (!adminEmailResult.ok) {
    console.error(
      "[reseller signup] Admin notification failed:",
      adminEmailResult.error,
    );
  }

  return NextResponse.json({
    success: true,
    message: data.message,
    data: {
      requiresVerification: true,
      email: reseller?.email,
    },
  });
}
