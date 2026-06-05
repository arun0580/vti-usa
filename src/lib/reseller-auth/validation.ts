import type { ResellerSignupPayload, ResellerSigninPayload } from "./types";

export type FieldErrors = Record<string, string>;

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

  if (!payload.firstName.trim()) errors.firstName = "First name is required";
  if (!payload.lastName.trim()) errors.lastName = "Last name is required";
  if (!payload.companyName.trim())
    errors.companyName = "Company name is required";
  if (!payload.email.trim()) errors.email = "Email is required";
  else if (!isValidEmail(payload.email.trim()))
    errors.email = "Enter a valid email address";
  if (!payload.phone.trim()) errors.phone = "Phone number is required";
  else if (!/^[\d\s()+\-.]{7,30}$/.test(payload.phone.trim()))
    errors.phone = "Enter a valid phone number";

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
