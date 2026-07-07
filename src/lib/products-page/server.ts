import { getApiBase } from "@/lib/reseller-auth/server";
import { cmsPageFetchInit } from "@/lib/page-cms/cache";
import { defaultProductsContent } from "./defaultContent";
import { mergeProductsContent } from "./merge";
import type { ProductsPageContent } from "./types";

export async function fetchProductsPageContent(): Promise<ProductsPageContent> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/pages/products`, cmsPageFetchInit("products"));
    const body = await res.json().catch(() => null);
    if (!body?.success) return defaultProductsContent;
    const stored = body.data?.content as Partial<ProductsPageContent> | null;
    return mergeProductsContent(stored);
  } catch {
    return defaultProductsContent;
  }
}
