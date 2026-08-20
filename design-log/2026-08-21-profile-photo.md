# Profile Photo Upload

**Date:** 2026-08-21
**Status:** accepted
**Author:** collaborative

## Context

Users only have initials in the sidebar. They asked to upload their own profile photo. Resumes stay as URL strings ([Phase 8](./2026-08-20-phase-8-9-profiles-and-search.md)). Render’s disk is temporary, so saving files on the server would lose photos on each deploy.

## Decision

- Add a photo upload on the Profile page for both roles.
- `POST /api/auth/me/avatar` accepts one image (`JPG`, `PNG`, or `WEBP`, max 2MB).
- Store the image bytes on the User document in MongoDB (Atlas persists them).
- `GET /api/auth/users/:id/avatar` serves the photo so `<img>` tags can load it. This route is public; user ids are already visible in the app.
- JSON user payloads include `hasAvatar` and never include the raw bytes.
- If there is no photo, keep showing initials.
- Set Helmet `Cross-Origin-Resource-Policy` to `cross-origin` so the Render UI can display API images.

## Alternatives Considered

- Disk folder (`uploads/`) — files disappear on Render restart.
- Cloudinary/S3 — extra account and env vars for this MVP.
- Photo URL text field — not a real upload.

## Consequences

Photos survive deploys. Mongo documents get larger; 2MB cap keeps that bounded. Employers can see applicant photos on the Applicants page.
