/** Public URL prefix for uploaded announcement banner images */
export const ANNOUNCEMENT_IMAGE_URL_PREFIX = "/announcement-images";

/** Filesystem folder under `public/` for announcement image uploads */
export const ANNOUNCEMENT_IMAGE_DIR = "announcement-images";

export function isAnnouncementImagePath(linkUrl: string): boolean {
  return (
    linkUrl.startsWith(`${ANNOUNCEMENT_IMAGE_URL_PREFIX}/`) ||
    linkUrl.startsWith("/uploads/announcements/")
  );
}
