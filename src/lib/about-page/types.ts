export type AboutValueIconId =
  | "heart"
  | "handshake"
  | "award"
  | "lightbulb"
  | "support"
  | "globe";

export type AboutTeamMember = {
  id: string;
  name: string;
  role: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
};

export type AboutValueCard = {
  id: string;
  title: string;
  desc: string;
  icon: AboutValueIconId;
};

export type AboutPageContent = {
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
  };
  tabsPrompt: string;
  story: {
    kicker: string;
    title: string;
    paragraphs: string[];
    mascot: {
      imageSrc: string;
      imageAlt: string;
      name: string;
      role: string;
      subtitle: string;
    };
  };
  team: {
    kicker: string;
    title: string;
    description: string;
    members: AboutTeamMember[];
  };
  values: {
    kicker: string;
    title: string;
    cards: AboutValueCard[];
  };
  join: {
    kicker: string;
    title: string;
    description: string;
    bullets: string[];
  };
  bottomCta: {
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    backgroundImageSrc: string;
    mascotImageSrc: string;
    mascotImageAlt: string;
  };
};
