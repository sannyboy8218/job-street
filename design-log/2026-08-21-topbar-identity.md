# Top Bar Identity and Job Type Labels

**Date:** 2026-08-21
**Status:** accepted
**Author:** collaborative

## Context

The logged-in top bar was an empty strip with only the bell. Its bottom border sat higher than the sidebar logo row because the logo used a large icon and extra padding. Profile and theme lived in the sidebar. Browse Jobs showed raw values like `PART_TIME`, and the search icon sat too high in the field. This supersedes keeping identity only in the sidebar ([header identity](./2026-08-20-dashboard-header-identity.md), [notifications top bar](./2026-08-21-notifications-topbar.md)).

## Decision

- Make the sidebar logo row and the top bar the same height (`h-20`) with the same bottom border so the line lines up.
- Shrink the sidebar logo so it fits that row.
- Move avatar, name, and role into the top bar (link to Profile). Keep the Profile nav item and Logout in the sidebar.
- Move the theme toggle into the top bar (icon only).
- Keep the greeting on the left of the top bar on every dashboard page so the bar is not empty.
- Center the search icon in the input.
- Show employment types as “Full time”, “Part time”, and so on in filters, forms, and job cards.

## Alternatives Considered

- A full-width header over the sidebar — bigger layout change; matching heights is enough.
- A profile dropdown with logout — sidebar already has Logout.

## Consequences

Who you are is visible once, in the top bar. The header reads as one row. Job type filters are readable for people who are not looking at database values.
