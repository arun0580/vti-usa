import { fetchProductsPageContent } from "@/lib/products-page/server";
import { ProductsPageClient } from "./ProductsPageClient";

export default async function ProductsPage() {
  const content = await fetchProductsPageContent();
  return <ProductsPageClient content={content} />;
}
