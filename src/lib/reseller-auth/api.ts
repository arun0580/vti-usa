import type {
  ApiErrorResponse,
  ApiSuccess,
  AuthResult,
  AuthSuccessData,
  ResellerProfile,
  ResellerSigninPayload,
  ResellerSignupPayload,
  SignupResult,
} from "./types";

function signupUnavailableMessage(status: number): string {
  if (status === 404) {
    return "Signup service is unavailable. Stop the dev server, run npm run dev:clean, and try again.";
  }
  return "Unable to create account. Please try again.";
}

async function parseJson<T>(res: Response): Promise<T | null> {
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) return null;
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function toAuthResult(
  body: ApiSuccess<AuthSuccessData> | ApiErrorResponse | null,
  fallbackError: string,
): AuthResult {
  if (!body) return { ok: false, error: fallbackError };
  if (!body.success) {
    return {
      ok: false,
      error: body.error || fallbackError,
      code: body.code,
      fields: body.fields,
    };
  }
  return {
    ok: true,
    message: body.message ?? "Success",
    reseller: body.data.reseller,
  };
}

/** Sign up — sends verification email; no session until email is verified */
export async function resellerSignup(
  payload: ResellerSignupPayload,
): Promise<SignupResult> {
  const res = await fetch("/api/resellers/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const body = await parseJson<
    | ApiSuccess<{ requiresVerification: boolean; email: string }>
    | ApiErrorResponse
  >(res);

  if (!body) {
    return { ok: false, error: signupUnavailableMessage(res.status) };
  }
  if (!body.success) {
    return {
      ok: false,
      error: body.error || "Unable to create account. Please try again.",
      code: body.code,
      fields: body.fields,
    };
  }
  return {
    ok: true,
    message: body.message ?? "Check your email to verify your account.",
    requiresVerification: true,
    email: body.data.email,
  };
}

/** Confirm email from verification link */
export async function resellerVerifyEmail(token: string): Promise<AuthResult> {
  const res = await fetch("/api/resellers/verify-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ token }),
  });
  const body = await parseJson<ApiSuccess<AuthSuccessData> | ApiErrorResponse>(
    res,
  );
  const result = toAuthResult(
    body,
    "Verification failed. The link may be invalid or expired.",
  );
  if (result.ok && body?.success) {
    return {
      ...result,
      pendingApproval: Boolean(
        (body.data as { pendingApproval?: boolean }).pendingApproval,
      ),
    };
  }
  return result;
}

/** Resend verification email for an unverified account */
export async function resellerResendVerification(
  email: string,
  firstName?: string,
): Promise<{ ok: true; message: string } | { ok: false; error: string }> {
  const res = await fetch("/api/resellers/resend-verification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, firstName }),
  });
  const body = await parseJson<ApiSuccess<unknown> | ApiErrorResponse>(res);
  if (!body || !body.success) {
    return {
      ok: false,
      error: body?.error ?? "Could not resend verification email.",
    };
  }
  return { ok: true, message: body.message ?? "Verification email sent." };
}

/** Sign in via Next.js BFF */
export async function resellerSignin(
  payload: ResellerSigninPayload,
): Promise<AuthResult> {
  const res = await fetch("/api/resellers/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const body = await parseJson<ApiSuccess<AuthSuccessData> | ApiErrorResponse>(
    res,
  );
  return toAuthResult(body, "Unable to sign in. Please try again.");
}

/** Sign out — clears httpOnly cookie */
export async function resellerSignout(): Promise<void> {
  await fetch("/api/resellers/signout", {
    method: "POST",
    credentials: "include",
  });
}

/** Load profile for authenticated session */
export async function fetchResellerProfile(): Promise<ResellerProfile | null> {
  const res = await fetch("/api/resellers/profile", {
    credentials: "include",
  });
  if (!res.ok) return null;
  const body = await parseJson<ApiSuccess<{ reseller: ResellerProfile }>>(res);
  if (!body?.success) return null;
  return body.data.reseller;
}
