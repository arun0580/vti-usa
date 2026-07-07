"use client";

import type { Dispatch, SetStateAction } from "react";
import { useMemo, useState } from "react";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/site/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { EditableText, EditableTextarea } from "@/lib/products-page/EditableField";
import { CmsAddProductCard, CmsProductActions } from "@/lib/products-page/CmsProductActions";
import type { CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import { EventEditModal } from "@/lib/events-page/EventEditModal";
import { organizeEventsContent } from "@/lib/events-page/eventSchedule";
import type { EventsPageContent, PastEvent, UpcomingEvent } from "@/lib/events-page/types";

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="mx-3 inline-block h-1 w-1 rounded-full bg-zinc-300 align-middle"
    />
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5 text-zinc-400"
    >
      <path d="M7 3v3M17 3v3" />
      <path d="M4 7h16" />
      <path d="M5 6.5h14A2 2 0 0 1 21 8.5v12A2 2 0 0 1 19 22.5H5A2 2 0 0 1 3 20.5v-12A2 2 0 0 1 5 6.5Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5 text-zinc-400"
    >
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function LiveDotIcon() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-2 w-2 rounded-full bg-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.12)]"
    />
  );
}

function BulletCheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 text-red-600"
    >
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.7 10.2l2.1 2.1 4.6-4.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EventsClient({
  content,
  editable = false,
  onContentChange,
}: {
  content: EventsPageContent;
  editable?: boolean;
  onContentChange?: Dispatch<SetStateAction<EventsPageContent>>;
}) {
  const [editTarget, setEditTarget] = useState<
    | { kind: "upcoming"; mode: CmsItemModalMode; index?: number }
    | { kind: "past"; mode: CmsItemModalMode; index?: number }
    | null
  >(null);

  const organizedContent = useMemo(() => organizeEventsContent(content), [content]);
  const { hero, upcomingHeading, pastHeading, upcoming, past } = organizedContent;

  function updateContent(updater: (prev: EventsPageContent) => EventsPageContent) {
    if (!onContentChange) return;
    onContentChange((prev) => organizeEventsContent(updater(prev)));
  }

  function patchString(
    updater: (draft: EventsPageContent, value: string) => EventsPageContent,
  ): ((value: string) => void) | undefined {
    if (!editable || !onContentChange) return undefined;
    return (value: string) => onContentChange((prev) => updater(prev, value));
  }

  function removeEvent(kind: "upcoming" | "past", index: number) {
    if (!onContentChange) return;
    if (!window.confirm("Remove this event?")) return;
    updateContent((prev) => {
      const base = organizeEventsContent(prev);
      if (kind === "upcoming") {
        return { ...base, upcoming: base.upcoming.filter((_, i) => i !== index) };
      }
      return { ...base, past: base.past.filter((_, i) => i !== index) };
    });
  }

  function addUpcomingEvent() {
    setEditTarget({ kind: "upcoming", mode: "add" });
  }

  function saveEvent(item: UpcomingEvent | PastEvent) {
    if (!editTarget) return;
    updateContent((prev) => {
      const base = organizeEventsContent(prev);
      if (editTarget.mode === "add") {
        return { ...base, upcoming: [...base.upcoming, item as UpcomingEvent] };
      }
      if (editTarget.index === undefined) return base;
      if (editTarget.kind === "upcoming") {
        const next = [...base.upcoming];
        next[editTarget.index] = item as UpcomingEvent;
        return { ...base, upcoming: next };
      }
      const next = [...base.past];
      next[editTarget.index] = item as PastEvent;
      return { ...base, past: next };
    });
    setEditTarget(null);
  }

  const modalItem =
    editTarget?.mode === "edit" && editTarget.index !== undefined
      ? editTarget.kind === "upcoming"
        ? upcoming[editTarget.index] ?? null
        : past[editTarget.index] ?? null
      : null;

  return (
    <main>
      <section className="bg-white">
        <Container className="py-10 sm:py-16">
          <Reveal onMount className="max-w-3xl">
            <EditableText
              as="div"
              className="text-[12px] font-semibold tracking-[0.22em] text-red-600"
              value={hero.kicker}
              onChange={patchString((d, kicker) => ({
                ...d,
                hero: { ...d.hero, kicker },
              }))}
            />
            <h1 className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight text-zinc-950 sm:text-6xl sm:leading-[0.95]">
              <EditableText
                inline
                className="text-3xl font-extrabold leading-[1.05] tracking-tight text-zinc-950 sm:text-6xl sm:leading-[0.95]"
                value={hero.titleLine1}
                onChange={patchString((d, titleLine1) => ({
                  ...d,
                  hero: { ...d.hero, titleLine1 },
                }))}
              />
              <br />
              <EditableText
                inline
                className="text-3xl font-extrabold leading-[1.05] tracking-tight text-zinc-950 sm:text-6xl sm:leading-[0.95]"
                value={hero.titleLine2}
                onChange={patchString((d, titleLine2) => ({
                  ...d,
                  hero: { ...d.hero, titleLine2 },
                }))}
              />
            </h1>
            <EditableTextarea
              className="mt-4 max-w-2xl text-base leading-6 text-zinc-600 sm:text-[18px] sm:leading-7"
              value={hero.description}
              rows={3}
              onChange={patchString((d, description) => ({
                ...d,
                hero: { ...d.hero, description },
              }))}
            />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-zinc-200 bg-white">
        <Container className="py-12 sm:py-16">
          <Reveal className="flex items-baseline justify-between gap-6">
            <EditableText
              as="h2"
              className="text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl"
              value={upcomingHeading}
              onChange={patchString((d, upcomingHeading) => ({ ...d, upcomingHeading }))}
            />
            <div className="text-xs font-medium text-zinc-500">
              {upcoming.length} {upcoming.length === 1 ? "event" : "events"}
            </div>
          </Reveal>

          <RevealGroup disableAnimation={editable} className="mt-8 space-y-6">
            {upcoming.map((e, index) => (
              <RevealItem
                disableAnimation={editable}
                key={`upcoming-${index}-${e.title}`}
                className="relative rounded-3xl border border-red-200 bg-white p-5 shadow-sm ring-1 ring-red-100/60 transition-shadow hover:shadow-md hover:shadow-red-100/80 sm:p-10"
              >
                {editable ? (
                  <CmsProductActions
                    onEdit={() => setEditTarget({ kind: "upcoming", mode: "edit", index })}
                    onDelete={() => removeEvent("upcoming", index)}
                  />
                ) : null}
                <div className="flex flex-wrap items-center gap-x-1 gap-y-2 text-[10px] font-semibold leading-none tracking-[0.18em] text-zinc-500 sm:text-[11px] sm:tracking-[0.24em]">
                  <span className="rounded-full border border-red-200/70 bg-red-50 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-red-700">
                    {e.type.toUpperCase()}
                  </span>
                  <Dot />
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    <CalendarIcon />
                    <span>{e.date.toUpperCase()}</span>
                  </span>
                  <Dot />
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    <ClockIcon />
                    <span>{e.time.toUpperCase()}</span>
                  </span>
                  <Dot />
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    <LiveDotIcon />
                    <span>
                      {e.where.replace(/^Live webinar/, "Live Webinar").toUpperCase()}
                    </span>
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-extrabold leading-tight tracking-tight text-zinc-950 sm:text-3xl">
                    {e.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 sm:text-[15px]">{e.desc}</p>
                </div>

                <ul className="mt-4 grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span className="mt-1 shrink-0">
                        <BulletCheckIcon />
                      </span>
                      <span className="leading-6">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <ButtonLink
                    href={e.cta.href}
                    target="_blank"
                    variant="ghost"
                    className="!bg-red-600 !text-white shadow-sm hover:!bg-red-700 hover:!text-white focus-visible:ring-2 focus-visible:ring-red-500/40"
                    size="sm"
                  >
                    {e.cta.label}
                    <span aria-hidden="true">→</span>
                  </ButtonLink>
                </div>
              </RevealItem>
            ))}
            {editable ? (
              <CmsAddProductCard label="Add upcoming event" onClick={addUpcomingEvent} />
            ) : null}
          </RevealGroup>
        </Container>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <Container className="py-12 sm:py-16">
          <Reveal>
            <EditableText
              as="h2"
              className="text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl"
              value={pastHeading}
              onChange={patchString((d, pastHeading) => ({ ...d, pastHeading }))}
            />
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,560px)_1fr] lg:items-start">
            <RevealGroup disableAnimation={editable} className="grid gap-6">
              {past.map((e, index) => (
                <RevealItem
                  disableAnimation={editable}
                  key={`past-${index}-${e.title}`}
                  className="relative rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md hover:shadow-zinc-950/5"
                >
                  {editable ? (
                    <CmsProductActions onDelete={() => removeEvent("past", index)} />
                  ) : null}
                  <div className="text-xs font-semibold tracking-[0.18em] text-zinc-600">
                    {e.date} · {e.where}
                  </div>
                  <div className="mt-3 text-lg font-bold text-zinc-950">{e.title}</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{e.desc}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="hidden lg:block" aria-hidden="true" />
          </div>
        </Container>
      </section>

      <EventEditModal
        open={editTarget !== null}
        mode={editTarget?.mode ?? "edit"}
        kind={editTarget?.kind ?? "upcoming"}
        item={modalItem}
        onClose={() => setEditTarget(null)}
        onSave={saveEvent}
      />
    </main>
  );
}
