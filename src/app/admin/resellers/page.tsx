import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import { loadAdminProfile } from "@/lib/admin-auth/session";
import type { ResellerProfile } from "@/lib/reseller-auth/types";
import { AdminResellersClient } from "./AdminResellersClient";

export const metadata: Metadata = {
  title: "Reseller approvals",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function loadPendingResellers(token: string): Promise<ResellerProfile[]> {
  const res = await proxyToAdminApi(
    "/api/admin/resellers?status=pending",
    undefined,
    token,
  );
  if (!res.ok) return [];
  const body = await res.json().catch(() => null);
  if (!body?.success) return [];
  return body.data.resellers as ResellerProfile[];
}

export default async function AdminResellersPage() {
  const token = await getServerAdminToken();
  if (!token) {
    redirect("/admin/login");
  }

  const admin = await loadAdminProfile(token);
  if (!admin) {
    redirect("/admin/login?error=session");
  }

  const initialResellers = await loadPendingResellers(token);

  return (
    <AdminResellersClient
      initialResellers={initialResellers}
      admin={admin}
    />
  );
}
