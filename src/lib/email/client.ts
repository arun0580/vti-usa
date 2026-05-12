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
 * Recipient for inbound notifications. Defaults to the public
 * `info@vtiusa.com` mailbox when `CONTACT_TO_EMAIL` is not set.
 */
export function getNotificationRecipient(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || "info@vtiusa.com";
}
