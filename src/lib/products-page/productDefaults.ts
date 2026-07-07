import type {
  AccessoryItem,
  CatalogItem,
  InteractivePanel,
  ManagementApp,
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
