import type { ContactPageContent } from "./types";

export const defaultContactContent: ContactPageContent = {
  hero: {
    kicker: "CONTACT",
    title: "Let's talk about your space.",
    description:
      "Classroom, conference room, lecture hall, gallery, lobby, or government facility — our team will help you spec the right display solution for any space.",
    imageSrc: "/mascot-puppies-trio.png",
    imageAlt: "VTI mascot puppies trio",
  },
  contactCards: [
    {
      id: "email",
      label: "Email",
      value: "info@vtiusa.com",
      href: "mailto:info@vtiusa.com",
      kind: "email",
    },
    {
      id: "phone",
      label: "Phone",
      value: "(877) 853-8478",
      href: "tel:+18778538478",
      kind: "phone",
    },
    {
      id: "address",
      label: "Address",
      value: "111 Bluffs Ct, Ste C\nCanton, GA 30114",
      href: "https://maps.google.com/?q=111%20Bluffs%20Ct%2C%20Ste%20C%2C%20Canton%2C%20GA%2030114",
      kind: "address",
    },
  ],
  quote: {
    kicker: "REQUEST A QUOTE",
    title: "Tell us about your project.",
    description:
      "Share a few details and the right person on our team will follow up — usually within one business day.",
    bullets: ["Side-by-side spec packets", "Local installation referrals"],
  },
};
