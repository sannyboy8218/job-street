# Auth Page Motion

**Date:** 2026-08-21
**Status:** accepted
**Author:** collaborative

## Context

Login and register already share a calm split layout: blue brand panel (`LoginBrandPanel`) and a slate card form. The pages feel static. The ask is animation that still matches HireHub, including whether to add a moving character or a React animation library.

Related: [login UX redesign](./2026-08-20-login-ux-redesign.md), [registration](./2026-08-20-phase-2-register.md).

## Decision

1. **Do not add a walking/mascot character.** A looping person fights the professional job-board look, needs new art, and distracts from the form.
2. **Do not add Framer Motion / Lottie** for this pass. The frontend already imports `tw-animate-css` (used by shadcn `animate-in`). Extra libraries are heavier than this page needs.
3. **Animate what is already on screen:**
   - Brand panel: slow drift of the existing blurred orbs; optional faint floating Lucide marks (briefcase, search) at low opacity.
   - Form card: one short enter (fade + slight rise) when the page opens.
   - Errors: fade/slide in; button already has a spinner.
   - Honor `prefers-reduced-motion: reduce` (no looping motion).

## Alternatives Considered

- **Mascot / Lottie character** — rejected as the default; cute, but off-brand and harder in dark mode.
- **Framer Motion (Motion)** — good later if we choreograph login ↔ register; skip for a first pass.
- **CSS-only keyframes on the orbs** — enough for a polished SaaS feel.

## Consequences

Auth stays the same two-column layout. Motion is decorative and pauseable. No backend changes.
