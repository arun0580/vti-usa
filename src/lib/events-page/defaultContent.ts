import type { EventsPageContent, PastEvent, UpcomingEvent } from "./types";

export const defaultEventsContent: EventsPageContent = {
  hero: {
    kicker: "EVENTS",
    titleLine1: "Webinars, trade shows,",
    titleLine2: "and training",
    description:
      "Catch us live, online or on the road. We host partner webinars, exhibit at industry events, and run reseller trainings throughout the year.",
  },
  upcomingHeading: "Upcoming",
  pastHeading: "Past events",
  upcoming: [
    {
      type: "Webinar",
      date: "September 20, 2026",
      time: "9:00 AM Pacific",
      where: "Live webinar (online)",
      title: "Turn LED Video Walls into Your Next Revenue Driver",
      desc: "LED video walls aren't just a niche play anymore — they're quickly becoming a practical, high-impact solution for a wide range of spaces. For partners, that shift opens up a real opportunity.",
      bullets: [
        "Why LED video walls are gaining traction now",
        "Where the deals are and which verticals are buying",
        "How to confidently step into the category",
        "Pricing, install, and support: what reps need to know",
      ],
      cta: {
        label: "Reserve your spot",
        href: "https://zoom.us/webinar/register/WN_PgpqF8ZsRsud0AqVsXiTNQ?utm_campaign=Resellers&utm_medium=email&_hsenc=p2ANqtz-_sZdl7JUE-pr6Znj8wactmUeRLnrF_RnyvIqA3V-C_2xdMcyiFPRNbGmAx3CBYsppWE_5QmuGJ_2pMjqev8nlJGTZIUQ&_hsmi=416838137&utm_content=416838137&utm_source=hs_email#/registration",
      },
    },
  ],
  past: [
    {
      date: "June 2025",
      where: "Orlando, FL",
      title: "InfoComm 2025",
      desc: "VTI showcased the VTI-Pro interactive panel lineup and our LED video wall AIO series alongside reseller partners.",
    },
  ],
};

export function emptyUpcomingEvent(): UpcomingEvent {
  return {
    type: "Webinar",
    date: "",
    time: "",
    where: "",
    title: "",
    desc: "",
    bullets: [],
    cta: { label: "", href: "" },
  };
}

export function emptyPastEvent(): PastEvent {
  return {
    date: "",
    where: "",
    title: "",
    desc: "",
  };
}
