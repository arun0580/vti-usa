import { ResellerPortalClient } from "./ResellerPortalClient";
import { fetchResellersPageContent } from "@/lib/resellers-page/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reseller Portal",
  description:
    "Sign in to the VTI reseller portal for pricing, quotes, deal registration, and marketing assets.",
};

export default async function ResellersPage() {
  const content = await fetchResellersPageContent();

  return (
    <div className="min-h-[70vh] bg-white py-12 sm:py-16">
      <ResellerPortalClient content={content} />
    </div>
  );
}
