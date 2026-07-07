import { getApiBase } from "@/lib/reseller-auth/server";
import { cmsPageFetchInit } from "@/lib/page-cms/cache";
import { defaultAboutContent } from "./defaultContent";
import { mergeAboutContent } from "./merge";
import type { AboutPageContent } from "./types";

export async function fetchAboutPageContent(): Promise<AboutPageContent> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/pages/about`, cmsPageFetchInit("about"));
    const body = await res.json().catch(() => null);
    if (!body?.success) return defaultAboutContent;
    const stored = body.data?.content as Partial<AboutPageContent> | null;
    return mergeAboutContent(stored);
  } catch {
    return defaultAboutContent;
  }
}
