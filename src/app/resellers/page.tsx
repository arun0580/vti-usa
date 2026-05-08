import { Container } from "@/components/site/Container";
import { ResellerPortalClient } from "./ResellerPortalClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reseller Portal",
  description:
    "Sign in to the VTI reseller portal for pricing, quotes, deal registration, and marketing assets.",
};

export default function ResellersPage() {
  return (
    <div className="min-h-[70vh] bg-white">
      <Container className="py-12 sm:py-16">
        <ResellerPortalClient />
      </Container>
    </div>
  );
}
