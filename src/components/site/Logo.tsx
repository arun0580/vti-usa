import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-red-600 text-sm font-semibold tracking-tight text-white">
        VTI
      </span>
      <span className="hidden leading-tight sm:block">
        <span className="block text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          VirtualTechnologies
        </span>
        <span className="block text-[11px] font-medium tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          INTERACTIVE DISPLAYS
        </span>
      </span>
      <span className="sr-only">VTI Home</span>
    </Link>
  );
}

