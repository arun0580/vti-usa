import { SimplePage } from "@/components/site/SimplePage";

export default function GalleryPage() {
  return (
    <SimplePage
      title="Installation Gallery"
      lead="A curated set of real-world installs across education, enterprise, and government."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className="aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-100 via-white to-zinc-200 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900"
          />
        ))}
      </div>
    </SimplePage>
  );
}

