"use client";

import { ExternalLink, RotateCcw, Save } from "lucide-react";

const saveBtnClass =
  "inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-60";

const revertBtnClass =
  "inline-flex h-10 items-center gap-2 rounded-lg bg-amber-100 px-4 text-sm font-semibold text-amber-900 shadow-sm transition-colors hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40";

const previewBtnClass =
  "inline-flex h-10 items-center gap-2 rounded-lg bg-zinc-100 px-4 text-sm font-semibold text-zinc-800 shadow-sm transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/40";

export function AdminPageToolbar({
  title,
  description,
  lastUpdated,
  previewHref,
  saving,
  onSave,
  onRevert,
  error,
  success,
}: {
  title: string;
  description: string;
  lastUpdated: string;
  previewHref: string;
  saving: boolean;
  onSave: () => void;
  onRevert: () => void;
  error: string | null;
  success: string | null;
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold capitalize text-zinc-950">{title}</p>
          <p className="text-xs text-zinc-500">{description}</p>
          <p className="text-xs text-zinc-400">{lastUpdated}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:ml-auto">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className={saveBtnClass}
          >
            <Save className="h-4 w-4" aria-hidden />
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button type="button" onClick={onRevert} className={revertBtnClass}>
            <RotateCcw className="h-4 w-4" aria-hidden />
            Revert Changes
          </button>
          <a
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            className={previewBtnClass}
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Preview Live Page
          </a>
        </div>
      </div>
      {error ? (
        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {success}
        </p>
      ) : null}
    </div>
  );
}
