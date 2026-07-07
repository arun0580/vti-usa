import { getApiBase } from "@/lib/reseller-auth/server";
import { cmsPageFetchInit } from "@/lib/page-cms/cache";
import { defaultContactContent } from "./defaultContent";
import { mergeContactContent } from "./merge";
import type { ContactPageContent } from "./types";

export async function fetchContactPageContent(): Promise<ContactPageContent> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/pages/contact`, cmsPageFetchInit("contact"));
    const body = await res.json().catch(() => null);
    if (!body?.success) return defaultContactContent;
    const stored = body.data?.content as Partial<ContactPageContent> | null;
    return mergeContactContent(stored);
  } catch {
    return defaultContactContent;
  }
}
