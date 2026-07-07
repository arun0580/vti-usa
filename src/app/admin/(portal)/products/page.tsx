import type { Metadata } from "next";
import { getServerAdminToken, proxyToAdminApi } from "@/lib/admin-auth/server";
import type { AdminPageContent } from "@/lib/products-page/types";
import { AdminProductsClient } from "./AdminProductsClient";

export const metadata: Metadata = {
  title: "Products Page",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const token = await getServerAdminToken();
  if (!token) return null;

  const res = await proxyToAdminApi("/api/admin/pages/products", undefined, token);
  const data = await res.json().catch(() => null);
  const page = (data?.data?.page ?? {
    slug: "products",
    content: null,
    updatedBy: null,
    updatedAt: new Date(0).toISOString(),
    createdAt: new Date(0).toISOString(),
  }) as AdminPageContent;

  return <AdminProductsClient initialPage={page} />;
}
