import { getApiBase } from "@/lib/reseller-auth/server";
import { cmsPageFetchInit } from "@/lib/page-cms/cache";
import { defaultResellersContent } from "./defaultContent";
import { mergeResellersContent } from "./merge";
import type { ResellersPageContent } from "./types";

export async function fetchResellersPageContent(): Promise<ResellersPageContent> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/pages/resellers`, cmsPageFetchInit("resellers"));
    const body = await res.json().catch(() => null);
    if (!body?.success) return defaultResellersContent;
    const stored = body.data?.content as Partial<ResellersPageContent> | null;
    return mergeResellersContent(stored);
  } catch {
    return defaultResellersContent;
  }
}
