"use client";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const confirmButtonColor = "#dc2626";
const cancelButtonColor = "#71717a";

export async function confirmApproveReseller(
  name: string,
  companyName: string,
): Promise<boolean> {
  const result = await Swal.fire({
    title: "Approve Reseller",
    html: `Are you sure you want to approve <strong>${escapeHtml(name)}</strong>?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText: "Yes, approve",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    focusCancel: true,
  });
  return result.isConfirmed;
}

export async function confirmRejectReseller(
  name: string,
  companyName: string,
): Promise<boolean> {
  const result = await Swal.fire({
    title: "Reject Reseller",
    html: `Are you sure you want to reject <strong>${escapeHtml(name)}</strong>?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText: "Yes, reject",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    focusCancel: true,
  });
  return result.isConfirmed;
}

export async function confirmRemoveReseller(
  name: string,
  companyName: string,
): Promise<boolean> {
  const result = await Swal.fire({
    title: "Remove Reseller",
    html: `Are you sure you want to remove <strong>${escapeHtml(name)}</strong>?`,
    icon: "error",
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText: "Yes, remove",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    focusCancel: true,
  });
  return result.isConfirmed;
}

type BulkAction = "approve" | "reject" | "remove";

const bulkCopy: Record<
  BulkAction,
  { title: string; verb: string; icon: "question" | "warning" | "error"; confirm: string }
> = {
  approve: { title: "Approve Resellers", verb: "approve", icon: "question", confirm: "Yes, approve" },
  reject: { title: "Reject Resellers", verb: "reject", icon: "warning", confirm: "Yes, reject" },
  remove: { title: "Remove Resellers", verb: "remove", icon: "error", confirm: "Yes, remove" },
};

export async function confirmBulkResellerAction(
  action: BulkAction,
  count: number,
): Promise<boolean> {
  const copy = bulkCopy[action];
  const noun = count === 1 ? "reseller" : "resellers";
  const result = await Swal.fire({
    title: copy.title,
    html: `Are you sure you want to ${copy.verb} <strong>${count}</strong> ${noun}?`,
    icon: copy.icon,
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText: copy.confirm,
    cancelButtonText: "Cancel",
    reverseButtons: true,
    focusCancel: true,
  });
  return result.isConfirmed;
}

export async function showResellerActionSuccess(
  title: string,
  message: string,
): Promise<void> {
  await Swal.fire({
    title,
    text: message,
    icon: "success",
    confirmButtonColor,
    confirmButtonText: "OK",
  });
}

export async function showResellerActionError(message: string): Promise<void> {
  await Swal.fire({
    title: "Something went wrong",
    text: message,
    icon: "error",
    confirmButtonColor,
    confirmButtonText: "OK",
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
