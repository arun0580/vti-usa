import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerAdminToken } from "@/lib/admin-auth/server";
import { AdminLoginClient } from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const token = await getServerAdminToken();
  if (token) {
    redirect("/admin/resellers");
  }

  return <AdminLoginClient />;
}
