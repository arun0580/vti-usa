export const quickActions = [
  {
    title: "Generate a quote",
    description:
      "Build a customer-ready quote with reseller pricing in under 2 minutes.",
    href: "#",
    cta: "Start a quote",
    icon: "quote",
  },
  {
    title: "Register a deal",
    description: "Lock in territory protection on an active opportunity.",
    href: "#",
    cta: "Register now",
    icon: "deal",
  },
  {
    title: "My quotes",
    description: "Review, re-download, or resend any quote you've built.",
    href: "#",
    cta: "View quotes",
    icon: "file-text",
  },
  {
    title: "Registered deals",
    description: "See protected opportunities across the reseller network.",
    href: "#",
    cta: "View deals",
    icon: "trending-up",
  },
  {
    title: "Marketing kit",
    description: "Logos, hero imagery, social templates, and proposal decks.",
    href: "#",
    cta: "Browse kit",
    icon: "megaphone",
  },
  {
    title: "Contact your rep",
    description: "Direct line to your dedicated VTI account team.",
    href: "mailto:partners@vtiusa.com",
    cta: "Get in touch",
    icon: "phone",
  },
] as const;

export const specSheets = [
  { label: "VT-Pro Series", href: "/pdf/specs/vt-pro.pdf" },
  { label: "VT105 Touch Panel", href: "/pdf/specs/vt105.pdf"},
  { label: "VT-IR Series", href: "/pdf/specs/vt13-ir.pdf"},
  { label: "Scooter 32" , href: "/pdf/specs/scooter-32.pdf"},
] as const;

export const onescreenAssets = [
  { label: "OneScreen Hubble", href: "/pdf/specs/os-hubble.pdf" },
  { label: "OneScreen Touch", href: "/pdf/specs/os-touch.pdf" },
  { label: "InFocus JTouch", href: "/pdf/specs/if-jtouch.pdf" },
  { label: "InFocus Mondopad", href: "/pdf/specs/if-mondopad.pdf" },
] as const;

export const ledSignageAssets = [
  { label: "LED Wall Systems", href: "/pdf/specs/led-wall.pdf" },
  { label: "DvLED Poster", href: "/pdf/specs/led-poster.pdf" },
  { label: "LED Scoreboard", href: "/pdf/specs/led-scoreboard.pdf" },
  { label: "Menuboard Signage", href: "/pdf/specs/sig-menuboard.pdf" },
  { label: "Wayfinding Signage", href: "/pdf/specs/sig-wayfinding.pdf" },
  { label: "Window Display", href: "/pdf/specs/sig-window.pdf" },
] as const;

export const assetActions = [
  {
    title: "Current price list",
    description:
      "Reseller pricing across all SKUs — updated monthly.",
    href: "#",
    cta: "Download PDF",
    icon: "trending-up",
  },
  {
    title: "Marketing kit",
    description:
      "Logos, hero imagery, social templates, and proposal decks.",
    href: "#",
    cta: "Browse assets",
    icon: "megaphone",
  },
  {
    title: "Co-branded brochures",
    description:
      "Customizable PDFs with your logo and contact info.",
    href: "#",
    cta: "Open templates",
    icon: "file-text",
  },
] as const;

export const trainingCourses = [
  {
    title: "VTI Sales Foundations",
    meta: "SELF-PACED · ~45 MIN",
    description:
      "Product positioning, competitive landscape, and objection handling for interactive panels.",
    href: "#",
  },
  {
    title: "LED & Signage Solutions",
    meta: "LIVE VIRTUAL · 1 HR",
    description:
      "Sizing, pitch, and installation considerations for DVLED product lines.",
    href: "#",
  },
  {
    title: "OneScreen Software Suite",
    meta: "SELF-PACED · ~30 MIN",
    description:
      "Walkthrough of collaboration tools, device management, and demo environments.",
    href: "#",
  },
] as const;

export const announcements = [
  {
    date: "APR 18, 2026",
    title: "Spring price list now live",
    description:
      "Updated reseller pricing for VT Pro Series and new LED poster SKUs.",
  },
  {
    date: "APR 8, 2024",
    title: "New VT-IR Series 86″ in stock",
    description:
      "Flagship infrared panel available for immediate shipment from Atlanta.",
  },
  {
    date: "MAR 28, 2024",
    title: "Partner webinar — May 20",
    description:
      "Turn LED video walls into your next revenue driver. Register in Events.",
    href: "/events",
  },
] as const;

export const accountTeam = {
  phone: "1-800-555-VTI",
  phoneHref: "tel:+18005558884",
  email: "partners@vtiusa.com",
};
