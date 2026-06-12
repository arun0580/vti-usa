"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion";
import { resellerVerifyEmail } from "@/lib/reseller-auth/api";

type Status = "idle" | "verifying" | "success" | "error";

export function VerifyEmailClient({ token }: { token: string }) {
  const router = useRouter();
  const verifyStartedRef = useRef(false);
  const [status, setStatus] = useState<Status>(token ? "verifying" : "error");
  const [message, setMessage] = useState(
    token
      ? "Verifying your email…"
      : "Missing verification link. Open the link from your email or request a new one from the sign-in page.",
  );

  useEffect(() => {
    if (!token || verifyStartedRef.current) return;
    verifyStartedRef.current = true;

    let cancelled = false;

    async function verify() {
      const result = await resellerVerifyEmail(token);
      if (cancelled) return;

      if (result.ok) {
        setStatus("success");
        if (result.pendingApproval) {
          setMessage(
            "Your email is verified. Your account is awaiting admin approval — you can sign in once approved.",
          );
          return;
        }
        setMessage("Your email is verified. Redirecting to your dashboard…");
        router.push("/resellers/dashboard");
        router.refresh();
        return;
      }

      setStatus("error");
      setMessage(result.error);
    }

    void verify();
    return () => {
      cancelled = true;
    };
  }, [token, router]);

  return (
    <Reveal onMount className="mx-auto max-w-lg text-center">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
        Email verification
      </h1>
      <p
        className={`mt-4 text-base leading-relaxed ${
          status === "error" ? "text-red-700" : "text-zinc-600"
        }`}
        role="status"
        aria-live="polite"
      >
        {status === "verifying" ? message : message}
      </p>

      {status === "error" ? (
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/resellers"
            className="text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Back to reseller portal
          </Link>
        </div>
      ) : null}

      {status === "success" ? (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Link
            href="/resellers"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-red-600 px-6 text-sm font-semibold text-white hover:bg-red-700"
          >
            Back to reseller portal
          </Link>
        </motion.div>
      ) : null}
    </Reveal>
  );
}
