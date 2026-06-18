"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { createAnnouncement, updateAnnouncement } from "@/lib/announcements/api";
import {
  announcementToForm,
  emptyAnnouncementForm,
  inferLinkInputMode,
  type LinkInputMode,
} from "@/lib/announcements/form";
import { isPdfUrl } from "@/lib/announcements/uploads";
import type { AnnouncementPayload, SiteAnnouncement } from "@/lib/announcements/types";

type AnnouncementFormData = Omit<AnnouncementPayload, "status">;

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

const fieldErrorClass =
  "border-red-300 focus:border-red-500 focus:ring-red-500/30";

async function uploadAnnouncementImage(
  file: File,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const body = new FormData();
  body.append("file", file);

  const res = await fetch("/api/admin/announcements/upload", {
    method: "POST",
    credentials: "include",
    body,
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    return { ok: false, error: json?.error ?? "File upload failed." };
  }
  return { ok: true, url: json.data.url as string };
}

export function AnnouncementForm({
  mode,
  initialAnnouncement,
}: {
  mode: "create" | "edit";
  initialAnnouncement?: SiteAnnouncement;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<AnnouncementFormData>(() => {
    const base = initialAnnouncement
      ? announcementToForm(initialAnnouncement)
      : emptyAnnouncementForm();
    const { status: _status, ...fields } = base;
    return fields;
  });
  const [linkMode, setLinkMode] = useState<LinkInputMode>(
    inferLinkInputMode(initialAnnouncement?.linkUrl ?? ""),
  );
  const [uploading, setUploading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function updateField<K extends keyof AnnouncementFormData>(
    key: K,
    value: AnnouncementFormData[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function switchLinkMode(next: LinkInputMode) {
    setLinkMode(next);
    if (next === "url") {
      updateField("linkUrl", "");
    } else {
      updateField("linkUrl", "");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFormError(null);
    const result = await uploadAnnouncementImage(file);
    setUploading(false);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    updateField("linkUrl", result.url);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || uploading) return;

    if (linkMode === "image" && !form.linkUrl.trim()) {
      setFieldErrors({ linkUrl: "Upload a file or switch to URL." });
      return;
    }

    setBusy(true);
    setFormError(null);
    setFieldErrors({});

    const result =
      mode === "create"
        ? await createAnnouncement({ ...form, status: "inactive" })
        : await updateAnnouncement(initialAnnouncement!.id, form);

    setBusy(false);

    if (!result.ok) {
      if (result.fields) setFieldErrors(result.fields);
      setFormError(result.error);
      return;
    }

    router.push(
      `/admin/announcements?success=${encodeURIComponent(result.message)}`,
    );
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/admin/announcements"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-800"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
          <path
            fillRule="evenodd"
            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
        Back to announcements
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
        {mode === "create" ? "Create Announcement" : "Edit Announcement"}
      </h1>
      <p className="mt-1 text-sm text-zinc-600">
        {mode === "create"
          ? "Add a new site announcement."
          : "Update this announcement."}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
        noValidate
      >
        {formError ? (
          <p className="text-sm font-medium text-red-600" role="alert">
            {formError}
          </p>
        ) : null}

        <div>
          <label htmlFor="banner-title" className="text-sm font-medium text-zinc-950">
            Title
          </label>
          <input
            id="banner-title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className={cn(fieldClass, fieldErrors.title && fieldErrorClass)}
          />
          {fieldErrors.title ? (
            <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.title}</p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="banner-date-from" className="text-sm font-medium text-zinc-950">
              Date From
            </label>
            <input
              id="banner-date-from"
              type="date"
              value={form.dateFrom}
              onChange={(e) => updateField("dateFrom", e.target.value)}
              className={cn(fieldClass, fieldErrors.dateFrom && fieldErrorClass)}
            />
            {fieldErrors.dateFrom ? (
              <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.dateFrom}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="banner-date-to" className="text-sm font-medium text-zinc-950">
              Date To
            </label>
            <input
              id="banner-date-to"
              type="date"
              value={form.dateTo}
              onChange={(e) => updateField("dateTo", e.target.value)}
              className={cn(fieldClass, fieldErrors.dateTo && fieldErrorClass)}
            />
            {fieldErrors.dateTo ? (
              <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.dateTo}</p>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="banner-link-text" className="text-sm font-medium text-zinc-950">
            Link Description
          </label>
          <input
            id="banner-link-text"
            value={form.linkText}
            onChange={(e) => updateField("linkText", e.target.value)}
            className={cn(fieldClass, fieldErrors.linkText && fieldErrorClass)}
          />
          {fieldErrors.linkText ? (
            <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.linkText}</p>
          ) : null}
        </div>

        <div>
          <span className="text-sm font-medium text-zinc-950">Link Target</span>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => switchLinkMode("url")}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-semibold transition-colors cursor-pointer",
                linkMode === "url"
                  ? "border-red-600 bg-red-50 text-red-700"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50",
              )}
            >
              URL
            </button>
            <button
              type="button"
              onClick={() => switchLinkMode("image")}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-semibold transition-colors cursor-pointer",
                linkMode === "image"
                  ? "border-red-600 bg-red-50 text-red-700"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50",
              )}
            >
              Image / PDF Upload
            </button>
          </div>

          {linkMode === "url" ? (
            <div className="mt-3">
              <label htmlFor="banner-link-url" className="sr-only">
                URL
              </label>
              <input
                id="banner-link-url"
                value={form.linkUrl}
                onChange={(e) => updateField("linkUrl", e.target.value)}
                placeholder="https://example.com/page or /contact"
                className={cn(fieldClass, fieldErrors.linkUrl && fieldErrorClass)}
              />
            </div>
          ) : (
            <div className="mt-3 space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,application/pdf,.pdf"
                onChange={handleImageSelect}
                className="block w-full text-sm text-zinc-600 file:mr-4 file:rounded-lg file:border-0 file:bg-red-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-red-700 hover:file:bg-red-100"
              />
              <p className="text-xs text-zinc-500">
                PNG, JPG, WebP, GIF, SVG, or PDF — up to 10 MB.
              </p>
              {uploading ? (
                <p className="text-sm text-zinc-500">Uploading File…</p>
              ) : null}
              {form.linkUrl ? (
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                  <p className="text-xs font-medium text-zinc-500">Uploaded File</p>
                  <p className="mt-1 break-all text-sm text-zinc-800">{form.linkUrl}</p>
                  {isPdfUrl(form.linkUrl) ? (
                    <a
                      href={form.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        aria-hidden
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                      </svg>
                      View PDF
                    </a>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={form.linkUrl}
                      alt="Uploaded announcement link preview"
                      className="mt-3 max-h-32 rounded-md border border-zinc-200 object-contain"
                    />
                  )}
                </div>
              ) : null}
            </div>
          )}

          {fieldErrors.linkUrl ? (
            <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.linkUrl}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={busy || uploading}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 cursor-pointer"
          >
            {busy ? "Saving…" : mode === "create" ? "Create Announcement" : "Save Changes"}
          </button>
          <Link
            href="/admin/announcements"
            className="inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold text-zinc-600 hover:text-zinc-900"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
