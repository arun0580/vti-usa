import { getApiBase } from "@/lib/reseller-auth/server";
import { cmsPageFetchInit } from "@/lib/page-cms/cache";
import { defaultHomeContent } from "./defaultContent";
import { mergeHomeContent } from "./merge";
import type { HomePageContent } from "./types";

export async function fetchHomePageContent(): Promise<HomePageContent> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/pages/home`, cmsPageFetchInit("home"));
    const body = await res.json().catch(() => null);
    if (!body?.success) return defaultHomeContent;
    const stored = body.data?.content as Partial<HomePageContent> | null;
    return mergeHomeContent(stored);
  } catch {
    return defaultHomeContent;
  }
}
