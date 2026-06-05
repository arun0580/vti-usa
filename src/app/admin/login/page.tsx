import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerAdminToken } from "@/lib/admin-auth/server";
import { loadAdminProfile } from "@/lib/admin-auth/session";
import { AdminLoginClient } from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const token = await getServerAdminToken();
  if (token) {
    const admin = await loadAdminProfile(token);
    if (admin) {
      redirect("/admin/resellers");
    }
  }

  return (
    <Suspense fallback={null}>
      <AdminLoginClient />
    </Suspense>
  );
}
