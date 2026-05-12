"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { hoverLift, tapPress } from "@/lib/motion";
import { submitForm } from "@/lib/email/client-submit";
import type { PartnerApplicationFormData } from "@/lib/email/validators";

const inputClass =
  "mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none placeholder:text-zinc-400 focus:border-red-400 focus:ring-2 focus:ring-red-500/15 disabled:cursor-not-allowed disabled:opacity-60";

function joinClass(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="flex items-baseline gap-2 text-[11px] font-semibold tracking-[0.08em] text-zinc-700">
        <span>
          {label}
          {required ? <span className="text-red-600"> *</span> : null}
        </span>
        {hint ? (
          <span className="font-medium text-zinc-400">{hint}</span>
        ) : null}
      </span>
      {children}
    </label>
  );
}

type Status =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function PartnerApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;
    setStatus({ type: "idle" });

    const form = e.currentTarget;
    const fd = new FormData(form);
    const honeypot = String(fd.get("company_website") ?? "");

    const payload: PartnerApplicationFormData = {
      fullName: String(fd.get("fullName") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      state: String(fd.get("state") ?? "").trim(),
      website: String(fd.get("website") ?? "").trim() || undefined,
      businessType: String(fd.get("businessType") ?? "").trim(),
      markets: String(fd.get("markets") ?? "").trim(),
      yearsInBusiness: String(fd.get("yearsInBusiness") ?? "").trim(),
      experience: String(fd.get("experience") ?? "").trim() || undefined,
      notes: String(fd.get("notes") ?? "").trim() || undefined,
    };

    setIsSubmitting(true);
    const result = await submitForm("partner_application", payload, {
      honeypot,
    });
    setIsSubmitting(false);

    if (result.ok) {
      setStatus({ type: "success", message: result.message });
      form.reset();
    } else {
      setStatus({ type: "error", message: result.error });
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required>
          <input
            required
            name="fullName"
            className={inputClass}
            autoComplete="name"
            disabled={isSubmitting}
          />
        </Field>
        <Field label="Company / organization" required>
          <input
            required
            name="company"
            className={inputClass}
            autoComplete="organization"
            disabled={isSubmitting}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Work email" required>
          <input
            required
            type="email"
            name="email"
            className={inputClass}
            autoComplete="email"
            disabled={isSubmitting}
          />
        </Field>
        <Field label="Phone" required>
          <input
            required
            type="tel"
            name="phone"
            className={inputClass}
            autoComplete="tel"
            disabled={isSubmitting}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="City" required>
          <input
            required
            name="city"
            className={inputClass}
            disabled={isSubmitting}
          />
        </Field>
        <Field label="State" required>
          <input
            required
            name="state"
            className={inputClass}
            placeholder="e.g. GA"
            disabled={isSubmitting}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Website">
          <input
            name="website"
            className={inputClass}
            autoComplete="url"
            disabled={isSubmitting}
          />
        </Field>
        <Field label="Business type" required>
          <select
            required
            name="businessType"
            className={inputClass}
            defaultValue=""
            disabled={isSubmitting}
          >
            <option value="" disabled>
              Select one
            </option>
            <option>AV Integrator</option>
            <option>Reseller</option>
            <option>IT / Technology Partner</option>
            <option>Other</option>
          </select>
        </Field>
      </div>

      <Field label="Markets you serve" required>
        <input
          required
          name="markets"
          className={inputClass}
          placeholder="e.g. K-12, higher ed, corporate, government, houses of worship"
          disabled={isSubmitting}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Years in business" required>
          <select
            required
            name="yearsInBusiness"
            className={inputClass}
            defaultValue=""
            disabled={isSubmitting}
          >
            <option value="" disabled>
              Select one
            </option>
            <option>0–1</option>
            <option>2–5</option>
            <option>6–10</option>
            <option>11–20</option>
            <option>20+</option>
          </select>
        </Field>
        <Field label="Interactive display experience">
          <select
            name="experience"
            className={inputClass}
            defaultValue=""
            disabled={isSubmitting}
          >
            <option value="">Select one</option>
            <option>None yet</option>
            <option>Some</option>
            <option>Experienced</option>
            <option>Expert</option>
          </select>
        </Field>
      </div>

      <Field label="Anything else we should know?">
        <textarea
          name="notes"
          className={joinClass(inputClass, "min-h-[120px] resize-y py-2")}
          placeholder="Customer base, current vendors, certifications, upcoming projects…"
          disabled={isSubmitting}
        />
      </Field>

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
          role={status.type === "error" ? "alert" : "status"}
          aria-live={status.type === "error" ? "assertive" : "polite"}
          className={joinClass(
            "rounded-lg border px-4 py-3 text-sm font-medium",
            status.type === "success"
              ? "border-green-200 bg-green-50 text-green-900"
              : "border-red-200 bg-red-50 text-red-900",
          )}
        >
          {status.message}
        </div>
      ) : null}

      <div className="pt-2">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          whileHover={isSubmitting ? undefined : hoverLift}
          whileTap={isSubmitting ? undefined : tapPress}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "Submitting…" : "Submit application"}
          {isSubmitting ? null : <span aria-hidden="true">→</span>}
        </motion.button>
      </div>
    </form>
  );
}
