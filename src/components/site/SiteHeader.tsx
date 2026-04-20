'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/site/Container";
import { Logo } from "@/components/site/Logo";

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/shop", label: "Shop" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/resellers", label: "Resellers" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <Container className="flex h-16 items-center gap-4">
        <div className="flex shrink-0 items-center">
          <Logo />
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm text-zinc-600 dark:text-zinc-300 md:flex">
          {nav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "font-medium text-red-600"
                    : "transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <Link
            href="/cart"
            aria-label="Cart"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M6 6h15l-1.5 8.5a2 2 0 0 1-2 1.5H8.2a2 2 0 0 1-2-1.6L4 3H2" />
              <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
            </svg>
          </Link>

          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
          >
            Request a Quote
          </Link>
        </div>
      </Container>
    </header>
  );
}

