# Phase 7 — UX Consistency

**Date:** 2026-08-20
**Status:** accepted
**Author:** collaborative

## Context

The hiring loop works, but first-time visitors still hit a stub landing page. Sidebar linked to `/employer/applicants` (no route). Settings, search, and notifications were visible with no behavior. There was no 404 page.

## Decision

- Build a HireHub landing page with clear paths: browse jobs, create account, sign in.
- Remove dead sidebar items (Applicants all-jobs route, Settings).
- Remove fake TopNavbar search, bell, and dropdown chevron until those features exist.
- Add a catch-all 404 page inside the public layout.
- Show human-readable role labels (Job seeker / Employer).

## Alternatives Considered

- Wiring the unused SearchBar to an API — no search endpoint yet (later phase).
- Building Settings — no profile API yet.

## Consequences

New visitors can enter the product. Logged-in navigation only shows working links.
