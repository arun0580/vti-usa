import { mergeDeep } from "@/lib/page-cms/merge";
import { defaultContactContent } from "./defaultContent";
import type { ContactPageContent } from "./types";

export function mergeContactContent(
  stored?: Partial<ContactPageContent> | null,
): ContactPageContent {
  if (!stored) return defaultContactContent;
  return mergeDeep(defaultContactContent, stored);
}
