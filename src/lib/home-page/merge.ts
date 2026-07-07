import { mergeDeep } from "@/lib/page-cms/merge";
import { defaultHomeContent } from "./defaultContent";
import type { HomePageContent } from "./types";

export function mergeHomeContent(
  stored?: Partial<HomePageContent> | null,
): HomePageContent {
  if (!stored) return defaultHomeContent;
  return mergeDeep(defaultHomeContent, stored);
}
