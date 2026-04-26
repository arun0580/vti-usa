"use client";

import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import Image from "next/image";
import { useEffect, useState } from "react";

type TabId = "story" | "team" | "values" | "join";

const HASH_TO_TAB: Record<string, TabId> = {
  story: "story",
  team: "team",
  "our-team": "team",
  values: "values",
  "our-values": "values",
  believe: "values",
  "what-we-believe": "values",
  join: "join",
};

function tabFromHash(): TabId | null {
  if (typeof window === "undefined") return null;
  const key = window.location.hash.replace(/^#/, "").toLowerCase();
  if (!key) return null;
  return HASH_TO_TAB[key] ?? null;
}

const tabs: {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "story",
    label: "Our Story",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M4 5a2 2 0 012-2h7v18H6a2 2 0 00-2-2V5zM20 3h-7v18h7a2 2 0 002-2V5a2 2 0 00-2-2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "team",
    label: "Our Team",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "values",
    label: "Our Values",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          opacity="0.4"
        />
        <path
          d="M12 3.5l1.9 5.8h6.2l-5 3.6 1.9 5.8-4.9-3.6-5 3.6 1.9-5.8-5-3.6h6.2L12 3.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "join",
    label: "Join the Team",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM20 8v6M17 11h6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const teamMembers: {
  name: string;
  role: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
}[] = [
  {
    name: "Kevin Talentino",
    role: "CEO & Owner",
    location: "Woodstock, GA",
    imageSrc: "/about/kevin-talentino-real-BeHsZ5xT.png",
    imageAlt: "Kevin Talentino, CEO & Owner",
  },
  {
    name: "Toni Talentino",
    role: "CFO & Owner",
    location: "Woodstock, GA",
    imageSrc: "/about/toni-talentino-wVckSdoa.png",
    imageAlt: "Toni Talentino, CFO & Owner",
  },
  {
    name: "Tyler King",
    role: "Sales & Operations",
    location: "Woodstock, GA",
    imageSrc: "/about/tyler-king-CM_-X8Rm.jpg",
    imageAlt: "Tyler King, Sales & Operations",
  },
  {
    name: "Aaron Montoya",
    role: "Sales Rep",
    location: "Albuquerque, NM",
    imageSrc: "/about/aaron-montoya-BtVkiaC4.jpg",
    imageAlt: "Aaron Montoya, Sales Rep",
  },
  {
    name: "James Baxley",
    role: "Sales Rep",
    location: "Panama City, FL",
    imageSrc: "/about/james-baxley-BA0-aBVd.jpg",
    imageAlt: "James Baxley, Sales Rep",
  },
  {
    name: "Eddie Longoria",
    role: "Sales Rep",
    location: "El Paso, TX",
    imageSrc: "/about/eddie-longoria-ByEfT8V_.jpg",
    imageAlt: "Eddie Longoria, Sales Rep",
  },
  {
    name: "Tina McCord",
    role: "Sales Rep · K-12 Educator / Trainer",
    location: "Conway, AR",
    imageSrc: "/about/tina-mccord-CkeHAHlB.jpg",
    imageAlt: "Tina McCord, Sales Rep · K-12 Educator / Trainer",
  },
  {
    name: "Zarrar Khan",
    role: "OneScreen Liaison",
    location: "Baltimore, MD",
    imageSrc: "/about/zarrar-khan-DuLJC3xb.jpg",
    imageAlt: "Zarrar Khan, OneScreen Liaison",
  },
];

type ValueIconId =
  | "heart"
  | "handshake"
  | "award"
  | "lightbulb"
  | "support"
  | "globe";

const valueCards: { title: string; desc: string; icon: ValueIconId }[] = [
  {
    icon: "heart",
    title: "Built for the classroom. Scaled for the real world.",
    desc: "Every product decision starts with the classroom—then scales to boardrooms, control rooms, and public spaces where clarity and reliability matter just as much.",
  },
  {
    icon: "handshake",
    title: "Resellers as partners",
    desc: "We win when our partners win. Honest collaboration, deal protection, and shared success are non-negotiable.",
  },
  {
    icon: "award",
    title: "Quality without compromise",
    desc: "Hardened glass, anti-glare coatings, components rated for 50,000+ hours, and a 5-year warranty as standard.",
  },
  {
    icon: "lightbulb",
    title: "Practical innovation",
    desc: "We ship features that solve real classroom, boardroom, and mission-critical environment problems — not specs designed for marketing slides.",
  },
  {
    icon: "support",
    title: "Real human support",
    desc: "Talk to engineers and account leads — not chatbots, ticket queues, or overseas call centers.",
  },
  {
    icon: "globe",
    title: "Built for the long haul",
    desc: "Displays are infrastructure. We build for schools, government facilities, and commercial environments that need to perform reliably for a decade or more.",
  },
];

function ValueIcon({ id }: { id: ValueIconId }) {
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

export function AboutPageContent() {
  const [active, setActive] = useState<TabId>("story");

  useEffect(() => {
    const applyHash = () => {
      const t = tabFromHash();
      if (t) {
        setActive(t);
        requestAnimationFrame(() => {
          const anchor =
            t === "team"
              ? "our-team"
              : t === "values"
                ? "our-values"
                : null;
          if (anchor) {
            document.getElementById(anchor)?.scrollIntoView({
              block: "start",
              behavior: "auto",
            });
          }
        });
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <div className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <Container className="pt-14 pb-6 sm:pt-16 sm:pb-8">
        <div className="max-w-3xl">
          <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
            ABOUT VTI
          </div>
          <h1 className="mt-2 text-[40px] font-extrabold leading-[0.95] tracking-tight text-zinc-950 sm:text-[56px] dark:text-zinc-50">
            Built by pioneers. Trusted nationwide.
          </h1>
          <p className="mt-4 max-w-2xl text-[18px] leading-7 text-zinc-600 dark:text-zinc-300">
            From the earliest days of interactive technology to today&apos;s
            classrooms, boardrooms, and government spaces—VTI delivers displays
            people rely on every day, powered by a coast-to-coast reseller
            network.
          </p>
        </div>
      </Container>

      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <Container className="pb-0">
          <div
            className="flex flex-wrap gap-1 sm:gap-2"
            role="tablist"
            aria-label="About sections"
          >
            {tabs.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => setActive(t.id)}
                  className={
                    isActive
                      ? "flex items-center gap-2 border-b-2 border-red-600 px-1 py-3 text-sm font-semibold text-red-600 sm:px-2"
                      : "flex items-center gap-2 border-b-2 border-transparent px-1 py-3 text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-200 sm:px-2"
                  }
                >
                  <span className={isActive ? "text-red-600" : "text-zinc-400"}>
                    {t.icon}
                  </span>
                  {t.label}
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      <Container className="py-14 sm:py-16">
        <div
          id="panel-story"
          role="tabpanel"
          aria-labelledby="tab-story"
          hidden={active !== "story"}
        >
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
                OUR STORY
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                From the early days of interactive — to the &ldquo;wegend&rdquo;
                who built VTI.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                <p>
                  Kevin Talentino entered the industry at the very beginning.
                  Among manufacturers in China, he&apos;s known simply as the
                  &ldquo;wegend.&rdquo; He was one of the first to bring SMART
                  Board and Promethean interactive whiteboards to North
                  America—back when classrooms still relied on chalk and overhead
                  projectors.
                </p>
                <p>
                  Over the decades, Kevin went on to lead multiple AV companies as
                  CEO, helping bring the technology that defined modern
                  collaboration into classrooms and boardrooms around the world.
                </p>
                <p>
                  In 2013, he founded Virtual Technologies, Inc. Drawing on
                  decades of experience, he built a company focused on delivering
                  best-in-class interactive displays, LED walls, and digital
                  signage—designed for the people who use them every day.
                </p>
                <p>
                  Today, VTI displays are installed in K–12 districts,
                  universities, Fortune 500 boardrooms, and federal facilities
                  across all 50 states—supported by a nationwide reseller
                  network.
                </p>
              </div>
            </div>
            <div className="mx-auto w-full max-w-md lg:mx-0">
              <figure>
                <div className="overflow-hidden rounded-2xl shadow-lg shadow-zinc-950/10 ring-1 ring-zinc-200/80 dark:ring-zinc-800">
                  <Image
                    src="/about/kevin-talentino-real-BeHsZ5xT.png"
                    alt="Kevin Talentino, founder of Virtual Technologies, Inc."
                    width={560}
                    height={700}
                    className="h-auto w-full object-cover"
                    sizes="(min-width: 1024px) 400px, 100vw"
                    priority
                  />
                </div>
                <figcaption className="mt-4 text-center lg:text-left">
                  <div className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
                    Kevin Talentino
                  </div>
                  <div className="text-sm font-semibold text-red-600">
                    Founder &amp; CEO
                  </div>
                  <div className="mt-1 text-[11px] font-semibold tracking-[0.2em] text-zinc-500">
                    THE &ldquo;WEGEND&rdquo;
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        <div
          id="panel-team"
          role="tabpanel"
          aria-labelledby="tab-team"
          hidden={active !== "team"}
        >
          <div id="our-team" className="scroll-mt-28">
            <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
              OUR TEAM
            </div>
            <h2 className="mt-2 max-w-4xl text-2xl font-bold tracking-tight sm:text-3xl">
              Family-owned. Veteran-owned. Woman-owned.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              In business since 2013 with over 100 years of combined industry
              experience — meet the people behind every VTI quote, install, and
              support call.
            </p>

            <ul className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((m) => (
                <li key={m.name}>
                  <article className="h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={m.imageSrc}
                        alt={m.imageAlt}
                        fill
                        className="object-cover object-top"
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
                        {m.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold leading-snug text-red-600">
                        {m.role}
                      </p>
                      <p className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-zinc-500">
                        {m.location.toUpperCase()}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          id="panel-values"
          role="tabpanel"
          aria-labelledby="tab-values"
          hidden={active !== "values"}
        >
          <div id="our-values" className="scroll-mt-28">
            <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
              OUR VALUES
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Values behind every display we build.
            </h2>

            <div className="mt-8 sm:mt-10">
              <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {valueCards.map((v) => (
                  <li key={v.title}>
                    <article
                      className="flex h-full flex-col rounded-2xl border border-zinc-100 bg-white p-7 shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none"
                    >
                      <div
                        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF2F2] dark:bg-red-950/30"
                        aria-hidden
                      >
                        <ValueIcon id={v.icon} />
                      </div>
                      <h3 className="text-base font-bold leading-snug text-zinc-950 dark:text-zinc-50">
                        {v.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                        {v.desc}
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          id="panel-join"
          role="tabpanel"
          aria-labelledby="tab-join"
          hidden={active !== "join"}
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
            <div>
              <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
                BECOME A PARTNER
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Tell us about you and your business.
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                VTI sells exclusively through certified resellers and
                integrators. Share a few details and the right person on our
                team will reach out — usually within one business day.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                {[
                  "Local support, backed by direct factory access",
                  "Deal registration and territory protection",
                  "Technical training and certification",
                  "Loaner units for end-customer demos",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-red-200 text-red-600 dark:border-red-900/40 dark:text-red-400">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      >
                        <path
                          d="M7 12l3 3 7-7"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
              <form
                className="grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" required>
                    <input
                      required
                      name="fullName"
                      className={inputClass}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Company / organization" required>
                    <input
                      required
                      name="company"
                      className={inputClass}
                      autoComplete="organization"
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Work email" required>
                    <input
                      required
                      type="email"
                      name="email"
                      className={inputClass}
                      autoComplete="email"
                    />
                  </Field>
                  <Field label="Phone" required>
                    <input
                      required
                      type="tel"
                      name="phone"
                      className={inputClass}
                      autoComplete="tel"
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="City" required>
                    <input required name="city" className={inputClass} />
                  </Field>
                  <Field label="State" required hint="e.g. GA">
                    <input required name="state" className={inputClass} />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Website">
                    <input
                      name="website"
                      className={inputClass}
                      autoComplete="url"
                    />
                  </Field>
                  <Field label="Business type" required>
                    <select
                      required
                      name="businessType"
                      className={inputClass}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      <option>AV Integrator</option>
                      <option>Reseller</option>
                      <option>IT / Technology Partner</option>
                      <option>Other</option>
                    </select>
                  </Field>
                </div>

                <Field
                  label="Markets you serve"
                  required
                  hint="e.g. K-12, higher ed, corporate, government, houses of worship"
                >
                  <input required name="markets" className={inputClass} />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Years in business" required>
                    <select
                      required
                      name="yearsInBusiness"
                      className={inputClass}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      <option>0–1</option>
                      <option>2–5</option>
                      <option>6–10</option>
                      <option>11–20</option>
                      <option>20+</option>
                    </select>
                  </Field>
                  <Field label="Interactive display experience">
                    <select name="experience" className={inputClass} defaultValue="">
                      <option value="">
                        Select one
                      </option>
                      <option>None yet</option>
                      <option>Some</option>
                      <option>Experienced</option>
                      <option>Expert</option>
                    </select>
                  </Field>
                </div>

                <Field
                  label="Anything else we should know?"
                  hint="Customer base, current vendors, certifications, upcoming projects…"
                >
                  <textarea
                    name="notes"
                    className={cn(inputClass, "min-h-[120px] resize-y py-2")}
                  />
                </Field>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
                  >
                    Submit application <span aria-hidden="true">→</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>

      <section className="relative overflow-hidden border-t border-zinc-800 bg-zinc-950 text-white">
        <div className="absolute inset-0">
          <Image
            src="/about/corporate-boardroom-panel-2wOF230t.png"
            alt=""
            fill
            className="object-cover object-center opacity-100"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/70" aria-hidden />
        </div>
        <Container className="relative z-10 py-14 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to see VTI for yourself?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-200 sm:text-base sm:leading-7">
                Connect with our team for a guided product walkthrough or a
                referral to your nearest certified VTI reseller.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href="/contact"
                className="!bg-red-600 !text-white border-0 shadow-sm hover:!bg-red-700 focus-visible:ring-red-500/40 dark:!bg-red-600 dark:!text-white dark:hover:!bg-red-700"
              >
                Talk to VTI <span aria-hidden="true">→</span>
              </ButtonLink>
              {active === "values" ? null : (
                <ButtonLink
                  href="/products"
                  variant="secondary"
                  className="border-0 bg-white text-zinc-950 hover:bg-zinc-100 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
                >
                  View product lineup
                </ButtonLink>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

const inputClass =
  "mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none placeholder:text-zinc-400 focus:border-red-400 focus:ring-2 focus:ring-red-500/15 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-red-500";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="flex items-baseline gap-2 text-[11px] font-semibold tracking-[0.08em] text-zinc-700 dark:text-zinc-300">
        <span>
          {label}
          {required ? <span className="text-red-600"> *</span> : null}
        </span>
        {hint ? <span className="font-medium text-zinc-400">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}
