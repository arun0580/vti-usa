import "server-only";

import { sendEmail } from "@/lib/email/service";
import { escapeHtml } from "@/lib/email/templates";

export type VerificationEmailInput = {
  to: string;
  firstName: string;
  verifyUrl: string;
};

function buildVerificationHtml(input: VerificationEmailInput): string {
  const name = escapeHtml(input.firstName);
  const url = escapeHtml(input.verifyUrl);
  return `
<!DOCTYPE html>
<html lang="en">
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #18181b;">
  <p>Hi ${name},</p>
  <p>Thanks for registering for the VTI reseller portal. Please confirm your email address to activate your account:</p>
  <p style="margin: 24px 0;">
    <a href="${url}" style="display: inline-block; background: #dc2626; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
      Verify email address
    </a>
  </p>
  <p style="font-size: 14px; color: #52525b;">Or copy this link into your browser:<br />
    <a href="${url}">${url}</a>
  </p>
  <p style="font-size: 14px; color: #71717a;">This link expires in 24 hours. If you did not create an account, you can ignore this email.</p>
  <p style="font-size: 14px; color: #71717a;">— VTI USA Partner Team</p>
</body>
</html>`.trim();
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
