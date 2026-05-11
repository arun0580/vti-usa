/**
 * Shared animation primitives for the site.
 *
 * Goals: smooth, consistent, and perceptible (but never flashy). Every reveal
 * across every page uses the same variants, timing, and easing so the entire
 * product feels like one coherent system — similar to modern SaaS sites.
 *
 * Tuning notes (revised after first pass felt too subtle / abrupt):
 *  - Translate distance increased from 10px → 20px for clearer perception.
 *  - Base duration nudged up to 0.55s for smoothness without lag.
 *  - Stagger increased to 0.1s so list items read in sequence, not blur.
 *  - Hover scale increased to 1.03 for a slightly more confident response.
 *
 * Reduced-motion handling lives globally in `MotionProvider`
 * (`<MotionConfig reducedMotion="user">`), so individual components do not
 * need to opt in — animations resolve instantly to the end state for users
 * with `prefers-reduced-motion: reduce`.
 */

import type { Variants, Transition } from "motion/react";

/**
 * Quartic ease-out. Cubic-bezier `[0.22, 1, 0.36, 1]`.
 *
 * This curve starts fast and decelerates smoothly — the "premium" curve used
 * by Linear, Stripe, Vercel, etc.
 */
export const EASE_OUT: readonly [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export const DURATION = {
  /** Hover/tap micro-interactions. */
  fast: 0.2,
  /** Default reveal duration. */
  base: 0.55,
  /** Slower reveals for hero/page-level entrances. */
  slow: 0.7,
} as const;

export const transitionFast: Transition = {
  duration: DURATION.fast,
  ease: EASE_OUT,
};

export const transitionBase: Transition = {
  duration: DURATION.base,
  ease: EASE_OUT,
};

export const transitionSlow: Transition = {
  duration: DURATION.slow,
  ease: EASE_OUT,
};

/**
 * Default reveal variant: fade in + 20px upward slide.
 *
 * 20px is enough to be perceptible without feeling like a "jump" — at 60fps
 * it lasts ~33 frames, which the eye reads as a smooth motion rather than a
 * pop.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionBase,
  },
};

/** Plain fade for backdrop / overlay-style transitions. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionBase,
  },
};

/**
 * Container for staggered children. The container itself does not animate —
 * it only schedules its children's `visible` transitions sequentially.
 *
 * `staggerChildren: 0.1` gives a clean rhythm: ~10 items take 1s to fully
 * reveal, which sits below the "feels slow" threshold.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

/** Default child variant inside a `staggerContainer`. Inherits `fadeUp`. */
export const staggerItem: Variants = fadeUp;

/**
 * Hover target for interactive surfaces (buttons, cards, links).
 *
 * 1.03 sits at the sweet spot: noticeable on touch, but not "growing".
 * Pairs with `transitionFast` (0.2s) so the response feels immediate.
 */
export const hoverLift = {
  scale: 1.03,
  transition: transitionFast,
} as const;

/** Press feedback. Pairs with `hoverLift`. */
export const tapPress = {
  scale: 0.97,
  transition: transitionFast,
} as const;

/**
 * Shared `whileInView` viewport options.
 *
 * `once: true` prevents re-triggering on every scroll (#1 cause of animation
 * fatigue). `amount: 0.15` triggers when 15% of the element is on-screen —
 * earlier than the previous 20%, so reveals start before they catch the eye.
 */
export const viewportOnce = { once: true, amount: 0.15 } as const;

/**
 * Page-level transition. Used by `app/template.tsx`.
 *
 * A small (8px) downward fade gives the eye something to track during a
 * route change without competing with the per-section reveals that follow.
 */
export const pageFade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

/**
 * "Mask rise" container — editorial headline reveal where each line rises
 * from behind a clipped baseline. Pair with `maskRiseLine` on a child
 * `motion.span`, wrapped in a `<span class="block overflow-hidden">` so the
 * line is hidden until it animates into place.
 *
 * This is the standard treatment for big punchy display type (Apple, Stripe,
 * Linear). It reads as deliberate and confident — fits short, declarative
 * brand statements like "INFORM. ENGAGE. ELEVATE."
 */
export const maskRiseContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** A single rising line inside a `maskRiseContainer`. */
export const maskRiseLine: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};
