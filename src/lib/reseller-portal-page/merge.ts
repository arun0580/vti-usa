import { mergeDeep } from "@/lib/page-cms/merge";
import { defaultResellerPortalContent } from "./defaultContent";
import type { ResellerPortalPageContent } from "./types";

export function mergeResellerPortalContent(
  stored?: Partial<ResellerPortalPageContent> | null,
): ResellerPortalPageContent {
  if (!stored) return defaultResellerPortalContent;
  return mergeDeep(defaultResellerPortalContent, stored);
}
