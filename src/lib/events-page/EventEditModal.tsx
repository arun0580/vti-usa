"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { cmsItemModalTitle, type CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import {
  eventDateFromInputValue,
  eventDateToInputValue,
  eventMonthFromInputValue,
  eventMonthToInputValue,
  eventTimeFromInputValue,
  eventTimeGetSuffix,
  eventTimeToInputValue,
  eventTimeWithSuffix,
} from "./dateFormat";
import { emptyPastEvent, emptyUpcomingEvent } from "./defaultContent";
import type { PastEvent, UpcomingEvent } from "./types";

const fieldClass =
  "mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

const textareaClass =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

export function EventEditModal({
  open,
  mode,
  kind,
  item,
  onClose,
  onSave,
}: {
  open: boolean;
  mode: CmsItemModalMode;
  kind: "upcoming" | "past";
  item: UpcomingEvent | PastEvent | null;
  onClose: () => void;
  onSave: (item: UpcomingEvent | PastEvent) => void;
}) {
  const [draft, setDraft] = useState<UpcomingEvent | PastEvent | null>(null);

  useEffect(() => {
    if (!open) {
      setDraft(null);
      return;
    }
    if (mode === "add") {
      setDraft(structuredClone(kind === "upcoming" ? emptyUpcomingEvent() : emptyPastEvent()));
      return;
    }
    setDraft(item ? structuredClone(item) : null);
  }, [open, mode, kind, item]);

  if (!open || !draft) return null;

  function handleSave() {
    if (!draft) return;
    onSave(draft);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/50"
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-zinc-950">
          {cmsItemModalTitle(
            mode,
            kind === "upcoming" ? "upcoming event" : "past event",
          )}
        </h2>

        <div className="mt-5 space-y-4">
          {kind === "upcoming" ? (
            <>
              <label className="block text-sm font-semibold text-zinc-800">
                Type badge
                <input
                  className={fieldClass}
                  value={(draft as UpcomingEvent).type}
                  onChange={(e) =>
                    setDraft({ ...(draft as UpcomingEvent), type: e.target.value })
                  }
                />
              </label>
              <label className="block text-sm font-semibold text-zinc-800">
                Date
                <input
                  type="date"
                  className={fieldClass}
                  value={eventDateToInputValue((draft as UpcomingEvent).date)}
                  onChange={(e) =>
                    setDraft({
                      ...(draft as UpcomingEvent),
                      date: eventDateFromInputValue(e.target.value),
                    })
                  }
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-zinc-800">
                  Time
                  <input
                    type="time"
                    className={fieldClass}
                    value={eventTimeToInputValue((draft as UpcomingEvent).time)}
                    onChange={(e) =>
                      setDraft({
                        ...(draft as UpcomingEvent),
                        time: eventTimeFromInputValue(
                          e.target.value,
                          (draft as UpcomingEvent).time,
                        ),
                      })
                    }
                  />
                </label>
                <label className="block text-sm font-semibold text-zinc-800">
                  Time zone
                  <input
                    className={fieldClass}
                    placeholder="Pacific"
                    value={eventTimeGetSuffix((draft as UpcomingEvent).time)}
                    onChange={(e) =>
                      setDraft({
                        ...(draft as UpcomingEvent),
                        time: eventTimeWithSuffix(
                          (draft as UpcomingEvent).time,
                          e.target.value,
                        ),
                      })
                    }
                  />
                </label>
              </div>
              <label className="block text-sm font-semibold text-zinc-800">
                Where
                <input
                  className={fieldClass}
                  value={(draft as UpcomingEvent).where}
                  onChange={(e) =>
                    setDraft({ ...(draft as UpcomingEvent), where: e.target.value })
                  }
                />
              </label>
            </>
          ) : (
            <>
              <label className="block text-sm font-semibold text-zinc-800">
                Date
                <input
                  type="month"
                  className={fieldClass}
                  value={eventMonthToInputValue((draft as PastEvent).date)}
                  onChange={(e) =>
                    setDraft({
                      ...(draft as PastEvent),
                      date: eventMonthFromInputValue(e.target.value),
                    })
                  }
                />
              </label>
              <label className="block text-sm font-semibold text-zinc-800">
                Where
                <input
                  className={fieldClass}
                  value={(draft as PastEvent).where}
                  onChange={(e) =>
                    setDraft({ ...(draft as PastEvent), where: e.target.value })
                  }
                />
              </label>
            </>
          )}

          <label className="block text-sm font-semibold text-zinc-800">
            Title
            <input
              className={fieldClass}
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />
          </label>
          <label className="block text-sm font-semibold text-zinc-800">
            Description
            <textarea
              className={textareaClass}
              rows={3}
              value={draft.desc}
              onChange={(e) => setDraft({ ...draft, desc: e.target.value })}
            />
          </label>

          {kind === "upcoming" ? (
            <>
              <label className="block text-sm font-semibold text-zinc-800">
                Bullets (one per line)
                <textarea
                  className={textareaClass}
                  rows={4}
                  value={(draft as UpcomingEvent).bullets.join("\n")}
                  onChange={(e) =>
                    setDraft({
                      ...(draft as UpcomingEvent),
                      bullets: e.target.value
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </label>
              <label className="block text-sm font-semibold text-zinc-800">
                CTA label
                <input
                  className={fieldClass}
                  value={(draft as UpcomingEvent).cta.label}
                  onChange={(e) =>
                    setDraft({
                      ...(draft as UpcomingEvent),
                      cta: { ...(draft as UpcomingEvent).cta, label: e.target.value },
                    })
                  }
                />
              </label>
              <label className="block text-sm font-semibold text-zinc-800">
                CTA link
                <input
                  className={fieldClass}
                  value={(draft as UpcomingEvent).cta.href}
                  onChange={(e) =>
                    setDraft({
                      ...(draft as UpcomingEvent),
                      cta: { ...(draft as UpcomingEvent).cta, href: e.target.value },
                    })
                  }
                />
              </label>
            </>
          ) : null}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-zinc-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className={cn(
              "h-10 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700",
            )}
          >
            Save event
          </button>
        </div>
      </div>
    </div>
  );
}
