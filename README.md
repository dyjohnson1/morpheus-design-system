# Morpheus Design System

An AI-native, multi-modal design system. Afro-gothic modernism by way of Vermeer's chiaroscuro and the Maxwell *Fortunate* palette: cool blue-black ground, warm cream light, a muted-plum signature. **Light reveals form.**

## Quick start
```bash
npm install
npm run tokens      # build tokens -> build/morph-tokens.css + .ts
npm run storybook   # see Button + AgentStatus rendered
npm run dev
npm run test        # unit + a11y (axe)
```

## Layout
- `.kiro/steering/` — rules Kiro loads automatically (foundation + Morpheus design rules).
- `.kiro/specs/` — work orders, run in order:
  1. `token-foundation` — build the token pipeline + scaffold.
  2. `p0-components` — build the ~35 foundational components (uses the references below as the pattern).
  3. `_TEMPLATE-screen/` — copy to `<screen-name>/` to compose actual UI; `example-chat-screen/` shows a filled-in one.
- `tokens/` — Style Dictionary source of truth.
- `src/` — primitives, hooks, and the two **reference implementations**:
  - `src/components/Button/` — canonical component pattern (states, tokens, story, a11y test).
  - `src/patterns/AgentStatus/` — canonical AI pattern (live region, motion = state, no spinner).
- `src/styles/morph-tokens.css` — reference token output so the references render before you run `npm run tokens`.
- `docs/morpheus-design-system-full.md` — complete design reference.

## How to drive it (the order that matters)
Tokens → components → screens. You can keep all specs in the repo now; they execute when you point Kiro at them.
1. Open the folder as a Kiro workspace (`.kiro/` must be at repo root).
2. Run `token-foundation`.
3. Run `p0-components` — Kiro copies the Button/AgentStatus pattern across the inventory.
4. Copy `_TEMPLATE-screen` → `my-screen/`, fill it in, and ask Kiro to build it. Now you're designing UI from your own components.

## Definition of done (every element)
Alias tokens only · all states · motion register + reduced-motion fallback · modality behaviors · WCAG 2.2 AA · when-to / when-not-to rationale.
