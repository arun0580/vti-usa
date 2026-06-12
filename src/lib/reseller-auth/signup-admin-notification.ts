import "server-only";

import { getNotificationRecipient } from "@/lib/email/client";
import { buildEmailLogoUrl, sendEmail } from "@/lib/email/service";
import {
  buildResellerSignupAdminEmailContent,
  buildResellerSignupAdminEmailText,
  renderTransactionalEmailHtml,
  type ResellerSignupAdminEmailData,
} from "@/lib/email/templates";
import {
  RESELLER_BUSINESS_TYPE_LABELS,
  type ResellerSignupPayload,
} from "./types";

export type SignupAdminNotificationInput = {
  signup: Pick<
    ResellerSignupPayload,
    | "fullName"
    | "companyName"
    | "email"
    | "phone"
    | "city"
    | "state"
    | "businessType"
    | "about"
  >;
  baseUrl?: string;
  resellerId?: string;
};

function businessTypeLabel(value: string): string {
  return (
    RESELLER_BUSINESS_TYPE_LABELS[value] ??
    value
      .split(/[\s/_-]+/g)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function buildAdminPortalUrl(
  baseUrl: string | undefined,
  resellerId?: string,
): string {
  const base = (baseUrl ?? "").replace(/\/+$/, "");
  if (!base) return "/admin/resellers";
  return resellerId
    ? `${base}/admin/resellers/${resellerId}`
    : `${base}/admin/resellers`;
}

function toEmailData(input: SignupAdminNotificationInput): ResellerSignupAdminEmailData {
  const { signup } = input;
  return {
    fullName: signup.fullName,
    company: signup.companyName,
    email: signup.email,
    phone: signup.phone,
    city: signup.city,
    state: signup.state,
    businessTypeLabel: businessTypeLabel(signup.businessType),
    about: signup.about || undefined,
    adminPortalUrl: buildAdminPortalUrl(input.baseUrl, input.resellerId),
  };
}

/** Notify admins that a new reseller signed up (sent to CONTACT_TO_EMAIL). */
export async function sendResellerSignupAdminNotification(
  input: SignupAdminNotificationInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const data = toEmailData(input);
  const content = buildResellerSignupAdminEmailContent(data);
  const html = renderTransactionalEmailHtml(content, {
    logoUrl: buildEmailLogoUrl(input.baseUrl),
  });
  const text = buildResellerSignupAdminEmailText(data);

  const result = await sendEmail({
    to: getNotificationRecipient(),
    subject: content.subject,
    html,
    text,
    replyTo: data.email,
  });

  if (!result.ok) {
    return { ok: false, error: result.error };
  }
  return { ok: true };
}
