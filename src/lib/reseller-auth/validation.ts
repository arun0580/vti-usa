import type { ResellerSignupPayload, ResellerSigninPayload } from "./types";
import { RESELLER_BUSINESS_TYPE_LABELS } from "./types";

export type FieldErrors = Record<string, string>;

const BUSINESS_TYPES = Object.keys(RESELLER_BUSINESS_TYPE_LABELS);

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function passwordStrength(password: string): string | null {
  if (password.length < 8) return "Password Must Be At Least 8 Characters";
  if (!/[A-Z]/.test(password)) return "Include At Least One Uppercase Letter";
  if (!/[a-z]/.test(password)) return "Include At Least One Lowercase Letter";
  if (!/[0-9]/.test(password)) return "Include At Least One Number";
  return null;
}

/** Client-side validation aligned with API Zod rules */
export function validateSignup(
  payload: ResellerSignupPayload,
): FieldErrors | null {
  const errors: FieldErrors = {};

  if (!payload.fullName.trim()) errors.fullName = "Full Name Is Required";
  if (!payload.companyName.trim())
    errors.companyName = "Company / Organization Is Required";
  if (!payload.email.trim()) errors.email = "Work Email Is Required";
  else if (!isValidEmail(payload.email.trim()))
    errors.email = "Enter A Valid Email Address";
  if (!payload.phone.trim()) errors.phone = "Phone Is Required";
  else if (!/^[\d\s()+\-.]{7,30}$/.test(payload.phone.trim()))
    errors.phone = "Enter A Valid Phone Number";
  if (!payload.city.trim()) errors.city = "City Is Required";
  if (!payload.state.trim()) errors.state = "State Is Required";
  if (!payload.businessType || !BUSINESS_TYPES.includes(payload.businessType))
    errors.businessType = "Select A Business Type";
  if (!payload.about.trim()) errors.about = "Tell Us About Your Business";
  else if (payload.about.trim().length < 20)
    errors.about = "Please Share A Bit More Detail (At Least 20 Characters)";

  const pwError = passwordStrength(payload.password);
  if (pwError) errors.password = pwError;
  if (payload.password !== payload.confirmPassword)
    errors.confirmPassword = "Passwords Do Not Match";

  return Object.keys(errors).length > 0 ? errors : null;
}

export function validateSignin(
  payload: ResellerSigninPayload,
): FieldErrors | null {
  const errors: FieldErrors = {};
  if (!payload.email.trim()) errors.email = "Email Is Required";
  else if (!isValidEmail(payload.email.trim()))
    errors.email = "Enter A Valid Email Address";
  if (!payload.password) errors.password = "Password Is Required";
  return Object.keys(errors).length > 0 ? errors : null;
}
