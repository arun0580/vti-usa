"use client";

import { useEffect, useState } from "react";
import { cmsItemModalTitle, type CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import { ProductFileUploadField } from "@/lib/products-page/ProductFileUploadField";
import { emptyAboutTeamMember, emptyAboutValueCard } from "./defaultContent";
import { ABOUT_VALUE_ICON_OPTIONS, AboutValueIcon } from "./ValueIcon";
import { uploadAboutFile } from "./uploadApi";
import type {
  AboutTeamMember,
  AboutValueCard,
  AboutValueIconId,
} from "./types";

const fieldClass =
  "mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

const textareaClass =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

export function TeamMemberEditModal({
  open,
  mode,
  item,
  onClose,
  onSave,
}: {
  open: boolean;
  mode: CmsItemModalMode;
  item: AboutTeamMember | null;
  onClose: () => void;
  onSave: (item: AboutTeamMember) => void;
}) {
  const [draft, setDraft] = useState<AboutTeamMember | null>(null);
  const [, setUploading] = useState(false);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    setDraft(structuredClone(mode === "add" ? emptyAboutTeamMember() : item));
  }, [open, mode, item]);

  if (!open || !draft) return null;

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
          {cmsItemModalTitle(mode, "team member")}
        </h2>
        <div className="mt-5 space-y-4">
          <label className="block text-sm font-semibold text-zinc-800">
            Name
            <input
              className={fieldClass}
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </label>
          <label className="block text-sm font-semibold text-zinc-800">
            Role
            <input
              className={fieldClass}
              value={draft.role}
              onChange={(e) => setDraft({ ...draft, role: e.target.value })}
            />
          </label>
          <label className="block text-sm font-semibold text-zinc-800">
            Location (state)
            <input
              className={fieldClass}
              value={draft.location}
              onChange={(e) => setDraft({ ...draft, location: e.target.value })}
            />
          </label>
          <label className="block text-sm font-semibold text-zinc-800">
            Image alt text
            <input
              className={fieldClass}
              value={draft.imageAlt}
              onChange={(e) => setDraft({ ...draft, imageAlt: e.target.value })}
            />
          </label>
          <ProductFileUploadField
            label="Photo"
            accept="image/*"
            value={draft.imageSrc}
            onChange={(imageSrc) => setDraft({ ...draft, imageSrc })}
            uploadFile={uploadAboutFile}
            onUploadingChange={setUploading}
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave(draft);
              onClose();
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            {mode === "add" ? "Add member" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ValueCardEditModal({
  open,
  mode,
  item,
  onClose,
  onSave,
}: {
  open: boolean;
  mode: CmsItemModalMode;
  item: AboutValueCard | null;
  onClose: () => void;
  onSave: (item: AboutValueCard) => void;
}) {
  const [draft, setDraft] = useState<AboutValueCard | null>(null);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    setDraft(structuredClone(mode === "add" ? emptyAboutValueCard() : item));
  }, [open, mode, item]);

  if (!open || !draft) return null;

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
          {cmsItemModalTitle(mode, "value card")}
        </h2>
        <div className="mt-5 space-y-4">
          <label className="block text-sm font-semibold text-zinc-800">
            Icon
            <select
              className={fieldClass}
              value={draft.icon}
              onChange={(e) =>
                setDraft({ ...draft, icon: e.target.value as AboutValueIconId })
              }
            >
              {ABOUT_VALUE_ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
            <span className="mt-2 inline-flex rounded-xl bg-[#FDF2F2] p-2">
              <AboutValueIcon id={draft.icon} />
            </span>
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
            Description
            <textarea
              className={textareaClass}
              rows={4}
              value={draft.desc}
              onChange={(e) => setDraft({ ...draft, desc: e.target.value })}
            />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave(draft);
              onClose();
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            {mode === "add" ? "Add card" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
