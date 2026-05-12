"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { hoverLift } from "@/lib/motion";
import { FilledChecklistLine } from "./ChecklistLine";

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

export function CatalogCard({
  name,
  badge,
  sizes,
  desc,
  imageSrc,
  videoSrc,
  ctaLabel,
  ctaHref,
  ctaDownload,
  specCheckItems,
}: {
  name: string;
  badge: string;
  sizes: string;
  desc: string;
  imageSrc: string;
  /** When set, renders a muted, looping autoplay video instead of the image. `imageSrc` is used as the poster frame. */
  videoSrc?: string;
  ctaLabel: string;
  ctaHref: string;
  /** When set, renders a native file download (e.g. `vti-spec-packet.pdf`). */
  ctaDownload?: string;
  /** Filled red checkmarks in a 2-col grid, below description (e.g. pro-series specs). */
  specCheckItems?: string[];
}) {
  const ctaClassName = "text-sm font-semibold text-red-600 hover:text-red-700";
  const ctaInner = (
    <>
      {ctaLabel} <span aria-hidden="true">→</span>
    </>
  );

  return (
    <motion.div
      whileHover={hoverLift}
      className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm shadow-zinc-950/5 transition-shadow hover:shadow-md hover:shadow-zinc-950/10"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100">
        {videoSrc ? (
          <video
            src={videoSrc}
            aria-label={name}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full bg-zinc-950 object-cover"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 420px, 92vw"
          />
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 sm:items-center">
          <div className="inline-flex min-w-0 items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
            <StarIcon className="h-3.5 w-3.5 text-red-600" />
            {badge}
          </div>
          <div className="shrink-0 text-right text-[12px] font-semibold tracking-wide text-zinc-500 tabular-nums">
            {sizes}
          </div>
        </div>

        <div className="mt-4 text-base font-semibold text-zinc-950">{name}</div>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{desc}</p>

        {specCheckItems && specCheckItems.length > 0 ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
            {specCheckItems.map((line) => (
              <FilledChecklistLine key={line}>{line}</FilledChecklistLine>
            ))}
          </div>
        ) : null}

        {/* <div className="mt-4">
          {ctaDownload ? (
            <a href={ctaHref} download={ctaDownload} className={ctaClassName}>
              {ctaInner}
            </a>
          ) : (
            <a href={ctaHref} className={ctaClassName}>
              {ctaInner}
            </a>
          )}
        </div> */}
      </div>
    </motion.div>
  );
}
