"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { formatResellerDate } from "@/components/admin/reseller-display";
import { AdminPageToolbar } from "./AdminPageToolbar";
import type { AdminPageContent } from "./types";

function cloneContent<T>(content: T): T {
  return structuredClone(content);
}

export function AdminPageEditor<T>({
  initialPage,
  title,
  description,
  previewHref,
  mergeContent,
  saveContent,
  children,
}: {
  initialPage: AdminPageContent<T>;
  title: string;
  description: string;
  previewHref: string;
  mergeContent: (stored?: Partial<T> | null) => T;
  saveContent: (content: T) => Promise<
    | { ok: true; message: string }
    | { ok: false; error: string }
  >;
  children: (props: {
    content: T;
    editable: true;
    onContentChange: Dispatch<SetStateAction<T>>;
    editorKey: number;
  }) => ReactNode;
}) {
  const router = useRouter();
  const initialBaseline = mergeContent(
    (initialPage.content as Partial<T> | null) ?? undefined,
  );
  const savedSnapshotRef = useRef<T>(cloneContent(initialBaseline));
  const [content, setContent] = useState<T>(() => cloneContent(initialBaseline));
  const [editorKey, setEditorKey] = useState(0);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleContentChange: Dispatch<SetStateAction<T>> = (action) => {
    setDirty(true);
    setSuccess(null);
    setContent(action);
  };

  async function handleSave() {
    const snapshotForSave = cloneContent(content);

    setSaving(true);
    setError(null);
    setSuccess(null);

    const result = await saveContent(snapshotForSave);
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
        title={title}
        description={description}
        lastUpdated={lastUpdated}
        previewHref={previewHref}
        saving={saving}
        onSave={handleSave}
        onRevert={handleRevert}
        error={error}
        success={success}
      />

      <div className="bg-white">
        {children({
          content,
          editable: true,
          onContentChange: handleContentChange,
          editorKey,
        })}
      </div>
    </div>
  );
}
