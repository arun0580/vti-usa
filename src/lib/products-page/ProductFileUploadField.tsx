"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { uploadProductFile } from "./uploadApi";
import { isPdfPath } from "./uploads";

const fileInputClass =
  "mt-1.5 block w-full text-sm text-zinc-600 file:mr-4 file:rounded-lg file:border-0 file:bg-red-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-red-700 hover:file:bg-red-100";

export function ProductFileUploadField({
  label,
  accept,
  value,
  onChange,
  hint,
  onUploadingChange,
  uploadFile = uploadProductFile,
}: {
  label: string;
  accept: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  onUploadingChange?: (uploading: boolean) => void;
  uploadFile?: (
    file: File,
  ) => Promise<{ ok: true; url: string } | { ok: false; error: string }>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    onUploadingChange?.(true);
    setError(null);

    const result = await uploadFile(file);

    setUploading(false);
    onUploadingChange?.(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    onChange(result.url);
  }

  const showImagePreview = Boolean(value) && !isPdfPath(value);

  return (
    <div>
      <span className="block text-sm font-semibold text-zinc-800">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFile}
        className={fileInputClass}
      />
      {hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}
      {uploading ? <p className="mt-2 text-sm text-zinc-500">Uploading…</p> : null}
      {error ? <p className="mt-2 text-xs font-medium text-red-600">{error}</p> : null}
      {value ? (
        <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
          <p className="text-xs font-medium text-zinc-500">Current file</p>
          <p className="mt-1 break-all text-sm text-zinc-800">{value}</p>
          {isPdfPath(value) ? (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
            >
              View PDF
            </a>
          ) : showImagePreview ? (
            <div className="relative mt-3 h-32 w-full max-w-xs overflow-hidden rounded-md border border-zinc-200 bg-white">
              <Image src={value} alt="Product preview" fill className="object-contain" sizes="320px" />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
