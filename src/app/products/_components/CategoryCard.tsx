'use client';

export function CategoryCard({
  href,
  onClick,
  label,
  icon,
  isActive,
}: {
  href?: string;
  onClick?: () => void;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}) {
  const className = isActive
    ? 'group relative flex h-24 w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border-2 border-red-600 bg-red-600 px-3 py-3 text-center text-red-50 shadow-sm shadow-zinc-950/10 transition-all md:h-28'
    : 'group relative flex h-24 w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border-2 border-zinc-200 bg-white px-3 py-3 text-center text-zinc-900 shadow-sm shadow-zinc-950/10 transition-all hover:-translate-y-0.5 hover:border-red-500/40 md:h-28';

  const inner = (
    <div className="flex flex-col items-center justify-center gap-1.5">
      <div
        className={
          isActive
            ? 'text-white'
            : 'text-red-600 group-hover:text-red-600'
        }
        aria-hidden="true"
      >
        {icon}
      </div>
      <div
        className={[
          'whitespace-normal text-center text-[11px] font-bold uppercase leading-tight tracking-wide',
          isActive
            ? 'text-white'
            : 'text-zinc-900',
          'md:text-xs',
        ].join(' ')}
      >
        {label}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={isActive}
        className={className}
      >
        {inner}
      </button>
    );
  }

  return (
    <a href={href} aria-current={isActive ? 'page' : undefined} className={className}>
      {inner}
    </a>
  );
}

