# Auth Brand Character

**Date:** 2026-08-21
**Status:** accepted
**Author:** collaborative

## Context

The first motion pass ([auth page motion](./2026-08-21-auth-page-motion.md)) used drifting orbs and faint Lucide icons. The follow-up was a still person + briefcase illustration with a tiny idle bob, not a walk cycle.

## Decision

- Add a decorative SVG character (person holding a briefcase) on `LoginBrandPanel`, so login and register both get it.
- Use a slow vertical bob only. No walk cycle, Lottie, or extra animation library.
- Keep the drifting orbs. Remove the floating Lucide icons so they do not compete with the figure.
- Honor `prefers-reduced-motion`.

## Alternatives Considered

- Raster illustration — skipped; SVG stays sharp on the blue panel and matches existing colors.
- Walking loop — rejected; too busy for a sign-in screen.

## Consequences

The left panel is more illustrated. The form is unchanged. No backend changes.
