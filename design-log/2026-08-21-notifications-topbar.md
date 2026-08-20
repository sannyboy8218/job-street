# Notifications in the Top Bar

**Date:** 2026-08-21
**Status:** accepted
**Author:** collaborative

## Context

The application bell was in the sidebar. Users asked to move it to the top bar, at the right end. [Dashboard Header Identity Dedup](./2026-08-20-dashboard-header-identity.md) hid the top bar on inner pages. That would hide the bell on Reports, Jobs, and Profile.

## Decision

- Put the bell in `TopNavbar`, aligned to the right.
- Show the top bar on every logged-in dashboard page so the bell is always there.
- Keep the greeting only on the employer and job-seeker dashboards.
- Keep name, role, and avatar only in the sidebar.
- Remove the bell from the sidebar.
- On public pages while signed in, keep the bell as the last item in the header.

## Alternatives Considered

- Bell only on dashboard home — rejected; users would miss alerts on other pages.
- Leaving a second bell in the sidebar — duplicate.

## Consequences

Inner pages have a thin header again, but it only holds the bell (and the greeting on home). This supersedes the “hide the top bar on inner pages” part of the earlier header decision.
