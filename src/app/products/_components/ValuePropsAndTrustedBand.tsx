import type { CSSProperties } from "react";
import { trustedBy } from "../_data/trustedBy";
import { cn } from "@/lib/cn";
import { Cpu, HardDrive, ShieldCheck } from "lucide-react";

const VALUE_CARDS: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "Full replacement warranty",
    desc: "Full replacement warranty coverage on every Virtual interactive flat panel — extended plans available.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "U.S. stocked inventory",
    desc: "Top SKUs ship from U.S. warehouses for fast reseller fulfillment and quick replacements.",
    icon: <HardDrive className="h-5 w-5" />,
  },
  {
    title: "OPS-ready architecture",
    desc: "Slide in any standard OPS PC for full Windows compatibility — no dongles, no clutter.",
    icon: <Cpu className="h-5 w-5" />,
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
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-t border-zinc-200/90 bg-[#F9FAFB]"
    >
      <div className="container-vti py-10 sm:py-12 md:py-14">
        {showValueProps ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {VALUE_CARDS.map(({ title, desc, icon }) => (
              <div
                key={title}
                className={cn(
                  "flex h-full min-h-0 flex-col rounded-xl border border-zinc-200/90 bg-white p-6 sm:p-7",
                  "shadow-sm",
                )}
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-rose-100/90 bg-rose-50/90 text-red-600"
                  aria-hidden
                >
                  {icon}
                </div>
                <h3 className="mt-4 text-base font-bold leading-snug tracking-tight text-zinc-900 sm:text-lg">
                  {title}
                </h3>
                <p className="mt-2 text-sm font-normal leading-relaxed text-zinc-600">
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
              showValueProps && "border-t border-zinc-200/80 pt-8 md:pt-10",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
              Trusted by
            </p>
            <h2 className="mt-2 text-xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-2xl">
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
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-600/80"
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
