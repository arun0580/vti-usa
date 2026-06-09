import type { Metadata } from "next";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import type { ResellerProfile } from "@/lib/reseller-auth/types";
import { AdminResellersClient } from "./AdminResellersClient";

export const metadata: Metadata = {
  title: "Manage resellers",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function loadResellers(token: string): Promise<ResellerProfile[]> {
  const res = await proxyToAdminApi("/api/admin/resellers", undefined, token);
  if (!res.ok) return [];
  const body = await res.json().catch(() => null);
  if (!body?.success) return [];
  return body.data.resellers as ResellerProfile[];
}

export default async function AdminResellersPage() {
  const token = await getServerAdminToken();
  const initialResellers = token ? await loadResellers(token) : [];

  return <AdminResellersClient initialResellers={initialResellers} />;
}
