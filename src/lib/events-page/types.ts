export type UpcomingEvent = {
  type: string;
  date: string;
  time: string;
  where: string;
  title: string;
  desc: string;
  bullets: string[];
  cta: { label: string; href: string };
};

export type PastEvent = {
  date: string;
  where: string;
  title: string;
  desc: string;
};

export type EventsPageContent = {
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
  };
  upcomingHeading: string;
  pastHeading: string;
  upcoming: UpcomingEvent[];
  past: PastEvent[];
};
