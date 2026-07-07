import { mergeDeep } from "@/lib/page-cms/merge";
import { defaultResellersContent } from "./defaultContent";
import type { ResellersPageContent } from "./types";

export function mergeResellersContent(
  stored?: Partial<ResellersPageContent> | null,
): ResellersPageContent {
  if (!stored) return defaultResellersContent;
  return mergeDeep(defaultResellersContent, stored);
}
