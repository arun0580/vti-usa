"use client";

import { motion } from "motion/react";
import { hoverLift, tapPress } from "@/lib/motion";

export function CategoryCard({
  href,
  onClick,
  label,
  labelNode,
  icon,
  isActive,
  editable = false,
}: {
  href?: string;
  onClick?: () => void;
  label: string;
  labelNode?: React.ReactNode;
  icon: React.ReactNode;
  isActive?: boolean;
  editable?: boolean;
}) {
  const className = isActive
    ? "group relative flex h-24 w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border-2 border-red-600 bg-red-600 px-3 py-3 text-center text-red-50 shadow-sm shadow-zinc-950/10 transition-colors md:h-28"
    : "group relative flex h-24 w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border-2 border-zinc-200 bg-white px-3 py-3 text-center text-zinc-900 shadow-sm shadow-zinc-950/10 transition-colors hover:border-red-500/40 md:h-28";

  const inner = (
    <div className="flex flex-col items-center justify-center gap-1.5">
      <div
        className={
          isActive ? "text-white" : "text-red-600 group-hover:text-red-600"
        }
        aria-hidden="true"
      >
        {icon}
      </div>
      <div
        className={[
          "whitespace-normal text-center text-[11px] font-bold uppercase leading-tight tracking-wide",
          isActive ? "text-white" : "text-zinc-900",
          "md:text-xs",
        ].join(" ")}
      >
        {labelNode ?? label}
      </div>
    </div>
  );

  if (onClick && editable) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick();
        }}
        aria-pressed={isActive}
        className={`${className} cursor-pointer`}
      >
        {inner}
      </div>
    );
  }

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        aria-pressed={isActive}
        whileHover={hoverLift}
        whileTap={tapPress}
        className={className}
      >
        {inner}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      aria-current={isActive ? "page" : undefined}
      whileHover={hoverLift}
      whileTap={tapPress}
      className={className}
    >
      {inner}
    </motion.a>
  );
}
