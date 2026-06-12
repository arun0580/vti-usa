import type {
  AnnouncementPayload,
  PublicAnnouncement,
  SiteAnnouncement,
} from "./types";

type ApiSuccess<T> = { success: true; message?: string; data: T };
type ApiError = { success: false; error: string; fields?: Record<string, string> };

async function parseJson<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchActiveAnnouncement(): Promise<PublicAnnouncement | null> {
  const res = await fetch("/api/announcements/active", { cache: "no-store" });
  const body = await parseJson<
    ApiSuccess<{ announcement: PublicAnnouncement | null }>
  >(res);
  if (!body?.success) return null;
  return body.data.announcement;
}

export async function fetchAdminAnnouncements(): Promise<
  { ok: true; announcements: SiteAnnouncement[] } | { ok: false; error: string }
> {
  const res = await fetch("/api/admin/announcements", { credentials: "include" });
  const body = await parseJson<
    ApiSuccess<{ announcements: SiteAnnouncement[] }> | ApiError
  >(res);
  if (!body || !body.success) {
    return { ok: false, error: body?.error ?? "Unable to load announcements." };
  }
  return { ok: true, announcements: body.data.announcements };
}

export async function createAnnouncement(
  payload: AnnouncementPayload,
): Promise<
  { ok: true; announcement: SiteAnnouncement; message: string } | { ok: false; error: string; fields?: Record<string, string> }
> {
  const res = await fetch("/api/admin/announcements", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const body = await parseJson<
    ApiSuccess<{ announcement: SiteAnnouncement }> | ApiError
  >(res);
  if (!body || !body.success) {
    return {
      ok: false,
      error: body?.error ?? "Could not create announcement.",
      fields: body?.fields,
    };
  }
  return {
    ok: true,
    announcement: body.data.announcement,
    message: body.message ?? "Announcement created.",
  };
}

export async function updateAnnouncement(
  id: string,
  payload: Partial<AnnouncementPayload>,
): Promise<
  { ok: true; announcement: SiteAnnouncement; message: string } | { ok: false; error: string; fields?: Record<string, string> }
> {
  const res = await fetch(`/api/admin/announcements/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const body = await parseJson<
    ApiSuccess<{ announcement: SiteAnnouncement }> | ApiError
  >(res);
  if (!body || !body.success) {
    return {
      ok: false,
      error: body?.error ?? "Could not update announcement.",
      fields: body?.fields,
    };
  }
  return {
    ok: true,
    announcement: body.data.announcement,
    message: body.message ?? "Announcement updated.",
  };
}

export async function deleteAnnouncement(
  id: string,
): Promise<{ ok: true; message: string } | { ok: false; error: string }> {
  const res = await fetch(`/api/admin/announcements/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const body = await parseJson<ApiSuccess<{ id: string }> | ApiError>(res);
  if (!body || !body.success) {
    return { ok: false, error: body?.error ?? "Could not delete announcement." };
  }
  return { ok: true, message: body.message ?? "Announcement deleted." };
}
