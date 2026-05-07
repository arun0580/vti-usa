import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/site/Button";

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="mx-3 inline-block h-1 w-1 rounded-full bg-zinc-300 align-middle dark:bg-zinc-600"
    />
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500"
    >
      <path d="M7 3v3M17 3v3" />
      <path d="M4 7h16" />
      <path d="M5 6.5h14A2 2 0 0 1 21 8.5v12A2 2 0 0 1 19 22.5H5A2 2 0 0 1 3 20.5v-12A2 2 0 0 1 5 6.5Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500"
    >
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function LiveDotIcon() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-2 w-2 rounded-full bg-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.12)] dark:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]"
    />
  );
}

function BulletCheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 text-red-600 dark:text-red-400"
    >
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.7 10.2l2.1 2.1 4.6-4.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const upcoming = [
  {
    type: "Webinar",
    date: "May 20, 2026",
    time: "9:00 AM Pacific",
    where: "Live webinar (online)",
    title: "Turn LED Video Walls into Your Next Revenue Driver",
    desc: "LED video walls aren't just a niche play anymore — they're quickly becoming a practical, high-impact solution for a wide range of spaces. For partners, that shift opens up a real opportunity.",
    bullets: [
      "Why LED video walls are gaining traction now",
      "Where the deals are and which verticals are buying",
      "How to confidently step into the category",
      "Pricing, install, and support: what reps need to know",
    ],
    cta: { label: "Reserve your spot", href: "/contact" },
  },
];

const past = [
  {
    date: "June 2025",
    where: "Orlando, FL",
    title: "InfoComm 2025",
    desc: "VTI showcased the VTI-Pro interactive panel lineup and our LED video wall AIO series alongside reseller partners.",
  },
];

export default function EventsPage() {
  return (
    <main>
      <section className="bg-white dark:bg-zinc-950">
        <Container className="py-12 sm:py-16">
          <div className="max-w-3xl">
            <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
              EVENTS
            </div>
            <h1 className="mt-3 text-4xl font-extrabold leading-[0.95] tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-6xl">
              Webinars, trade shows,
              <br />
              and training
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-[18px]">
              Catch us live, online or on the road. We host partner webinars,
              exhibit at industry events, and run reseller trainings throughout
              the year.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <Container className="py-12 sm:py-16">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
              Upcoming
            </h2>
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {upcoming.length} {upcoming.length === 1 ? "event" : "events"}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {upcoming.map((e) => (
              <div
                key={e.title}
                className="rounded-3xl border border-red-200 bg-white p-7 shadow-sm ring-1 ring-red-100/60 dark:border-red-500/20 dark:bg-zinc-950 dark:ring-red-500/10 sm:p-10"
              >
                <div className="flex flex-wrap items-center gap-y-2 text-[11px] font-semibold leading-none tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
                  <span className="rounded-full border border-red-200/70 bg-red-50 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                    {e.type.toUpperCase()}
                  </span>
                  <Dot />
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    <CalendarIcon />
                    <span>{e.date.toUpperCase()}</span>
                  </span>
                  <Dot />
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    <ClockIcon />
                    <span>{e.time.toUpperCase()}</span>
                  </span>
                  <Dot />
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    <LiveDotIcon />
                    <span>
                      {e.where
                        .replace(/^Live webinar/, "Live Webinar")
                        .toUpperCase()}
                    </span>
                  </span>
                </div>

                <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
                      {e.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300 sm:text-[15px]">
                      {e.desc}
                    </p>
                  </div>

                  <ul className="grid gap-3 text-sm text-zinc-700 dark:text-zinc-200 sm:grid-cols-2">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <span className="mt-1 shrink-0">
                          <BulletCheckIcon />
                        </span>
                        <span className="leading-6">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <ButtonLink
                    href={e.cta.href}
                    variant="ghost"
                    className="!bg-red-600 !text-white shadow-sm hover:!bg-red-700 hover:!text-white focus-visible:ring-2 focus-visible:ring-red-500/40 dark:!bg-red-600 dark:!text-white dark:hover:!bg-red-500 dark:hover:!text-white"
                    size="sm"
                  >
                    {e.cta.label}
                    <span aria-hidden="true">→</span>
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/30">
        <Container className="py-12 sm:py-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
            Past events
          </h2>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,560px)_1fr] lg:items-start">
            <div className="grid gap-6">
              {past.map((e) => (
                <div
                  key={e.title}
                  className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="text-xs font-semibold tracking-[0.18em] text-zinc-600 dark:text-zinc-300">
                    {e.date} · {e.where}
                  </div>
                  <div className="mt-3 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    {e.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {e.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="hidden lg:block" aria-hidden="true" />
          </div>

        </Container>
      </section>
    </main>
  );
}

