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
};

export type AdminSigninResult =
  | { ok: true; admin: AdminProfile }
  | { ok: false; error: string; code?: string };

export type ResellerListResult =
  | { ok: true; resellers: ResellerProfile[] }
  | { ok: false; error: string };

export type ResellerActionResult =
  | { ok: true; reseller: ResellerProfile; message: string }
  | { ok: false; error: string };
