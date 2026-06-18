"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import {
  ResellerContactLine,
  ResellerStatusBadge,
  ResellerUserAvatar,
  formatResellerLocation,
  resellerBusinessTypeLabel,
} from "@/components/admin/reseller-display";
import {
  AdminDataTable,
  type AdminDataTableColumn,
} from "@/components/admin/AdminDataTable";
import { cn } from "@/lib/cn";
import {
  confirmApproveReseller,
  confirmBulkResellerAction,
  confirmRejectReseller,
  confirmRemoveReseller,
  showResellerActionError,
  showResellerActionSuccess,
} from "@/lib/admin/reseller-confirm";
import {
  approveReseller,
  deleteReseller,
  fetchAdminResellers,
  rejectReseller,
} from "@/lib/admin-auth/api";
import type { ResellerProfile } from "@/lib/reseller-auth/types";

type Filter = "pending" | "active" | "inactive" | "all";

const filters: { id: Filter; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "active", label: "Approved" },
  { id: "inactive", label: "Rejected" },
  { id: "all", label: "All" },
];

function matchesNameSearch(r: ResellerProfile, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const fullName = `${r.firstName} ${r.lastName}`.toLowerCase();
  return (
    fullName.includes(q) ||
    r.firstName.toLowerCase().includes(q) ||
    r.lastName.toLowerCase().includes(q) ||
    r.companyName.toLowerCase().includes(q) ||
    r.email.toLowerCase().includes(q)
  );
}

const fieldClass =
  "h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ResellerRowActions({
  reseller,
  busy,
  onApprove,
  onReject,
  onDelete,
}: {
  reseller: ResellerProfile;
  busy: boolean;
  onApprove: (reseller: ResellerProfile) => void;
  onReject: (reseller: ResellerProfile) => void;
  onDelete: (reseller: ResellerProfile) => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function updateMenuPosition() {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    setMenuStyle({
      position: "fixed",
      top: rect.bottom + 6,
      left: rect.right,
      transform: "translateX(-100%)",
      zIndex: 50,
      minWidth: "9.5rem",
    });
  }

  useEffect(() => {
    if (!open) return;

    updateMenuPosition();

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    }

    function handleReposition() {
      updateMenuPosition();
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open]);

  const menuItems: {
    label: string;
    onClick: () => void;
    destructive?: boolean;
  }[] = [
    {
      label: "View",
      onClick: () => {
        setOpen(false);
        router.push(`/admin/resellers/${reseller.id}`);
      },
    },
  ];

  if (reseller.status === "pending") {
    menuItems.push(
      {
        label: "Approve",
        onClick: () => {
          setOpen(false);
          onApprove(reseller);
        },
      },
      {
        label: "Reject",
        onClick: () => {
          setOpen(false);
          onReject(reseller);
        },
      },
    );
  }

  menuItems.push({
    label: "Remove",
    onClick: () => {
      setOpen(false);
      onDelete(reseller);
    },
    destructive: true,
  });

  const menu =
    open && !busy ? (
      <div
        ref={menuRef}
        style={menuStyle}
        className="overflow-hidden rounded-lg border border-zinc-200 bg-white py-1 shadow-lg"
      >
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className={cn(
              "flex w-full px-3.5 py-2 text-left text-sm transition-colors hover:bg-zinc-50 cursor-pointer",
              item.destructive
                ? "text-red-600 hover:bg-red-50"
                : "text-zinc-700",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    ) : null;

  return (
    <div className="flex justify-end">
      <button
        ref={buttonRef}
        type="button"
        disabled={busy}
        onClick={() => {
          setOpen((value) => {
            const next = !value;
            if (next) {
              requestAnimationFrame(updateMenuPosition);
            }
            return next;
          });
        }}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        {busy ? "…" : "Actions"}
        <IconChevronDown className="h-4 w-4 text-zinc-500" />
      </button>

      {typeof document !== "undefined" && menu
        ? createPortal(menu, document.body)
        : null}
    </div>
  );
}

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
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);

  const visible = resellers.filter((r) => matchesNameSearch(r, searchQuery));

  const selectedResellers = visible.filter((r) => selectedIds.has(r.id));
  const selectedPendingCount = selectedResellers.filter(
    (r) => r.status === "pending",
  ).length;

  function clearSelection() {
    setSelectedIds(new Set());
  }

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
    clearSelection();
    await reload(next);
  }

  async function handleApprove(reseller: ResellerProfile) {
    const name = `${reseller.firstName} ${reseller.lastName}`.trim();
    if (!(await confirmApproveReseller(name, reseller.companyName))) return;

    setActionId(reseller.id);
    setError(null);
    const result = await approveReseller(reseller.id);
    setActionId(null);
    if (!result.ok) {
      setError(result.error);
      await showResellerActionError(result.error);
      return;
    }
    setResellers((list) =>
      list.map((r) => (r.id === reseller.id ? result.reseller : r)),
    );
    await reload(filter);
    await showResellerActionSuccess(
      "Approved",
      "The reseller has been approved and notified by email.",
    );
  }

  async function handleReject(reseller: ResellerProfile) {
    const name = `${reseller.firstName} ${reseller.lastName}`.trim();
    if (!(await confirmRejectReseller(name, reseller.companyName))) return;

    setActionId(reseller.id);
    setError(null);
    const result = await rejectReseller(reseller.id);
    setActionId(null);
    if (!result.ok) {
      setError(result.error);
      await showResellerActionError(result.error);
      return;
    }
    setResellers((list) =>
      list.map((r) => (r.id === reseller.id ? result.reseller : r)),
    );
    await reload(filter);
    await showResellerActionSuccess(
      "Rejected",
      "The application was rejected and the reseller was notified by email.",
    );
  }

  async function handleDelete(reseller: ResellerProfile) {
    const name = `${reseller.firstName} ${reseller.lastName}`.trim();
    if (!(await confirmRemoveReseller(name, reseller.companyName))) return;

    setActionId(reseller.id);
    setError(null);
    const result = await deleteReseller(reseller.id);
    setActionId(null);
    if (!result.ok) {
      setError(result.error);
      await showResellerActionError(result.error);
      return;
    }
    setResellers((list) => list.filter((r) => r.id !== reseller.id));
    await showResellerActionSuccess(
      "Removed",
      "The reseller account has been permanently removed.",
    );
  }

  async function runBulk(
    action: "approve" | "reject" | "remove",
    targets: ResellerProfile[],
  ) {
    if (targets.length === 0) {
      await showResellerActionError(
        action === "remove"
          ? "Select at least one reseller to remove."
          : "Select at least one pending reseller.",
      );
      return;
    }

    if (!(await confirmBulkResellerAction(action, targets.length))) return;

    setBulkBusy(true);
    setError(null);

    let succeeded = 0;
    const failures: string[] = [];

    for (const reseller of targets) {
      const name = `${reseller.firstName} ${reseller.lastName}`.trim();
      const result =
        action === "approve"
          ? await approveReseller(reseller.id)
          : action === "reject"
            ? await rejectReseller(reseller.id)
            : await deleteReseller(reseller.id);

      if (result.ok) {
        succeeded += 1;
      } else {
        failures.push(`${name}: ${result.error}`);
      }
    }

    setBulkBusy(false);
    clearSelection();
    await reload(filter);

    const verb =
      action === "approve" ? "approved" : action === "reject" ? "rejected" : "removed";

    if (failures.length === 0) {
      await showResellerActionSuccess(
        "Done",
        `${succeeded} reseller${succeeded === 1 ? "" : "s"} ${verb} successfully.`,
      );
    } else {
      await showResellerActionError(
        `${succeeded} ${verb}, ${failures.length} failed.\n\n${failures.join("\n")}`,
      );
    }
  }

  function handleBulkApprove() {
    void runBulk(
      "approve",
      selectedResellers.filter((r) => r.status === "pending"),
    );
  }

  function handleBulkReject() {
    void runBulk(
      "reject",
      selectedResellers.filter((r) => r.status === "pending"),
    );
  }

  function handleBulkRemove() {
    void runBulk("remove", selectedResellers);
  }

  const columns = useMemo((): AdminDataTableColumn<ResellerProfile>[] => {
    return [
      {
        id: "user",
        header: "Contact",
        sortable: true,
        sortValue: (r) => `${r.firstName} ${r.lastName}`,
        cellClassName: "!whitespace-normal min-w-[260px]",
        cell: (r) => (
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/resellers/${r.id}`}
              className="shrink-0 transition-opacity hover:opacity-80"
            >
              <ResellerUserAvatar
                id={r.id}
                firstName={r.firstName}
                lastName={r.lastName}
              />
            </Link>
            <div className="min-w-0">
              <Link
                href={`/admin/resellers/${r.id}`}
                className="inline-flex max-w-full items-start gap-1.5 transition-opacity hover:opacity-80"
              >
                <span className="truncate font-semibold text-zinc-900">
                  {r.firstName} {r.lastName}
                </span>
                <span className="shrink-0 pt-px">
                  <ResellerStatusBadge status={r.status} />
                </span>
              </Link>
              <ResellerContactLine
                email={r.email}
                phone={r.phone}
                className="truncate text-zinc-500"
              />
            </div>
          </div>
        ),
      },
      {
        id: "company",
        header: "Company",
        sortable: true,
        sortValue: (r) => r.companyName,
        cell: (r) => (
          <span className="block max-w-[180px] truncate text-zinc-600">
            {r.companyName}
          </span>
        ),
      },
      {
        id: "location",
        header: "Location",
        sortable: true,
        sortValue: (r) => formatResellerLocation(r),
        cell: (r) => formatResellerLocation(r),
      },
      {
        id: "businessType",
        header: "Business type",
        sortable: true,
        sortValue: (r) => resellerBusinessTypeLabel(r.businessType),
        cell: (r) => (
          <span
            className="block max-w-[160px] truncate text-zinc-600"
            title={resellerBusinessTypeLabel(r.businessType)}
          >
            {resellerBusinessTypeLabel(r.businessType)}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        headerClassName: "text-right",
        cellClassName: "text-right align-middle",
        cell: (r) => (
          <ResellerRowActions
            reseller={r}
            busy={actionId === r.id}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={handleDelete}
          />
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
            Review and approve reseller portal applications.
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
              Search by name
            </label>
            <input
              id="reseller-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Contact or company name"
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

      {selectedResellers.length > 0 ? (
        <div className="mt-6 flex justify-end">
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleBulkApprove}
              disabled={bulkBusy || selectedPendingCount === 0}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              Approve
            </button>
            <button
              type="button"
              onClick={handleBulkReject}
              disabled={bulkBusy || selectedPendingCount === 0}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-amber-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={handleBulkRemove}
              disabled={bulkBusy}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        <AdminDataTable
          data={visible}
          columns={columns}
          getRowId={(r) => r.id}
          loading={loading}
          selectable
          selectedIds={selectedIds}
          onSelectedIdsChange={setSelectedIds}
          isRowSelectable={(r) => r.status === "pending"}
          defaultSort={{ columnId: "user", direction: "asc" }}
          emptyMessage={
            searchQuery.trim()
              ? "No resellers match your search."
              : "No resellers in this list."
          }
        />
      </div>
    </div>
  );
}
