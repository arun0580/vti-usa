import { ButtonLink } from "@/components/site/Button";
import { CmsAddProductCard, CmsProductActions } from "@/lib/products-page/CmsProductActions";
import { EditableText, EditableTextarea } from "@/lib/products-page/EditableField";
import type { ProductsPageContent } from "@/lib/products-page/types";
import {
  Cable,
  Camera,
  Hand,
  HardDrive,
  Keyboard,
  Speaker,
} from "lucide-react";

function IconCpu({ className }: { className?: string }) {
  return <HardDrive className={className} />;
}

function IconVideo({ className }: { className?: string }) {
  return <Camera className={className} />;
}

function IconVolume({ className }: { className?: string }) {
  return <Speaker className={className} />;
}

function IconKeyboard({ className }: { className?: string }) {
  return <Keyboard className={className} />;
}

function IconHand({ className }: { className?: string }) {
  return <Hand className={className} />;
}

function IconCable({ className }: { className?: string }) {
  return <Cable className={className} />;
}

const ACCESSORY_ICONS = {
  cpu: IconCpu,
  video: IconVideo,
  volume: IconVolume,
  keyboard: IconKeyboard,
  hand: IconHand,
  cable: IconCable,
} as const;

export function AccessoriesSection({
  content,
  editable = false,
  onChange,
  onEditItem,
  onRemoveItem,
  onAddItem,
}: {
  content: ProductsPageContent["accessories"];
  editable?: boolean;
  onChange?: (content: ProductsPageContent["accessories"]) => void;
  onEditItem?: (index: number) => void;
  onRemoveItem?: (index: number) => void;
  onAddItem?: () => void;
}) {
  function patch(
    updater: (
      draft: ProductsPageContent["accessories"],
      value: string,
    ) => ProductsPageContent["accessories"],
  ): ((value: string) => void) | undefined {
    if (!editable || !onChange) return undefined;
    return (value: string) => onChange(updater(content, value));
  }

  return (
    <section className="mt-14 scroll-mt-24 sm:mt-16" id="accessories">
      <div className="text-center">
        <EditableText
          as="h2"
          className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl"
          value={content.title}
          onChange={patch((d, title) => ({ ...d, title }))}
        />
        <EditableTextarea
          className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600 sm:text-base"
          value={content.description}
          rows={3}
          onChange={patch((d, description) => ({ ...d, description }))}
        />
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {content.items.map((item, index) => {
          const Icon = ACCESSORY_ICONS[item.icon as keyof typeof ACCESSORY_ICONS];
          return (
            <div
              key={`accessory-${index}-${item.name}`}
              className="relative flex h-full min-h-0 flex-col rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm shadow-zinc-950/5"
            >
              {editable && onEditItem && onRemoveItem ? (
                <CmsProductActions
                  onEdit={() => onEditItem(index)}
                  onDelete={() => onRemoveItem(index)}
                />
              ) : null}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-100/90 bg-rose-50/90 text-red-600"
                aria-hidden
              >
                {Icon ? <Icon className="h-5 w-5" /> : null}
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug text-zinc-950">
                {item.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600">{item.desc}</p>
            </div>
          );
        })}
        {editable && onAddItem ? (
          <CmsAddProductCard label="Add accessory" onClick={onAddItem} />
        ) : null}
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <EditableText
              as="div"
              className="text-base font-semibold text-zinc-950"
              value={content.kitTitle}
              onChange={patch((d, kitTitle) => ({ ...d, kitTitle }))}
            />
            <EditableTextarea
              className="mt-1 text-sm leading-6 text-zinc-600"
              value={content.kitDescription}
              rows={2}
              onChange={patch((d, kitDescription) => ({ ...d, kitDescription }))}
            />
          </div>
          {editable ? (
            <div className="flex flex-col gap-2">
              <EditableText
                className="text-sm font-semibold text-red-600"
                value={content.kitCtaLabel}
                onChange={patch((d, kitCtaLabel) => ({ ...d, kitCtaLabel }))}
              />
              <EditableText
                className="text-xs text-zinc-500"
                value={content.kitCtaHref}
                onChange={patch((d, kitCtaHref) => ({ ...d, kitCtaHref }))}
              />
            </div>
          ) : (
            <ButtonLink
              href={content.kitCtaHref}
              className="!bg-red-600 !text-white hover:!bg-red-700 !focus-visible:outline-none !focus-visible:ring-2 !focus-visible:ring-red-500/40"
            >
              {content.kitCtaLabel}
              <span aria-hidden="true" className="ml-1">
                →
              </span>
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
