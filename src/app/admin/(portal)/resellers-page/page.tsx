import type { Metadata } from "next";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import type { AdminPageContent } from "@/lib/page-cms/types";
import type { ResellersPageContent } from "@/lib/resellers-page/types";
import { AdminResellersPageClient } from "./AdminResellersPageClient";

export const metadata: Metadata = {
  title: "Resellers Page",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminResellersPageEditor() {
  const token = await getServerAdminToken();
  if (!token) return null;

  const res = await proxyToAdminApi("/api/admin/pages/resellers", undefined, token);
  const data = await res.json().catch(() => null);
  const page = (data?.data?.page ?? {
    slug: "resellers",
    content: null,
    updatedBy: null,
    updatedAt: new Date(0).toISOString(),
    createdAt: new Date(0).toISOString(),
  }) as AdminPageContent<ResellersPageContent>;

  return <AdminResellersPageClient initialPage={page} />;
}
