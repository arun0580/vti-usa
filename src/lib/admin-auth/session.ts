import { proxyToAdminApi } from "./server";
import type { AdminProfile } from "./types";

export async function loadAdminProfile(
  token: string,
): Promise<AdminProfile | null> {
  const res = await proxyToAdminApi("/api/admin/me", undefined, token);
  if (!res.ok) return null;
  const body = await res.json().catch(() => null);
  if (!body?.success) return null;
  return body.data.admin as AdminProfile;
}
