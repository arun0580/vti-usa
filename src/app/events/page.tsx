import { EventsClient } from "./EventsClient";
import { fetchEventsPageContent } from "@/lib/events-page/server";

export default async function EventsPage() {
  const content = await fetchEventsPageContent();
  return <EventsClient content={content} />;
}
