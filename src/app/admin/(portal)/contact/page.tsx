import type { Metadata } from "next";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import type { AdminPageContent } from "@/lib/page-cms/types";
import type { ContactPageContent } from "@/lib/contact-page/types";
import { AdminContactClient } from "./AdminContactClient";

export const metadata: Metadata = {
  title: "Contact Page",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const token = await getServerAdminToken();
  if (!token) return null;

  const res = await proxyToAdminApi("/api/admin/pages/contact", undefined, token);
  const data = await res.json().catch(() => null);
  const page = (data?.data?.page ?? {
    slug: "contact",
    content: null,
    updatedBy: null,
    updatedAt: new Date(0).toISOString(),
    createdAt: new Date(0).toISOString(),
  }) as AdminPageContent<ContactPageContent>;

  return <AdminContactClient initialPage={page} />;
}
