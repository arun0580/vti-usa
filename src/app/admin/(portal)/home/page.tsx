import type { Metadata } from "next";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import type { AdminPageContent } from "@/lib/page-cms/types";
import type { HomePageContent } from "@/lib/home-page/types";
import { AdminHomeClient } from "./AdminHomeClient";

export const metadata: Metadata = {
  title: "Home Page",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const token = await getServerAdminToken();
  if (!token) return null;

  const res = await proxyToAdminApi("/api/admin/pages/home", undefined, token);
  const data = await res.json().catch(() => null);
  const page = (data?.data?.page ?? {
    slug: "home",
    content: null,
    updatedBy: null,
    updatedAt: new Date(0).toISOString(),
    createdAt: new Date(0).toISOString(),
  }) as AdminPageContent<HomePageContent>;

  return <AdminHomeClient initialPage={page} />;
}
