import "server-only";

export type FormType = "contact" | "reseller_signup" | "partner_application";

export type ContactFormData = {
  fullName: string;
  organization: string;
  email: string;
  phone?: string;
  persona: string;
  message?: string;
};

export type ResellerSignupFormData = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  businessType: string;
  about?: string;
};

export type PartnerApplicationFormData = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  website?: string;
  businessType: string;
  markets: string;
  yearsInBusiness: string;
  experience?: string;
  notes?: string;
};

export type FormDataMap = {
  contact: ContactFormData;
  reseller_signup: ResellerSignupFormData;
  partner_application: PartnerApplicationFormData;
};

export type FormPayload<T extends FormType = FormType> = {
  formType: T;
  data: FormDataMap[T];
  /** Honeypot field — should be empty for legitimate submissions. */
  honeypot?: string;
};

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; field?: string };

const MAX_FIELD_LENGTH = 5_000;
const MAX_SHORT_FIELD_LENGTH = 300;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function asString(value: unknown, max = MAX_FIELD_LENGTH): string {
  if (value === undefined || value === null) return "";
  return String(value).trim().slice(0, max);
}

function requireField(
  obj: Record<string, string>,
  key: string,
  label: string,
): ValidationResult<true> {
  if (!obj[key]) {
    return { ok: false, error: `${label} is required.`, field: key };
  }
  return { ok: true, data: true };
}

function validateContact(
  raw: Record<string, unknown>,
): ValidationResult<ContactFormData> {
  const data: ContactFormData = {
    fullName: asString(raw.fullName, MAX_SHORT_FIELD_LENGTH),
    organization: asString(raw.organization, MAX_SHORT_FIELD_LENGTH),
    email: asString(raw.email, MAX_SHORT_FIELD_LENGTH),
    phone: asString(raw.phone, MAX_SHORT_FIELD_LENGTH) || undefined,
    persona: asString(raw.persona, MAX_SHORT_FIELD_LENGTH),
    message: asString(raw.message) || undefined,
  };

  for (const [key, label] of [
    ["fullName", "Full name"],
    ["organization", "Organization"],
    ["email", "Email"],
    ["persona", "Persona"],
  ] as const) {
    const check = requireField(data as Record<string, string>, key, label);
    if (!check.ok) return check;
  }
  if (!isValidEmail(data.email)) {
    return {
      ok: false,
      error: "Please enter a valid email address.",
      field: "email",
    };
  }
  return { ok: true, data };
}

function validateResellerSignup(
  raw: Record<string, unknown>,
): ValidationResult<ResellerSignupFormData> {
  const data: ResellerSignupFormData = {
    fullName: asString(raw.fullName, MAX_SHORT_FIELD_LENGTH),
    company: asString(raw.company, MAX_SHORT_FIELD_LENGTH),
    email: asString(raw.email, MAX_SHORT_FIELD_LENGTH),
    phone: asString(raw.phone, MAX_SHORT_FIELD_LENGTH),
    city: asString(raw.city, MAX_SHORT_FIELD_LENGTH),
    state: asString(raw.state, MAX_SHORT_FIELD_LENGTH),
    businessType: asString(raw.businessType, MAX_SHORT_FIELD_LENGTH),
    about: asString(raw.about) || undefined,
  };

  for (const [key, label] of [
    ["fullName", "Full name"],
    ["company", "Company"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["city", "City"],
    ["state", "State"],
    ["businessType", "Business type"],
  ] as const) {
    const check = requireField(data as Record<string, string>, key, label);
    if (!check.ok) return check;
  }
  if (!isValidEmail(data.email)) {
    return {
      ok: false,
      error: "Please enter a valid email address.",
      field: "email",
    };
  }
  return { ok: true, data };
}

function validatePartnerApplication(
  raw: Record<string, unknown>,
): ValidationResult<PartnerApplicationFormData> {
  const data: PartnerApplicationFormData = {
    fullName: asString(raw.fullName, MAX_SHORT_FIELD_LENGTH),
    company: asString(raw.company, MAX_SHORT_FIELD_LENGTH),
    email: asString(raw.email, MAX_SHORT_FIELD_LENGTH),
    phone: asString(raw.phone, MAX_SHORT_FIELD_LENGTH),
    city: asString(raw.city, MAX_SHORT_FIELD_LENGTH),
    state: asString(raw.state, MAX_SHORT_FIELD_LENGTH),
    website: asString(raw.website, MAX_SHORT_FIELD_LENGTH) || undefined,
    businessType: asString(raw.businessType, MAX_SHORT_FIELD_LENGTH),
    markets: asString(raw.markets, MAX_SHORT_FIELD_LENGTH),
    yearsInBusiness: asString(raw.yearsInBusiness, MAX_SHORT_FIELD_LENGTH),
    experience: asString(raw.experience, MAX_SHORT_FIELD_LENGTH) || undefined,
    notes: asString(raw.notes) || undefined,
  };

  for (const [key, label] of [
    ["fullName", "Full name"],
    ["company", "Company"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["city", "City"],
    ["state", "State"],
    ["businessType", "Business type"],
    ["markets", "Markets"],
    ["yearsInBusiness", "Years in business"],
  ] as const) {
    const check = requireField(data as Record<string, string>, key, label);
    if (!check.ok) return check;
  }
  if (!isValidEmail(data.email)) {
    return {
      ok: false,
      error: "Please enter a valid email address.",
      field: "email",
    };
  }
  return { ok: true, data };
}

export function isFormType(value: unknown): value is FormType {
  return (
    value === "contact" ||
    value === "reseller_signup" ||
    value === "partner_application"
  );
}

/**
 * Validate and normalise a raw form submission. Returns a discriminated
 * union with either the cleaned data or a user-friendly error message.
 */
export function validateFormPayload(
  raw: unknown,
):
  | { ok: true; formType: FormType; data: FormDataMap[FormType] }
  | { ok: false; status: number; error: string; field?: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, status: 400, error: "Invalid request body." };
  }

  const payload = raw as Partial<FormPayload>;

  if (typeof payload.honeypot === "string" && payload.honeypot.trim() !== "") {
    return { ok: false, status: 400, error: "Submission rejected." };
  }

  if (!isFormType(payload.formType)) {
    return { ok: false, status: 400, error: "Unsupported form type." };
  }

  const rawData = (payload.data ?? {}) as Record<string, unknown>;

  let result: ValidationResult<FormDataMap[FormType]>;
  switch (payload.formType) {
    case "contact":
      result = validateContact(rawData);
      break;
    case "reseller_signup":
      result = validateResellerSignup(rawData);
      break;
    case "partner_application":
      result = validatePartnerApplication(rawData);
      break;
  }

  if (!result.ok) {
    return {
      ok: false,
      status: 400,
      error: result.error,
      field: result.field,
    };
  }
  return { ok: true, formType: payload.formType, data: result.data };
}
