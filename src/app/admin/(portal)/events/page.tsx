import type { Metadata } from "next";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import type { AdminPageContent } from "@/lib/page-cms/types";
import type { EventsPageContent } from "@/lib/events-page/types";
import { AdminEventsClient } from "./AdminEventsClient";

export const metadata: Metadata = {
  title: "Events Page",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const token = await getServerAdminToken();
  if (!token) return null;

  const res = await proxyToAdminApi("/api/admin/pages/events", undefined, token);
  const data = await res.json().catch(() => null);
  const page = (data?.data?.page ?? {
    slug: "events",
    content: null,
    updatedBy: null,
    updatedAt: new Date(0).toISOString(),
    createdAt: new Date(0).toISOString(),
  }) as AdminPageContent<EventsPageContent>;

  return <AdminEventsClient initialPage={page} />;
}
