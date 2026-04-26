import type { Metadata } from "next";

const title =
  "Interactive Panels, LED Signage, Accessories & Software — VTI";
const description =
  "Browse Virtual Technologies' full product lineup: interactive panels (Virtual, OneScreen, InFocus), LED posters & signage, accessories, and the Get Curious Together OER software platform.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vtiusa.com"),
  title,
  description,
  openGraph: {
    title: "VTI Products",
    description:
      "Interactive panels, LED signage, accessories, and K-12 software — one source for the right display.",
    images: [{ url: "/vt-panel-hero-BbQvghRM.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VTI — Interactive Displays for Education, Business & Government",
    description:
      "VTI Reseller Hub provides a polished online presence and sales tools for VTI resellers.",
    images: ["/vt-panel-hero-BbQvghRM.png"],
  },
  authors: [{ name: "Virtual Technologies, Inc." }],
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
