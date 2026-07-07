import { savePageContent } from "@/lib/page-cms/api";
import type { AboutPageContent } from "./types";

export async function saveAboutPageContent(content: AboutPageContent) {
  const result = await savePageContent("about", content);
  if (!result.ok) return result;
  return { ok: true as const, message: result.message };
}
