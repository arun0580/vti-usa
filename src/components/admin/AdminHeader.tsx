"use client";

import { Logo } from "@/components/site/Logo";
import type { AdminProfile } from "@/lib/admin-auth/types";
import { AdminProfileMenu } from "./AdminProfileMenu";

export function AdminHeader({
  admin,
  onMenuToggle,
}: {
  admin: AdminProfile;
  onMenuToggle?: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-zinc-200 bg-white px-4 sm:px-6">
      {onMenuToggle ? (
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label="Open menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 lg:hidden cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}

      <Logo
        href="/admin/resellers"
        imageClassName="rounded-md object-contain h-9 w-auto"
      />

      <div className="ml-auto">
        <AdminProfileMenu admin={admin} />
      </div>
    </header>
  );
}
