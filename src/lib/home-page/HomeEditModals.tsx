"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { cmsItemModalTitle, type CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import { ProductFileUploadField } from "@/lib/products-page/ProductFileUploadField";
import { emptySolutionCard, emptyTestimonial } from "./defaultContent";
import { HOME_ICON_OPTIONS } from "./icons";
import { uploadHomeFile } from "./uploadApi";
import type { HomeSolutionCard, HomeTestimonial } from "./types";

const fieldClass =
  "mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950";

const textareaClass =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950";

export function SolutionCardEditModal({
  open,
  mode,
  item,
  onClose,
  onSave,
}: {
  open: boolean;
  mode: CmsItemModalMode;
  item: HomeSolutionCard | null;
  onClose: () => void;
  onSave: (item: HomeSolutionCard) => void;
}) {
  const [draft, setDraft] = useState<HomeSolutionCard | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    setDraft(structuredClone(mode === "add" ? emptySolutionCard() : item));
  }, [open, mode, item]);

  if (!open || !draft) return null;

  return (
    <ModalShell
      title={cmsItemModalTitle(mode, "solution card")}
      onClose={onClose}
      onSave={() => draft && onSave(draft)}
      uploading={uploading}
      saveLabel={mode === "add" ? "Add card" : "Save"}
    >
      <label className="block text-sm font-semibold text-zinc-800">
        Title
        <input className={fieldClass} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Description
        <textarea className={textareaClass} rows={3} value={draft.desc} onChange={(e) => setDraft({ ...draft, desc: e.target.value })} />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Icon
        <select className={fieldClass} value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })}>
          {HOME_ICON_OPTIONS.map((icon) => (
            <option key={icon} value={icon}>{icon}</option>
          ))}
        </select>
      </label>
      <ProductFileUploadField
        label="Card image"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        value={draft.imageSrc}
        onChange={(imageSrc) => setDraft({ ...draft, imageSrc })}
        uploadFile={uploadHomeFile}
        onUploadingChange={setUploading}
      />
    </ModalShell>
  );
}

export function TestimonialEditModal({
  open,
  mode,
  item,
  onClose,
  onSave,
}: {
  open: boolean;
  mode: CmsItemModalMode;
  item: HomeTestimonial | null;
  onClose: () => void;
  onSave: (item: HomeTestimonial) => void;
}) {
  const [draft, setDraft] = useState<HomeTestimonial | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    setDraft(structuredClone(mode === "add" ? emptyTestimonial() : item));
  }, [open, mode, item]);

  if (!open || !draft) return null;

  return (
    <ModalShell
      title={cmsItemModalTitle(mode, "testimonial")}
      onClose={onClose}
      onSave={() => draft && onSave(draft)}
      uploading={uploading}
      saveLabel={mode === "add" ? "Add testimonial" : "Save"}
    >
      <label className="block text-sm font-semibold text-zinc-800">
        Quote
        <textarea className={textareaClass} rows={4} value={draft.quote} onChange={(e) => setDraft({ ...draft, quote: e.target.value })} />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Name
        <input className={fieldClass} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Role
        <input className={fieldClass} value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Organization
        <input className={fieldClass} value={draft.org} onChange={(e) => setDraft({ ...draft, org: e.target.value })} />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Tag
        <input className={fieldClass} value={draft.tag} onChange={(e) => setDraft({ ...draft, tag: e.target.value })} />
      </label>
      <ProductFileUploadField
        label="Photo"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        value={draft.imageSrc}
        onChange={(imageSrc) => setDraft({ ...draft, imageSrc })}
        uploadFile={uploadHomeFile}
        onUploadingChange={setUploading}
      />
    </ModalShell>
  );
}

function ModalShell({
  title,
  children,
  onClose,
  onSave,
  uploading,
  saveLabel = "Save",
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSave: () => void;
  uploading?: boolean;
  saveLabel?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-zinc-950/50" />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-zinc-950">{title}</h2>
        <div className="mt-5 space-y-4">{children}</div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-zinc-700">Cancel</button>
          <button type="button" onClick={onSave} disabled={uploading} className={cn("h-10 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white disabled:opacity-60")}>
            {uploading ? "Uploading…" : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
