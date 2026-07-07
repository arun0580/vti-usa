import type {
  AboutPageContent,
  AboutTeamMember,
  AboutValueCard,
} from "./types";

export const defaultAboutTeamMembers: AboutTeamMember[] = [
  {
    id: "kevin-toni",
    name: "Kevin & Toni Talentino",
    role: "CEO & CFO · Owners",
    location: "GA",
    imageSrc: "/about/Kevin-Toni-Headshot.jpg",
    imageAlt: "Kevin and Toni Talentino, CEO & CFO, Owners",
  },
  {
    id: "tyler-king",
    name: "Tyler King",
    role: "Sales & Operations",
    location: "GA",
    imageSrc: "/about/tyler-king.png",
    imageAlt: "Tyler King, Sales & Operations",
  },
  {
    id: "aaron-montoya",
    name: "Aaron Montoya",
    role: "Sales Rep",
    location: "NM",
    imageSrc: "/about/aaron-montoya-BtVkiaC4.jpg",
    imageAlt: "Aaron Montoya, Sales Rep",
  },
  {
    id: "james-baxley",
    name: "James Baxley",
    role: "Sales Rep",
    location: "FL",
    imageSrc: "/about/james-baxley-BA0-aBVd.jpg",
    imageAlt: "James Baxley, Sales Rep",
  },
  {
    id: "eddie-longoria",
    name: "Eddie Longoria",
    role: "Sales Rep",
    location: "TX",
    imageSrc: "/about/eddie-longoria-ByEfT8V_.jpg",
    imageAlt: "Eddie Longoria, Sales Rep",
  },
  {
    id: "tina-mccord",
    name: "Tina McCord",
    role: "Sales Rep · K-12 Educator / Trainer",
    location: "AR",
    imageSrc: "/about/tina-mccord-CkeHAHlB.jpg",
    imageAlt: "Tina McCord, Sales Rep · K-12 Educator / Trainer",
  },
  {
    id: "zarrar-khan",
    name: "Zarrar Khan",
    role: "OneScreen Liaison",
    location: "MD",
    imageSrc: "/about/zarrar-khan-DuLJC3xb.jpg",
    imageAlt: "Zarrar Khan, OneScreen Liaison",
  },
  {
    id: "david-weems",
    name: "Dr. David Weems Sr.",
    role: "Sales Rep · K-12 Educator",
    location: "TX",
    imageSrc: "/about/david-weems.jpg",
    imageAlt: "Dr. David Weems Sr., Sales Rep · K-12 Educator",
  },
];

export const defaultAboutValueCards: AboutValueCard[] = [
  {
    id: "classroom",
    icon: "heart",
    title: "Built for the classroom. Scaled for the real world.",
    desc: "Every product decision starts with the classroom—then scales to boardrooms, control rooms, and public spaces where clarity and reliability matter just as much.",
  },
  {
    id: "resellers",
    icon: "handshake",
    title: "Resellers as partners",
    desc: "We win when our partners win. Honest collaboration, deal protection, and shared success are non-negotiable.",
  },
  {
    id: "quality",
    icon: "award",
    title: "Quality without compromise",
    desc: "Hardened glass, anti-glare coatings, components rated for 100,000 hours, and manufacturer's warranty coverage.",
  },
  {
    id: "innovation",
    icon: "lightbulb",
    title: "Practical innovation",
    desc: "We ship features that solve real classroom, boardroom, and mission-critical environment problems — not specs designed for marketing slides.",
  },
  {
    id: "support",
    icon: "support",
    title: "Personalized human support",
    desc: "Get a dedicated rep who knows your account — not chatbots, ticket queues, or overseas call centers.",
  },
  {
    id: "long-haul",
    icon: "globe",
    title: "Built for the long haul",
    desc: "Displays are infrastructure. We build for schools, government facilities, and commercial environments that need to perform reliably for a decade or more.",
  },
];

export const defaultAboutContent: AboutPageContent = {
  hero: {
    kicker: "ABOUT VTI",
    titleLine1: "Built by pioneers.",
    titleLine2: "Trusted nationwide.",
    description:
      "From the earliest days of interactive technology to today's classrooms, boardrooms, and government spaces—VTI delivers displays people rely on every day, powered by a coast-to-coast reseller network.",
  },
  tabsPrompt: "Explore VTI — pick a section",
  story: {
    kicker: "OUR STORY",
    title: "From the early days of interactive — to current days' technology.",
    paragraphs: [
      "We entered the industry at the very beginning. Among manufacturers in China, we are known simply as the company that sells. We were the first to bring Promethean interactive whiteboards to North America—back when classrooms still relied on chalk, overhead projectors, and whiteboards. There is not a major whiteboard we have not sold or handled.",
      "Over the decades, we have built several AV technology companies, designed short cuts to help speed the installation process and helped bring the technology that defined modern collaboration into classrooms and boardrooms around the world.",
      "In 2013, we founded Virtual Technologies, Inc. Drawing on decades of experience, we built a company focused on delivering best-in-class interactive displays, LED walls, and digital signage—designed for the people who use them every day.",
      "Today, VTI displays have been installed in K–12 districts, universities, Fortune 500 boardrooms, and federal facilities across all 50 states—supported by a nationwide reseller network.",
    ],
    mascot: {
      imageSrc: "/about/bandit-mascot.jpg",
      imageAlt: "Bandit, the VTI mascot",
      name: "Bandit",
      role: "VTI Mascot",
      subtitle: "Chief Morale Officer",
    },
  },
  team: {
    kicker: "OUR TEAM",
    title: "Family-owned. Veteran-owned. Woman-owned.",
    description:
      "In business since 2013 with over 100 years of combined industry experience — meet the people behind every VTI quote, install, and support call.",
    members: defaultAboutTeamMembers,
  },
  values: {
    kicker: "OUR VALUES",
    title: "Values behind every display we build.",
    cards: defaultAboutValueCards,
  },
  join: {
    kicker: "BECOME A PARTNER",
    title: "Tell us about you and your business.",
    description:
      "VTI sells exclusively through certified resellers and integrators. Share a few details and the right person on our team will reach out — usually within one business day.",
    bullets: [
      "Local support, backed by direct factory access",
      "Deal registration and territory protection",
      "Technical training and certification",
    ],
  },
  bottomCta: {
    title: "Ready to see VTI for yourself?",
    description:
      "Connect with our team for a guided product walkthrough or a referral to your nearest certified VTI reseller.",
    primaryCta: { label: "Talk to VTI", href: "/contact" },
    secondaryCta: { label: "View product lineup", href: "/products" },
    backgroundImageSrc: "/about/corporate-boardroom-panel-2wOF230t.png",
    mascotImageSrc: "/mascot-puppy.png",
    mascotImageAlt: "VTI mascot puppy",
  },
};

export function emptyAboutTeamMember(): AboutTeamMember {
  return {
    id: crypto.randomUUID(),
    name: "",
    role: "",
    location: "",
    imageSrc: "",
    imageAlt: "",
  };
}

export function emptyAboutValueCard(): AboutValueCard {
  return {
    id: crypto.randomUUID(),
    title: "",
    desc: "",
    icon: "heart",
  };
}
