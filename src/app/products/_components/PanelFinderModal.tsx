"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const STEP1_OPTIONS = [
  "Classroom",
  "Conference / boardroom",
  "Lobby or large space",
  "Home / family room",
] as const;

const STEP2_OPTIONS = [
  "Under 20",
  "20 – 50",
  "50+",
] as const;

const STEP3_OPTIONS = [
  "Best touch experience",
  "Built-in video conferencing",
  "Lowest cost",
  "Ultra-wide collaboration",
] as const;

const STEPS = [
  { title: "Where will it live?", options: STEP1_OPTIONS },
  { title: "How many people typically?", options: STEP2_OPTIONS },
  { title: "What matters most?", options: STEP3_OPTIONS },
] as const;

export function PanelFinderModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  /** 0..(STEPS.length-1) = questions, STEPS.length = done */
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{
    location?: (typeof STEP1_OPTIONS)[number];
    people?: (typeof STEP2_OPTIONS)[number];
    priority?: (typeof STEP3_OPTIONS)[number];
  }>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(open);

  const goNext = useCallback(() => {
    setStep((s) => (s < STEPS.length - 1 ? s + 1 : s));
  }, []);

  const handleClose = useCallback(() => {
    setStep(0);
    setAnswers({});
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (open && !prevOpen.current) {
      setStep(0);
      setAnswers({});
    }
    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  const startOver = useCallback(() => {
    setAnswers({});
    setStep(0);
  }, []);

  const isLastStep = step === STEPS.length - 1;

  const selectOption = useCallback(
    (label: string) => {
      setAnswers((prev) => {
        if (step === 0) return { ...prev, location: label as never };
        if (step === 1) return { ...prev, people: label as never };
        if (step === 2) return { ...prev, priority: label as never };
        return prev;
      });
      if (isLastStep) setStep(STEPS.length);
      else goNext();
    },
    [goNext, isLastStep, step],
  );

  if (!open) return null;

  const inQuiz = step < STEPS.length;
  const current = inQuiz ? STEPS[step] : null;
  const isLast = isLastStep;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-zinc-950/50 backdrop-blur-[2px] dark:bg-zinc-950/70"
        onClick={handleClose}
        aria-label="Close dialog"
      />
      <div
        className="relative w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              id={titleId}
              className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              Find your panel
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Three quick questions. No email required.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={handleClose}
            className="rounded-md p-1.5 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            aria-label="Close"
          >
            <span aria-hidden className="text-xl leading-none">
              ×
            </span>
          </button>
        </div>

        {inQuiz && current ? (
          <div className="mt-6">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {current.title}
            </p>
            <ul className="mt-4 flex flex-col gap-2" role="list">
              {current.options.map((label) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => selectOption(label)}
                    className="group flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3.5 text-left text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
                  >
                    {label}
                    <span
                      className="text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                      aria-hidden
                    >
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s > 0 ? s - 1 : s))}
                className="mt-4 text-sm font-medium text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-400"
              >
                Back
              </button>
            ) : null}
          </div>
        ) : (
          <div className="mt-6">
            <div className="text-xs font-semibold tracking-[0.22em] text-zinc-500 uppercase dark:text-zinc-400">
              Recommended for you
            </div>

            <div className="mt-3 rounded-xl border border-zinc-200 bg-white p-4 text-zinc-900 shadow-sm shadow-zinc-950/5 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:shadow-none">
              <div className="text-base font-extrabold">Virtual VT13-IR Series</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                65&quot; · 75&quot; · 86&quot;
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                Our classroom flagship — 4K, 20-point IR touch, ready out of the
                box.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/contact"
                onClick={handleClose}
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Talk to a rep
              </a>
              <a
                href="#interactive-panels"
                onClick={handleClose}
                className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                See Virtual panels
              </a>
              <button
                type="button"
                onClick={startOver}
                className="inline-flex items-center justify-center rounded-lg px-2 py-2.5 text-sm font-semibold text-zinc-700 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:text-zinc-200"
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
