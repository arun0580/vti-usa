import type { GalleryInstallation, GalleryPageContent } from "./types";

export const defaultGalleryInstallations: GalleryInstallation[] = [
  {
    id: "its-all-about-the-students",
    segment: "K-12",
    title: "It's All About the Students",
    location: "We believe students belong at the boards more than teachers.",
    imageSrc: "/gallery/students-at-board.jpg",
    imageAlt: "It's All About the Students",
  },
  {
    id: "elementary-spanish-class",
    segment: "K-12",
    title: "Elementary Spanish Class",
    location: "Westbrook USD, TX",
    imageSrc: "/gallery/stem-lab-classroom.jpg",
    imageAlt: "Elementary Spanish Class",
  },
  {
    id: "dual-display-stem-lab",
    segment: "K-12",
    title: "Dual-Display STEM Lab",
    location: "Regional High School PD Day",
    imageSrc: "/gallery/dual-screen-stem.jpg",
    imageAlt: "Dual-Display STEM Lab",
  },
  {
    id: "zuni-learning-tree-pilot",
    segment: "K-12",
    title: "ZUNI Learning Tree Pilot",
    location: "Albuquerque, NM",
    imageSrc: "/gallery/zuni-booth.jpg",
    imageAlt: "ZUNI Learning Tree Pilot",
  },
  {
    id: "zuni-on-a-mobile-cart",
    segment: "K-12",
    title: "ZUNI on a Mobile Cart",
    location: "Community Learning Center, AR",
    imageSrc: "/gallery/zuni-rolling-cart.jpg",
    imageAlt: "ZUNI on a Mobile Cart",
  },
  {
    id: "boys-girls-club-family-night",
    segment: "K-12",
    title: "Boys & Girls Club Family Night",
    location: "Faulkner County, AR",
    imageSrc: "/gallery/boys-girls-club.jpg",
    imageAlt: "Boys & Girls Club Family Night",
  },
  {
    id: "campus-welcome-center-led-wall",
    segment: "Higher Ed",
    title: "Campus Welcome Center LED Wall",
    location: "Auburn, AL",
    imageSrc: "/gallery/auburn-led-wall.jpg",
    imageAlt: "Campus Welcome Center LED Wall",
  },
  {
    id: "gulf-coast-state-college-bayway",
    segment: "Higher Ed",
    title: "Gulf Coast State College Bayway",
    location: "Panama City, FL",
    imageSrc: "/gallery/gulf-coast-bayway.jpg",
    imageAlt: "Gulf Coast State College Bayway",
  },
  {
    id: "conway-symphony-orchestra",
    segment: "Higher Ed",
    title: "Conway Symphony Orchestra",
    location: "UCA - LED Poster, Conway, AR",
    imageSrc: "/gallery/conway-symphony.jpg",
    imageAlt: "Conway Symphony Orchestra",
  },
  {
    id: "uca-music-pcaps-lineup",
    segment: "Higher Ed",
    title: `11 × 86" P-Caps Lineup`,
    location: "UCA Music Department, Conway, AR",
    imageSrc: "/gallery/uca-music-pcaps.jpg",
    imageAlt: `11 × 86" P-Caps Lineup`,
  },
  {
    id: "edge-business-office",
    segment: "Corporate",
    title: "Edge Business Office",
    location: "Atlanta, GA",
    imageSrc: "/gallery/edge-business-office.jpg",
    imageAlt: "Edge Business Office",
  },
  {
    id: "vt-pro-hybrid-meeting-room",
    segment: "Corporate",
    title: "VT Pro Hybrid Meeting Room",
    location: "Atlas Logistics",
    imageSrc: "/gallery/vt-pro-led-wall.jpg",
    imageAlt: "VT Pro Hybrid Meeting Room",
  },
  {
    id: "immersive-reef-led-wall",
    segment: "Corporate",
    title: "Immersive Reef LED Wall",
    location: "Executive Lounge",
    imageSrc: "/gallery/led-underwater-wall.jpg",
    imageAlt: "Immersive Reef LED Wall",
  },
  {
    id: "portrait-dvled-showcase",
    segment: "Corporate",
    title: "Portrait DvLED Showcase",
    location: "Demo Experience Center",
    imageSrc: "/gallery/led-portrait-boats.jpg",
    imageAlt: "Portrait DvLED Showcase",
  },
  {
    id: "panama-city-navy-base",
    segment: "Government",
    title: "Panama City Navy Base",
    location: "NAVSEA Panama City, FL",
    imageSrc: "/gallery/navsea-panama-city.jpg",
    imageAlt: "Panama City Navy Base",
  },
];

export const defaultGalleryContent: GalleryPageContent = {
  hero: {
    kicker: "GALLERY",
    title: "See VTI in the spaces that matter.",
    description:
      "Filter installations by setting — classroom, boardroom, lecture hall, or government office — and share a curated link with your client in seconds.",
  },
  cta: {
    title: "Have an installation to share?",
    subtitle: "Resellers and end-customers — send us photos of your VTI deployment.",
    body: "Featured installations get co-marketing across our channels.",
    buttonLabel: "Submit a project →",
    buttonHref: "/contact",
  },
  installations: defaultGalleryInstallations.map((item) => ({ ...item })),
};

export function emptyGalleryInstallation(): GalleryInstallation {
  return {
    id: `installation-${Date.now()}`,
    segment: "K-12",
    title: "",
    location: "",
    imageSrc: "",
    imageAlt: "",
  };
}
