import "server-only";

import type {
  ContactFormData,
  FormType,
  PartnerApplicationFormData,
  ResellerSignupFormData,
} from "./validators";

export type EmailField = {
  label: string;
  value: string;
  /** Pre-escaped HTML. When set, replaces `value` in the rendered HTML. */
  valueHtml?: string;
};

export type EmailTemplate = {
  subject: string;
  /** Reply-To header — usually the submitter's email. */
  replyTo?: string;
  /** Form-type identifier shown as a label inside the email. */
  formLabel: string;
  /** Heading line shown above the field grid. */
  heading: string;
  /** Subheading explaining the source of the email. */
  subheading: string;
  /** Key/value pairs rendered as a table. */
  fields: EmailField[];
  /** Optional free-form text block (e.g. user message). */
  longMessage?: { label: string; value: string };
  /** Plain-text body used as a fallback for clients that block HTML. */
  text: string;
};

export function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function capitalizeWords(input: string): string {
  return input
    .split(/[\s/_-]+/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function buildText(template: EmailTemplate): string {
  const lines: string[] = [
    template.heading,
    template.subheading,
    "",
    ...template.fields
      .filter((f) => f.value && f.value.trim().length > 0)
      .map((f) => `${f.label}: ${f.value}`),
  ];
  if (template.longMessage) {
    lines.push("", `${template.longMessage.label}:`, template.longMessage.value);
  }
  return lines.join("\n");
}

/* -------------------------------------------------------------------------- */
/*                          Per-form template builders                        */
/* -------------------------------------------------------------------------- */

export function buildContactTemplate(data: ContactFormData): EmailTemplate {
  const persona = capitalizeWords(data.persona);
  const subject = `VTI Contact: ${data.fullName} (${persona}) — ${data.organization}`;

  const fields: EmailField[] = [
    { label: "Organization", value: data.organization },
    {
      label: "Email",
      value: data.email,
      valueHtml: `<a href="mailto:${escapeHtml(
        data.email,
      )}" style="color:#dc2626;text-decoration:none;">${escapeHtml(
        data.email,
      )}</a>`,
    },
    { label: "Phone", value: data.phone || "-" },
    { label: "Persona", value: persona },
  ];

  const template: EmailTemplate = {
    subject,
    replyTo: data.email,
    formLabel: "Contact form",
    heading: `New request from ${data.fullName}`,
    subheading: "Submitted via the website contact form.",
    fields,
    longMessage: { label: "Message", value: data.message || "-" },
    text: "",
  };
  template.text = buildText(template);
  return template;
}

export type ResellerSignupTemplateOptions = {
  adminReviewUrl?: string;
};

export function buildResellerSignupTemplate(
  data: ResellerSignupFormData,
  options: ResellerSignupTemplateOptions = {},
): EmailTemplate {
  const businessType = capitalizeWords(data.businessType);
  const subject = `VTI Reseller signup: ${data.fullName} — ${data.company}`;

  const fields: EmailField[] = [
    { label: "Company", value: data.company },
    {
      label: "Email",
      value: data.email,
      valueHtml: `<a href="mailto:${escapeHtml(
        data.email,
      )}" style="color:#dc2626;text-decoration:none;">${escapeHtml(
        data.email,
      )}</a>`,
    },
    { label: "Phone", value: data.phone },
    { label: "Location", value: `${data.city}, ${data.state}` },
    { label: "Business type", value: businessType },
    ...(options.adminReviewUrl
      ? [
          {
            label: "Admin review",
            value: options.adminReviewUrl,
            valueHtml: `<a href="${escapeHtml(
              options.adminReviewUrl,
            )}" style="color:#dc2626;text-decoration:none;" target="_blank" rel="noreferrer">Open application in admin portal</a>`,
          },
        ]
      : []),
  ];

  const template: EmailTemplate = {
    subject,
    replyTo: data.email,
    formLabel: "Reseller portal — signup",
    heading: `New reseller application from ${data.fullName}`,
    subheading: "Submitted via the reseller portal signup form.",
    fields,
    longMessage: data.about
      ? { label: "About the business", value: data.about }
      : undefined,
    text: "",
  };
  template.text = buildText(template);
  return template;
}

export function buildPartnerApplicationTemplate(
  data: PartnerApplicationFormData,
): EmailTemplate {
  const businessType = capitalizeWords(data.businessType);
  const subject = `VTI Partner application: ${data.fullName} — ${data.company}`;

  const fields: EmailField[] = [
    { label: "Company", value: data.company },
    {
      label: "Email",
      value: data.email,
      valueHtml: `<a href="mailto:${escapeHtml(
        data.email,
      )}" style="color:#dc2626;text-decoration:none;">${escapeHtml(
        data.email,
      )}</a>`,
    },
    { label: "Phone", value: data.phone },
    { label: "Location", value: `${data.city}, ${data.state}` },
    ...(data.website
      ? [
          {
            label: "Website",
            value: data.website,
            valueHtml: `<a href="${escapeHtml(
              data.website,
            )}" style="color:#dc2626;text-decoration:none;" target="_blank" rel="noreferrer">${escapeHtml(
              data.website,
            )}</a>`,
          },
        ]
      : []),
    { label: "Business type", value: businessType },
    { label: "Markets", value: data.markets },
    { label: "Years in business", value: data.yearsInBusiness },
    ...(data.experience
      ? [{ label: "Display experience", value: data.experience }]
      : []),
  ];

  const template: EmailTemplate = {
    subject,
    replyTo: data.email,
    formLabel: "About — Join the team",
    heading: `New partner application from ${data.fullName}`,
    subheading: "Submitted via the About → Join page application form.",
    fields,
    longMessage: data.notes
      ? { label: "Anything else", value: data.notes }
      : undefined,
    text: "",
  };
  template.text = buildText(template);
  return template;
}

type AnyFormData = ContactFormData | ResellerSignupFormData | PartnerApplicationFormData;

/**
 * Pick the correct template builder for the given `formType`. New
 * forms only need to register here — call sites stay untouched.
 */
export function buildTemplateFor(
  formType: FormType,
  data: AnyFormData,
  options: ResellerSignupTemplateOptions = {},
): EmailTemplate {
  switch (formType) {
    case "contact":
      return buildContactTemplate(data as ContactFormData);
    case "reseller_signup":
      return buildResellerSignupTemplate(
        data as ResellerSignupFormData,
        options,
      );
    case "partner_application":
      return buildPartnerApplicationTemplate(
        data as PartnerApplicationFormData,
      );
  }
}

/* -------------------------------------------------------------------------- */
/*                            Shared HTML rendering                            */
/* -------------------------------------------------------------------------- */

const EMAIL_FONT =
  "ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial";

function renderHeaderLogo(
  logoUrl?: string,
  { centered = false }: { centered?: boolean } = {},
): string {
  const alignStyle = centered ? "margin:0 auto;" : "";
  return logoUrl
    ? `<img src="${escapeHtml(
        logoUrl,
      )}" width="120" height="40" alt="VTI" style="display:block;border:0;outline:none;text-decoration:none;height:40px;width:auto;max-width:160px;${alignStyle}" />`
    : `<div style="font-family:${EMAIL_FONT}; font-weight:800; letter-spacing:-0.02em; font-size:18px; color:#09090b;${centered ? "text-align:center;" : ""}">VTI</div>`;
}

function renderEmailFooter(): string {
  return `
            <tr>
              <td style="padding:14px 6px 0 6px;">
                <div style="font-family:${EMAIL_FONT}; font-size:11px; color:#a1a1aa; line-height:1.6; text-align:center; margin-top:6px;">
                  © ${new Date().getFullYear()} Virtual Technologies, Inc.
                </div>
                <div style="font-family:${EMAIL_FONT}; font-size:11px; color:#a1a1aa; line-height:1.6; text-align:center; margin-top:4px;">
                  111 Bluffs Ct, Ste C · Canton, GA 30114
                </div>
              </td>
            </tr>`;
}

export type TransactionalEmailContent = {
  subject: string;
  preheader?: string;
  heading: string;
  paragraphs: string[];
  cta?: { label: string; url: string };
  linkFallback?: { url: string };
  footnotes?: string[];
};

/**
 * Branded layout for transactional emails (verification, approvals, etc.).
 * Matches the form-notification template: logo header, red accent, card body, footer.
 */
export function renderTransactionalEmailHtml(
  content: TransactionalEmailContent,
  { logoUrl }: { logoUrl?: string } = {},
): string {
  const preheader = content.preheader ?? content.heading;
  const paragraphBlocks = content.paragraphs
    .map(
      (text) => `
                      <div style="font-family:${EMAIL_FONT}; font-size:14px; color:#3f3f46; line-height:1.65; margin-top:14px;">
                        ${escapeHtml(text)}
                      </div>`,
    )
    .join("");

  const ctaBlock = content.cta
    ? `
                  <tr>
                    <td style="padding:8px 22px 0 22px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="border-radius:10px; background:#dc2626;">
                            <a href="${escapeHtml(content.cta.url)}" style="display:inline-block;padding:12px 24px;font-family:${EMAIL_FONT};font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;">
                              ${escapeHtml(content.cta.label)}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>`
    : "";

  const linkFallbackBlock = content.linkFallback
    ? `
                  <tr>
                    <td style="padding:18px 22px 0 22px;">
                      <div style="font-family:${EMAIL_FONT}; font-size:13px; color:#52525b; line-height:1.6;">
                        Or copy this link into your browser:
                      </div>
                      <div style="margin-top:8px; background:#fafafa; border:1px solid #e4e4e7; border-radius:10px; padding:12px 14px;">
                        <a href="${escapeHtml(content.linkFallback.url)}" style="font-family:${EMAIL_FONT}; font-size:12px; color:#dc2626; word-break:break-all; text-decoration:none;">
                          ${escapeHtml(content.linkFallback.url)}
                        </a>
                      </div>
                    </td>
                  </tr>`
    : "";

  const footnoteBlocks = (content.footnotes ?? [])
    .map(
      (text) => `
                  <tr>
                    <td style="padding:14px 22px 0 22px;">
                      <div style="font-family:${EMAIL_FONT}; font-size:12px; color:#71717a; line-height:1.6;">
                        ${escapeHtml(text)}
                      </div>
                    </td>
                  </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <title>${escapeHtml(content.subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f5;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheader)}
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f4f5;">
      <tr>
        <td align="center" style="padding:28px 14px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;width:100%;">
            <tr>
              <td align="center" style="padding:0 0 14px 0;">
                ${renderHeaderLogo(logoUrl, { centered: true })}
              </td>
            </tr>

            <tr>
              <td style="height:3px;background:#dc2626;border-radius:999px;"></td>
            </tr>

            <tr>
              <td style="padding:18px 0 0 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ffffff;border:1px solid #e4e4e7;border-radius:18px;">
                  <tr>
                    <td style="padding:22px 22px 0 22px;">
                      <div style="font-family:${EMAIL_FONT}; font-size:18px; font-weight:800; color:#09090b; letter-spacing:-0.02em;">
                        ${escapeHtml(content.heading)}
                      </div>
                      ${paragraphBlocks}
                    </td>
                  </tr>
                  ${ctaBlock}
                  ${linkFallbackBlock}
                  ${footnoteBlocks}
                  <tr>
                    <td style="padding:22px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

            ${renderEmailFooter()}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function fieldRow(label: string, valueHtml: string) {
  return `
    <tr>
      <td valign="top" style="width:160px;padding:0;">
        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; font-size:12px; color:#71717a;">
          ${escapeHtml(label)}
        </div>
      </td>
      <td valign="top" style="padding:0;">
        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; font-size:13px; color:#18181b;">
          ${valueHtml}
        </div>
      </td>
    </tr>`;
}

/**
 * Render an `EmailTemplate` into a self-contained, email-client-safe
 * HTML string. Uses table-based layout for maximum compatibility.
 */
export function renderEmailHtml(
  template: EmailTemplate,
  { logoUrl }: { logoUrl?: string } = {},
): string {
  const rows = template.fields
    .filter((f) => f.value || f.valueHtml)
    .map((f) => fieldRow(f.label, f.valueHtml ?? escapeHtml(f.value)))
    .join("");

  const longBlock = template.longMessage
    ? `
                  <tr>
                    <td style="padding:0 22px 22px 22px;">
                      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; font-size:12px; font-weight:700; letter-spacing:0.12em; color:#71717a;">
                        ${escapeHtml(template.longMessage.label.toUpperCase())}
                      </div>
                      <div style="margin-top:8px; background:#fafafa; border:1px solid #e4e4e7; border-radius:14px; padding:14px; text-align:left;">
                        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; font-size:14px; color:#18181b; line-height:1.6; text-align:left; white-space:pre-wrap;">
                          ${escapeHtml(template.longMessage.value)}
                        </div>
                      </div>
                    </td>
                  </tr>`
    : "";

  const headerLogo = renderHeaderLogo(logoUrl);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <title>${escapeHtml(template.subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f5;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(template.heading)}
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f4f5;">
      <tr>
        <td align="center" style="padding:28px 14px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;width:100%;">
            <tr>
              <td style="padding:0 0 14px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td valign="middle" style="padding:0;">
                      ${headerLogo}
                    </td>
                    <td align="right" valign="middle" style="padding:0;">
                      <span style="display:inline-block;padding:6px 10px;border-radius:999px;background:#fee2e2;color:#b91c1c;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
                        ${escapeHtml(template.formLabel)}
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="height:3px;background:#dc2626;border-radius:999px;"></td>
            </tr>

            <tr>
              <td style="padding:18px 0 0 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ffffff;border:1px solid #e4e4e7;border-radius:18px;">
                  <tr>
                    <td style="padding:22px 22px 10px 22px;">
                      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; font-size:18px; font-weight:800; color:#09090b; letter-spacing:-0.02em;">
                        ${escapeHtml(template.heading)}
                      </div>
                      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; font-size:13px; color:#52525b; margin-top:6px;">
                        ${escapeHtml(template.subheading)}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 22px 18px 22px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;border-spacing:0 10px;">
                        ${rows}
                      </table>
                    </td>
                  </tr>
                  ${longBlock}
                </table>
              </td>
            </tr>

            ${renderEmailFooter()}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
