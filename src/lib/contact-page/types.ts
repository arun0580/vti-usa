export type ContactCardKind = "email" | "phone" | "address";

export type ContactCard = {
  id: string;
  label: string;
  value: string;
  href: string;
  kind: ContactCardKind;
};

export type ContactPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
  };
  contactCards: ContactCard[];
  quote: {
    kicker: string;
    title: string;
    description: string;
    bullets: string[];
  };
};
