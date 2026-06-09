import "server-only";

import { buildEmailLogoUrl, sendEmail } from "@/lib/email/service";
import { renderTransactionalEmailHtml } from "@/lib/email/templates";

export type RejectionEmailInput = {
  to: string;
  firstName: string;
  baseUrl?: string;
};

function buildRejectionHtml(input: RejectionEmailInput): string {
  return renderTransactionalEmailHtml(
    {
      subject: "Update on your VTI reseller application",
      preheader: "Your reseller portal application was not approved at this time.",
      heading: "Application update",
      paragraphs: [
        `Hi ${input.firstName},`,
        "Thank you for your interest in partnering with VTI. After reviewing your reseller portal application, we are unable to approve it at this time.",
        "If you believe this was a mistake or would like to discuss your application further, please contact us at info@vtiusa.com.",
      ],
      footnotes: [
        "You will not be able to sign in to the reseller portal unless your application is approved in the future.",
      ],
    },
    { logoUrl: buildEmailLogoUrl(input.baseUrl) },
  );
}

/** Notify a reseller that their application has been rejected */
export async function sendResellerRejectionEmail(
  input: RejectionEmailInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const text = [
    `Hi ${input.firstName},`,
    "",
    "Thank you for your interest in partnering with VTI. After reviewing your reseller portal application, we are unable to approve it at this time.",
    "",
    "If you believe this was a mistake or would like to discuss your application further, please contact us at info@vtiusa.com.",
  ].join("\n");

  const result = await sendEmail({
    to: input.to,
    subject: "Update on your VTI reseller application",
    html: buildRejectionHtml(input),
    text,
  });

  if (!result.ok) {
    return { ok: false, error: result.error };
  }
  return { ok: true };
}
