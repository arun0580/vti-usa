import { cn } from "@/lib/cn";

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-5", className)}
      {...props}
    />
  );
}

