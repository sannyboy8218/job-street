# Revert Form Width and Resume Upload

**Date:** 2026-08-21
**Status:** accepted
**Author:** collaborative

## Context

[Form width and resume upload](./2026-08-21-form-width-resume-upload.md) added narrower dashboard forms and file resume upload. That work is being taken out.

## Decision

Restore full-width profile, password, job, and job-details forms. Resume is a URL again (profile link + required apply link). No file upload API.

## Alternatives Considered

- Keeping the narrower max-width only — rejected; revert the whole change set as requested.

## Consequences

Seekers must paste an http(s) resume link to apply. Uploaded resume files in Mongo (if any from local testing) are unused.
