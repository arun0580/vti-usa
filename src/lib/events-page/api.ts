import { savePageContent } from "@/lib/page-cms/api";
import { organizeEventsContent } from "./eventSchedule";
import type { EventsPageContent } from "./types";

export async function saveEventsPageContent(content: EventsPageContent) {
  const result = await savePageContent("events", organizeEventsContent(content));
  if (!result.ok) return result;
  return { ok: true as const, message: result.message };
}
