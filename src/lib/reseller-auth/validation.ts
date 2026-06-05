import type { ResellerSignupPayload, ResellerSigninPayload } from "./types";
import { RESELLER_BUSINESS_TYPE_LABELS } from "./types";

export type FieldErrors = Record<string, string>;

const BUSINESS_TYPES = Object.keys(RESELLER_BUSINESS_TYPE_LABELS);

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function passwordStrength(password: string): string | null {
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Include at least one lowercase letter";
  if (!/[0-9]/.test(password)) return "Include at least one number";
  return null;
}

/** Client-side validation aligned with API Zod rules */
export function validateSignup(
  payload: ResellerSignupPayload,
): FieldErrors | null {
  const errors: FieldErrors = {};

  if (!payload.fullName.trim()) errors.fullName = "Full name is required";
  if (!payload.companyName.trim())
    errors.companyName = "Company / organization is required";
  if (!payload.email.trim()) errors.email = "Work email is required";
  else if (!isValidEmail(payload.email.trim()))
    errors.email = "Enter a valid email address";
  if (!payload.phone.trim()) errors.phone = "Phone is required";
  else if (!/^[\d\s()+\-.]{7,30}$/.test(payload.phone.trim()))
    errors.phone = "Enter a valid phone number";
  if (!payload.city.trim()) errors.city = "City is required";
  if (!payload.state.trim()) errors.state = "State is required";
  if (!payload.businessType || !BUSINESS_TYPES.includes(payload.businessType))
    errors.businessType = "Select a business type";
  if (!payload.about.trim()) errors.about = "Tell us about your business";
  else if (payload.about.trim().length < 20)
    errors.about = "Please share a bit more detail (at least 20 characters)";

  const pwError = passwordStrength(payload.password);
  if (pwError) errors.password = pwError;
  if (payload.password !== payload.confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  return Object.keys(errors).length > 0 ? errors : null;
}

export function validateSignin(
  payload: ResellerSigninPayload,
): FieldErrors | null {
  const errors: FieldErrors = {};
  if (!payload.email.trim()) errors.email = "Email is required";
  else if (!isValidEmail(payload.email.trim()))
    errors.email = "Enter a valid email address";
  if (!payload.password) errors.password = "Password is required";
  return Object.keys(errors).length > 0 ? errors : null;
}
