import { savePageContent } from "@/lib/page-cms/api";
import type { ResellersPageContent } from "./types";

export async function saveResellersPageContent(content: ResellersPageContent) {
  const result = await savePageContent("resellers", content);
  if (!result.ok) return result;
  return { ok: true as const, message: result.message };
}
