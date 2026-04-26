'use client';

import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import Image from "next/image";
import { useState } from "react";

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
import {
  ledLineup,
  signageLineup,
  softwareFeatures,
} from "./_data/lineups";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<
    "interactive" | "led" | "signage" | "accessories" | "software"
  >("interactive");
  const [interactiveBrand, setInteractiveBrand] = useState<
    "virtual" | "onescreen" | "infocus"
  >("virtual");
  const [panelFinderOpen, setPanelFinderOpen] = useState(false);

  const showInteractive = activeCategory === "interactive";
  const showLed = activeCategory === "led";
  const showSignage = activeCategory === "signage";
  const showAccessories = activeCategory === "accessories";
  const showSoftware = activeCategory === "software";

  const showInteractiveVirtual = showInteractive && interactiveBrand === "virtual";
  const showInteractiveOneScreen = showInteractive && interactiveBrand === "onescreen";
  const showInteractiveInFocus = showInteractive && interactiveBrand === "infocus";

  return (
    <div>
      <section className="relative border-b border-zinc-200 bg-zinc-100/50 pb-12 dark:border-zinc-800 dark:bg-zinc-900/25 md:pb-14">
        <Container className="py-8 md:py-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
              Products
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 md:text-4xl lg:text-5xl">
              The full Virtual lineup.
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 md:text-base">
              Interactive panels, LED posters & video walls, digital signage,
              accessories, and our Get Curious Together OER software for K-12
              classrooms.
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setPanelFinderOpen(true)}
                className="inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-left text-sm font-semibold text-red-600 hover:underline dark:text-red-400"
              >
                <SparklesIcon />
                Not sure which panel? Take the 30-second finder
              </button>
            </div>
          </div>
        </Container>
        <div className="container-vti pointer-events-auto absolute inset-x-0 bottom-0 translate-y-1/2 px-5">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-2.5 md:gap-3 lg:grid-cols-5">
            <CategoryCard
              onClick={() => setActiveCategory("interactive")}
              label="Interactive Panels"
              isActive={showInteractive}
              icon={<IconMonitor />}
            />
            <CategoryCard
              onClick={() => setActiveCategory("led")}
              label="LED Posters & Video Walls"
              isActive={showLed}
              icon={<IconLayoutPanelTop />}
            />
            <CategoryCard
              onClick={() => setActiveCategory("signage")}
              label="Digital Signage"
              isActive={showSignage}
              icon={<IconMegaphone />}
            />
            <CategoryCard
              onClick={() => setActiveCategory("accessories")}
              label="Accessories"
              isActive={showAccessories}
              icon={<IconWrench />}
            />
            <CategoryCard
              onClick={() => setActiveCategory("software")}
              label="Educational & Management Software"
              isActive={showSoftware}
              icon={<IconBookOpen />}
            />
          </div>
        </div>
      </section>

      <Container className="pt-20 pb-14 sm:pb-20 md:pt-24">
        {showInteractive ? (
          <div className="mx-auto w-full max-w-md">
            <BrandTabs active={interactiveBrand} onChange={setInteractiveBrand} />
          </div>
        ) : null}
        {showInteractiveVirtual ? (
        <section
          id="interactive-panels"
          className={`scroll-mt-24${showInteractive ? " mt-10" : ""}`}
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
              Virtual — house brand
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
              Built for everyday classrooms, boardrooms, and homes.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-6 text-zinc-600 dark:text-zinc-400">
              Our own line of interactive flat panels. Backed by a 5-year warranty,
              OPS-ready, and supported by your assigned Virtual rep — not a stranger.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {interactivePanels.map((p) => (
              <ProductCard
                key={p.name}
                name={p.name}
                badge={p.badge}
                imageSrc={p.imageSrc}
                sizes={p.sizes}
                desc={p.desc}
                highlights={p.highlights}
                actions={p.actions}
              />
            ))}
          </div>
        </section>
        ) : null}

        {showInteractiveVirtual ? <FeaturedVt13Band /> : null}

        {showLed ? (
        <section className="mt-14 sm:mt-16 scroll-mt-24" id="led">
          <div className="text-center">
            <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
              Virtual line — exclusive
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              LED posters & video walls — from a single panel to an entire wall.
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Direct-view LED for the spaces traditional LCDs can&apos;t reach — bright
              lobbies, gymnasiums, outdoor-adjacent windows, and walls that need to be
              measured in feet, not inches.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {ledLineup.map((p) => (
              <CatalogCard
                key={p.name}
                name={p.name}
                badge={p.badge}
                sizes={p.sizes}
                desc={p.desc}
                imageSrc={p.imageSrc}
                ctaLabel="Download spec sheet"
                ctaHref="/contact"
              />
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">
                  Customer story · University of Central Arkansas
                </div>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  UCA runs 6 Virtual LED posters across campus alongside 11 VT Pro p-cap
                  panels. The poster photos throughout our gallery? All from this
                  install.
                </p>
              </div>
              <ButtonLink href="/gallery" variant="secondary" size="sm">
                See the UCA install
              </ButtonLink>
            </div>
          </div>
        </section>
        ) : null}

        {showInteractiveOneScreen ? (
        <section className="mt-10 scroll-mt-24" id="onescreen">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
              OneScreen — authorized dealer
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              We&apos;re a longtime authorized dealer of the OneScreen line. The
              flagship T7 pairs a battle-tested collaboration panel with the GURU
              live-help service that comes standard on every OneScreen product.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none">
              <div className="relative aspect-[16/9] w-full bg-zinc-100 dark:bg-zinc-900/40">
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
                <div className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-extrabold tracking-[0.22em] text-white">
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
                <div className="mt-2 text-lg font-semibold">Smarter screen. Made to last.</div>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Built for speed and efficiency with an Octa-core processor, 8GB RAM,
                  128GB storage, and Android 13 — all backed by Google EDLA certification.
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Multitask effortlessly: share your screen, annotate, process data, and
                  extend your display across multiple screens — all at once.
                </p>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2.5">
                  {[
                    "Octa-core processor",
                    "8GB RAM · 128GB storage",
                    "Android 13",
                    "Google EDLA certified",
                    "Screen share + extend",
                    "Annotate & multitask",
                  ].map((h) => (
                    <ChecklistLine key={h}>{h}</ChecklistLine>
                  ))}
                </div>

                <div className="mt-6">
                  <a
                    href="/pdf/vti-spec-packet.pdf"
                    download="vti-spec-packet.pdf"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
                  >
                    Download spec sheet
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
                <div className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-zinc-950 px-2.5 py-1 text-[11px] font-extrabold tracking-[0.22em] text-white">
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
              <div className="border-t border-zinc-200 p-6 dark:border-zinc-800">
                <div className="text-[11px] font-extrabold tracking-[0.22em] text-red-600">
                  GURU HELP · 24/5
                </div>
                <div className="mt-2 text-lg font-semibold">
                  Live human support, included.
                </div>
                <p className="mt-2 text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">
                  24/5 Live GURU Support Included · Available for All OneScreen Products
                </p>
                <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Every OneScreen product ships with 24/5 live GURU support — real people
                  who help your team get unstuck on day one and every day after.
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

                <p className="mt-5 text-sm italic leading-6 text-zinc-500 dark:text-zinc-500">
                  Your Virtual rep is your first call — GURU is the global safety net
                  behind it.
                </p>
              </div>
            </div>
          </div>

          <OneScreenSoftwareSuite />
        </section>
        ) : null}

        {showInteractiveInFocus ? (
        <section className="mt-10 scroll-mt-24" id="infocus">
          <div className="text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-red-600">
              InFocus — newest partner
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
              A trusted name in display technology, now in our lineup.
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Three interactive panels — the original JTouch, the latest JTouch 13 E, and
              the pro-grade JTouch Pro-01.
            </p>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Same single-source experience: Virtual handles spec, quote, install, and
              support.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-3">
            <CatalogCard
              name="InFocus JTouch"
              badge="Interactive panel"
              sizes={`65" · 75" · 86"`}
              desc="Versatile 4K display with whiteboard software and quick access to Cast, White Board, File Manager, and Applications — built for classrooms and meeting rooms that need a flexible interactive surface."
              imageSrc="/products/infocus-jtouch-CvBKjMP8.png"
              ctaLabel="Download spec sheet"
              ctaHref="/pdf/vti-spec-packet.pdf"
              ctaDownload="vti-spec-packet.pdf"
            />

            <CatalogCard
              name="InFocus JTouch 13 E"
              badge="Latest release"
              sizes={`65" · 75" · 86"`}
              desc="Refreshed Android experience with Google apps and Play Store access, plus the same Cast, White Board, and File Manager workflow your teams already use."
              imageSrc="/products/infocus-jtouch-13e-DvR8j-aL.png"
              ctaLabel="Download spec sheet"
              ctaHref="/pdf/vti-spec-packet.pdf"
              ctaDownload="vti-spec-packet.pdf"
            />

            <CatalogCard
              name="InFocus JTouch Pro-01"
              badge="Pro series"
              sizes={`65" · 75" · 86"`}
              desc="Pro-series for high-use rooms: 4K UHD, capacitive touch, and 50,000+ hour lifetime for daily classroom and conference duty."
              specCheckItems={[
                "4K UHD · 3840 x 2160",
                "16:9 aspect ratio",
                "Capacitive touch",
                "≥ 50,000 hr lifetime",
                "400 cd/m² brightness",
                "Available in US only",
              ]}
              imageSrc="/products/infocus-jtouch-pro-01-CMN2qRY6.png"
              ctaLabel="Download spec sheet"
              ctaHref="/pdf/vti-spec-packet.pdf"
              ctaDownload="vti-spec-packet.pdf"
            />
          </div>

          <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Not sure which JTouch fits your room?{" "}
            <a
              href="/contact"
              className="font-bold text-red-600 transition hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
            >
              Talk to your Virtual rep →
            </a>
          </div>
        </section>
        ) : null}

        {showSignage ? (
        <section className="mt-14 sm:mt-16 scroll-mt-24" id="signage">
          <div className="text-center">
            <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
              VIRTUAL LINE
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Digital signage that talks to your customers.
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Menu boards, wayfinding, lobby welcome screens, and storefront displays.
              Commercial-grade LCDs built for 24/7 duty cycles and managed from one
              simple cloud dashboard.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {signageLineup.map((p) => (
              <CatalogCard
                key={p.name}
                name={p.name}
                badge={p.badge}
                sizes={p.sizes}
                desc={p.desc}
                imageSrc={p.imageSrc}
                ctaLabel="Download spec sheet"
                ctaHref="/contact"
              />
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-6 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/20 dark:text-zinc-300">
            Need help picking between an LED video wall and an LCD signage display?{" "}
            <a
              href="/contact"
              className="font-semibold text-red-700 hover:text-red-800 dark:text-red-300 dark:hover:text-red-200"
            >
              Talk to your Virtual rep →
            </a>{" "}
            We&apos;ll match the technology to the room — viewing distance, ambient
            light, and budget.
          </div>
        </section>
        ) : null}

        {showAccessories ? <AccessoriesSection /> : null}

        {showSoftware ? (
        <section className="mt-14 sm:mt-16 scroll-mt-24" id="software">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              The software is included. The learning content is, too.
            </h2>
            <p className="mx-auto mt-3 max-w-[760px] text-[12px] leading-5 text-zinc-500 dark:text-zinc-400">
              Every Virtual panel ships with built-in collaboration tools, palm-rejection
              touch tech, and — for K-12 — our Get Curious Together OER content platform.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {softwareFeatures.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none"
              >
                <div className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-red-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-red-400"
                  >
                    <SoftwareFeatureIcon name={f.icon} className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold">{f.title}</div>
                </div>
                <p className="mt-2 text-[12px] leading-5 text-zinc-500 dark:text-zinc-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 relative overflow-hidden rounded-3xl bg-zinc-950 p-8 text-white sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_25%_0%,rgba(239,68,68,0.18),transparent_55%),radial-gradient(800px_circle_at_80%_90%,rgba(255,255,255,0.08),transparent_55%)]"
            />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-red-600/20 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] text-red-200 ring-1 ring-inset ring-red-500/30">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-300" />
                  INCLUDED WITH K-12 PANELS
                </div>

                <div className="mt-4 text-2xl font-semibold">Get Curious Together</div>
                <div className="mt-1 text-sm font-semibold text-white/70">
                  An OER platform for K-12 · Formerly known as ZUNI Learning Tree
                </div>

                <p className="mt-4 max-w-xl text-sm leading-6 text-white/80">
                  Lesson-ready open educational content built for the way teachers
                  actually use an interactive panel — interactive, multi-modal, and
                  ready to project, annotate, and remix in front of the class.
                </p>

                <div className="mt-6 rounded-2xl bg-white/5 p-5 ring-1 ring-inset ring-white/10">
                  <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/70">
                    WHAT IS OER?
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    <span className="font-semibold text-white">OER</span> = Open Educational
                    Resources. Free, openly licensed teaching materials — lessons,
                    videos, assessments — that teachers can legally use, adapt, and
                    share. No per-seat licensing. No &quot;trial expired&quot; surprises.
                    The content is yours to keep.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink
                    href="/contact"
                    size="sm"
                    className="!bg-red-600 !text-white hover:!bg-red-700 dark:!bg-red-600 dark:hover:!bg-red-700"
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
                    src="/products/led-cabinet-integration-Db-ZWsBf.jpg"
                    alt="Get Curious Together"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 420px, 90vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        ) : null}

        {showInteractiveVirtual ? (
        <section className="mt-14 sm:mt-16">
          <SectionHeading
            kicker="COMPARE · VIRTUAL LINE"
            title="Find the right panel for the room."
            lead="Side-by-side specs across our three core Virtual interactive flat panel families."
          />

          <div className="mt-8">
            <DataTable
              columns={["Specification", "VT13-IR", "VT Pro", `105" Ultra-Wide`]}
              rows={compareRows.map((r) => [r.label, r.a, r.b, r.c])}
            />
          </div>
        </section>
        ) : null}

        {showInteractiveVirtual ? (
        <section className="mt-14 sm:mt-16">
          <div className="max-w-3xl">
            <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
              PHYSICAL DIMENSIONS
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              How tall and wide is a 65&quot; panel? (Now you can stop guessing.)
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              The dimensions every installer, AV designer, and facilities manager
              actually needs — but nobody publishes clearly. All measurements in
              inches.
            </p>
          </div>

          <div className="mt-7">
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
          </div>

          <p className="mt-4 max-w-4xl text-[12px] leading-5 text-zinc-500 dark:text-zinc-400">
            Dimensions shown are approximate and rounded to the nearest 0.1 inch.
            Always confirm exact measurements against the model-specific spec sheet
            before cutting millwork or ordering wall mounts.
          </p>
        </section>
        ) : null}

        <div className="mt-14 sm:mt-16">
          <ValuePropsAndTrustedBand showValueProps />
        </div>

        <section className="mt-10 sm:mt-12">
          <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 sm:p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
              <div>
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
                  Need a side-by-side spec sheet?
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
                  We&apos;ll send a tailored spec packet for the rooms you&apos;re
                  outfitting — across Virtual, OneScreen, or InFocus. Usually
                  within one business day.
                </p>
              </div>
              <div className="md:pt-1 md:text-right">
                <a
                  href="/pdf/vti-spec-packet.pdf"
                  download="vti-spec-packet.pdf"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-800 transition hover:text-red-900 hover:underline dark:text-red-500 dark:hover:text-red-400"
                >
                  Download spec packet
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

            <div className="mt-8 grid gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800 sm:mt-9 sm:grid-cols-3 sm:gap-6 sm:pt-9">
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
                  <span className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>

      <PanelFinderModal
        open={panelFinderOpen}
        onClose={() => setPanelFinderOpen(false)}
      />
    </div>
  );
}

