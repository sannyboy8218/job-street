# Phase 6 — Application Status Workflow

**Date:** 2026-08-20
**Status:** accepted
**Author:** collaborative

## Context

Applications stored status (`PENDING`, `REVIEWED`, `INTERVIEW`, `ACCEPTED`, `REJECTED`) but employers could not change it. Job seekers could see status but it never moved past Pending.

## Decision

- Add `PATCH /api/applications/:id/status` for employers who own the job.
- Validate status with Zod against the existing enum (do not rename to hired/shortlisted yet).
- Add a status dropdown on `ApplicantsPage`.
- Job-seeker dashboard and My Applications already display status, so they pick up changes on refresh.

## Alternatives Considered

- Renaming statuses to pending/reviewing/shortlisted/rejected/hired now — deferred; keep the current database enum.
- Allowing job seekers to change status — rejected; only the hiring employer should.

## Consequences

The core loop is closed: apply → employer reviews → status updates → seeker sees the new status.
