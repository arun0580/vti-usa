import { NextResponse } from "next/server";

import {
  checkRateLimit,
  deriveBaseUrl,
  getClientIp,
  submitFormEmail,
  validateFormPayload,
} from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUCCESS_MESSAGES: Record<string, string> = {
  contact: "Thanks — we’ll be in touch.",
  reseller_signup:
    "Thanks — your application has been received. Our partner team will reach out shortly.",
  partner_application:
    "Thanks — your application has been received. We will review it and get back to you shortly.",
};

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rate = checkRateLimit(`send-email:${ip}`);
  if (!rate.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests. Please try again in a moment.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const validated = validateFormPayload(body);
  if (!validated.ok) {
    return NextResponse.json(
      { ok: false, error: validated.error, field: validated.field },
      { status: validated.status },
    );
  }

  const result = await submitFormEmail(validated.formType, validated.data, {
    baseUrl: deriveBaseUrl(req),
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn’t send your message right now. Please try again in a few minutes.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    id: result.id,
    message:
      SUCCESS_MESSAGES[validated.formType] ??
      "Thanks — your message is on its way.",
  });
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
