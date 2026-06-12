import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnnouncementForm } from "@/components/admin/AnnouncementForm";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import type { SiteAnnouncement } from "@/lib/announcements/types";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function loadAnnouncement(
  token: string,
  id: string,
): Promise<SiteAnnouncement | null> {
  const res = await proxyToAdminApi(`/api/admin/announcements/${id}`, undefined, token);
  if (!res.ok) return null;
  const body = await res.json().catch(() => null);
  if (!body?.success) return null;
  return body.data.announcement as SiteAnnouncement;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const token = await getServerAdminToken();
  const announcement = token ? await loadAnnouncement(token, id) : null;

  return {
    title: announcement ? `Edit ${announcement.title}` : "Edit announcement",
    robots: { index: false, follow: false },
  };
}

export default async function AdminAnnouncementEditPage({ params }: PageProps) {
  const { id } = await params;
  const token = await getServerAdminToken();
  if (!token) notFound();

  const announcement = await loadAnnouncement(token, id);
  if (!announcement) notFound();

  return <AnnouncementForm mode="edit" initialAnnouncement={announcement} />;
}
