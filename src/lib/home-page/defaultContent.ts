import type {
  HomePageContent,
  HomeSolutionCard,
  HomeTestimonial,
} from "./types";

export const defaultHomeContent: HomePageContent = {
  hero: {
    kicker: "DISPLAY TECHNOLOGY",
    headlineLines: [
      { text: "INFORM.", accent: false },
      { text: "ENGAGE.", accent: true },
      { text: "ELEVATE.", accent: false },
    ],
    description:
      "Interactive panels, DvLED displays, and digital signage solutions for education, business, government, and public spaces — delivered through a nationwide partner network.",
    primaryCta: { label: "Explore Products", href: "/products" },
    secondaryCta: { label: "Request a Quote", href: "/contact" },
    imageSrc: "/vt-panel-hero.png",
    imageAlt: "VTI interactive display lineup",
    stats: [
      { kind: "text", top: "Nationwide", bottom: "Coverage" },
      { kind: "count", count: 10000, bottom: "DISPLAYS INSTALLED" },
      { kind: "text", top: "Industry", bottom: "STANDARD WARRANTY" },
    ],
  },
  trustedBand: {
    kicker: "TRUSTED ACROSS EDUCATION, ENTERPRISE, AND GOVERNMENT",
    items: [
      "K-12 Districts",
      "State Universities",
      "Community Colleges",
      "Fortune 500",
      "Federal Agencies",
      "Municipal Govt",
      "Retail & Hospitality",
      "Sports Venues",
    ],
  },
  solutions: {
    kicker: "SOLUTIONS",
    title: "One product family. Every kind of room.",
    description:
      "Whether you're outfitting a kindergarten classroom, a federal conference room, or a stadium-sized LED wall, VTI displays scale to meet the demand — without compromise.",
    cards: [
      {
        title: "K-12 Classroom",
        desc: "Durable touch panels designed for classrooms — from kindergarten to senior year.",
        imageSrc: "/solutions/students.jpg",
        icon: "school",
      },
      {
        title: "Higher Ed Lecture Hall",
        desc: "Ultra-wide displays and LED walls for lecture halls, labs, and student commons.",
        imageSrc: "/solutions/higher-ed-lecture-hall.jpg",
        icon: "graduation",
      },
      {
        title: "Corporate Boardroom",
        desc: "Boardroom-grade displays for hybrid meetings, presentations, and collaboration.",
        imageSrc: "/solutions/corporate-boardroom-panel.jpg",
        icon: "building",
      },
      {
        title: "Government Facility",
        desc: "Secure, reliable display systems for federal, state, and municipal facilities.",
        imageSrc: "/solutions/government-corporate-room.jpg",
        icon: "landmark",
      },
      {
        title: "Galleries & Conference Centers",
        desc: "Seamless LED video walls that turn lobbies, galleries, and event spaces into showpieces.",
        imageSrc: "/solutions/led-art-gallery.jpg",
        icon: "image",
      },
      {
        title: "Digital Signage",
        desc: "High-bright displays and scoreboards for gyms, atriums, and high-traffic public spaces.",
        imageSrc: "/solutions/digital-signage-gym.jpg",
        icon: "monitor",
      },
    ],
  },
  fiveSPromise: {
    kicker: "THE 5S PROMISE",
    title: "Five reasons resellers and buyers choose VTI.",
    description:
      "From flagship interactive panels to mobile carts, podiums, conferencing cameras, and accessories — VTI delivers a complete 5S Services & Stands ecosystem for every room.",
    images: [
      {
        imageSrc: "/5s-services-circle.png",
        alt: "5S Services Circle",
        variant: "circle",
      },
      {
        imageSrc: "/5s-services-square.png",
        alt: "5S Services Square",
        variant: "rounded",
      },
    ],
    pillars: [
      { key: "Selection", value: "A full lineup tailored to every room and budget." },
      { key: "Specification", value: "Honest, detailed specs — no fluff." },
      { key: "Support", value: "Direct access to engineers and account leads." },
      {
        key: "Service",
        value: "Manufacturer's standard warranty.",
        href: "/pdf/Warranty-Statement-Virtual-Panels.pdf",
      },
      { key: "Satisfaction", value: "Backed by educators and resellers nationwide." },
    ],
  },
  whyVti: {
    kicker: "WHY VTI",
    titleLine1: "Big-brand specs.",
    titleLine2: "Boutique service.",
    description:
      "Resellers and buyers choose VTI over other brands because we give every partner direct access to the people who actually built the product — no call centers, no chatbots, no runaround.",
    ctaLabel: "About our company",
    ctaHref: "/about",
    cards: [
      {
        title: "Engineered for daily use",
        desc: "Hardened glass, anti-glare coating, and components rated for 100,000 hours.",
        icon: "wrench",
      },
      {
        title: "Personalized human support",
        desc: "Get a dedicated rep who knows your account — not chatbots or call centers.",
        icon: "headphones",
      },
      {
        title: "Stocked & ready to ship",
        desc: "US warehouses keep our top SKUs on the shelf for fast reseller fulfillment.",
        icon: "truck",
      },
      {
        title: "Manufacturer's warranty",
        desc: "Manufacturer's warranty coverage included on every interactive flat panel — no upsell required.",
        icon: "shield",
      },
    ],
  },
  testimonials: {
    kicker: "REAL VOICES",
    title: "Spec sheets tell. Installations sell.",
    titleAccent: "See the results.",
    description:
      "Hear from IT directors, AV specialists, and reseller partners who put VTI displays into rooms across the country.",
    galleryLinkLabel: "View full gallery",
    galleryLinkHref: "/gallery",
    items: [
      {
        quote:
          "It's the fastest panel we've used with our kids — they tap, it responds, and the lessons just flow. No lag, no frustration, no excuses to stop learning.",
        name: "Amira",
        role: "Program Director",
        tag: "Youth Program",
        imageSrc: "/testimonials/amira-thumb.jpg",
        org: "Boys & Girls Club of Faulkner County",
      },
      {
        quote:
          "We outfitted our science labs with multiple VTI panels per room so every student has a clear sightline — no more crowding around one screen. The install was clean, the picture is sharp, and our faculty picked it up on day one.",
        name: "AV & Instructional Technology Team",
        role: "Science & Technology Division",
        tag: "Higher Ed Lecture Hall",
        imageSrc: "/testimonials/gulf-coast-state-college.jpg",
        org: "Gulf Coast State College",
      },
      {
        quote:
          "Our LED poster in the student center grabs attention the moment people walk in. We push transit info, campus events, and program promos in minutes — no printing, no reprinting, just a sharp, always-current message.",
        name: "Student Engagement & Communications",
        role: "Campus Marketing",
        tag: "DvLED Poster Signage",
        imageSrc: "/testimonials/gulf-coast-led-poster.jpg",
        org: "Gulf Coast State College",
      },
      {
        quote:
          "Our instructors are pumped to bring these panels into the training center — side-by-side annotation, live mission rehearsal, and replay all on one screen. It's going to take our flight training to the next level.",
        name: "Training Cadre",
        role: "Airman Leadership School",
        tag: "Government / Military",
        imageSrc: "/testimonials/jacksonville-afb-training.jpg",
        org: "Jacksonville AFB Training Center",
      },
    ],
  },
  bottomCta: {
    title: "Ready to spec your space?",
    description:
      "Whether you're a reseller pitching a district or a buyer outfitting a single room — the VTI team is ready to help.",
    mascotSrc: "/mascot-puppy.png",
    mascotAlt: "VTI mascot puppy",
    primaryCta: { label: "Request a Quote", href: "/contact" },
    secondaryCta: { label: "Become a Reseller", href: "/resellers" },
  },
};

export function emptySolutionCard(): HomeSolutionCard {
  return {
    title: "",
    desc: "",
    imageSrc: "",
    icon: "school",
  };
}

export function emptyTestimonial(): HomeTestimonial {
  return {
    quote: "",
    name: "",
    role: "",
    tag: "",
    imageSrc: "",
    org: "",
  };
}
