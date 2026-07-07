"use client";

import type { Dispatch, SetStateAction } from "react";
import { useMemo, useState } from "react";
import { Container } from "@/components/site/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { motion } from "motion/react";
import { hoverLift, tapPress } from "@/lib/motion";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EditableButtonLink } from "@/lib/page-cms/EditableButtonLink";
import { EditableText, EditableTextarea } from "@/lib/products-page/EditableField";
import { CmsAddProductCard, CmsProductActions } from "@/lib/products-page/CmsProductActions";
import type { CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import { InstallationEditModal } from "@/lib/gallery-page/InstallationEditModal";
import type { GalleryInstallation, GalleryPageContent, GallerySegment } from "@/lib/gallery-page/types";

type FilterSegment = "All" | GallerySegment;

const segments: FilterSegment[] = [
  "All",
  "K-12",
  "Higher Ed",
  "Corporate",
  "Government",
];

function segmentToQueryValue(segment: FilterSegment) {
  if (segment === "All") return "";
  return segment.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
}

function queryValueToSegment(value: string | null): FilterSegment {
  if (!value) return "All";
  const normalized = value.toLowerCase();
  const found = segments.find((s) => segmentToQueryValue(s) === normalized);
  return found ?? "All";
}

export function GalleryClient({
  content,
  editable = false,
  onContentChange,
}: {
  content: GalleryPageContent;
  editable?: boolean;
  onContentChange?: Dispatch<SetStateAction<GalleryPageContent>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [editModal, setEditModal] = useState<
    { mode: CmsItemModalMode; index?: number } | null
  >(null);

  const { hero, cta, installations } = content;

  const segmentFromUrl = useMemo(
    () => queryValueToSegment(searchParams.get("segment")),
    [searchParams],
  );

  const activeSegment = segmentFromUrl;

  const visibleInstallations = useMemo(() => {
    if (activeSegment === "All") return installations;
    return installations.filter((x) => x.segment === activeSegment);
  }, [activeSegment, installations]);

  function patchString(
    updater: (draft: GalleryPageContent, value: string) => GalleryPageContent,
  ): ((value: string) => void) | undefined {
    if (!editable || !onContentChange) return undefined;
    return (value: string) => onContentChange((prev) => updater(prev, value));
  }

  function updateSegment(next: FilterSegment) {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (next === "All") nextParams.delete("segment");
    else nextParams.set("segment", segmentToQueryValue(next));
    const qs = nextParams.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function removeInstallation(index: number) {
    if (!onContentChange) return;
    if (!window.confirm("Remove this installation?")) return;
    onContentChange((prev) => ({
      ...prev,
      installations: prev.installations.filter((_, i) => i !== index),
    }));
  }

  function addInstallation() {
    setEditModal({ mode: "add" });
  }

  function saveInstallation(item: GalleryInstallation) {
    if (!editModal || !onContentChange) return;
    if (editModal.mode === "add") {
      onContentChange((prev) => ({
        ...prev,
        installations: [...prev.installations, item],
      }));
    } else if (editModal.index !== undefined) {
      onContentChange((prev) => {
        const installations = [...prev.installations];
        installations[editModal.index!] = item;
        return { ...prev, installations };
      });
    }
    setEditModal(null);
  }

  const editingItem =
    editModal?.mode === "edit" && editModal.index !== undefined
      ? installations[editModal.index] ?? null
      : null;

  return (
    <div>
      <div className="border-b border-zinc-200 bg-white">
        <Container className="py-10 sm:py-16">
          <Reveal onMount className="max-w-3xl">
            <EditableText
              as="div"
              className="text-[12px] font-semibold tracking-[0.22em] text-red-600"
              value={hero.kicker}
              onChange={patchString((d, kicker) => ({
                ...d,
                hero: { ...d.hero, kicker },
              }))}
            />
            <EditableText
              as="h1"
              className="mt-2 text-[34px] font-extrabold leading-[0.95] tracking-tight text-zinc-950 sm:text-[64px]"
              value={hero.title}
              onChange={patchString((d, title) => ({
                ...d,
                hero: { ...d.hero, title },
              }))}
            />
            <EditableTextarea
              className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base"
              value={hero.description}
              rows={3}
              onChange={patchString((d, description) => ({
                ...d,
                hero: { ...d.hero, description },
              }))}
            />
          </Reveal>
        </Container>
      </div>

      <Container className="py-6 sm:py-8 bg-white">
        <RevealGroup onMount className="flex flex-wrap gap-2">
          {segments.map((seg) => {
            const isActive = seg === activeSegment;
            return (
              <RevealItem key={seg}>
                <motion.button
                  type="button"
                  onClick={() => updateSegment(seg)}
                  whileHover={hoverLift}
                  whileTap={tapPress}
                  className={[
                    "inline-flex min-h-[40px] items-center rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
                    isActive
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50",
                  ].join(" ")}
                >
                  {seg}
                </motion.button>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>

      <Container className="pb-14 sm:pb-16">
        <RevealGroup
          key={activeSegment}
          onMount={!editable}
          disableAnimation={editable}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleInstallations.map((item) => {
            const index = installations.findIndex((x) => x.id === item.id);
            return (
              <RevealItem disableAnimation={editable} key={item.id} as="article">
                <div className="relative">
                  {editable && index >= 0 ? (
                    <CmsProductActions
                      onEdit={() => setEditModal({ mode: "edit", index })}
                      onDelete={() => removeInstallation(index)}
                    />
                  ) : null}
                  <motion.div
                    whileHover={hoverLift}
                    className="group h-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5 transition-shadow hover:shadow-md hover:shadow-zinc-950/10"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                      {item.imageSrc ? (
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-[1.02]"
                          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_10%,rgba(239,68,68,0.20),transparent_55%),radial-gradient(700px_circle_at_80%_90%,rgba(24,24,27,0.18),transparent_55%)]"
                        />
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-3 p-5">
                      <div>
                        <div className="text-base font-semibold tracking-tight text-zinc-950">
                          {item.title}
                        </div>
                        <div className="mt-1 text-sm text-zinc-600">{item.location}</div>
                      </div>
                      <span className="inline-flex flex-shrink-0 items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                        {item.segment}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </RevealItem>
            );
          })}
          {editable ? (
            <RevealItem disableAnimation>
              <CmsAddProductCard
                label="Add New"
                onClick={addInstallation}
              />
            </RevealItem>
          ) : null}
        </RevealGroup>

        <Reveal as="section" className="mt-12 overflow-hidden rounded-3xl bg-zinc-950 p-6 text-white sm:mt-14 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <EditableText
                as="div"
                className="text-2xl font-bold text-white sm:text-3xl"
                value={cta.title}
                onChange={patchString((d, title) => ({
                  ...d,
                  cta: { ...d.cta, title },
                }))}
              />
              <EditableText
                as="div"
                className="mt-2 text-base tracking-tight text-white/75 sm:text-lg"
                value={cta.subtitle}
                onChange={patchString((d, subtitle) => ({
                  ...d,
                  cta: { ...d.cta, subtitle },
                }))}
              />
              <EditableTextarea
                className="max-w-2xl text-base leading-6 text-white/75 sm:text-lg"
                value={cta.body}
                rows={2}
                onChange={patchString((d, body) => ({
                  ...d,
                  cta: { ...d.cta, body },
                }))}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <EditableButtonLink
                label={cta.buttonLabel}
                href={cta.buttonHref}
                onChange={
                  onContentChange
                    ? (value) =>
                        onContentChange((prev) => ({
                          ...prev,
                          cta: {
                            ...prev.cta,
                            buttonLabel: value.label,
                            buttonHref: value.href,
                          },
                        }))
                    : undefined
                }
                size="sm"
                className="!bg-primary !text-white !hover:!bg-primary/70"
              >
                {cta.buttonLabel}
              </EditableButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>

      <InstallationEditModal
        open={editModal !== null}
        mode={editModal?.mode ?? "edit"}
        item={editingItem}
        onClose={() => setEditModal(null)}
        onSave={saveInstallation}
      />
    </div>
  );
}
