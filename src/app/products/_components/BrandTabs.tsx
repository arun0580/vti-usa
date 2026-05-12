"use client";

import { motion } from "motion/react";
import { tapPress } from "@/lib/motion";

export type InteractiveBrand = "virtual" | "onescreen" | "infocus" | "vivi";

export function BrandTabs({
  active,
  onChange,
}: {
  active: InteractiveBrand;
  onChange: (next: InteractiveBrand) => void;
}) {
  const items = [
    { label: "Virtual", value: "virtual" },
    { label: "OneScreen", value: "onescreen" },
    { label: "InFocus", value: "infocus" },
    { label: "Vivi", value: "vivi" },
  ] as const;

  return (
    <div
      className="flex w-full justify-center gap-1 rounded-lg bg-zinc-100 p-1 text-sm text-zinc-500"
      role="tablist"
    >
      {items.map((item) => {
        const isActive = item.value === active;
        return (
          <motion.button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.value)}
            whileTap={tapPress}
            className={
              isActive
                ? "flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm cursor-pointer sm:px-4"
                : "flex-1 rounded-md px-3 py-2 text-sm font-semibold text-zinc-600 transition-colors hover:bg-white/80 hover:text-zinc-900 cursor-pointer sm:px-4"
            }
          >
            {item.label}
          </motion.button>
        );
      })}
    </div>
  );
}
