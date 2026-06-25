# Spec: P0 Components — Design

## Conventions (already proven in the reference components)
- Props: typed, `variant` for visual intent, `forwardRef` for DOM components, sensible defaults (secondary button, comfortable density).
- Styling: CSS Modules; `:global(svg)` sizing for icon slots; `color-mix` for hover tints derived from tokens.
- A11y: real semantic elements; `aria-busy` for loading; `role="status" aria-live="polite"` for agent/streaming surfaces; `VisuallyHidden` for SR-only text.
- Motion: CSS transitions on transform/color with `--morph-motion-*`; `@media (prefers-reduced-motion: reduce)` disables non-essential animation.

## AI surface specifics
- **StreamingText:** append into a single `aria-live="polite"` region; announce at sentence boundaries, not per token; completion triggers the "reveal" (luminance sweep, t5) — gated by reduced-motion.
- **HumanInLoopCard:** action + rationale + approve/modify/reject; rationale is part of the accessible description; keyboard + SR operable; pairs `haptic-agent-checkpoint`.
- **ConfidenceIndicator:** textual, muted (`on-surface-muted`); never an alarm color.
- **MessageTurn:** differentiate user/agent by surface tonality + alignment, not bubbles.

## Build order within P0
1. Display + Actions (Surface, Card, IconButton, Link, Badge, Tag, Avatar, Divider, Skeleton) — low dependency.
2. Forms (Field first, then inputs that compose it).
3. Feedback + Overlay (Radix Dialog/Popover/Tooltip under the hood).
4. Nav.
5. AI components + assemble into the patterns in `morpheus-patterns`.
