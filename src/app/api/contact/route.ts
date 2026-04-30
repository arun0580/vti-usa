import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  fullName: string;
  organization: string;
  email: string;
  phone?: string;
  persona: string;
  message?: string;
};

const TO_EMAIL = "arun.raj@nfonics.com";

function requiredEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value : null;
}

function getBaseUrl(req: Request) {
  const explicit = (process.env.SITE_URL ?? "").trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const h = req.headers;
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  return host ? `${proto}://${host}` : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function capitalizeWords(input: string) {
  return input
    .split(/[\s/_-]+/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const payload = body as Partial<ContactPayload>;
  const fullName = String(payload.fullName ?? "").trim();
  const organization = String(payload.organization ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const phone = String(payload.phone ?? "").trim();
  const persona = String(payload.persona ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!fullName || !organization || !email || !persona) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const host = requiredEnv("SMTP_HOST");
  const portStr = requiredEnv("SMTP_PORT");
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");
  const from = requiredEnv("SMTP_FROM");

  if (!host || !portStr || !user || !pass || !from) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email is not configured on the server. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM.",
      },
      { status: 500 },
    );
  }

  const port = Number(portStr);
  if (!Number.isFinite(port) || port <= 0) {
    return NextResponse.json(
      { ok: false, error: "SMTP_PORT must be a valid number." },
      { status: 500 },
    );
  }

  const secure = (process.env.SMTP_SECURE ?? "").toLowerCase() === "true";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const subject = `VTI Contact: ${fullName} (${capitalizeWords(persona)}) — ${organization}`;
  const lines = [
    `Full name: ${fullName}`,
    `Organization: ${organization}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    `Persona: ${persona}`,
    "",
    "Message:",
    message || "-",
  ];

  const baseUrl = getBaseUrl(req);
  const logoUrl = baseUrl ? `${baseUrl}/logo.png` : "";
  const safe = {
    fullName: escapeHtml(fullName),
    organization: escapeHtml(organization),
    email: escapeHtml(email),
    phone: escapeHtml(phone || "-"),
    persona: escapeHtml(capitalizeWords(persona)),
    message: escapeHtml(message || "-"),
  };

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f5;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      New contact request from ${safe.fullName} (${safe.persona})
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
                      ${
                        logoUrl
                          ? `<img src="${escapeHtml(
                              logoUrl,
                            )}" width="120" height="40" alt="VTI" style="display:block;border:0;outline:none;text-decoration:none;height:40px;width:auto;max-width:160px;" />`
                          : `<div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; font-weight:800; letter-spacing:-0.02em; font-size:18px; color:#09090b;">VTI</div>`
                      }
                    </td>
                    <td align="right" valign="middle" style="padding:0;">
                     
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
                        New request from ${safe.fullName}
                      </div>
                      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; font-size:13px; color:#52525b; margin-top:6px;">
                        Submitted via the website contact form.
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 22px 18px 22px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;border-spacing:0 10px;">
                        ${fieldRow("Organization", safe.organization)}
                        ${fieldRow(
                          "Email",
                          `<a href="mailto:${safe.email}" style="color:#dc2626;text-decoration:none;">${safe.email}</a>`,
                        )}
                        ${fieldRow("Phone", safe.phone)}
                        ${fieldRow("Persona", safe.persona)}
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 22px 22px 22px;">
                      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; font-size:12px; font-weight:700; letter-spacing:0.12em; color:#71717a;">
                        MESSAGE
                      </div>
                      <div style="margin-top:8px; background:#fafafa; border:1px solid #e4e4e7; border-radius:14px; padding:14px; text-align:left;">
                        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; font-size:14px; color:#18181b; line-height:1.6; text-align:left;">
                          ${safe.message}
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 6px 0 6px;">
          
                <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; font-size:11px; color:#a1a1aa; line-height:1.6; text-align:center; margin-top:6px;">
                  © ${new Date().getFullYear()} Virtual Technologies, Inc.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  try {
    await transporter.sendMail({
      from,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text: lines.join("\n"),
      html,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to send email. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks — we’ll be in touch.",
  });
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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
