"use client";

import { useEffect } from "react";

export const DEFAULT_PORTAL_COMING_SOON_MESSAGE =
  "Coming soon — this action will be wired up with the real portal backend.";

export function hasPortalLink(href?: string): boolean {
  const value = href?.trim() ?? "";
  return value !== "" && value !== "#";
}

export function PortalComingSoonPopover({
  open,
  message = DEFAULT_PORTAL_COMING_SOON_MESSAGE,
  onClose,
}: {
  open: boolean;
  message?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, 4500);
    return () => window.clearTimeout(timer);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-zinc-200 bg-white px-4 py-3 pr-8 text-sm leading-snug text-zinc-800 shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:bottom-8 sm:right-8"
    >
      <div className="relative flex items-center gap-2.5">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-5 w-5 shrink-0"
        >
          <circle cx="10" cy="10" r="10" fill="#09090b" />
          <circle cx="10" cy="6.1" r="1.2" fill="white" />
          <rect x="8.85" y="8.4" width="2.3" height="6.2" rx="0.35" fill="white" />
        </svg>
        <p className="font-semibold text-zinc-950">{message}</p>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="absolute -right-1 -top-1 text-lg leading-none text-zinc-400 hover:text-zinc-600"
        >
          ×
        </button>
      </div>
    </div>
  );
}
