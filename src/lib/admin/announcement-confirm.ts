"use client";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const confirmButtonColor = "#dc2626";
const cancelButtonColor = "#71717a";

export async function confirmDeleteAnnouncement(title: string): Promise<boolean> {
  const result = await Swal.fire({
    title: "Delete announcement",
    html: `Are you sure you want to delete <strong>${escapeHtml(title)}</strong>? This cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    focusCancel: true,
  });
  return result.isConfirmed;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
