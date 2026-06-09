import { cn } from "@/lib/cn";
import {
  RESELLER_BUSINESS_TYPE_LABELS,
  type ResellerProfile,
} from "@/lib/reseller-auth/types";

export const STATUS_LABELS: Record<ResellerProfile["status"], string> = {
  pending: "Pending",
  active: "Approved",
  inactive: "Rejected",
};

const AVATAR_PALETTE = [
  { bg: "bg-red-100", text: "text-red-700" },
  { bg: "bg-orange-100", text: "text-orange-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-sky-100", text: "text-sky-700" },
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
] as const;

function avatarPaletteIndex(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % AVATAR_PALETTE.length;
}

export function ResellerStatusBadge({
  status,
  size = "sm",
}: {
  status: ResellerProfile["status"];
  size?: "sm" | "md";
}) {
  const styles: Record<ResellerProfile["status"], string> = {
    pending: "border-zinc-200 bg-zinc-50 text-zinc-600",
    active: "border-emerald-200 bg-emerald-50 text-emerald-700",
    inactive: "border-zinc-200 bg-zinc-50 text-zinc-500",
  };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full border font-medium leading-none",
        size === "md"
          ? "px-3 py-1 text-xs"
          : "px-2.5 py-0.5 text-[11px]",
        styles[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export function ResellerEmailBadge({ verified }: { verified: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium leading-none",
        verified
          ? "border-sky-200 bg-sky-50 text-sky-700"
          : "border-amber-200 bg-amber-50 text-amber-800",
      )}
    >
      {verified ? "Email verified" : "Email not verified"}
    </span>
  );
}

export function ResellerUserAvatar({
  id,
  firstName,
  lastName,
  size = "md",
}: {
  id: string;
  firstName: string;
  lastName: string;
  size?: "md" | "lg";
}) {
  const initials =
    `${firstName.charAt(0) ?? ""}${lastName.charAt(0) ?? ""}`.toUpperCase() ||
    "?";
  const palette = AVATAR_PALETTE[avatarPaletteIndex(id || `${firstName}${lastName}`)];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        size === "lg" ? "h-16 w-16 text-xl" : "h-10 w-10 text-sm",
        palette.bg,
        palette.text,
      )}
    >
      {initials}
    </div>
  );
}

export function formatResellerLocation(r: ResellerProfile): string {
  const parts = [r.city, r.state].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "—";
}

export function resellerBusinessTypeLabel(
  value: string | null | undefined,
): string {
  if (!value) return "—";
  return RESELLER_BUSINESS_TYPE_LABELS[value] ?? value;
}

const contactTextClass = "!normal-case text-sm text-zinc-600";
const contactLinkClass = "!normal-case text-zinc-600 hover:underline";

export function ResellerContactLine({
  email,
  phone,
  linked = false,
  className,
}: {
  email: string;
  phone?: string | null;
  linked?: boolean;
  className?: string;
}) {
  const displayEmail = email.toLowerCase();

  return (
    <p className={cn(contactTextClass, className)}>
      {linked ? (
        <a href={`mailto:${email}`} className={contactLinkClass}>
          {displayEmail}
        </a>
      ) : (
        <span className="!normal-case">{displayEmail}</span>
      )}
      {phone ? (
        <>
          <span className="text-zinc-400"> | </span>
          {linked ? (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className={contactLinkClass}
            >
              {phone}
            </a>
          ) : (
            <span>{phone}</span>
          )}
        </>
      ) : null}
    </p>
  );
}

export function formatResellerDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
