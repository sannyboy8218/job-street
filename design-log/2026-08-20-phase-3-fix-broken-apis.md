# Phase 3 — Fix Broken Existing APIs

**Date:** 2026-08-20
**Status:** accepted
**Author:** collaborative

## Context

Several features looked built but returned empty data, crashed, or skipped authorization: employer dashboard queried `employer` instead of `createdBy`, `getMyApplications` was missing, applicants populated a non-existent `name` field, job get/update/delete had no ownership check, and closed jobs still accepted applications.

## Decision

- Query dashboard jobs by `createdBy` and return a real applicant count.
- Implement `getMyApplications` in the application service.
- Populate `firstName lastName email` and display those on ApplicantsPage.
- Require job ownership on employer get/update/delete.
- Reject applications to jobs that are not `OPEN`.
- Display `firstName` + `lastName` in sidebar/navbar instead of `user.name`.

## Alternatives Considered

- Building the My Applications page now — deferred to the job-seeker MVP phase; only the API is fixed here.
- Returning 404 for other employers’ jobs — kept 403 to match applicant listing.

## Consequences

Employer dashboard and applicants show real data. Job seekers can call `/api/applications/me` without a crash. Employers cannot edit each other’s jobs.
