import {
  getUpcomingEventInstant,
  parseEventDateValue,
} from "./dateFormat";
import type { EventsPageContent, PastEvent, UpcomingEvent } from "./types";

function formatPastEventDate(date: string): string {
  const parsed = parseEventDateValue(date);
  if (!parsed) return date;

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function upcomingToPastEvent(event: UpcomingEvent): PastEvent {
  return {
    date: formatPastEventDate(event.date),
    where: event.where,
    title: event.title,
    desc: event.desc,
  };
}

function isUpcomingEventPast(event: UpcomingEvent, now = Date.now()): boolean {
  const instant = getUpcomingEventInstant(event);
  if (instant === null) return false;
  return instant < now;
}

function compareUpcomingEvents(a: UpcomingEvent, b: UpcomingEvent): number {
  const aInstant = getUpcomingEventInstant(a) ?? Number.POSITIVE_INFINITY;
  const bInstant = getUpcomingEventInstant(b) ?? Number.POSITIVE_INFINITY;
  return aInstant - bInstant;
}

function comparePastEvents(a: PastEvent, b: PastEvent): number {
  const aInstant = parseEventDateValue(a.date)?.getTime() ?? 0;
  const bInstant = parseEventDateValue(b.date)?.getTime() ?? 0;
  return bInstant - aInstant;
}

/** Sort events by date and move expired upcoming events into past events. */
export function organizeEventsContent(
  content: EventsPageContent,
  now = Date.now(),
): EventsPageContent {
  const stillUpcoming: UpcomingEvent[] = [];
  const movedToPast: PastEvent[] = [];

  for (const event of content.upcoming) {
    if (isUpcomingEventPast(event, now)) {
      movedToPast.push(upcomingToPastEvent(event));
    } else {
      stillUpcoming.push(event);
    }
  }

  return {
    ...content,
    upcoming: [...stillUpcoming].sort(compareUpcomingEvents),
    past: [...content.past, ...movedToPast].sort(comparePastEvents),
  };
}
