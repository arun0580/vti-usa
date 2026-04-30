"use client";

import * as React from "react";
import { Button } from "@/components/site/Button";

type ContactPayload = {
  fullName: string;
  organization: string;
  email: string;
  phone?: string;
  persona: string;
  message?: string;
};

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<
    | { type: "idle" }
    | { type: "success"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: "idle" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: ContactPayload = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      organization: String(formData.get("organization") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim() || undefined,
      persona: String(formData.get("persona") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim() || undefined,
    };

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: true; message?: string }
        | { ok: false; error?: string }
        | null;

      if (!res.ok) {
        throw new Error(
          json && "error" in json && json.error
            ? json.error
            : "Could not send message. Please try again.",
        );
      }

      setStatus({
        type: "success",
        message: (json && "message" in json && json.message) || "Sent!",
      });
      form.reset();
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Could not send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 sm:grid-cols-2"
    >
      <label className="grid gap-2 text-sm">
        <span className="font-medium">
          Full name <span className="text-red-600">*</span>
        </span>
        <input
          className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          name="fullName"
          autoComplete="name"
          required
          disabled={isSubmitting}
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-medium">
          Organization <span className="text-red-600">*</span>
        </span>
        <input
          className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          name="organization"
          autoComplete="organization"
          required
          disabled={isSubmitting}
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-medium">
          Email <span className="text-red-600">*</span>
        </span>
        <input
          className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isSubmitting}
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-medium">Phone</span>
        <input
          className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          name="phone"
          autoComplete="tel"
          disabled={isSubmitting}
        />
      </label>

      <label className="grid gap-2 text-sm sm:col-span-2">
        <span className="font-medium">
          I am a… <span className="text-red-600">*</span>
        </span>
        <select
          className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          name="persona"
          required
          defaultValue=""
          disabled={isSubmitting}
        >
          <option value="" disabled>
            Select one
          </option>
          <option value="education">Education</option>
          <option value="business">Business</option>
          <option value="government">Government</option>
          <option value="reseller">Reseller / Partner</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm sm:col-span-2">
        <span className="font-medium">Tell us about your project</span>
        <textarea
          className="min-h-32 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-zinc-400/40 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
          name="message"
          placeholder="Number of rooms, panel sizes, timeline, anything else we should know…"
          disabled={isSubmitting}
        />
      </label>

      {status.type !== "idle" ? (
        <div
          className={[
            "sm:col-span-2 rounded-2xl border px-4 py-3 text-sm font-medium",
            status.type === "success"
              ? "border-green-200 bg-green-50 text-green-900 dark:border-green-900/40 dark:bg-green-950/30 dark:text-green-200"
              : "border-red-200 bg-red-50 text-red-900 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200",
          ].join(" ")}
          role={status.type === "error" ? "alert" : "status"}
          aria-live={status.type === "error" ? "assertive" : "polite"}
        >
          {status.message}
        </div>
      ) : null}

      <div className="sm:col-span-2 flex items-center justify-between gap-4">
        <div className="min-h-[1px]" />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="!bg-red-600 hover:!bg-red-700 disabled:opacity-60 dark:!bg-red-600 dark:hover:!bg-red-700"
        >
          {isSubmitting ? "Sending…" : "Send Request"}
          <span aria-hidden="true" className="ml-1">
            →
          </span>
        </Button>
      </div>
    </form>
  );
}
