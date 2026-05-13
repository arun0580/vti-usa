import "server-only";
import { Resend } from "resend";

let cachedClient: Resend | null = null;

/**
 * Lazily-initialised Resend client. The API key is read from
 * `RESEND_API_KEY` at first use so importing this module does not
 * crash builds where the secret is not yet present (e.g. preview
 * environments). Always call this from server-only code.
 */
export function getResendClient(): Resend {
  if (cachedClient) return cachedClient;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim().length === 0) {
    throw new Error(
      "RESEND_API_KEY is not configured. Set it in your environment.",
    );
  }

  cachedClient = new Resend(apiKey);
  return cachedClient;
}

/**
 * Resolve the verified sender address used for outbound email.
 * Falls back to a sensible default when `FROM_EMAIL` is unset so
 * local development doesn't silently misroute mail.
 */
export function getFromAddress(): string {
  const from = process.env.FROM_EMAIL?.trim();
  if (!from) {
    throw new Error(
      "FROM_EMAIL is not configured. Set it in your environment.",
    );
  }
  return from;
}

/**
 * Recipient(s) for inbound notifications. Accepts a single address
 * or a comma/semicolon-separated list (e.g. "a@x.com, b@y.com").
 * Falls back to `info@vtiusa.com` when `CONTACT_TO_EMAIL` is unset.
 *
 * Returns `string` for a single recipient and `string[]` for many —
 * Resend's SDK accepts either shape on `to`.
 */
export function getNotificationRecipient(): string | string[] {
  const raw = process.env.CONTACT_TO_EMAIL?.trim();
  if (!raw) return "info@vtiusa.com";

  const recipients = parseRecipients(raw);
  if (recipients.length === 0) return "info@vtiusa.com";
  if (recipients.length === 1) return recipients[0];
  return recipients;
}

/**
 * Split a comma/semicolon-separated list of email addresses into a
 * de-duplicated, trimmed array. Empty entries are dropped.
 */
export function parseRecipients(value: string): string[] {
  const seen = new Set<string>();
  for (const part of value.split(/[,;]/g)) {
    const trimmed = part.trim();
    if (trimmed) seen.add(trimmed);
  }
  return Array.from(seen);
}
