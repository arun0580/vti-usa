"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const editHint =
  "cursor-text rounded-md transition-colors hover:outline hover:outline-1 hover:outline-red-300/50 hover:outline-offset-2";

const inputEditRing =
  "rounded-md border border-red-300/60 bg-white/80 px-1.5 py-0.5 shadow-sm outline-none ring-2 ring-red-500/20";

type EditableTextProps = {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
  inline?: boolean;
};

export function EditableText({
  value,
  onChange,
  className,
  as: Tag = "span",
  inline = false,
}: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  if (!onChange) {
    return <Tag className={className}>{value}</Tag>;
  }

  function commit() {
    onChange?.(draft);
    setEditing(false);
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit();
          }
          if (e.key === "Escape") {
            setDraft(value);
            setEditing(false);
          }
        }}
        className={cn(
          className,
          inputEditRing,
          inline ? "inline-block w-auto min-w-[8ch] max-w-full" : "block w-full",
          "font-[inherit] leading-[inherit] tracking-[inherit]",
        )}
        aria-label="Editable text"
      />
    );
  }

  return (
    <Tag
      className={cn(className, editHint, inline && "inline")}
      onClick={() => setEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setEditing(true);
        }
      }}
      role="button"
      tabIndex={0}
      title="Click to edit"
    >
      {value || "\u00a0"}
    </Tag>
  );
}

export function EditableTextarea({
  value,
  onChange,
  className,
  rows = 3,
}: {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  rows?: number;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  useEffect(() => {
    if (editing) textareaRef.current?.focus();
  }, [editing]);

  if (!onChange) {
    return <p className={className}>{value}</p>;
  }

  function commit() {
    onChange?.(draft);
    setEditing(false);
  }

  if (editing) {
    return (
      <textarea
        ref={textareaRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setDraft(value);
            setEditing(false);
          }
        }}
        rows={rows}
        className={cn(
          className,
          inputEditRing,
          "block w-full resize-y font-[inherit] leading-[inherit]",
        )}
        aria-label="Editable text"
      />
    );
  }

  return (
    <p
      className={cn(className, editHint)}
      onClick={() => setEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setEditing(true);
        }
      }}
      role="button"
      tabIndex={0}
      title="Click to edit"
    >
      {value || "\u00a0"}
    </p>
  );
}
