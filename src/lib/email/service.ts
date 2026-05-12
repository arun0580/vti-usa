import "server-only";

import {
  getFromAddress,
  getNotificationRecipient,
  getResendClient,
} from "./client";
import {
  buildTemplateFor,
  renderEmailHtml,
  type EmailTemplate,
} from "./templates";
import type {
  FormDataMap,
  FormType,
} from "./validators";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  /** Plain-text fallback. Recommended for deliverability. */
  text?: string;
  replyTo?: string;
  from?: string;
  /** Optional structured data echoed back for logging. */
  data?: Record<string, unknown>;
};

export type SendEmailResult =
  | { ok: true; id: string | null }
  | { ok: false; error: string };

/**
 * Low-level email send. Use {@link submitFormEmail} for the form-driven
 * flow used by API routes; this is the building block other features
 * (templates, transactional flows, admin notifications) can call directly.
 */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  try {
    const resend = getResendClient();
    const from = input.from ?? getFromAddress();

    const { data, error } = await resend.emails.send({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo,
    });

    if (error) {
      console.error("[email] Resend returned an error", {
        message: error.message,
        name: error.name,
      });
      return { ok: false, error: error.message || "Failed to send email." };
    }

    return { ok: true, id: data?.id ?? null };
  } catch (err) {
    console.error("[email] Unexpected error sending email", err);
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Unexpected error while sending email.",
    };
  }
}

export type SubmitFormEmailOptions = {
  /** Override the recipient. Defaults to `CONTACT_TO_EMAIL` / fallback. */
  to?: string | string[];
  /** Absolute URL of the site for embedding the logo. */
  baseUrl?: string;
};

/**
 * Render and send the notification email for a single form submission.
 * Delegates template selection to the registry in `templates.ts`, so
 * adding a new form is one validator + one template builder.
 */
export async function submitFormEmail<T extends FormType>(
  formType: T,
  data: FormDataMap[T],
  options: SubmitFormEmailOptions = {},
): Promise<SendEmailResult & { template?: EmailTemplate }> {
  const template = buildTemplateFor(formType, data);
  const logoUrl = options.baseUrl
    ? `${options.baseUrl.replace(/\/+$/, "")}/logo.png`
    : undefined;
  const html = renderEmailHtml(template, { logoUrl });

  const result = await sendEmail({
    to: options.to ?? getNotificationRecipient(),
    subject: template.subject,
    html,
    text: template.text,
    replyTo: template.replyTo,
    data: { formType, ...(data as Record<string, unknown>) },
  });

  return { ...result, template };
}

/**
 * Best-effort base-URL extraction from a request. Honours an explicit
 * `SITE_URL` env override so emails can render the production logo
 * even when sent from preview / local environments.
 */
export function deriveBaseUrl(req: Request): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  const host =
    req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  return host ? `${proto}://${host}` : "";
}
