import type { ProductsPageContent } from "./types";
import { defaultProductsContent } from "./defaultContent";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeDeep<T>(defaults: T, overrides: unknown): T {
  if (overrides === undefined || overrides === null) {
    return defaults;
  }

  if (Array.isArray(defaults)) {
    return (Array.isArray(overrides) ? overrides : defaults) as T;
  }

  if (!isPlainObject(defaults) || !isPlainObject(overrides)) {
    return overrides as T;
  }

  const result = { ...defaults } as Record<string, unknown>;
  for (const key of Object.keys(overrides)) {
    const defaultVal = (defaults as Record<string, unknown>)[key];
    const overrideVal = overrides[key];
    if (defaultVal !== undefined) {
      result[key] = mergeDeep(defaultVal, overrideVal);
    } else {
      result[key] = overrideVal;
    }
  }
  return result as T;
}

export function mergeProductsContent(
  stored?: Partial<ProductsPageContent> | null,
): ProductsPageContent {
  if (!stored) return defaultProductsContent;
  const merged = mergeDeep(defaultProductsContent, stored);

  // Migrate legacy oneScreen.flagship → products[] and guru → guruCards[]
  const legacy = stored.oneScreen as
    | (Partial<ProductsPageContent["oneScreen"]> & {
        flagship?: ProductsPageContent["oneScreen"]["products"][number];
        guru?: ProductsPageContent["oneScreen"]["guruCards"][number];
      })
    | undefined;
  if (
    legacy?.flagship &&
    (!Array.isArray(legacy.products) || legacy.products.length === 0)
  ) {
    merged.oneScreen = {
      ...merged.oneScreen,
      products: [
        mergeDeep(defaultProductsContent.oneScreen.products[0], legacy.flagship),
      ],
    };
  }
  if (
    legacy?.guru &&
    (!Array.isArray(legacy.guruCards) || legacy.guruCards.length === 0)
  ) {
    merged.oneScreen = {
      ...merged.oneScreen,
      guruCards: [
        mergeDeep(defaultProductsContent.oneScreen.guruCards[0], legacy.guru),
      ],
    };
  }

  return merged;
}
