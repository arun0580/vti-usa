"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  AdminDataTable,
  type AdminDataTableColumn,
} from "@/components/admin/AdminDataTable";
import {
  approveReseller,
  deleteReseller,
  fetchAdminResellers,
  rejectReseller,
} from "@/lib/admin-auth/api";
import {
  RESELLER_BUSINESS_TYPE_LABELS,
  type ResellerProfile,
} from "@/lib/reseller-auth/types";

type Filter = "pending" | "active" | "inactive" | "all";

const filters: { id: Filter; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "active", label: "Approved" },
  { id: "inactive", label: "Rejected" },
  { id: "all", label: "All" },
];

function statusBadge(status: ResellerProfile["status"]) {
  const styles: Record<ResellerProfile["status"], string> = {
    pending: "bg-amber-50 text-amber-800 ring-amber-200",
    active: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    inactive: "bg-zinc-100 text-zinc-700 ring-zinc-200",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset",
        styles[status],
      )}
    >
      {status}
    </span>
  );
}

function formatLocation(r: ResellerProfile): string {
  const parts = [r.city, r.state].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "—";
}

function businessTypeLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return RESELLER_BUSINESS_TYPE_LABELS[value] ?? value;
}

function matchesNameSearch(r: ResellerProfile, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const fullName = `${r.firstName} ${r.lastName}`.toLowerCase();
  return (
    fullName.includes(q) ||
    r.firstName.toLowerCase().includes(q) ||
    r.lastName.toLowerCase().includes(q) ||
    r.companyName.toLowerCase().includes(q)
  );
}

const fieldClass =
  "h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

export function AdminResellersClient({
  initialResellers,
}: {
  initialResellers: ResellerProfile[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [resellers, setResellers] = useState(initialResellers);
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const visible = resellers.filter((r) => matchesNameSearch(r, searchQuery));

  async function reload(nextFilter: Filter) {
    setLoading(true);
    setError(null);
    const result = await fetchAdminResellers(
      nextFilter === "all" ? undefined : nextFilter,
    );
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setResellers(result.resellers);
  }

  async function handleFilter(next: Filter) {
    setFilter(next);
    setResellers([]);
    await reload(next);
  }

  async function handleApprove(id: string) {
    setActionId(id);
    setError(null);
    const result = await approveReseller(id);
    setActionId(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setResellers((list) =>
      list.map((r) => (r.id === id ? result.reseller : r)),
    );
    await reload(filter);
  }

  async function handleReject(id: string) {
    if (!window.confirm("Reject This Reseller Application?")) return;
    setActionId(id);
    setError(null);
    const result = await rejectReseller(id);
    setActionId(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setResellers((list) =>
      list.map((r) => (r.id === id ? result.reseller : r)),
    );
    await reload(filter);
  }

  async function handleDelete(id: string, companyName: string) {
    if (
      !window.confirm(
        `Delete ${companyName}? This Permanently Removes The Reseller Account And Cannot Be Undone.`,
      )
    ) {
      return;
    }
    setActionId(id);
    setError(null);
    const result = await deleteReseller(id);
    setActionId(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setResellers((list) => list.filter((r) => r.id !== id));
  }

  const columns = useMemo((): AdminDataTableColumn<ResellerProfile>[] => {
    return [
      {
        id: "company",
        header: "Company",
        sortable: true,
        sortValue: (r) => r.companyName,
        cellClassName: "font-semibold text-zinc-950",
        cell: (r) => (
          <div className="max-w-[200px]">
            <p className="truncate">{r.companyName}</p>
            {r.about ? (
              <p className="mt-0.5 truncate text-xs font-normal text-zinc-500" title={r.about}>
                {r.about}
              </p>
            ) : null}
          </div>
        ),
      },
      {
        id: "contact",
        header: "Contact",
        sortable: true,
        sortValue: (r) => `${r.firstName} ${r.lastName}`,
        cell: (r) => `${r.firstName} ${r.lastName}`,
      },
      {
        id: "email",
        header: "Email",
        sortable: true,
        sortValue: (r) => r.email,
        cell: (r) => (
          <span className="block max-w-[220px] truncate" title={r.email}>
            {r.email}
          </span>
        ),
      },
      {
        id: "phone",
        header: "Phone",
        sortable: true,
        sortValue: (r) => r.phone,
        cell: (r) => r.phone || "—",
      },
      {
        id: "location",
        header: "Location",
        sortable: true,
        sortValue: (r) => formatLocation(r),
        cell: (r) => formatLocation(r),
      },
      {
        id: "businessType",
        header: "Business Type",
        sortable: true,
        sortValue: (r) => businessTypeLabel(r.businessType),
        cell: (r) => (
          <span className="block max-w-[180px] truncate" title={businessTypeLabel(r.businessType)}>
            {businessTypeLabel(r.businessType)}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        sortable: true,
        sortValue: (r) => r.status,
        cell: (r) => statusBadge(r.status),
      },
      {
        id: "actions",
        header: "Actions",
        headerClassName: "text-right",
        cellClassName: "text-right",
        cell: (r) => (
          <div className="inline-flex flex-wrap justify-end gap-2">
            {r.status === "pending" ? (
              <>
                <button
                  type="button"
                  disabled={actionId === r.id}
                  onClick={() => handleApprove(r.id)}
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-red-600 px-3 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  {actionId === r.id ? "…" : "Approve"}
                </button>
                <button
                  type="button"
                  disabled={actionId === r.id}
                  onClick={() => handleReject(r.id)}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 disabled:opacity-50 cursor-pointer"
                >
                  Reject
                </button>
              </>
            ) : null}
            <button
              type="button"
              disabled={actionId === r.id}
              onClick={() => handleDelete(r.id, r.companyName)}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50 cursor-pointer"
            >
              {actionId === r.id ? "…" : "Delete"}
            </button>
          </div>
        ),
      },
    ];
  }, [actionId]);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
            Manage Resellers
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Review And Approve Reseller Portal Applications.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end lg:justify-end">
          <div className="sm:w-48">
            <label htmlFor="reseller-filter" className="text-sm font-medium text-zinc-950">
              Status
            </label>
            <select
              id="reseller-filter"
              value={filter}
              disabled={loading}
              onChange={(e) => handleFilter(e.target.value as Filter)}
              className={cn("mt-1.5", fieldClass, "cursor-pointer disabled:opacity-60")}
            >
              {filters.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:w-64">
            <label htmlFor="reseller-search" className="text-sm font-medium text-zinc-950">
              Search By Name
            </label>
            <input
              id="reseller-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Contact Or Company Name"
              className={cn("mt-1.5", fieldClass)}
            />
          </div>
        </div>
      </div>

      {error ? (
        <p className="mt-4 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-6">
        <AdminDataTable
        data={visible}
        columns={columns}
        getRowId={(r) => r.id}
        loading={loading}
        defaultSort={{ columnId: "company", direction: "asc" }}
        emptyMessage={
          searchQuery.trim()
            ? "No Resellers Match Your Search."
            : "No Resellers In This List."
        }
        />
      </div>
    </div>
  );
}
