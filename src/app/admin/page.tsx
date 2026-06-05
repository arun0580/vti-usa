import { redirect } from "next/navigation";
import { getServerAdminToken } from "@/lib/admin-auth/server";

export default async function AdminIndexPage() {
  const token = await getServerAdminToken();
  redirect(token ? "/admin/resellers" : "/admin/login");
}
