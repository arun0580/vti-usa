"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const mainNavItems = [
  {
    href: "/admin/resellers",
    label: "Manage Resellers",
    icon: IconUsers,
  },
  {
    href: "/admin/announcements",
    label: "Announcements",
    icon: IconMegaphone,
  },
] as const;

const contentNavItems = [
  {
    href: "/admin/home",
    label: "Home Page",
    icon: IconHome,
  },
  {
    href: "/admin/products",
    label: "Products Page",
    icon: IconPackage,
  },
  {
    href: "/admin/gallery",
    label: "Gallery Page",
    icon: IconImage,
  },
  {
    href: "/admin/events",
    label: "Events Page",
    icon: IconCalendar,
  },
  {
    href: "/admin/about",
    label: "About Page",
    icon: IconInfo,
  },
  {
    href: "/admin/resellers-page",
    label: "Resellers Page",
    icon: IconStore,
  },
  {
    href: "/admin/reseller-portal",
    label: "Reseller Portal",
    icon: IconPackage,
  },
  {
    href: "/admin/contact",
    label: "Contact Page",
    icon: IconMail,
  },
] as const;

type NavItem = {
  href: string;
  label: string;
  icon: ({ className }: { className?: string }) => React.JSX.Element;
};

function NavLink({
  item,
  isActive,
  onNavigate,
}: {
  item: NavItem;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors !text-zinc-950",
        isActive ? "bg-zinc-100" : "hover:bg-zinc-50",
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {item.label}
    </Link>
  );
}

function NavSectionHeading({ title }: { title: string }) {
  return (
    <li className="list-none pt-4 pb-2" aria-hidden={false}>
      <div className="flex items-center gap-3 px-3">
        <span className="h-px flex-1 bg-zinc-200" />
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400">
          {title}
        </span>
        <span className="h-px flex-1 bg-zinc-200" />
      </div>
    </li>
  );
}

function IconMegaphone({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m3 11 18-5v12L3 14v-3Z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6M23 11h-6" />
    </svg>
  );
}

function IconHome({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function IconPackage({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function IconImage({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function IconInfo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function IconStore({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 9 5 3h14l2 6" />
      <path d="M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9" />
      <path d="M3 9h18" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function AdminSidebar({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex w-64 shrink-0 flex-col border-r border-zinc-200 bg-white",
        className,
      )}
    >
      <div className="px-4 py-5">
        {/* <p className="text-base font-bold tracking-[0.08em] text-primary normal-case">
          VTI Admin Panel
        </p> */}
      </div>
      <nav className="flex-1 px-3 pb-6" aria-label="Admin navigation">
        <ul className="space-y-1">
          {mainNavItems.map((item) => (
            <li key={item.href}>
              <NavLink
                item={item}
                isActive={Boolean(pathname?.startsWith(item.href))}
                onNavigate={onNavigate}
              />
            </li>
          ))}

          <NavSectionHeading title="Manage Content" />

          {contentNavItems.map((item) => (
            <li key={item.href}>
              <NavLink
                item={item}
                isActive={Boolean(pathname?.startsWith(item.href))}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
