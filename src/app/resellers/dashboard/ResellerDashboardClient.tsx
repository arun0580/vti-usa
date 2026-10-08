"use client";

import type { Dispatch, DragEvent, ReactNode, SetStateAction } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/cn";
import { hoverLift, tapPress } from "@/lib/motion";
import { isPdfPath } from "@/lib/products-page/uploads";
import type { CmsItemModalMode } from "@/lib/page-cms/cmsModalMode";
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import { CmsAddProductCard, CmsProductActions } from "@/lib/products-page/CmsProductActions";
import { EditableText } from "@/lib/products-page/EditableField";
import { resellerSignout } from "@/lib/reseller-auth/api";
import type { ResellerProfile } from "@/lib/reseller-auth/types";
import {
  AccountTeamEditModal,
  ActionCardEditModal,
  AnnouncementEditModal,
  AssetItemEditModal,
  TrainingCourseEditModal,
} from "@/lib/reseller-portal-page/PortalEditModals";
import type {
  AssetLibrarySectionOrder,
  PortalActionCard,
  PortalAnnouncement,
  PortalAssetItem,
  PortalTrainingCourse,
  ResellerPortalPageContent,
} from "@/lib/reseller-portal-page/types";
import {
  IconArrow,
  IconCalendar,
  IconDocument,
  IconDownload,
  IconSignOut,
  IconSparkles,
  QuickActionIcon,
  ResourceIcon,
  TrainingIcon,
} from "./_components/DashboardIcons";
import {
  DEFAULT_PORTAL_COMING_SOON_MESSAGE,
  hasPortalLink,
  PortalComingSoonPopover,
} from "./_components/PortalComingSoonPopover";

const labelClass =
  "text-[11px] font-bold uppercase tracking-[0.2em] text-red-600";

type AssetListKey = "specSheets" | "onescreenAssets" | "ledSignageAssets";

type EditTarget =
  | { kind: "quickAction"; mode: CmsItemModalMode; index?: number }
  | { kind: "resourceCard"; mode: CmsItemModalMode; index?: number }
  | { kind: "asset"; list: AssetListKey; mode: CmsItemModalMode; index?: number }
  | { kind: "training"; mode: CmsItemModalMode; index?: number }
  | { kind: "announcement"; mode: CmsItemModalMode; index?: number }
  | null;

function SectionHeading({
  label,
  title,
  className,
  onLabelChange,
  onTitleChange,
}: {
  label?: string;
  title: string;
  className?: string;
  onLabelChange?: (value: string) => void;
  onTitleChange?: (value: string) => void;
}) {
  const showLabel = Boolean(label) || Boolean(onLabelChange);
  return (
    <div className={className}>
      {showLabel ? (
        <EditableText
          as="p"
          className={labelClass}
          value={label ?? ""}
          onChange={onLabelChange}
        />
      ) : null}
      <EditableText
        as="h2"
        className={`${showLabel ? "mt-2 " : ""}text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl`}
        value={title}
        onChange={onTitleChange}
      />
    </div>
  );
}

const resourceCtaClass =
  "mt-6 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-red-600 hover:text-red-700";

function SectionMoveButton({
  direction,
  onClick,
}: {
  direction: "up" | "down";
  onClick: () => void;
}) {
  const Icon = direction === "up" ? ArrowUp : ArrowDown;
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-8 shrink-0 items-center gap-1 rounded-lg border border-red-200 bg-white/95 px-2 text-xs font-semibold text-red-700 shadow-sm hover:bg-red-50"
    >
      <Icon className="h-3.5 w-3.5" />
      {direction === "up" ? "Move up" : "Move down"}
    </button>
  );
}

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-red-50">
      {children}
    </div>
  );
}

function RowIconBadge({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-zinc-100/90">
      {children}
    </div>
  );
}

function DashboardPanel({
  label,
  title,
  headerIcon,
  children,
  onLabelChange,
  onTitleChange,
}: {
  label: string;
  title: string;
  headerIcon: ReactNode;
  children: ReactNode;
  onLabelChange?: (value: string) => void;
  onTitleChange?: (value: string) => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="border-b border-zinc-100 bg-white px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex gap-3 sm:gap-4">
          <IconBadge>{headerIcon}</IconBadge>
          <div className="min-w-0">
            <EditableText as="p" className={labelClass} value={label} onChange={onLabelChange} />
            <EditableText
              as="h2"
              className="mt-1.5 text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl"
              value={title}
              onChange={onTitleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}

function ActionCardCta({
  href,
  cta,
  onComingSoon,
}: {
  href: string;
  cta: string;
  onComingSoon?: () => void;
}) {
  const className =
    "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700";
  if (!hasPortalLink(href)) {
    return (
      <button
        type="button"
        onClick={onComingSoon}
        className={cn(className, "cursor-pointer text-red-600/80 hover:text-red-700")}
      >
        {cta}
        <IconArrow />
      </button>
    );
  }
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={className}>
        {cta}
        <IconArrow />
      </a>
    );
  }
  if (isPdfPath(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {cta}
        <IconArrow />
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {cta}
      <IconArrow />
    </Link>
  );
}

function ResourceCardCta({
  href,
  cta,
  onComingSoon,
}: {
  href: string;
  cta: string;
  onComingSoon?: () => void;
}) {
  const label = cta.toUpperCase();
  if (!hasPortalLink(href)) {
    return (
      <button
        type="button"
        onClick={onComingSoon}
        className={cn(resourceCtaClass, "cursor-pointer text-red-600/80 hover:text-red-700")}
      >
        {label}
        <IconArrow />
      </button>
    );
  }
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={resourceCtaClass}>
        {label}
        <IconArrow />
      </a>
    );
  }
  if (isPdfPath(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={resourceCtaClass}>
        {label}
        <IconArrow />
      </a>
    );
  }
  return (
    <Link href={href} className={resourceCtaClass}>
      {label}
      <IconArrow />
    </Link>
  );
}

function reorderItems<T>(items: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) {
    return items;
  }
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

function ResourceCard({
  title,
  description,
  href,
  cta,
  icon,
  editable,
  onEdit,
  onDelete,
  onComingSoon,
  draggable,
  isDragging,
  isDropTarget,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: PortalActionCard & {
  editable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onComingSoon?: () => void;
  draggable?: boolean;
  isDragging?: boolean;
  isDropTarget?: boolean;
  onDragStart?: (event: DragEvent<HTMLButtonElement>) => void;
  onDragOver?: (event: DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnd?: () => void;
}) {
  return (
    <motion.div
      whileHover={!isDragging && hasPortalLink(href) ? hoverLift : undefined}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={cn(
        "relative flex h-full flex-col rounded-xl border border-zinc-200/90 bg-white p-6 shadow-sm",
        editable && "ring-1 ring-red-100/40",
        isDragging && "opacity-50",
        isDropTarget && "ring-2 ring-red-400",
      )}
    >
      {editable ? (
        <CmsProductActions
          onEdit={onEdit!}
          onDelete={onDelete!}
          dragHandle={
            draggable ? (
              <button
                type="button"
                draggable
                onDragStart={onDragStart}
                aria-label="Drag and drop to reorder"
                className="inline-flex h-8 cursor-grab items-center gap-1 rounded-lg border border-red-200 bg-white/95 px-2 text-xs font-semibold text-red-700 shadow-sm hover:bg-red-50 active:cursor-grabbing"
              >
                <GripVertical className="h-3.5 w-3.5" />
                Drag & Drop
              </button>
            ) : null
          }
        />
      ) : null}
      <IconBadge>
        <ResourceIcon name={icon} />
      </IconBadge>
      <h3 className="mt-4 text-lg font-bold tracking-tight text-zinc-950">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{description}</p>
      <ResourceCardCta href={href} cta={cta} onComingSoon={onComingSoon} />
    </motion.div>
  );
}

function ActionCard({
  title,
  description,
  href,
  cta,
  icon,
  editable,
  onEdit,
  onDelete,
  onComingSoon,
}: PortalActionCard & {
  editable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onComingSoon?: () => void;
}) {
  return (
    <motion.div
      whileHover={hasPortalLink(href) ? hoverLift : undefined}
      className={cn(
        "relative flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6",
        editable && "ring-1 ring-red-100/40",
      )}
    >
      {editable ? <CmsProductActions onEdit={onEdit!} onDelete={onDelete!} /> : null}
      <IconBadge>
        <QuickActionIcon name={icon} />
      </IconBadge>
      <h3 className="mt-4 text-base font-bold text-zinc-950">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{description}</p>
      <ActionCardCta href={href} cta={cta} onComingSoon={onComingSoon} />
    </motion.div>
  );
}

function AssetListCard({
  title,
  items,
  editable,
  onTitleChange,
  onEditItem,
  onDeleteItem,
  onAddItem,
  onComingSoon,
  onReorderItem,
  dragIndex,
  overIndex,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}: {
  title: string;
  items: PortalAssetItem[];
  editable?: boolean;
  onTitleChange?: (value: string) => void;
  onEditItem?: (index: number) => void;
  onDeleteItem?: (index: number) => void;
  onAddItem?: () => void;
  onComingSoon?: () => void;
  onReorderItem?: (from: number, to: number) => void;
  dragIndex?: number | null;
  overIndex?: number | null;
  onDragStart?: (index: number) => void;
  onDragEnd?: () => void;
  onDragOver?: (index: number) => void;
  onDrop?: (index: number) => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm">
      <div className="flex shrink-0 items-center gap-2 border-b border-zinc-100 px-5 py-4">
        <IconDocument />
        <EditableText
          as="h3"
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-red-600"
          value={title}
          onChange={onTitleChange}
        />
      </div>
      <ul className="flex flex-1 flex-col divide-y divide-zinc-100">
        {items.map((item, index) => {
          const rowClass =
            "group flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left text-sm text-zinc-900 transition-colors hover:bg-zinc-50/80";
          const isDragging = dragIndex === index;
          const isDropTarget = dragIndex !== null && overIndex === index && dragIndex !== index;
          return (
            <li
              key={`${item.label}-${index}`}
              draggable={editable}
              onDragStart={editable ? (e) => {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", String(index));
                onDragStart?.(index);
              } : undefined}
              onDragOver={editable ? (e) => {
                if (dragIndex === null) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                onDragOver?.(index);
              } : undefined}
              onDrop={editable ? (e) => {
                e.preventDefault();
                onDrop?.(index);
              } : undefined}
              onDragEnd={editable ? onDragEnd : undefined}
              className={cn(
                "relative",
                editable && "cursor-grab pr-20 active:cursor-grabbing",
                isDragging && "opacity-50",
                isDropTarget && "ring-2 ring-inset ring-red-400",
              )}
            >
              {editable ? (
                <CmsProductActions
                  onEdit={() => onEditItem?.(index)}
                  onDelete={() => onDeleteItem?.(index)}
                />
              ) : null}
              {hasPortalLink(item.href) ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                  title={`Open ${item.label}`}
                >
                  <span>{item.label}</span>
                  <IconDownload className="text-zinc-500 transition-colors group-hover:text-red-600" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onComingSoon}
                  className={cn(rowClass, "cursor-pointer")}
                  title="Coming soon"
                >
                  <span>{item.label}</span>
                  <IconDownload className="text-zinc-500 transition-colors group-hover:text-red-600" />
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {editable ? (
        <div className="border-t border-zinc-100 p-3">
          <button
            type="button"
            onClick={onAddItem}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-red-300/80 bg-red-50/30 px-3 py-2 text-xs font-semibold text-red-700 hover:border-red-400 hover:bg-red-50/60"
          >
            + Add asset
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function ResellerDashboardClient({
  reseller,
  content,
  editable = false,
  onContentChange,
}: {
  reseller: ResellerProfile;
  content: ResellerPortalPageContent;
  editable?: boolean;
  onContentChange?: Dispatch<SetStateAction<ResellerPortalPageContent>>;
}) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [editTarget, setEditTarget] = useState<EditTarget>(null);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [accountTeamModalOpen, setAccountTeamModalOpen] = useState(false);
  const [pricingDragIndex, setPricingDragIndex] = useState<number | null>(null);
  const [pricingOverIndex, setPricingOverIndex] = useState<number | null>(null);
  const [trainingDragIndex, setTrainingDragIndex] = useState<number | null>(null);
  const [trainingOverIndex, setTrainingOverIndex] = useState<number | null>(null);
  const [announcementDragIndex, setAnnouncementDragIndex] = useState<number | null>(null);
  const [announcementOverIndex, setAnnouncementOverIndex] = useState<number | null>(null);
  const [specSheetsDragIndex, setSpecSheetsDragIndex] = useState<number | null>(null);
  const [specSheetsOverIndex, setSpecSheetsOverIndex] = useState<number | null>(null);
  const [onescreenDragIndex, setOnescreenDragIndex] = useState<number | null>(null);
  const [onescreenOverIndex, setOnescreenOverIndex] = useState<number | null>(null);
  const [ledSignageDragIndex, setLedSignageDragIndex] = useState<number | null>(null);
  const [ledSignageOverIndex, setLedSignageOverIndex] = useState<number | null>(null);

  const { hero, quickActions, assetLibrary, training, announcements, accountTeam } = content;
  const pricingFirst = assetLibrary.sectionOrder === "pricing-first";

  function setAssetSectionOrder(sectionOrder: AssetLibrarySectionOrder) {
    if (!editable || !onContentChange) return;
    onContentChange((prev) => ({
      ...prev,
      assetLibrary: { ...prev.assetLibrary, sectionOrder },
    }));
  }

  function moveResourceCard(from: number, to: number) {
    if (!editable || !onContentChange || from === to) return;
    onContentChange((prev) => ({
      ...prev,
      assetLibrary: {
        ...prev.assetLibrary,
        resourceCards: reorderItems(prev.assetLibrary.resourceCards, from, to),
      },
    }));
  }

  function clearPricingDrag() {
    setPricingDragIndex(null);
    setPricingOverIndex(null);
  }

  function clearTrainingDrag() {
    setTrainingDragIndex(null);
    setTrainingOverIndex(null);
  }

  function clearAnnouncementDrag() {
    setAnnouncementDragIndex(null);
    setAnnouncementOverIndex(null);
  }

  function moveTrainingItem(from: number, to: number) {
    if (!editable || !onContentChange || from === to) return;
    onContentChange((prev) => ({
      ...prev,
      training: {
        ...prev.training,
        courses: reorderItems(prev.training.courses, from, to),
      },
    }));
  }

  function moveAnnouncementItem(from: number, to: number) {
    if (!editable || !onContentChange || from === to) return;
    onContentChange((prev) => ({
      ...prev,
      announcements: {
        ...prev.announcements,
        items: reorderItems(prev.announcements.items, from, to),
      },
    }));
  }

  function moveSpecSheetsItem(from: number, to: number) {
    if (!editable || !onContentChange || from === to) return;
    onContentChange((prev) => ({
      ...prev,
      assetLibrary: {
        ...prev.assetLibrary,
        specSheets: reorderItems(prev.assetLibrary.specSheets, from, to),
      },
    }));
  }

  function moveOnescreenItem(from: number, to: number) {
    if (!editable || !onContentChange || from === to) return;
    onContentChange((prev) => ({
      ...prev,
      assetLibrary: {
        ...prev.assetLibrary,
        onescreenAssets: reorderItems(prev.assetLibrary.onescreenAssets, from, to),
      },
    }));
  }

  function moveLedSignageItem(from: number, to: number) {
    if (!editable || !onContentChange || from === to) return;
    onContentChange((prev) => ({
      ...prev,
      assetLibrary: {
        ...prev.assetLibrary,
        ledSignageAssets: reorderItems(prev.assetLibrary.ledSignageAssets, from, to),
      },
    }));
  }

  function showComingSoon() {
    if (editable) return;
    setComingSoonOpen(true);
  }

  function patchString(
    updater: (draft: ResellerPortalPageContent, value: string) => ResellerPortalPageContent,
  ): ((value: string) => void) | undefined {
    if (!editable || !onContentChange) return undefined;
    return (value: string) => onContentChange((prev) => updater(prev, value));
  }

  function removeItem(
    updater: (draft: ResellerPortalPageContent) => ResellerPortalPageContent,
  ) {
    if (!onContentChange || !window.confirm("Remove this item?")) return;
    onContentChange(updater);
  }

  function saveActionCard(item: PortalActionCard) {
    if (!editTarget || !onContentChange) return;
    if (editTarget.kind === "quickAction") {
      onContentChange((prev) => {
        if (editTarget.mode === "add") {
          return {
            ...prev,
            quickActions: {
              ...prev.quickActions,
              items: [...prev.quickActions.items, item],
            },
          };
        }
        if (editTarget.index === undefined) return prev;
        const items = [...prev.quickActions.items];
        items[editTarget.index] = item;
        return { ...prev, quickActions: { ...prev.quickActions, items } };
      });
    } else if (editTarget.kind === "resourceCard") {
      onContentChange((prev) => {
        if (editTarget.mode === "add") {
          return {
            ...prev,
            assetLibrary: {
              ...prev.assetLibrary,
              resourceCards: [...prev.assetLibrary.resourceCards, item],
            },
          };
        }
        if (editTarget.index === undefined) return prev;
        const resourceCards = [...prev.assetLibrary.resourceCards];
        resourceCards[editTarget.index] = item;
        return { ...prev, assetLibrary: { ...prev.assetLibrary, resourceCards } };
      });
    }
    setEditTarget(null);
  }

  function saveAssetItem(item: PortalAssetItem) {
    if (!editTarget || editTarget.kind !== "asset" || !onContentChange) return;
    const { list } = editTarget;
    onContentChange((prev) => {
      const items = [...prev.assetLibrary[list]];
      if (editTarget.mode === "add") {
        items.push(item);
      } else if (editTarget.index !== undefined) {
        items[editTarget.index] = item;
      }
      return {
        ...prev,
        assetLibrary: { ...prev.assetLibrary, [list]: items },
      };
    });
    setEditTarget(null);
  }

  function saveTraining(item: PortalTrainingCourse) {
    if (!editTarget || editTarget.kind !== "training" || !onContentChange) return;
    onContentChange((prev) => {
      const courses = [...prev.training.courses];
      if (editTarget.mode === "add") {
        courses.push(item);
      } else if (editTarget.index !== undefined) {
        courses[editTarget.index] = item;
      }
      return { ...prev, training: { ...prev.training, courses } };
    });
    setEditTarget(null);
  }

  function saveAnnouncement(item: PortalAnnouncement) {
    if (!editTarget || editTarget.kind !== "announcement" || !onContentChange) return;
    onContentChange((prev) => {
      const items = [...prev.announcements.items];
      if (editTarget.mode === "add") {
        items.push(item);
      } else if (editTarget.index !== undefined) {
        items[editTarget.index] = item;
      }
      return { ...prev, announcements: { ...prev.announcements, items } };
    });
    setEditTarget(null);
  }

  const actionModalItem =
    editTarget?.mode === "edit" &&
    editTarget.index !== undefined &&
    (editTarget.kind === "quickAction" || editTarget.kind === "resourceCard")
      ? editTarget.kind === "quickAction"
        ? quickActions.items[editTarget.index] ?? null
        : assetLibrary.resourceCards[editTarget.index] ?? null
      : null;

  const assetModalItem =
    editTarget?.kind === "asset" &&
    editTarget.mode === "edit" &&
    editTarget.index !== undefined
      ? assetLibrary[editTarget.list][editTarget.index] ?? null
      : null;

  const trainingModalItem =
    editTarget?.kind === "training" &&
    editTarget.mode === "edit" &&
    editTarget.index !== undefined
      ? training.courses[editTarget.index] ?? null
      : null;

  const announcementModalItem =
    editTarget?.kind === "announcement" &&
    editTarget.mode === "edit" &&
    editTarget.index !== undefined
      ? announcements.items[editTarget.index] ?? null
      : null;

  async function handleSignOut() {
    if (editable || signingOut) return;
    setSigningOut(true);
    await resellerSignout();
    router.push("/resellers");
    router.refresh();
  }

  return (
    <div className="bg-white">
      <section className="bg-zinc-950 text-white">
        <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
          <Reveal onMount>
            <EditableText
              as="p"
              className={labelClass}
              value={hero.kicker}
              onChange={patchString((d, kicker) => ({ ...d, hero: { ...d.hero, kicker } }))}
            />
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.5rem]">
              Welcome back, {reseller.companyName}.
            </h1>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              Signed in as{" "}
              <span className="font-medium text-zinc-200">{reseller.email}</span>
            </p>
          </Reveal>
          {!editable ? (
            <motion.button
              type="button"
              disabled={signingOut}
              onClick={handleSignOut}
              whileHover={signingOut ? undefined : hoverLift}
              whileTap={signingOut ? undefined : tapPress}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-zinc-600 bg-transparent px-5 text-sm font-semibold text-white transition-colors hover:border-zinc-500 hover:bg-zinc-900 disabled:opacity-60 sm:self-center cursor-pointer"
            >
              <IconSignOut />
              {signingOut ? "Signing out…" : "Sign out"}
            </motion.button>
          ) : null}
        </Container>
      </section>

      <section className="dashboard-section-muted">
        <Container className="flex flex-col py-12 sm:py-16">
          <EditableText
            as="p"
            className={labelClass}
            value={assetLibrary.label}
            onChange={patchString((d, label) => ({
              ...d,
              assetLibrary: { ...d.assetLibrary, label },
            }))}
          />
          <div className={pricingFirst ? "order-2 mt-8" : "order-1 mt-2"}>
            <div className="flex items-start justify-between gap-4">
              <SectionHeading
                title={assetLibrary.title}
                onTitleChange={patchString((d, title) => ({
                  ...d,
                  assetLibrary: { ...d.assetLibrary, title },
                }))}
              />
              {editable ? (
                <SectionMoveButton
                  direction={pricingFirst ? "up" : "down"}
                  onClick={() => setAssetSectionOrder(pricingFirst ? "specs-first" : "pricing-first")}
                />
              ) : null}
            </div>
          <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-3">
            <Reveal className="h-full">
              <AssetListCard
                title={assetLibrary.specSheetsTitle}
                items={assetLibrary.specSheets}
                editable={editable}
                onComingSoon={showComingSoon}
                onTitleChange={patchString((d, specSheetsTitle) => ({
                  ...d,
                  assetLibrary: { ...d.assetLibrary, specSheetsTitle },
                }))}
                onEditItem={(index) =>
                  setEditTarget({ kind: "asset", list: "specSheets", mode: "edit", index })
                }
                onDeleteItem={(index) =>
                  removeItem((prev) => ({
                    ...prev,
                    assetLibrary: {
                      ...prev.assetLibrary,
                      specSheets: prev.assetLibrary.specSheets.filter((_, i) => i !== index),
                    },
                  }))
                }
                onAddItem={() =>
                  setEditTarget({ kind: "asset", list: "specSheets", mode: "add" })
                }
                dragIndex={specSheetsDragIndex}
                overIndex={specSheetsOverIndex}
                onDragStart={(index) => {
                  setSpecSheetsDragIndex(index);
                  setSpecSheetsOverIndex(index);
                }}
                onDragOver={(index) => {
                  if (specSheetsOverIndex !== index) setSpecSheetsOverIndex(index);
                }}
                onDrop={(index) => {
                  if (specSheetsDragIndex !== null) moveSpecSheetsItem(specSheetsDragIndex, index);
                  setSpecSheetsDragIndex(null);
                  setSpecSheetsOverIndex(null);
                }}
                onDragEnd={() => {
                  setSpecSheetsDragIndex(null);
                  setSpecSheetsOverIndex(null);
                }}
              />
            </Reveal>
            <Reveal delay={0.05} className="h-full">
              <AssetListCard
                title={assetLibrary.onescreenTitle}
                items={assetLibrary.onescreenAssets}
                editable={editable}
                onComingSoon={showComingSoon}
                onTitleChange={patchString((d, onescreenTitle) => ({
                  ...d,
                  assetLibrary: { ...d.assetLibrary, onescreenTitle },
                }))}
                onEditItem={(index) =>
                  setEditTarget({ kind: "asset", list: "onescreenAssets", mode: "edit", index })
                }
                onDeleteItem={(index) =>
                  removeItem((prev) => ({
                    ...prev,
                    assetLibrary: {
                      ...prev.assetLibrary,
                      onescreenAssets: prev.assetLibrary.onescreenAssets.filter((_, i) => i !== index),
                    },
                  }))
                }
                onAddItem={() =>
                  setEditTarget({ kind: "asset", list: "onescreenAssets", mode: "add" })
                }
                dragIndex={onescreenDragIndex}
                overIndex={onescreenOverIndex}
                onDragStart={(index) => {
                  setOnescreenDragIndex(index);
                  setOnescreenOverIndex(index);
                }}
                onDragOver={(index) => {
                  if (onescreenOverIndex !== index) setOnescreenOverIndex(index);
                }}
                onDrop={(index) => {
                  if (onescreenDragIndex !== null) moveOnescreenItem(onescreenDragIndex, index);
                  setOnescreenDragIndex(null);
                  setOnescreenOverIndex(null);
                }}
                onDragEnd={() => {
                  setOnescreenDragIndex(null);
                  setOnescreenOverIndex(null);
                }}
              />
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <AssetListCard
                title={assetLibrary.ledSignageTitle}
                items={assetLibrary.ledSignageAssets}
                editable={editable}
                onComingSoon={showComingSoon}
                onTitleChange={patchString((d, ledSignageTitle) => ({
                  ...d,
                  assetLibrary: { ...d.assetLibrary, ledSignageTitle },
                }))}
                onEditItem={(index) =>
                  setEditTarget({ kind: "asset", list: "ledSignageAssets", mode: "edit", index })
                }
                onDeleteItem={(index) =>
                  removeItem((prev) => ({
                    ...prev,
                    assetLibrary: {
                      ...prev.assetLibrary,
                      ledSignageAssets: prev.assetLibrary.ledSignageAssets.filter((_, i) => i !== index),
                    },
                  }))
                }
                onAddItem={() =>
                  setEditTarget({ kind: "asset", list: "ledSignageAssets", mode: "add" })
                }
                dragIndex={ledSignageDragIndex}
                overIndex={ledSignageOverIndex}
                onDragStart={(index) => {
                  setLedSignageDragIndex(index);
                  setLedSignageOverIndex(index);
                }}
                onDragOver={(index) => {
                  if (ledSignageOverIndex !== index) setLedSignageOverIndex(index);
                }}
                onDrop={(index) => {
                  if (ledSignageDragIndex !== null) moveLedSignageItem(ledSignageDragIndex, index);
                  setLedSignageDragIndex(null);
                  setLedSignageOverIndex(null);
                }}
                onDragEnd={() => {
                  setLedSignageDragIndex(null);
                  setLedSignageOverIndex(null);
                }}
              />
            </Reveal>
          </div>
          </div>
          <div className={pricingFirst ? "order-1 mt-2" : "order-2 mt-8"}>
            <div className="flex items-start justify-between gap-4">
              <SectionHeading
                title={assetLibrary.pricingTitle}
                onTitleChange={patchString((d, pricingTitle) => ({
                  ...d,
                  assetLibrary: { ...d.assetLibrary, pricingTitle },
                }))}
              />
              {editable ? (
                <SectionMoveButton
                  direction={pricingFirst ? "down" : "up"}
                  onClick={() => setAssetSectionOrder(pricingFirst ? "specs-first" : "pricing-first")}
                />
              ) : null}
            </div>
          <div className="mt-5 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {assetLibrary.resourceCards.map((action, i) => (
              <Reveal key={`${action.title}-${action.href}-${action.cta}`} delay={0.08 + i * 0.04} className="h-full">
                <ResourceCard
                  {...action}
                  editable={editable}
                  draggable={editable}
                  isDragging={pricingDragIndex === i}
                  isDropTarget={pricingDragIndex !== null && pricingOverIndex === i && pricingDragIndex !== i}
                  onComingSoon={showComingSoon}
                  onDragStart={(event) => {
                    event.dataTransfer.effectAllowed = "move";
                    event.dataTransfer.setData("text/plain", String(i));
                    setPricingDragIndex(i);
                    setPricingOverIndex(i);
                  }}
                  onDragOver={(event) => {
                    if (pricingDragIndex === null) return;
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "move";
                    if (pricingOverIndex !== i) setPricingOverIndex(i);
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    if (pricingDragIndex !== null) moveResourceCard(pricingDragIndex, i);
                    clearPricingDrag();
                  }}
                  onDragEnd={clearPricingDrag}
                  onEdit={() => setEditTarget({ kind: "resourceCard", mode: "edit", index: i })}
                  onDelete={() =>
                    removeItem((prev) => ({
                      ...prev,
                      assetLibrary: {
                        ...prev.assetLibrary,
                        resourceCards: prev.assetLibrary.resourceCards.filter((_, idx) => idx !== i),
                      },
                    }))
                  }
                />
              </Reveal>
            ))}
            {editable ? (
              <CmsAddProductCard
                label="Add resource card"
                onClick={() => setEditTarget({ kind: "resourceCard", mode: "add" })}
              />
            ) : null}
          </div>
          </div>
        </Container>
      </section>

      <section className="dashboard-section-white border-t border-zinc-200">
        <Container className="py-12 sm:py-14">
          <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
            <Reveal delay={0.05} className="h-full">
              <DashboardPanel
                label={training.label}
                title={training.title}
                headerIcon={<TrainingIcon />}
                onLabelChange={patchString((d, label) => ({
                  ...d,
                  training: { ...d.training, label },
                }))}
                onTitleChange={patchString((d, title) => ({
                  ...d,
                  training: { ...d.training, title },
                }))}
              >
                {training.courses.map((course, i) => (
                  <div
                    key={`${course.title}-${i}`}
                    draggable={editable}
                    onDragStart={editable ? (event) => {
                      event.dataTransfer.effectAllowed = "move";
                      event.dataTransfer.setData("text/plain", String(i));
                      setTrainingDragIndex(i);
                      setTrainingOverIndex(i);
                    } : undefined}
                    onDragOver={editable ? (event) => {
                      if (trainingDragIndex === null) return;
                      event.preventDefault();
                      event.dataTransfer.dropEffect = "move";
                      if (trainingOverIndex !== i) setTrainingOverIndex(i);
                    } : undefined}
                    onDrop={editable ? (event) => {
                      event.preventDefault();
                      if (trainingDragIndex !== null) moveTrainingItem(trainingDragIndex, i);
                      clearTrainingDrag();
                    } : undefined}
                    onDragEnd={editable ? clearTrainingDrag : undefined}
                    className={cn(
                      "relative flex gap-4 bg-white px-5 py-5 sm:gap-5 sm:px-6 sm:py-6",
                      i > 0 && "border-t border-zinc-100",
                      editable && "cursor-grab pr-24 active:cursor-grabbing",
                      trainingDragIndex === i && "opacity-50",
                      trainingDragIndex !== null && trainingOverIndex === i && trainingDragIndex !== i && "ring-2 ring-inset ring-red-400",
                    )}
                  >
                    {editable ? (
                      <CmsProductActions
                        onEdit={() => setEditTarget({ kind: "training", mode: "edit", index: i })}
                        onDelete={() =>
                          removeItem((prev) => ({
                            ...prev,
                            training: {
                              ...prev.training,
                              courses: prev.training.courses.filter((_, idx) => idx !== i),
                            },
                          }))
                        }
                      />
                    ) : null}
                    <RowIconBadge>
                      <TrainingIcon className="h-4 w-4" />
                    </RowIconBadge>
                    <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-zinc-950">{course.title}</h3>
                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                          {course.meta}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                          {course.description}
                        </p>
                      </div>
                      {hasPortalLink(course.href) ? (
                        <Link
                          href={course.href}
                          className="shrink-0 self-start pt-0.5 text-sm font-semibold text-red-600 hover:text-red-700"
                        >
                          Start
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={showComingSoon}
                          className="shrink-0 self-start pt-0.5 text-sm font-semibold text-red-600/80 hover:text-red-700 cursor-pointer"
                        >
                          Start
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {editable ? (
                  <div className="border-t border-zinc-100 p-4">
                    <button
                      type="button"
                      onClick={() => setEditTarget({ kind: "training", mode: "add" })}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-red-300/80 bg-red-50/30 px-3 py-2 text-xs font-semibold text-red-700 hover:border-red-400 hover:bg-red-50/60"
                    >
                      + Add training course
                    </button>
                  </div>
                ) : null}
              </DashboardPanel>
            </Reveal>

            <Reveal delay={0.08} className="h-full">
              <DashboardPanel
                label={announcements.label}
                title={announcements.title}
                headerIcon={<IconSparkles />}
                onLabelChange={patchString((d, label) => ({
                  ...d,
                  announcements: { ...d.announcements, label },
                }))}
                onTitleChange={patchString((d, title) => ({
                  ...d,
                  announcements: { ...d.announcements, title },
                }))}
              >
                {announcements.items.map((item, i) => (
                  <div
                    key={`${item.title}-${i}`}
                    draggable={editable}
                    onDragStart={editable ? (event) => {
                      event.dataTransfer.effectAllowed = "move";
                      event.dataTransfer.setData("text/plain", String(i));
                      setAnnouncementDragIndex(i);
                      setAnnouncementOverIndex(i);
                    } : undefined}
                    onDragOver={editable ? (event) => {
                      if (announcementDragIndex === null) return;
                      event.preventDefault();
                      event.dataTransfer.dropEffect = "move";
                      if (announcementOverIndex !== i) setAnnouncementOverIndex(i);
                    } : undefined}
                    onDrop={editable ? (event) => {
                      event.preventDefault();
                      if (announcementDragIndex !== null) moveAnnouncementItem(announcementDragIndex, i);
                      clearAnnouncementDrag();
                    } : undefined}
                    onDragEnd={editable ? clearAnnouncementDrag : undefined}
                    className={cn(
                      "relative flex gap-4 bg-white px-5 py-5 sm:gap-5 sm:px-6 sm:py-6",
                      i > 0 && "border-t border-zinc-100",
                      editable && "cursor-grab pr-24 active:cursor-grabbing",
                      announcementDragIndex === i && "opacity-50",
                      announcementDragIndex !== null && announcementOverIndex === i && announcementDragIndex !== i && "ring-2 ring-inset ring-red-400",
                    )}
                  >
                    {editable ? (
                      <CmsProductActions
                        onEdit={() =>
                          setEditTarget({ kind: "announcement", mode: "edit", index: i })
                        }
                        onDelete={() =>
                          removeItem((prev) => ({
                            ...prev,
                            announcements: {
                              ...prev.announcements,
                              items: prev.announcements.items.filter((_, idx) => idx !== i),
                            },
                          }))
                        }
                      />
                    ) : null}
                    <RowIconBadge>
                      <IconCalendar className="h-4 w-4" />
                    </RowIconBadge>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                        {item.date}
                      </p>
                      <h3 className="mt-1.5 font-bold text-zinc-950">
                        {item.href ? (
                          <Link href={item.href} className="hover:text-red-600">
                            {item.title}
                          </Link>
                        ) : (
                          item.title
                        )}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
                {editable ? (
                  <div className="border-t border-zinc-100 p-4">
                    <button
                      type="button"
                      onClick={() => setEditTarget({ kind: "announcement", mode: "add" })}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-red-300/80 bg-red-50/30 px-3 py-2 text-xs font-semibold text-red-700 hover:border-red-400 hover:bg-red-50/60"
                    >
                      + Add announcement
                    </button>
                  </div>
                ) : null}
              </DashboardPanel>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="dashboard-section-white border-t border-zinc-200">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            label={quickActions.label}
            title={quickActions.title}
            onLabelChange={patchString((d, label) => ({
              ...d,
              quickActions: { ...d.quickActions, label },
            }))}
            onTitleChange={patchString((d, title) => ({
              ...d,
              quickActions: { ...d.quickActions, title },
            }))}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.items.map((action, i) => (
              <Reveal key={`${action.title}-${i}`} delay={i * 0.04}>
                <ActionCard
                  {...action}
                  editable={editable}
                  onComingSoon={showComingSoon}
                  onEdit={() => setEditTarget({ kind: "quickAction", mode: "edit", index: i })}
                  onDelete={() =>
                    removeItem((prev) => ({
                      ...prev,
                      quickActions: {
                        ...prev.quickActions,
                        items: prev.quickActions.items.filter((_, idx) => idx !== i),
                      },
                    }))
                  }
                />
              </Reveal>
            ))}
            {editable ? (
              <CmsAddProductCard
                label="Add quick action"
                onClick={() => setEditTarget({ kind: "quickAction", mode: "add" })}
              />
            ) : null}
          </div>
        </Container>
      </section>

      <section className="dashboard-section-muted border-t border-zinc-200">
        <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
          <div>
            <EditableText
              as="p"
              className={labelClass}
              value={accountTeam.label}
              onChange={patchString((d, label) => ({
                ...d,
                accountTeam: { ...d.accountTeam, label },
              }))}
            />
            <EditableText
              as="p"
              className="mt-2 text-lg font-semibold text-zinc-950 sm:text-xl"
              value={accountTeam.title}
              onChange={patchString((d, title) => ({
                ...d,
                accountTeam: { ...d.accountTeam, title },
              }))}
            />
          </div>
          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
            {editable ? (
              <CmsProductActions onEdit={() => setAccountTeamModalOpen(true)} />
            ) : null}
            {editable ? (
              <div className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 text-sm font-semibold text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {accountTeam.phone}
              </div>
            ) : (
              <motion.a
                href={accountTeam.phoneHref}
                whileHover={hoverLift}
                whileTap={tapPress}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {accountTeam.phone}
              </motion.a>
            )}
            {editable ? (
              <div className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-900">
                <svg className="h-4 w-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M4 6h16v12H4z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                {accountTeam.email}
              </div>
            ) : (
              <motion.a
                href={`mailto:${accountTeam.email}`}
                whileHover={hoverLift}
                whileTap={tapPress}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                <svg className="h-4 w-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M4 6h16v12H4z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                {accountTeam.email}
              </motion.a>
            )}
          </div>
        </Container>
      </section>

      <ActionCardEditModal
        open={
          editTarget?.kind === "quickAction" || editTarget?.kind === "resourceCard"
            ? true
            : false
        }
        mode={editTarget?.mode ?? "edit"}
        item={actionModalItem}
        onClose={() => setEditTarget(null)}
        onSave={saveActionCard}
      />
      <AssetItemEditModal
        open={editTarget?.kind === "asset"}
        mode={editTarget?.mode ?? "edit"}
        item={assetModalItem}
        onClose={() => setEditTarget(null)}
        onSave={saveAssetItem}
      />
      <TrainingCourseEditModal
        open={editTarget?.kind === "training"}
        mode={editTarget?.mode ?? "edit"}
        item={trainingModalItem}
        onClose={() => setEditTarget(null)}
        onSave={saveTraining}
      />
      <AnnouncementEditModal
        open={editTarget?.kind === "announcement"}
        mode={editTarget?.mode ?? "edit"}
        item={announcementModalItem}
        onClose={() => setEditTarget(null)}
        onSave={saveAnnouncement}
      />
      <AccountTeamEditModal
        open={accountTeamModalOpen}
        accountTeam={accountTeam}
        onClose={() => setAccountTeamModalOpen(false)}
        onSave={(team) => {
          onContentChange?.((prev) => ({ ...prev, accountTeam: team }));
          setAccountTeamModalOpen(false);
        }}
      />
      <PortalComingSoonPopover
        open={comingSoonOpen}
        message={DEFAULT_PORTAL_COMING_SOON_MESSAGE}
        onClose={() => setComingSoonOpen(false)}
      />
    </div>
  );
}
