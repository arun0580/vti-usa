import type { CSSProperties } from "react";
import { trustedBy } from "../_data/trustedBy";
import { cn } from "@/lib/cn";

function IconShieldCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/** Path from Lucide (v0.460) "server", ISC */
function IconServer({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

function IconCpu({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 20v2" />
      <path d="M12 2v2" />
      <path d="M17 20v2" />
      <path d="M17 2v2" />
      <path d="M2 12h2" />
      <path d="M2 17h2" />
      <path d="M2 7h2" />
      <path d="M20 12h2" />
      <path d="M20 17h2" />
      <path d="M20 7h2" />
      <path d="M7 20v2" />
      <path d="M7 2v2" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="8" y="8" width="8" height="8" rx="1" />
    </svg>
  );
}

const VALUE_CARDS: {
  title: string;
  desc: string;
  Icon: typeof IconShieldCheck;
}[] = [
  {
    title: "5-year standard warranty",
    desc: "Industry-leading coverage on every Virtual interactive flat panel — no extended-plan upsell required.",
    Icon: IconShieldCheck,
  },
  {
    title: "U.S. stocked inventory",
    desc: "Top SKUs ship from U.S. warehouses for fast reseller fulfillment and quick replacements.",
    Icon: IconServer,
  },
  {
    title: "OPS-ready architecture",
    desc: "Slide in any standard OPS PC for full Windows compatibility — no dongles, no clutter.",
    Icon: IconCpu,
  },
];

const tickerList = [...trustedBy, ...trustedBy];

const tickerMask: CSSProperties = {
  maskImage:
    "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
};

type BandProps = { showValueProps: boolean };

export function ValuePropsAndTrustedBand({ showValueProps }: BandProps) {
  return (
    <div
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-t border-zinc-200/90 bg-[#F9FAFB] dark:border-zinc-800/80 dark:bg-zinc-950/40"
    >
      <div className="container-vti py-10 sm:py-12 md:py-14">
        {showValueProps ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {VALUE_CARDS.map(({ title, desc, Icon }) => (
              <div
                key={title}
                className={cn(
                  "flex h-full min-h-0 flex-col rounded-xl border border-zinc-200/90 bg-white p-6 sm:p-7",
                  "shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none",
                )}
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-rose-100/90 bg-rose-50/90 text-red-600 dark:border-red-900/35 dark:bg-red-950/30 dark:text-red-400"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold leading-snug tracking-tight text-zinc-900 sm:text-lg dark:text-zinc-50">
                  {title}
                </h3>
                <p className="mt-2 text-sm font-normal leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <div className={cn(showValueProps && "pt-8 md:pt-10")}>
          <div
            className={cn(
              "text-center",
              showValueProps && "border-t border-zinc-200/80 pt-8 dark:border-zinc-700/60 md:pt-10",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
              Trusted by
            </p>
            <h2 className="mt-2 text-xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
              Schools, gyms, churches, and businesses across the US.
            </h2>
          </div>

          <div
            className="group mt-5 overflow-hidden py-0.5 md:mt-6"
            style={tickerMask}
          >
            <div className="flex w-max items-center products-ticker-run will-change-transform">
              {tickerList.map((name, idx) => (
                <span
                  key={`${name}-${idx}`}
                  className="inline-flex items-center gap-2.5 pr-8 sm:pr-10 md:pr-12"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-600/80 dark:bg-red-500/85"
                    aria-hidden
                  />
                  <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wide text-zinc-500 sm:text-sm">
                    {name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
