"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { hoverLift, tapPress } from "@/lib/motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200",
  secondary:
    "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900",
  ghost:
    "text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-900",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold capitalize transition-colors will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 disabled:pointer-events-none disabled:opacity-50";

type MotionButtonProps = Omit<
  React.ComponentProps<typeof motion.button>,
  "ref" | "variants"
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: MotionButtonProps) {
  return (
    <motion.button
      whileHover={hoverLift}
      whileTap={tapPress}
      className={cn(baseClass, variantClass[variant], sizeClass[size], className)}
      {...props}
    />
  );
}

const MotionLink = motion.create(Link);

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  target,
  rel,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}) {
  const computedRel =
    rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

  return (
    <MotionLink
      href={href}
      target={target}
      rel={computedRel}
      whileHover={hoverLift}
      whileTap={tapPress}
      className={cn(baseClass, variantClass[variant], sizeClass[size], className)}
    >
      {children}
    </MotionLink>
  );
}
