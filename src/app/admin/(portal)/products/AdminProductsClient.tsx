"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { ProductsPageClient } from "@/app/products/ProductsPageClient";
import { saveProductsPageContent } from "@/lib/products-page/api";
import { mergeProductsContent } from "@/lib/products-page/merge";
import { AdminPageToolbar } from "@/lib/page-cms/AdminPageToolbar";
import { formatResellerDate } from "@/components/admin/reseller-display";
import type { AdminPageContent, ProductsPageContent } from "@/lib/products-page/types";

function cloneContent(content: ProductsPageContent): ProductsPageContent {
  return structuredClone(content);
}

export function AdminProductsClient({
  initialPage,
}: {
  initialPage: AdminPageContent;
}) {
  const router = useRouter();
  const initialBaseline = mergeProductsContent(initialPage.content ?? undefined);
  const savedSnapshotRef = useRef<ProductsPageContent>(cloneContent(initialBaseline));
  const [content, setContent] = useState<ProductsPageContent>(() =>
    cloneContent(initialBaseline),
  );
  const [editorKey, setEditorKey] = useState(0);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleContentChange: Dispatch<SetStateAction<ProductsPageContent>> = (
    action,
  ) => {
    setDirty(true);
    setSuccess(null);
    setContent(action);
  };

  async function handleSave() {
    const snapshotForSave = cloneContent(content);

    setSaving(true);
    setError(null);
    setSuccess(null);

    const result = await saveProductsPageContent(snapshotForSave);
    setSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    const saved = cloneContent(snapshotForSave);
    savedSnapshotRef.current = saved;
    setContent(saved);
    setDirty(false);
    setSuccess(result.message);
    router.refresh();
  }

  function handleRevert() {
    if (!dirty) {
      setError(null);
      setSuccess("No unsaved changes to revert.");
      return;
    }

    if (
      !window.confirm(
        "Discard unsaved changes and restore the last saved version?",
      )
    ) {
      return;
    }

    setContent(cloneContent(savedSnapshotRef.current));
    setDirty(false);
    setEditorKey((key) => key + 1);
    setSuccess(null);
    setError(null);
  }

  const lastUpdated =
    initialPage.updatedBy && initialPage.updatedAt !== new Date(0).toISOString()
      ? `Last saved by ${initialPage.updatedBy.firstName} ${initialPage.updatedBy.lastName} · ${formatResellerDate(initialPage.updatedAt)}`
      : "Not saved yet — using default content";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <AdminPageToolbar
        title="Products page editor"
        description="Use the category tabs to switch sections. Click Edit to update a product or + Add Product to create one."
        lastUpdated={lastUpdated}
        previewHref="/products"
        saving={saving}
        onSave={handleSave}
        onRevert={handleRevert}
        error={error}
        success={success}
      />

      <div className="bg-white">
        <ProductsPageClient
          key={editorKey}
          content={content}
          editable
          onContentChange={handleContentChange}
        />
      </div>
    </div>
  );
}
