import { revalidatePath, revalidateTag } from "next/cache";

const CMS_PAGE_PATHS: Record<string, string> = {
  home: "/",
  products: "/products",
  gallery: "/gallery",
  events: "/events",
  about: "/about",
  resellers: "/resellers",
  contact: "/contact",
};

export function cmsPageCacheTag(slug: string) {
  return `cms-page-${slug}`;
}

/** Use on server-side fetches for public CMS pages. */
export function cmsPageFetchInit(slug: string): RequestInit {
  return { next: { tags: [cmsPageCacheTag(slug)] } };
}

/** Call after a successful admin CMS save so the live page updates immediately. */
export function revalidateCmsPage(slug: string) {
  revalidateTag(cmsPageCacheTag(slug), "max");
  const path = CMS_PAGE_PATHS[slug];
  if (path) {
    revalidatePath(path);
  }
}
