import { redirect } from "next/navigation";
import { AdminPortalShell } from "@/components/admin/AdminPortalShell";
import { getServerAdminToken } from "@/lib/admin-auth/server";
import { loadAdminProfile } from "@/lib/admin-auth/session";

export default async function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getServerAdminToken();
  if (!token) {
    redirect("/admin/login");
  }

  const admin = await loadAdminProfile(token);
  if (!admin) {
    redirect("/admin/login?error=session");
  }

  return <AdminPortalShell admin={admin}>{children}</AdminPortalShell>;
}
