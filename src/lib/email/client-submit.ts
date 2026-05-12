"use client";

import type { FormDataMap, FormType } from "./validators";

export type SubmitFormResponse =
  | { ok: true; message: string; id?: string | null }
  | { ok: false; error: string; field?: string };

/**
 * Single client-side entry point used by every form. Always POSTs the
 * canonical envelope (`{ formType, data, honeypot }`) to `/api/send-email`,
 * so frontends never duplicate fetch/parse/error logic.
 */
export async function submitForm<T extends FormType>(
  formType: T,
  data: FormDataMap[T],
  options: { honeypot?: string; signal?: AbortSignal } = {},
): Promise<SubmitFormResponse> {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        formType,
        data,
        honeypot: options.honeypot ?? "",
      }),
      signal: options.signal,
    });

    const json = (await res.json().catch(() => null)) as
      | { ok: true; message?: string; id?: string | null }
      | { ok: false; error?: string; field?: string }
      | null;

    if (!res.ok || !json || json.ok === false) {
      return {
        ok: false,
        error:
          (json && "error" in json && json.error) ||
          "Could not send your message. Please try again.",
        field: json && "field" in json ? json.field : undefined,
      };
    }

    return {
      ok: true,
      message: json.message ?? "Sent!",
      id: json.id ?? null,
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return { ok: false, error: "Submission cancelled." };
    }
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Could not send your message. Please try again.",
    };
  }
}
