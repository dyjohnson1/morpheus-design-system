# Spec: Token Foundation — Requirements

## Goal
Stand up the Morpheus token pipeline so every downstream component consumes tokens, never raw values. This is the first build step (nothing visual ships before tokens exist).

## User stories
- As a developer, I can import typed tokens and CSS variables so I never hard-code color/space/motion.
- As a designer, I can change a value in `/tokens/*.json` and have it propagate everywhere via one build.
- As a user, the theme switches dark↔light and respects my reduced-motion/transparency/contrast preferences.

## Acceptance criteria (EARS)
1. WHEN `npm run tokens` runs, THE SYSTEM SHALL generate `build/morph-tokens.css` (CSS custom properties under `:root` and `[data-theme="light"]`) AND `build/morph-tokens.ts` (typed export).
2. WHERE a token references another (alias→global), THE SYSTEM SHALL resolve the reference at build time.
3. THE SYSTEM SHALL emit all color, space, radius, motion, type, density, and breakpoint tokens defined in `/tokens`.
4. WHEN `data-theme` is unset, THE SYSTEM SHALL default to dark.
5. THE SYSTEM SHALL expose reduced-motion and reduced-transparency fallbacks as media-query overrides in the generated CSS.
6. ALL generated color pairings used for text SHALL meet WCAG 2.2 AA (verified in test).
7. THE SYSTEM SHALL fail the build if any component source contains a raw hex, px, or ms literal (lint rule).
