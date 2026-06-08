"use client";

import { useEffect, useState } from "react";
import type { AdminProfile } from "@/lib/admin-auth/types";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export function AdminPortalShell({
  admin,
  children,
}: {
  admin: AdminProfile;
  children: React.ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <AdminHeader
        admin={admin}
        onMenuToggle={() => setMobileNavOpen(true)}
      />

      <div className="flex flex-1">
        <AdminSidebar className="hidden lg:flex" />

        {mobileNavOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
              className="absolute inset-0 bg-zinc-950/40"
            />
            <AdminSidebar
              className="relative z-10 h-full shadow-xl"
              onNavigate={() => setMobileNavOpen(false)}
            />
          </div>
        ) : null}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
