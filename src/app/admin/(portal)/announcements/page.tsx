import type { Metadata } from "next";
import { Suspense } from "react";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import type { SiteAnnouncement } from "@/lib/announcements/types";
import { AdminAnnouncementsClient } from "./AdminAnnouncementsClient";

export const metadata: Metadata = {
  title: "Announcements",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminAnnouncementsPage() {
  const token = await getServerAdminToken();
  if (!token) return null;

  const res = await proxyToAdminApi("/api/admin/announcements", undefined, token);
  const data = await res.json().catch(() => null);
  const announcements = (data?.data?.announcements ?? []) as SiteAnnouncement[];

  return (
    <Suspense fallback={null}>
      <AdminAnnouncementsClient initialAnnouncements={announcements} />
    </Suspense>
  );
}
