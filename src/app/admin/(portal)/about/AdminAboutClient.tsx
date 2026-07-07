"use client";

import { AboutPageContent } from "@/app/about/AboutPageContent";
import { saveAboutPageContent } from "@/lib/about-page/api";
import { mergeAboutContent } from "@/lib/about-page/merge";
import { AdminPageEditor } from "@/lib/page-cms/AdminPageEditor";
import type { AdminPageContent } from "@/lib/page-cms/types";
import type { AboutPageContent as AboutContent } from "@/lib/about-page/types";

export function AdminAboutClient({
  initialPage,
}: {
  initialPage: AdminPageContent<AboutContent>;
}) {
  return (
    <AdminPageEditor
      initialPage={initialPage}
      title="About page editor"
      description="Click text to edit inline. Use Edit on team and value cards for photos and full details."
      previewHref="/about"
      mergeContent={mergeAboutContent}
      saveContent={saveAboutPageContent}
    >
      {({ content, editable, onContentChange, editorKey }) => (
        <AboutPageContent
          key={editorKey}
          content={content}
          editable={editable}
          onContentChange={onContentChange}
        />
      )}
    </AdminPageEditor>
  );
}
