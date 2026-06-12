import type { AnnouncementPayload, SiteAnnouncement } from "./types";
import { isAnnouncementImagePath } from "./uploads";

export type LinkInputMode = "url" | "image";

export function emptyAnnouncementForm(): AnnouncementPayload {
  return {
    title: "",
    dateFrom: "",
    dateTo: "",
    linkText: "",
    linkUrl: "",
    status: "inactive",
  };
}

export function announcementToForm(
  announcement: SiteAnnouncement,
): AnnouncementPayload {
  return {
    title: announcement.title,
    dateFrom: announcement.dateFrom,
    dateTo: announcement.dateTo,
    linkText: announcement.linkText,
    linkUrl: announcement.linkUrl,
    status: announcement.status,
  };
}

export function inferLinkInputMode(linkUrl: string): LinkInputMode {
  if (isAnnouncementImagePath(linkUrl)) {
    return "image";
  }
  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(linkUrl) && linkUrl.startsWith("/")) {
    return "image";
  }
  return "url";
}

export function isImageLinkUrl(linkUrl: string): boolean {
  return inferLinkInputMode(linkUrl) === "image";
}
