import { Suspense } from "react";

import { GalleryClient } from "./GalleryClient";

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="py-14 sm:py-16">
          <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
            <div className="h-10 w-64 rounded-xl bg-zinc-100 dark:bg-zinc-900/50" />
            <div className="mt-4 h-6 w-[520px] max-w-full rounded-xl bg-zinc-100 dark:bg-zinc-900/50" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, idx) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  className="aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/20"
                />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <GalleryClient />
    </Suspense>
  );
}

