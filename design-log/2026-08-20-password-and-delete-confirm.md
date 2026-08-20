# Password Change and Delete Confirmation

**Date:** 2026-08-20
**Status:** accepted
**Author:** collaborative

## Context

Profiles exist ([phase 8–9](./2026-08-20-phase-8-9-profiles-and-search.md)) but users cannot change a password. Deleting a job uses `window.confirm`, which is a browser dialog and does not match the rest of the UI.

Resume stays a URL for this step. File upload is still later work.

## Decision

- `PATCH /api/auth/password` with `currentPassword` and `newPassword`.
- Wrong current password returns **400**, not 401, so the session interceptor does not log the user out.
- Stay signed in after a successful change (existing JWT remains valid).
- Add a Change password card on the existing profile page.
- Replace job delete `window.confirm` with an in-app confirm dialog. Deleting a job still removes its applications.

## Alternatives Considered

- Logging the user out after a password change — extra friction; the JWT is not a password.
- Installing a new dialog library — a small overlay using existing Button/Card styles is enough.
- Resume file upload in this change — out of scope.

## Consequences

Both roles can rotate their password from Profile. Employers get a HireHub-styled delete warning before a job and its applications are removed.
