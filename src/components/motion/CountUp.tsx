"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

type CountUpProps = {
  /** Final value the counter settles on. */
  to: number;
  /** Starting value. Defaults to 0. */
  from?: number;
  /** Duration in seconds. Defaults to 1.6s — long enough to *feel* counted, short enough to not stall the hero. */
  duration?: number;
  /** Delay before the count begins, in seconds. */
  delay?: number;
  /**
   * Formatter that maps the (interpolated, fractional) animated value to its
   * display string. Defaults to a locale-formatted integer.
   *
   * Note: the function reference is captured once per mount via a ref, so
   * you can safely pass an inline arrow function without restarting the
   * animation on every parent re-render.
   */
  format?: (value: number) => string;
  /**
   * When to start the count.
   *  - `"inView"` (default): start as soon as the element enters the viewport
   *    (good for stats below the fold).
   *  - `"mount"`: start on mount regardless of viewport position.
   */
  startOn?: "inView" | "mount";
  className?: string;
};

/**
 * Animated count-up number. Designed for stat callouts ("10K+ displays
 * installed", "99.9% uptime", etc.).
 *
 * Accessibility:
 *  - Respects `prefers-reduced-motion`: snaps directly to the final value.
 *  - Exposes the final value via `aria-label` so screen readers announce
 *    "10K+" rather than every intermediate frame.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  delay = 0,
  format = (v) => Math.round(v).toLocaleString(),
  startOn = "inView",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduce = useReducedMotion();

  // Keep the formatter stable across renders so the animation effect doesn't
  // re-run (and restart) every time the parent re-renders with a fresh
  // inline arrow function.
  const formatRef = useRef(format);
  formatRef.current = format;

  const [display, setDisplay] = useState(() =>
    formatRef.current(shouldReduce ? to : from),
  );

  useEffect(() => {
    if (shouldReduce) {
      setDisplay(formatRef.current(to));
      return;
    }
    const shouldStart = startOn === "mount" || inView;
    if (!shouldStart) return;

    const controls = animate(from, to, {
      duration,
      delay,
      ease: EASE_OUT,
      onUpdate: (value) => setDisplay(formatRef.current(value)),
    });

    return () => controls.stop();
  }, [inView, shouldReduce, startOn, from, to, duration, delay]);

  return (
    <span ref={ref} className={className} aria-label={formatRef.current(to)}>
      {display}
    </span>
  );
}
