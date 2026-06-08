"use client";

import { usePathname } from "next/navigation";
import { AnnouncementBanner } from "@/components/site/AnnouncementBanner";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <AnnouncementBanner />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
