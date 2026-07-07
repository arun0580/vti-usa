import { savePageContent } from "@/lib/page-cms/api";
import type { GalleryPageContent } from "./types";

export async function saveGalleryPageContent(content: GalleryPageContent) {
  const result = await savePageContent("gallery", content);
  if (!result.ok) return result;
  return { ok: true as const, message: result.message };
}
