import { mergeDeep } from "@/lib/page-cms/merge";
import { defaultEventsContent } from "./defaultContent";
import { organizeEventsContent } from "./eventSchedule";
import type { EventsPageContent } from "./types";

export function mergeEventsContent(
  stored?: Partial<EventsPageContent> | null,
): EventsPageContent {
  if (!stored) return organizeEventsContent(defaultEventsContent);
  return organizeEventsContent(mergeDeep(defaultEventsContent, stored));
}
