---
inclusion: always
---

# Tech — Stack & Conventions

## Stack
- **Language:** TypeScript (strict).
- **UI:** React 18+, functional components + hooks only.
- **Build/dev:** Vite.
- **Tokens:** Style Dictionary — source of truth in `/tokens/*.json`, built to CSS custom properties (`:root` + `[data-theme]`) and a typed TS export. Components consume CSS variables, never raw values.
- **Styling:** CSS Modules or vanilla-extract (token-driven). No hard-coded hex/px/ms in components — reference `var(--morph-*)`.
- **Accessible primitives:** Radix UI for unstyled, accessible behavior (focus, roving tabindex, ARIA) — Morpheus supplies the skin via tokens. This is the fastest path to the WCAG 2.2 AA gate.
- **Docs/rendering:** Storybook — every component gets a story per state.
- **Testing:** Vitest + Testing Library (unit/interaction); axe (jest-axe / @axe-core/playwright) on every component; Playwright for keyboard + visual passes.
- **Icons:** SVG sprite/component set, single 1.75px stroke on 24px grid (see design steering).

## Token contract
- Three tiers: **global** (primitives) → **alias** (semantic) → **component**. Components reference **alias only**; alias references global; never skip a tier.
- All token names prefixed `morph-`; kebab-case; `category-role-variant-state`.
- Theme switching via `data-theme="dark|light"` on root; `dark` is default.
- Honor `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast`, `forced-colors`.

## Commands
- `npm run dev` — Vite dev server
- `npm run tokens` — build tokens via Style Dictionary
- `npm run storybook` — component workbench
- `npm run test` — unit + a11y
- `npm run build` — library build

## Constraints
- No browser storage APIs (localStorage/sessionStorage) in component code paths intended for sandboxed rendering.
- No raw color/spacing/timing literals in components — tokens only.
- Sound and haptics are off by default and always have a visual equivalent.
