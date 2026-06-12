"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchActiveAnnouncement } from "@/lib/announcements/api";
import type { PublicAnnouncement } from "@/lib/announcements/types";

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4 shrink-0 text-white"
    >
      <path d="M7 3v3M17 3v3" />
      <path d="M4 7h16" />
      <path d="M5 6.5h14A2 2 0 0 1 21 8.5v12A2 2 0 0 1 19 22.5H5A2 2 0 0 1 3 20.5v-12A2 2 0 0 1 5 6.5Z" />
    </svg>
  );
}

export function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<PublicAnnouncement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const active = await fetchActiveAnnouncement();
      if (!cancelled) {
        setAnnouncement(active);
        setLoaded(true);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!loaded || dismissed || !announcement) {
    return null;
  }

  return (
    <div
      className="relative z-50 bg-red-600 text-white"
      role="region"
      aria-label="Site announcement"
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-2 px-4 py-2.5 pr-12 text-center text-[13px] leading-snug sm:gap-2.5 sm:px-5 sm:pr-14 sm:text-[15px]">
        <CalendarIcon />
        <span className="inline-flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          <span className="font-semibold">
            {announcement.title}
            <span className="mx-1 font-normal opacity-90" aria-hidden="true">
              |
            </span>
          </span>
          <span className="font-semibold">
            {announcement.dateRangeLabel}
            <span className="mx-1 font-normal opacity-90" aria-hidden="true">
              |
            </span>
          </span>
          <Link
            href={announcement.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-0.5 font-medium underline underline-offset-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-red-600"
          >
            {announcement.linkText}
            <span aria-hidden="true">→</span>
          </Link>
        </span>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Dismiss announcement"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
