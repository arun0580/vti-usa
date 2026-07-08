"use client";

import { Pencil, Trash2 } from "lucide-react";

export function CmsProductActions({
  onEdit,
  onDelete,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="absolute right-2 top-2 z-20 flex gap-1">
      {onEdit ? (
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex h-8 items-center gap-1 rounded-lg border border-red-200 bg-white/95 px-2 text-xs font-semibold text-red-700 shadow-sm hover:bg-red-50"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>
      ) : null}
      {onDelete ? (
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex h-8 items-center gap-1 rounded-lg border border-red-200 bg-white/95 px-2 text-xs font-semibold text-red-700 shadow-sm hover:bg-red-50"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Remove
        </button>
      ) : null}
    </div>
  );
}

export function CmsAddProductCard({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full min-h-[280px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-red-300/80 bg-red-50/30 p-6 text-center transition hover:border-red-400 hover:bg-red-50/60"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white">
        +
      </span>
      <span className="text-sm font-semibold text-red-700">{label}</span>
    </button>
  );
}
