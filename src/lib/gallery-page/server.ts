import { getApiBase } from "@/lib/reseller-auth/server";
import { cmsPageFetchInit } from "@/lib/page-cms/cache";
import { defaultGalleryContent } from "./defaultContent";
import { mergeGalleryContent } from "./merge";
import type { GalleryPageContent } from "./types";

export async function fetchGalleryPageContent(): Promise<GalleryPageContent> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/pages/gallery`, cmsPageFetchInit("gallery"));
    const body = await res.json().catch(() => null);
    if (!body?.success) return defaultGalleryContent;
    const stored = body.data?.content as Partial<GalleryPageContent> | null;
    return mergeGalleryContent(stored);
  } catch {
    return defaultGalleryContent;
  }
}
