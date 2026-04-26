import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/site/Button";

const iconWrap =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-red-500/10 text-red-500";

function IconMaximize() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
      <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
      <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
    </svg>
  );
}

function IconCpu() {
  return (
    <svg
      className="h-4 w-4"
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

function IconWifi() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.859a10 10 0 0 1 14 0" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    </svg>
  );
}

function IconVolume2() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.384 3.384A.705.705 0 0 0 11 19.298z" />
      <path d="M16 9a5 5 0 0 1 0 6" />
      <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
    </svg>
  );
}

function IconShieldCheck() {
  return (
    <svg
      className="h-4 w-4"
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

function StarGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

const FEATURES = [
  { label: "4K UHD anti-glare", Icon: IconMaximize },
  { label: "20-point IR multi-touch", Icon: IconLayers },
  { label: "Built-in Android + OPS slot", Icon: IconCpu },
  { label: "Wireless screen casting", Icon: IconWifi },
  { label: "Front-firing speakers", Icon: IconVolume2 },
  { label: "5-year standard warranty", Icon: IconShieldCheck },
] as const;

export function FeaturedVt13Band() {
  return (
    <section className="mt-14 sm:mt-16">
      <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#121212] p-6 text-white shadow-xl shadow-zinc-950/40 sm:p-8 md:p-10 md:rounded-3xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.95fr] lg:gap-12">
          <div className="min-w-0 order-2 lg:order-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              <StarGlyph className="h-3.5 w-3.5 text-white" />
              Featured · Virtual
            </div>

            <h3 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
              VT13-IR Series
            </h3>
            <p className="mt-2 text-sm font-medium text-white/70 md:text-base">
              Interactive flat panel · 65&quot; · 75&quot; · 86&quot;
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
              The display of choice for thousands of K-12 classrooms across the
              country. Built for daily use, backed by a 5-year warranty, and
              supported by a team you can actually reach.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {FEATURES.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg bg-[#1e1e1e] px-3 py-2.5"
                >
                  <span className={iconWrap}>
                    <Icon />
                  </span>
                  <span className="text-sm font-medium text-white/90">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href="/contact"
                size="sm"
                className="rounded-md border-0 bg-[#E53E3E] text-white shadow-sm hover:bg-red-600 dark:bg-[#E53E3E] dark:hover:bg-red-600"
              >
                <span>Request a quote</span>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </ButtonLink>
              <Link
                href="/gallery"
                className="inline-flex h-10 items-center justify-center rounded-md border border-white/30 bg-transparent px-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                See it installed
              </Link>
            </div>
          </div>

          <div className="order-1 min-w-0 rounded-2xl bg-[#1a1a1a] p-4 ring-1 ring-inset ring-white/10 lg:order-2">
            <div className="relative mx-auto aspect-square w-full max-w-[min(100%,22rem)] overflow-hidden rounded-full bg-zinc-950">
              <Image
                src="/vt-panel-hero-BbQvghRM.png"
                alt="VTI VT13-IR interactive flat panel display"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 400px, 80vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
