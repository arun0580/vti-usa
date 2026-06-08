"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion";
import { resellerVerifyEmail } from "@/lib/reseller-auth/api";

type Status = "idle" | "verifying" | "success" | "error";

export function VerifyEmailClient({ token }: { token: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(token ? "verifying" : "error");
  const [message, setMessage] = useState(
    token
      ? "Verifying Your Email…"
      : "Missing Verification Link. Open The Link From Your Email Or Request A New One From The Sign-In Page.",
  );

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    async function verify() {
      const result = await resellerVerifyEmail(token);
      if (cancelled) return;

      if (result.ok) {
        setStatus("success");
        if (result.pendingApproval) {
          setMessage(
            "Your Email Is Verified. Your Account Is Awaiting Admin Approval — You Can Sign In Once Approved.",
          );
          return;
        }
        setMessage("Your Email Is Verified. Redirecting To Your Dashboard…");
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
        Email Verification
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
            Back To Reseller Portal
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
            Back To Reseller Portal
          </Link>
        </motion.div>
      ) : null}
    </Reveal>
  );
}
