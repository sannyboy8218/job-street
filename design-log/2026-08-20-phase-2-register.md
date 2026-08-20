# Phase 2 — Registration

**Date:** 2026-08-20
**Status:** accepted
**Author:** collaborative

## Context

Login is complete. `POST /api/auth/register` already exists. The register page was a placeholder heading. Users could not create accounts from the UI.

## Decision

- Build `RegisterPage` to match the login layout (`LoginBrandPanel` + card form).
- Validate with Zod to match the backend: firstName, lastName, email, password (min 8), role.
- Confirm password on the client only; do not send it to the API.
- After a successful register, call existing `login()` with the same email/password so the user gets a JWT without changing the backend contract.
- Do not modify AuthContext, JWT, or register API behavior.

## Alternatives Considered

- Changing register to return a token — rejected; keep the existing API.
- Redirecting to login after register — weaker UX than signing them in with the existing login function.

## Consequences

Job seekers and employers can create accounts and land on the correct dashboard. Backend auth is unchanged.
