"use client";

import { useEffect, useState } from "react";
import { type CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import { cn } from "@/lib/cn";
import { ProductFileUploadField } from "./ProductFileUploadField";
import type {
  AccessoryItem,
  CatalogItem,
  InteractivePanel,
  ManagementApp,
} from "./types";

const fieldClass =
  "mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

const textareaClass =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

type EditTarget =
  | { kind: "panel"; item: InteractivePanel }
  | { kind: "catalog"; item: CatalogItem }
  | { kind: "accessory"; item: AccessoryItem }
  | { kind: "managementApp"; item: ManagementApp };

export function ProductEditModal({
  open,
  mode,
  title,
  target,
  onClose,
  onSave,
}: {
  open: boolean;
  mode: CmsItemModalMode;
  title: string;
  target: EditTarget | null;
  onClose: () => void;
  onSave: (item: InteractivePanel | CatalogItem | AccessoryItem | ManagementApp) => void;
}) {
  const [draft, setDraft] = useState<
    InteractivePanel | CatalogItem | AccessoryItem | ManagementApp | null
  >(null);
  const [fileUploading, setFileUploading] = useState(false);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    if (target) setDraft(structuredClone(target.item));
  }, [open, target]);

  if (!open || !target || !draft) return null;

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
          {mode === "add" ? "Fill in the details below." : "Edit all product details below."}
        </p>

        <div className="mt-5 space-y-4">
          <label className="block text-sm font-semibold text-zinc-800">
            Name
            <input
              className={fieldClass}
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </label>

          {target.kind !== "accessory" ? (
            <>
              <label className="block text-sm font-semibold text-zinc-800">
                Badge
                <input
                  className={fieldClass}
                  value={(draft as InteractivePanel | CatalogItem).badge}
                  onChange={(e) =>
                    setDraft({ ...draft, badge: e.target.value } as typeof draft)
                  }
                />
              </label>
              <label className="block text-sm font-semibold text-zinc-800">
                Sizes
                <input
                  className={fieldClass}
                  value={(draft as InteractivePanel | CatalogItem).sizes}
                  onChange={(e) =>
                    setDraft({ ...draft, sizes: e.target.value } as typeof draft)
                  }
                />
              </label>
              <ProductFileUploadField
                label="Product image"
                accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                value={(draft as InteractivePanel | CatalogItem).imageSrc}
                onChange={(imageSrc) =>
                  setDraft({ ...draft, imageSrc } as typeof draft)
                }
                hint="PNG, JPG, WebP, GIF, or SVG — up to 10 MB."
                onUploadingChange={setFileUploading}
              />
            </>
          ) : null}

          {target.kind === "catalog" ? (
            <>
              <label className="block text-sm font-semibold text-zinc-800">
                Video URL (optional)
                <input
                  className={fieldClass}
                  value={(draft as CatalogItem).videoSrc ?? ""}
                  onChange={(e) =>
                    setDraft({
                      ...(draft as CatalogItem),
                      videoSrc: e.target.value || undefined,
                    })
                  }
                />
              </label>
              <label className="block text-sm font-semibold text-zinc-800">
                CTA label
                <input
                  className={fieldClass}
                  value={(draft as CatalogItem).ctaLabel ?? ""}
                  onChange={(e) =>
                    setDraft({ ...(draft as CatalogItem), ctaLabel: e.target.value })
                  }
                />
              </label>
              <ProductFileUploadField
                label="Spec sheet PDF"
                accept="application/pdf,.pdf"
                value={(draft as CatalogItem).ctaHref ?? ""}
                onChange={(ctaHref) =>
                  setDraft({ ...(draft as CatalogItem), ctaHref })
                }
                hint="Upload a PDF spec sheet — up to 10 MB."
                onUploadingChange={setFileUploading}
              />
            </>
          ) : null}

          {target.kind === "accessory" ? (
            <label className="block text-sm font-semibold text-zinc-800">
              Icon key
              <select
                className={fieldClass}
                value={(draft as AccessoryItem).icon}
                onChange={(e) =>
                  setDraft({ ...(draft as AccessoryItem), icon: e.target.value })
                }
              >
                {["cpu", "video", "keyboard", "hand", "cable", "volume"].map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <label className="block text-sm font-semibold text-zinc-800">
            Description
            <textarea
              className={textareaClass}
              rows={3}
              value={draft.desc}
              onChange={(e) => setDraft({ ...draft, desc: e.target.value })}
            />
          </label>

          {target.kind === "panel" ? (
            <>
              <label className="block text-sm font-semibold text-zinc-800">
                Highlights (one per line)
                <textarea
                  className={textareaClass}
                  rows={5}
                  value={(draft as InteractivePanel).highlights.join("\n")}
                  onChange={(e) =>
                    setDraft({
                      ...(draft as InteractivePanel),
                      highlights: e.target.value
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </label>
              <label className="block text-sm font-semibold text-zinc-800">
                Action label
                <input
                  className={fieldClass}
                  value={(draft as InteractivePanel).actions[0]?.label ?? ""}
                  onChange={(e) =>
                    setDraft({
                      ...(draft as InteractivePanel),
                      actions: [
                        {
                          label: e.target.value,
                          href: (draft as InteractivePanel).actions[0]?.href ?? "",
                        },
                      ],
                    })
                  }
                />
              </label>
              <ProductFileUploadField
                label="Spec sheet PDF"
                accept="application/pdf,.pdf"
                value={(draft as InteractivePanel).actions[0]?.href ?? ""}
                onChange={(href) =>
                  setDraft({
                    ...(draft as InteractivePanel),
                    actions: [
                      {
                        label:
                          (draft as InteractivePanel).actions[0]?.label ??
                          "Download Spec Sheet",
                        href,
                      },
                    ],
                  })
                }
                hint="Upload a PDF spec sheet — up to 10 MB."
                onUploadingChange={setFileUploading}
              />
            </>
          ) : null}

          {target.kind === "managementApp" ? (
            <>
              <label className="block text-sm font-semibold text-zinc-800">
                Tag
                <input
                  className={fieldClass}
                  value={(draft as ManagementApp).tag}
                  onChange={(e) =>
                    setDraft({ ...(draft as ManagementApp), tag: e.target.value })
                  }
                />
              </label>
              <label className="block text-sm font-semibold text-zinc-800">
                Bullets (one per line)
                <textarea
                  className={textareaClass}
                  rows={4}
                  value={(draft as ManagementApp).bullets.join("\n")}
                  onChange={(e) =>
                    setDraft({
                      ...(draft as ManagementApp),
                      bullets: e.target.value
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </label>
            </>
          ) : null}
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
            {fileUploading ? "Uploading…" : mode === "add" ? "Add product" : "Save product"}
          </button>
        </div>
      </div>
    </div>
  );
}
