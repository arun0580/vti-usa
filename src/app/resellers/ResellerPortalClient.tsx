"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const benefits = [
  "Pricing sheets & current price lists",
  "Generate customer quotes",
  "Deal registration & territory protection",
  "Loaner / demo unit requests",
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
      <circle cx="12" cy="12" r="10" className="fill-red-600 dark:fill-red-500" />
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

function IconInfo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

const inputClass =
  "h-12 w-full rounded-lg border border-zinc-200 bg-white pl-11 pr-3 text-sm text-zinc-950 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-red-500/50";

const fieldClass =
  "h-12 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-red-500/50";

const textareaClass =
  "min-h-[140px] w-full rounded-lg border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-950 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-red-500/50";

const selectClass =
  "h-12 w-full appearance-none rounded-lg border border-zinc-200 bg-white bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 text-sm text-zinc-950 shadow-sm focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-red-500/50 " +
  "[background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")]";

const businessTypeOptions = [
  { value: "", label: "Select one" },
  { value: "av-integrator", label: "AV integrator" },
  { value: "it-var", label: "IT reseller / VAR" },
  { value: "edtech", label: "Education technology provider" },
  { value: "gov", label: "Government contractor" },
  { value: "other", label: "Other" },
] as const;

type Mode = "signin" | "signup";

export function ResellerPortalClient() {
  const [mode, setMode] = useState<Mode>("signin");
  const [signedIn, setSignedIn] = useState(false);
  const [signupSent, setSignupSent] = useState(false);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-10 xl:gap-16">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 dark:text-red-500">
          Reseller portal access
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          {mode === "signin" ? (
            <>Already a VTI reseller?</>
          ) : (
            <>Interested in becoming a reseller?</>
          )}
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          {mode === "signin" ? (
            <>
              Sign in to access pricing sheets, generate quotes, register deals,
              request loaner units, and download marketing assets.
            </>
          ) : (
            <>
              Tell us about your business and we&apos;ll set up portal access
              for your team. Most applications get a response within one
              business day.
            </>
          )}
        </p>

        <div
          className="mt-8 flex flex-col gap-2 rounded-2xl bg-zinc-100 p-1.5 sm:flex-row dark:bg-zinc-800/80"
          role="tablist"
          aria-label="Sign in or sign up"
        >
          <button
            type="button"
            role="tab"
            id="tab-signin"
            aria-selected={mode === "signin"}
            aria-controls="tabpanel-auth"
            onClick={() => {
              setMode("signin");
              setSignupSent(false);
            }}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40",
              mode === "signin"
                ? "border-zinc-300/80 bg-white text-red-600 shadow-sm dark:border-zinc-600 dark:bg-zinc-950"
                : "border-transparent bg-transparent text-zinc-700 hover:bg-zinc-200/50 dark:text-zinc-300 dark:hover:bg-zinc-700/50",
            )}
          >
            <IconLogIn className="h-5 w-5 shrink-0" />
            Sign In
          </button>
          <button
            type="button"
            role="tab"
            id="tab-signup"
            aria-selected={mode === "signup"}
            aria-controls="tabpanel-auth"
            onClick={() => {
              setMode("signup");
              setSignedIn(false);
            }}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40",
              mode === "signup"
                ? "border-zinc-300/80 bg-white text-red-600 shadow-sm dark:border-zinc-600 dark:bg-zinc-950"
                : "border-transparent bg-transparent text-zinc-700 hover:bg-zinc-200/50 dark:text-zinc-300 dark:hover:bg-zinc-700/50",
            )}
          >
            <IconUserPlus className="h-5 w-5 shrink-0" />
            Sign Up
          </button>
        </div>

        <ul className="mt-10 space-y-3.5">
          {benefits.map((line) => (
            <li key={line} className="flex gap-3 text-sm text-zinc-800 dark:text-zinc-200">
              <span className="mt-0.5 shrink-0">
                <IconCheck className="h-5 w-5" />
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        id="tabpanel-auth"
        role="tabpanel"
        aria-labelledby={mode === "signin" ? "tab-signin" : "tab-signup"}
        className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-950"
      >
        {mode === "signin" ? (
          <SignInForm
            onSuccess={() => setSignedIn(true)}
            signedIn={signedIn}
            onReset={() => setSignedIn(false)}
          />
        ) : (
          <SignUpForm
            onSuccess={() => setSignupSent(true)}
            sent={signupSent}
            onReset={() => setSignupSent(false)}
          />
        )}
      </div>
    </div>
  );
}

function SignInForm({
  signedIn,
  onSuccess,
  onReset,
}: {
  signedIn: boolean;
  onSuccess: () => void;
  onReset: () => void;
}) {
  if (signedIn) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          You&apos;re signed in (demo).
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          A live portal would show pricing, assets, and your rep tools here.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-500"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSuccess();
      }}
    >
      <div className="flex gap-3 rounded-xl bg-zinc-100 p-4 text-sm text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-300">
        <IconInfo className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" />
        <p>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            Demo mode:
          </span>{" "}
          any email and password will sign you in. Real authentication is
          coming soon.
        </p>
      </div>

      <div>
        <label
          htmlFor="portal-email"
          className="text-sm font-medium text-zinc-950 dark:text-zinc-100"
        >
          Work email <span className="text-red-600">*</span>
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
            required
            placeholder="you@yourcompany.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-2">
          <label
            htmlFor="portal-password"
            className="text-sm font-medium text-zinc-950 dark:text-zinc-100"
          >
            Password <span className="text-red-600">*</span>
          </label>
        </div>
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
            required
            minLength={1}
            placeholder="••••••••"
            className={inputClass}
          />
        </div>
        <div className="mt-2 text-right">
          <a
            href="mailto:info@vtiusa.com?subject=Reseller%20portal%20password%20help"
            className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-500"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-red-600 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 dark:bg-red-600 dark:hover:bg-red-500"
      >
        Sign in to portal
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
      </button>
    </form>
  );
}

const labelClass =
  "text-sm font-medium text-zinc-950 dark:text-zinc-100";
const requiredMark = <span className="text-red-600">*</span>;

function SignUpForm({
  sent,
  onSuccess,
  onReset,
}: {
  sent: boolean;
  onSuccess: () => void;
  onReset: () => void;
}) {
  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          Application received (demo).
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          A live flow would email our partner team. You can also reach us via{" "}
          <Link href="/contact" className="font-medium text-red-600">
            contact
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold text-red-600 hover:text-red-700"
        >
          Back to form
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSuccess();
      }}
    >
      <div className="flex gap-3 rounded-xl bg-zinc-100 p-4 text-sm leading-relaxed text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-300">
        <IconInfo className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
        <p>
          Tell us about your business below. A VTI team member will reach out
          to confirm your application — typically within{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            24–48 hours
          </span>
          . No password needed yet; we&apos;ll set up your portal access once
          you&apos;re approved.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="su-fullname" className={labelClass}>
            Full name {requiredMark}
          </label>
          <input
            id="su-fullname"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className={cn("mt-1.5", fieldClass)}
          />
        </div>
        <div>
          <label htmlFor="su-company" className={labelClass}>
            Company / organization {requiredMark}
          </label>
          <input
            id="su-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            className={cn("mt-1.5", fieldClass)}
          />
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
            required
            autoComplete="email"
            placeholder="you@yourcompany.com"
            className={cn("mt-1.5", fieldClass)}
          />
        </div>
        <div>
          <label htmlFor="su-phone" className={labelClass}>
            Phone {requiredMark}
          </label>
          <input
            id="su-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={cn("mt-1.5", fieldClass)}
          />
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
            required
            autoComplete="address-level2"
            className={cn("mt-1.5", fieldClass)}
          />
        </div>
        <div>
          <label htmlFor="su-state" className={labelClass}>
            State {requiredMark}
          </label>
          <input
            id="su-state"
            name="state"
            type="text"
            required
            autoComplete="address-level1"
            placeholder="e.g. GA"
            className={cn("mt-1.5", fieldClass)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="su-business" className={labelClass}>
          Business type / experience {requiredMark}
        </label>
        <div className="relative mt-1.5">
          <select
            id="su-business"
            name="businessType"
            required
            defaultValue=""
            className={selectClass}
          >
            {businessTypeOptions.map((opt) => (
              <option key={opt.value || "placeholder"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="su-message" className={labelClass}>
          Tell us about yourself
        </label>
        <textarea
          id="su-message"
          name="about"
          rows={5}
          placeholder="A bit about your business, the markets you serve, and why you&apos;re interested in partnering with VTI."
          className={cn("mt-1.5", textareaClass)}
        />
      </div>

      <div className="space-y-3">
        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-red-600 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
        >
          Submit application
          <IconUserPlus className="h-4 w-4" />
        </button>
        <p className="text-center text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          A member of our partner team will reach out to you, usually within
          24–48 hours, to confirm your application and set up portal access.
        </p>
      </div>
    </form>
  );
}
