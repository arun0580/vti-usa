"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { type CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import { cn } from "@/lib/cn";
import { ProductFileUploadField } from "./ProductFileUploadField";
import type { OneScreenGuruCard } from "./types";

const fieldClass =
  "mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

const textareaClass =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

export function OneScreenGuruEditModal({
  open,
  mode,
  title,
  item,
  onClose,
  onSave,
}: {
  open: boolean;
  mode: CmsItemModalMode;
  title: string;
  item: OneScreenGuruCard | null;
  onClose: () => void;
  onSave: (item: OneScreenGuruCard) => void;
}) {
  const [draft, setDraft] = useState<OneScreenGuruCard | null>(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    if (item) setDraft(structuredClone(item));
  }, [open, item]);

  if (!mounted || !open || !draft) return null;

  function handleSave() {
    if (!draft) return;
    onSave(draft);
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/50"
      />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
        <div className="shrink-0 border-b border-zinc-100 px-6 pb-4 pt-6">
          <h2 className="text-lg font-bold text-zinc-950">{title}</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {mode === "add"
              ? "Fill in the details below."
              : "Edit all card details below."}
          </p>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5">
          <label className="block text-sm font-semibold text-zinc-800">
            Badge
            <input
              className={fieldClass}
              value={draft.badge}
              onChange={(e) => setDraft({ ...draft, badge: e.target.value })}
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-800">
            Kicker
            <input
              className={fieldClass}
              value={draft.kicker}
              onChange={(e) => setDraft({ ...draft, kicker: e.target.value })}
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-800">
            Title
            <input
              autoFocus
              className={fieldClass}
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-800">
            Subtitle
            <input
              className={fieldClass}
              value={draft.subtitle}
              onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-800">
            Body
            <textarea
              className={textareaClass}
              rows={3}
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-800">
            Highlights (one per line)
            <textarea
              className={textareaClass}
              rows={5}
              value={(draft.highlights ?? []).join("\n")}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  highlights: e.target.value
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-800">
            Footer note
            <textarea
              className={textareaClass}
              rows={2}
              value={draft.footerNote ?? ""}
              onChange={(e) =>
                setDraft({ ...draft, footerNote: e.target.value })
              }
            />
          </label>

          <ProductFileUploadField
            label="Card image"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            value={draft.imageSrc}
            onChange={(imageSrc) => setDraft({ ...draft, imageSrc })}
            hint="PNG, JPG, WebP, GIF, or SVG — up to 10 MB."
            onUploadingChange={setFileUploading}
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

        <div className="flex shrink-0 justify-end gap-2 border-t border-zinc-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={fileUploading}
            className={cn(
              "h-10 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60",
            )}
          >
            {fileUploading
              ? "Uploading…"
              : mode === "add"
                ? "Add card"
                : "Save card"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
