import type { ReactNode } from "react";
import { ButtonLink } from "@/components/site/Button";
import { cn } from "@/lib/cn";
import { accessoriesLineup } from "../_data/lineups";

/* Icon paths from Lucide (v0.460) — ISC, https://lucide.dev */

function SvgFrame({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function IconCpu({ className }: { className?: string }) {
  return (
    <SvgFrame className={className}>
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </SvgFrame>
  );
}

function IconVideo({ className }: { className?: string }) {
  return (
    <SvgFrame className={className}>
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </SvgFrame>
  );
}

function IconVolume({ className }: { className?: string }) {
  return (
    <SvgFrame className={className}>
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
      <path d="M16 9a5 5 0 0 1 0 6" />
      <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
    </SvgFrame>
  );
}

function IconKeyboard({ className }: { className?: string }) {
  return (
    <SvgFrame className={className}>
      <path d="M10 8h.01" />
      <path d="M12 12h.01" />
      <path d="M14 8h.01" />
      <path d="M16 12h.01" />
      <path d="M18 8h.01" />
      <path d="M6 8h.01" />
      <path d="M7 16h10" />
      <path d="M8 12h.01" />
      <rect width="20" height="16" x="2" y="4" rx="2" />
    </SvgFrame>
  );
}

function IconHand({ className }: { className?: string }) {
  return (
    <SvgFrame className={className}>
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </SvgFrame>
  );
}

function IconCable({ className }: { className?: string }) {
  return (
    <SvgFrame className={className}>
      <path d="M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1" />
      <path d="M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9" />
      <path d="M21 21v-2h-4" />
      <path d="M3 5h4V3" />
      <path d="M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3" />
    </SvgFrame>
  );
}

const ACCESSORY_ICONS = {
  cpu: IconCpu,
  video: IconVideo,
  volume: IconVolume,
  keyboard: IconKeyboard,
  hand: IconHand,
  cable: IconCable,
} as const;

export function AccessoriesSection() {
  return (
    <section className="mt-14 scroll-mt-24 sm:mt-16" id="accessories">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          Everything that goes around the panel.
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-base">
          Stands, cameras, keyboards, OPS computers, and the cables in between.
          Order it all from the same rep who sold you the display — no hunting
          across vendors.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {accessoriesLineup.map((item) => {
          const Icon = ACCESSORY_ICONS[item.icon];
          return (
            <div
              key={item.name}
              className={cn(
                "flex h-full min-h-0 flex-col rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm shadow-zinc-950/5",
                "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none",
              )}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-100/90 bg-rose-50/90 text-red-600 dark:border-red-900/35 dark:bg-red-950/30 dark:text-red-400"
                aria-hidden
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug text-zinc-950 dark:text-zinc-50">
                {item.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/20 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              Need a full kit?
            </div>
            <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Tell us the room — we&apos;ll spec the panel, OPS, mount, camera, and
              cabling as one bundle.
            </p>
          </div>
          <ButtonLink
            href="/contact"
            className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Request a kit quote
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
