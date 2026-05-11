"use client";

import { motion } from "motion/react";
import { pageFade } from "@/lib/motion";

/**
 * Route-level fade transition.
 *
 * In the App Router, `template.tsx` re-mounts on every navigation (unlike
 * `layout.tsx`), which makes it the right place for page transitions. Header,
 * footer, and announcement banner live in `layout.tsx` and stay stable, so
 * only page content fades — no jarring reflow.
 *
 * Deliberately minimal: opacity only, no translate. Anything more starts to
 * feel slow on instant navigations.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageFade} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}
