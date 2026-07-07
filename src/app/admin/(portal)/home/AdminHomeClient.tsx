"use client";

import { HomeClient } from "@/app/HomeClient";
import { saveHomePageContent } from "@/lib/home-page/api";
import { mergeHomeContent } from "@/lib/home-page/merge";
import { AdminPageEditor } from "@/lib/page-cms/AdminPageEditor";
import type { AdminPageContent } from "@/lib/page-cms/types";
import type { HomePageContent } from "@/lib/home-page/types";

export function AdminHomeClient({
  initialPage,
}: {
  initialPage: AdminPageContent<HomePageContent>;
}) {
  return (
    <AdminPageEditor
      initialPage={initialPage}
      title="Home page editor"
      description="Click text to edit inline. Use Edit on solution and testimonial cards for full details and image uploads."
      previewHref="/"
      mergeContent={mergeHomeContent}
      saveContent={saveHomePageContent}
    >
      {({ content, editable, onContentChange, editorKey }) => (
        <HomeClient
          key={editorKey}
          content={content}
          editable={editable}
          onContentChange={onContentChange}
        />
      )}
    </AdminPageEditor>
  );
}
