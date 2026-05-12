"use client";

import * as React from "react";
import { Button } from "@/components/site/Button";
import { submitForm } from "@/lib/email/client-submit";
import type { ContactFormData } from "@/lib/email/validators";

type Status =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<Status>({ type: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;
    setStatus({ type: "idle" });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypot = String(formData.get("company_website") ?? "");

    const payload: ContactFormData = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      organization: String(formData.get("organization") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim() || undefined,
      persona: String(formData.get("persona") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim() || undefined,
    };

    setIsSubmitting(true);
    const result = await submitForm("contact", payload, { honeypot });
    setIsSubmitting(false);

    if (result.ok) {
      setStatus({ type: "success", message: result.message });
      form.reset();
    } else {
      setStatus({ type: "error", message: result.error });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6 sm:grid-cols-2 text-zinc-950"
      noValidate
    >
      <label className="grid gap-2 text-sm">
        <span className="font-medium">
          Full name <span className="text-red-600">*</span>
        </span>
        <input
          className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2"
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
          className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2"
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
          className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2"
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
          className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2"
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
          className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2"
          name="persona"
          required
          defaultValue=""
          disabled={isSubmitting}
        >
          <option value="" disabled>
            Select one
          </option>
          <option>K-12 educator / IT</option>
          <option>Higher education</option>
          <option>Corporate / boardroom</option>
          <option>Government / municipal</option>
          <option>Reseller / integrator</option>
          <option>Other</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm sm:col-span-2">
        <span className="font-medium">Tell us about your project</span>
        <textarea
          className="min-h-32 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-zinc-400/40 focus:ring-2"
          name="message"
          placeholder="Number of rooms, panel sizes, timeline, anything else we should know…"
          disabled={isSubmitting}
        />
      </label>

      {/* Honeypot — keep empty. Visible only to bots. */}
      <div aria-hidden className="hidden">
        <label>
          Company website
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {status.type !== "idle" ? (
        <div
          className={[
            "sm:col-span-2 rounded-2xl border px-4 py-3 text-sm font-medium",
            status.type === "success"
              ? "border-green-200 bg-green-50 text-green-900"
              : "border-red-200 bg-red-50 text-red-900",
          ].join(" ")}
          role={status.type === "error" ? "alert" : "status"}
          aria-live={status.type === "error" ? "assertive" : "polite"}
        >
          {status.message}
        </div>
      ) : null}

      <div className="">
        <div className="min-h-[1px]" />
        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="!bg-red-600 hover:!bg-red-700 disabled:opacity-60 !text-white cursor-pointer"
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
