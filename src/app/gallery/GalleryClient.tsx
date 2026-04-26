"use client";

import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type GallerySegment =
  | "All"
  | "K-12"
  | "Higher Ed"
  | "Corporate"
  | "Government"
  | "LED & Signage";

type Installation = {
  id: string;
  segment: Exclude<GallerySegment, "All">;
  title: string;
  location: string;
  image?: { src: string; alt: string };
};

const installations: Installation[] = [
  {
    id: "elementary-stem-lab",
    segment: "K-12",
    title: "Elementary STEM Lab",
    location: "Westbrook USD, TX",
    image: { src: "/gallery/digital-signage-gym-C_i5SOLS.jpg", alt: "Elementary STEM Lab" },
  },
  {
    id: "zuni-learning-tree-pilot",
    segment: "K-12",
    title: "Zuni Learning Tree Pilot",
    location: "Albuquerque, NM",
    image: { src: "/gallery/zuni-learning-tree-hemgstmT.jpg", alt: "Zuni Learning Tree Pilot" },
  },
  {
    id: "faculty-lounge-display",
    segment: "K-12",
    title: "Faculty Lounge Display",
    location: "Cedar Heights HS, OH",
    image: { src: "/gallery/faculty.jpg", alt: "Faculty Lounge Display" },
  },
  {
    id: "auditorium-lecture-hall",
    segment: "Higher Ed",
    title: "Auditorium Lecture Hall",
    location: "State University",
    image: { src: "/gallery/higher-ed-lecture-hall-D17z15Sc.jpg", alt: "Auditorium lecture hall" },
  },
  {
    id: "collaboration-studio-105",
    segment: "Higher Ed",
    title: `105" Collaboration Studio`,
    location: "Engineering Dept.",
    image: { src: "/gallery/vt105-specs-CtRtYt8g.jpg", alt: `105" collaboration studio` },
  },
  {
    id: "executive-boardroom",
    segment: "Corporate",
    title: "Executive Boardroom",
    location: "Northstar Capital, NY",
    image: { src: "/gallery/corporate-boardroom-panel-2wOF230t.jpg", alt: "Executive boardroom" },
  },
  {
    id: "vt-pro-hybrid-meeting-room",
    segment: "Corporate",
    title: "VT Pro Hybrid Meeting Room",
    location: "Atlas Logistics",
    image: { src: "/gallery/vt-pro-boardroom-DDA_XYew.jpg", alt: "VT Pro hybrid meeting room" },
  },
  {
    id: "boardroom-219-spec-wall",
    segment: "Corporate",
    title: "Boardroom 21:9 Spec Wall",
    location: "Aspen Holdings",
    image: { src: "/gallery/vt105-mountain-B4KMOGJb.jpg", alt: "Boardroom spec wall" },
  },
  {
    id: "police-briefing-room",
    segment: "Government",
    title: "Police Briefing Room",
    location: "Municipal Police HQ",
    image: { src: "/gallery/government-corporate-room-DYtrAlvA.jpg", alt: "Police briefing room" },
  },
  {
    id: "modern-art-led-wall",
    segment: "LED & Signage",
    title: "Modern Art LED Wall",
    location: "Civic Art Gallery",
    image: { src: "/gallery/led-art-gallery-D-SqUNsK.jpg", alt: "Modern art LED wall" },
  },
  {
    id: "lobby-led-cabinet-wall",
    segment: "LED & Signage",
    title: "Lobby LED Cabinet Wall",
    location: "Convention Center",
    image: { src: "/gallery/led-cabinet-integration-Db-ZWsBf.jpg", alt: "Lobby LED cabinet wall" },
  },
  {
    id: "stadium-scoreboard",
    segment: "LED & Signage",
    title: "Stadium Scoreboard",
    location: "High School Athletics",
    image: { src: "/gallery/digital-signage-gym-C_i5SOLS.jpg", alt: "Stadium scoreboard" },
  },
];

const segments: GallerySegment[] = [
  "All",
  "K-12",
  "Higher Ed",
  "Corporate",
  "Government",
  "LED & Signage",
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

  const [activeSegment, setActiveSegment] = useState<GallerySegment>(segmentFromUrl);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    setActiveSegment(segmentFromUrl);
  }, [segmentFromUrl]);

  const visibleInstallations = useMemo(() => {
    if (activeSegment === "All") return installations;
    return installations.filter((x) => x.segment === activeSegment);
  }, [activeSegment]);

  const countsBySegment = useMemo(() => {
    const counts: Record<GallerySegment, number> = {
      All: installations.length,
      "K-12": 0,
      "Higher Ed": 0,
      Corporate: 0,
      Government: 0,
      "LED & Signage": 0,
    };
    for (const i of installations) counts[i.segment] += 1;
    return counts;
  }, []);

  function updateSegment(next: GallerySegment) {
    setActiveSegment(next);
    const nextParams = new URLSearchParams(searchParams.toString());
    if (next === "All") nextParams.delete("segment");
    else nextParams.set("segment", segmentToQueryValue(next));
    const qs = nextParams.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  async function copyCuratedLink() {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
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
      <div className="border-b border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-950/20">
        <Container className="py-14 sm:py-16">
          <div className="max-w-3xl">
            <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
              GALLERY
            </div>
            <h1 className="mt-2 text-[44px] font-extrabold leading-[0.95] tracking-tight text-zinc-950 sm:text-[64px] dark:text-zinc-50">
              See VTI in the spaces that matter.
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-300">
              Filter installations by setting — classroom, boardroom, lecture hall, or
              government office — and share a curated link with your client in seconds.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="flex flex-wrap gap-2">
          {segments.map((seg) => {
            const isActive = seg === activeSegment;
            return (
              <button
                key={seg}
                type="button"
                onClick={() => updateSegment(seg)}
                className={[
                  "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-semibold transition",
                  isActive
                    ? "border-red-600 bg-red-600 text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40",
                ].join(" ")}
              >
                {seg}
              </button>
            );
          })}

          <button
            type="button"
            onClick={copyCuratedLink}
            className="ml-auto hidden items-center rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40 sm:inline-flex"
          >
            {copyState === "copied"
              ? "Link copied"
              : copyState === "error"
                ? "Copy failed"
                : "Copy link"}
          </button>
        </div>
      </Container>

      <Container className="pb-14 sm:pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleInstallations.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-950/10 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900/40">
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
                <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-extrabold tracking-[0.22em] text-zinc-900 shadow-sm dark:bg-zinc-950/85 dark:text-zinc-50">
                  {item.segment.toUpperCase()}
                </div>
              </div>

              <div className="p-5">
                <div className="text-base font-semibold tracking-tight">{item.title}</div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.location}
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-14 overflow-hidden rounded-3xl bg-zinc-950 p-8 text-white sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-[12px] font-semibold tracking-[0.22em] text-white/70">
                HAVE AN INSTALLATION TO SHARE?
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">
                Resellers and end-customers — send us photos of your VTI deployment.
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                Featured installations get co-marketing across our channels.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                href="/contact"
                size="sm"
                className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
              >
                Submit a project →
              </ButtonLink>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

