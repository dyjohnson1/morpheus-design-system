# Spec: Token Foundation — Design

## Architecture
- **Source:** `/tokens/*.json` (global) + `/tokens/theme/{dark,light}.json` (alias). Three tiers per `tech.md`.
- **Transform:** Style Dictionary. Two platforms: `css` (custom properties) and `ts` (typed object + union types).
- **Output:** `/build/morph-tokens.css`, `/build/morph-tokens.ts`. Re-exported from `/src/tokens`.

## Theme strategy
- `:root` holds dark (default) alias values. `[data-theme="light"]` overrides the alias layer only — global primitives are theme-agnostic.
- A `useTheme()` hook toggles `data-theme` on `<html>` and persists to user preference (in-memory in sandboxed contexts).

## Preference media queries (generated)
- `@media (prefers-reduced-motion: reduce)` → motion durations collapse to t2 crossfade equivalents; spring vars map to `standard` easing.
- `@media (prefers-reduced-transparency: reduce)` → material vars force Tier 2 (solid surface + shadow, no blur).
- `@media (prefers-contrast: more)` / `forced-colors` → border-subtle strengthens; accent text steps up one stop.

## Lint
ESLint rule (custom or `no-restricted-syntax`) blocks raw hex/px/ms in `src/components/**`. CI fails on violation.

## Verification
Vitest contrast test imports generated tokens and asserts AA for: on-surface/ground, on-surface-muted/ground, accent-text/ground, on-accent/accent, and the light-mode equivalents.
