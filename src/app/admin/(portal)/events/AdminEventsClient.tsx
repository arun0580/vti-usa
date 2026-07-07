"use client";

import { EventsClient } from "@/app/events/EventsClient";
import { saveEventsPageContent } from "@/lib/events-page/api";
import { mergeEventsContent } from "@/lib/events-page/merge";
import { AdminPageEditor } from "@/lib/page-cms/AdminPageEditor";
import type { AdminPageContent } from "@/lib/page-cms/types";
import type { EventsPageContent } from "@/lib/events-page/types";

export function AdminEventsClient({
  initialPage,
}: {
  initialPage: AdminPageContent<EventsPageContent>;
}) {
  return (
    <AdminPageEditor
      initialPage={initialPage}
      title="Events page editor"
      description="Events are sorted by date automatically. Upcoming events move to past after their date passes. Manage upcoming events; remove past events if needed."
      previewHref="/events"
      mergeContent={mergeEventsContent}
      saveContent={saveEventsPageContent}
    >
      {({ content, editable, onContentChange, editorKey }) => (
        <EventsClient
          key={editorKey}
          content={content}
          editable={editable}
          onContentChange={onContentChange}
        />
      )}
    </AdminPageEditor>
  );
}
