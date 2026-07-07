"use client";

import type { Dispatch, SetStateAction } from "react";
import { Container } from "@/components/site/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { motion } from "motion/react";
import { hoverLift, tapPress } from "@/lib/motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  TeamMemberEditModal,
  ValueCardEditModal,
} from "@/lib/about-page/AboutEditModals";
import type { CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import type { AboutPageContent as AboutContent } from "@/lib/about-page/types";
import { uploadAboutFile } from "@/lib/about-page/uploadApi";
import { AboutValueIcon } from "@/lib/about-page/ValueIcon";
import { EditableButtonLink } from "@/lib/page-cms/EditableButtonLink";
import { EditableText, EditableTextarea } from "@/lib/products-page/EditableField";
import { EditableImage } from "@/lib/products-page/EditableImage";
import {
  CmsAddProductCard,
  CmsProductActions,
} from "@/lib/products-page/CmsProductActions";
import { PartnerApplicationForm } from "./PartnerApplicationForm";

type ItemModalState = { mode: CmsItemModalMode; index?: number } | null;

type TabId = "story" | "team" | "values" | "join";

const HASH_TO_TAB: Record<string, TabId> = {
  story: "story",
  team: "team",
  "our-team": "team",
  values: "values",
  "our-values": "values",
  believe: "values",
  "what-we-believe": "values",
  join: "join",
};

function tabFromHash(): TabId | null {
  if (typeof window === "undefined") return null;
  const key = window.location.hash.replace(/^#/, "").toLowerCase();
  if (!key) return null;
  return HASH_TO_TAB[key] ?? null;
}

const tabs: {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "story",
    label: "Our Story",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M4 5a2 2 0 012-2h7v18H6a2 2 0 00-2-2V5zM20 3h-7v18h7a2 2 0 002-2V5a2 2 0 00-2-2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "team",
    label: "Our Team",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "values",
    label: "Our Values",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          opacity="0.4"
        />
        <path
          d="M12 3.5l1.9 5.8h6.2l-5 3.6 1.9 5.8-4.9-3.6-5 3.6 1.9-5.8-5-3.6h6.2L12 3.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "join",
    label: "Join the Team",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM20 8v6M17 11h6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function AboutPageContent({
  content,
  editable = false,
  onContentChange,
}: {
  content: AboutContent;
  editable?: boolean;
  onContentChange?: Dispatch<SetStateAction<AboutContent>>;
}) {
  const [active, setActive] = useState<TabId>("story");
  const [teamModal, setTeamModal] = useState<ItemModalState>(null);
  const [valueModal, setValueModal] = useState<ItemModalState>(null);

  const { hero, tabsPrompt, story, team, values, join, bottomCta } = content;

  function patchString(
    updater: (draft: AboutContent, value: string) => AboutContent,
  ): ((value: string) => void) | undefined {
    if (!editable || !onContentChange) return undefined;
    return (value: string) => onContentChange((prev) => updater(prev, value));
  }

  function removeTeamMember(index: number) {
    if (!onContentChange) return;
    if (!window.confirm("Remove this team member?")) return;
    onContentChange((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        members: prev.team.members.filter((_, i) => i !== index),
      },
    }));
  }

  function addTeamMember() {
    setTeamModal({ mode: "add" });
  }

  function removeValueCard(index: number) {
    if (!onContentChange) return;
    if (!window.confirm("Remove this value card?")) return;
    onContentChange((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        cards: prev.values.cards.filter((_, i) => i !== index),
      },
    }));
  }

  function addValueCard() {
    setValueModal({ mode: "add" });
  }

  useEffect(() => {
    const applyHash = () => {
      const t = tabFromHash();
      if (t) {
        setActive(t);
        requestAnimationFrame(() => {
          const anchor =
            t === "team" ? "our-team" : t === "values" ? "our-values" : null;
          if (anchor) {
            document.getElementById(anchor)?.scrollIntoView({
              block: "start",
              behavior: "auto",
            });
          }
        });
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <div className="bg-white text-zinc-950">
      <Container className="pt-10 pb-6 sm:pt-16 sm:pb-8">
        <Reveal onMount className="max-w-3xl">
          <EditableText
            as="div"
            className="text-[12px] font-semibold tracking-[0.22em] text-red-600"
            value={hero.kicker}
            onChange={patchString((d, kicker) => ({ ...d, hero: { ...d.hero, kicker } }))}
          />
          <EditableText
            as="h1"
            className="mt-2 text-[32px] font-extrabold leading-[0.95] tracking-tight text-zinc-950 sm:text-[56px]"
            value={hero.titleLine1}
            onChange={patchString((d, titleLine1) => ({
              ...d,
              hero: { ...d.hero, titleLine1 },
            }))}
          />
          <EditableText
            as="h1"
            className="mt-1 text-[32px] font-extrabold leading-[0.95] tracking-tight text-zinc-950 sm:text-[56px]"
            value={hero.titleLine2}
            onChange={patchString((d, titleLine2) => ({
              ...d,
              hero: { ...d.hero, titleLine2 },
            }))}
          />
          <EditableTextarea
            className="mt-4 max-w-2xl text-base leading-6 text-zinc-600 sm:text-[18px] sm:leading-7"
            value={hero.description}
            onChange={patchString((d, description) => ({
              ...d,
              hero: { ...d.hero, description },
            }))}
          />
        </Reveal>
      </Container>

      <div className="border-b border-zinc-200 bg-zinc-50/60">
        <Container className="py-5">
          <Reveal onMount delay={0.1}>
            <EditableText
              as="p"
              className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500"
              value={tabsPrompt}
              onChange={patchString((d, tabsPrompt) => ({ ...d, tabsPrompt }))}
            />
            <RevealGroup
              onMount
              className="grid w-full grid-cols-2 gap-2 sm:flex sm:h-auto sm:flex-wrap sm:justify-center sm:gap-3"
              role="tablist"
              aria-label="About sections"
            >
              {tabs.map((t) => {
                const isActive = active === t.id;
                return (
                  <RevealItem key={t.id}>
                    <motion.button
                      type="button"
                      role="tab"
                      id={`tab-${t.id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${t.id}`}
                      onClick={() => setActive(t.id)}
                      whileHover={hoverLift}
                      whileTap={tapPress}
                      className={
                        isActive
                          ? "group relative flex w-full min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-red-600 bg-red-600 px-3 py-3 text-[13px] font-bold text-white shadow-md shadow-red-600/20 transition-colors sm:min-w-[180px] sm:flex-1 sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-base"
                          : "group relative flex w-full min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-zinc-200 bg-white px-3 py-3 text-[13px] font-bold text-zinc-950 shadow-sm transition-colors hover:border-red-300 hover:shadow-md sm:min-w-[180px] sm:flex-1 sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-base"
                      }
                    >
                      <span
                        className={isActive ? "text-white" : "text-red-600"}
                      >
                        {t.icon}
                      </span>
                      <span>{t.label}</span>
                    </motion.button>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </Reveal>
        </Container>
      </div>

      <Container className="py-14 sm:py-16">
        <div
          id="panel-story"
          role="tabpanel"
          aria-labelledby="tab-story"
          hidden={active !== "story"}
        >
          {active === "story" && (
            <div
              key="story"
              className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12"
            >
              <Reveal onMount>
                <EditableText
                  as="div"
                  className="text-[12px] font-semibold tracking-[0.22em] text-red-600"
                  value={story.kicker}
                  onChange={patchString((d, kicker) => ({
                    ...d,
                    story: { ...d.story, kicker },
                  }))}
                />
                <EditableText
                  as="h2"
                  className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
                  value={story.title}
                  onChange={patchString((d, title) => ({
                    ...d,
                    story: { ...d.story, title },
                  }))}
                />
                <div className="mt-6 space-y-4 text-base leading-7 text-zinc-600">
                  {story.paragraphs.map((paragraph, index) => (
                    <EditableTextarea
                      key={index}
                      value={paragraph}
                      onChange={
                        editable && onContentChange
                          ? (value) =>
                              onContentChange((prev) => {
                                const paragraphs = [...prev.story.paragraphs];
                                paragraphs[index] = value;
                                return {
                                  ...prev,
                                  story: { ...prev.story, paragraphs },
                                };
                              })
                          : undefined
                      }
                    />
                  ))}
                </div>
              </Reveal>
              <Reveal
                onMount
                delay={0.15}
                className="mx-auto w-full max-w-md lg:mx-0"
              >
                <figure>
                  <div className="overflow-hidden rounded-2xl shadow-lg shadow-zinc-950/10 ring-1 ring-zinc-200/80">
                    {editable && onContentChange ? (
                      <div className="relative aspect-[4/5] w-full">
                        <EditableImage
                          src={story.mascot.imageSrc}
                          alt={story.mascot.imageAlt}
                          className="relative h-full w-full"
                          imageClassName="object-cover"
                          sizes="(min-width: 1024px) 400px, 100vw"
                          priority
                          uploadFile={uploadAboutFile}
                          onChange={(imageSrc) =>
                            onContentChange((prev) => ({
                              ...prev,
                              story: {
                                ...prev.story,
                                mascot: { ...prev.story.mascot, imageSrc },
                              },
                            }))
                          }
                        />
                      </div>
                    ) : (
                      <Image
                        src={story.mascot.imageSrc}
                        alt={story.mascot.imageAlt}
                        width={560}
                        height={700}
                        className="h-auto w-full object-cover"
                        sizes="(min-width: 1024px) 400px, 100vw"
                        priority
                      />
                    )}
                  </div>
                  <figcaption className="mt-4 text-center">
                    <EditableText
                      as="div"
                      className="text-lg font-bold text-zinc-950"
                      value={story.mascot.name}
                      onChange={patchString((d, name) => ({
                        ...d,
                        story: {
                          ...d.story,
                          mascot: { ...d.story.mascot, name },
                        },
                      }))}
                    />
                    <EditableText
                      as="div"
                      className="text-sm font-semibold text-red-600"
                      value={story.mascot.role}
                      onChange={patchString((d, role) => ({
                        ...d,
                        story: {
                          ...d.story,
                          mascot: { ...d.story.mascot, role },
                        },
                      }))}
                    />
                    <EditableText
                      as="div"
                      className="mt-1 text-[11px] font-semibold tracking-[0.2em] text-zinc-500"
                      value={story.mascot.subtitle}
                      onChange={patchString((d, subtitle) => ({
                        ...d,
                        story: {
                          ...d.story,
                          mascot: { ...d.story.mascot, subtitle },
                        },
                      }))}
                    />
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          )}
        </div>

        <div
          id="panel-team"
          role="tabpanel"
          aria-labelledby="tab-team"
          hidden={active !== "team"}
        >
          {active === "team" && (
            <div key="team" id="our-team" className="scroll-mt-28">
              <Reveal onMount>
                <EditableText
                  as="div"
                  className="text-[12px] font-semibold tracking-[0.22em] text-red-600"
                  value={team.kicker}
                  onChange={patchString((d, kicker) => ({
                    ...d,
                    team: { ...d.team, kicker },
                  }))}
                />
                <EditableText
                  as="h2"
                  className="mt-2 max-w-4xl text-2xl font-bold tracking-tight sm:text-3xl"
                  value={team.title}
                  onChange={patchString((d, title) => ({
                    ...d,
                    team: { ...d.team, title },
                  }))}
                />
                <EditableTextarea
                  className="mt-4 max-w-3xl text-base leading-7 text-zinc-600"
                  value={team.description}
                  onChange={patchString((d, description) => ({
                    ...d,
                    team: { ...d.team, description },
                  }))}
                />
              </Reveal>

              <RevealGroup
                onMount
                as="ul"
                className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4"
              >
                {team.members.map((m, index) => (
                  <RevealItem as="li" key={m.id}>
                    <motion.article
                      whileHover={editable ? undefined : hoverLift}
                      className="relative h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md hover:shadow-zinc-950/5"
                    >
                      {editable ? (
                        <CmsProductActions
                          onEdit={() => setTeamModal({ mode: "edit", index })}
                          onDelete={() => removeTeamMember(index)}
                        />
                      ) : null}
                      <div className="relative aspect-[3/4] w-full">
                        <Image
                          src={m.imageSrc}
                          alt={m.imageAlt}
                          fill
                          className="object-cover object-top"
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-base font-bold text-zinc-950">
                          {m.name}
                        </h3>
                        <p className="mt-1 text-sm font-semibold leading-snug text-red-600">
                          {m.role}
                        </p>
                        <p className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-zinc-500">
                          {m.location.toUpperCase()}
                        </p>
                      </div>
                    </motion.article>
                  </RevealItem>
                ))}
                {editable ? (
                  <RevealItem as="li">
                    <CmsAddProductCard
                      onClick={addTeamMember}
                      label="Add team member"
                    />
                  </RevealItem>
                ) : null}
              </RevealGroup>
            </div>
          )}
        </div>

        <div
          id="panel-values"
          role="tabpanel"
          aria-labelledby="tab-values"
          hidden={active !== "values"}
        >
          {active === "values" && (
            <div key="values" id="our-values" className="scroll-mt-28">
              <Reveal onMount>
                <EditableText
                  as="div"
                  className="text-[12px] font-semibold tracking-[0.22em] text-red-600"
                  value={values.kicker}
                  onChange={patchString((d, kicker) => ({
                    ...d,
                    values: { ...d.values, kicker },
                  }))}
                />
                <EditableText
                  as="h2"
                  className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
                  value={values.title}
                  onChange={patchString((d, title) => ({
                    ...d,
                    values: { ...d.values, title },
                  }))}
                />
              </Reveal>

              <div className="mt-8 sm:mt-10">
                <RevealGroup
                  onMount
                  as="ul"
                  className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {values.cards.map((v, index) => (
                    <RevealItem as="li" key={v.id}>
                      <motion.article
                        whileHover={editable ? undefined : hoverLift}
                        className="relative flex h-full flex-col rounded-2xl border border-zinc-100 bg-white p-7 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                      >
                        {editable ? (
                          <CmsProductActions
                            onEdit={() => setValueModal({ mode: "edit", index })}
                            onDelete={() => removeValueCard(index)}
                          />
                        ) : null}
                        <div
                          className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF2F2]"
                          aria-hidden
                        >
                          <AboutValueIcon id={v.icon} />
                        </div>
                        <h3 className="text-base font-bold leading-snug text-zinc-950">
                          {v.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-600">
                          {v.desc}
                        </p>
                      </motion.article>
                    </RevealItem>
                  ))}
                  {editable ? (
                    <RevealItem as="li">
                      <CmsAddProductCard
                        onClick={addValueCard}
                        label="Add value card"
                      />
                    </RevealItem>
                  ) : null}
                </RevealGroup>
              </div>
            </div>
          )}
        </div>

        <div
          id="panel-join"
          role="tabpanel"
          aria-labelledby="tab-join"
          hidden={active !== "join"}
        >
          {active === "join" && (
            <div
              key="join"
              className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12"
            >
              <Reveal onMount>
                <EditableText
                  as="div"
                  className="text-[12px] font-semibold tracking-[0.22em] text-red-600"
                  value={join.kicker}
                  onChange={patchString((d, kicker) => ({
                    ...d,
                    join: { ...d.join, kicker },
                  }))}
                />
                <EditableText
                  as="h2"
                  className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
                  value={join.title}
                  onChange={patchString((d, title) => ({
                    ...d,
                    join: { ...d.join, title },
                  }))}
                />
                <EditableTextarea
                  className="mt-4 text-base leading-7 text-zinc-600"
                  value={join.description}
                  onChange={patchString((d, description) => ({
                    ...d,
                    join: { ...d.join, description },
                  }))}
                />

                <ul className="mt-8 space-y-3 text-sm text-zinc-700">
                  {join.bullets.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-red-200 text-red-600">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        >
                          <path
                            d="M7 12l3 3 7-7"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <EditableText
                        as="span"
                        className="flex-1"
                        value={item}
                        onChange={
                          editable && onContentChange
                            ? (value) =>
                                onContentChange((prev) => {
                                  const bullets = [...prev.join.bullets];
                                  bullets[index] = value;
                                  return {
                                    ...prev,
                                    join: { ...prev.join, bullets },
                                  };
                                })
                            : undefined
                        }
                      />
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal
                onMount
                delay={0.15}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <PartnerApplicationForm />
              </Reveal>
            </div>
          )}
        </div>
      </Container>

      <section className="relative overflow-hidden border-t border-zinc-800 bg-zinc-950 text-white">
        <div className="absolute inset-0">
          {editable ? (
            <EditableImage
              src={bottomCta.backgroundImageSrc}
              alt=""
              fill
              className="object-cover object-center opacity-100"
              sizes="100vw"
              uploadFile={uploadAboutFile}
              onChange={
                onContentChange
                  ? (backgroundImageSrc) =>
                      onContentChange((prev) => ({
                        ...prev,
                        bottomCta: { ...prev.bottomCta, backgroundImageSrc },
                      }))
                  : undefined
              }
            />
          ) : (
            <Image
              src={bottomCta.backgroundImageSrc}
              alt=""
              fill
              className="object-cover object-center opacity-100"
              sizes="100vw"
              priority={false}
            />
          )}
          <div className="absolute inset-0 bg-black/10" aria-hidden />
        </div>
        <Container className="relative z-10 py-10 sm:py-16">
          <Reveal className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[1fr_auto_auto]">
            <div>
              <EditableText
                as="h2"
                className="text-2xl font-bold tracking-tight sm:text-3xl"
                value={bottomCta.title}
                onChange={patchString((d, title) => ({
                  ...d,
                  bottomCta: { ...d.bottomCta, title },
                }))}
              />
              <EditableTextarea
                className="mt-3 max-w-xl text-sm leading-6 text-zinc-200 sm:text-base sm:leading-7"
                value={bottomCta.description}
                onChange={patchString((d, description) => ({
                  ...d,
                  bottomCta: { ...d.bottomCta, description },
                }))}
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <EditableButtonLink
                label={bottomCta.primaryCta.label}
                href={bottomCta.primaryCta.href}
                onChange={
                  onContentChange
                    ? (value) =>
                        onContentChange((prev) => ({
                          ...prev,
                          bottomCta: { ...prev.bottomCta, primaryCta: value },
                        }))
                    : undefined
                }
                className="!bg-red-600 !text-white border-0 shadow-sm hover:!bg-red-700 focus-visible:ring-red-500/40"
              >
                {bottomCta.primaryCta.label}{" "}
                <span aria-hidden="true">→</span>
              </EditableButtonLink>
              {active === "values" ? null : (
                <EditableButtonLink
                  label={bottomCta.secondaryCta.label}
                  href={bottomCta.secondaryCta.href}
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
                  className="border-0 bg-white text-zinc-950 hover:bg-zinc-100"
                >
                  {bottomCta.secondaryCta.label}
                </EditableButtonLink>
              )}
            </div>
            <div className="hidden lg:flex lg:justify-end">
              {editable && onContentChange ? (
                <div className="relative w-36 xl:w-44">
                  <EditableImage
                    src={bottomCta.mascotImageSrc}
                    alt={bottomCta.mascotImageAlt}
                    className="relative aspect-[680/1024] w-full"
                    imageClassName="object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]"
                    uploadFile={uploadAboutFile}
                    onChange={(mascotImageSrc) =>
                      onContentChange((prev) => ({
                        ...prev,
                        bottomCta: { ...prev.bottomCta, mascotImageSrc },
                      }))
                    }
                  />
                </div>
              ) : (
                <Image
                  src={bottomCta.mascotImageSrc}
                  alt={bottomCta.mascotImageAlt}
                  width={680}
                  height={1024}
                  className="h-auto w-36 drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)] xl:w-44"
                  priority={false}
                />
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <TeamMemberEditModal
        open={teamModal !== null}
        mode={teamModal?.mode ?? "edit"}
        item={
          teamModal?.mode === "edit" && teamModal.index !== undefined
            ? team.members[teamModal.index] ?? null
            : null
        }
        onClose={() => setTeamModal(null)}
        onSave={(item) => {
          if (!teamModal || !onContentChange) return;
          if (teamModal.mode === "add") {
            onContentChange((prev) => ({
              ...prev,
              team: { ...prev.team, members: [...prev.team.members, item] },
            }));
          } else if (teamModal.index !== undefined) {
            onContentChange((prev) => {
              const members = [...prev.team.members];
              members[teamModal.index!] = item;
              return { ...prev, team: { ...prev.team, members } };
            });
          }
          setTeamModal(null);
        }}
      />
      <ValueCardEditModal
        open={valueModal !== null}
        mode={valueModal?.mode ?? "edit"}
        item={
          valueModal?.mode === "edit" && valueModal.index !== undefined
            ? values.cards[valueModal.index] ?? null
            : null
        }
        onClose={() => setValueModal(null)}
        onSave={(item) => {
          if (!valueModal || !onContentChange) return;
          if (valueModal.mode === "add") {
            onContentChange((prev) => ({
              ...prev,
              values: { ...prev.values, cards: [...prev.values.cards, item] },
            }));
          } else if (valueModal.index !== undefined) {
            onContentChange((prev) => {
              const cards = [...prev.values.cards];
              cards[valueModal.index!] = item;
              return { ...prev, values: { ...prev.values, cards } };
            });
          }
          setValueModal(null);
        }}
      />
    </div>
  );
}
