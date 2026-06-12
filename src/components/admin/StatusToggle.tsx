"use client";

import { cn } from "@/lib/cn";

export function StatusToggle({
  active,
  onChange,
  disabled,
  label = "Announcement status",
}: {
  active: boolean;
  onChange: (active: boolean) => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      aria-label={active ? `${label}: active` : `${label}: inactive`}
      disabled={disabled}
      onClick={() => onChange(!active)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
        active ? "bg-emerald-500" : "bg-zinc-300",
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform",
          active ? "translate-x-[18px]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}
