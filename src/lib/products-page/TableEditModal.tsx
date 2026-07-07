"use client";

import { useEffect, useState } from "react";
import type { CompareRow, DimensionRow } from "./types";

const fieldClass =
  "mt-1 h-9 w-full rounded-lg border border-zinc-200 bg-white px-2 text-sm text-zinc-950";

export function TableEditModal({
  open,
  title,
  mode,
  compareRows,
  dimensionRows,
  onClose,
  onSaveCompare,
  onSaveDimensions,
}: {
  open: boolean;
  title: string;
  mode: "compare" | "dimensions";
  compareRows?: CompareRow[];
  dimensionRows?: DimensionRow[];
  onClose: () => void;
  onSaveCompare?: (rows: CompareRow[]) => void;
  onSaveDimensions?: (rows: DimensionRow[]) => void;
}) {
  const [compareDraft, setCompareDraft] = useState<CompareRow[]>([]);
  const [dimensionDraft, setDimensionDraft] = useState<DimensionRow[]>([]);

  useEffect(() => {
    if (compareRows) setCompareDraft(structuredClone(compareRows));
    if (dimensionRows) setDimensionDraft(structuredClone(dimensionRows));
  }, [compareRows, dimensionRows, open]);

  if (!open) return null;

  function handleSave() {
    if (mode === "compare" && onSaveCompare) onSaveCompare(compareDraft);
    if (mode === "dimensions" && onSaveDimensions) onSaveDimensions(dimensionDraft);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-zinc-950/50" />
      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-zinc-950">{title}</h2>
        <p className="mt-1 text-sm text-zinc-500">Edit each row below.</p>

        {mode === "compare" ? (
          <div className="mt-4 space-y-4">
            {compareDraft.map((row, index) => (
              <div key={index} className="rounded-lg border border-zinc-200 p-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  {(["label", "a", "b", "c"] as const).map((key) => (
                    <label key={key} className="text-xs font-semibold text-zinc-700">
                      {key === "label" ? "Row label" : `Column ${key.toUpperCase()}`}
                      <input
                        className={fieldClass}
                        value={row[key]}
                        onChange={(e) => {
                          const next = [...compareDraft];
                          next[index] = { ...row, [key]: e.target.value };
                          setCompareDraft(next);
                        }}
                      />
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setCompareDraft(compareDraft.filter((_, i) => i !== index))}
                  className="mt-2 text-xs font-semibold text-red-600"
                >
                  Remove row
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setCompareDraft([
                  ...compareDraft,
                  { label: "New row", a: "", b: "", c: "" },
                ])
              }
              className="text-sm font-semibold text-red-600"
            >
              + Add row
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {dimensionDraft.map((row, index) => (
              <div key={index} className="rounded-lg border border-zinc-200 p-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  {(["size", "active", "outer", "weight", "vesa"] as const).map((key) => (
                    <label key={key} className="text-xs font-semibold capitalize text-zinc-700">
                      {key}
                      <input
                        className={fieldClass}
                        value={row[key]}
                        onChange={(e) => {
                          const next = [...dimensionDraft];
                          next[index] = { ...row, [key]: e.target.value };
                          setDimensionDraft(next);
                        }}
                      />
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setDimensionDraft(dimensionDraft.filter((_, i) => i !== index))}
                  className="mt-2 text-xs font-semibold text-red-600"
                >
                  Remove row
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setDimensionDraft([
                  ...dimensionDraft,
                  { size: "", active: "", outer: "", weight: "", vesa: "" },
                ])
              }
              className="text-sm font-semibold text-red-600"
            >
              + Add row
            </button>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold">
            Cancel
          </button>
          <button type="button" onClick={handleSave} className="h-10 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white">
            Save table
          </button>
        </div>
      </div>
    </div>
  );
}
