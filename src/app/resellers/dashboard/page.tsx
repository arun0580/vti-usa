import { redirect } from "next/navigation";
import {
  getServerResellerToken,
  proxyToApi,
} from "@/lib/reseller-auth/server";
import type { ResellerProfile } from "@/lib/reseller-auth/types";
import { ResellerDashboardClient } from "./ResellerDashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reseller Portal",
  description:
    "VTI reseller portal — quotes, deal registration, assets, and partner resources.",
};

async function loadProfile(token: string): Promise<ResellerProfile | null> {
  const res = await proxyToApi("/api/resellers/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const body = await res.json().catch(() => null);
  if (!body?.success) return null;
  return body.data.reseller as ResellerProfile;
}

export default async function ResellerDashboardPage() {
  const token = await getServerResellerToken();
  if (!token) {
    redirect("/resellers");
  }

  const reseller = await loadProfile(token);
  if (!reseller) {
    redirect("/resellers");
  }

  return <ResellerDashboardClient reseller={reseller} />;
}
