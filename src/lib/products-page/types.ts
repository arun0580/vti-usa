export type ProductAction = {
  label: string;
  href: string;
};

export type InteractivePanel = {
  name: string;
  badge: string;
  imageSrc: string;
  sizes: string;
  desc: string;
  highlights: string[];
  actions: ProductAction[];
};

export type CatalogItem = {
  name: string;
  badge: string;
  sizes: string;
  desc: string;
  imageSrc: string;
  videoSrc?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type CapabilityItem = {
  icon: string;
  kicker: string;
  title: string;
  desc: string;
};

export type AccessoryItem = {
  name: string;
  desc: string;
  icon: string;
};

export type CompareRow = {
  label: string;
  a: string;
  b: string;
  c: string;
};

export type DimensionRow = {
  size: string;
  active: string;
  outer: string;
  weight: string;
  vesa: string;
};

export type ManagementApp = {
  name: string;
  tag: string;
  desc: string;
  bullets: string[];
};

export type FeaturedVt13Content = {
  badge: string;
  title: string;
  sizes: string;
  description: string;
  imageSrc: string;
  features: { label: string; href?: string }[];
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
};

export type BrandLineupSection = {
  kicker: string;
  title: string;
  description: string;
  description2?: string;
  footerNote?: string;
  lineup: CatalogItem[];
};

export type ProductCategoryId =
  | "interactive"
  | "led"
  | "signage"
  | "accessories"
  | "software";

export type ProductsPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    panelFinderCta: string;
  };
  categories: {
    id: ProductCategoryId;
    label: string;
  }[];
  virtualInteractive: {
    kicker: string;
    title: string;
    description: string;
    panels: InteractivePanel[];
    capabilitiesHeading: {
      kicker: string;
      title: string;
    };
    capabilities: CapabilityItem[];
    featuredVt13: FeaturedVt13Content;
  };
  inFocus: BrandLineupSection;
  led: {
    kicker: string;
    title: string;
    description: string;
    lineup: CatalogItem[];
    customerStory: {
      title: string;
      body: string;
      linkText: string;
      linkHref: string;
    };
  };
  signage: {
    kicker: string;
    title: string;
    description: string;
    lineup: CatalogItem[];
    footerNote: string;
  };
  accessories: {
    title: string;
    description: string;
    items: AccessoryItem[];
    kitTitle: string;
    kitDescription: string;
    kitCtaLabel: string;
    kitCtaHref: string;
  };
  software: {
    title: string;
    description: string;
    oerKicker: string;
    oerTitle: string;
    oerBadge: string;
    oerHeadline: string;
    oerSubhead: string;
    oerTags: string[];
    oerExplainerTitle: string;
    oerExplainerBody: string;
    oerPrimaryCta: string;
    oerPrimaryHref: string;
    oerSecondaryCta: string;
    oerSecondaryHref: string;
    oerImageSrc: string;
    managementKicker: string;
    managementTitle: string;
    managementDescription: string;
    managementApps: ManagementApp[];
  };
  compare: {
    kicker: string;
    title: string;
    lead: string;
    columns: string[];
    rows: CompareRow[];
  };
  dimensions: {
    kicker: string;
    title: string;
    description: string;
    disclaimer: string;
    rows: DimensionRow[];
  };
};

export type AdminPageContent = {
  slug: string;
  content: ProductsPageContent | null;
  updatedBy: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  updatedAt: string;
  createdAt: string;
};
