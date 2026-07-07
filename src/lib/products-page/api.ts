import type { AdminPageContent, ProductsPageContent } from "./types";
import { mergeProductsContent } from "./merge";

type ApiSuccess<T> = { success: true; message?: string; data: T };
type ApiError = { success: false; error: string; fields?: Record<string, string> };

async function parseJson<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchAdminProductsPageContent(): Promise<
  { ok: true; page: AdminPageContent } | { ok: false; error: string }
> {
  const res = await fetch("/api/admin/pages/products", {
    credentials: "include",
    cache: "no-store",
  });
  const body = await parseJson<
    ApiSuccess<{ page: AdminPageContent }> | ApiError
  >(res);
  if (!body || !body.success) {
    return { ok: false, error: body?.error ?? "Unable to load page content." };
  }
  return { ok: true, page: body.data.page };
}

export async function saveProductsPageContent(
  content: ProductsPageContent,
): Promise<
  | { ok: true; message: string; page: AdminPageContent }
  | { ok: false; error: string; fields?: Record<string, string> }
> {
  const res = await fetch("/api/admin/pages/products", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ content }),
  });
  const body = await parseJson<ApiSuccess<{ page: AdminPageContent }> | ApiError>(
    res,
  );
  if (!body || !body.success) {
    return {
      ok: false,
      error: body?.error ?? "Could not save page content.",
      fields: body?.fields,
    };
  }
  return {
    ok: true,
    message: body.message ?? "Page content saved.",
    page: body.data.page,
  };
}

export { mergeProductsContent };
