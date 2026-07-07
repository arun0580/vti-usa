"use client";

import { ResellerPortalClient } from "@/app/resellers/ResellerPortalClient";
import { saveResellersPageContent } from "@/lib/resellers-page/api";
import { mergeResellersContent } from "@/lib/resellers-page/merge";
import { AdminPageEditor } from "@/lib/page-cms/AdminPageEditor";
import type { AdminPageContent } from "@/lib/page-cms/types";
import type { ResellersPageContent } from "@/lib/resellers-page/types";

export function AdminResellersPageClient({
  initialPage,
}: {
  initialPage: AdminPageContent<ResellersPageContent>;
}) {
  return (
    <AdminPageEditor
      initialPage={initialPage}
      title="Resellers page editor"
      description="Edit the public /resellers portal landing page copy. Sign-in and sign-up forms are unchanged."
      previewHref="/resellers"
      mergeContent={mergeResellersContent}
      saveContent={saveResellersPageContent}
    >
      {({ content, editable, onContentChange, editorKey }) => (
        <ResellerPortalClient
          key={editorKey}
          content={content}
          editable={editable}
          onContentChange={onContentChange}
        />
      )}
    </AdminPageEditor>
  );
}
