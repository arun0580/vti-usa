import { mergeDeep } from "@/lib/page-cms/merge";
import { defaultResellerPortalContent } from "./defaultContent";
import type { ResellerPortalPageContent } from "./types";

const LEGACY_ASSET_TITLES = [
  "Spec sheets, pricing & marketing collateral.",
  "Spec sheets & marketing collateral.",
];

export function mergeResellerPortalContent(
  stored?: Partial<ResellerPortalPageContent> | null,
): ResellerPortalPageContent {
  if (!stored) return defaultResellerPortalContent;
  const merged = mergeDeep(defaultResellerPortalContent, stored);
  if (stored.assetLibrary?.title && LEGACY_ASSET_TITLES.includes(stored.assetLibrary.title)) {
    merged.assetLibrary.title = defaultResellerPortalContent.assetLibrary.title;
  }
  if (stored.assetLibrary?.pricingLabel === "Price list") {
    merged.assetLibrary.pricingLabel = "";
  }
  return merged;
}
