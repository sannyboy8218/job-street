# Form Width and Resume Upload

**Date:** 2026-08-21
**Status:** accepted
**Author:** collaborative

## Context

Dashboard forms stretch across the full main column, so short fields (website, email, passwords, resume link) look like one long line. Seekers still enter resume as a URL only ([Phase 8](./2026-08-20-phase-8-9-profiles-and-search.md), [profile photo](./2026-08-21-profile-photo.md)). They asked to upload a resume file as well.

## Decision

**Form width**

- Cap settings and job forms at `max-w-3xl` and center them.
- Pair related short fields in two columns: company name + website; new password + confirm.
- Leave long text (bio, company about, job description) full width of that cap.
- Do not stretch job listings or dashboards — those need the extra space.

**Resume file**

- Job seekers can upload PDF, DOC, or DOCX (max 5MB) on Profile, and may still paste a link.
- Store file bytes on the User document in Mongo (same reason as photos: Render disk is temporary).
- `POST /api/auth/me/resume` uploads. `GET /api/auth/me/resume` is for the seeker. `GET /api/applications/:id/resume` is for the employer who owns that job.
- Resumes are not public URLs. The UI fetches with the JWT and opens a blob.
- Apply requires a link **or** an uploaded file.

## Alternatives Considered

- Cloud storage — extra account; Mongo is enough for this MVP.
- Public resume URL like avatars — resumes are private.
- File-only, drop the link — keep the link for Drive/Dropbox users.

## Consequences

Forms are easier to scan. Seekers can apply without a public link if they uploaded a file. Mongo documents grow; 5MB cap bounds that.
