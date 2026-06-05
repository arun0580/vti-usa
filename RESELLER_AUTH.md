# Reseller authentication (Web + API)

The reseller portal at `/resellers` uses JWT authentication with the API in `vti-usa-api`.

## Architecture

```
Browser → Next.js BFF (/api/resellers/*) → Express API (:4000)
                ↓
         httpOnly cookie (reseller_token)
```

The JWT is **not** stored in `localStorage`. Next.js route handlers receive the token from the API and set an **httpOnly** cookie so client JavaScript cannot read it.

## Setup

### 1. API (`vti-usa-api`)

See [vti-usa-api/README.md](../vti-usa-api/README.md).

```bash
cd vti-usa-api
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

### 2. Web (`vti-usa`)

```bash
cd vti-usa
cp .env.example .env.local
# Set RESELLER_API_URL=http://localhost:4000

npm install
npm run dev
```

Open http://localhost:3000/resellers

### 3. Test accounts (after seed)

**Admin** (approve resellers): `admin@vtiusa.com` / `ChangeMeAdmin123!` — see [Admin portal](#admin-portal) below.

Resellers are created via `/resellers` sign-up (not seeded).

## Email verification & admin approval

1. **Sign up** creates a **pending** account and sends a verification link via **Resend**.
2. User verifies email → `/resellers/verify-email?token=...` — no session until **admin approves**.
3. **Admin** signs in at `/admin/login`, reviews pending resellers at `/admin/resellers`, and clicks **Approve**.
4. **Sign in** requires `emailVerified` and `status: active` (`EMAIL_NOT_VERIFIED`, `ACCOUNT_PENDING`).
5. **Resend verification** is available on the sign-in form and after signup.

### Admin portal

| URL                | Description                        |
| ------------------ | ---------------------------------- |
| `/admin/login`     | Admin sign in                      |
| `/admin/resellers` | Approve or reject reseller signups |

All accounts live in the PostgreSQL `users` table with `role` (`admin` | `reseller`). Seed a default admin:

```bash
cd vti-usa-api
npm run db:seed
```

| Field    | Value (seed)        |
| -------- | ------------------- |
| Email    | `admin@vtiusa.com`  |
| Password | `ChangeMeAdmin123!` |

Set `ADMIN_JWT_SECRET` in `vti-usa-api/.env` (32+ characters). Restart the API after env changes.

Requires in `vti-usa/.env.local`:

```env
RESEND_API_KEY=re_...
FROM_EMAIL="VTI USA <onboarding@resend.dev>"
SITE_URL=http://localhost:3000
RESELLER_API_URL=http://localhost:4000
```

Get `RESEND_API_KEY` at https://resend.com/api-keys. For local testing, `onboarding@resend.dev` only delivers to the email on your Resend account until you verify your domain.

## Routes

| URL                       | Description                                      |
| ------------------------- | ------------------------------------------------ |
| `/resellers`              | Sign in / Sign up tabs                           |
| `/resellers/verify-email` | Email verification landing page                  |
| `/resellers/dashboard`    | Protected dashboard (redirects if not signed in) |
| `/admin/login`            | Admin sign in                                    |
| `/admin/resellers`        | Reseller approval queue                          |

## Frontend files

| Path                                         | Role                       |
| -------------------------------------------- | -------------------------- |
| `src/lib/reseller-auth/api.ts`               | Client calls to BFF        |
| `src/lib/reseller-auth/validation.ts`        | Form validation            |
| `src/lib/reseller-auth/server.ts`            | Cookie + API proxy helpers |
| `src/app/api/resellers/*`                    | BFF route handlers         |
| `src/app/resellers/ResellerPortalClient.tsx` | Auth UI                    |

## Environment

| Variable           | Where | Description                                        |
| ------------------ | ----- | -------------------------------------------------- |
| `RESEND_API_KEY`   | Web   | Resend API key for verification emails             |
| `FROM_EMAIL`       | Web   | Verified sender in Resend                          |
| `SITE_URL`         | Web   | Base URL for verification links                    |
| `RESELLER_API_URL` | Web   | Backend base URL (default `http://localhost:4000`) |
| `DATABASE_URL`     | API   | PostgreSQL connection                              |
| `JWT_SECRET`       | API   | Signing key (32+ chars)                            |
| `CORS_ORIGIN`      | API   | `http://localhost:3000`                            |
