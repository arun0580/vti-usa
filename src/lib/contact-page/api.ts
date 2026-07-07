import { savePageContent } from "@/lib/page-cms/api";
import type { ContactPageContent } from "./types";

export async function saveContactPageContent(content: ContactPageContent) {
  const result = await savePageContent("contact", content);
  if (!result.ok) return result;
  return { ok: true as const, message: result.message };
}
