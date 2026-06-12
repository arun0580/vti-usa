import "server-only";

import { submitFormEmail } from "@/lib/email/service";
import type { ResellerSignupFormData } from "@/lib/email/validators";
import type { ResellerSignupPayload } from "./types";

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

function toFormData(input: SignupAdminNotificationInput): ResellerSignupFormData {
  const { signup } = input;
  return {
    fullName: signup.fullName,
    company: signup.companyName,
    email: signup.email,
    phone: signup.phone,
    city: signup.city,
    state: signup.state,
    businessType: signup.businessType,
    about: signup.about || undefined,
  };
}

function buildAdminReviewUrl(baseUrl: string | undefined, resellerId?: string): string | undefined {
  if (!baseUrl?.trim() || !resellerId) return undefined;
  const base = baseUrl.replace(/\/+$/, "");
  return `${base}/admin/resellers/${resellerId}`;
}

/** Notify admins that a new reseller signed up (sent to CONTACT_TO_EMAIL). */
export async function sendResellerSignupAdminNotification(
  input: SignupAdminNotificationInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const adminReviewUrl = buildAdminReviewUrl(input.baseUrl, input.resellerId);
  const result = await submitFormEmail("reseller_signup", toFormData(input), {
    baseUrl: input.baseUrl,
    adminReviewUrl,
  });

  if (!result.ok) {
    return { ok: false, error: result.error };
  }
  return { ok: true };
}
