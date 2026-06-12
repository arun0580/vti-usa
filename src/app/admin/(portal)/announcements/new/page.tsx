import type { Metadata } from "next";
import { AnnouncementForm } from "@/components/admin/AnnouncementForm";

export const metadata: Metadata = {
  title: "Create Announcement",
  robots: { index: false, follow: false },
};

export default function AdminAnnouncementCreatePage() {
  return <AnnouncementForm mode="create" />;
}
