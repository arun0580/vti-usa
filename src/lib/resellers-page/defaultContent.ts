import type { ResellersPageContent } from "./types";

export const defaultResellersContent: ResellersPageContent = {
  hero: {
    kicker: "For Partners",
    title: "Built around real partnership.",
    description:
      "VTI sells exclusively through certified resellers and integrators. Local support, direct factory access, and a team that picks up the phone.",
  },
  portal: {
    kicker: "Reseller Portal Access",
    signInTitle: "Already a VTI reseller?",
    signInDescription:
      "Sign in to access pricing sheets, generate quotes, register deals, and download marketing assets.",
    signUpTitle: "Interested in becoming a reseller?",
    signUpDescription:
      "Tell us about your business and we'll set up portal access for your team. Most applications get a response within one business day.",
    benefits: [
      "Pricing sheets & current price lists",
      "Generate customer quotes",
      "Deal registration & territory protection",
      "Spec sheets, brochures & marketing assets",
      "Direct line to your dedicated VTI rep",
    ],
  },
};
