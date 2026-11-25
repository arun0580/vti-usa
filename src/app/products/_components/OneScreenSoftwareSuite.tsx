import { BookOpen, GraduationCap, PenTool, Settings } from "lucide-react";
import type { ReactNode } from "react";
import { CmsAddProductCard, CmsProductActions } from "@/lib/products-page/CmsProductActions";
import { EditableText, EditableTextarea } from "@/lib/products-page/EditableField";
import { emptyOneScreenApp } from "@/lib/products-page/productDefaults";
import type { OneScreenContent } from "@/lib/products-page/types";

const APP_ICONS: Record<string, ReactNode> = {
  graduation: <GraduationCap className="h-5 w-5" />,
  book: <BookOpen className="h-5 w-5" />,
  pen: <PenTool className="h-5 w-5" />,
  settings: <Settings className="h-5 w-5" />,
};

export function OneScreenSoftwareSuite({
  content,
  editable = false,
  onChange,
}: {
  content: OneScreenContent["softwareSuite"];
  editable?: boolean;
  onChange?: (next: OneScreenContent["softwareSuite"]) => void;
}) {
  function patch(field: keyof OneScreenContent["softwareSuite"], value: string) {
    if (!onChange) return;
    onChange({ ...content, [field]: value });
  }

  return (
    <div className="mt-10 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm shadow-zinc-950/[0.04] sm:p-10">
      <div className="text-center">
        <EditableText
          as="p"
          className="text-[12px] font-semibold tracking-[0.2em] text-red-600"
          value={content.kicker}
          onChange={editable ? (kicker) => patch("kicker", kicker) : undefined}
        />
        <EditableText
          as="h3"
          className="mt-2 text-xl font-bold tracking-tight text-zinc-950 sm:text-3xl"
          value={content.title}
          onChange={editable ? (title) => patch("title", title) : undefined}
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-4">
        {content.apps.map((app, index) => (
          <div
            key={`os-app-${index}-${app.name}`}
            className="relative rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5 sm:p-6"
          >
            {editable && onChange ? (
              <CmsProductActions
                onDelete={() => {
                  if (!window.confirm("Remove this software app?")) return;
                  onChange({
                    ...content,
                    apps: content.apps.filter((_, i) => i !== index),
                  });
                }}
              />
            ) : null}
            <div
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-100/90 bg-rose-50/90 text-red-600"
            >
              {APP_ICONS[app.icon] ?? APP_ICONS.graduation}
            </div>
            <EditableText
              as="div"
              className="mt-4 pr-16 text-base font-semibold text-zinc-950"
              value={app.name}
              onChange={
                editable && onChange
                  ? (name) => {
                      const apps = [...content.apps];
                      apps[index] = { ...apps[index], name };
                      onChange({ ...content, apps });
                    }
                  : undefined
              }
            />
            <EditableTextarea
              className="mt-2 text-sm leading-6 text-zinc-600"
              value={app.desc}
              rows={4}
              onChange={
                editable && onChange
                  ? (desc) => {
                      const apps = [...content.apps];
                      apps[index] = { ...apps[index], desc };
                      onChange({ ...content, apps });
                    }
                  : undefined
              }
            />
          </div>
        ))}
        {editable && onChange ? (
          <CmsAddProductCard
            label="Add software app"
            onClick={() =>
              onChange({
                ...content,
                apps: [...content.apps, emptyOneScreenApp()],
              })
            }
          />
        ) : null}
      </div>

      <div className="mt-9 flex flex-col items-center sm:mt-10">
        <span
          className="mb-3 h-1.5 w-1.5 rounded-full bg-red-600"
          aria-hidden
        />
        {editable ? (
          <div className="flex w-full max-w-xl flex-col items-center gap-2 text-center">
            <EditableText
              as="p"
              className="text-sm leading-6 text-zinc-600"
              value={content.ctaPrefix}
              onChange={(ctaPrefix) => patch("ctaPrefix", ctaPrefix)}
            />
            <EditableText
              className="text-sm font-bold text-red-600"
              value={content.ctaLabel}
              onChange={(ctaLabel) => patch("ctaLabel", ctaLabel)}
            />
            <EditableText
              className="text-xs text-zinc-500"
              value={content.ctaHref}
              onChange={(ctaHref) => patch("ctaHref", ctaHref)}
            />
          </div>
        ) : (
          <p className="max-w-xl text-center text-sm leading-6 text-zinc-600">
            {content.ctaPrefix}{" "}
            <a
              href={content.ctaHref}
              className="font-bold text-red-600 transition hover:text-red-700"
            >
              {content.ctaLabel}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
