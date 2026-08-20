# Phase 1 — Foundation

**Date:** 2026-08-20
**Status:** accepted
**Author:** collaborative

## Context

The audit found the app could not be run reliably: no env template, `dotenv` loaded after `app.js` (so CORS/`FRONTEND_URL` were empty), and mis-copied HTTP error classes. `lucide-react` is already pinned to `0.511.0` in the frontend lockfile.

## Decision

- Add `backend/.env.example` and allow it in git (exception to `.env.*`).
- Add a local `backend/.env` with development defaults (not for commit).
- Load env with `import "dotenv/config"` before other app imports.
- Use `FRONTEND_URL` for CORS with a localhost fallback.
- Restore `NotFoundError` (404) and `BadRequestError` (400).

## Alternatives Considered

- Adding Helmet/Morgan now — deferred; not required to boot the app.
- Rewriting auth — out of scope for Phase 1.

## Consequences

The API can start once MongoDB is reachable. Wrong HTTP statuses for “not found” / “already applied” are corrected. Register UI and remaining API bugs stay for later phases.
