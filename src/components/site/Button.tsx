import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200",
  secondary:
    "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900",
  ghost:
    "text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-900",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 disabled:pointer-events-none disabled:opacity-50",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}

