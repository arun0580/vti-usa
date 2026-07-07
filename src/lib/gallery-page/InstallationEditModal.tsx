"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { cmsItemModalTitle, type CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import { ProductFileUploadField } from "@/lib/products-page/ProductFileUploadField";
import { emptyGalleryInstallation } from "./defaultContent";
import { uploadGalleryFile } from "./uploadApi";
import type { GalleryInstallation, GallerySegment } from "./types";

const fieldClass =
  "mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

const textareaClass =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

const segments: GallerySegment[] = ["K-12", "Higher Ed", "Corporate", "Government"];

export function InstallationEditModal({
  open,
  mode,
  item,
  onClose,
  onSave,
}: {
  open: boolean;
  mode: CmsItemModalMode;
  item: GalleryInstallation | null;
  onClose: () => void;
  onSave: (item: GalleryInstallation) => void;
}) {
  const [draft, setDraft] = useState<GalleryInstallation | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    setDraft(structuredClone(mode === "add" ? emptyGalleryInstallation() : item));
  }, [open, mode, item]);

  if (!open || !draft) return null;

  function handleSave() {
    if (!draft) return;
    onSave(draft);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/50"
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-zinc-950">
          {mode === "add" ? "Add New" : cmsItemModalTitle(mode, "installation")}
        </h2>

        <div className="mt-5 space-y-4">
          <label className="block text-sm font-semibold text-zinc-800">
            Title
            <input
              className={fieldClass}
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />
          </label>
          <label className="block text-sm font-semibold text-zinc-800">
            Location / subtitle
            <textarea
              className={textareaClass}
              rows={2}
              value={draft.location}
              onChange={(e) => setDraft({ ...draft, location: e.target.value })}
            />
          </label>
          <label className="block text-sm font-semibold text-zinc-800">
            Segment
            <select
              className={fieldClass}
              value={draft.segment}
              onChange={(e) =>
                setDraft({ ...draft, segment: e.target.value as GallerySegment })
              }
            >
              {segments.map((segment) => (
                <option key={segment} value={segment}>
                  {segment}
                </option>
              ))}
            </select>
          </label>
          <ProductFileUploadField
            label="Installation photo"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            value={draft.imageSrc}
            onChange={(imageSrc) => setDraft({ ...draft, imageSrc })}
            hint="PNG, JPG, WebP, GIF, or SVG — up to 10 MB."
            onUploadingChange={setUploading}
            uploadFile={uploadGalleryFile}
          />
          <label className="block text-sm font-semibold text-zinc-800">
            Image alt text
            <input
              className={fieldClass}
              value={draft.imageAlt}
              onChange={(e) => setDraft({ ...draft, imageAlt: e.target.value })}
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-zinc-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={uploading}
            className={cn(
              "h-10 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60",
            )}
          >
            {uploading ? "Uploading…" : mode === "add" ? "Add New" : "Save installation"}
          </button>
        </div>
      </div>
    </div>
  );
}
