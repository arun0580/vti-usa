import "server-only";

import { sendEmail } from "@/lib/email/service";
import { escapeHtml } from "@/lib/email/templates";

export type ApprovalEmailInput = {
  to: string;
  firstName: string;
  signInUrl: string;
};

function buildApprovalHtml(input: ApprovalEmailInput): string {
  const name = escapeHtml(input.firstName);
  const url = escapeHtml(input.signInUrl);
  return `
<!DOCTYPE html>
<html lang="en">
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #18181b;">
  <p>Hi ${name},</p>
  <p>Good News — Your VTI Reseller Portal Application Has Been Approved. You Can Now Sign In To Access Pricing Sheets, Quotes, Deal Registration, And Marketing Assets.</p>
  <p style="margin: 24px 0;">
    <a href="${url}" style="display: inline-block; background: #dc2626; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
      Sign In To Portal
    </a>
  </p>
  <p style="font-size: 14px; color: #52525b;">Or Copy This Link Into Your Browser:<br />
    <a href="${url}">${url}</a>
  </p>
  <p style="font-size: 14px; color: #71717a;">If You Have Not Verified Your Email Yet, Use The Verification Link We Sent When You Signed Up Before Signing In.</p>
  <p style="font-size: 14px; color: #71717a;">— VTI USA Partner Team</p>
</body>
</html>`.trim();
}

/** Notify a reseller that their account has been approved */
export async function sendResellerApprovalEmail(
  input: ApprovalEmailInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const text = [
    `Hi ${input.firstName},`,
    "",
    "Your VTI Reseller Portal Application Has Been Approved. You Can Now Sign In:",
    input.signInUrl,
    "",
    "If You Have Not Verified Your Email Yet, Complete Verification Before Signing In.",
  ].join("\n");

  const result = await sendEmail({
    to: input.to,
    subject: "Your VTI Reseller Account Is Approved",
    html: buildApprovalHtml(input),
    text,
  });

  if (!result.ok) {
    return { ok: false, error: result.error };
  }
  return { ok: true };
}

export function buildResellerSignInUrl(baseUrl: string): string {
  const base = baseUrl.replace(/\/+$/, "");
  return `${base}/resellers`;
}
