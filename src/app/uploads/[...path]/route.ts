import { readFile, stat } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getPublicDir, getUploadMimeType } from "@/lib/uploads/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { path: segments } = await context.params;
  if (!segments?.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (segments.some((segment) => segment === ".." || segment.includes("\0"))) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const uploadsRoot = path.join(getPublicDir(), "uploads");
  const filePath = path.join(uploadsRoot, ...segments);
  const normalized = path.normalize(filePath);

  if (!normalized.startsWith(uploadsRoot + path.sep) && normalized !== uploadsRoot) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const fileStat = await stat(normalized);
    if (!fileStat.isFile()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = await readFile(normalized);
    const filename = segments[segments.length - 1] ?? "file";

    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": getUploadMimeType(filename),
        "Content-Length": String(fileStat.size),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
