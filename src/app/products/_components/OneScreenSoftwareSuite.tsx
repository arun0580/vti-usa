import type { ComponentType } from "react";

/* Line-art icon paths from Lucide (v0.460) — ISC License, https://lucide.dev */

function PenLineArtIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    </svg>
  );
}

function BookOpenLineArtIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function SettingsLineArtIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const APPS: {
  name: string;
  desc: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  {
    name: "Scribe",
    desc: "Built-in whiteboard for annotating, sketching, and saving multi-page sessions.",
    Icon: PenLineArtIcon,
  },
  {
    name: "QuizWiz",
    desc: "Live quizzes and polls students answer from any device — instant results on the panel.",
    Icon: BookOpenLineArtIcon,
  },
  {
    name: "Management software",
    desc: "Centrally monitor, push updates, and manage every OneScreen panel across your campus.",
    Icon: SettingsLineArtIcon,
  },
];

export function OneScreenSoftwareSuite() {
  return (
    <div className="mt-10 rounded-3xl border border-zinc-200/90 bg-white p-8 shadow-sm shadow-zinc-950/[0.04] sm:p-10 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-center">
        <p className="text-[12px] font-semibold tracking-[0.2em] text-red-600">
          ONESCREEN SOFTWARE SUITE
        </p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
          Three apps that ship with every panel.
        </h3>
      </div>

      <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-3">
        {APPS.map((app) => {
          const { Icon } = app;
          return (
            <div
              key={app.name}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-950/60 dark:shadow-none"
            >
              <div
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-100/90 bg-rose-50/90 text-red-600 dark:border-red-900/50 dark:bg-red-950/35 dark:text-red-400"
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-semibold text-zinc-950 dark:text-zinc-50">
                {app.name}
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {app.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-9 flex flex-col items-center sm:mt-10">
        <span
          className="mb-3 h-1.5 w-1.5 rounded-full bg-red-600"
          aria-hidden
        />
        <p className="max-w-xl text-center text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          Looking for the right OneScreen configuration?{" "}
          <a
            href="/contact"
            className="font-bold text-red-600 transition hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
          >
            Talk to your Virtual rep →
          </a>
        </p>
      </div>
    </div>
  );
}
