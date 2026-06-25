---
inclusion: always
---

# Project Structure

## Folder layout
```
morpheus-design-system/
├── .kiro/
│   ├── steering/        # persistent rules (this directory)
│   └── specs/           # spec-driven work orders (requirements/design/tasks)
├── tokens/              # Style Dictionary SOURCE of truth (JSON)
│   ├── color.json
│   ├── core.json        # space, radius, elevation, motion, type primitives
│   └── theme/           # alias/semantic mappings per theme
├── build/               # generated tokens (CSS vars + TS) — do not edit by hand
├── src/
│   ├── tokens/          # generated TS token exports (re-exported)
│   ├── primitives/      # non-visual building blocks (Surface, Text, Box, VisuallyHidden)
│   ├── components/      # one folder per component
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.module.css
│   │       ├── Button.stories.tsx
│   │       ├── Button.test.tsx
│   │       └── index.ts
│   ├── patterns/        # composed patterns (chat surface, agent status, HITL card)
│   ├── icons/           # SVG icon set
│   └── index.ts         # public exports
├── docs/                # full design reference (morpheus-design-system-full.md)
└── .storybook/
```

## Naming
- Components: PascalCase folder + file (`Button/Button.tsx`).
- Files for non-components: camelCase (`useTheme.ts`).
- Tokens: kebab-case, `morph-` prefixed.
- Stories: one story per documented state (rest/hover/focus/active/selected/disabled/loading/error).
- CSS classes: token-driven; avoid magic numbers.

## Where things go
- New token? → `/tokens/*.json`, then rebuild (`npm run tokens`). Never define values in a component.
- New component? → `/src/components/<Name>/` with the five-file pattern above; reference alias tokens only.
- New composed AI/agent surface? → `/src/patterns/`.
- Design rule change? → the relevant `.kiro/steering/morpheus-*.md` file (not buried in code).

## Import patterns
- Public API only from `src/index.ts`; internal cross-imports use relative paths within a domain.
- Tokens imported from `src/tokens`, never re-derived.
