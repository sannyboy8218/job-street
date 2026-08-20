# Apply Form Required Fields

**Date:** 2026-08-21
**Status:** accepted
**Author:** collaborative

## Context

Job seekers could submit an application with an empty cover letter and no resume. Employers then saw “No cover letter” / “No resume”. Resume stays a URL, not a file ([Phase 8](./2026-08-20-phase-8-9-profiles-and-search.md)).

## Decision

- Require a cover letter (at least 20 characters) and a resume `http(s)` link to apply.
- Validate in the UI with inline errors, and again on `POST /api/applications` so empty payloads cannot skip the form.
- Keep the profile resume URL as a prefill only; the apply form must still be valid.

## Alternatives Considered

- Blocking apply until the whole profile is filled — too strict; register already has name/email.
- File resume upload — still out of scope.

## Consequences

Seekers see errors before submit. The API rejects empty applications even if someone bypasses the page.
