import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About VTI",
  description:
    "Built by pioneers. Trusted nationwide. Learn how Virtual Technologies, Inc. delivers interactive displays from coast to coast.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
