import type { Metadata } from "next";
import { getServerAdminToken } from "@/lib/admin-auth/server";
import { loadAdminProfile } from "@/lib/admin-auth/session";
import { AdminProfileClient } from "./AdminProfileClient";

export const metadata: Metadata = {
  title: "Profile",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const token = await getServerAdminToken();
  const admin = token ? await loadAdminProfile(token) : null;
  if (!admin) return null;

  return <AdminProfileClient admin={admin} />;
}
