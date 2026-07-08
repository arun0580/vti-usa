/** Public URL prefix for uploaded reseller portal CMS files */
export const RESELLER_PORTAL_UPLOAD_URL_PREFIX = "/uploads/reseller-portal";

/** Filesystem folder under `public/` for reseller portal CMS uploads */
export const RESELLER_PORTAL_UPLOAD_DIR = "uploads/reseller-portal";

export function isResellerPortalUploadPath(url: string): boolean {
  return url.startsWith(`${RESELLER_PORTAL_UPLOAD_URL_PREFIX}/`);
}
