"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { adminSignout } from "@/lib/admin-auth/api";
import type { AdminProfile } from "@/lib/admin-auth/types";

function initials(admin: AdminProfile): string {
  const first = admin.firstName.trim().charAt(0);
  const last = admin.lastName.trim().charAt(0);
  return (first + last).toUpperCase() || "A";
}

export function AdminProfileMenu({ admin }: { admin: AdminProfile }) {
  const router = useRouter();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    await adminSignout();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 cursor-pointer"
      >
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white"
          aria-hidden
        >
          {initials(admin)}
        </span>
        <span className="hidden max-w-[140px] truncate sm:inline">
          {admin.firstName} {admin.lastName}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={cn("h-4 w-4 text-zinc-500 transition-transform", open && "rotate-180")}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg"
        >
          <div className="border-b border-zinc-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-zinc-950">
              {admin.firstName} {admin.lastName}
            </p>
            <p className="truncate text-xs text-zinc-500">{admin.email}</p>
          </div>
          <Link
            href="/admin/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full px-4 py-2.5 text-left text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50"
          >
            Profile
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            disabled={signingOut}
            className="flex w-full px-4 py-2.5 text-left text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50 disabled:opacity-60 cursor-pointer"
          >
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
