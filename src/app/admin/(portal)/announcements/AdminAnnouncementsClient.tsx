"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  AdminDataTable,
  type AdminDataTableColumn,
} from "@/components/admin/AdminDataTable";
import { StatusToggle } from "@/components/admin/StatusToggle";
import { confirmDeleteAnnouncement } from "@/lib/admin/announcement-confirm";
import { deleteAnnouncement, updateAnnouncement } from "@/lib/announcements/api";
import type { SiteAnnouncement } from "@/lib/announcements/types";
import { cn } from "@/lib/cn";

const fieldClass =
  "h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

function matchesAnnouncementSearch(
  announcement: SiteAnnouncement,
  query: string,
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  return (
    announcement.title.toLowerCase().includes(q) ||
    announcement.dateRangeLabel.toLowerCase().includes(q) ||
    announcement.dateFrom.includes(q) ||
    announcement.dateTo.includes(q) ||
    announcement.linkText.toLowerCase().includes(q) ||
    announcement.status.toLowerCase().includes(q)
  );
}

export function AdminAnnouncementsClient({
  initialAnnouncements,
}: {
  initialAnnouncements: SiteAnnouncement[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [searchQuery, setSearchQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  useEffect(() => {
    const success = searchParams.get("success");
    if (!success) return;

    setFlashMessage(success);
    router.replace("/admin/announcements", { scroll: false });

    const timer = window.setTimeout(() => setFlashMessage(null), 5000);
    return () => window.clearTimeout(timer);
  }, [searchParams, router]);

  const visible = announcements.filter((item) =>
    matchesAnnouncementSearch(item, searchQuery),
  );

  async function handleToggle(announcement: SiteAnnouncement, active: boolean) {
    if (busyId) return;
    setBusyId(announcement.id);
    setError(null);

    const result = await updateAnnouncement(announcement.id, {
      status: active ? "active" : "inactive",
    });

    setBusyId(null);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setAnnouncements((current) =>
      current.map((item) =>
        item.id === result.announcement.id ? result.announcement : item,
      ),
    );
    router.refresh();
  }

  async function handleDelete(announcement: SiteAnnouncement) {
    if (busyId) return;
    const confirmed = await confirmDeleteAnnouncement(announcement.title);
    if (!confirmed) return;

    setBusyId(announcement.id);
    setError(null);
    const result = await deleteAnnouncement(announcement.id);
    setBusyId(null);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setAnnouncements((current) =>
      current.filter((item) => item.id !== announcement.id),
    );
    router.refresh();
  }

  const columns = useMemo((): AdminDataTableColumn<SiteAnnouncement>[] => {
    return [
      {
        id: "serial",
        header: "S.No",
        cellClassName: "text-zinc-500 tabular-nums",
        cell: (_row, meta) => (meta ? meta.globalIndex + 1 : ""),
      },
      {
        id: "title",
        header: "Title",
        sortable: true,
        sortValue: (row) => row.title,
        cell: (row) => (
          <span className="font-semibold text-zinc-900">{row.title}</span>
        ),
      },
      {
        id: "dateRange",
        header: "Date",
        sortable: true,
        sortValue: (row) => row.dateFrom,
        cellClassName: "!whitespace-normal",
        cell: (row) => row.dateRangeLabel,
      },
      {
        id: "status",
        header: "Status",
        sortable: true,
        sortValue: (row) => row.status,
        cell: (row) => {
          const isBusy = busyId === row.id;
          return (
            <StatusToggle
              active={row.status === "active"}
              onChange={(active) => handleToggle(row, active)}
              disabled={isBusy}
              label={row.title}
            />
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        headerClassName: "text-right",
        cellClassName: "text-right align-middle",
        cell: (row) => {
          const isBusy = busyId === row.id;
          return (
            <div className="inline-flex items-center gap-2">
              <Link
                href={`/admin/announcements/${row.id}/edit`}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
              >
                <Pencil className="h-4 w-4" strokeWidth={1.75} />
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(row)}
                disabled={isBusy}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                Delete
              </button>
            </div>
          );
        },
      },
    ];
  }, [busyId]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
            Announcements
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Manage announcements shown at the top of the public site.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="sm:w-72">
            <label htmlFor="announcement-search" className="text-sm font-medium text-zinc-950">
              Search
            </label>
            <input
              id="announcement-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Title, date, or link text"
              className={cn("mt-1.5", fieldClass)}
            />
          </div>

          <Link
            href="/admin/announcements/new"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700"
          >
            New announcement
          </Link>
        </div>
      </div>

      {flashMessage ? (
        <div
          className="mt-4 flex items-start justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
          role="status"
        >
          <span>{flashMessage}</span>
          <button
            type="button"
            onClick={() => setFlashMessage(null)}
            className="shrink-0 text-emerald-600 transition-colors hover:text-emerald-800 cursor-pointer"
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      ) : null}

      {error ? (
        <p className="mt-4 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-6">
        <AdminDataTable
          data={visible}
          columns={columns}
          getRowId={(row) => row.id}
          defaultSort={{ columnId: "title", direction: "asc" }}
          emptyMessage={
            searchQuery.trim()
              ? "No announcements match your search."
              : announcements.length === 0
                ? "No announcements yet. Create one using the New announcement button."
                : "No announcements match your search."
          }
        />
      </div>
    </div>
  );
}
