"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { ButtonLink } from "@/components/site/Button";
import { cn } from "@/lib/cn";
import { CmsEditModal, CmsModalField } from "./CmsEditModal";

type ButtonVariant = "primary" | "secondary" | "ghost";
type LinkAppearance = "button" | "link";

export function EditableButtonLink({
  label,
  href,
  onChange,
  variant = "primary",
  size = "md",
  appearance = "button",
  className,
  children,
}: {
  label: string;
  href: string;
  onChange?: (value: { label: string; href: string }) => void;
  variant?: ButtonVariant;
  size?: "sm" | "md";
  appearance?: LinkAppearance;
  className?: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [draftLabel, setDraftLabel] = useState(label);
  const [draftHref, setDraftHref] = useState(href);

  useEffect(() => {
    if (open) {
      setDraftLabel(label);
      setDraftHref(href);
    }
  }, [open, label, href]);

  if (!onChange) {
    if (appearance === "link") {
      return (
        <a href={href} className={className}>
          {children ?? label}
        </a>
      );
    }

    return (
      <ButtonLink href={href} variant={variant} size={size} className={className}>
        {children ?? label}
      </ButtonLink>
    );
  }

  function handleSave() {
    if (!onChange) return;
    onChange({ label: draftLabel.trim(), href: draftHref.trim() });
    setOpen(false);
  }

  return (
    <>
      <div className="relative inline-flex">
        <span
          className={cn(
            appearance === "link"
              ? "inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              : cn(
                  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold capitalize transition-colors",
                  size === "sm" ? "h-10 px-4 text-sm" : "h-11 px-5 text-sm",
                  variant === "primary"
                    ? "bg-zinc-900 text-white"
                    : variant === "secondary"
                      ? "border border-zinc-200 bg-white text-zinc-900"
                      : "text-zinc-900",
                ),
            className,
          )}
        >
          {children ?? label}
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute -right-2 -top-2 inline-flex h-8 items-center gap-1 rounded-lg border border-red-200 bg-white px-2 text-xs font-semibold text-red-700 shadow-sm hover:bg-red-50"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>
      </div>

      <CmsEditModal
        open={open}
        title="Edit button link"
        onClose={() => setOpen(false)}
        onSave={handleSave}
      >
        <CmsModalField
          label="Button label"
          value={draftLabel}
          onChange={setDraftLabel}
        />
        <CmsModalField
          label="Link URL"
          value={draftHref}
          onChange={setDraftHref}
          type="url"
          placeholder="/contact or https://..."
        />
      </CmsEditModal>
    </>
  );
}
