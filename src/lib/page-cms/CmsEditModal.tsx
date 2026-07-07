"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/site/Button";

export function CmsEditModal({
  open,
  title,
  onClose,
  onSave,
  children,
  saveLabel = "Save",
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: ReactNode;
  saveLabel?: string;
}) {
  if (!open) return null;

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
        <div className="mt-5 space-y-4">{children}</div>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            size="sm"
            variant="secondary"
            className="!border-zinc-200 !text-zinc-950 hover:!bg-zinc-50"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onSave}
            size="sm"
            className="!bg-red-600 !text-white hover:!bg-red-700"
          >
            {saveLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

const fieldClass =
  "mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

export function CmsModalField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "url";
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-zinc-800">
      {label}
      <input
        type={type}
        className={fieldClass}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
