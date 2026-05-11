"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { fadeUp, viewportOnce } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /**
   * Optional delay (seconds). Useful when manually sequencing reveals outside
   * of a `RevealGroup`.
   */
  delay?: number;
  /**
   * When true, animate as soon as the element mounts. Default is to defer
   * until the element scrolls into the viewport (preferred for below-the-fold
   * content so animations are seen, not skipped).
   */
  onMount?: boolean;
  /** Render as `<section>`, `<article>`, etc. instead of `<div>`. */
  as?: "div" | "section" | "article" | "header" | "footer" | "li" | "ul";
};

/**
 * Subtle fade + 10px upward slide. The default reveal for headings, text
 * blocks, and individual section contents.
 *
 * Uses `whileInView` with `once: true` so the animation never re-fires on
 * scroll — meeting the "do not trigger heavy animations on every scroll
 * event" requirement.
 */
export function Reveal({
  delay,
  onMount = false,
  as = "div",
  transition,
  children,
  ...rest
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      variants={fadeUp}
      initial="hidden"
      {...(onMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: viewportOnce })}
      transition={delay !== undefined ? { ...transition, delay } : transition}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
