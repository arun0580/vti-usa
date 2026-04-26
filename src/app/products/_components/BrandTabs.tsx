'use client';

export function BrandTabs({
  active,
  onChange,
}: {
  active: 'virtual' | 'onescreen' | 'infocus';
  onChange: (next: 'virtual' | 'onescreen' | 'infocus') => void;
}) {
  const items = [
    { label: 'Virtual', value: 'virtual' },
    { label: 'OneScreen', value: 'onescreen' },
    { label: 'InFocus', value: 'infocus' },
  ] as const;

  return (
    <div
      className="flex w-full max-w-md justify-center gap-1 rounded-lg bg-zinc-100 p-1 text-sm text-zinc-500 dark:bg-zinc-900/50 dark:text-zinc-400"
      role="tablist"
    >
      {items.map((item) => {
        const isActive = item.value === active;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.value)}
            className={
              isActive
                ? 'flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm dark:bg-red-600'
                : 'flex-1 rounded-md px-4 py-2 text-sm font-semibold text-zinc-600 transition-colors hover:bg-white/80 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-950/60 dark:hover:text-zinc-50'
            }
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

