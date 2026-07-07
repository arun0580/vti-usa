import type { Metadata } from "next";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import type { AdminPageContent } from "@/lib/page-cms/types";
import type { AboutPageContent } from "@/lib/about-page/types";
import { AdminAboutClient } from "./AdminAboutClient";

export const metadata: Metadata = {
  title: "About Page",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const token = await getServerAdminToken();
  if (!token) return null;

  const res = await proxyToAdminApi("/api/admin/pages/about", undefined, token);
  const data = await res.json().catch(() => null);
  const page = (data?.data?.page ?? {
    slug: "about",
    content: null,
    updatedBy: null,
    updatedAt: new Date(0).toISOString(),
    createdAt: new Date(0).toISOString(),
  }) as AdminPageContent<AboutPageContent>;

  return <AdminAboutClient initialPage={page} />;
}
