import { getApiBase } from "@/lib/reseller-auth/server";
import { cmsPageFetchInit } from "@/lib/page-cms/cache";
import { defaultResellerPortalContent } from "./defaultContent";
import { mergeResellerPortalContent } from "./merge";
import type { ResellerPortalPageContent } from "./types";

export async function fetchResellerPortalPageContent(): Promise<ResellerPortalPageContent> {
  try {
    const base = getApiBase();
    const res = await fetch(
      `${base}/api/pages/reseller-portal`,
      cmsPageFetchInit("reseller-portal"),
    );
    const body = await res.json().catch(() => null);
    if (!body?.success) return defaultResellerPortalContent;
    const stored = body.data?.content as Partial<ResellerPortalPageContent> | null;
    return mergeResellerPortalContent(stored);
  } catch {
    return defaultResellerPortalContent;
  }
}
