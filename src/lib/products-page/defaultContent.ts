import { interactivePanels } from "@/app/products/_data/interactivePanels";
import {
  accessoriesLineup,
  ledLineup,
  signageLineup,
} from "@/app/products/_data/lineups";
import { compareRows, dimensionRows } from "@/app/products/_data/tables";
import type { ProductsPageContent } from "./types";

export const defaultProductsContent: ProductsPageContent = {
  hero: {
    kicker: "Products",
    title: "The full Virtual lineup.",
    description:
      "Interactive panels, LED posters & video walls, digital signage, accessories, and our Get Curious Together OER software for K-12 classrooms.",
    panelFinderCta: "Not sure which panel? Take the 30-second finder",
  },
  categories: [
    { id: "interactive", label: "Interactive Panels" },
    { id: "led", label: "DVLED Posters & Video Walls" },
    { id: "signage", label: "Digital Signage" },
    { id: "accessories", label: "Accessories" },
    { id: "software", label: "Educational & Management Software" },
  ],
  virtualInteractive: {
    kicker: "Virtual — house brand",
    title: "Built for everyday classrooms, boardrooms, and homes.",
    description:
      "Our own line of interactive flat panels. Rated for 100,000 hours with full replacement warranty coverage, OPS-ready, and supported by your assigned Virtual rep — not a stranger.",
    panels: interactivePanels.map((p) => ({
      name: p.name,
      badge: p.badge,
      imageSrc: p.imageSrc,
      sizes: p.sizes,
      desc: p.desc,
      highlights: [...p.highlights],
      actions: p.actions.map((a) => ({ ...a })),
    })),
    capabilitiesHeading: {
      kicker: "Standard on every Virtual panel",
      title: "Four things you'll feel the second you walk up to it.",
    },
    capabilities: [
      {
        icon: "hand",
        kicker: "01",
        title: "Palm-to-screen touch",
        desc: "Wipe with your palm to erase. Write with a finger. Switch to a pen for precision — no mode switching.",
      },
      {
        icon: "pen",
        kicker: "02",
        title: "Built-in whiteboard",
        desc: "Infinite canvas, multi-page, save-and-share. Works with any input device — no install.",
      },
      {
        icon: "wifi",
        kicker: "03",
        title: "Wireless casting",
        desc: "Cast from Mac, Windows, iOS, Android, or Chromebook — no dongles or driver downloads.",
      },
      {
        icon: "users",
        kicker: "04",
        title: "Multi-touch collaboration",
        desc: "Up to 40 simultaneous touch points (model dependent). A whole class at the board at once.",
      },
    ],
    featuredVt13: {
      badge: "Featured · Virtual",
      title: "VT-IR Series",
      sizes: 'Interactive flat panel · 65" · 75" · 86" · 98"',
      description:
        "The display of choice for thousands of K-12 classrooms across the country. Built for daily use, fully warrantied to industry standards, and supported by a team you can actually reach.",
      imageSrc: "/vt-panel-hero.png",
      features: [
        { label: "4K UHD anti-glare" },
        { label: "40-point IR multi-touch" },
        { label: "Built-in Android + OPS slot" },
        { label: "Wireless screen casting" },
        { label: "Front-firing speakers" },
        {
          label: "Manufacturer's warranty",
          href: "/pdf/Warranty-Statement-Virtual-Panels.pdf",
        },
      ],
      primaryCta: "Request a quote",
      primaryHref: "/contact",
      secondaryCta: "See it installed",
      secondaryHref: "/gallery",
    },
  },
  inFocus: {
    kicker: "InFocus — newest partner",
    title: "A trusted name in display technology, now in our lineup.",
    description:
      "Three interactive panels — the original JTouch, the latest JTouch 13 E, and the pro-grade JTouch Pro-01.",
    description2:
      "Same single-source experience: Virtual handles spec, quote, install, and support.",
    footerNote: "Not sure which JTouch fits your room? Talk to your Virtual rep →",
    lineup: [
      {
        name: "InFocus JTouch",
        badge: "Interactive panel",
        sizes: `65" · 75" · 86"`,
        desc: "Versatile interactive panel with 4K display, intuitive whiteboard software, and quick-access Cast, White Board, File Manager, and Applications.",
        imageSrc: "/products/infocus-jtouch-CvBKjMP8.png",
        ctaLabel: "Download Spec Sheet",
        ctaHref: "/pdf/vti-spec-packet.pdf",
      },
      {
        name: "InFocus JTouch 13 E",
        badge: "Latest release",
        sizes: `65" · 75" · 86"`,
        desc: "Next-gen JTouch with refreshed Android UI, integrated Google apps, and Play Store access — plus the same Cast, White Board, and File Manager workflow teachers already know.",
        imageSrc: "/products/infocus-jtouch-13e-DvR8j-aL.png",
        ctaLabel: "Download Spec Sheet",
        ctaHref: "/pdf/vti-spec-packet.pdf",
      },
      {
        name: "InFocus JTouch Pro-01",
        badge: "Pro series",
        sizes: `65" · 75" · 86"`,
        desc: "Pro-series interactive panel built for high-use rooms — 4K UHD, capacitive touch, and a 50,000-hour-plus lifetime rating for daily classroom and conference duty.",
        imageSrc: "/products/infocus-jtouch-pro-01-CMN2qRY6.png",
        ctaLabel: "Download Spec Sheet",
        ctaHref: "/pdf/vti-spec-packet.pdf",
      },
    ],
  },
  led: {
    kicker: "Virtual line — exclusive",
    title: "DvLED posters & video walls — from a single panel to an entire wall.",
    description:
      "Direct-view LED for the spaces traditional LCDs can't reach — bright lobbies, gymnasiums, outdoor-adjacent windows, and walls that need to be measured in feet, not inches.",
    lineup: ledLineup.map((p) => ({
      name: p.name,
      badge: p.badge,
      sizes: p.sizes,
      desc: p.desc,
      imageSrc: p.imageSrc,
      videoSrc: p.videoSrc,
      ctaLabel: "Download Spec Sheet",
      ctaHref: "/contact",
    })),
    customerStory: {
      title: "Customer story · University of Central Arkansas",
      body: 'UCA runs 6 Virtual DvLED posters across campus alongside 11 VT Pro p-cap panels. The poster photos throughout our gallery? All from this install.',
      linkText: "See the UCA install",
      linkHref: "/gallery",
    },
  },
  signage: {
    kicker: "VIRTUAL LINE",
    title: "Digital signage that talks to your customers.",
    description:
      "Menu boards, wayfinding, lobby welcome screens, and storefront displays. Commercial-grade LCDs built for 24/7 duty cycles and managed from one simple cloud dashboard.",
    lineup: signageLineup.map((p) => ({
      name: p.name,
      badge: p.badge,
      sizes: p.sizes,
      desc: p.desc,
      imageSrc: p.imageSrc,
      ctaLabel: "Download Spec Sheet",
      ctaHref: "/contact",
    })),
    footerNote:
      "Need help picking between an LED video wall and an LCD signage display? Talk to your Virtual rep — we'll match the technology to the room — viewing distance, ambient light, and budget.",
  },
  accessories: {
    title: "Everything that goes around the panel.",
    description:
      "Stands, cameras, keyboards, OPS computers, and the cables in between. Order it all from the same rep who sold you the display — no hunting across vendors.",
    items: accessoriesLineup.map((item) => ({
      name: item.name,
      desc: item.desc,
      icon: item.icon,
    })),
    kitTitle: "Need a full kit?",
    kitDescription: "Tell us the room — we'll spec the panel, OPS, mount, and camera.",
    kitCtaLabel: "Request a kit quote",
    kitCtaHref: "/contact",
  },
  software: {
    title: "The software is included. The learning content is, too.",
    description:
      "Every Virtual panel ships with built-in collaboration tools, palm-rejection touch tech, and — for K-12 — our Get Curious Together OER content platform.",
    oerKicker: "Educational software",
    oerTitle: "ZUNI Learning Tree — now Get Curious Together",
    oerBadge: "INCLUDED WITH K-12 PANELS",
    oerHeadline:
      "Thousands of curated, vetted, free OER resources — sorted by grade level.",
    oerSubhead:
      "Open Educational Resources hand-picked for the way teachers actually use an interactive panel — ready to project, annotate, and remix in front of the class. Browse by grade and subject in seconds.",
    oerTags: [
      "Literacy",
      "Math",
      "Science",
      "STEM",
      "Be Inspired",
      "Coding",
      "News for Kids",
      "And more",
    ],
    oerExplainerTitle: "WHAT IS OER?",
    oerExplainerBody:
      "OER = Open Educational Resources. Free, openly licensed teaching materials — lessons, videos, assessments — that teachers can legally use, adapt, and share. No per-seat licensing. No \"trial expired\" surprises. The content is yours to keep.",
    oerPrimaryCta: "Request a demo",
    oerPrimaryHref: "/contact",
    oerSecondaryCta: "See it in classrooms",
    oerSecondaryHref: "/gallery",
    oerImageSrc: "/products/zuni-rolling.jpg",
    managementKicker: "Management software",
    managementTitle: "Run every screen on campus from one chair.",
    managementDescription:
      "Push content, monitor health, schedule signage, cast wirelessly — across interactive panels, LED walls, and signage displays. Pick the platform that matches the job.",
    managementApps: [
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
    ],
  },
  compare: {
    kicker: "COMPARE · VIRTUAL LINE",
    title: "Find the right panel for the room.",
    lead: "Side-by-side specs across our three core Virtual interactive flat panel families.",
    columns: ["Specification", "VT-IR", "VT Pro", '105" Ultra-Wide'],
    rows: compareRows.map((r) => ({
      label: r.label,
      a: r.a,
      b: r.b,
      c: r.c,
    })),
  },
  dimensions: {
    kicker: "PHYSICAL DIMENSIONS",
    title: 'How tall and wide is a 65" panel? (Now you can stop guessing.)',
    description:
      "The dimensions every installer, AV designer, and facilities manager actually needs — but nobody publishes clearly. All measurements in inches.",
    disclaimer:
      "Dimensions shown are approximate and rounded to the nearest 0.1 inch. Always confirm exact measurements against the model-specific spec sheet before cutting millwork or ordering wall mounts.",
    rows: dimensionRows.map((r) => ({
      size: r.size,
      active: r.active,
      outer: r.outer,
      weight: r.weight,
      vesa: r.vesa,
    })),
  },
};
