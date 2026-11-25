import type {
  AccessoryItem,
  CatalogItem,
  InteractivePanel,
  ManagementApp,
  OneScreenApp,
  OneScreenGuruCard,
  OneScreenProduct,
} from "./types";

export const emptyInteractivePanel = (): InteractivePanel => ({
  name: "",
  badge: "",
  imageSrc: "",
  sizes: "",
  desc: "",
  highlights: [],
  actions: [{ label: "", href: "" }],
});

export const emptyCatalogItem = (): CatalogItem => ({
  name: "",
  badge: "",
  sizes: "",
  desc: "",
  imageSrc: "",
  ctaLabel: "",
  ctaHref: "",
});

export const emptyAccessoryItem = (): AccessoryItem => ({
  name: "",
  desc: "",
  icon: "cpu",
});

export const emptyManagementApp = (): ManagementApp => ({
  name: "",
  tag: "",
  desc: "",
  bullets: [],
});

export const emptyOneScreenProduct = (): OneScreenProduct => ({
  badge: "NEW",
  imageSrc: "",
  imageAlt: "",
  overlayTitle: "New OneScreen product",
  overlaySubtitle: "Add a short tagline",
  kicker: "ONESCREEN",
  title: "Product title",
  body1: "Describe the product here.",
  body2: "",
  highlights: ["Key feature"],
  links: [{ label: "Download Spec Sheet", href: "" }],
});

export const emptyOneScreenApp = (): OneScreenApp => ({
  name: "New app",
  desc: "Describe what this app does.",
  icon: "graduation",
});

export const emptyOneScreenGuruCard = (): OneScreenGuruCard => ({
  badge: "INCLUDED",
  imageSrc: "",
  imageAlt: "",
  kicker: "SUPPORT",
  title: "New support card",
  subtitle: "",
  body: "Describe the support offering here.",
  highlights: ["Key benefit"],
  footerNote: "",
});
