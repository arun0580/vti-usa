import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { Hero } from "@/components/site/Hero";
import {
  Building2,
  GraduationCap,
  Headphones,
  ImageIcon,
  Landmark,
  MonitorPlay,
  School,
  Wrench,
  Truck,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white text-zinc-950">
      <Hero />

      <section className="bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
        <Container className="py-8 sm:py-10">
          <div className="text-center text-[12px] font-semibold tracking-[0.28em] uppercase text-white/55">
            TRUSTED ACROSS EDUCATION, ENTERPRISE, AND GOVERNMENT
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium tracking-wide text-white sm:text-sm">
            {[
              "K-12 Districts",
              "State Universities",
              "Community Colleges",
              "Fortune 500",
              "Federal Agencies",
              "Municipal Govt",
              "Retail & Hospitality",
              "Sports Venues",
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
                image: "/solutions/students.jpg",
                icon: <School className="h-5 w-5" />,
              },
              {
                title: "Higher Ed Lecture Hall",
                desc: "Ultra-wide displays and LED walls for lecture halls, labs, and student commons.",
                image: "/solutions/higher-ed-lecture-hall.jpg",
                icon: <GraduationCap className="h-5 w-5" />,
              },
              {
                title: "Corporate Boardroom",
                desc: "Boardroom-grade displays for hybrid meetings, presentations, and collaboration.",
                image: "/solutions/corporate-boardroom-panel.jpg",
                icon: <Building2 className="h-5 w-5" />,
              },
              {
                title: "Government Facility",
                desc: "Secure, reliable display systems for federal, state, and municipal facilities.",
                image: "/solutions/government-corporate-room.jpg",
                icon: <Landmark className="h-5 w-5" />,
              },
              {
                title: "Galleries & Conference Centers",
                desc: "Seamless LED video walls that turn lobbies, galleries, and event spaces into showpieces.",
                image: "/solutions/led-art-gallery.jpg",
                icon: <ImageIcon className="h-5 w-5" />,
              },
              {
                title: "Digital Signage",
                desc: "High-bright displays and scoreboards for gyms, atriums, and high-traffic public spaces.",
                image: "/solutions/digital-signage-gym.jpg",
                icon: <MonitorPlay className="h-5 w-5" />,
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
                {
                  id: 1,
                  variant: "circle" as const,
                  image: "/5s-services-circle.png",
                  alt: "5S Services Circle",
                },
                {
                  id: 2,
                  variant: "rounded" as const,
                  image: "/5s-services-square.png",
                  alt: "5S Services Square",
                },
              ].map((opt) => (
                <div key={opt.id} className="space-y-3">
                  <div
                    className={[
                      "relative aspect-[4/3] w-full overflow-hidden border border-white/10 bg-zinc-950/40 shadow-sm",
                      opt.variant === "circle" ? "rounded-3xl" : "rounded-3xl",
                    ].join(" ")}
                  >
                    <Image
                      src={opt.image}
                      alt={opt.alt}
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
        <Container className="py-16 sm:py-24 border-b border-zinc-200">
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
              <p className="mt-4 text-[16px] leading-7 text-zinc-600">
                Resellers and buyers choose VTI over other brands because we
                give every partner direct access to the people who actually
                built the product — no call centers, no chatbots, no runaround.
              </p>
              <div className="mt-8">
                <ButtonLink
                  href="/about"
                  className="!bg-white !text-zinc-950 hover:!bg-zinc-100"
                  variant="secondary"
                >
                  About our company <span aria-hidden="true">→</span>
                </ButtonLink>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  title: "Engineered for daily use",
                  desc: "Hardened glass, anti-glare coating, and components rated for 100,000 hours.",
                  icon: <Wrench className="h-5 w-5" />,
                },
                {
                  title: "Personalized human support",
                  desc: "Get a dedicated rep who knows your account — not chatbots or call centers.",
                  icon: <Headphones className="h-5 w-5" />,
                },
                {
                  title: "Stocked & ready to ship",
                  desc: "US warehouses keep our top SKUs on the shelf for fast reseller fulfillment.",
                  icon: <Truck className="h-5 w-5" />,
                },
                {
                  title: "Full replacement warranty",
                  desc: "Full replacement warranty coverage included on every interactive flat panel — no upsell required.",
                  icon: <ShieldCheck className="h-5 w-5" />,
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      {card.icon}
                    </svg>
                  </span>
                  <div className="mt-4 text-sm font-semibold text-zinc-950">
                    {card.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
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
              <p className="mt-3 text-zinc-600">
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

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {[
              {
                quote:
                  "It's the fastest panel we've used with our kids — they tap, it responds, and the lessons just flow. No lag, no frustration, no excuses to stop learning.",
                name: "Amira",
                role: "Program Director",
                tag: "Youth Program",
                image: "/testimonials/amira-thumb.jpg",
                org: "Boys & Girls Club of Faulkner County",
              },
              {
                quote:
                  "We outfitted our science labs with multiple VTI panels per room so every student has a clear sightline — no more crowding around one screen. The install was clean, the picture is sharp, and our faculty picked it up on day one.",
                name: "AV & Instructional Technology Team",
                role: "Science & Technology Division",
                tag: "Higher Ed Lecture Hall",
                image: "/testimonials/gulf-coast-state-college.jpg",
                org: "Gulf Coast State College",
              },
              {
                quote:
                  "Our LED poster in the student center grabs attention the moment people walk in. We push transit info, campus events, and program promos in minutes — no printing, no reprinting, just a sharp, always-current message.",
                name: "Student Engagement & Communications",
                role: "Campus Marketing",
                tag: "DvLED Poster Signage",
                image: "/testimonials/gulf-coast-led-poster.jpg",
                org: "Gulf Coast State College",
              },
              {
                quote:
                  "Our instructors are pumped to bring these panels into the training center — side-by-side annotation, live mission rehearsal, and replay all on one screen. It's going to take our flight training to the next level.",
                name: "Training Cadre",
                role: "Airman Leadership School",
                tag: "Government / Military",
                image: "/testimonials/jacksonville-afb-training.jpg",
                org: "Jacksonville AFB Training Center",
              },
            ].map((t) => (
              <figure
                key={t.name}
                className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
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
                  <blockquote className="mt-3 text-[13px] leading-6 text-zinc-700">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-6 border-t border-zinc-200 pt-5">
                    <figcaption>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-zinc-600">
                        {t.role} - {t.org}
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

      <section className="border-t border-zinc-200 bg-zinc-50">
        <Container className="py-16">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-zinc-900">
                  Ready to spec your space?
                </div>
                <p className="text-zinc-600">
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
