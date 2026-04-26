import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

function CircleCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("mt-0.5 h-4 w-4 shrink-0 text-red-600", className)}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

type ChecklistLineProps = {
  children: ReactNode;
  className?: string;
};

export function ChecklistLine({ children, className }: ChecklistLineProps) {
  return (
    <div className={cn("flex items-start gap-2.5", className)}>
      <CircleCheckIcon />
      <span className="text-sm text-zinc-600 leading-relaxed">{children}</span>
    </div>
  );
}

function FilledCircleCheckIcon() {
  return (
    <span
      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-white"
      aria-hidden
    >
      <svg
        className="h-2.5 w-2.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.5l4.5 4.5L19 6" />
      </svg>
    </span>
  );
}

type FilledChecklistLineProps = {
  children: ReactNode;
  className?: string;
};

export function FilledChecklistLine({
  children,
  className,
}: FilledChecklistLineProps) {
  return (
    <div className={cn("flex items-start gap-2.5", className)}>
      <FilledCircleCheckIcon />
      <span className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
        {children}
      </span>
    </div>
  );
}
