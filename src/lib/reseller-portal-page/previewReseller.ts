import type { ResellerProfile } from "@/lib/reseller-auth/types";

export const previewResellerProfile: ResellerProfile = {
  id: "preview",
  firstName: "Preview",
  lastName: "Partner",
  companyName: "Demo Partner Co..",
  email: "partner@example.com",
  phone: "555-0100",
  emailVerified: true,
  status: "active",
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
};
