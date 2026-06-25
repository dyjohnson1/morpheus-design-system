# Morpheus — Agent Guide

AI-native, multi-modal design system. Aesthetic: afro-gothic modernism / Vermeer chiaroscuro / Maxwell "Fortunate" palette — cool blue-black ground, warm cream light, muted-plum signature. Principle: **light reveals form** (chrome recedes, content leads).

## Non-negotiables
- Token-first: no raw hex/px/ms in components — use `var(--morph-*)`. Tiers: global → alias → component (alias only in components).
- Dark-first; theme via `data-theme`. One accent (plum), used as a light source, sparingly.
- WCAG 2.2 AA is a gate. Never color alone. Honor reduced-motion/transparency/contrast.
- Motion: productive (default, fast) vs expressive (earned, rare). Timing t1–t5. Spring for interactive, bezier for state changes.
- Voice: warm, precise mentor; sentence case; no exclamation/hype/emoji. Warmth on in onboarding/empty/success/tooltips; plain in errors/destructive/dense data.

Full rules live in `.kiro/steering/morpheus-*.md` and `docs/morpheus-design-system-full.md`.
