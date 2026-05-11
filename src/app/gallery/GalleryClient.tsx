"use client";

import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { motion } from "motion/react";
import { hoverLift, tapPress } from "@/lib/motion";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type GallerySegment = "All" | "K-12" | "Higher Ed" | "Corporate" | "Government";

type Installation = {
  id: string;
  segment: Exclude<GallerySegment, "All">;
  title: string;
  location: string;
  image?: { src: string; alt: string };
};

const installations: Installation[] = [
  {
    id: "its-all-about-the-students",
    segment: "K-12",
    title: "It's All About the Students",
    location: "We believe students belong at the boards more than teachers.",
    image: {
      src: "/gallery/students-at-board.jpg",
      alt: "It's All About the Students",
    },
  },
  {
    id: "elementary-spanish-class",
    segment: "K-12",
    title: "Elementary Spanish Class",
    location: "Westbrook USD, TX",
    image: {
      src: "/gallery/stem-lab-classroom.jpg",
      alt: "Elementary Spanish Class",
    },
  },
  {
    id: "dual-display-stem-lab",
    segment: "K-12",
    title: "Dual-Display STEM Lab",
    location: "Regional High School PD Day",
    image: {
      src: "/gallery/dual-screen-stem.jpg",
      alt: "Dual-Display STEM Lab",
    },
  },
  {
    id: "zuni-learning-tree-pilot",
    segment: "K-12",
    title: "ZUNI Learning Tree Pilot",
    location: "Albuquerque, NM",
    image: {
      src: "/gallery/zuni-booth.jpg",
      alt: "ZUNI Learning Tree Pilot",
    },
  },
  {
    id: "zuni-on-a-mobile-cart",
    segment: "K-12",
    title: "ZUNI on a Mobile Cart",
    location: "Community Learning Center, AR",
    image: {
      src: "/gallery/zuni-rolling-cart.jpg",
      alt: "ZUNI on a Mobile Cart",
    },
  },
  {
    id: "boys-girls-club-family-night",
    segment: "K-12",
    title: "Boys & Girls Club Family Night",
    location: "Faulkner County, AR",
    image: {
      src: "/gallery/boys-girls-club.jpg",
      alt: "Boys & Girls Club Family Night",
    },
  },
  {
    id: "campus-welcome-center-led-wall",
    segment: "Higher Ed",
    title: "Campus Welcome Center LED Wall",
    location: "Auburn, AL",
    image: {
      src: "/gallery/auburn-led-wall.jpg",
      alt: "Campus Welcome Center LED Wall",
    },
  },
  {
    id: "gulf-coast-state-college-bayway",
    segment: "Higher Ed",
    title: "Gulf Coast State College Bayway",
    location: "Panama City, FL",
    image: {
      src: "/gallery/gulf-coast-bayway.jpg",
      alt: "Gulf Coast State College Bayway",
    },
  },
  {
    id: "conway-symphony-orchestra",
    segment: "Higher Ed",
    title: "Conway Symphony Orchestra",
    location: "Conway, AR",
    image: {
      src: "/gallery/conway-symphony.jpg",
      alt: "Conway Symphony Orchestra",
    },
  },
  {
    id: "uca-music-pcaps-lineup",
    segment: "Higher Ed",
    title: `11 × 86" P-Caps Lineup`,
    location: "UCA Music Department, Conway, AR",
    image: {
      src: "/gallery/uca-music-pcaps.jpg",
      alt: `11 × 86" P-Caps Lineup`,
    },
  },
  {
    id: "edge-business-office",
    segment: "Corporate",
    title: "Edge Business Office",
    location: "Atlanta, GA",
    image: {
      src: "/gallery/edge-business-office.jpg",
      alt: "Edge Business Office",
    },
  },
  {
    id: "vt-pro-hybrid-meeting-room",
    segment: "Corporate",
    title: "VT Pro Hybrid Meeting Room",
    location: "Atlas Logistics",
    image: {
      src: "/gallery/vt-pro-led-wall.jpg",
      alt: "VT Pro Hybrid Meeting Room",
    },
  },
  {
    id: "immersive-reef-led-wall",
    segment: "Corporate",
    title: "Immersive Reef LED Wall",
    location: "Executive Lounge",
    image: {
      src: "/gallery/led-underwater-wall.jpg",
      alt: "Immersive Reef LED Wall",
    },
  },
  {
    id: "portrait-dvled-showcase",
    segment: "Corporate",
    title: "Portrait DvLED Showcase",
    location: "Demo Experience Center",
    image: {
      src: "/gallery/led-portrait-boats.jpg",
      alt: "Portrait DvLED Showcase",
    },
  },
  {
    id: "panama-city-navy-base",
    segment: "Government",
    title: "Panama City Navy Base",
    location: "NAVSEA Panama City, FL",
    image: {
      src: "/gallery/navsea-panama-city.jpg",
      alt: "Panama City Navy Base",
    },
  },
];

const segments: GallerySegment[] = [
  "All",
  "K-12",
  "Higher Ed",
  "Corporate",
  "Government",
];

function segmentToQueryValue(segment: GallerySegment) {
  if (segment === "All") return "";
  return segment.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
}

function queryValueToSegment(value: string | null): GallerySegment {
  if (!value) return "All";
  const normalized = value.toLowerCase();
  const found = segments.find((s) => segmentToQueryValue(s) === normalized);
  return found ?? "All";
}

export function GalleryClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const segmentFromUrl = useMemo(
    () => queryValueToSegment(searchParams.get("segment")),
    [searchParams],
  );

  const activeSegment = segmentFromUrl;
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const visibleInstallations = useMemo(() => {
    if (activeSegment === "All") return installations;
    return installations.filter((x) => x.segment === activeSegment);
  }, [activeSegment]);

  function updateSegment(next: GallerySegment) {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (next === "All") nextParams.delete("segment");
    else nextParams.set("segment", segmentToQueryValue(next));
    const qs = nextParams.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  async function copyCuratedLink() {
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const params = new URLSearchParams(searchParams.toString());
      if (activeSegment === "All") params.delete("segment");
      else params.set("segment", segmentToQueryValue(activeSegment));
      const url = `${origin}${pathname}${params.toString() ? `?${params.toString()}` : ""}`;

      await navigator.clipboard.writeText(url);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1500);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 2000);
    }
  }

  return (
    <div>
      <div className="border-b border-zinc-200 bg-white">
        <Container className="py-10 sm:py-16">
          <Reveal onMount className="max-w-3xl">
            <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
              GALLERY
            </div>
            <h1 className="mt-2 text-[34px] font-extrabold leading-[0.95] tracking-tight text-zinc-950 sm:text-[64px]">
              See VTI in the spaces that matter.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
              Filter installations by setting — classroom, boardroom, lecture
              hall, or government office — and share a curated link with your
              client in seconds.
            </p>
          </Reveal>
        </Container>
      </div>

      <Container className="py-6 sm:py-8 bg-white">
        <RevealGroup onMount className="flex flex-wrap gap-2">
          {segments.map((seg) => {
            const isActive = seg === activeSegment;
            return (
              <RevealItem key={seg}>
                <motion.button
                  type="button"
                  onClick={() => updateSegment(seg)}
                  whileHover={hoverLift}
                  whileTap={tapPress}
                  className={[
                    "inline-flex min-h-[40px] items-center rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
                    isActive
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50",
                  ].join(" ")}
                >
                  {seg}
                </motion.button>
              </RevealItem>
            );
          })}

          {/* <button
            type="button"
            onClick={copyCuratedLink}
            className="ml-auto hidden items-center rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 sm:inline-flex"
          >
            {copyState === "copied"
              ? "Link copied"
              : copyState === "error"
                ? "Copy failed"
                : "Copy link"}
          </button> */}
        </RevealGroup>
      </Container>

      <Container className="pb-14 sm:pb-16">
        <RevealGroup
          key={activeSegment}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleInstallations.map((item) => (
            <RevealItem key={item.id} as="article">
              <motion.div
                whileHover={hoverLift}
                className="group h-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5 transition-shadow hover:shadow-md hover:shadow-zinc-950/10"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                  {item.image ? (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_10%,rgba(239,68,68,0.20),transparent_55%),radial-gradient(700px_circle_at_80%_90%,rgba(24,24,27,0.18),transparent_55%)]"
                    />
                  )}
                </div>

                <div className="flex items-start justify-between gap-3 p-5">
                  <div>
                    <div className="text-base font-semibold tracking-tight text-zinc-950">
                      {item.title}
                    </div>
                    <div className="mt-1 text-sm text-zinc-600">
                      {item.location}
                    </div>
                  </div>
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                    {item.segment}
                  </span>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal as="section" className="mt-12 overflow-hidden rounded-3xl bg-zinc-950 p-6 text-white sm:mt-14 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-2xl font-bold text-white sm:text-3xl">
                Have an installation to share?
              </div>
              <div className="mt-2 text-base tracking-tight text-white/75 sm:text-lg">
                Resellers and end-customers — send us photos of your VTI
                deployment.
              </div>
              <p className="max-w-2xl text-base leading-6 text-white/75 sm:text-lg">
                Featured installations get co-marketing across our channels.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                href="/contact"
                size="sm"
                className="!bg-primary !text-white !hover:!bg-primary/70"
              >
                Submit a project →
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
