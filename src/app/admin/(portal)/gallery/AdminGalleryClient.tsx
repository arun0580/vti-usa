"use client";

import { GalleryClient } from "@/app/gallery/GalleryClient";
import { saveGalleryPageContent } from "@/lib/gallery-page/api";
import { mergeGalleryContent } from "@/lib/gallery-page/merge";
import { AdminPageEditor } from "@/lib/page-cms/AdminPageEditor";
import type { AdminPageContent } from "@/lib/page-cms/types";
import type { GalleryPageContent } from "@/lib/gallery-page/types";

export function AdminGalleryClient({
  initialPage,
}: {
  initialPage: AdminPageContent<GalleryPageContent>;
}) {
  return (
    <AdminPageEditor
      initialPage={initialPage}
      title="Gallery page editor"
      description="Filter by segment tabs, click text to edit, or use Edit on installation cards to update photos and details."
      previewHref="/gallery"
      mergeContent={mergeGalleryContent}
      saveContent={saveGalleryPageContent}
    >
      {({ content, editable, onContentChange, editorKey }) => (
        <GalleryClient
          key={editorKey}
          content={content}
          editable={editable}
          onContentChange={onContentChange}
        />
      )}
    </AdminPageEditor>
  );
}
