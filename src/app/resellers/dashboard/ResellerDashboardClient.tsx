"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/cn";
import { hoverLift, tapPress } from "@/lib/motion";
import { resellerSignout } from "@/lib/reseller-auth/api";
import type { ResellerProfile } from "@/lib/reseller-auth/types";
import {
  accountTeam,
  announcements,
  assetActions,
  ledSignageAssets,
  onescreenAssets,
  quickActions,
  specSheets,
  trainingCourses,
} from "./_data/content";
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

const labelClass =
  "text-[11px] font-bold uppercase tracking-[0.2em] text-red-600";

function SectionHeading({
  label,
  title,
  className,
}: {
  label: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={labelClass}>{label}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

const resourceCtaClass =
  "mt-6 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-red-600 hover:text-red-700";

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-red-50">
      {children}
    </div>
  );
}

/** Light grey square icon holder for list rows (per mockup) */
function RowIconBadge({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-zinc-100/90">
      {children}
    </div>
  );
}

/** Panel with header inside the card — white card on grey section background */
function DashboardPanel({
  label,
  title,
  headerIcon,
  children,
}: {
  label: string;
  title: string;
  headerIcon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="border-b border-zinc-100 bg-white px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex gap-3 sm:gap-4">
          <IconBadge>{headerIcon}</IconBadge>
          <div className="min-w-0">
            <p className={labelClass}>{label}</p>
            <h2 className="mt-1.5 text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl">
              {title}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}

function ActionCardCta({ href, cta }: { href: string; cta: string }) {
  const className =
    "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700";
  if (href === "#") {
    return (
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-600/70">
        {cta}
        <IconArrow />
      </span>
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
  return (
    <Link href={href} className={className}>
      {cta}
      <IconArrow />
    </Link>
  );
}

function ResourceCardCta({ href, cta }: { href: string; cta: string }) {
  const label = cta.toUpperCase();
  if (href === "#") {
    return (
      <span className={cn(resourceCtaClass, "text-red-600/70")}>
        {label}
        <IconArrow />
      </span>
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
  return (
    <Link href={href} className={resourceCtaClass}>
      {label}
      <IconArrow />
    </Link>
  );
}

function ResourceCard({
  title,
  description,
  href,
  cta,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: string;
}) {
  return (
    <motion.div
      whileHover={href !== "#" ? hoverLift : undefined}
      className="flex h-full flex-col rounded-xl border border-zinc-200/90 bg-white p-6 shadow-sm"
    >
      <IconBadge>
        <ResourceIcon name={icon} />
      </IconBadge>
      <h3 className="mt-4 text-lg font-bold tracking-tight text-zinc-950">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
        {description}
      </p>
      <ResourceCardCta href={href} cta={cta} />
    </motion.div>
  );
}

function ActionCard({
  title,
  description,
  href,
  cta,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: string;
}) {
  return (
    <motion.div
      whileHover={href !== "#" ? hoverLift : undefined}
      className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
    >
      <IconBadge>
        <QuickActionIcon name={icon} />
      </IconBadge>
      <h3 className="mt-4 text-base font-bold text-zinc-950">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
        {description}
      </p>
      <ActionCardCta href={href} cta={cta} />
    </motion.div>
  );
}

type AssetItem = string | { label: string; href?: string };

function normalizeAssetItem(item: AssetItem): { label: string; href?: string } {
  return typeof item === "string" ? { label: item } : item;
}

function AssetListCard({
  title,
  items,
}: {
  title: string;
  items: readonly AssetItem[];
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm">
      <div className="flex shrink-0 items-center gap-2 border-b border-zinc-100 px-5 py-4">
        <IconDocument />
        <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-red-600">
          {title}
        </h3>
      </div>
      <ul className="flex flex-1 flex-col divide-y divide-zinc-100">
        {items.map((item) => {
          const { label, href } = normalizeAssetItem(item);
          const rowClass =
            "group flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left text-sm text-zinc-900 transition-colors hover:bg-zinc-50/80";
          return (
            <li key={label}>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                  title={`Open ${label}`}
                >
                  <span>{label}</span>
                  <IconDownload className="text-zinc-500 transition-colors group-hover:text-red-600" />
                </a>
              ) : (
                <button
                  type="button"
                  className={rowClass}
                  title="Download coming soon"
                >
                  <span>{label}</span>
                  <IconDownload className="text-zinc-500 transition-colors group-hover:text-red-600" />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ResellerDashboardClient({
  reseller,
}: {
  reseller: ResellerProfile;
}) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    await resellerSignout();
    router.push("/resellers");
    router.refresh();
  }

  return (
    <div className="bg-white">
      {/* Welcome hero */}
      <section className="bg-zinc-950 text-white">
        <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
          <Reveal onMount>
            <p className={labelClass}>Reseller portal</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.5rem]">
              Welcome back, {reseller.companyName}.
            </h1>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              Signed in as{" "}
              <span className="font-medium text-zinc-200">{reseller.email}</span>
            </p>
          </Reveal>
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
        </Container>
      </section>

      {/* Quick actions — white background */}
      <section className="dashboard-section-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            label="Quick actions"
            title="What do you need today?"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action, i) => (
              <Reveal key={action.title} delay={i * 0.04}>
                <ActionCard {...action} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Asset library — muted background + top divider */}
      <section className="dashboard-section-muted border-t border-zinc-200">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            label="Asset library"
            title="Spec sheets, pricing & marketing collateral."
          />
          <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-3">
            <Reveal className="h-full">
              <AssetListCard title="Spec sheets" items={specSheets} />
            </Reveal>
            <Reveal delay={0.05} className="h-full">
              <AssetListCard
                title="OneScreen & InFocus"
                items={onescreenAssets}
              />
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <AssetListCard title="LED & signage" items={ledSignageAssets} />
            </Reveal>
          </div>
          <div className="mt-5 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {assetActions.map((action, i) => (
              <Reveal
                key={action.title}
                delay={0.08 + i * 0.04}
                className="h-full"
              >
                <ResourceCard {...action} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Training + announcements — white section background */}
      <section className="dashboard-section-white border-t border-zinc-200">
        <Container className="py-12 sm:py-14">
          <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
            <Reveal delay={0.05} className="h-full">
              <DashboardPanel
                label="Training & certification"
                title="Level up your team."
                headerIcon={<TrainingIcon />}
              >
                {trainingCourses.map((course, i) => (
                  <div
                    key={course.title}
                    className={cn(
                      "flex gap-4 bg-white px-5 py-5 sm:gap-5 sm:px-6 sm:py-6",
                      i > 0 && "border-t border-zinc-100",
                    )}
                  >
                    <RowIconBadge>
                      <TrainingIcon className="h-4 w-4" />
                    </RowIconBadge>
                    <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-zinc-950">
                          {course.title}
                        </h3>
                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                          {course.meta}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                          {course.description}
                        </p>
                      </div>
                      {course.href === "#" ? (
                        <span className="shrink-0 self-start pt-0.5 text-sm font-semibold text-red-600/70">
                          Start
                        </span>
                      ) : (
                        <Link
                          href={course.href}
                          className="shrink-0 self-start pt-0.5 text-sm font-semibold text-red-600 hover:text-red-700"
                        >
                          Start
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </DashboardPanel>
            </Reveal>

            <Reveal delay={0.08} className="h-full">
              <DashboardPanel
                label="What's new"
                title="Partner announcements"
                headerIcon={<IconSparkles />}
              >
                {announcements.map((item, i) => (
                  <div
                    key={item.title}
                    className={cn(
                      "flex gap-4 bg-white px-5 py-5 sm:gap-5 sm:px-6 sm:py-6",
                      i > 0 && "border-t border-zinc-100",
                    )}
                  >
                    <RowIconBadge>
                      <IconCalendar className="h-4 w-4" />
                    </RowIconBadge>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                        {item.date}
                      </p>
                      <h3 className="mt-1.5 font-bold text-zinc-950">
                        {"href" in item && item.href ? (
                          <Link
                            href={item.href}
                            className="hover:text-red-600"
                          >
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
              </DashboardPanel>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Account team */}
      <section className="dashboard-section-muted border-t border-zinc-200">
        <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
          <div>
            <p className={labelClass}>Your account team</p>
            <p className="mt-2 text-lg font-semibold text-zinc-950 sm:text-xl">
              Need something fast? Talk to a real human.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.a
              href={accountTeam.phoneHref}
              whileHover={hoverLift}
              whileTap={tapPress}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {accountTeam.phone}
            </motion.a>
            <motion.a
              href={`mailto:${accountTeam.email}`}
              whileHover={hoverLift}
              whileTap={tapPress}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
            >
              <svg
                className="h-4 w-4 text-red-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M4 6h16v12H4z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              {accountTeam.email}
            </motion.a>
          </div>
        </Container>
      </section>
    </div>
  );
}
