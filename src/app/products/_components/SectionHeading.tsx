'use client';

export function SectionHeading({
  kicker,
  title,
  lead,
}: {
  kicker?: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-3xl">
      {kicker ? (
        <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
          {kicker}
        </div>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-3 text-zinc-600 dark:text-zinc-300">{lead}</p>
      ) : null}
    </div>
  );
}

