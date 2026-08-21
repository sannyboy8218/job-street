# Closed Jobs, Last Viewed, Headcount, and Status Locks

**Date:** 2026-08-21
**Status:** accepted
**Author:** collaborative

## Context

Agreed after [the proposed plan](./2026-08-21-closed-jobs-headcount.md). Employers also asked to lock application status so it cannot move backward (Reviewed cannot return to Pending; Accepted cannot become Rejected or Reviewed).

## Decision

1. Seekers see a Closed message on applications and can still open the posting read-only. Browse lists stay open-only.
2. Opening a job they applied to stores `lastViewedAt` on that application.
3. Jobs have `positionsNeeded` (min 1, default 1). Employers see **Need X · Y applying** on My Jobs and the dashboard.
4. Status may only move forward:
   - Pending → Reviewed, Interview, Accepted, Rejected
   - Reviewed → Interview, Accepted, Rejected (not Pending)
   - Interview → Accepted, Rejected
   - Accepted and Rejected are final

## Alternatives Considered

- Allowing Rejected → Interview — rejected; the request was no going backward once a decision is made.

## Consequences

Employers cannot undo an accept/reject in the app. To hire more people they leave the job open and keep `positionsNeeded` above the number they still need.
