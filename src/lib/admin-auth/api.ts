import type {
  AdminProfile,
  AdminSigninResult,
  ApiErrorResponse,
  ApiSuccess,
  ResellerActionResult,
  ResellerListResult,
  UpdateAdminProfilePayload,
  UpdateAdminProfileResult,
} from "./types";
import type { ResellerProfile } from "@/lib/reseller-auth/types";

async function parseJson<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function adminSignin(payload: {
  email: string;
  password: string;
}): Promise<AdminSigninResult> {
  const res = await fetch("/api/admin/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const body = await parseJson<
    ApiSuccess<{ admin: AdminProfile }> | ApiErrorResponse
  >(res);
  if (!body || !body.success) {
    return {
      ok: false,
      error: body?.error ?? "Unable to sign in. Please try again.",
    };
  }
  return { ok: true, admin: body.data.admin };
}

export async function adminSignout(): Promise<void> {
  await fetch("/api/admin/signout", {
    method: "POST",
    credentials: "include",
  });
}

export async function fetchAdminResellers(
  status?: string,
): Promise<ResellerListResult> {
  const qs = status ? `?status=${encodeURIComponent(status)}` : "";
  const res = await fetch(`/api/admin/resellers${qs}`, {
    credentials: "include",
  });
  const body = await parseJson<
    ApiSuccess<{ resellers: ResellerProfile[] }> | ApiErrorResponse
  >(res);
  if (!body || !body.success) {
    return {
      ok: false,
      error: body?.error ?? "Unable to load resellers.",
    };
  }
  return { ok: true, resellers: body.data.resellers };
}

export async function approveReseller(id: string): Promise<ResellerActionResult> {
  const res = await fetch(`/api/admin/resellers/${id}/approve`, {
    method: "POST",
    credentials: "include",
  });
  const body = await parseJson<
    ApiSuccess<{ reseller: ResellerProfile }> | ApiErrorResponse
  >(res);
  if (!body || !body.success) {
    return {
      ok: false,
      error: body?.error ?? "Approval failed.",
    };
  }
  return {
    ok: true,
    reseller: body.data.reseller,
    message: body.message ?? "Reseller approved",
  };
}

export async function rejectReseller(id: string): Promise<ResellerActionResult> {
  const res = await fetch(`/api/admin/resellers/${id}/reject`, {
    method: "POST",
    credentials: "include",
  });
  const body = await parseJson<
    ApiSuccess<{ reseller: ResellerProfile }> | ApiErrorResponse
  >(res);
  if (!body || !body.success) {
    return {
      ok: false,
      error: body?.error ?? "Rejection failed.",
    };
  }
  return {
    ok: true,
    reseller: body.data.reseller,
    message: body.message ?? "Reseller rejected",
  };
}

export async function updateAdminProfile(
  payload: UpdateAdminProfilePayload,
): Promise<UpdateAdminProfileResult> {
  const res = await fetch("/api/admin/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const body = await parseJson<
    ApiSuccess<{ admin: AdminProfile }> | ApiErrorResponse
  >(res);
  if (!body || !body.success) {
    return {
      ok: false,
      error: body?.error ?? "Unable To Update Profile.",
      code: body?.code,
      fields: body?.fields,
    };
  }
  return {
    ok: true,
    admin: body.data.admin,
    message: body.message ?? "Profile Updated Successfully.",
  };
}
