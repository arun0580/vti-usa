import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getServerAdminToken } from "@/lib/admin-auth/server";
import {
  ANNOUNCEMENT_IMAGE_DIR,
  ANNOUNCEMENT_IMAGE_URL_PREFIX,
} from "@/lib/announcements/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
]);

const EXT_BY_TYPE: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "application/pdf": ".pdf",
};

export async function POST(request: Request) {
  const token = await getServerAdminToken();
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Not authenticated", code: "UNAUTHORIZED" },
      { status: 401 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid upload payload", code: "BAD_REQUEST" },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { success: false, error: "No file provided", code: "BAD_REQUEST" },
      { status: 400 },
    );
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      {
        success: false,
        error: "Only PNG, JPG, WebP, GIF, SVG images or PDF files are allowed",
        code: "INVALID_FILE_TYPE",
      },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { success: false, error: "File must be 10 MB or smaller", code: "FILE_TOO_LARGE" },
      { status: 400 },
    );
  }

  const ext =
    EXT_BY_TYPE[file.type] ?? (path.extname(file.name).toLowerCase() || ".png");
  const filename = `${randomUUID()}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", ANNOUNCEMENT_IMAGE_DIR);
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  const url = `${ANNOUNCEMENT_IMAGE_URL_PREFIX}/${filename}`;
  return NextResponse.json({
    success: true,
    data: { url, filename },
  });
}
