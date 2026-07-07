import { savePageContent } from "@/lib/page-cms/api";
import type { HomePageContent } from "./types";

export async function saveHomePageContent(content: HomePageContent) {
  const result = await savePageContent("home", content);
  if (!result.ok) return result;
  return { ok: true as const, message: result.message };
}
