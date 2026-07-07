export async function uploadProductFile(
  file: File,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const body = new FormData();
  body.append("file", file);

  const res = await fetch("/api/admin/products/upload", {
    method: "POST",
    credentials: "include",
    body,
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    return { ok: false, error: json?.error ?? "File upload failed." };
  }
  return { ok: true, url: json.data.url as string };
}
