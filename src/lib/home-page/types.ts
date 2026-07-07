export type HomeHeadlineLine = {
  text: string;
  accent: boolean;
};

export type HomeStat =
  | { kind: "text"; top: string; bottom: string }
  | { kind: "count"; count: number; bottom: string };

export type HomeSolutionCard = {
  title: string;
  desc: string;
  imageSrc: string;
  icon: string;
};

export type HomeWhyCard = {
  title: string;
  desc: string;
  icon: string;
};

export type HomeFiveSImage = {
  imageSrc: string;
  alt: string;
  variant: "circle" | "rounded";
};

export type HomeFiveSPillar = {
  key: string;
  value: string;
  href?: string;
};

export type HomeTestimonial = {
  quote: string;
  name: string;
  role: string;
  tag: string;
  imageSrc: string;
  org: string;
};

export type HomePageContent = {
  hero: {
    kicker: string;
    headlineLines: HomeHeadlineLine[];
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    imageSrc: string;
    imageAlt: string;
    stats: HomeStat[];
  };
  trustedBand: {
    kicker: string;
    items: string[];
  };
  solutions: {
    kicker: string;
    title: string;
    description: string;
    cards: HomeSolutionCard[];
  };
  fiveSPromise: {
    kicker: string;
    title: string;
    description: string;
    images: HomeFiveSImage[];
    pillars: HomeFiveSPillar[];
  };
  whyVti: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    cards: HomeWhyCard[];
  };
  testimonials: {
    kicker: string;
    title: string;
    titleAccent: string;
    description: string;
    galleryLinkLabel: string;
    galleryLinkHref: string;
    items: HomeTestimonial[];
  };
  bottomCta: {
    title: string;
    description: string;
    mascotSrc: string;
    mascotAlt: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
};
