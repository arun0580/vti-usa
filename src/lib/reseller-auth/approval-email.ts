import "server-only";

import { buildEmailLogoUrl, sendEmail } from "@/lib/email/service";
import { renderTransactionalEmailHtml } from "@/lib/email/templates";

export type ApprovalEmailInput = {
  to: string;
  firstName: string;
  signInUrl: string;
  baseUrl?: string;
};

function buildApprovalHtml(input: ApprovalEmailInput): string {
  return renderTransactionalEmailHtml(
    {
      subject: "Your VTI reseller account is approved",
      preheader: "Your reseller portal application has been approved.",
      heading: "You're approved",
      paragraphs: [
        `Hi ${input.firstName},`,
        "Good news — your VTI reseller portal application has been approved. You can now sign in to access pricing sheets, quotes, deal registration, and marketing assets.",
      ],
      cta: { label: "Sign in to portal", url: input.signInUrl },
      linkFallback: { url: input.signInUrl },
      footnotes: [
        "If you have not verified your email yet, use the verification link we sent when you signed up before signing in.",
      ],
    },
    { logoUrl: buildEmailLogoUrl(input.baseUrl) },
  );
}

/** Notify a reseller that their account has been approved */
export async function sendResellerApprovalEmail(
  input: ApprovalEmailInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const text = [
    `Hi ${input.firstName},`,
    "",
    "Your VTI reseller portal application has been approved. You can now sign in:",
    input.signInUrl,
    "",
    "If you have not verified your email yet, complete verification before signing in.",
  ].join("\n");

  const result = await sendEmail({
    to: input.to,
    subject: "Your VTI reseller account is approved",
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
