import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { Hero } from "@/components/site/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <Hero />

      <section className="bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
        <Container className="py-8 sm:py-10">
          <div className="text-center text-[12px] font-semibold tracking-[0.28em] text-zinc-300">
            TRUSTED ACROSS EDUCATION, ENTERPRISE, AND GOVERNMENT
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium tracking-wide text-white sm:text-sm">
            {[
              "K-12 Districts",
              "State Universities",
              "Fortune 500",
              "Federal Agencies",
              "Community Colleges",
              "Municipal Govt",
            ].map((item) => (
              <span key={item} className="opacity-90 hover:opacity-100">
                {item}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
              SOLUTIONS
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
              One product family. Every kind of room.
            </h2>
            <p className="mt-4 max-w-2xl text-[18px] leading-7 text-zinc-600">
              Whether you&apos;re outfitting a kindergarten classroom, a federal
              conference room, or a stadium-sized LED wall, VTI displays scale
              to meet the demand — without compromise.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "K-12 Classroom",
                desc: "Durable touch panels designed for classrooms — from kindergarten to senior year.",
                image:
                  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
                icon: (
                  <path
                    d="M6 6h12v9H6zM8 18h8"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              },
              {
                title: "Higher Ed Lecture Hall",
                desc: "Ultra-wide displays and LED walls for lecture halls, labs, and student commons.",
                image:
                  "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1400&q=80",
                icon: (
                  <path
                    d="M4 7h16M6 7v10h12V7M8 17l-2 3m10-3 2 3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              },
              {
                title: "Corporate Boardroom",
                desc: "Boardroom-grade displays for hybrid meetings, presentations, and collaboration.",
                image:
                  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
                icon: (
                  <path
                    d="M7 20V10m10 10V10M4 10h16M9 6h6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              },
              {
                title: "Government Facility",
                desc: "Secure, reliable display systems for federal, state, and municipal facilities.",
                image:
                  "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1400&q=80",
                icon: (
                  <path
                    d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              },
              {
                title: "Galleries & Conference Centers",
                desc: "Seamless LED video walls that turn lobbies, galleries, and event spaces into showpieces.",
                image:
                  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=80",
                icon: (
                  <path
                    d="M5 7h14v12H5zM8 10h8M8 13h8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              },
              {
                title: "Digital Signage",
                desc: "High-bright displays and scoreboards for gyms, atriums, and high-traffic public spaces.",
                image:
                  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
                icon: (
                  <path
                    d="M7 5h10M9 5v14m6-14v14M5 19h14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 400px, 92vw"
                  />
                </div>
                <div className="border-t border-zinc-200 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-6 w-6"
                        aria-hidden="true"
                      >
                        {card.icon}
                      </svg>
                    </span>
                    <div className="text-md font-semibold text-zinc-950">
                      {card.title}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
        <Container className="py-14 sm:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-red-400/90">
                THE 5S PROMISE
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-3xl">
                Five reasons resellers and buyers choose VTI.
              </h2>
              <p className="max-w-xl text-sm leading-6 text-zinc-300 sm:text-[16px]">
                From flagship interactive panels to mobile carts, podiums,
                conferencing cameras, and accessories — VTI delivers a complete
                5S Services & Stands ecosystem for every room.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "OPTION A · CIRCLE", variant: "circle" as const },
                {
                  label: "OPTION B · ROUNDED SQUARE",
                  variant: "rounded" as const,
                },
              ].map((opt) => (
                <div key={opt.label} className="space-y-3">
                  <div
                    className={[
                      "relative aspect-[4/3] w-full overflow-hidden border border-white/10 bg-zinc-950/40 shadow-sm",
                      opt.variant === "circle" ? "rounded-3xl" : "rounded-3xl",
                    ].join(" ")}
                  >
                    <Image
                      src="/vt-panel-hero-BbQvghRM.png"
                      alt=""
                      fill
                      className={[
                        "object-cover opacity-90",
                        opt.variant === "circle"
                          ? "mask-image-[radial-gradient(circle,black_62%,transparent_64%)]"
                          : "mask-image-[radial-gradient(closest-side,black_72%,transparent_74%)]",
                      ].join(" ")}
                      sizes="(min-width: 1024px) 300px, 90vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/35" />
                  </div>
                  <div className="text-center text-[10px] font-semibold tracking-[0.22em] text-zinc-300">
                    {opt.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
              {[
                {
                  k: "Selection",
                  v: "A full lineup tailored to every room and budget.",
                },
                { k: "Specification", v: "Honest, detailed specs — no fluff." },
                {
                  k: "Support",
                  v: "Direct access to engineers and account leads.",
                },
                {
                  k: "Service",
                  v: "5-year standard warranty and rapid replacement.",
                },
                {
                  k: "Satisfaction",
                  v: "Backed by educators and resellers nationwide.",
                },
              ].map((item) => (
                <div
                  key={item.k}
                  className="lg:border-l lg:border-white/10 lg:px-8 first:lg:border-l-0 first:lg:pl-0 last:lg:pr-0"
                >
                  <div className="space-y-2">
                    <div className="text-3xl font-extrabold leading-none text-red-500">
                      S
                    </div>
                    <div className="text-md font-semibold text-white">
                      {item.k}
                    </div>
                    <div className="max-w-[220px] text-xs leading-5 text-zinc-300">
                      {item.v}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
                WHY VTI
              </div>
              <h2 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl">
                Big-brand specs.
                <br />
                <span className="text-red-600">Boutique service.</span>
              </h2>
              <p className="mt-4 text-[16px] leading-7 text-zinc-600 dark:text-zinc-300">
                Resellers and buyers choose VTI over other brands because we
                give every partner direct access to the people who actually
                built the product — no call centers, no chatbots, no runaround.
              </p>
              <div className="mt-8">
                <ButtonLink href="/about" variant="secondary">
                  About our company <span aria-hidden="true">→</span>
                </ButtonLink>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  title: "Engineered for daily use",
                  desc: "Hardened glass, anti-glare coating, and components rated for 50,000+ hours.",
                  icon: (
                    <path
                      d="M14.7 6.3 18 3m-1 6 3.3-3.3M3 21l5.7-1.2L19 9.5a2 2 0 0 0 0-2.8L17.3 5a2 2 0 0 0-2.8 0L4.2 15.3 3 21Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ),
                },
                {
                  title: "Real human support",
                  desc: "Talk to engineers and account leads — not chatbots or call centers.",
                  icon: (
                    <path
                      d="M6 12a6 6 0 1 1 12 0v6a2 2 0 0 1-2 2h-2m-8-8v6a2 2 0 0 0 2 2h2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ),
                },
                {
                  title: "Stocked & ready to ship",
                  desc: "US warehouses keep our top SKUs on the shelf for fast reseller fulfillment.",
                  icon: (
                    <path
                      d="M3 7h12v10H3V7Zm12 3h4l2 3v4h-6v-7Zm4.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ),
                },
                {
                  title: "5-year standard warranty",
                  desc: "Industry-leading coverage included on every interactive flat panel.",
                  icon: (
                    <path
                      d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ),
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      {card.icon}
                    </svg>
                  </span>
                  <div className="mt-4 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                    {card.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
                REAL VOICES
              </div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
                Spec sheets tell. Installations sell.{" "}
                <span className="text-red-600">See the results.</span>
              </h2>
              <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                Hear from IT directors, AV specialists, and reseller partners
                who put VTI displays into rooms across the country.
              </p>
            </div>
            <a
              href="/gallery"
              className="mt-8 hidden items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 sm:inline-flex"
            >
              View full gallery <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                quote:
                  "We rolled VTI panels into 42 classrooms over the summer. Zero RMAs, zero help-desk tickets from teachers. That's never happened before.",
                name: "Marcus Reed",
                role: "Director of IT · Westbrook Unified School District",
                tag: "K-12 Classroom",
                image:
                  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
              },
              {
                quote:
                  "The 21:9 collaboration display transformed how our faculty run hybrid lectures. Students in the back row finally feel like they're in the room.",
                name: "Dr. Priya Sundaram",
                role: "AV Systems Specialist · State University Learning Commons",
                tag: "Higher Ed Lecture Hall",
                image:
                  "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1400&q=80",
              },
              {
                quote:
                  "VTI is the only manufacturer where I can text the engineer who designed the panel. My margins stay healthy and my clients stay happy.",
                name: "Tony Alvarez",
                role: "Principal & Founder · Northstar AV Integrators",
                tag: "Reseller Partner",
                image:
                  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
              },
            ].map((t) => (
              <figure
                key={t.name}
                className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={t.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 400px, 92vw"
                  />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-zinc-900 shadow-sm">
                      {t.tag.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-red-600" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-7 w-7"
                    >
                      <path d="M7.5 10.5c0-1.657 1.343-3 3-3h.5v2H10.5c-.552 0-1 .448-1 1v.5H12v5H7.5v-5.5Zm9 0c0-1.657 1.343-3 3-3h.5v2h-.5c-.552 0-1 .448-1 1v.5H21v5h-4.5v-5.5Z" />
                    </svg>
                  </div>
                  <blockquote className="mt-3 text-[13px] leading-6 text-zinc-700 dark:text-zinc-300">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-6 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                    <figcaption>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">
                        {t.role}
                      </div>
                    </figcaption>
                  </div>
                </div>
              </figure>
            ))}
          </div>

          <div className="mt-10 flex sm:hidden">
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
            >
              View full gallery <span aria-hidden="true">→</span>
            </a>
          </div>
        </Container>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/30">
        <Container className="py-16">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Ready to spec your space?
                </div>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Whether you&apos;re a reseller pitching a district or a buyer
                  outfitting a single room — the VTI team is ready to help.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <ButtonLink href="/contact">Request a Quote</ButtonLink>
                <ButtonLink href="/resellers" variant="secondary">
                  Become a Reseller
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
