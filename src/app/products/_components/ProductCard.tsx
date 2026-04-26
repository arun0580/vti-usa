"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/site/Button";
import { cn } from "@/lib/cn";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("shrink-0", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

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

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ProductCard({
  name,
  badge,
  imageSrc,
  sizes,
  desc,
  highlights,
  actions,
}: {
  name: string;
  badge?: string;
  imageSrc?: string;
  sizes?: string;
  desc: string;
  highlights: readonly string[];
  actions?: readonly { label: string; href: string }[];
}) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md hover:shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:shadow-zinc-950/20">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900/40">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 400px, 92vw"
            priority={name === "VT13-IR Series"}
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex min-h-[1.5rem] items-center justify-between gap-3">
          {badge ? (
            <span className="inline-flex min-w-0 items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <StarIcon className="h-3 w-3" />
              {badge}
            </span>
          ) : null}
          {sizes ? (
            <span
              className={cn(
                "shrink-0 text-xs font-medium text-zinc-500 dark:text-zinc-400",
                !badge && "ml-auto text-right",
              )}
            >
              {sizes}
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 text-left text-xl font-bold leading-snug text-zinc-950 dark:text-zinc-50">
          {name}
        </h3>

        <p className="mt-2 text-left text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {desc}
        </p>

        <ul className="mt-4 grid list-none grid-cols-1 gap-x-3 gap-y-1.5 p-0 text-xs text-zinc-800 sm:grid-cols-2 sm:text-[0.85rem] dark:text-zinc-200/90">
          {highlights.slice(0, 6).map((h) => (
            <li key={h} className="flex items-start gap-2">
              <CircleCheckIcon />
              <span className="leading-5">{h}</span>
            </li>
          ))}
        </ul>

        {actions?.length ? (
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            {actions.map((a, idx) =>
              idx === 0 ? (
                <Link
                  key={a.label}
                  href={a.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline dark:text-red-500 dark:hover:text-red-400"
                >
                  {a.label}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <ButtonLink
                  key={a.label}
                  href={a.href}
                  variant="secondary"
                  size="sm"
                >
                  {a.label}
                </ButtonLink>
              ),
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
