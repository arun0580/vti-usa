"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/site/PasswordInput";
import { adminSignin, adminSignout } from "@/lib/admin-auth/api";
import logoAsset from "../../../../public/logo.png";

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
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <Image
            src={logoAsset}
            alt="VTI USA"
            width={logoAsset.width}
            height={logoAsset.height}
            className="h-14 w-auto object-contain"
            priority
            unoptimized
          />
          <h1 className="mt-4 text-2xl font-semi-bold tracking-tight text-zinc-950">
            Content Management System
          </h1>
        </div>

        <div className="my-6 border-t border-zinc-200" />

        <form onSubmit={handleSubmit} className="space-y-6">
          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600" role="alert">
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
            <div className="mt-1.5">
              <PasswordInput
                id="admin-password"
                name="password"
                required
                autoComplete="current-password"
                className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-3 pr-11 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-red-600 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
