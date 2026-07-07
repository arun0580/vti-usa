"use client";

import { ContactClient } from "@/app/contact/ContactClient";
import { saveContactPageContent } from "@/lib/contact-page/api";
import { mergeContactContent } from "@/lib/contact-page/merge";
import { AdminPageEditor } from "@/lib/page-cms/AdminPageEditor";
import type { AdminPageContent } from "@/lib/page-cms/types";
import type { ContactPageContent } from "@/lib/contact-page/types";

export function AdminContactClient({
  initialPage,
}: {
  initialPage: AdminPageContent<ContactPageContent>;
}) {
  return (
    <AdminPageEditor
      initialPage={initialPage}
      title="Contact page editor"
      description="Click text to edit inline. Upload the hero mascot image. The contact form is unchanged."
      previewHref="/contact"
      mergeContent={mergeContactContent}
      saveContent={saveContactPageContent}
    >
      {({ content, editable, onContentChange, editorKey }) => (
        <ContactClient
          key={editorKey}
          content={content}
          editable={editable}
          onContentChange={onContentChange}
        />
      )}
    </AdminPageEditor>
  );
}
