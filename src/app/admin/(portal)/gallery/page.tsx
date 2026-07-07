import type { Metadata } from "next";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import type { AdminPageContent } from "@/lib/page-cms/types";
import type { GalleryPageContent } from "@/lib/gallery-page/types";
import { AdminGalleryClient } from "./AdminGalleryClient";

export const metadata: Metadata = {
  title: "Gallery Page",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const token = await getServerAdminToken();
  if (!token) return null;

  const res = await proxyToAdminApi("/api/admin/pages/gallery", undefined, token);
  const data = await res.json().catch(() => null);
  const page = (data?.data?.page ?? {
    slug: "gallery",
    content: null,
    updatedBy: null,
    updatedAt: new Date(0).toISOString(),
    createdAt: new Date(0).toISOString(),
  }) as AdminPageContent<GalleryPageContent>;

  return <AdminGalleryClient initialPage={page} />;
}
