export type CmsItemModalMode = "add" | "edit";

export function cmsItemModalTitle(mode: CmsItemModalMode, label: string) {
  return mode === "add" ? `Add ${label}` : `Edit ${label}`;
}
