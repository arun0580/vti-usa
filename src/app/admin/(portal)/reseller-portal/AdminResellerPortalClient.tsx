"use client";

import { ResellerDashboardClient } from "@/app/resellers/dashboard/ResellerDashboardClient";
import { saveResellerPortalPageContent } from "@/lib/reseller-portal-page/api";
import { mergeResellerPortalContent } from "@/lib/reseller-portal-page/merge";
import { previewResellerProfile } from "@/lib/reseller-portal-page/previewReseller";
import { AdminPageEditor } from "@/lib/page-cms/AdminPageEditor";
import type { AdminPageContent } from "@/lib/page-cms/types";
import type { ResellerPortalPageContent } from "@/lib/reseller-portal-page/types";

export function AdminResellerPortalClient({
  initialPage,
}: {
  initialPage: AdminPageContent<ResellerPortalPageContent>;
}) {
  return (
    <AdminPageEditor
      initialPage={initialPage}
      title="Reseller portal page editor"
      description="Edit the logged-in reseller dashboard. Upload PDFs for spec sheets and download cards in the asset library."
      previewHref="/resellers/dashboard"
      mergeContent={mergeResellerPortalContent}
      saveContent={saveResellerPortalPageContent}
    >
      {({ content, editable, onContentChange, editorKey }) => (
        <ResellerDashboardClient
          key={editorKey}
          reseller={previewResellerProfile}
          content={content}
          editable={editable}
          onContentChange={onContentChange}
        />
      )}
    </AdminPageEditor>
  );
}
