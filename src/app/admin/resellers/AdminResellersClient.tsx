"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/site/Container";
import { cn } from "@/lib/cn";
import {
  adminSignout,
  approveReseller,
  fetchAdminResellers,
  rejectReseller,
} from "@/lib/admin-auth/api";
import type { AdminProfile } from "@/lib/admin-auth/types";
import type { ResellerProfile } from "@/lib/reseller-auth/types";

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function AdminResellersClient({
  initialResellers,
  admin,
}: {
  initialResellers: ResellerProfile[];
  admin: AdminProfile;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("pending");
  const [resellers, setResellers] = useState(initialResellers);
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  /** List is always loaded from API for the selected tab (no client-side status filter). */
  const visible = resellers;

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
    if (!window.confirm("Reject this reseller application?")) return;
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

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    await adminSignout();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-[70vh] bg-zinc-50 py-10 sm:py-12">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-red-600">
              VTI Admin
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
              Reseller approvals
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Signed in as {admin.firstName} {admin.lastName} ({admin.email})
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex h-10 items-center justify-center self-start rounded-lg border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 disabled:opacity-60 cursor-pointer"
          >
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => handleFilter(f.id)}
              disabled={loading}
              className={cn(
                "rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors cursor-pointer",
                filter === f.id
                  ? "bg-red-600 text-white"
                  : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-50",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {error ? (
          <p className="mt-4 text-sm font-medium text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          {loading ? (
            <p className="px-6 py-10 text-sm text-zinc-500">Loading…</p>
          ) : visible.length === 0 ? (
            <p className="px-6 py-10 text-sm text-zinc-500">
              No resellers in this list.
            </p>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {visible.map((r) => (
                <li
                  key={r.id}
                  className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-zinc-950">
                        {r.companyName}
                      </h2>
                      {statusBadge(r.status)}
                      {!r.emailVerified ? (
                        <span className="text-xs font-medium text-amber-700">
                          Email not verified
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-zinc-600">
                      {r.firstName} {r.lastName} · {r.email} · {r.phone}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Applied {formatDate(r.createdAt)}
                    </p>
                  </div>

                  {r.status === "pending" ? (
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        disabled={actionId === r.id || !r.emailVerified}
                        title={
                          !r.emailVerified
                            ? "Reseller must verify email first"
                            : undefined
                        }
                        onClick={() => handleApprove(r.id)}
                        className="inline-flex h-10 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                      >
                        {actionId === r.id ? "…" : "Approve"}
                      </button>
                      <button
                        type="button"
                        disabled={actionId === r.id}
                        onClick={() => handleReject(r.id)}
                        className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 disabled:opacity-50 cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </div>
  );
}
