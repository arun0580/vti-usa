import type { ResellerProfile } from "@/lib/reseller-auth/types";

export interface AdminProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ApiSuccess<T> = {
  success: true;
  message?: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: string;
  code?: string;
  fields?: Record<string, string>;
};

export type UpdateAdminProfilePayload = {
  firstName: string;
  lastName: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export type UpdateAdminProfileResult =
  | { ok: true; admin: AdminProfile; message: string }
  | { ok: false; error: string; code?: string; fields?: Record<string, string> };

export type AdminSigninResult =
  | { ok: true; admin: AdminProfile }
  | { ok: false; error: string; code?: string };

export type ResellerListResult =
  | { ok: true; resellers: ResellerProfile[] }
  | { ok: false; error: string };

export type ResellerDetailResult =
  | { ok: true; reseller: ResellerProfile }
  | { ok: false; error: string };

export type ResellerActionResult =
  | { ok: true; reseller: ResellerProfile; message: string }
  | { ok: false; error: string };

export type ResellerDeleteResult =
  | { ok: true; id: string; message: string }
  | { ok: false; error: string };
