import { savePageContent } from "@/lib/page-cms/api";
import type { ResellerPortalPageContent } from "./types";

export async function saveResellerPortalPageContent(content: ResellerPortalPageContent) {
  const result = await savePageContent("reseller-portal", content);
  if (!result.ok) return result;
  return { ok: true as const, message: result.message };
}
