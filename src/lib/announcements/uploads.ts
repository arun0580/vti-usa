/** Public URL prefix for uploaded announcement banner files */
export const ANNOUNCEMENT_IMAGE_URL_PREFIX = "/announcement-images";

/** Filesystem folder under `public/` for announcement file uploads */
export const ANNOUNCEMENT_IMAGE_DIR = "announcement-images";

/** True when the link points at an uploaded announcement file (image or PDF) */
export function isAnnouncementImagePath(linkUrl: string): boolean {
  return (
    linkUrl.startsWith(`${ANNOUNCEMENT_IMAGE_URL_PREFIX}/`) ||
    linkUrl.startsWith("/uploads/announcements/")
  );
}

/** True when the link points at a PDF file */
export function isPdfUrl(linkUrl: string): boolean {
  return /\.pdf(?:$|[?#])/i.test(linkUrl);
}
