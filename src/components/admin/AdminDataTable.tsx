"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SortDirection = "asc" | "desc";

export type AdminDataTableColumn<T> = {
  id: string;
  header: string;
  sortable?: boolean;
  sortValue?: (row: T) => string | number | Date | boolean;
  cell: (row: T) => ReactNode;
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

const thClass =
  "whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500";
const tdClass = "whitespace-nowrap px-4 py-4 text-sm text-zinc-700";

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
  emptyMessage = "No Records Found.",
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
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      {loading ? (
        <p className="px-6 py-10 text-sm text-zinc-500">Loading…</p>
      ) : sortedData.length === 0 ? (
        <p className="px-6 py-10 text-sm text-zinc-500">{emptyMessage}</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200">
              <thead className="bg-zinc-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      scope="col"
                      className={cn(thClass, column.headerClassName)}
                    >
                      {column.sortable ? (
                        <button
                          type="button"
                          onClick={() => toggleSort(column.id)}
                          className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-900 cursor-pointer"
                        >
                          {column.header}
                          <SortIndicator
                            active={sortColumnId === column.id}
                            direction={
                              sortColumnId === column.id ? sortDirection : "asc"
                            }
                          />
                        </button>
                      ) : (
                        column.header
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                {pageData.map((row) => (
                  <tr key={getRowId(row)} className="hover:bg-zinc-50/60">
                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className={cn(tdClass, column.cellClassName)}
                      >
                        {column.cell(row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-zinc-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-zinc-600">
              Showing {rangeStart}–{rangeEnd} of {sortedData.length}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-zinc-600">
                Rows
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="h-9 rounded-lg border border-zinc-200 bg-white px-2 text-sm text-zinc-950 cursor-pointer"
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
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-sm text-zinc-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
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
        active ? "text-red-600" : "text-zinc-400",
      )}
      aria-hidden
    >
      <span className={cn(active && direction === "asc" && "text-red-600")}>
        ▲
      </span>
      <span className={cn(active && direction === "desc" && "text-red-600")}>
        ▼
      </span>
    </span>
  );
}
