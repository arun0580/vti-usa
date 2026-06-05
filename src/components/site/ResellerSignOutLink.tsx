"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { resellerSignout } from "@/lib/reseller-auth/api";
import { cn } from "@/lib/cn";

export function ResellerSignOutLink({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    if (loading) return;
    setLoading(true);
    await resellerSignout();
    router.push("/resellers");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className={cn(
        "hidden text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 disabled:opacity-60 sm:inline cursor-pointer",
        className,
      )}
    >
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
