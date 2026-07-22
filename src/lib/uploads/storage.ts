import { existsSync } from "fs";
import path from "path";

/** Resolve the Next.js `public/` directory used for CMS uploads. */
export function getPublicDir(): string {
  if (process.env.PUBLIC_DIR) {
    return path.resolve(process.env.PUBLIC_DIR);
  }

  let current = process.cwd();
  for (let depth = 0; depth < 6; depth += 1) {
    const candidate = path.join(current, "public");
    if (existsSync(path.join(candidate, "uploads"))) {
      return candidate;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }

  return path.join(process.cwd(), "public");
}

/** Absolute directory for a folder under `public/` (e.g. `uploads/home`). */
export function getPublicUploadDir(relativeDir: string): string {
  return path.join(getPublicDir(), relativeDir);
}

const MIME_BY_EXT: Record<string, string> = {
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export function getUploadMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return MIME_BY_EXT[ext] ?? "application/octet-stream";
}
