"use client";

import { MotionConfig } from "motion/react";
import { DURATION, EASE_OUT } from "@/lib/motion";

/**
 * Site-wide motion provider.
 *
 *  - `reducedMotion="user"` makes every Motion component automatically respect
 *    the user's `prefers-reduced-motion` system setting. Transforms / opacity
 *    transitions are skipped; animations resolve to their end state instantly.
 *  - The default `transition` mirrors `transitionBase` from `src/lib/motion.ts`
 *    (0.55s, ease-out-quart) so components that don't pass their own
 *    transition still feel identical to ones that do.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DURATION.base, ease: [...EASE_OUT] }}
    >
      {children}
    </MotionConfig>
  );
}
