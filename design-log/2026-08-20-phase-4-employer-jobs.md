# Phase 4 — Employer Job Management

**Date:** 2026-08-20
**Status:** accepted
**Author:** collaborative

## Context

Employers could create and list jobs. Edit was a heading, delete only logged to the console, and job status (`OPEN` / `CLOSED`) could not be changed through the API schema.

## Decision

- Add `updateJobSchema` with `status` so PUT can close or reopen a job.
- Build `EditJobPage` using the same form fields as create (shared `JobForm`).
- Wire delete with a confirm dialog, and remove related applications when a job is deleted.
- Add Close / Reopen on the employer job card using the existing PUT endpoint.

## Alternatives Considered

- A separate PATCH `/jobs/:id/status` — not needed; the list page already has the full job object to send a PUT.
- A modal library for delete confirm — `window.confirm` is enough for this MVP.

## Consequences

Employers can edit, delete, close, and reopen their own jobs. Public browse only shows `OPEN` jobs, which already was the case.
