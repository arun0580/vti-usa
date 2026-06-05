"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/site/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { hoverLift, tapPress } from "@/lib/motion";
import {
  resellerResendVerification,
  resellerSignin,
  resellerSignup,
} from "@/lib/reseller-auth/api";
import {
  validateSignin,
  validateSignup,
  type FieldErrors,
} from "@/lib/reseller-auth/validation";
import type {
  ResellerSigninPayload,
  ResellerSignupPayload,
} from "@/lib/reseller-auth/types";

const benefits = [
  "Pricing sheets & current price lists",
  "Generate customer quotes",
  "Deal registration & territory protection",
  "Spec sheets, brochures & marketing assets",
  "Direct line to your dedicated VTI rep",
] as const;

function IconLogIn({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="m10 17 5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  );
}

function IconUserPlus({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6M23 11h-6" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" className="fill-red-600" />
      <path
        d="M8.2 12.1 10.7 15 16 7.2"
        stroke="white"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const inputClass =
  "h-12 w-full rounded-lg border border-zinc-200 bg-white pl-11 pr-3 text-sm text-zinc-950 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

const fieldClass =
  "h-12 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

const textareaClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-950 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

const BUSINESS_TYPE_OPTIONS = [
  { value: "", label: "Select one" },
  { value: "av_integrator", label: "AV integrator" },
  { value: "it_reseller", label: "IT reseller" },
  { value: "education_technology", label: "Education technology" },
  { value: "government_contractor", label: "Government contractor" },
  { value: "distributor", label: "Distributor" },
  { value: "other", label: "Other" },
] as const;

function firstNameFromFullName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? "";
}

const fieldErrorClass =
  "border-red-300 focus:border-red-500 focus:ring-red-500/30";

const labelClass = "text-sm font-medium text-zinc-950";
const requiredMark = <span className="text-red-600">*</span>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
      {message}
    </p>
  );
}

function FormAlert({
  message,
  variant = "error",
}: {
  message: string;
  variant?: "error" | "success";
}) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "rounded-lg border px-4 py-3 text-sm font-medium",
        variant === "error"
          ? "border-red-200 bg-red-50 text-red-900"
          : "border-emerald-200 bg-emerald-50 text-emerald-900",
      )}
    >
      {message}
    </div>
  );
}

type Mode = "signin" | "signup";

export function ResellerPortalClient() {
  const [mode, setMode] = useState<Mode>("signin");

  return (
    <div className="bg-white">
      <Container className="px-0 pb-10 sm:pb-16 sm:px-0 border-b border-zinc-200">
        <Reveal onMount className="max-w-3xl">
          <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
            For Partners
          </div>
          <h1 className="mt-3 text-[34px] font-extrabold leading-[0.95] tracking-tight text-zinc-950 sm:text-6xl">
            Built around real partnership.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:text-[18px]">
            VTI sells exclusively through certified resellers and integrators.
            Local support, direct factory access, and a team that picks up the
            phone.
          </p>
        </Reveal>
      </Container>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-10 xl:gap-16 py-10 sm:py-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Reseller portal access
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            {mode === "signin" ? (
              <>Already a VTI reseller?</>
            ) : (
              <>Interested in becoming a reseller?</>
            )}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-600">
            {mode === "signin" ? (
              <>
                Sign in to access pricing sheets, generate quotes, register
                deals, and download marketing assets.
              </>
            ) : (
              <>
                Tell us about your business and we'll set up portal access for your team. Most applications get a response within one business day.
              </>
            )}
          </p>

          <div
            className="mt-8 flex w-full flex-col gap-2 rounded-2xl bg-zinc-100 p-1.5 sm:max-w-md sm:flex-row lg:w-[50%]"
            role="tablist"
            aria-label="Sign in or sign up"
          >
            <motion.button
              type="button"
              role="tab"
              id="tab-signin"
              aria-selected={mode === "signin"}
              aria-controls="tabpanel-auth"
              onClick={() => setMode("signin")}
              whileTap={tapPress}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 cursor-pointer",
                mode === "signin"
                  ? "border-zinc-300/80 bg-white text-red-600 shadow-sm"
                  : "border-transparent bg-transparent text-zinc-700 hover:bg-zinc-200/50 cursor-pointer",
              )}
            >
              <IconLogIn className="h-5 w-5 shrink-0" />
              Sign In
            </motion.button>
            <motion.button
              type="button"
              role="tab"
              id="tab-signup"
              aria-selected={mode === "signup"}
              aria-controls="tabpanel-auth"
              onClick={() => setMode("signup")}
              whileTap={tapPress}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 cursor-pointer",
                mode === "signup"
                  ? "border-zinc-300/80 bg-white text-red-600 shadow-sm"
                  : "border-transparent bg-transparent text-zinc-700 hover:bg-zinc-200/50 cursor-pointer",
              )}
            >
              <IconUserPlus className="h-5 w-5 shrink-0" />
              Sign Up
            </motion.button>
          </div>

          <RevealGroup as="ul" className="mt-10 space-y-3.5">
            {benefits.map((line) => (
              <RevealItem
                as="li"
                key={line}
                className="flex gap-3 text-sm text-zinc-800"
              >
                <span className="mt-0.5 shrink-0">
                  <IconCheck className="h-5 w-5" />
                </span>
                <span>{line}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        <Reveal
          delay={0.1}
          id="tabpanel-auth"
          role="tabpanel"
          aria-labelledby={mode === "signin" ? "tab-signin" : "tab-signup"}
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {mode === "signin" ? <SignInForm /> : <SignUpForm />}
        </Reveal>
      </div>
    </div>
  );
}

function ResendVerificationButton({
  email,
  firstName,
}: {
  email: string;
  firstName?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleResend() {
    if (loading || !email) return;
    setLoading(true);
    setMsg(null);
    const result = await resellerResendVerification(email, firstName);
    setLoading(false);
    setMsg(
      result.ok
        ? "Verification email sent. Check your inbox."
        : result.error,
    );
  }

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <p className="font-medium">Email not verified yet</p>
      <p className="mt-1 text-amber-900/90">
        Open the link we sent to <span className="font-semibold">{email}</span>{" "}
        or request a new one.
      </p>
      <button
        type="button"
        onClick={handleResend}
        disabled={loading}
        className="mt-3 text-sm font-semibold text-red-600 hover:text-red-700 disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Sending…" : "Resend verification email"}
      </button>
      {msg ? <p className="mt-2 text-xs font-medium">{msg}</p> : null}
    </div>
  );
}

function SignInForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;
    setFormError(null);
    setFieldErrors({});
    setUnverifiedEmail(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: ResellerSigninPayload = {
      email: String(fd.get("email") ?? "").trim(),
      password: String(fd.get("password") ?? ""),
    };

    const clientErrors = validateSignin(payload);
    if (clientErrors) {
      setFieldErrors(clientErrors);
      return;
    }

    setIsSubmitting(true);
    const result = await resellerSignin(payload);
    setIsSubmitting(false);

    if (result.ok) {
      router.push("/resellers/dashboard");
      router.refresh();
      return;
    }

    if (result.code === "EMAIL_NOT_VERIFIED") {
      setUnverifiedEmail(payload.email);
    }
    if (result.code === "ACCOUNT_PENDING" || result.code === "PORTAL_NOT_READY") {
      setFormError(result.error);
      return;
    }
    if (result.fields) setFieldErrors(result.fields);
    setFormError(result.error);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {unverifiedEmail ? (
        <ResendVerificationButton email={unverifiedEmail} />
      ) : null}
      {formError ? <FormAlert message={formError} /> : null}

      <div>
        <label
          htmlFor="portal-email"
          className="text-sm font-medium text-zinc-950"
        >
          Work email {requiredMark}
        </label>
        <div className="relative mt-1.5">
          <span
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            aria-hidden
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16v12H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </span>
          <input
            id="portal-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@yourcompany.com"
            aria-invalid={Boolean(fieldErrors.email)}
            className={cn(inputClass, fieldErrors.email && fieldErrorClass)}
          />
        </div>
        <FieldError message={fieldErrors.email} />
      </div>

      <div>
        <label
          htmlFor="portal-password"
          className="text-sm font-medium text-zinc-950"
        >
          Password {requiredMark}
        </label>
        <div className="relative mt-1.5">
          <span
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            aria-hidden
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="4" y="10" width="16" height="10" rx="1" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </span>
          <input
            id="portal-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={Boolean(fieldErrors.password)}
            className={cn(inputClass, fieldErrors.password && fieldErrorClass)}
          />
        </div>
        <FieldError message={fieldErrors.password} />
        <div className="mt-2 text-right">
          <a
            href="mailto:info@vtiusa.com?subject=Reseller%20portal%20password%20help"
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        whileHover={isSubmitting ? undefined : hoverLift}
        whileTap={isSubmitting ? undefined : tapPress}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-red-600 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? "Signing in…" : "Sign in to portal"}
        {isSubmitting ? null : (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        )}
      </motion.button>
    </form>
  );
}

function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [pendingFirstName, setPendingFirstName] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;
    setFormError(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: ResellerSignupPayload = {
      fullName: String(fd.get("fullName") ?? "").trim(),
      companyName: String(fd.get("companyName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      state: String(fd.get("state") ?? "").trim(),
      businessType: String(fd.get("businessType") ?? "").trim(),
      about: String(fd.get("about") ?? "").trim(),
      password: String(fd.get("password") ?? ""),
      confirmPassword: String(fd.get("confirmPassword") ?? ""),
    };

    const clientErrors = validateSignup(payload);
    if (clientErrors) {
      setFieldErrors(clientErrors);
      return;
    }

    setIsSubmitting(true);
    const result = await resellerSignup(payload);
    setIsSubmitting(false);

    if (result.ok) {
      setPendingEmail(result.email);
      setPendingFirstName(firstNameFromFullName(payload.fullName));
      form.reset();
      return;
    }

    if (result.code === "EMAIL_EXISTS_UNVERIFIED") {
      setPendingEmail(payload.email);
      setPendingFirstName(firstNameFromFullName(payload.fullName));
    }
    if (result.fields) setFieldErrors(result.fields);
    setFormError(result.error);
  }

  if (pendingEmail) {
    return (
      <div className="space-y-5 text-center">
        <FormAlert
          message="Account created. Verify your email, then wait for admin approval before signing in."
          variant="success"
        />
        <p className="text-sm text-zinc-600">
          We sent a verification link to{" "}
          <span className="font-semibold text-zinc-900">{pendingEmail}</span>.
          The link expires in 24 hours.
        </p>
        <ResendVerificationButton
          email={pendingEmail}
          firstName={pendingFirstName}
        />
        <button
          type="button"
          onClick={() => setPendingEmail(null)}
          className="text-sm font-semibold text-red-600 hover:text-red-700 cursor-pointer"
        >
          Back to sign up
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {formError ? <FormAlert message={formError} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="su-fullname" className={labelClass}>
            Full name {requiredMark}
          </label>
          <input
            id="su-fullname"
            name="fullName"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.fullName)}
            className={cn(
              "mt-1.5",
              fieldClass,
              fieldErrors.fullName && fieldErrorClass,
            )}
          />
          <FieldError message={fieldErrors.fullName} />
        </div>
        <div>
          <label htmlFor="su-company" className={labelClass}>
            Company / organization {requiredMark}
          </label>
          <input
            id="su-company"
            name="companyName"
            type="text"
            autoComplete="organization"
            aria-invalid={Boolean(fieldErrors.companyName)}
            className={cn(
              "mt-1.5",
              fieldClass,
              fieldErrors.companyName && fieldErrorClass,
            )}
          />
          <FieldError message={fieldErrors.companyName} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="su-email" className={labelClass}>
            Work email {requiredMark}
          </label>
          <input
            id="su-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@yourcompany.com"
            aria-invalid={Boolean(fieldErrors.email)}
            className={cn(
              "mt-1.5",
              fieldClass,
              fieldErrors.email && fieldErrorClass,
            )}
          />
          <FieldError message={fieldErrors.email} />
        </div>
        <div>
          <label htmlFor="su-phone" className={labelClass}>
            Phone {requiredMark}
          </label>
          <input
            id="su-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(fieldErrors.phone)}
            className={cn(
              "mt-1.5",
              fieldClass,
              fieldErrors.phone && fieldErrorClass,
            )}
          />
          <FieldError message={fieldErrors.phone} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="su-password" className={labelClass}>
            Password {requiredMark}
          </label>
          <input
            id="su-password"
            name="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(fieldErrors.password)}
            className={cn(
              "mt-1.5",
              fieldClass,
              fieldErrors.password && fieldErrorClass,
            )}
          />
          <FieldError message={fieldErrors.password} />
          <p className="mt-1 text-xs text-zinc-500">
            At least 8 characters with upper, lower, and a number.
          </p>
        </div>
        <div>
          <label htmlFor="su-confirm" className={labelClass}>
            Confirm password {requiredMark}
          </label>
          <input
            id="su-confirm"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(fieldErrors.confirmPassword)}
            className={cn(
              "mt-1.5",
              fieldClass,
              fieldErrors.confirmPassword && fieldErrorClass,
            )}
          />
          <FieldError message={fieldErrors.confirmPassword} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="su-city" className={labelClass}>
            City {requiredMark}
          </label>
          <input
            id="su-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            aria-invalid={Boolean(fieldErrors.city)}
            className={cn(
              "mt-1.5",
              fieldClass,
              fieldErrors.city && fieldErrorClass,
            )}
          />
          <FieldError message={fieldErrors.city} />
        </div>
        <div>
          <label htmlFor="su-state" className={labelClass}>
            State {requiredMark}
          </label>
          <input
            id="su-state"
            name="state"
            type="text"
            autoComplete="address-level1"
            placeholder="e.g. GA"
            aria-invalid={Boolean(fieldErrors.state)}
            className={cn(
              "mt-1.5",
              fieldClass,
              fieldErrors.state && fieldErrorClass,
            )}
          />
          <FieldError message={fieldErrors.state} />
        </div>
      </div>

      <div>
        <label htmlFor="su-business-type" className={labelClass}>
          Business type / experience {requiredMark}
        </label>
        <select
          id="su-business-type"
          name="businessType"
          defaultValue=""
          aria-invalid={Boolean(fieldErrors.businessType)}
          className={cn(
            "mt-1.5",
            fieldClass,
            fieldErrors.businessType && fieldErrorClass,
          )}
        >
          {BUSINESS_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value || "empty"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <FieldError message={fieldErrors.businessType} />
      </div>

      <div>
        <label htmlFor="su-about" className={labelClass}>
          Tell us about yourself {requiredMark}
        </label>
        <textarea
          id="su-about"
          name="about"
          rows={4}
          placeholder="A bit about your business, the markets you serve, and why you're interested in partnering with VTI."
          aria-invalid={Boolean(fieldErrors.about)}
          className={cn(
            "mt-1.5",
            textareaClass,
            fieldErrors.about && fieldErrorClass,
          )}
        />
        <FieldError message={fieldErrors.about} />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        whileHover={isSubmitting ? undefined : hoverLift}
        whileTap={isSubmitting ? undefined : tapPress}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-red-600 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? "Creating account…" : "Create account"}
        {isSubmitting ? null : <IconUserPlus className="h-4 w-4" />}
      </motion.button>
    </form>
  );
}
