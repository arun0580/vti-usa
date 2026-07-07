/** Public URL prefix for uploaded product CMS files (images & PDFs) */
export const PRODUCTS_UPLOAD_URL_PREFIX = "/uploads/products";

/** Filesystem folder under `public/` for product CMS uploads */
export const PRODUCTS_UPLOAD_DIR = "uploads/products";

export function isProductUploadPath(url: string): boolean {
  return url.startsWith(`${PRODUCTS_UPLOAD_URL_PREFIX}/`);
}

export function isPdfPath(url: string): boolean {
  return /\.pdf(?:$|[?#])/i.test(url);
}
