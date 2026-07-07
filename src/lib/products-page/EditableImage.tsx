"use client";

import Image from "next/image";
import { ImageIcon, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { CmsEditModal, CmsModalField } from "@/lib/page-cms/CmsEditModal";
import { ProductFileUploadField } from "./ProductFileUploadField";
import { uploadProductFile } from "./uploadApi";

export function EditableImage({
  src,
  alt,
  onChange,
  onAltChange,
  className,
  imageClassName,
  sizes,
  fill = true,
  priority,
  uploadFile = uploadProductFile,
}: {
  src: string;
  alt: string;
  onChange?: (src: string) => void;
  onAltChange?: (alt: string) => void;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
  uploadFile?: (
    file: File,
  ) => Promise<{ ok: true; url: string } | { ok: false; error: string }>;
}) {
  const [open, setOpen] = useState(false);
  const [draftSrc, setDraftSrc] = useState(src);
  const [draftAlt, setDraftAlt] = useState(alt);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open) {
      setDraftSrc(src);
      setDraftAlt(alt);
    }
  }, [open, src, alt]);

  if (!onChange) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill={fill}
          className={imageClassName}
          sizes={sizes}
          priority={priority}
        />
      </div>
    );
  }

  function handleSave() {
    if (!onChange) return;
    onChange(draftSrc);
    onAltChange?.(draftAlt.trim());
    setOpen(false);
  }

  return (
    <>
      <div className={cn("group relative", className)}>
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <Image
            src={src}
            alt={alt}
            fill={fill}
            className={imageClassName}
            sizes={sizes}
            priority={priority}
          />
        </div>
        <div className="absolute right-2 top-2 z-20">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-8 items-center gap-1 rounded-lg border border-red-200 bg-white/95 px-2 text-xs font-semibold text-red-700 shadow-sm hover:bg-red-50"
          >
            <Pencil className="h-3.5 w-3.5" />
            Change image
          </button>
        </div>
      </div>

      <CmsEditModal
        open={open}
        title="Change image"
        onClose={() => setOpen(false)}
        onSave={handleSave}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
          {draftSrc ? (
            <Image
              src={draftSrc}
              alt={draftAlt || "Preview"}
              fill
              className="object-contain p-2"
              sizes="480px"
            />
          ) : (
            <div className="flex h-full min-h-40 items-center justify-center text-zinc-400">
              <ImageIcon className="h-10 w-10" />
            </div>
          )}
        </div>

        <ProductFileUploadField
          label="Upload new image"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          value={draftSrc}
          onChange={setDraftSrc}
          uploadFile={uploadFile}
          onUploadingChange={setUploading}
          hint={uploading ? "Uploading…" : undefined}
        />

        {onAltChange ? (
          <CmsModalField
            label="Alt text"
            value={draftAlt}
            onChange={setDraftAlt}
          />
        ) : null}
      </CmsEditModal>
    </>
  );
}
