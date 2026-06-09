"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/site/Container";
import { Logo } from "@/components/site/Logo";
import { adminSignin, adminSignout } from "@/lib/admin-auth/api";

export function AdminLoginClient() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (searchParams.get("error") === "session") {
      setError(
        "Your session could not be verified. Sign in again. If this keeps happening, check RESELLER_API_URL on the web server.",
      );
      void adminSignout();
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setIsSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const result = await adminSignin({
      email: String(fd.get("email") ?? "").trim(),
      password: String(fd.get("password") ?? ""),
    });
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    // Full page load so the new httpOnly cookie is sent on the next request
    window.location.assign("/admin/resellers");
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-4 py-4 sm:px-6">
        <Logo
          href="/admin/login"
          imageClassName="rounded-md object-contain h-9 w-auto"
        />
      </header>
      <div className="py-16">
        <Container className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          Approve reseller applications before they can access the portal.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          {error ? (
            <p className="text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div>
            <label htmlFor="admin-email" className="text-sm font-medium text-zinc-950">
              Email
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="mt-1.5 h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="text-sm font-medium text-zinc-950"
            >
              Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1.5 h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-red-600 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
        </Container>
      </div>
    </div>
  );
}
