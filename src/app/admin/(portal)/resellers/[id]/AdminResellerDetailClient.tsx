"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ResellerContactLine,
  ResellerEmailBadge,
  ResellerStatusBadge,
  ResellerUserAvatar,
  formatResellerDate,
  formatResellerLocation,
  resellerBusinessTypeLabel,
} from "@/components/admin/reseller-display";
import { cn } from "@/lib/cn";
import {
  confirmApproveReseller,
  confirmRejectReseller,
  confirmRemoveReseller,
  showResellerActionError,
  showResellerActionSuccess,
} from "@/lib/admin/reseller-confirm";
import {
  approveReseller,
  deleteReseller,
  rejectReseller,
} from "@/lib/admin-auth/api";
import type { ResellerProfile } from "@/lib/reseller-auth/types";

function DetailField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-[0.06em] text-zinc-400">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm text-zinc-800">{children}</dd>
    </div>
  );
}

function DetailCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-zinc-200/80 bg-white p-6",
        className,
      )}
    >
      <h2 className="text-sm font-semibold text-zinc-950">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function AdminResellerDetailClient({
  initialReseller,
}: {
  initialReseller: ResellerProfile;
}) {
  const router = useRouter();
  const [reseller, setReseller] = useState(initialReseller);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fullName = `${reseller.firstName} ${reseller.lastName}`.trim();

  async function handleApprove() {
    if (!(await confirmApproveReseller(fullName, reseller.companyName))) return;

    setBusy(true);
    setError(null);
    setMessage(null);
    const result = await approveReseller(reseller.id);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      await showResellerActionError(result.error);
      return;
    }
    setReseller(result.reseller);
    setMessage(result.message);
    router.refresh();
    await showResellerActionSuccess(
      "Approved",
      "The reseller has been approved and notified by email.",
    );
  }

  async function handleReject() {
    if (!(await confirmRejectReseller(fullName, reseller.companyName))) return;

    setBusy(true);
    setError(null);
    setMessage(null);
    const result = await rejectReseller(reseller.id);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      await showResellerActionError(result.error);
      return;
    }
    setReseller(result.reseller);
    setMessage(result.message);
    router.refresh();
    await showResellerActionSuccess(
      "Rejected",
      "The application was rejected and the reseller was notified by email.",
    );
  }

  async function handleDelete() {
    if (!(await confirmRemoveReseller(fullName, reseller.companyName))) return;

    setBusy(true);
    setError(null);
    const result = await deleteReseller(reseller.id);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      await showResellerActionError(result.error);
      return;
    }
    await showResellerActionSuccess(
      "Removed",
      "The reseller account has been permanently removed.",
    );
    router.push("/admin/resellers");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/admin/resellers"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-800"
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
        Back to resellers
      </Link>

      <div className="mt-6 rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <ResellerUserAvatar
              id={reseller.id}
              firstName={reseller.firstName}
              lastName={reseller.lastName}
              size="lg"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
                  {fullName}
                </h1>
                <ResellerStatusBadge status={reseller.status} size="md" />
                <ResellerEmailBadge verified={reseller.emailVerified} />
              </div>
              <ResellerContactLine
                email={reseller.email}
                phone={reseller.phone}
                linked
                className="mt-2 text-zinc-600"
              />
              <p className="mt-3 text-sm text-zinc-500">
                Applied {formatResellerDate(reseller.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {reseller.status === "pending" ? (
              <>
                <button
                  type="button"
                  disabled={busy}
                  onClick={handleApprove}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60 cursor-pointer"
                >
                  Approve
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={handleReject}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 disabled:opacity-60 cursor-pointer"
                >
                  Reject
                </button>
              </>
            ) : null}
            <button
              type="button"
              disabled={busy}
              onClick={handleDelete}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60 cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>

        {error ? (
          <p className="mt-4 text-sm font-medium text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="mt-4 text-sm font-medium text-emerald-700" role="status">
            {message}
          </p>
        ) : null}
      </div>

      <DetailCard title="Company & location" className="mt-6">
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <DetailField label="Company">
            {reseller.companyName || "—"}
          </DetailField>
          <DetailField label="Location">
            {formatResellerLocation(reseller)}
          </DetailField>
          <DetailField label="Business type">
            {resellerBusinessTypeLabel(reseller.businessType)}
          </DetailField>
        </dl>
      </DetailCard>

      <DetailCard title="About their business" className="mt-6">
        {reseller.about?.trim() ? (
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">
            {reseller.about}
          </p>
        ) : (
          <p className="text-sm text-zinc-500">No description provided.</p>
        )}
      </DetailCard>
    </div>
  );
}
