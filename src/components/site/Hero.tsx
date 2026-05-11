"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { CountUp, Reveal, RevealGroup, RevealItem } from "@/components/motion";
import {
  EASE_OUT,
  maskRiseContainer,
  maskRiseLine,
} from "@/lib/motion";

const HEADLINE_LINES = [
  { text: "INFORM.", accent: false },
  { text: "ENGAGE.", accent: true },
  { text: "ELEVATE.", accent: false },
] as const;

type Stat =
  | { v: string; k: string }
  | { v: string; count: number; format: (value: number) => string };

const STATS: readonly Stat[] = [
  { k: "Nationwide", v: "Coverage" },
  { count: 10000, v: "DISPLAYS INSTALLED", format: formatDisplaysInstalled },
  { k: "Industry", v: "STANDARD WARRANTY" },
];

/**
 * Formatter for the "10K+" stat. Keeps the rolling number readable during
 * the count-up (e.g. `0+` → `5.5K+` → `10K+`) without ever flashing weird
 * round-up artifacts like `10.0K+` right before landing on `10K+`.
 *
 * Uses `Math.floor` (not `toFixed` rounding) on the tenths so the display
 * monotonically increases.
 */
function formatDisplaysInstalled(value: number): string {
  if (value >= 10000) return "10K+";
  if (value >= 1000) {
    const tenths = Math.floor(value / 100) / 10;
    return `${tenths.toFixed(1)}K+`;
  }
  return `${Math.round(value)}+`;
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="py-8 sm:py-7">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_560px]">
          <div className="space-y-4">
            <Reveal onMount>
              <div className="text-[11px] font-semibold tracking-[0.22em] text-red-600 sm:text-[12px]">
                DISPLAY TECHNOLOGY
              </div>
            </Reveal>

            {/*
              Mask-rise headline. Each line is clipped by an overflow-hidden
              wrapper; the inner `motion.span` starts pushed 110% below its
              own height and rises into place, staggered.
            */}
            <motion.h1
              variants={maskRiseContainer}
              initial="hidden"
              animate="visible"
              className="text-[clamp(2.25rem,11vw,3rem)] font-extrabold leading-[0.92] tracking-tight text-zinc-950 sm:text-[72px]"
            >
              {HEADLINE_LINES.map(({ text, accent }) => (
                <span
                  key={text}
                  className="block overflow-hidden pb-[0.05em]"
                >
                  <motion.span
                    variants={maskRiseLine}
                    className={
                      accent ? "block text-red-600" : "block"
                    }
                  >
                    {text}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <Reveal onMount delay={0.35}>
              <p className="max-w-xl text-[15px] leading-6 text-zinc-600 sm:text-[18px] sm:leading-7">
                Interactive panels, DvLED displays, and digital signage solutions
                for education, business, government, and public spaces — delivered
                through a nationwide partner network.
              </p>
            </Reveal>

            <Reveal onMount delay={0.5}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink
                  href="/products"
                  className="!bg-red-600 hover:!bg-red-700 !text-white w-full sm:w-auto"
                >
                  Explore Products
                  <span aria-hidden="true" className="ml-1">
                    →
                  </span>
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  className="!text-zinc-950 !bg-white hover:!bg-zinc-100 w-full sm:w-auto"
                  variant="secondary"
                >
                  Request a Quote
                </ButtonLink>
              </div>
            </Reveal>

            <RevealGroup
              onMount
              className="grid max-w-xl grid-cols-3 gap-3 pt-3 sm:gap-6"
            >
              {STATS.map((stat) => (
                <RevealItem key={stat.v} className="space-y-1">
                  <div className="text-xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
                    {"count" in stat ? (
                      <CountUp
                        to={stat.count}
                        format={stat.format}
                        duration={1.8}
                        delay={0.25}
                      />
                    ) : (
                      stat.k
                    )}
                  </div>
                  <div className="text-[10px] font-semibold tracking-[0.16em] text-zinc-500 uppercase sm:text-[12px] sm:tracking-[0.18em]">
                    {stat.v}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="relative order-first mx-auto w-full max-w-[420px] sm:max-w-[560px] lg:order-none lg:mx-0">
            <div className="pointer-events-none absolute -right-3 top-8 hidden h-20 w-20 rounded-full bg-zinc-950/5 blur-xl lg:block" />

            {/*
              Entrance: fade + scale-in (lens-opens feel for the circular crop).
              Inner wrapper: a gentle infinite float so the image feels alive.
              `MotionConfig reducedMotion="user"` (in MotionProvider) skips both
              for users with `prefers-reduced-motion: reduce`.
            */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                ease: EASE_OUT,
                delay: 0.25,
              }}
              className="relative ml-auto aspect-square w-full max-w-[520px]"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="absolute inset-0 overflow-hidden rounded-full border-0"
              >
                <Image
                  src="/vt-panel-hero.png"
                  alt="VTI interactive display lineup"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 420px, 88vw"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
