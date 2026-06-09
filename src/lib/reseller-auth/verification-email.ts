import "server-only";

import { buildEmailLogoUrl, sendEmail } from "@/lib/email/service";
import { renderTransactionalEmailHtml } from "@/lib/email/templates";

export type VerificationEmailInput = {
  to: string;
  firstName: string;
  verifyUrl: string;
  baseUrl?: string;
};

function buildVerificationHtml(input: VerificationEmailInput): string {
  return renderTransactionalEmailHtml(
    {
      subject: "Verify your VTI reseller account",
      preheader: "Confirm your email to activate your reseller portal account.",
      heading: "Verify your email",
      paragraphs: [
        `Hi ${input.firstName},`,
        "Thanks for registering for the VTI reseller portal. Please confirm your email address to activate your account.",
      ],
      cta: { label: "Verify email address", url: input.verifyUrl },
      linkFallback: { url: input.verifyUrl },
      footnotes: [
        "This link expires in 24 hours. If you did not create an account, you can ignore this email.",
      ],
    },
    { logoUrl: buildEmailLogoUrl(input.baseUrl) },
  );
}

/** Send reseller email verification via Resend */
export async function sendResellerVerificationEmail(
  input: VerificationEmailInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const text = [
    `Hi ${input.firstName},`,
    "",
    "Verify your VTI reseller portal account:",
    input.verifyUrl,
    "",
    "This link expires in 24 hours.",
  ].join("\n");

  const result = await sendEmail({
    to: input.to,
    subject: "Verify your VTI reseller account",
    html: buildVerificationHtml(input),
    text,
  });

  if (!result.ok) {
    return { ok: false, error: result.error };
  }
  return { ok: true };
}

export function buildVerificationUrl(token: string, baseUrl: string): string {
  const base = baseUrl.replace(/\/+$/, "");
  const params = new URLSearchParams({ token });
  return `${base}/resellers/verify-email?${params.toString()}`;
}
