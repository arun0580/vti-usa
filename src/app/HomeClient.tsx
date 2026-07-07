"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/site/Container";
import { CountUp, Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { EASE_OUT, maskRiseContainer, maskRiseLine } from "@/lib/motion";
import { EditableButtonLink } from "@/lib/page-cms/EditableButtonLink";
import { EditableImage } from "@/lib/products-page/EditableImage";
import { EditableText, EditableTextarea } from "@/lib/products-page/EditableField";
import { CmsAddProductCard, CmsProductActions } from "@/lib/products-page/CmsProductActions";
import type { CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import { SolutionCardEditModal, TestimonialEditModal } from "@/lib/home-page/HomeEditModals";
import { getHomeIcon } from "@/lib/home-page/icons";
import { uploadHomeFile } from "@/lib/home-page/uploadApi";
import type { HomePageContent } from "@/lib/home-page/types";
import { cn } from "@/lib/cn";

function fiveSImageClassName(variant: "circle" | "rounded") {
  const base = "opacity-90";
  if (variant === "circle") {
    return `${base} mask-image-[radial-gradient(circle,black_62%,transparent_64%)]`;
  }
  return `${base} mask-image-[radial-gradient(closest-side,black_72%,transparent_74%)]`;
}

function formatDisplaysInstalled(value: number): string {
  if (value >= 10000) return "10K+";
  if (value >= 1000) {
    const tenths = Math.floor(value / 100) / 10;
    return `${tenths.toFixed(1)}K+`;
  }
  return `${Math.round(value)}+`;
}

function IconSlot({ icon, className }: { icon: string; className?: string }) {
  const Icon = getHomeIcon(icon);
  return <Icon className={className} />;
}

type ItemModalState = { mode: CmsItemModalMode; index?: number } | null;

export function HomeClient({
  content,
  editable = false,
  onContentChange,
}: {
  content: HomePageContent;
  editable?: boolean;
  onContentChange?: Dispatch<SetStateAction<HomePageContent>>;
}) {
  const [solutionModal, setSolutionModal] = useState<ItemModalState>(null);
  const [testimonialModal, setTestimonialModal] = useState<ItemModalState>(null);

  const {
    hero,
    trustedBand,
    solutions,
    fiveSPromise,
    whyVti,
    testimonials,
    bottomCta,
  } = content;

  function patchString(
    updater: (draft: HomePageContent, value: string) => HomePageContent,
  ): ((value: string) => void) | undefined {
    if (!editable || !onContentChange) return undefined;
    return (value: string) => onContentChange((prev) => updater(prev, value));
  }

  function removeSolution(index: number) {
    if (!onContentChange || !window.confirm("Remove this solution card?")) return;
    onContentChange((prev) => ({
      ...prev,
      solutions: {
        ...prev.solutions,
        cards: prev.solutions.cards.filter((_, i) => i !== index),
      },
    }));
  }

  function addSolution() {
    setSolutionModal({ mode: "add" });
  }

  function removeTestimonial(index: number) {
    if (!onContentChange || !window.confirm("Remove this testimonial?")) return;
    onContentChange((prev) => ({
      ...prev,
      testimonials: {
        ...prev.testimonials,
        items: prev.testimonials.items.filter((_, i) => i !== index),
      },
    }));
  }

  function addTestimonial() {
    setTestimonialModal({ mode: "add" });
  }

  const Headline = editable ? (
    <h1 className="text-[clamp(2.25rem,11vw,3rem)] font-extrabold leading-[0.92] tracking-tight text-zinc-950 sm:text-[72px]">
      {hero.headlineLines.map((line, index) => (
        <span key={index} className="block">
          <EditableText
            inline
            className={line.accent ? "text-red-600" : undefined}
            value={line.text}
            onChange={
              onContentChange
                ? (text) =>
                    onContentChange((prev) => {
                      const headlineLines = [...prev.hero.headlineLines];
                      headlineLines[index] = { ...headlineLines[index], text };
                      return { ...prev, hero: { ...prev.hero, headlineLines } };
                    })
                : undefined
            }
          />
        </span>
      ))}
    </h1>
  ) : (
    <motion.h1
      variants={maskRiseContainer}
      initial="hidden"
      animate="visible"
      className="text-[clamp(2.25rem,11vw,3rem)] font-extrabold leading-[0.92] tracking-tight text-zinc-950 sm:text-[72px]"
    >
      {hero.headlineLines.map((line) => (
        <span key={line.text} className="block overflow-hidden pb-[0.05em]">
          <motion.span variants={maskRiseLine} className={line.accent ? "block text-red-600" : "block"}>
            {line.text}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );

  return (
    <div className="bg-white text-zinc-950">
      <section className="relative overflow-hidden">
        <Container className="py-8 sm:py-7">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_560px]">
            <div className="space-y-4">
              <Reveal onMount>
                <EditableText
                  as="div"
                  className="text-[11px] font-semibold tracking-[0.22em] text-red-600 sm:text-[12px]"
                  value={hero.kicker}
                  onChange={patchString((d, kicker) => ({ ...d, hero: { ...d.hero, kicker } }))}
                />
              </Reveal>
              {Headline}
              <Reveal onMount delay={editable ? 0 : 0.35}>
                <EditableTextarea
                  className="max-w-xl text-[15px] leading-6 text-zinc-600 sm:text-[18px] sm:leading-7"
                  value={hero.description}
                  rows={3}
                  onChange={patchString((d, description) => ({
                    ...d,
                    hero: { ...d.hero, description },
                  }))}
                />
              </Reveal>
              <Reveal onMount delay={editable ? 0 : 0.5}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <EditableButtonLink
                    label={hero.primaryCta.label}
                    href={hero.primaryCta.href}
                    onChange={
                      onContentChange
                        ? (value) =>
                            onContentChange((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, primaryCta: value },
                            }))
                        : undefined
                    }
                    className="!bg-red-600 hover:!bg-red-700 !text-white w-full sm:w-auto"
                  >
                    {hero.primaryCta.label}{" "}
                    <span aria-hidden="true" className="ml-1">→</span>
                  </EditableButtonLink>
                  <EditableButtonLink
                    label={hero.secondaryCta.label}
                    href={hero.secondaryCta.href}
                    onChange={
                      onContentChange
                        ? (value) =>
                            onContentChange((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, secondaryCta: value },
                            }))
                        : undefined
                    }
                    variant="secondary"
                    className="!text-zinc-950 !bg-white hover:!bg-zinc-100 w-full sm:w-auto"
                  >
                    {hero.secondaryCta.label}
                  </EditableButtonLink>
                </div>
              </Reveal>
              <RevealGroup onMount className="grid max-w-xl grid-cols-3 gap-3 pt-3 sm:gap-6">
                {hero.stats.map((stat, index) => (
                  <RevealItem key={`${stat.bottom}-${index}`} className="space-y-1">
                    <div className="text-xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
                      {stat.kind === "count" ? (
                        <CountUp to={stat.count} format={formatDisplaysInstalled} duration={1.8} delay={0.25} />
                      ) : (
                        <EditableText inline value={stat.top} onChange={onContentChange ? (top) => onContentChange((prev) => { const stats = [...prev.hero.stats]; const s = stats[index]; if (s.kind === "text") stats[index] = { ...s, top }; return { ...prev, hero: { ...prev.hero, stats } }; }) : undefined} />
                      )}
                    </div>
                    <EditableText className="text-[10px] font-semibold tracking-[0.16em] text-zinc-500 uppercase sm:text-[12px] sm:tracking-[0.18em]" value={stat.bottom} onChange={onContentChange ? (bottom) => onContentChange((prev) => { const stats = [...prev.hero.stats]; stats[index] = { ...stats[index], bottom } as typeof stat; return { ...prev, hero: { ...prev.hero, stats } }; }) : undefined} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
            <div className="relative order-first mx-auto w-full max-w-[420px] sm:max-w-[560px] lg:order-none lg:mx-0">
              <div className="pointer-events-none absolute -right-3 top-8 hidden h-20 w-20 rounded-full bg-zinc-950/5 blur-xl lg:block" />
              <motion.div
                initial={editable ? undefined : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 }}
                className="relative ml-auto aspect-square w-full max-w-[520px]"
              >
                <motion.div
                  animate={editable ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                  className="absolute inset-0 overflow-hidden rounded-full border-0"
                >
                  <EditableImage
                    src={hero.imageSrc}
                    alt={hero.imageAlt}
                    onChange={patchString((d, imageSrc) => ({
                      ...d,
                      hero: { ...d.hero, imageSrc },
                    }))}
                    onAltChange={patchString((d, imageAlt) => ({
                      ...d,
                      hero: { ...d.hero, imageAlt },
                    }))}
                    className="relative h-full w-full"
                    imageClassName="object-cover object-center"
                    sizes="(min-width: 1024px) 520px, (min-width: 640px) 420px, 88vw"
                    priority
                    uploadFile={uploadHomeFile}
                    fill
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
        <Container className="py-8 sm:py-10">
          <Reveal>
            <EditableText as="div" className="text-center text-[12px] font-semibold tracking-[0.28em] uppercase text-white/55" value={trustedBand.kicker} onChange={patchString((d, kicker) => ({ ...d, trustedBand: { ...d.trustedBand, kicker } }))} />
          </Reveal>
          <RevealGroup className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium tracking-wide text-white sm:text-sm">
            {trustedBand.items.map((item, index) => (
              <RevealItem key={`${item}-${index}`} as="div" className="opacity-90 hover:opacity-100">
                <EditableText inline value={item} onChange={onContentChange ? (value) => onContentChange((prev) => { const items = [...prev.trustedBand.items]; items[index] = value; return { ...prev, trustedBand: { ...prev.trustedBand, items } }; }) : undefined} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section>
        <Container className="py-12 sm:py-20">
          <Reveal className="max-w-2xl">
            <EditableText as="div" className="text-[12px] font-semibold tracking-[0.22em] text-red-600" value={solutions.kicker} onChange={patchString((d, kicker) => ({ ...d, solutions: { ...d.solutions, kicker } }))} />
            <EditableText as="h2" className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl" value={solutions.title} onChange={patchString((d, title) => ({ ...d, solutions: { ...d.solutions, title } }))} />
            <EditableTextarea className="mt-4 max-w-2xl text-base leading-6 text-zinc-600 sm:text-[18px] sm:leading-7" value={solutions.description} rows={3} onChange={patchString((d, description) => ({ ...d, solutions: { ...d.solutions, description } }))} />
          </Reveal>
          <RevealGroup disableAnimation={editable} className="mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-10">
            {solutions.cards.map((card, index) => (
              <RevealItem
                disableAnimation={editable}
                key={`solution-${index}`}
                className={cn(
                  "overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md hover:shadow-zinc-950/5",
                  editable && "relative",
                )}
              >
                {editable ? <CmsProductActions onEdit={() => setSolutionModal({ mode: "edit", index })} onDelete={() => removeSolution(index)} /> : null}
                <div className="relative aspect-[16/10] w-full">
                  <Image src={card.imageSrc} alt={card.title} fill className="object-cover" sizes="(min-width: 1024px) 400px, 92vw" />
                </div>
                <div className="border-t border-zinc-200 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
                      <IconSlot icon={card.icon} className="h-6 w-6" />
                    </span>
                    <div className="text-md font-semibold text-zinc-950">{card.title}</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{card.desc}</p>
                </div>
              </RevealItem>
            ))}
            {editable ? <RevealItem disableAnimation><CmsAddProductCard label="Add solution card" onClick={addSolution} /></RevealItem> : null}
          </RevealGroup>
        </Container>
      </section>

      <FiveSSection content={fiveSPromise} editable={editable} onContentChange={onContentChange} patchString={patchString} />
      <WhyVtiSection content={whyVti} editable={editable} onContentChange={onContentChange} patchString={patchString} />
      <TestimonialsSection
        content={testimonials}
        editable={editable}
        onContentChange={onContentChange}
        patchString={patchString}
        onEdit={(index) => setTestimonialModal({ mode: "edit", index })}
        onRemove={removeTestimonial}
        onAdd={addTestimonial}
      />
      <BottomCtaSection
        content={bottomCta}
        editable={editable}
        onContentChange={onContentChange}
        patchString={patchString}
      />

      <SolutionCardEditModal
        open={solutionModal !== null}
        mode={solutionModal?.mode ?? "edit"}
        item={
          solutionModal?.mode === "edit" && solutionModal.index !== undefined
            ? solutions.cards[solutionModal.index] ?? null
            : null
        }
        onClose={() => setSolutionModal(null)}
        onSave={(item) => {
          if (!solutionModal || !onContentChange) return;
          if (solutionModal.mode === "add") {
            onContentChange((prev) => ({
              ...prev,
              solutions: {
                ...prev.solutions,
                cards: [...prev.solutions.cards, item],
              },
            }));
          } else if (solutionModal.index !== undefined) {
            onContentChange((prev) => {
              const cards = [...prev.solutions.cards];
              cards[solutionModal.index!] = item;
              return { ...prev, solutions: { ...prev.solutions, cards } };
            });
          }
          setSolutionModal(null);
        }}
      />
      <TestimonialEditModal
        open={testimonialModal !== null}
        mode={testimonialModal?.mode ?? "edit"}
        item={
          testimonialModal?.mode === "edit" && testimonialModal.index !== undefined
            ? testimonials.items[testimonialModal.index] ?? null
            : null
        }
        onClose={() => setTestimonialModal(null)}
        onSave={(item) => {
          if (!testimonialModal || !onContentChange) return;
          if (testimonialModal.mode === "add") {
            onContentChange((prev) => ({
              ...prev,
              testimonials: {
                ...prev.testimonials,
                items: [...prev.testimonials.items, item],
              },
            }));
          } else if (testimonialModal.index !== undefined) {
            onContentChange((prev) => {
              const items = [...prev.testimonials.items];
              items[testimonialModal.index!] = item;
              return { ...prev, testimonials: { ...prev.testimonials, items } };
            });
          }
          setTestimonialModal(null);
        }}
      />
    </div>
  );
}

function FiveSSection({
  content,
  editable,
  onContentChange,
  patchString,
}: {
  content: HomePageContent["fiveSPromise"];
} & SectionProps) {
  return (
    <section className="bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      <Container className="py-10 sm:py-16">
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2">
          <Reveal className="space-y-4">
            <EditableText as="div" className="text-[12px] font-semibold tracking-[0.22em] text-red-400/90" value={content.kicker} onChange={patchString((d, kicker) => ({ ...d, fiveSPromise: { ...d.fiveSPromise, kicker } }))} />
            <EditableText as="h2" className="text-2xl font-extrabold tracking-tight sm:text-3xl" value={content.title} onChange={patchString((d, title) => ({ ...d, fiveSPromise: { ...d.fiveSPromise, title } }))} />
            <EditableTextarea className="max-w-xl text-sm leading-6 text-zinc-300 sm:text-[16px]" value={content.description} rows={3} onChange={patchString((d, description) => ({ ...d, fiveSPromise: { ...d.fiveSPromise, description } }))} />
          </Reveal>
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {content.images.map((opt, index) => (
              <RevealItem key={index} className="space-y-3">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/40 shadow-sm">
                  <EditableImage
                    src={opt.imageSrc}
                    alt={opt.alt}
                    onChange={
                      onContentChange
                        ? (imageSrc) =>
                            onContentChange((prev) => {
                              const images = [...prev.fiveSPromise.images];
                              images[index] = { ...images[index], imageSrc };
                              return { ...prev, fiveSPromise: { ...prev.fiveSPromise, images } };
                            })
                        : undefined
                    }
                    className="relative h-full w-full"
                    imageClassName={fiveSImageClassName(opt.variant)}
                    sizes="(min-width: 1024px) 300px, 90vw"
                    fill
                    uploadFile={uploadHomeFile}
                  />
                  {opt.variant === "circle" ? (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/35" />
                  ) : null}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {content.pillars.map((item, index) => {
              const body = (
                <div className="space-y-2">
                  <div className="text-3xl font-extrabold leading-none text-red-500">S</div>
                  <EditableText className="text-md font-semibold text-white" value={item.key} onChange={onContentChange ? (key) => onContentChange((prev) => { const pillars = [...prev.fiveSPromise.pillars]; pillars[index] = { ...pillars[index], key }; return { ...prev, fiveSPromise: { ...prev.fiveSPromise, pillars } }; }) : undefined} />
                  <EditableTextarea className="max-w-[220px] text-xs leading-5 text-zinc-300" value={item.value} rows={2} onChange={onContentChange ? (value) => onContentChange((prev) => { const pillars = [...prev.fiveSPromise.pillars]; pillars[index] = { ...pillars[index], value }; return { ...prev, fiveSPromise: { ...prev.fiveSPromise, pillars } }; }) : undefined} />
                </div>
              );
              return (
                <RevealItem key={item.key} className="lg:border-l lg:border-white/10 lg:px-8 first:lg:border-l-0 first:lg:pl-0 last:lg:pr-0">
                  {item.href && !editable ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block rounded-md transition hover:opacity-90">{body}</a>
                  ) : body}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}

function WhyVtiSection({
  content,
  editable,
  onContentChange,
  patchString,
}: {
  content: HomePageContent["whyVti"];
} & SectionProps) {
  return (
    <section>
      <Container className="py-12 sm:py-24 border-b border-zinc-200">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="max-w-xl">
            <EditableText as="div" className="text-[12px] font-semibold tracking-[0.22em] text-red-600" value={content.kicker} onChange={patchString((d, kicker) => ({ ...d, whyVti: { ...d.whyVti, kicker } }))} />
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl">
              <EditableText inline value={content.titleLine1} onChange={patchString((d, titleLine1) => ({ ...d, whyVti: { ...d.whyVti, titleLine1 } }))} />
              <br />
              <EditableText inline className="text-red-600" value={content.titleLine2} onChange={patchString((d, titleLine2) => ({ ...d, whyVti: { ...d.whyVti, titleLine2 } }))} />
            </h2>
            <EditableTextarea className="mt-4 text-base leading-6 text-zinc-600 sm:text-[16px] sm:leading-7" value={content.description} rows={3} onChange={patchString((d, description) => ({ ...d, whyVti: { ...d.whyVti, description } }))} />
            <div className="mt-6 sm:mt-8">
              <EditableButtonLink
                label={content.ctaLabel}
                href={content.ctaHref}
                onChange={
                  onContentChange
                    ? (value) =>
                        onContentChange((prev) => ({
                          ...prev,
                          whyVti: {
                            ...prev.whyVti,
                            ctaLabel: value.label,
                            ctaHref: value.href,
                          },
                        }))
                    : undefined
                }
                variant="secondary"
                className="!bg-white !text-zinc-950 hover:!bg-zinc-100"
              >
                {content.ctaLabel} <span aria-hidden="true">→</span>
              </EditableButtonLink>
            </div>
          </Reveal>
          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {content.cards.map((card, index) => (
              <RevealItem key={`${card.title}-${index}`} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md hover:shadow-zinc-950/5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <IconSlot icon={card.icon} className="h-6 w-6" />
                </span>
                <EditableText className="mt-4 text-sm font-semibold text-zinc-950" value={card.title} onChange={onContentChange ? (title) => onContentChange((prev) => { const cards = [...prev.whyVti.cards]; cards[index] = { ...cards[index], title }; return { ...prev, whyVti: { ...prev.whyVti, cards } }; }) : undefined} />
                <EditableTextarea className="mt-2 text-sm leading-6 text-zinc-600" value={card.desc} rows={3} onChange={onContentChange ? (desc) => onContentChange((prev) => { const cards = [...prev.whyVti.cards]; cards[index] = { ...cards[index], desc }; return { ...prev, whyVti: { ...prev.whyVti, cards } }; }) : undefined} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}

function TestimonialQuoteMark() {
  return (
    <div className="text-red-600" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M7.5 10.5c0-1.657 1.343-3 3-3h.5v2H10.5c-.552 0-1 .448-1 1v.5H12v5H7.5v-5.5Zm9 0c0-1.657 1.343-3 3-3h.5v2h-.5c-.552 0-1 .448-1 1v.5H21v5h-4.5v-5.5Z" />
      </svg>
    </div>
  );
}

function TestimonialsSection({
  content,
  editable,
  onContentChange,
  patchString,
  onEdit,
  onRemove,
  onAdd,
}: {
  content: HomePageContent["testimonials"];
  editable?: boolean;
  onContentChange?: Dispatch<SetStateAction<HomePageContent>>;
  patchString: SectionProps["patchString"];
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
}) {
  return (
    <section>
      <Container className="py-12 sm:py-20">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:gap-6">
          <div className="max-w-2xl">
            <EditableText as="div" className="text-[12px] font-semibold tracking-[0.22em] text-red-600" value={content.kicker} onChange={patchString((d, kicker) => ({ ...d, testimonials: { ...d.testimonials, kicker } }))} />
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
              <EditableText inline value={content.title} onChange={patchString((d, title) => ({ ...d, testimonials: { ...d.testimonials, title } }))} />{" "}
              <EditableText inline className="text-red-600" value={content.titleAccent} onChange={patchString((d, titleAccent) => ({ ...d, testimonials: { ...d.testimonials, titleAccent } }))} />
            </h2>
            <EditableTextarea className="mt-3 text-sm leading-6 text-zinc-600 sm:text-base" value={content.description} rows={2} onChange={patchString((d, description) => ({ ...d, testimonials: { ...d.testimonials, description } }))} />
          </div>
          <EditableButtonLink
            label={content.galleryLinkLabel}
            href={content.galleryLinkHref}
            appearance="link"
            onChange={
              onContentChange
                ? (value) =>
                    onContentChange((prev) => ({
                      ...prev,
                      testimonials: {
                        ...prev.testimonials,
                        galleryLinkLabel: value.label,
                        galleryLinkHref: value.href,
                      },
                    }))
                : undefined
            }
            className="mt-8 hidden items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 sm:inline-flex"
          >
            {content.galleryLinkLabel} <span aria-hidden="true">→</span>
          </EditableButtonLink>
        </Reveal>
        <RevealGroup disableAnimation={editable} className="mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {content.items.map((t, index) => (
            <RevealItem
              disableAnimation={editable}
              key={`testimonial-${index}`}
              as="figure"
              className={cn(
                "overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md hover:shadow-zinc-950/5",
                editable && "relative",
              )}
            >
              {editable ? <CmsProductActions onEdit={() => onEdit(index)} onDelete={() => onRemove(index)} /> : null}
              <div className="relative aspect-[16/9] w-full">
                {t.imageSrc ? (
                  <Image src={t.imageSrc} alt="" fill className="object-cover" sizes="(min-width: 1024px) 400px, 92vw" />
                ) : editable ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 text-xs font-medium text-zinc-400">
                    Add photo via Edit
                  </div>
                ) : (
                  <Image src={t.imageSrc} alt="" fill className="object-cover" sizes="(min-width: 1024px) 400px, 92vw" />
                )}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-zinc-900 shadow-sm">
                    {t.tag.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <TestimonialQuoteMark />
                <blockquote className="mt-3 text-[13px] leading-6 text-zinc-700">
                  "{t.quote}"
                </blockquote>
                <div className="mt-6 border-t border-zinc-200 pt-5">
                  <figcaption>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-zinc-600">
                      {t.role} - {t.org}
                    </div>
                  </figcaption>
                </div>
              </div>
            </RevealItem>
          ))}
          {editable ? <RevealItem disableAnimation><CmsAddProductCard label="Add testimonial" onClick={onAdd} /></RevealItem> : null}
        </RevealGroup>
        <div className="mt-10 flex sm:hidden">
          <EditableButtonLink
            label={content.galleryLinkLabel}
            href={content.galleryLinkHref}
            appearance="link"
            onChange={
              onContentChange
                ? (value) =>
                    onContentChange((prev) => ({
                      ...prev,
                      testimonials: {
                        ...prev.testimonials,
                        galleryLinkLabel: value.label,
                        galleryLinkHref: value.href,
                      },
                    }))
                : undefined
            }
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            {content.galleryLinkLabel} <span aria-hidden="true">→</span>
          </EditableButtonLink>
        </div>
      </Container>
    </section>
  );
}

function BottomCtaSection({
  content,
  editable,
  onContentChange,
  patchString,
}: {
  content: HomePageContent["bottomCta"];
  editable?: boolean;
  onContentChange?: Dispatch<SetStateAction<HomePageContent>>;
  patchString: SectionProps["patchString"];
}) {
  return (
    <section className="border-t border-zinc-200 bg-zinc-50">
      <Container className="py-4 sm:py-6">
        <Reveal className="rounded-3xl border border-zinc-200 bg-white p-4 sm:p-4">
          <div className="grid items-center gap-6 lg:grid-cols-[auto_1fr_auto] lg:gap-8">
            <div className="hidden lg:flex lg:justify-start">
              {editable ? (
                <div className="relative h-44 w-36 xl:w-44">
                  <EditableImage
                    src={content.mascotSrc}
                    alt={content.mascotAlt}
                    onChange={patchString((d, mascotSrc) => ({
                      ...d,
                      bottomCta: { ...d.bottomCta, mascotSrc },
                    }))}
                    className="relative h-full w-full"
                    imageClassName="object-contain"
                    sizes="176px"
                    uploadFile={uploadHomeFile}
                  />
                </div>
              ) : (
                <Image
                  src={content.mascotSrc}
                  alt={content.mascotAlt}
                  width={680}
                  height={1024}
                  className="h-auto w-36 xl:w-44"
                  priority={false}
                />
              )}
            </div>
            <div className="space-y-2 sm:space-y-3">
              <EditableText className="text-sm font-semibold text-zinc-900" value={content.title} onChange={patchString((d, title) => ({ ...d, bottomCta: { ...d.bottomCta, title } }))} />
              <EditableTextarea className="text-sm text-zinc-600 sm:text-base" value={content.description} rows={2} onChange={patchString((d, description) => ({ ...d, bottomCta: { ...d.bottomCta, description } }))} />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <EditableButtonLink
                label={content.primaryCta.label}
                href={content.primaryCta.href}
                onChange={
                  onContentChange
                    ? (value) =>
                        onContentChange((prev) => ({
                          ...prev,
                          bottomCta: { ...prev.bottomCta, primaryCta: value },
                        }))
                    : undefined
                }
              >
                {content.primaryCta.label}
              </EditableButtonLink>
              <EditableButtonLink
                label={content.secondaryCta.label}
                href={content.secondaryCta.href}
                onChange={
                  onContentChange
                    ? (value) =>
                        onContentChange((prev) => ({
                          ...prev,
                          bottomCta: { ...prev.bottomCta, secondaryCta: value },
                        }))
                    : undefined
                }
                variant="secondary"
              >
                {content.secondaryCta.label}
              </EditableButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

type SectionProps = {
  editable?: boolean;
  onContentChange?: Dispatch<SetStateAction<HomePageContent>>;
  patchString: (
    updater: (draft: HomePageContent, value: string) => HomePageContent,
  ) => ((value: string) => void) | undefined;
};
