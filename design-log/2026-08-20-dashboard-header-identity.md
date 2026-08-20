# Dashboard Header Identity Dedup

**Date:** 2026-08-20
**Status:** accepted
**Author:** collaborative

## Context

The logged-in layout showed the same avatar, name, and role in the sidebar and in the top bar. On inner pages (Reports, Jobs, Profile) the top bar was mostly that duplicate chip. Identity already sits next to Profile and Logout in the sidebar ([phase 7](./2026-08-20-phase-7-ux-consistency.md) removed fake header actions).

## Decision

- Keep name, role, and initials only in the sidebar.
- Show the top bar only on the employer and job-seeker dashboards, as a greeting.
- Hide the top bar on all other dashboard pages.

## Alternatives Considered

- Keeping a thin empty header on inner pages — wasted vertical space.
- Making the header chip a profile/logout menu — extra UI for actions the sidebar already has.

## Consequences

Who you are is visible once. Dashboard still feels personal via the greeting. Reports and other pages start with the page title.
