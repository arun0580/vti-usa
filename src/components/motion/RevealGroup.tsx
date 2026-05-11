"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

type GroupProps = HTMLMotionProps<"div"> & {
  onMount?: boolean;
  as?: "div" | "ul" | "ol" | "section";
};

/**
 * Sequentially reveals child `<RevealItem>`s with the shared site stagger
 * (~70ms apart). The container itself stays invisible-to-motion; only the
 * children animate, so layout/scrolling cost is minimal.
 *
 * Pair with `<RevealItem>` for list/grid entrances.
 */
export function RevealGroup({
  onMount = false,
  as = "div",
  children,
  ...rest
}: GroupProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      variants={staggerContainer}
      initial="hidden"
      {...(onMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: viewportOnce })}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

type ItemProps = HTMLMotionProps<"div"> & {
  as?: "div" | "li" | "article" | "section" | "figure";
};

/** Single child of a `RevealGroup`. Inherits the shared `fadeUp` variant. */
export function RevealItem({ as = "div", children, ...rest }: ItemProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag variants={staggerItem} {...rest}>
      {children}
    </MotionTag>
  );
}
