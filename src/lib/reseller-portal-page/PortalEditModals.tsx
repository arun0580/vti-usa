"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { cmsItemModalTitle, type CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import { ProductFileUploadField } from "@/lib/products-page/ProductFileUploadField";
import { isPdfPath } from "@/lib/products-page/uploads";
import {
  emptyActionCard,
  emptyAnnouncement,
  emptyAssetItem,
  emptyTrainingCourse,
} from "./defaultContent";
import { PORTAL_ICON_OPTIONS } from "./icons";
import { uploadResellerPortalFile } from "./uploadApi";
import type {
  PortalActionCard,
  PortalAnnouncement,
  PortalAssetItem,
  PortalTrainingCourse,
  ResellerPortalPageContent,
} from "./types";

const fieldClass =
  "mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950";

const textareaClass =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950";

function ModalShell({
  title,
  children,
  onClose,
  onSave,
  saveLabel = "Save",
  uploading = false,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSave: () => void;
  saveLabel?: string;
  uploading?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-zinc-950/50" />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-zinc-950">{title}</h2>
        <div className="mt-5 space-y-4">{children}</div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-zinc-700">
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={uploading}
            className={cn(
              "h-10 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60",
            )}
          >
            {uploading ? "Uploading…" : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ActionCardEditModal({
  open,
  mode,
  item,
  onClose,
  onSave,
}: {
  open: boolean;
  mode: CmsItemModalMode;
  item: PortalActionCard | null;
  onClose: () => void;
  onSave: (item: PortalActionCard) => void;
}) {
  const [draft, setDraft] = useState<PortalActionCard | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    setDraft(structuredClone(mode === "add" ? emptyActionCard() : item));
  }, [open, mode, item]);

  if (!open || !draft) return null;

  return (
    <ModalShell
      title={cmsItemModalTitle(mode, "action card")}
      onClose={onClose}
      onSave={() => draft && onSave(draft)}
      saveLabel={mode === "add" ? "Add card" : "Save"}
      uploading={uploading}
    >
      <label className="block text-sm font-semibold text-zinc-800">
        Title
        <input className={fieldClass} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Description
        <textarea className={textareaClass} rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        CTA label
        <input className={fieldClass} value={draft.cta} onChange={(e) => setDraft({ ...draft, cta: e.target.value })} />
      </label>
      <ProductFileUploadField
        label="PDF file"
        accept="application/pdf,.pdf"
        value={isPdfPath(draft.href) ? draft.href : ""}
        onChange={(href) => setDraft({ ...draft, href })}
        uploadFile={uploadResellerPortalFile}
        onUploadingChange={setUploading}
        hint="Upload a PDF for download cards (e.g. price list)."
      />
      <label className="block text-sm font-semibold text-zinc-800">
        Link
        <input className={fieldClass} value={draft.href} onChange={(e) => setDraft({ ...draft, href: e.target.value })} placeholder="#, /path, https://..., or mailto:..." />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Icon
        <select className={fieldClass} value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })}>
          {PORTAL_ICON_OPTIONS.map((icon) => (
            <option key={icon} value={icon}>{icon}</option>
          ))}
        </select>
      </label>
    </ModalShell>
  );
}

export function AssetItemEditModal({
  open,
  mode,
  item,
  onClose,
  onSave,
}: {
  open: boolean;
  mode: CmsItemModalMode;
  item: PortalAssetItem | null;
  onClose: () => void;
  onSave: (item: PortalAssetItem) => void;
}) {
  const [draft, setDraft] = useState<PortalAssetItem | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    setDraft(structuredClone(mode === "add" ? emptyAssetItem() : item));
  }, [open, mode, item]);

  if (!open || !draft) return null;

  return (
    <ModalShell
      title={cmsItemModalTitle(mode, "asset")}
      onClose={onClose}
      onSave={() => draft && onSave(draft)}
      saveLabel={mode === "add" ? "Add asset" : "Save"}
      uploading={uploading}
    >
      <label className="block text-sm font-semibold text-zinc-800">
        Label
        <input className={fieldClass} value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} />
      </label>
      <ProductFileUploadField
        label="PDF file"
        accept="application/pdf,.pdf"
        value={draft.href}
        onChange={(href) => setDraft({ ...draft, href })}
        uploadFile={uploadResellerPortalFile}
        onUploadingChange={setUploading}
        hint="Upload a spec sheet or brochure PDF. Resellers can download it from the portal."
      />
    </ModalShell>
  );
}

export function TrainingCourseEditModal({
  open,
  mode,
  item,
  onClose,
  onSave,
}: {
  open: boolean;
  mode: CmsItemModalMode;
  item: PortalTrainingCourse | null;
  onClose: () => void;
  onSave: (item: PortalTrainingCourse) => void;
}) {
  const [draft, setDraft] = useState<PortalTrainingCourse | null>(null);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    setDraft(structuredClone(mode === "add" ? emptyTrainingCourse() : item));
  }, [open, mode, item]);

  if (!open || !draft) return null;

  return (
    <ModalShell
      title={cmsItemModalTitle(mode, "training course")}
      onClose={onClose}
      onSave={() => draft && onSave(draft)}
      saveLabel={mode === "add" ? "Add course" : "Save"}
    >
      <label className="block text-sm font-semibold text-zinc-800">
        Title
        <input className={fieldClass} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Meta line
        <input className={fieldClass} value={draft.meta} onChange={(e) => setDraft({ ...draft, meta: e.target.value })} placeholder="SELF-PACED · ~45 MIN" />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Description
        <textarea className={textareaClass} rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Link
        <input className={fieldClass} value={draft.href} onChange={(e) => setDraft({ ...draft, href: e.target.value })} placeholder="# or https://..." />
      </label>
    </ModalShell>
  );
}

export function AnnouncementEditModal({
  open,
  mode,
  item,
  onClose,
  onSave,
}: {
  open: boolean;
  mode: CmsItemModalMode;
  item: PortalAnnouncement | null;
  onClose: () => void;
  onSave: (item: PortalAnnouncement) => void;
}) {
  const [draft, setDraft] = useState<PortalAnnouncement | null>(null);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    setDraft(structuredClone(mode === "add" ? emptyAnnouncement() : item));
  }, [open, mode, item]);

  if (!open || !draft) return null;

  return (
    <ModalShell
      title={cmsItemModalTitle(mode, "announcement")}
      onClose={onClose}
      onSave={() => draft && onSave(draft)}
      saveLabel={mode === "add" ? "Add announcement" : "Save"}
    >
      <label className="block text-sm font-semibold text-zinc-800">
        Date
        <input className={fieldClass} value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} placeholder="APR 18, 2026" />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Title
        <input className={fieldClass} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Description
        <textarea className={textareaClass} rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Link (optional)
        <input className={fieldClass} value={draft.href} onChange={(e) => setDraft({ ...draft, href: e.target.value })} placeholder="/events or leave empty" />
      </label>
    </ModalShell>
  );
}

export function AccountTeamEditModal({
  open,
  accountTeam,
  onClose,
  onSave,
}: {
  open: boolean;
  accountTeam: ResellerPortalPageContent["accountTeam"];
  onClose: () => void;
  onSave: (accountTeam: ResellerPortalPageContent["accountTeam"]) => void;
}) {
  const [draft, setDraft] = useState<ResellerPortalPageContent["accountTeam"] | null>(null);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    setDraft(structuredClone(accountTeam));
  }, [open, accountTeam]);

  if (!open || !draft) return null;

  return (
    <ModalShell
      title="Edit account team contact"
      onClose={onClose}
      onSave={() => draft && onSave(draft)}
      saveLabel="Save"
    >
      <label className="block text-sm font-semibold text-zinc-800">
        Phone number (display)
        <input
          className={fieldClass}
          value={draft.phone}
          onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
          placeholder="1-800-555-VTI"
        />
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Phone link
        <input
          className={fieldClass}
          value={draft.phoneHref}
          onChange={(e) => setDraft({ ...draft, phoneHref: e.target.value })}
          placeholder="tel:+18005558884"
        />
        <span className="mt-1 block text-xs font-normal text-zinc-500">
          Use a `tel:` link so the red phone button dials correctly.
        </span>
      </label>
      <label className="block text-sm font-semibold text-zinc-800">
        Email
        <input
          className={fieldClass}
          type="email"
          value={draft.email}
          onChange={(e) => setDraft({ ...draft, email: e.target.value })}
          placeholder="partners@vtiusa.com"
        />
      </label>
    </ModalShell>
  );
}
