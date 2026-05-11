"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { hoverLift, tapPress } from "@/lib/motion";

type Props = HTMLMotionProps<"div">;

/**
 * Lightweight wrapper for any non-button surface that should respond to hover
 * with the shared `scale: 1.02` lift. Pairs with the existing Tailwind
 * `hover:shadow-md` utilities to optionally bump elevation.
 *
 * `whileTap` adds press feedback on touch devices.
 */
export function HoverScale({ children, ...rest }: Props) {
  return (
    <motion.div whileHover={hoverLift} whileTap={tapPress} {...rest}>
      {children}
    </motion.div>
  );
}
