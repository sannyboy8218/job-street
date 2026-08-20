# Login Page UX/UI Redesign

**Date:** 2026-08-20
**Status:** accepted
**Author:** collaborative

## Context

The existing login page had a strong visual direction (blue HireHub brand panel + card form) but a weak structure and UX: nested layouts, marketing competing with the form, `alert()` errors, no loading state, a dead Forgot Password control, and missing accessibility.

Authentication behavior (`AuthContext.login`, JWT storage, role-based redirect) is preserved.

## Decision

- Make `AuthLayout` a full-viewport passthrough so login owns the screen.
- Keep the desktop split: brand panel left, form right.
- Make the form the primary task: heading "Sign in", two fields, one button, register link.
- Remove Forgot Password until a real reset flow exists.
- Use inline API errors, submit loading, password visibility toggle, and proper label/input wiring.
- Redirect already-authenticated users to their dashboard.
- Extract `login.schema.js` and `LoginBrandPanel` for reuse on register later.

## Alternatives Considered

- Rewriting `AuthContext` — rejected; auth already works.
- Building forgot-password — rejected; no backend support yet.
- Splitting EmailInput/PasswordInput into separate files — rejected as over-engineering.

## Consequences

- Register remains a stub; the sign-up link still goes to `/register`.
- Brand panel can be reused when register is implemented.
- No backend changes.
