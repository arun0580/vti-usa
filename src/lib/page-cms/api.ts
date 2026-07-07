import type { AdminPageContent } from "./types";

type ApiSuccess<T> = { success: true; message?: string; data: T };
type ApiError = { success: false; error: string; fields?: Record<string, string> };

async function parseJson<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function savePageContent<T>(
  slug: string,
  content: T,
): Promise<
  | { ok: true; message: string; page: AdminPageContent<T> }
  | { ok: false; error: string; fields?: Record<string, string> }
> {
  const res = await fetch(`/api/admin/pages/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ content }),
  });
  const body = await parseJson<ApiSuccess<{ page: AdminPageContent<T> }> | ApiError>(
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
