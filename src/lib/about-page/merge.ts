import { mergeDeep } from "@/lib/page-cms/merge";
import { defaultAboutContent } from "./defaultContent";
import type { AboutPageContent } from "./types";

export function mergeAboutContent(
  stored?: Partial<AboutPageContent> | null,
): AboutPageContent {
  if (!stored) return defaultAboutContent;
  return mergeDeep(defaultAboutContent, stored);
}
