"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { updateAdminProfile } from "@/lib/admin-auth/api";
import type { AdminProfile } from "@/lib/admin-auth/types";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20";

const fieldErrorClass =
  "border-red-300 focus:border-red-500 focus:ring-red-500/30";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
      {message}
    </p>
  );
}

export function AdminProfileClient({ admin }: { admin: AdminProfile }) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(admin.firstName);
  const [lastName, setLastName] = useState(admin.lastName);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    setFormError(null);
    setSuccess(null);
    setFieldErrors({});

    const errors: Record<string, string> = {};
    if (!firstName.trim()) errors.firstName = "First Name Is Required";
    if (!lastName.trim()) errors.lastName = "Last Name Is Required";

    const changingPassword = Boolean(newPassword.trim() || confirmPassword.trim());
    if (changingPassword) {
      if (!currentPassword.trim()) {
        errors.currentPassword = "Current Password Is Required";
      }
      if (newPassword.length < 8) {
        errors.newPassword = "Password Must Be At Least 8 Characters";
      } else if (!/[A-Z]/.test(newPassword)) {
        errors.newPassword = "Include At Least One Uppercase Letter";
      } else if (!/[a-z]/.test(newPassword)) {
        errors.newPassword = "Include At Least One Lowercase Letter";
      } else if (!/[0-9]/.test(newPassword)) {
        errors.newPassword = "Include At Least One Number";
      }
      if (newPassword !== confirmPassword) {
        errors.confirmPassword = "Passwords Do Not Match";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const result = await updateAdminProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      currentPassword: changingPassword ? currentPassword : undefined,
      newPassword: changingPassword ? newPassword : undefined,
      confirmPassword: changingPassword ? confirmPassword : undefined,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      if (result.fields) setFieldErrors(result.fields);
      setFormError(result.error);
      return;
    }

    setSuccess(result.message);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    router.refresh();
  }

  return (
    <div className="max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
          Profile
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          Update Your Admin Account Details And Password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
        noValidate
      >
        {formError ? (
          <p className="text-sm font-medium text-red-600" role="alert">
            {formError}
          </p>
        ) : null}
        {success ? (
          <p className="text-sm font-medium text-emerald-700" role="status">
            {success}
          </p>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="admin-first-name" className="text-sm font-medium text-zinc-950">
              First Name
            </label>
            <input
              id="admin-first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={cn(fieldClass, fieldErrors.firstName && fieldErrorClass)}
            />
            <FieldError message={fieldErrors.firstName} />
          </div>
          <div>
            <label htmlFor="admin-last-name" className="text-sm font-medium text-zinc-950">
              Last Name
            </label>
            <input
              id="admin-last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={cn(fieldClass, fieldErrors.lastName && fieldErrorClass)}
            />
            <FieldError message={fieldErrors.lastName} />
          </div>
        </div>

        <div>
          <label htmlFor="admin-email" className="text-sm font-medium text-zinc-950">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            value={admin.email}
            disabled
            className={cn(fieldClass, "cursor-not-allowed bg-zinc-50 text-zinc-500")}
          />
          <p className="mt-1 text-xs text-zinc-500">Email Cannot Be Changed.</p>
        </div>

        <div className="border-t border-zinc-100 pt-6">
          <h2 className="text-sm font-semibold text-zinc-950">Change Password</h2>
          <p className="mt-1 text-xs text-zinc-500">
            Leave Blank To Keep Your Current Password.
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="admin-current-password"
                className="text-sm font-medium text-zinc-950"
              >
                Current Password
              </label>
              <input
                id="admin-current-password"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={cn(
                  fieldClass,
                  fieldErrors.currentPassword && fieldErrorClass,
                )}
              />
              <FieldError message={fieldErrors.currentPassword} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="admin-new-password"
                  className="text-sm font-medium text-zinc-950"
                >
                  New Password
                </label>
                <input
                  id="admin-new-password"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={cn(fieldClass, fieldErrors.newPassword && fieldErrorClass)}
                />
                <FieldError message={fieldErrors.newPassword} />
              </div>
              <div>
                <label
                  htmlFor="admin-confirm-password"
                  className="text-sm font-medium text-zinc-950"
                >
                  Confirm New Password
                </label>
                <input
                  id="admin-confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={cn(
                    fieldClass,
                    fieldErrors.confirmPassword && fieldErrorClass,
                  )}
                />
                <FieldError message={fieldErrors.confirmPassword} />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
