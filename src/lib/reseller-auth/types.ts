export type ResellerStatus = "pending" | "active" | "inactive";

export const RESELLER_BUSINESS_TYPE_LABELS: Record<string, string> = {
  av_integrator: "AV integrator",
  it_reseller: "IT reseller",
  education_technology: "Education technology",
  government_contractor: "Government contractor",
  distributor: "Distributor",
  other: "Other",
};

export interface ResellerProfile {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  city?: string | null;
  state?: string | null;
  businessType?: string | null;
  about?: string | null;
  emailVerified: boolean;
  status: ResellerStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ResellerSignupPayload {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  businessType: string;
  about: string;
  password: string;
  confirmPassword: string;
}

export interface ResellerSigninPayload {
  email: string;
  password: string;
}

export interface AuthSuccessData {
  token: string;
  reseller: ResellerProfile;
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

export type AuthResult =
  | {
      ok: true;
      message: string;
      reseller: ResellerProfile;
      pendingApproval?: boolean;
    }
  | { ok: false; error: string; code?: string; fields?: Record<string, string> };

export type SignupResult =
  | {
      ok: true;
      message: string;
      requiresVerification: true;
      email: string;
    }
  | { ok: false; error: string; code?: string; fields?: Record<string, string> };
