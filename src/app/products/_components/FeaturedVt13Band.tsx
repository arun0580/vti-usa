import { ArrowRight, Cpu, Layers, Maximize, ShieldCheck, Volume2, Wifi } from "lucide-react";
import { EditableButtonLink } from "@/lib/page-cms/EditableButtonLink";
import { EditableImage } from "@/lib/products-page/EditableImage";
import { EditableText, EditableTextarea } from "@/lib/products-page/EditableField";
import type { FeaturedVt13Content } from "@/lib/products-page/types";

const iconWrap =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-red-500/10 text-red-500";

const FEATURE_ICONS = [Maximize, Layers, Cpu, Wifi, Volume2, ShieldCheck] as const;

function FeatureIcon({ index }: { index: number }) {
  const Icon = FEATURE_ICONS[index] ?? Maximize;
  return <Icon className="h-4 w-4" aria-hidden />;
}

function StarGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

export function FeaturedVt13Band({
  content,
  editable = false,
  onChange,
}: {
  content: FeaturedVt13Content;
  editable?: boolean;
  onChange?: (content: FeaturedVt13Content) => void;
}) {
  function patch<K extends keyof FeaturedVt13Content>(
    key: K,
    value: FeaturedVt13Content[K],
  ): ((v: string) => void) | undefined {
    if (!editable || !onChange) return undefined;
    return (v: string) => onChange({ ...content, [key]: value ?? v } as FeaturedVt13Content);
  }

  function patchField<K extends keyof FeaturedVt13Content>(
    key: K,
  ): ((v: string) => void) | undefined {
    if (!editable || !onChange) return undefined;
    return (v: string) => onChange({ ...content, [key]: v } as FeaturedVt13Content);
  }

  return (
    <section className="mt-12 sm:mt-16">
      <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#121212] p-5 text-white shadow-xl shadow-zinc-950/40 sm:p-8 md:rounded-3xl md:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.95fr] lg:gap-12">
          <div className="order-2 min-w-0 lg:order-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              <StarGlyph className="h-3.5 w-3.5 text-white" />
              <EditableText
                inline
                className="text-xs font-semibold uppercase tracking-wider text-white"
                value={content.badge}
                onChange={patchField("badge")}
              />
            </div>

            <EditableText
              as="h3"
              className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl"
              value={content.title}
              onChange={patchField("title")}
            />
            <EditableText
              as="p"
              className="mt-2 text-sm font-medium text-white/70 md:text-base"
              value={content.sizes}
              onChange={patchField("sizes")}
            />
            <EditableTextarea
              className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base sm:leading-relaxed"
              value={content.description}
              rows={3}
              onChange={patchField("description")}
            />

            <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
              {content.features.map((feature, index) => {
                const inner = (
                  <>
                    <span className={iconWrap}>
                      <FeatureIcon index={index} />
                    </span>
                    <EditableText
                      inline
                      className="text-sm font-medium text-white/90"
                      value={feature.label}
                      onChange={
                        editable && onChange
                          ? (label) => {
                              const features = [...content.features];
                              features[index] = { ...feature, label };
                              onChange({ ...content, features });
                            }
                          : undefined
                      }
                    />
                  </>
                );
                if (feature.href && !editable) {
                  return (
                    <a
                      key={`${feature.label}-${index}`}
                      href={feature.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg bg-[#1e1e1e] px-3 py-2.5 transition hover:bg-[#262626]"
                    >
                      {inner}
                    </a>
                  );
                }
                return (
                  <div key={`${feature.label}-${index}`} className="flex items-center gap-3 rounded-lg bg-[#1e1e1e] px-3 py-2.5">
                    {inner}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              {editable && onChange ? (
                <>
                  <EditableButtonLink
                    label={content.primaryCta}
                    href={content.primaryHref}
                    onChange={(value) =>
                      onChange({
                        ...content,
                        primaryCta: value.label,
                        primaryHref: value.href,
                      })
                    }
                    size="sm"
                    className="rounded-md border-0 !bg-primary !text-white shadow-sm hover:!bg-primary/80"
                  >
                    {content.primaryCta}
                  </EditableButtonLink>
                  <EditableButtonLink
                    label={content.secondaryCta}
                    href={content.secondaryHref}
                    onChange={(value) =>
                      onChange({
                        ...content,
                        secondaryCta: value.label,
                        secondaryHref: value.href,
                      })
                    }
                    size="sm"
                    variant="ghost"
                    className="rounded-md border border-white/30 bg-transparent !text-white hover:bg-white/10"
                  >
                    {content.secondaryCta}
                  </EditableButtonLink>
                </>
              ) : (
                <>
                  <a
                    href={content.primaryHref}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md border-0 bg-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/80"
                  >
                    <span>{content.primaryCta}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                  <a
                    href={content.secondaryHref}
                    className="inline-flex h-10 items-center justify-center rounded-md border border-white/30 bg-transparent px-4 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {content.secondaryCta}
                  </a>
                </>
              )}
            </div>
          </div>

          <div className="order-1 min-w-0 rounded-2xl bg-[#1a1a1a] p-3 ring-1 ring-inset ring-white/10 sm:p-4 lg:order-2">
            <EditableImage
              src={content.imageSrc}
              alt="VTI VT-IR interactive flat panel display"
              onChange={patchField("imageSrc")}
              className="relative mx-auto aspect-square w-full max-w-[min(100%,18rem)] overflow-hidden rounded-full bg-zinc-950 sm:max-w-[min(100%,22rem)]"
              imageClassName="object-cover"
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 60vw, 80vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
