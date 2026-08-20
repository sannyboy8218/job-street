# Employer After-Accept Prompt and Application Reports

**Date:** 2026-08-20
**Status:** accepted
**Author:** collaborative

## Context

After an employer sets an application to Accepted, HireHub does nothing else. Employers also need a date-ranged export of applications for their own jobs.

There is no mailer, no hire-date field, and no Company model. Application timestamps are `createdAt` / `updatedAt` only.

## Decision

- When status becomes **Accepted** and the job is still **OPEN**, ask whether to close the job. Do not auto-close.
- Show applicant email, phone, and resume more clearly on the applicants page.
- Add an employer **Reports** page with From / To (date applied), optional status filter, a preview table, and **Download Excel**.
- Date range is inclusive on `application.createdAt` (date applied), UTC-calendar strings `YYYY-MM-DD`.
- Excel is generated on the backend with ExcelJS. Only that employer’s jobs are included.
- Do not add email, PDF, charts, or `statusUpdatedAt` in this step.

## Alternatives Considered

- Filtering on `updatedAt` as “date hired” — inaccurate, because any save updates it.
- CSV only — Excel was requested; `.xlsx` is clearer for opening in Excel.
- Client-side spreadsheet generation — would still need the same data API; server-side keeps authorization in one place.

## Consequences

Employers can contact an accepted seeker and optionally stop new applications. They can export hiring activity for a date range. Reports mean “applied between these dates,” not “accepted between these dates.”
