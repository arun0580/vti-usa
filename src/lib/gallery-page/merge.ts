import { mergeDeep } from "@/lib/page-cms/merge";
import { defaultGalleryContent } from "./defaultContent";
import type { GalleryPageContent } from "./types";

export function mergeGalleryContent(
  stored?: Partial<GalleryPageContent> | null,
): GalleryPageContent {
  if (!stored) return defaultGalleryContent;
  return mergeDeep(defaultGalleryContent, stored);
}
