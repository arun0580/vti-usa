import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import type { ResellerProfile } from "@/lib/reseller-auth/types";
import { AdminResellerDetailClient } from "./AdminResellerDetailClient";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function loadReseller(
  token: string,
  id: string,
): Promise<ResellerProfile | null> {
  const res = await proxyToAdminApi(`/api/admin/resellers/${id}`, undefined, token);
  if (!res.ok) return null;
  const body = await res.json().catch(() => null);
  if (!body?.success) return null;
  return body.data.reseller as ResellerProfile;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const token = await getServerAdminToken();
  const reseller = token ? await loadReseller(token, id) : null;
  const name = reseller
    ? `${reseller.firstName} ${reseller.lastName}`.trim()
    : "Reseller";

  return {
    title: `${name} — Reseller detail`,
    robots: { index: false, follow: false },
  };
}

export default async function AdminResellerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const token = await getServerAdminToken();
  if (!token) notFound();

  const reseller = await loadReseller(token, id);
  if (!reseller) notFound();

  return <AdminResellerDetailClient initialReseller={reseller} />;
}
