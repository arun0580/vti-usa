"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SortDirection = "asc" | "desc";

export type AdminDataTableRowMeta = {
  rowIndex: number;
  globalIndex: number;
};

export type AdminDataTableColumn<T> = {
  id: string;
  header: string;
  sortable?: boolean;
  sortValue?: (row: T) => string | number | Date | boolean;
  cell: (row: T, meta?: AdminDataTableRowMeta) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

type AdminDataTableProps<T> = {
  data: T[];
  columns: AdminDataTableColumn<T>[];
  getRowId: (row: T) => string;
  loading?: boolean;
  emptyMessage?: string;
  defaultSort?: { columnId: string; direction: SortDirection };
  pageSizeOptions?: number[];
};

const thClass = "whitespace-nowrap px-6 py-4 text-left";
const headerLabelClass =
  "inline-flex items-center gap-1.5 text-sm font-semibold capitalize tracking-[0.06em] text-zinc-500";
const tdClass = "whitespace-nowrap px-6 py-5 text-sm text-zinc-600";

function compareValues(a: unknown, b: unknown): number {
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }
  if (typeof a === "boolean" && typeof b === "boolean") {
    return Number(a) - Number(b);
  }
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  return String(a ?? "").localeCompare(String(b ?? ""), undefined, {
    sensitivity: "base",
  });
}

export function AdminDataTable<T>({
  data,
  columns,
  getRowId,
  loading = false,
  emptyMessage = "No records found.",
  defaultSort,
  pageSizeOptions = [10, 25, 50],
}: AdminDataTableProps<T>) {
  const [sortColumnId, setSortColumnId] = useState(
    defaultSort?.columnId ?? columns[0]?.id ?? "",
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    defaultSort?.direction ?? "asc",
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0] ?? 10);

  useEffect(() => {
    setPage(1);
  }, [data.length, pageSize]);

  const sortedData = useMemo(() => {
    const column = columns.find((c) => c.id === sortColumnId);
    if (!column?.sortable || !column.sortValue) {
      return [...data];
    }

    const sorted = [...data].sort((a, b) => {
      const result = compareValues(column.sortValue!(a), column.sortValue!(b));
      return sortDirection === "asc" ? result : -result;
    });
    return sorted;
  }, [columns, data, sortColumnId, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [currentPage, pageSize, sortedData]);

  const rangeStart = sortedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, sortedData.length);

  function toggleSort(columnId: string) {
    if (sortColumnId === columnId) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
      return;
    }
    setSortColumnId(columnId);
    setSortDirection("asc");
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white">
      {loading ? (
        <p className="px-6 py-12 text-sm text-zinc-500">Loading…</p>
      ) : sortedData.length === 0 ? (
        <p className="px-6 py-12 text-sm text-zinc-500">{emptyMessage}</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-dashed border-zinc-200">
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      scope="col"
                      className={cn(thClass, column.headerClassName)}
                    >
                      <span
                        role={column.sortable ? "button" : undefined}
                        tabIndex={column.sortable ? 0 : undefined}
                        onClick={
                          column.sortable
                            ? () => toggleSort(column.id)
                            : undefined
                        }
                        onKeyDown={
                          column.sortable
                            ? (e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  toggleSort(column.id);
                                }
                              }
                            : undefined
                        }
                        className={cn(
                          headerLabelClass,
                          column.sortable &&
                            "cursor-pointer transition-colors hover:text-zinc-600",
                        )}
                      >
                        {column.header}
                        {column.sortable ? (
                          <SortIndicator
                            active={sortColumnId === column.id}
                            direction={
                              sortColumnId === column.id ? sortDirection : "asc"
                            }
                          />
                        ) : null}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageData.map((row, index) => {
                  const meta: AdminDataTableRowMeta = {
                    rowIndex: index,
                    globalIndex: (currentPage - 1) * pageSize + index,
                  };

                  return (
                    <tr
                      key={getRowId(row)}
                      className={cn(
                        "transition-colors hover:bg-zinc-50/50",
                        index < pageData.length - 1 &&
                          "border-b border-dashed border-zinc-200",
                      )}
                    >
                      {columns.map((column) => (
                        <td
                          key={column.id}
                          className={cn(tdClass, column.cellClassName)}
                        >
                          {column.cell(row, meta)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-dashed border-zinc-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-500">
              Showing {rangeStart}–{rangeEnd} of {sortedData.length}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-zinc-500">
                Rows
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="h-9 rounded-lg border border-zinc-200 bg-white px-2.5 text-sm text-zinc-700 cursor-pointer"
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-200 bg-white px-3.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-sm text-zinc-500">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-200 bg-white px-3.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SortIndicator({
  active,
  direction,
}: {
  active: boolean;
  direction: SortDirection;
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col text-[8px] leading-none",
        active ? "text-zinc-600" : "text-zinc-300",
      )}
      aria-hidden
    >
      <span className={cn(active && direction === "asc" && "text-zinc-600")}>
        ▲
      </span>
      <span className={cn(active && direction === "desc" && "text-zinc-600")}>
        ▼
      </span>
    </span>
  );
}
