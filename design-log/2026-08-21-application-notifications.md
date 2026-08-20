# Application Notifications

**Date:** 2026-08-21
**Status:** accepted
**Author:** collaborative

## Context

Employers only learn about new applications if they open Applicants. Job seekers only see status changes if they refresh My Applications. Both roles asked for a notification when those events happen. See [Phase 6](./2026-08-20-phase-6-application-status.md).

## Decision

- Store in-app notifications in MongoDB. Do not send email or use websockets.
- Create a notification for the **employer** when a job seeker applies.
- Create a notification for the **job seeker** when an employer changes application status (`REVIEWED`, `INTERVIEW`, `ACCEPTED`, `REJECTED`, or back to `PENDING`). Skip if the status did not change.
- APIs: `GET /api/notifications`, `PATCH /api/notifications/:id/read`, `PATCH /api/notifications/read-all`.
- Show a bell with an unread badge in the logged-in sidebar (and public header when signed in). Poll every 30 seconds.
- Clicking a notification marks it read and opens the related page (applicants list or My Applications).

## Alternatives Considered

- Email — no mailer is set up; extra env and cost.
- Live websockets — more infrastructure than this MVP needs.
- Follow OS push notifications — browsers require extra permission; in-app is enough.

## Consequences

Notifications appear after refresh or within about 30 seconds. They stay in the database until read. A failed notification write must not block applying or updating status.
