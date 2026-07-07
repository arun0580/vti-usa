"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

type GroupProps = HTMLMotionProps<"div"> & {
  onMount?: boolean;
  /** Skip entrance animations — use in CMS editors when items are added dynamically. */
  disableAnimation?: boolean;
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
  disableAnimation = false,
  as = "div",
  children,
  ...rest
}: GroupProps) {
  if (disableAnimation) {
    const { className } = rest;
    const Tag = as;
    return <Tag className={className}>{children as ReactNode}</Tag>;
  }

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
  disableAnimation?: boolean;
  as?: "div" | "li" | "article" | "section" | "figure";
};

/** Single child of a `RevealGroup`. Inherits the shared `fadeUp` variant. */
export function RevealItem({
  as = "div",
  disableAnimation = false,
  children,
  ...rest
}: ItemProps) {
  if (disableAnimation) {
    const { className } = rest;
    const Tag = as;
    return <Tag className={className}>{children as ReactNode}</Tag>;
  }

  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag variants={staggerItem} {...rest}>
      {children}
    </MotionTag>
  );
}
