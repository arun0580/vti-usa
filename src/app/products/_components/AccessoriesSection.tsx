import type { ReactNode } from "react";
import { ButtonLink } from "@/components/site/Button";
import { accessoriesLineup } from "../_data/lineups";
import {
  Cable,
  Camera,
  Hand,
  HardDrive,
  Keyboard,
  Speaker,
} from "lucide-react";

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
  return <HardDrive className={className} />;
}

function IconVideo({ className }: { className?: string }) {
  return <Camera className={className} />;
}

function IconVolume({ className }: { className?: string }) {
  return <Speaker className={className} />;
}

function IconKeyboard({ className }: { className?: string }) {
  return <Keyboard className={className} />;
}

function IconHand({ className }: { className?: string }) {
  return <Hand className={className} />;
}

function IconCable({ className }: { className?: string }) {
  return <Cable className={className} />;
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
        <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
          Everything that goes around the panel.
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600 sm:text-base">
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
              className="flex h-full min-h-0 flex-col rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm shadow-zinc-950/5"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-100/90 bg-rose-50/90 text-red-600"
                aria-hidden
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug text-zinc-950">
                {item.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-base font-semibold text-zinc-950">
              Need a full kit?
            </div>
            <p className="mt-1 text-sm leading-6 text-zinc-600">
              Tell us the room — we&apos;ll spec the panel, OPS, mount, and
              camera.
            </p>
          </div>
          <ButtonLink
            href="/contact"
            className="!bg-red-600 !text-white hover:!bg-red-700 !focus-visible:outline-none !focus-visible:ring-2 !focus-visible:ring-red-500/40"
          >
            Request a kit quote
            <span aria-hidden="true" className="ml-1">
              →
            </span>
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
