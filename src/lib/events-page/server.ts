import { getApiBase } from "@/lib/reseller-auth/server";
import { cmsPageFetchInit } from "@/lib/page-cms/cache";
import { defaultEventsContent } from "./defaultContent";
import { mergeEventsContent } from "./merge";
import type { EventsPageContent } from "./types";

export async function fetchEventsPageContent(): Promise<EventsPageContent> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/pages/events`, cmsPageFetchInit("events"));
    const body = await res.json().catch(() => null);
    if (!body?.success) return defaultEventsContent;
    const stored = body.data?.content as Partial<EventsPageContent> | null;
    return mergeEventsContent(stored);
  } catch {
    return defaultEventsContent;
  }
}
