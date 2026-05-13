"use client";

import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import Image from "next/image";
import { useState } from "react";

import { CountUp, Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { AccessoriesSection } from "./_components/AccessoriesSection";
import { BrandTabs } from "./_components/BrandTabs";
import { CategoryCard } from "./_components/CategoryCard";
import { SparklesIcon } from "./_components/SparklesIcon";
import { FeaturedVt13Band } from "./_components/FeaturedVt13Band";
import { ValuePropsAndTrustedBand } from "./_components/ValuePropsAndTrustedBand";
import { PanelFinderModal } from "./_components/PanelFinderModal";
import {
  IconLayoutPanelTop,
  IconMegaphone,
  IconMonitor,
  IconWrench,
  IconBookOpen,
} from "./_data/categoryIcons";
import { ProductCard } from "./_components/ProductCard";
import { CatalogCard } from "./_components/CatalogCard";
import { DataTable } from "./_components/DataTable";
import { SectionHeading } from "./_components/SectionHeading";
import { ChecklistLine } from "./_components/ChecklistLine";
import { OneScreenSoftwareSuite } from "./_components/OneScreenSoftwareSuite";
import { SoftwareFeatureIcon } from "./_components/SoftwareFeatureIcon";

import { interactivePanels } from "./_data/interactivePanels";
import { compareRows, dimensionRows } from "./_data/tables";
import { ledLineup, signageLineup, softwareFeatures } from "./_data/lineups";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Hand,
  Layers,
  Megaphone,
  PenTool,
  Settings,
  ShieldCheck,
  Users,
  Wifi,
} from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<
    "interactive" | "led" | "signage" | "accessories" | "software"
  >("interactive");
  const [interactiveBrand, setInteractiveBrand] = useState<
    "virtual" | "onescreen" | "infocus" | "vivi"
  >("virtual");
  const [panelFinderOpen, setPanelFinderOpen] = useState(false);

  const showInteractive = activeCategory === "interactive";
  const showLed = activeCategory === "led";
  const showSignage = activeCategory === "signage";
  const showAccessories = activeCategory === "accessories";
  const showSoftware = activeCategory === "software";

  const showInteractiveVirtual =
    showInteractive && interactiveBrand === "virtual";
  const showInteractiveOneScreen =
    showInteractive && interactiveBrand === "onescreen";
  const showInteractiveInFocus =
    showInteractive && interactiveBrand === "infocus";
  const showInteractiveVivi = showInteractive && interactiveBrand === "vivi";

  const capabilities = [
    {
      icon: Hand,
      kicker: "01",
      title: "Palm-to-screen touch",
      desc: "Wipe with your palm to erase. Write with a finger. Switch to a pen for precision — no mode switching.",
    },
    {
      icon: PenTool,
      kicker: "02",
      title: "Built-in whiteboard",
      desc: "Infinite canvas, multi-page, save-and-share. Works with any input device — no install.",
    },
    {
      icon: Wifi,
      kicker: "03",
      title: "Wireless casting",
      desc: "Cast from Mac, Windows, iOS, Android, or Chromebook — no dongles or driver downloads.",
    },
    {
      icon: Users,
      kicker: "04",
      title: "Multi-touch collaboration",
      desc: "Up to 40 simultaneous touch points (model dependent). A whole class at the board at once.",
    },
  ];

  return (
    <div>
      <section className="relative border-b border-zinc-200 bg-zinc-100/50 pb-8 md:pb-14">
        <Container className="py-8 md:py-10">
          <Reveal onMount className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
              Products
            </p>
            <h1 className="mt-2 text-[28px] font-extrabold leading-tight tracking-tight text-zinc-950 sm:text-3xl md:text-4xl lg:text-5xl">
              The full Virtual lineup.
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-600 md:text-base">
              Interactive panels, LED posters & video walls, digital signage,
              accessories, and our Get Curious Together OER software for K-12
              classrooms.
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setPanelFinderOpen(true)}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-left text-sm font-semibold text-red-600 hover:underline"
              >
                <SparklesIcon />
                Not sure which panel? Take the 30-second finder
              </button>
            </div>
          </Reveal>
        </Container>
        {/*
         * Category card band:
         *  - On lg+ (desktop), stays absolutely positioned and bleeds into the
         *    following section (translate-y-1/2) — preserves desktop look.
         *  - Below lg (mobile/tablet), it flows in normal layout under the
         *    hero so it can't visually collide with the section beneath.
         */}
        <div className="container-vti pointer-events-auto px-4 sm:px-5 lg:absolute lg:inset-x-0 lg:bottom-0 lg:translate-y-1/2 lg:px-5">
          <RevealGroup
            onMount
            className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-2.5 md:gap-3 lg:grid-cols-5"
          >
            <RevealItem>
              <CategoryCard
                onClick={() => setActiveCategory("interactive")}
                label="Interactive Panels"
                isActive={showInteractive}
                icon={<IconMonitor />}
              />
            </RevealItem>
            <RevealItem>
              <CategoryCard
                onClick={() => setActiveCategory("led")}
                label="DVLED Posters & Video Walls"
                isActive={showLed}
                icon={<IconLayoutPanelTop />}
              />
            </RevealItem>
            <RevealItem>
              <CategoryCard
                onClick={() => setActiveCategory("signage")}
                label="Digital Signage"
                isActive={showSignage}
                icon={<IconMegaphone />}
              />
            </RevealItem>
            <RevealItem>
              <CategoryCard
                onClick={() => setActiveCategory("accessories")}
                label="Accessories"
                isActive={showAccessories}
                icon={<IconWrench />}
              />
            </RevealItem>
            <RevealItem className="col-span-2 sm:col-span-1">
              <CategoryCard
                onClick={() => setActiveCategory("software")}
                label="Educational & Management Software"
                isActive={showSoftware}
                icon={<IconBookOpen />}
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <Container className="pt-10 pb-14 sm:pb-20 lg:pt-24">
        {showInteractive ? (
          <div className="mx-auto w-full max-w-xl">
            <BrandTabs
              active={interactiveBrand}
              onChange={setInteractiveBrand}
            />
          </div>
        ) : null}
        {showInteractiveVirtual ? (
          <section
            id="interactive-panels"
            className={`scroll-mt-24${showInteractive ? " mt-10" : ""}`}
          >
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
                Virtual — house brand
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
                Built for everyday classrooms, boardrooms, and homes.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-6 text-zinc-600">
                Our own line of interactive flat panels. Rated for 100,000 hours
                with full replacement warranty coverage, OPS-ready, and
                supported by your assigned Virtual rep — not a stranger.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {interactivePanels.map((p) => (
                <RevealItem key={p.name}>
                  <ProductCard
                    name={p.name}
                    badge={p.badge}
                    imageSrc={p.imageSrc}
                    sizes={p.sizes}
                    desc={p.desc}
                    highlights={p.highlights}
                    actions={p.actions}
                  />
                </RevealItem>
              ))}

              <RevealItem className="md:col-span-2 lg:col-span-2">
                <div className="relative flex h-full flex-col rounded-2xl border border-rose-100/80 p-6 sm:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
                    Standard on every Virtual panel
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-950 md:text-[26px]">
                    Four things you&apos;ll{" "}
                    <span className="text-primary">feel the second</span> you
                    walk up to it.
                  </h3>
                  <div className="mt-6 grid flex-1 gap-4 sm:grid-cols-2">
                    {capabilities.map(({ icon: Icon, kicker, title, desc }) => (
                      <article
                        key={title}
                        className="flex flex-col rounded-xl border border-rose-100/70 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                      >
                        <div className="flex items-start justify-between">
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-rose-100/90 bg-rose-50 text-red-600"
                            aria-hidden
                          >
                            <Icon className="h-5 w-5" strokeWidth={2} />
                          </div>
                          <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-400">
                            {kicker}
                          </span>
                        </div>

                        <h4 className="mt-4 text-base font-bold leading-snug tracking-tight text-zinc-900">
                          {title}
                        </h4>
                        <p className="mt-2 text-sm font-normal leading-relaxed text-zinc-600">
                          {desc}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </RevealItem>
            </RevealGroup>
          </section>
        ) : null}

        {showInteractiveVirtual ? <FeaturedVt13Band /> : null}

        {showLed ? (
          <section className="mt-14 sm:mt-16 scroll-mt-24" id="led">
            <Reveal className="text-center">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600 uppercase">
                Virtual line — exclusive
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl text-zinc-950">
                DvLED posters & video walls — from a single panel to an entire
                wall.
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
                Direct-view LED for the spaces traditional LCDs can&apos;t reach
                — bright lobbies, gymnasiums, outdoor-adjacent windows, and
                walls that need to be measured in feet, not inches.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-4 lg:grid-cols-3">
              {ledLineup.map((p) => (
                <RevealItem key={p.name}>
                  <CatalogCard
                    name={p.name}
                    badge={p.badge}
                    sizes={p.sizes}
                    desc={p.desc}
                    imageSrc={p.imageSrc}
                    videoSrc={p.videoSrc}
                    ctaLabel="Download Spec Sheet"
                    ctaHref="/contact"
                  />
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              {/* <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div className="text-sm font-bold text-zinc-950">
                    Customer story · University of Central Arkansas
                  </div>
                </div>
                <div>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">
                    UCA runs 6 Virtual LED posters across campus alongside 11 VT
                    Pro p-cap panels. The poster photos throughout our gallery?
                    All from this install.
                  </p>
                </div>
                <ButtonLink href="/gallery" variant="secondary" size="sm">
                  See the UCA install
                </ButtonLink>
              </div> */}
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-zinc-950">
                    Customer story · University of Central Arkansas
                  </h3>
                  <p className="my-2 text-sm text-zinc-600">
                    UCA runs{" "}
                    <strong className="text-zinc-950">
                      6 Virtual DvLED posters
                    </strong>{" "}
                    across campus alongside{" "}
                    <strong className="text-zinc-950">
                      11 VT Pro p-cap panels
                    </strong>
                    . The poster photos throughout our gallery? All from this
                    install.
                  </p>
                  <Link
                    href="/gallery"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700"
                  >
                    See the UCA install <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {showInteractiveOneScreen ? (
          <section className="mt-10 scroll-mt-24" id="onescreen">
            <Reveal className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
                OneScreen — authorized dealer
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
                Touchscreen T7 — smarter screen, made to last.
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
                We're the original and only authorized distributor of the
                OneScreen line. The flagship T7 pairs a battle-tested
                collaboration panel with the GURU live-help service that comes
                standard on every OneScreen product.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 grid gap-6 lg:grid-cols-2">
              <RevealItem className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5">
                <div className="relative aspect-[16/9] w-full bg-zinc-100">
                  <Image
                    src="/products/onescreen-t7-DtnnEsSH.png"
                    alt="OneScreen Touchscreen T7"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 640px, 92vw"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5"
                  />
                  <div className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-red-600 px-2.5 py-1 text-[9px] font-extrabold tracking-[0.22em] text-white">
                    FLAGSHIP
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-5 text-left">
                    <div className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      Touchscreen T7
                    </div>
                    <p className="mt-1 text-sm font-medium text-white/90">
                      Smarter screen. Made to last.
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[11px] font-extrabold tracking-[0.22em] text-red-600">
                    TOUCHSCREEN T7
                  </div>
                  <div className="mt-2 text-lg font-semibold text-zinc-950">
                    Smarter screen. Made to last.
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    Built for speed and efficiency with an Octa-core processor,
                    8GB RAM, 128GB storage, and Android 15 — all backed by
                    Google EDLA certification.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Multitask effortlessly: share your screen, annotate, process
                    data, and extend your display across multiple screens — all
                    at once.
                  </p>

                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2.5">
                    {[
                      "Octa-core processor",
                      "8GB RAM · 128GB storage",
                      "Android 15",
                      "Google EDLA certified",
                      "Screen share + extend",
                      "Annotate & multitask",
                    ].map((h) => (
                      <ChecklistLine key={h}>{h}</ChecklistLine>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap justify-start gap-x-6 gap-y-3 sm:gap-8">
                    <a
                      href="/pdf/OneScreen_T7-Business-105_Spec_Sheet.pdf"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline border-b border-red-600/20"
                    >
                      105&quot; Business Spec
                      <span aria-hidden>→</span>
                    </a>
                    <a
                      href="/pdf/OneScreen_T7-Education-86_Spec_Sheet.pdf"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline border-b border-red-600/20"
                    >
                      86&quot; Education Spec
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </RevealItem>

              <RevealItem className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
                  <div className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-zinc-950 px-2.5 py-1 text-[9px] font-extrabold tracking-[0.22em] text-white">
                    INCLUDED
                  </div>
                  <div className="absolute inset-0 p-6 sm:p-8">
                    <div className="relative h-full w-full min-h-0 min-w-0">
                      <Image
                        src="/products/onescreen-guru-badge-5aFHwYcl.png"
                        alt="GURU Help 24/5"
                        fill
                        className="object-contain"
                        sizes="(min-width: 1024px) 40vw, 90vw"
                      />
                    </div>
                  </div>
                </div>
                <div className="border-t border-zinc-200 p-6">
                  <div className="text-[11px] font-extrabold tracking-[0.22em] text-red-600">
                    GURU HELP · 24/5
                  </div>
                  <div className="mt-2 text-lg font-semibold text-zinc-950">
                    Live human support, included.
                  </div>
                  <p className="mt-2 text-[12px] font-semibold text-zinc-500">
                    24/5 Live GURU Support Included · Available for All
                    OneScreen Products
                  </p>
                  <p className="mt-4 text-sm leading-6 text-zinc-600">
                    Every OneScreen product ships with 24/5 live GURU support —
                    real people who help your team get unstuck on day one and
                    every day after.
                  </p>

                  <ul className="mt-5 m-0 flex list-none flex-col gap-2.5 p-0">
                    {[
                      "24/5 live human support — no chatbots",
                      "Available for all OneScreen products",
                      "Onboarding, training, and troubleshooting",
                      "Pairs with your assigned Virtual rep",
                    ].map((x) => (
                      <li key={x}>
                        <ChecklistLine>{x}</ChecklistLine>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-sm italic leading-6 text-zinc-500">
                    Your Virtual rep is your first call — GURU is the global
                    safety net behind it.
                  </p>
                </div>
              </RevealItem>
            </RevealGroup>

            <OneScreenSoftwareSuite />
          </section>
        ) : null}

        {showInteractiveInFocus ? (
          <section className="mt-10 scroll-mt-24" id="infocus">
            <Reveal className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-red-600">
                InFocus — newest partner
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
                A trusted name in display technology, now in our lineup.
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
                Three interactive panels — the original JTouch, the latest
                JTouch 13 E, and the pro-grade JTouch Pro-01.
              </p>
              <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-zinc-600">
                Same single-source experience: Virtual handles spec, quote,
                install, and support.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-3">
              <RevealItem>
                <CatalogCard
                  name="InFocus JTouch"
                  badge="Interactive panel"
                  sizes={`65" · 75" · 86"`}
                  desc="Versatile interactive panel with 4K display, intuitive whiteboard software, and quick-access Cast, White Board, File Manager, and Applications."
                  imageSrc="/products/infocus-jtouch-CvBKjMP8.png"
                  ctaLabel="Download Spec Sheet"
                  ctaHref="/pdf/vti-spec-packet.pdf"
                  ctaDownload="vti-spec-packet.pdf"
                />
              </RevealItem>

              <RevealItem>
                <CatalogCard
                  name="InFocus JTouch 13 E"
                  badge="Latest release"
                  sizes={`65" · 75" · 86"`}
                  desc="Next-gen JTouch with refreshed Android UI, integrated Google apps, and Play Store access — plus the same Cast, White Board, and File Manager workflow teachers already know."
                  imageSrc="/products/infocus-jtouch-13e-DvR8j-aL.png"
                  ctaLabel="Download Spec Sheet"
                  ctaHref="/pdf/vti-spec-packet.pdf"
                  ctaDownload="vti-spec-packet.pdf"
                />
              </RevealItem>

              <RevealItem>
                <CatalogCard
                  name="InFocus JTouch Pro-01"
                  badge="Pro series"
                  sizes={`65" · 75" · 86"`}
                  desc="Pro-series interactive panel built for high-use rooms — 4K UHD, capacitive touch, and a 50,000-hour-plus lifetime rating for daily classroom and conference duty."
                  specCheckItems={[
                    "4K UHD · 3840 x 2160",
                    "16:9 aspect ratio",
                    "Capacitive touch",
                    "≥ 50,000 hr lifetime",
                    "400 cd/m² brightness",
                    "Available in US only",
                  ]}
                  imageSrc="/products/infocus-jtouch-pro-01-CMN2qRY6.png"
                  ctaLabel="Download Spec Sheet"
                  ctaHref="/pdf/vti-spec-packet.pdf"
                  ctaDownload="vti-spec-packet.pdf"
                />
              </RevealItem>
            </RevealGroup>

            <div className="mt-8 text-center text-sm text-zinc-500">
              Not sure which JTouch fits your room?{" "}
              <a
                href="/contact"
                className="font-bold text-red-600 transition hover:text-red-700"
              >
                Talk to your Virtual rep →
              </a>
            </div>
          </section>
        ) : null}

        {showInteractiveVivi ? (
          <section className="mt-10 scroll-mt-24" id="vivi">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
                Vivi — newest partnership
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
              A Vivi line of Interactive panels, powered by Virtual
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
                Vivi is partnering with Virtual Technology Innovations to launch
                its own line of interactive flat panels with Vivi&apos;s
                award-winning campus operating system built in — simplifying
                crisis response, campus communications, and classroom
                instruction across every display in your school.
              </p>
            </Reveal>

            <Reveal className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50/60 p-6 sm:p-10">
              <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5">
                  <div className="relative aspect-[16/10] w-full bg-zinc-100">
                    <Image
                      src="/products/vivi-evacuate.png"
                      alt="Vivi emergency evacuation alert displayed on a classroom interactive panel and laptop"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 640px, 92vw"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-48 w-48 sm:h-56 sm:w-56">
                    <Image
                      src="/products/vivi-koala.png"
                      alt="Vivi koala mascot plush wearing a white varsity jacket — a customer giveaway"
                      fill
                      className="object-contain"
                      sizes="224px"
                    />
                  </div>
                  <p className="mt-4 max-w-[18rem] text-sm font-semibold text-zinc-950">
                    Meet the Vivi koala.
                  </p>
                  <p className="mt-1 max-w-[20rem] text-xs text-zinc-600">
                    A favorite customer giveaway from our partners at Vivi — ask
                    your Virtual rep about getting one with your rollout.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10">
              <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-red-600">
                    The essential operating system for schools
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
                    One platform for crisis response, campus communications, and
                    instruction.
                  </h3>
                  <p className="mt-4 text-base leading-7 text-zinc-600">
                    Purpose-built for the way schools actually work — and only
                    schools. Vivi unifies every display and device a school
                    already owns, replacing four legacy tools with one campus
                    operating system.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                      {
                        to: 2400,
                        label: "Schools",
                        format: (v: number) =>
                          `${Math.round(v).toLocaleString()}+`,
                      },
                      {
                        to: 160,
                        label: "Classrooms",
                        format: (v: number) => `${Math.round(v)}K+`,
                      },
                      {
                        to: 825,
                        label: "Teachers & students",
                        format: (v: number) => `${Math.round(v)}K+`,
                      },
                      {
                        to: 75,
                        label: "Live-caption languages",
                        format: (v: number) => `${Math.round(v)}`,
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border border-zinc-200 bg-white p-3 text-center"
                      >
                        <div className="text-xl font-extrabold text-zinc-950 sm:text-2xl">
                          <CountUp to={s.to} format={s.format} duration={1.8} />
                        </div>
                        <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <ButtonLink
                    href="/contact"
                    size="sm"
                    className="mt-7 !bg-red-600 !text-white hover:!bg-red-700"
                  >
                    Talk to your Virtual rep about Vivi
                  </ButtonLink>
                </div>

                <RevealGroup className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Emergency Alerts",
                      desc: "Visual alerts on every display plus mandatory acknowledgment on every staff device — an auditable record for Alyssa's Law and every compliance review.",
                    },
                    {
                      icon: GraduationCap,
                      title: "Instructional Impact",
                      desc: "Wireless sharing, student sharing, real-time polling, virtual whiteboard, and Stream to Students — reaching every device, not just the screen on the wall.",
                    },
                    {
                      icon: Megaphone,
                      title: "Digital Signage & Announcements",
                      desc: "School calendars, event promotion, student work, safety messaging, and visitor wayfinding on every screen already up in your school.",
                    },
                    {
                      icon: Layers,
                      title: "Tool Consolidation",
                      desc: "One platform replaces digital signage, emergency alerts, wireless screen sharing, and legacy PA systems. Every display doing four times the work.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <RevealItem
                      key={title}
                      className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-rose-100/90 bg-rose-50 text-red-600"
                        aria-hidden
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <h4 className="mt-1 text-sm font-bold text-zinc-950">
                        {title}
                      </h4>
                      <p className="text-xs leading-relaxed text-zinc-600">
                        {desc}
                      </p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </Reveal>

            <Reveal className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-red-600">
                Why this matters
              </p>
              <p className="mt-3 text-base leading-7 text-zinc-700 sm:text-lg">
                Vivi is recognized by Tech &amp; Learning Awards of Excellence
                and the ISTE Best of Show. 90% of Vivi customers say it has
                helped them achieve their strategic objectives, and 97% say it
                has driven more positive teacher–student interactions. Pair that
                with Virtual hardware, install, and your dedicated rep — one
                source, one accountable team.
              </p>
            </Reveal>

            <div className="mt-8 text-center text-sm text-zinc-500">
              Ready to bring Vivi to your campus?{" "}
              <a
                href="/contact"
                className="font-bold text-red-600 transition hover:text-red-700"
              >
                Talk to your Virtual rep →
              </a>
            </div>
          </section>
        ) : null}

        {showSignage ? (
          <section className="mt-14 sm:mt-16 scroll-mt-24" id="signage">
            <Reveal className="text-center">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
                VIRTUAL LINE
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl text-zinc-950">
                Digital signage that talks to your customers.
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
                Menu boards, wayfinding, lobby welcome screens, and storefront
                displays. Commercial-grade LCDs built for 24/7 duty cycles and
                managed from one simple cloud dashboard.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-4 lg:grid-cols-3">
              {signageLineup.map((p) => (
                <RevealItem key={p.name}>
                  <CatalogCard
                    name={p.name}
                    badge={p.badge}
                    sizes={p.sizes}
                    desc={p.desc}
                    imageSrc={p.imageSrc}
                    ctaLabel="Download Spec Sheet"
                    ctaHref="/contact"
                  />
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-6 text-zinc-600">
              Need help picking between an LED video wall and an LCD signage
              display?{" "}
              <a
                href="/contact"
                className="font-semibold text-red-700 hover:text-red-800"
              >
                Talk to your Virtual rep →
              </a>{" "}
              We&apos;ll match the technology to the room — viewing distance,
              ambient light, and budget.
            </div>
          </section>
        ) : null}

        {showAccessories ? <AccessoriesSection /> : null}

        {showSoftware ? (
          <section className="mt-14 sm:mt-16 scroll-mt-24" id="software">
            <Reveal className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-zinc-950">
                The software is included. The learning content is, too.
              </h2>
              <p className="mx-auto mt-3 max-w-[760px] text-sm leading-5 text-zinc-500">
                Every Virtual panel ships with built-in collaboration tools,
                palm-rejection touch tech, and — for K-12 — our Get Curious
                Together OER content platform.
              </p>
            </Reveal>

            {/* <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2">
              {softwareFeatures.map((f) => (
                <RevealItem
                  key={f.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5 text-zinc-950 transition-shadow hover:shadow-md hover:shadow-zinc-950/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-red-600"
                    >
                      <SoftwareFeatureIcon name={f.icon} className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold">{f.title}</div>
                  </div>
                  <p className="mt-2 text-[12px] leading-5 text-zinc-500">
                    {f.desc}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup> */}

            <Reveal className="mt-12">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-red-600">
                  <BookOpen className="h-5 w-5" />
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
                  Educational software
                </p>
              </div>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl text-zinc-950">
                ZUNI Learning Tree — now Get Curious Together
              </h3>
            </Reveal>

            <Reveal className="mt-10 relative overflow-hidden rounded-3xl bg-zinc-950 p-8 text-white sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-charcoal"
              />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] text-white ring-1 ring-inset ring-red-500/30">
                    <BookOpen className="h-4 w-4" />
                    INCLUDED WITH K-12 PANELS
                  </div>

                  <div className="mt-4 text-2xl font-semibold">
                    Thousands of curated, vetted, free OER resources — sorted by
                    grade level.
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white/70">
                    Open Educational Resources hand-picked for the way teachers
                    actually use an interactive panel — ready to project,
                    annotate, and remix in front of the class. Browse by grade
                    and subject in seconds. Tree
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "Literacy",
                      "Math",
                      "Science",
                      "STEM",
                      "Be Inspired",
                      "Coding",
                      "News for Kids",
                      "And more",
                    ].map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-white/85"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl bg-white/5 p-5 ring-1 ring-inset ring-white/10">
                    <div className="text-[11px] font-extrabold tracking-[0.22em] text-primary">
                      WHAT IS OER?
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/80">
                      <span className="font-semibold text-white">
                        OER = Open Educational Resources.
                      </span>{" "}
                      Free, openly licensed teaching materials — lessons,
                      videos, assessments — that teachers can legally use,
                      adapt, and share. No per-seat licensing. No &quot;trial
                      expired&quot; surprises. The content is yours to keep.
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <ButtonLink
                      href="/contact"
                      size="sm"
                      className="!bg-red-600 !text-white hover:!bg-red-700"
                    >
                      Request a demo
                    </ButtonLink>
                    <ButtonLink
                      href="/gallery"
                      size="sm"
                      variant="ghost"
                      className="border border-white/15 bg-transparent !text-white hover:bg-white/10"
                    >
                      See it in classrooms
                    </ButtonLink>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-white/5 p-4 ring-1 ring-inset ring-white/10">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-white ring-1 ring-white/10">
                    <Image
                      src="/products/zuni-rolling.jpg"
                      alt="Get Curious Together"
                      fill
                      className="object-cover"
                      sizes="100%"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-14 sm:mt-16">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 ring-1 ring-inset ring-cyan-100"
                >
                  <Settings className="h-5 w-5" />
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-700">
                  Management software
                </p>
              </div>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
                Run every screen on campus from one chair.
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                Push content, monitor health, schedule signage, cast wirelessly
                — across interactive panels, LED walls, and signage displays.
                Pick the platform that matches the job.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                {
                  name: "Vivi",
                  tag: "Campus OS",
                  desc: "The essential operating system for schools — emergency alerts, instructional sharing, announcements, and digital signage on every display and device, centrally managed.",
                  bullets: [
                    "Visual emergency alerts + mandatory acknowledgment",
                    "Wireless screen sharing & student sharing",
                    "Live captions in 75 languages",
                  ],
                },
                {
                  name: "ViPlex",
                  tag: "LED management",
                  desc: "Novastar's LED display content publishing and control platform. Push schedules, content, and brightness/color settings to every LED wall and signage screen from one console.",
                  bullets: [
                    "Async + sync mode",
                    "Schedule playlists across many screens",
                    "Real-time monitoring & alerts",
                  ],
                },
                {
                  name: "SeeMonster",
                  tag: "Digital signage",
                  desc: "Cloud-based digital signage that lets non-technical staff design, schedule, and display videos, images, web pages, and live data on any screen — affordably.",
                  bullets: [
                    "Drag-and-drop scheduling",
                    "Interactive kiosk-ready",
                    "Playback proof-of-play reporting",
                  ],
                },
                {
                  name: "EShare",
                  tag: "Wireless casting",
                  desc: "The casting engine built into our panels. Mirror or extend from Mac, Windows, iOS, Android, or Chromebook — no dongles, no driver downloads, no per-seat license.",
                  bullets: [
                    "Up to 9 simultaneous screens",
                    "Touch-back from the panel",
                    "Moderator controls",
                  ],
                },
              ].map((app) => (
                <RevealItem
                  key={app.name}
                  className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-950/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md hover:shadow-zinc-950/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-xl font-extrabold tracking-tight text-zinc-950">
                      {app.name}
                    </h4>
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-600">
                      {app.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {app.desc}
                  </p>
                  <ul className="mt-4 m-0 flex list-none flex-col gap-1.5 p-0">
                    {app.bullets.map((b) => (
                      <li key={b}>
                        <ChecklistLine>{b}</ChecklistLine>
                      </li>
                    ))}
                  </ul>
                  <div
                    aria-hidden
                    className="mt-5 h-px w-10 bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-300 group-hover:w-20"
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </section>
        ) : null}

        {showInteractiveVirtual ? (
          <section className="mt-14 sm:mt-16">
            <Reveal>
              <SectionHeading
                kicker="COMPARE · VIRTUAL LINE"
                title="Find the right panel for the room."
                lead="Side-by-side specs across our three core Virtual interactive flat panel families."
              />
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <DataTable
                columns={[
                  "Specification",
                  "VT-IR",
                  "VT Pro",
                  `105" Ultra-Wide`,
                ]}
                rows={compareRows.map((r) =>
                  r.label === "Warranty"
                    ? [r.label, { value: r.a, colSpan: 3 }]
                    : [r.label, r.a, r.b, r.c],
                )}
              />
            </Reveal>
          </section>
        ) : null}

        {showInteractiveVirtual ? (
          <section className="mt-14 sm:mt-16">
            <Reveal className="max-w-3xl">
              <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
                PHYSICAL DIMENSIONS
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl text-zinc-950">
                How tall and wide is a 65&quot; panel? (Now you can stop
                guessing.)
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                The dimensions every installer, AV designer, and facilities
                manager actually needs — but nobody publishes clearly. All
                measurements in inches.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-7">
              <DataTable
                columns={[
                  "Panel size",
                  "Active screen (W × H)",
                  "Outer panel (W × H × D)",
                  "Weight",
                  "VESA mount",
                ]}
                rows={dimensionRows.map((r) => [
                  r.size,
                  r.active,
                  r.outer,
                  r.weight,
                  r.vesa,
                ])}
              />
            </Reveal>

            <p className="mt-4 max-w-4xl text-[12px] leading-5 text-zinc-500">
              Dimensions shown are approximate and rounded to the nearest 0.1
              inch. Always confirm exact measurements against the model-specific
              spec sheet before cutting millwork or ordering wall mounts.
            </p>
          </section>
        ) : null}

        <div className="mt-14 sm:mt-16">
          <ValuePropsAndTrustedBand showValueProps={false} />
        </div>

        {/* <section className="mt-10 sm:mt-12">
          <Reveal className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
              <div>
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-3xl">
                  Need a side-by-side spec sheet?
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                  We&apos;ll send a tailored spec packet for the rooms
                  you&apos;re outfitting — across Virtual, OneScreen, or
                  InFocus.
                </p>
              </div>
              <div className="md:pt-1 md:text-right">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-red-500 hover:underline"
                >
                  Contact Us
                  <span aria-hidden="true" className="inline-block">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-8 grid gap-4 border-t border-zinc-200 pt-8 sm:mt-9 sm:grid-cols-3 sm:gap-6 sm:pt-9">
              {(
                [
                  "Plain-English spec sheets",
                  "Reseller pricing on request",
                  "Loaner/demo units available",
                ] as const
              ).map((line) => (
                <div key={line} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-white"
                    aria-hidden
                  >
                    <svg
                      className="h-2.5 w-2.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 6" />
                    </svg>
                  </span>
                  <span className="text-sm leading-6 text-zinc-600">
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section> */}
      </Container>

      <PanelFinderModal
        open={panelFinderOpen}
        onClose={() => setPanelFinderOpen(false)}
      />
    </div>
  );
}
