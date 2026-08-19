"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useState } from "react";

import { ButtonLink } from "@/components/site/Button";
import { EditableButtonLink } from "@/lib/page-cms/EditableButtonLink";
import { cmsItemModalTitle, type CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import { Container } from "@/components/site/Container";
import Image from "next/image";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { AccessoriesSection } from "./_components/AccessoriesSection";
import { BrandTabs, type InteractiveBrand } from "./_components/BrandTabs";
import { CategoryCard } from "./_components/CategoryCard";
import { SparklesIcon } from "./_components/SparklesIcon";
import { FeaturedVt13Band } from "./_components/FeaturedVt13Band";
import { ValuePropsAndTrustedBand } from "./_components/ValuePropsAndTrustedBand";
import { PanelFinderModal } from "./_components/PanelFinderModal";
import {
  IconLayoutPanelTop,
  IconMegaphone,
  IconMonitor,
  IconWrench,
  IconBookOpen,
} from "./_data/categoryIcons";
import { ProductCard } from "./_components/ProductCard";
import { CatalogCard } from "./_components/CatalogCard";
import { DataTable } from "./_components/DataTable";
import { ChecklistLine } from "./_components/ChecklistLine";
import { OneScreenSoftwareSuite } from "./_components/OneScreenSoftwareSuite";
import { SoftwareFeatureIcon } from "./_components/SoftwareFeatureIcon";

import { getCapabilityIcon } from "@/lib/products-page/icons";
import { EditableText, EditableTextarea } from "@/lib/products-page/EditableField";
import { CmsAddProductCard, CmsProductActions } from "@/lib/products-page/CmsProductActions";
import { EditableImage } from "@/lib/products-page/EditableImage";
import { ProductEditModal } from "@/lib/products-page/ProductEditModal";
import { TableEditModal } from "@/lib/products-page/TableEditModal";
import {
  emptyAccessoryItem,
  emptyCatalogItem,
  emptyInteractivePanel,
  emptyManagementApp,
} from "@/lib/products-page/productDefaults";
import type {
  AccessoryItem,
  CatalogItem,
  InteractivePanel,
  ManagementApp,
  ProductCategoryId,
  ProductsPageContent,
} from "@/lib/products-page/types";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Settings,
} from "lucide-react";
import Link from "next/link";

type ProductEditScope =
  | "panel"
  | "led"
  | "signage"
  | "accessory"
  | "managementApp"
  | "infocus";

type ProductEditTarget =
  | { scope: ProductEditScope; mode: "add" }
  | { scope: ProductEditScope; mode: "edit"; index: number };

export function ProductsPageClient({
  content,
  editable = false,
  onContentChange,
}: {
  content: ProductsPageContent;
  editable?: boolean;
  onContentChange?: Dispatch<SetStateAction<ProductsPageContent>>;
}) {
  const {
    hero,
    categories,
    virtualInteractive,
    led,
    signage,
    accessories,
    software,
    compare,
    dimensions,
    inFocus,
  } = content;

  const [activeCategory, setActiveCategory] = useState<ProductCategoryId>("interactive");
  const [interactiveBrand, setInteractiveBrand] = useState<InteractiveBrand>("virtual");
  const [panelFinderOpen, setPanelFinderOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ProductEditTarget | null>(null);
  const [tableEdit, setTableEdit] = useState<"compare" | "dimensions" | null>(null);

  const showInteractive = activeCategory === "interactive";
  const showLed = activeCategory === "led";
  const showSignage = activeCategory === "signage";
  const showAccessories = activeCategory === "accessories";
  const showSoftware = activeCategory === "software";

  const showInteractiveVirtual = showInteractive && interactiveBrand === "virtual";
  const showInteractiveOneScreen =
    showInteractive && interactiveBrand === "onescreen";
  const showInteractiveInFocus = showInteractive && interactiveBrand === "infocus";

  const categoryIcons: Record<ProductCategoryId, ReactNode> = {
    interactive: <IconMonitor />,
    led: <IconLayoutPanelTop />,
    signage: <IconMegaphone />,
    accessories: <IconWrench />,
    software: <IconBookOpen />,
  };

  function patchString(
    updater: (draft: ProductsPageContent, value: string) => ProductsPageContent,
  ): ((value: string) => void) | undefined {
    if (!editable || !onContentChange) return undefined;
    return (value: string) => onContentChange((prev) => updater(prev, value));
  }

  function removeProduct(
    scope: "panel" | "led" | "signage" | "accessory" | "infocus" | "managementApp",
    index: number,
  ) {
    if (!onContentChange) return;
    if (!window.confirm("Remove this product?")) return;
    onContentChange((prev) => {
      if (scope === "panel") {
        return {
          ...prev,
          virtualInteractive: {
            ...prev.virtualInteractive,
            panels: prev.virtualInteractive.panels.filter((_, i) => i !== index),
          },
        };
      }
      if (scope === "led") {
        return {
          ...prev,
          led: {
            ...prev.led,
            lineup: prev.led.lineup.filter((_, i) => i !== index),
          },
        };
      }
      if (scope === "signage") {
        return {
          ...prev,
          signage: {
            ...prev.signage,
            lineup: prev.signage.lineup.filter((_, i) => i !== index),
          },
        };
      }
      if (scope === "infocus") {
        return {
          ...prev,
          inFocus: {
            ...prev.inFocus,
            lineup: prev.inFocus.lineup.filter((_, i) => i !== index),
          },
        };
      }
      if (scope === "managementApp") {
        return {
          ...prev,
          software: {
            ...prev.software,
            managementApps: prev.software.managementApps.filter((_, i) => i !== index),
          },
        };
      }
      return {
        ...prev,
        accessories: {
          ...prev.accessories,
          items: prev.accessories.items.filter((_, i) => i !== index),
        },
      };
    });
  }

  function addProduct(scope: ProductEditScope) {
    setEditTarget({ scope, mode: "add" });
  }

  function saveEditedProduct(
    item: InteractivePanel | CatalogItem | AccessoryItem | ManagementApp,
  ) {
    if (!editTarget || !onContentChange) return;
    onContentChange((prev) => {
      if (editTarget.mode === "add") {
        if (editTarget.scope === "panel") {
          return {
            ...prev,
            virtualInteractive: {
              ...prev.virtualInteractive,
              panels: [...prev.virtualInteractive.panels, item as InteractivePanel],
            },
          };
        }
        if (editTarget.scope === "led") {
          return {
            ...prev,
            led: { ...prev.led, lineup: [...prev.led.lineup, item as CatalogItem] },
          };
        }
        if (editTarget.scope === "signage") {
          return {
            ...prev,
            signage: {
              ...prev.signage,
              lineup: [...prev.signage.lineup, item as CatalogItem],
            },
          };
        }
        if (editTarget.scope === "infocus") {
          return {
            ...prev,
            inFocus: {
              ...prev.inFocus,
              lineup: [...prev.inFocus.lineup, item as CatalogItem],
            },
          };
        }
        if (editTarget.scope === "managementApp") {
          return {
            ...prev,
            software: {
              ...prev.software,
              managementApps: [
                ...prev.software.managementApps,
                item as ManagementApp,
              ],
            },
          };
        }
        return {
          ...prev,
          accessories: {
            ...prev.accessories,
            items: [...prev.accessories.items, item as AccessoryItem],
          },
        };
      }

      if (editTarget.scope === "panel") {
        const panels = [...prev.virtualInteractive.panels];
        panels[editTarget.index] = item as InteractivePanel;
        return {
          ...prev,
          virtualInteractive: { ...prev.virtualInteractive, panels },
        };
      }
      if (editTarget.scope === "led") {
        const lineup = [...prev.led.lineup];
        lineup[editTarget.index] = item as CatalogItem;
        return { ...prev, led: { ...prev.led, lineup } };
      }
      if (editTarget.scope === "signage") {
        const lineup = [...prev.signage.lineup];
        lineup[editTarget.index] = item as CatalogItem;
        return { ...prev, signage: { ...prev.signage, lineup } };
      }
      if (editTarget.scope === "infocus") {
        const lineup = [...prev.inFocus.lineup];
        lineup[editTarget.index] = item as CatalogItem;
        return { ...prev, inFocus: { ...prev.inFocus, lineup } };
      }
      if (editTarget.scope === "managementApp") {
        const managementApps = [...prev.software.managementApps];
        managementApps[editTarget.index] = item as ManagementApp;
        return { ...prev, software: { ...prev.software, managementApps } };
      }
      const items = [...prev.accessories.items];
      items[editTarget.index] = item as AccessoryItem;
      return { ...prev, accessories: { ...prev.accessories, items } };
    });
    setEditTarget(null);
  }

  const modalTarget = (() => {
    if (!editTarget) return null;
    if (editTarget.mode === "add") {
      if (editTarget.scope === "panel") {
        return { kind: "panel" as const, item: emptyInteractivePanel() };
      }
      if (editTarget.scope === "managementApp") {
        return { kind: "managementApp" as const, item: emptyManagementApp() };
      }
      if (editTarget.scope === "accessory") {
        return { kind: "accessory" as const, item: emptyAccessoryItem() };
      }
      return { kind: "catalog" as const, item: emptyCatalogItem() };
    }
    if (editTarget.scope === "panel") {
      const item = virtualInteractive.panels[editTarget.index];
      return item ? ({ kind: "panel" as const, item }) : null;
    }
    if (editTarget.scope === "led") {
      const item = led.lineup[editTarget.index];
      return item ? ({ kind: "catalog" as const, item }) : null;
    }
    if (editTarget.scope === "signage") {
      const item = signage.lineup[editTarget.index];
      return item ? ({ kind: "catalog" as const, item }) : null;
    }
    if (editTarget.scope === "infocus") {
      const item = inFocus.lineup[editTarget.index];
      return item ? ({ kind: "catalog" as const, item }) : null;
    }
    if (editTarget.scope === "managementApp") {
      const item = software.managementApps[editTarget.index];
      return item ? ({ kind: "managementApp" as const, item }) : null;
    }
    const item = accessories.items[editTarget.index];
    return item ? ({ kind: "accessory" as const, item }) : null;
  })();

  const productModalTitle = (() => {
    if (!editTarget) return "";
    if (editTarget.scope === "panel" && editTarget.mode === "add") {
      return "Add New Product";
    }
    const labels: Record<ProductEditScope, string> = {
      panel: "interactive panel",
      led: "LED product",
      signage: "signage product",
      infocus: "InFocus product",
      accessory: "accessory",
      managementApp: "management app",
    };
    return cmsItemModalTitle(editTarget.mode, labels[editTarget.scope]);
  })();

  return (
    <div>
      <section className="relative border-b border-zinc-200 bg-zinc-100/50 pb-8 md:pb-14">
        <Container className="py-8 md:py-10">
          <Reveal onMount className="max-w-3xl">
            <EditableText
              as="p"
              className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600"
              value={hero.kicker}
              onChange={patchString((d, kicker) => ({
                ...d,
                hero: { ...d.hero, kicker },
              }))}
            />
            <EditableText
              as="h1"
              className="mt-2 text-[28px] font-extrabold leading-tight tracking-tight text-zinc-950 sm:text-3xl md:text-4xl lg:text-5xl"
              value={hero.title}
              onChange={patchString((d, title) => ({
                ...d,
                hero: { ...d.hero, title },
              }))}
            />
            <EditableTextarea
              className="mt-3 max-w-2xl text-sm text-zinc-600 md:text-base"
              value={hero.description}
              rows={3}
              onChange={patchString((d, description) => ({
                ...d,
                hero: { ...d.hero, description },
              }))}
            />
            <div className="mt-4">
              {editable ? (
                <div className="inline-flex min-h-[44px] items-center gap-1.5 text-left text-sm font-semibold text-red-600">
                  <SparklesIcon />
                  <EditableText
                    inline
                    className="text-sm font-semibold text-red-600"
                    value={hero.panelFinderCta}
                    onChange={patchString((d, panelFinderCta) => ({
                      ...d,
                      hero: { ...d.hero, panelFinderCta },
                    }))}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setPanelFinderOpen(true)}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-left text-sm font-semibold text-red-600 hover:underline"
                >
                  <SparklesIcon />
                  {hero.panelFinderCta}
                </button>
              )}
            </div>
          </Reveal>
        </Container>
        {/*
         * Category card band:
         *  - On lg+ (desktop), stays absolutely positioned and bleeds into the
         *    following section (translate-y-1/2) — preserves desktop look.
         *  - Below lg (mobile/tablet), it flows in normal layout under the
         *    hero so it can't visually collide with the section beneath.
         */}
        <div className="container-vti pointer-events-auto px-4 sm:px-5 lg:absolute lg:inset-x-0 lg:bottom-0 lg:translate-y-1/2 lg:px-5">
          <RevealGroup
            onMount
            className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-2.5 md:gap-3 lg:grid-cols-5"
          >
            {categories.map((category, index) => (
              <RevealItem
                key={category.id}
                className={
                  index === categories.length - 1 ? "col-span-2 sm:col-span-1" : undefined
                }
              >
                <CategoryCard
                  onClick={() => setActiveCategory(category.id)}
                  editable={editable}
                  label={category.label}
                  labelNode={
                    editable ? (
                      <EditableText
                        inline
                        className="whitespace-normal text-center text-[11px] font-bold uppercase leading-tight tracking-wide md:text-xs"
                        value={category.label}
                        onChange={patchString((d, label) => ({
                          ...d,
                          categories: d.categories.map((c) =>
                            c.id === category.id ? { ...c, label } : c,
                          ),
                        }))}
                      />
                    ) : undefined
                  }
                  isActive={activeCategory === category.id}
                  icon={categoryIcons[category.id]}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Container className="pt-10 pb-14 sm:pb-20 lg:pt-24">
        {showInteractive ? (
          <div className="mx-auto w-full max-w-xl">
            <BrandTabs
              active={interactiveBrand}
              onChange={setInteractiveBrand}
            />
          </div>
        ) : null}
        {showInteractiveVirtual ? (
          <section
            id="interactive-panels"
            className={`scroll-mt-24${showInteractive ? " mt-10" : ""}`}
          >
            <Reveal className="mx-auto max-w-3xl text-center">
              <EditableText
                as="p"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600"
                value={virtualInteractive.kicker}
                onChange={patchString((d, kicker) => ({
                  ...d,
                  virtualInteractive: { ...d.virtualInteractive, kicker },
                }))}
              />
              <EditableText
                as="h2"
                className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl"
                value={virtualInteractive.title}
                onChange={patchString((d, title) => ({
                  ...d,
                  virtualInteractive: { ...d.virtualInteractive, title },
                }))}
              />
              <EditableTextarea
                className="mx-auto mt-3 max-w-2xl text-base leading-6 text-zinc-600"
                value={virtualInteractive.description}
                rows={3}
                onChange={patchString((d, description) => ({
                  ...d,
                  virtualInteractive: { ...d.virtualInteractive, description },
                }))}
              />
            </Reveal>

            <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {virtualInteractive.panels.map((p, index) => (
                <RevealItem key={`panel-${index}-${p.name}`}>
                  <div className="relative">
                    {editable ? (
                      <CmsProductActions
                        onEdit={() => setEditTarget({ scope: "panel", mode: "edit", index })}
                        onDelete={() => removeProduct("panel", index)}
                      />
                    ) : null}
                    <ProductCard
                      name={p.name}
                      badge={p.badge}
                      imageSrc={p.imageSrc}
                      sizes={p.sizes}
                      desc={p.desc}
                      highlights={p.highlights}
                      actions={p.actions}
                    />
                  </div>
                </RevealItem>
              ))}
              {editable ? (
                <RevealItem>
                  <CmsAddProductCard
                    label="Add New Product"
                    onClick={() => addProduct("panel")}
                  />
                </RevealItem>
              ) : null}

              <RevealItem className="md:col-span-2 lg:col-span-2">
                <div className="relative flex h-full flex-col rounded-2xl border border-rose-100/80 p-6 sm:p-8">
                  <EditableText
                    as="p"
                    className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary"
                    value={virtualInteractive.capabilitiesHeading.kicker}
                    onChange={patchString((d, kicker) => ({
                      ...d,
                      virtualInteractive: {
                        ...d.virtualInteractive,
                        capabilitiesHeading: {
                          ...d.virtualInteractive.capabilitiesHeading,
                          kicker,
                        },
                      },
                    }))}
                  />
                  <EditableText
                    as="h3"
                    className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-950 md:text-[26px]"
                    value={virtualInteractive.capabilitiesHeading.title}
                    onChange={patchString((d, title) => ({
                      ...d,
                      virtualInteractive: {
                        ...d.virtualInteractive,
                        capabilitiesHeading: {
                          ...d.virtualInteractive.capabilitiesHeading,
                          title,
                        },
                      },
                    }))}
                  />
                  <div className="mt-6 grid flex-1 gap-4 sm:grid-cols-2">
                    {virtualInteractive.capabilities.map(({ icon, kicker, title, desc }, capIndex) => {
                      const Icon = getCapabilityIcon(icon);
                      return (
                      <article
                        key={`cap-${capIndex}-${title}`}
                        className="flex flex-col rounded-xl border border-rose-100/70 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                      >
                        <div className="flex items-start justify-between">
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-rose-100/90 bg-rose-50 text-red-600"
                            aria-hidden
                          >
                            <Icon className="h-5 w-5" strokeWidth={2} />
                          </div>
                          <EditableText
                            inline
                            className="font-mono text-[10px] font-bold tracking-widest text-zinc-400"
                            value={kicker}
                            onChange={
                              editable && onContentChange
                                ? (value) =>
                                    onContentChange((prev) => {
                                      const capabilities = [...prev.virtualInteractive.capabilities];
                                      capabilities[capIndex] = {
                                        ...capabilities[capIndex],
                                        kicker: value,
                                      };
                                      return {
                                        ...prev,
                                        virtualInteractive: {
                                          ...prev.virtualInteractive,
                                          capabilities,
                                        },
                                      };
                                    })
                                : undefined
                            }
                          />
                        </div>

                        <EditableText
                          as="h4"
                          className="mt-4 text-base font-bold leading-snug tracking-tight text-zinc-900"
                          value={title}
                          onChange={
                            editable && onContentChange
                              ? (value) =>
                                  onContentChange((prev) => {
                                    const capabilities = [...prev.virtualInteractive.capabilities];
                                    capabilities[capIndex] = {
                                      ...capabilities[capIndex],
                                      title: value,
                                    };
                                    return {
                                      ...prev,
                                      virtualInteractive: {
                                        ...prev.virtualInteractive,
                                        capabilities,
                                      },
                                    };
                                  })
                              : undefined
                          }
                        />
                        <EditableTextarea
                          className="mt-2 text-sm font-normal leading-relaxed text-zinc-600"
                          value={desc}
                          rows={3}
                          onChange={
                            editable && onContentChange
                              ? (value) =>
                                  onContentChange((prev) => {
                                    const capabilities = [...prev.virtualInteractive.capabilities];
                                    capabilities[capIndex] = {
                                      ...capabilities[capIndex],
                                      desc: value,
                                    };
                                    return {
                                      ...prev,
                                      virtualInteractive: {
                                        ...prev.virtualInteractive,
                                        capabilities,
                                      },
                                    };
                                  })
                              : undefined
                          }
                        />
                      </article>
                      );
                    })}
                  </div>
                </div>
              </RevealItem>
            </RevealGroup>
          </section>
        ) : null}

        {showInteractiveVirtual ? (
          <FeaturedVt13Band
            content={virtualInteractive.featuredVt13}
            editable={editable}
            onChange={
              editable && onContentChange
                ? (featuredVt13) =>
                    onContentChange((prev) => ({
                      ...prev,
                      virtualInteractive: { ...prev.virtualInteractive, featuredVt13 },
                    }))
                : undefined
            }
          />
        ) : null}

        {showLed ? (
          <section className="mt-14 sm:mt-16 scroll-mt-24" id="led">
            <Reveal className="text-center">
              <EditableText
                as="div"
                className="text-[12px] font-semibold tracking-[0.22em] text-red-600 uppercase"
                value={led.kicker}
                onChange={patchString((d, kicker) => ({
                  ...d,
                  led: { ...d.led, kicker },
                }))}
              />
              <EditableText
                as="h2"
                className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl text-zinc-950"
                value={led.title}
                onChange={patchString((d, title) => ({
                  ...d,
                  led: { ...d.led, title },
                }))}
              />
              <EditableTextarea
                className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600"
                value={led.description}
                rows={3}
                onChange={patchString((d, description) => ({
                  ...d,
                  led: { ...d.led, description },
                }))}
              />
            </Reveal>

            <RevealGroup className="mt-10 grid gap-4 lg:grid-cols-3">
              {led.lineup.map((p, index) => (
                <RevealItem key={`led-${index}-${p.name}`}>
                  <div className="relative">
                    {editable ? (
                      <CmsProductActions
                        onEdit={() => setEditTarget({ scope: "led", mode: "edit", index })}
                        onDelete={() => removeProduct("led", index)}
                      />
                    ) : null}
                    <CatalogCard
                      name={p.name}
                      badge={p.badge}
                      sizes={p.sizes}
                      desc={p.desc}
                      imageSrc={p.imageSrc}
                      videoSrc={p.videoSrc}
                      ctaLabel={p.ctaLabel ?? "Download Spec Sheet"}
                      ctaHref={p.ctaHref ?? "/contact"}
                    />
                  </div>
                </RevealItem>
              ))}
              {editable ? (
                <RevealItem>
                  <CmsAddProductCard
                    label="Add LED product"
                    onClick={() => addProduct("led")}
                  />
                </RevealItem>
              ) : null}
            </RevealGroup>

            <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              {/* <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div className="text-sm font-bold text-zinc-950">
                    Customer story · University of Central Arkansas
                  </div>
                </div>
                <div>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">
                    UCA runs 6 Virtual LED posters across campus alongside 11 VT
                    Pro p-cap panels. The poster photos throughout our gallery?
                    All from this install.
                  </p>
                </div>
                <ButtonLink href="/gallery" variant="secondary" size="sm">
                  See the UCA install
                </ButtonLink>
              </div> */}
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div>
                  <EditableText
                    as="h3"
                    className="text-lg font-bold text-zinc-950"
                    value={led.customerStory.title}
                    onChange={patchString((d, title) => ({
                      ...d,
                      led: {
                        ...d.led,
                        customerStory: { ...d.led.customerStory, title },
                      },
                    }))}
                  />
                  <EditableTextarea
                    className="my-2 text-sm text-zinc-600"
                    value={led.customerStory.body}
                    rows={3}
                    onChange={patchString((d, body) => ({
                      ...d,
                      led: {
                        ...d.led,
                        customerStory: { ...d.led.customerStory, body },
                      },
                    }))}
                  />
                  {editable ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <EditableText
                        className="text-sm font-semibold text-red-600"
                        value={led.customerStory.linkText}
                        onChange={patchString((d, linkText) => ({
                          ...d,
                          led: {
                            ...d.led,
                            customerStory: { ...d.led.customerStory, linkText },
                          },
                        }))}
                      />
                      <EditableText
                        className="text-sm text-zinc-500"
                        value={led.customerStory.linkHref}
                        onChange={patchString((d, linkHref) => ({
                          ...d,
                          led: {
                            ...d.led,
                            customerStory: { ...d.led.customerStory, linkHref },
                          },
                        }))}
                      />
                    </div>
                  ) : (
                    <Link
                      href={led.customerStory.linkHref}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      {led.customerStory.linkText} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {showInteractiveOneScreen ? (
          <section className="mt-10 scroll-mt-24" id="onescreen">
            <Reveal className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
                OneScreen — authorized dealer
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
                Touchscreen T7 — smarter screen, made to last.
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
                We're the original and only authorized distributor of the
                OneScreen line. The flagship T7 pairs a battle-tested
                collaboration panel with the GURU live-help service that comes
                standard on every OneScreen product.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 grid gap-6 lg:grid-cols-2">
              <RevealItem className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5">
                <div className="relative aspect-[16/9] w-full bg-zinc-100">
                  <Image
                    src="/products/onescreen-t7-DtnnEsSH.png"
                    alt="OneScreen Touchscreen T7"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 640px, 92vw"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5"
                  />
                  <div className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-red-600 px-2.5 py-1 text-[9px] font-extrabold tracking-[0.22em] text-white">
                    FLAGSHIP
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-5 text-left">
                    <div className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      Touchscreen T7
                    </div>
                    <p className="mt-1 text-sm font-medium text-white/90">
                      Smarter screen. Made to last.
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[11px] font-extrabold tracking-[0.22em] text-red-600">
                    TOUCHSCREEN T7
                  </div>
                  <div className="mt-2 text-lg font-semibold text-zinc-950">
                    Smarter screen. Made to last.
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    Built for speed and efficiency with an Octa-core processor,
                    8GB RAM, 128GB storage, and Android 15 — all backed by
                    Google EDLA certification.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Multitask effortlessly: share your screen, annotate, process
                    data, and extend your display across multiple screens — all
                    at once.
                  </p>

                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2.5">
                    {[
                      "Octa-core processor",
                      "8GB RAM · 128GB storage",
                      "Android 15",
                      "Google EDLA certified",
                      "Screen share + extend",
                      "Annotate & multitask",
                    ].map((h) => (
                      <ChecklistLine key={h}>{h}</ChecklistLine>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap justify-start gap-x-6 gap-y-3 sm:gap-8">
                    <a
                      href="/pdf/OneScreen_T7-Business-105_Spec_Sheet.pdf"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline border-b border-red-600/20"
                    >
                      105&quot; Business Spec
                      <span aria-hidden>→</span>
                    </a>
                    <a
                      href="/pdf/OneScreen_T7-Education-86_Spec_Sheet.pdf"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline border-b border-red-600/20"
                    >
                      86&quot; Education Spec
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </RevealItem>

              <RevealItem className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
                  <div className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-zinc-950 px-2.5 py-1 text-[9px] font-extrabold tracking-[0.22em] text-white">
                    INCLUDED
                  </div>
                  <div className="absolute inset-0 p-6 sm:p-8">
                    <div className="relative h-full w-full min-h-0 min-w-0">
                      <Image
                        src="/products/onescreen-guru-badge-5aFHwYcl.png"
                        alt="GURU Help 24/5"
                        fill
                        className="object-contain"
                        sizes="(min-width: 1024px) 40vw, 90vw"
                      />
                    </div>
                  </div>
                </div>
                <div className="border-t border-zinc-200 p-6">
                  <div className="text-[11px] font-extrabold tracking-[0.22em] text-red-600">
                    GURU HELP · 24/5
                  </div>
                  <div className="mt-2 text-lg font-semibold text-zinc-950">
                    Live human support, included.
                  </div>
                  <p className="mt-2 text-[12px] font-semibold text-zinc-500">
                    24/5 Live GURU Support Included · Available for All
                    OneScreen Products
                  </p>
                  <p className="mt-4 text-sm leading-6 text-zinc-600">
                    Every OneScreen product ships with 24/5 live GURU support —
                    real people who help your team get unstuck on day one and
                    every day after.
                  </p>

                  <ul className="mt-5 m-0 flex list-none flex-col gap-2.5 p-0">
                    {[
                      "24/5 live human support — no chatbots",
                      "Available for all OneScreen products",
                      "Onboarding, training, and troubleshooting",
                      "Pairs with your assigned Virtual rep",
                    ].map((x) => (
                      <li key={x}>
                        <ChecklistLine>{x}</ChecklistLine>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-sm italic leading-6 text-zinc-500">
                    Your Virtual rep is your first call — GURU is the global
                    safety net behind it.
                  </p>
                </div>
              </RevealItem>
            </RevealGroup>

            <OneScreenSoftwareSuite />
          </section>
        ) : null}

        {showInteractiveInFocus ? (
          <section className="mt-10 scroll-mt-24" id="infocus">
            <Reveal className="text-center">
              <EditableText
                as="p"
                className="text-[12px] font-semibold uppercase tracking-[0.2em] text-red-600"
                value={inFocus.kicker}
                onChange={patchString((d, kicker) => ({
                  ...d,
                  inFocus: { ...d.inFocus, kicker },
                }))}
              />
              <EditableText
                as="h2"
                className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl"
                value={inFocus.title}
                onChange={patchString((d, title) => ({
                  ...d,
                  inFocus: { ...d.inFocus, title },
                }))}
              />
              <EditableTextarea
                className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600"
                value={inFocus.description}
                rows={2}
                onChange={patchString((d, description) => ({
                  ...d,
                  inFocus: { ...d.inFocus, description },
                }))}
              />
              <EditableTextarea
                className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-zinc-600"
                value={inFocus.description2 ?? ""}
                rows={2}
                onChange={patchString((d, description2) => ({
                  ...d,
                  inFocus: { ...d.inFocus, description2 },
                }))}
              />
            </Reveal>

            <RevealGroup className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-3">
              {inFocus.lineup.map((p, index) => (
                <RevealItem key={`infocus-${index}-${p.name}`}>
                  <div className="relative">
                    {editable ? (
                      <CmsProductActions
                        onEdit={() => setEditTarget({ scope: "infocus", mode: "edit", index })}
                        onDelete={() => removeProduct("infocus", index)}
                      />
                    ) : null}
                    <CatalogCard
                      name={p.name}
                      badge={p.badge}
                      sizes={p.sizes}
                      desc={p.desc}
                      imageSrc={p.imageSrc}
                      ctaLabel={p.ctaLabel ?? "Download Spec Sheet"}
                      ctaHref={p.ctaHref ?? "/contact"}
                    />
                  </div>
                </RevealItem>
              ))}
              {editable ? (
                <RevealItem>
                  <CmsAddProductCard
                    label="Add InFocus product"
                    onClick={() => addProduct("infocus")}
                  />
                </RevealItem>
              ) : null}
            </RevealGroup>

            {inFocus.footerNote ? (
              editable ? (
                <EditableTextarea
                  className="mt-8 text-center text-sm text-zinc-500"
                  value={inFocus.footerNote}
                  rows={2}
                  onChange={patchString((d, footerNote) => ({
                    ...d,
                    inFocus: { ...d.inFocus, footerNote },
                  }))}
                />
              ) : (
                <div className="mt-8 text-center text-sm text-zinc-500">
                  {inFocus.footerNote}
                </div>
              )
            ) : null}
          </section>
        ) : null}

        {showSignage ? (
          <section className="mt-14 sm:mt-16 scroll-mt-24" id="signage">
            <Reveal className="text-center">
              <EditableText
                as="div"
                className="text-[12px] font-semibold tracking-[0.22em] text-red-600"
                value={signage.kicker}
                onChange={patchString((d, kicker) => ({
                  ...d,
                  signage: { ...d.signage, kicker },
                }))}
              />
              <EditableText
                as="h2"
                className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl text-zinc-950"
                value={signage.title}
                onChange={patchString((d, title) => ({
                  ...d,
                  signage: { ...d.signage, title },
                }))}
              />
              <EditableTextarea
                className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-zinc-600"
                value={signage.description}
                rows={3}
                onChange={patchString((d, description) => ({
                  ...d,
                  signage: { ...d.signage, description },
                }))}
              />
            </Reveal>

            <RevealGroup className="mt-10 grid gap-4 lg:grid-cols-3">
              {signage.lineup.map((p, index) => (
                <RevealItem key={`signage-${index}-${p.name}`}>
                  <div className="relative">
                    {editable ? (
                      <CmsProductActions
                        onEdit={() => setEditTarget({ scope: "signage", mode: "edit", index })}
                        onDelete={() => removeProduct("signage", index)}
                      />
                    ) : null}
                    <CatalogCard
                      name={p.name}
                      badge={p.badge}
                      sizes={p.sizes}
                      desc={p.desc}
                      imageSrc={p.imageSrc}
                      ctaLabel={p.ctaLabel ?? "Download Spec Sheet"}
                      ctaHref={p.ctaHref ?? "/contact"}
                    />
                  </div>
                </RevealItem>
              ))}
              {editable ? (
                <RevealItem>
                  <CmsAddProductCard
                    label="Add signage product"
                    onClick={() => addProduct("signage")}
                  />
                </RevealItem>
              ) : null}
            </RevealGroup>

            {editable ? (
              <EditableTextarea
                className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-6 text-zinc-600"
                value={signage.footerNote}
                rows={3}
                onChange={patchString((d, footerNote) => ({
                  ...d,
                  signage: { ...d.signage, footerNote },
                }))}
              />
            ) : (
              <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-6 text-zinc-600">
                {signage.footerNote}
              </div>
            )}
          </section>
        ) : null}

        {showAccessories ? (
          <AccessoriesSection
            content={accessories}
            editable={editable}
            onChange={
              editable && onContentChange
                ? (next) => onContentChange((prev) => ({ ...prev, accessories: next }))
                : undefined
            }
            onEditItem={(index) => setEditTarget({ scope: "accessory", mode: "edit", index })}
            onRemoveItem={(index) => removeProduct("accessory", index)}
            onAddItem={() => addProduct("accessory")}
          />
        ) : null}

        {showSoftware ? (
          <section className="mt-14 sm:mt-16 scroll-mt-24" id="software">
            <Reveal className="text-center">
              <EditableText
                as="h2"
                className="text-2xl font-semibold tracking-tight sm:text-3xl text-zinc-950"
                value={software.title}
                onChange={patchString((d, title) => ({
                  ...d,
                  software: { ...d.software, title },
                }))}
              />
              <EditableTextarea
                className="mx-auto mt-3 max-w-[760px] text-sm leading-5 text-zinc-500"
                value={software.description}
                rows={2}
                onChange={patchString((d, description) => ({
                  ...d,
                  software: { ...d.software, description },
                }))}
              />
            </Reveal>

            {/* <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2">
              {softwareFeatures.map((f) => (
                <RevealItem
                  key={f.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5 text-zinc-950 transition-shadow hover:shadow-md hover:shadow-zinc-950/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-red-600"
                    >
                      <SoftwareFeatureIcon name={f.icon} className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold">{f.title}</div>
                  </div>
                  <p className="mt-2 text-[12px] leading-5 text-zinc-500">
                    {f.desc}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup> */}

            <Reveal className="mt-12">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-red-600">
                  <BookOpen className="h-5 w-5" />
                </span>
                <EditableText
                  as="p"
                  className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary"
                  value={software.oerKicker}
                  onChange={patchString((d, oerKicker) => ({
                    ...d,
                    software: { ...d.software, oerKicker },
                  }))}
                />
              </div>
              <EditableText
                as="h3"
                className="mt-3 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl text-zinc-950"
                value={software.oerTitle}
                onChange={patchString((d, oerTitle) => ({
                  ...d,
                  software: { ...d.software, oerTitle },
                }))}
              />
            </Reveal>

            <Reveal className="mt-10 relative overflow-hidden rounded-3xl bg-zinc-950 p-8 text-white sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-charcoal"
              />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] text-white ring-1 ring-inset ring-red-500/30">
                    <BookOpen className="h-4 w-4" />
                    <EditableText
                      className="text-[11px] font-extrabold tracking-[0.22em] text-white"
                      value={software.oerBadge}
                      onChange={patchString((d, oerBadge) => ({
                        ...d,
                        software: { ...d.software, oerBadge },
                      }))}
                    />
                  </div>

                  <EditableText
                    as="div"
                    className="mt-4 text-2xl font-semibold text-white"
                    value={software.oerHeadline}
                    onChange={patchString((d, oerHeadline) => ({
                      ...d,
                      software: { ...d.software, oerHeadline },
                    }))}
                  />
                  <EditableTextarea
                    className="mt-1 text-sm font-semibold text-white/70"
                    value={software.oerSubhead}
                    rows={3}
                    onChange={patchString((d, oerSubhead) => ({
                      ...d,
                      software: { ...d.software, oerSubhead },
                    }))}
                  />

                  <div className="mt-5 flex flex-wrap gap-2">
                    {software.oerTags.map((tag, tagIndex) => (
                      <span
                        key={`oer-tag-${tagIndex}`}
                        className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-white/85"
                      >
                        <EditableText
                          inline
                          className="text-xs font-semibold text-white/85"
                          value={tag}
                          onChange={
                            editable && onContentChange
                              ? (value) =>
                                  onContentChange((prev) => {
                                    const oerTags = [...prev.software.oerTags];
                                    oerTags[tagIndex] = value;
                                    return {
                                      ...prev,
                                      software: { ...prev.software, oerTags },
                                    };
                                  })
                              : undefined
                          }
                        />
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl bg-white/5 p-5 ring-1 ring-inset ring-white/10">
                    <EditableText
                      className="text-[11px] font-extrabold tracking-[0.22em] text-primary"
                      value={software.oerExplainerTitle}
                      onChange={patchString((d, oerExplainerTitle) => ({
                        ...d,
                        software: { ...d.software, oerExplainerTitle },
                      }))}
                    />
                    <EditableTextarea
                      className="mt-2 text-sm leading-6 text-white/80"
                      value={software.oerExplainerBody}
                      rows={4}
                      onChange={patchString((d, oerExplainerBody) => ({
                        ...d,
                        software: { ...d.software, oerExplainerBody },
                      }))}
                    />
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <EditableButtonLink
                      label={software.oerPrimaryCta}
                      href={software.oerPrimaryHref}
                      onChange={
                        onContentChange
                          ? (value) =>
                              onContentChange((prev) => ({
                                ...prev,
                                software: {
                                  ...prev.software,
                                  oerPrimaryCta: value.label,
                                  oerPrimaryHref: value.href,
                                },
                              }))
                          : undefined
                      }
                      size="sm"
                      className="!bg-red-600 !text-white hover:!bg-red-700"
                    >
                      {software.oerPrimaryCta}
                    </EditableButtonLink>
                    <EditableButtonLink
                      label={software.oerSecondaryCta}
                      href={software.oerSecondaryHref}
                      onChange={
                        onContentChange
                          ? (value) =>
                              onContentChange((prev) => ({
                                ...prev,
                                software: {
                                  ...prev.software,
                                  oerSecondaryCta: value.label,
                                  oerSecondaryHref: value.href,
                                },
                              }))
                          : undefined
                      }
                      size="sm"
                      variant="ghost"
                      className="border border-white/15 bg-transparent !text-white hover:bg-white/10"
                    >
                      {software.oerSecondaryCta}
                    </EditableButtonLink>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-white/5 p-4 ring-1 ring-inset ring-white/10">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-white ring-1 ring-white/10">
                    <EditableImage
                      src={software.oerImageSrc}
                      alt={software.oerTitle}
                      onChange={patchString((d, oerImageSrc) => ({
                        ...d,
                        software: { ...d.software, oerImageSrc },
                      }))}
                      className="relative h-full w-full"
                      imageClassName="object-cover"
                      sizes="420px"
                      fill
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-14 sm:mt-16">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 ring-1 ring-inset ring-cyan-100"
                >
                  <Settings className="h-5 w-5" />
                </span>
                <EditableText
                  as="p"
                  className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-700"
                  value={software.managementKicker}
                  onChange={patchString((d, managementKicker) => ({
                    ...d,
                    software: { ...d.software, managementKicker },
                  }))}
                />
              </div>
              <EditableText
                as="h3"
                className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl"
                value={software.managementTitle}
                onChange={patchString((d, managementTitle) => ({
                  ...d,
                  software: { ...d.software, managementTitle },
                }))}
              />
              <EditableTextarea
                className="mt-3 max-w-2xl text-base leading-7 text-zinc-600"
                value={software.managementDescription}
                rows={3}
                onChange={patchString((d, managementDescription) => ({
                  ...d,
                  software: { ...d.software, managementDescription },
                }))}
              />
            </Reveal>

            <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2">
              {software.managementApps.map((app, index) => (
                <RevealItem
                  key={`mgmt-${index}-${app.name}`}
                  className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-950/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md hover:shadow-zinc-950/10"
                >
                  {editable ? (
                    <CmsProductActions
                      onEdit={() => setEditTarget({ scope: "managementApp", mode: "edit", index })}
                      onDelete={() => removeProduct("managementApp", index)}
                    />
                  ) : null}
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-xl font-extrabold tracking-tight text-zinc-950">
                      {app.name}
                    </h4>
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-600">
                      {app.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{app.desc}</p>
                  <ul className="mt-4 m-0 flex list-none flex-col gap-1.5 p-0">
                    {app.bullets.map((b) => (
                      <li key={b}>
                        <ChecklistLine>{b}</ChecklistLine>
                      </li>
                    ))}
                  </ul>
                  <div
                    aria-hidden
                    className="mt-5 h-px w-10 bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-300 group-hover:w-20"
                  />
                </RevealItem>
              ))}
              {editable ? (
                <RevealItem>
                  <CmsAddProductCard
                    label="Add management app"
                    onClick={() => addProduct("managementApp")}
                  />
                </RevealItem>
              ) : null}
            </RevealGroup>
          </section>
        ) : null}

        {showInteractiveVirtual ? (
          <section className="mt-14 sm:mt-16">
            <Reveal>
              <div className="max-w-3xl">
                <EditableText
                  as="div"
                  className="text-[12px] font-semibold tracking-[0.22em] text-red-600"
                  value={compare.kicker}
                  onChange={patchString((d, kicker) => ({
                    ...d,
                    compare: { ...d.compare, kicker },
                  }))}
                />
                <EditableText
                  as="h2"
                  className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl text-zinc-950"
                  value={compare.title}
                  onChange={patchString((d, title) => ({
                    ...d,
                    compare: { ...d.compare, title },
                  }))}
                />
                <EditableTextarea
                  className="mt-3 text-zinc-600"
                  value={compare.lead}
                  rows={2}
                  onChange={patchString((d, lead) => ({
                    ...d,
                    compare: { ...d.compare, lead },
                  }))}
                />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              {editable ? (
                <button
                  type="button"
                  onClick={() => setTableEdit("compare")}
                  className="mb-3 text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Edit comparison table
                </button>
              ) : null}
              <DataTable
                columns={compare.columns}
                rows={compare.rows.map((r) =>
                  r.label === "Warranty"
                    ? [r.label, { value: r.a, colSpan: 3 }]
                    : [r.label, r.a, r.b, r.c],
                )}
              />
            </Reveal>
          </section>
        ) : null}

        {showInteractiveVirtual ? (
          <section className="mt-14 sm:mt-16">
            <Reveal className="max-w-3xl">
              <EditableText
                as="div"
                className="text-[12px] font-semibold tracking-[0.22em] text-red-600"
                value={dimensions.kicker}
                onChange={patchString((d, kicker) => ({
                  ...d,
                  dimensions: { ...d.dimensions, kicker },
                }))}
              />
              <EditableText
                as="h2"
                className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl text-zinc-950"
                value={dimensions.title}
                onChange={patchString((d, title) => ({
                  ...d,
                  dimensions: { ...d.dimensions, title },
                }))}
              />
              <EditableTextarea
                className="mt-3 text-sm leading-6 text-zinc-600"
                value={dimensions.description}
                rows={3}
                onChange={patchString((d, description) => ({
                  ...d,
                  dimensions: { ...d.dimensions, description },
                }))}
              />
            </Reveal>

            <Reveal delay={0.1} className="mt-7">
              {editable ? (
                <button
                  type="button"
                  onClick={() => setTableEdit("dimensions")}
                  className="mb-3 text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Edit dimensions table
                </button>
              ) : null}
              <DataTable
                columns={[
                  "Panel size",
                  "Active screen (W × H)",
                  "Outer panel (W × H × D)",
                  "Weight",
                  "VESA mount",
                ]}
                rows={dimensions.rows.map((r) => [
                  r.size,
                  r.active,
                  r.outer,
                  r.weight,
                  r.vesa,
                ])}
              />
            </Reveal>

            {editable ? (
              <EditableTextarea
                className="mt-4 max-w-4xl text-[12px] leading-5 text-zinc-500"
                value={dimensions.disclaimer}
                rows={3}
                onChange={patchString((d, disclaimer) => ({
                  ...d,
                  dimensions: { ...d.dimensions, disclaimer },
                }))}
              />
            ) : (
              <p className="mt-4 max-w-4xl text-[12px] leading-5 text-zinc-500">
                {dimensions.disclaimer}
              </p>
            )}
          </section>
        ) : null}

        {!editable ? (
          <div className="mt-14 sm:mt-16">
            <ValuePropsAndTrustedBand showValueProps={false} />
          </div>
        ) : null}

        {/* <section className="mt-10 sm:mt-12">
          <Reveal className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
              <div>
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-3xl">
                  Need a side-by-side spec sheet?
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                  We&apos;ll send a tailored spec packet for the rooms
                  you&apos;re outfitting — across Virtual, OneScreen, or
                  InFocus.
                </p>
              </div>
              <div className="md:pt-1 md:text-right">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-red-500 hover:underline"
                >
                  Contact Us
                  <span aria-hidden="true" className="inline-block">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-8 grid gap-4 border-t border-zinc-200 pt-8 sm:mt-9 sm:grid-cols-3 sm:gap-6 sm:pt-9">
              {(
                [
                  "Plain-English spec sheets",
                  "Reseller pricing on request",
                  "Loaner/demo units available",
                ] as const
              ).map((line) => (
                <div key={line} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-white"
                    aria-hidden
                  >
                    <svg
                      className="h-2.5 w-2.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 6" />
                    </svg>
                  </span>
                  <span className="text-sm leading-6 text-zinc-600">
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section> */}
      </Container>

      <PanelFinderModal
        open={!editable && panelFinderOpen}
        onClose={() => setPanelFinderOpen(false)}
      />

      <ProductEditModal
        key={
          editTarget
            ? `${editTarget.scope}-${editTarget.mode}-${editTarget.mode === "edit" ? editTarget.index : "new"}`
            : "closed"
        }
        open={Boolean(editTarget && modalTarget)}
        mode={editTarget?.mode ?? "edit"}
        title={productModalTitle}
        target={modalTarget}
        onClose={() => setEditTarget(null)}
        onSave={saveEditedProduct}
      />

      <TableEditModal
        open={tableEdit === "compare"}
        title="Edit comparison table"
        mode="compare"
        compareRows={compare.rows}
        onClose={() => setTableEdit(null)}
        onSaveCompare={
          onContentChange
            ? (rows) =>
                onContentChange((prev) => ({
                  ...prev,
                  compare: { ...prev.compare, rows },
                }))
            : undefined
        }
      />

      <TableEditModal
        open={tableEdit === "dimensions"}
        title="Edit dimensions table"
        mode="dimensions"
        dimensionRows={dimensions.rows}
        onClose={() => setTableEdit(null)}
        onSaveDimensions={
          onContentChange
            ? (rows) =>
                onContentChange((prev) => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, rows },
                }))
            : undefined
        }
      />
    </div>
  );
}
