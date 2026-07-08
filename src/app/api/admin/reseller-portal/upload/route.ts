import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getServerAdminToken } from "@/lib/admin-auth/server";
import {
  RESELLER_PORTAL_UPLOAD_DIR,
  RESELLER_PORTAL_UPLOAD_URL_PREFIX,
} from "@/lib/reseller-portal-page/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 20 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["application/pdf"]);

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

  if (!ALLOWED_TYPES.has(file.type) && !file.name.toLowerCase().endsWith(".pdf")) {
    return NextResponse.json(
      {
        success: false,
        error: "Only PDF files are allowed",
        code: "INVALID_FILE_TYPE",
      },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { success: false, error: "File must be 20 MB or smaller", code: "FILE_TOO_LARGE" },
      { status: 400 },
    );
  }

  const filename = `${randomUUID()}.pdf`;
  const uploadDir = path.join(process.cwd(), "public", RESELLER_PORTAL_UPLOAD_DIR);
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  const url = `${RESELLER_PORTAL_UPLOAD_URL_PREFIX}/${filename}`;
  return NextResponse.json({
    success: true,
    data: { url, filename },
  });
}
