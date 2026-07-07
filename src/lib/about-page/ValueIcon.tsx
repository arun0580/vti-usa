import type { AboutValueIconId } from "./types";

export const ABOUT_VALUE_ICON_OPTIONS: AboutValueIconId[] = [
  "heart",
  "handshake",
  "award",
  "lightbulb",
  "support",
  "globe",
];

export function AboutValueIcon({ id }: { id: AboutValueIconId }) {
  const c = "h-6 w-6 shrink-0 text-red-600";
  const sw = 1.5;
  switch (id) {
    case "heart":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={c} aria-hidden>
          <path
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case "handshake":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={c} aria-hidden>
          <path
            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="9"
            cy="7"
            r="4"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 21v-2a4 4 0 0 0-3-3.87"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.13a4 4 0 0 1 0 7.75"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "award":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={c} aria-hidden>
          <circle
            cx="12"
            cy="8"
            r="6"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.2 14L7 23l5-3 5 3-1.2-8.8"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "lightbulb":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={c} aria-hidden>
          <path
            d="M15 14c.2-1 .7-1.7 1.5-2.5C17.3 10.1 18 7.6 18 5a6 6 0 10-12 0c0 2.6.7 5.1 2.5 6.5.8.8 1.3 1.5 1.5 2.5"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 18h6M10 22h4"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "support":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={c} aria-hidden>
          <path
            d="M3 18v-6a9 9 0 0 1 18 0v6"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={c} aria-hidden>
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12h20"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
