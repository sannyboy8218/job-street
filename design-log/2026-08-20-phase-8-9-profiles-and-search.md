# Phase 8 and 9 — Profiles, Search, Security Hardening

**Date:** 2026-08-20
**Status:** accepted
**Author:** collaborative

## Context

Phases 1–7 made the hiring loop work. The next audit items were:

- Phase 8: seeker profile and a simple employer/company profile
- Phase 9: job search/filter, Helmet, session recovery via `GET /me`, 401 logout, and a small test suite

Company is still a string on `Job` ([phase 4](./2026-08-20-phase-4-employer-jobs.md)). There is no Company collection. Helmet is installed but unused. `GET /api/auth/me` exists but the frontend never calls it after login. `SearchBar` exists but is not wired.

## Decision

Keep the existing architecture. Do not add a Company model, file-upload resumes, password-change, or a new test framework.

**Profiles (Phase 8)**

- Add optional fields on `User`: `phone`, `bio`, `location`, `resumeUrl`, `companyName`, `companyWebsite`, `companyDescription`.
- `PATCH /api/auth/me` updates those fields. Email, password, and role stay out of this endpoint.
- One profile screen per role (`/jobseeker/profile`, `/employer/profile`).
- Prefill create-job `company` from `companyName`, and apply-form `resume` from `resumeUrl`.

**Search and hardening (Phase 9)**

- `GET /api/jobs/public` accepts `search`, `location`, and `employmentType`.
- Cap public listings at 100 rows. No pagination UI yet.
- Use Helmet on the API. CORS already uses `FRONTEND_URL`.
- On app load, if a token exists, call `GET /auth/me` instead of only decoding the JWT.
- Axios 401 (except login/register) clears the session and sends the user to `/login`.
- Frontend API base URL reads `VITE_API_URL` when set.
- Backend tests use Node’s built-in `node:test` for query-building and Zod schemas. No Jest/Vitest.

## Alternatives Considered

- Full Company collection and job `companyId` — too large a schema change for this step.
- File resume upload — keep URL strings for MVP.
- Pagination UI — extra surface; a hard cap is enough until listings grow.
- Rewriting AuthContext to cookies/httpOnly — out of scope; keep JWT in localStorage.

## Consequences

Seekers and employers can edit a real profile. Guests can filter open jobs. Expired tokens log the user out instead of leaving a stale session. Tests cover filter/schema logic without standing up Mongo.
