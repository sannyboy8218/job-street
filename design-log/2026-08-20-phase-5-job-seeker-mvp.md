# Phase 5 — Job Seeker MVP

**Date:** 2026-08-20
**Status:** accepted
**Author:** collaborative

## Context

Job seekers could browse public jobs and apply, but `/jobs` had no layout, apply was not gated, My Applications was a dead sidebar link, and the seeker dashboard was a heading.

`GET /api/applications/me` already works after Phase 3.

## Decision

- Wrap `/jobs` and `/jobs/:id` in `JobsLayout`: job seekers get the dashboard sidebar; guests and employers get `MainLayout` with a public header.
- Build My Applications at `/jobseeker/applications`.
- Build the job-seeker dashboard from `/applications/me`.
- Show the apply form only to authenticated job seekers; show sign-in or “already applied” otherwise.

## Alternatives Considered

- Making browse jobs login-only — rejected; guests should still see openings.
- A new `/jobseeker/jobs` path — rejected; keep `/jobs` so existing cards and sidebar links work.

## Consequences

The seeker loop is closed: discover → view → apply → track. Employers still cannot apply. Status changes remain a later phase.
