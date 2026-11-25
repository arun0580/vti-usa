"use client";

import { useEffect, useState } from "react";
import { type CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import { cn } from "@/lib/cn";
import { ProductFileUploadField } from "./ProductFileUploadField";
import type { OneScreenProduct } from "./types";

const fieldClass =
  "mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

const textareaClass =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

function linksToText(links: OneScreenProduct["links"]) {
  return links.map((l) => `${l.label} | ${l.href}`).join("\n");
}

function textToLinks(value: string): OneScreenProduct["links"] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const sep = line.indexOf("|");
      if (sep === -1) return { label: line, href: "" };
      return {
        label: line.slice(0, sep).trim(),
        href: line.slice(sep + 1).trim(),
      };
    });
}

export function OneScreenProductEditModal({
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
  item: OneScreenProduct | null;
  onClose: () => void;
  onSave: (item: OneScreenProduct) => void;
}) {
  const [draft, setDraft] = useState<OneScreenProduct | null>(null);
  const [fileUploading, setFileUploading] = useState(false);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    if (item) setDraft(structuredClone(item));
  }, [open, item]);

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
        <h2 className="text-lg font-bold text-zinc-950">{title}</h2>
        <p className="mt-1 text-sm text-zinc-500">
          {mode === "add"
            ? "Fill in the details below."
            : "Edit all product details below."}
        </p>

        <div className="mt-5 space-y-4">
          <label className="block text-sm font-semibold text-zinc-800">
            Badge
            <input
              className={fieldClass}
              value={draft.badge}
              onChange={(e) => setDraft({ ...draft, badge: e.target.value })}
            />
          </label>

          <ProductFileUploadField
            label="Product image"
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

          <label className="block text-sm font-semibold text-zinc-800">
            Overlay title
            <input
              className={fieldClass}
              value={draft.overlayTitle}
              onChange={(e) =>
                setDraft({ ...draft, overlayTitle: e.target.value })
              }
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-800">
            Overlay subtitle
            <input
              className={fieldClass}
              value={draft.overlaySubtitle}
              onChange={(e) =>
                setDraft({ ...draft, overlaySubtitle: e.target.value })
              }
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
              className={fieldClass}
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-800">
            Body paragraph 1
            <textarea
              className={textareaClass}
              rows={3}
              value={draft.body1}
              onChange={(e) => setDraft({ ...draft, body1: e.target.value })}
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-800">
            Body paragraph 2
            <textarea
              className={textareaClass}
              rows={3}
              value={draft.body2}
              onChange={(e) => setDraft({ ...draft, body2: e.target.value })}
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-800">
            Highlights (one per line)
            <textarea
              className={textareaClass}
              rows={5}
              value={draft.highlights.join("\n")}
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
            Links (one per line: Label | URL)
            <textarea
              className={textareaClass}
              rows={4}
              value={linksToText(draft.links)}
              onChange={(e) =>
                setDraft({ ...draft, links: textToLinks(e.target.value) })
              }
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2">
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
                ? "Add product"
                : "Save product"}
          </button>
        </div>
      </div>
    </div>
  );
}
