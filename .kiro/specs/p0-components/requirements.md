# Spec: P0 Components — Requirements

## Goal
Build the foundational component set, every component matching the reference implementations already in the repo: `src/components/Button` and `src/patterns/AgentStatus`. Those two ARE the pattern — copy their structure, conventions, and rigor.

## Prerequisite
`token-foundation` spec is complete (tokens build to CSS vars + TS).

## The pattern to copy (from Button / AgentStatus)
Each component is a folder under `src/components/<Name>/` (or `src/patterns/<Name>/` for composed AI surfaces) with exactly:
`<Name>.tsx` · `<Name>.module.css` · `<Name>.stories.tsx` · `<Name>.test.tsx` · `index.ts`.

## Acceptance criteria (every component)
1. References **alias tokens only** via `var(--morph-*)` — zero raw hex/px/ms (lint enforces).
2. Declares all relevant states: rest/hover/focus/active/selected/disabled/loading/error.
3. Keyboard operable; visible focus via `--morph-color-focus`; built on Radix primitives where interactive behavior is non-trivial.
4. Motion uses a register + timing token (productive/t3 default); reduced-motion fallback present.
5. Density-aware (consumes `--morph-control-*`); never <44px touch target on touch.
6. A Storybook story per documented state + an "AllStates"/matrix story.
7. A test file with: role/label assertion, key interaction assertion, and `axe` no-violations.
8. Status/meaning never conveyed by color alone (icon + text).
9. Voice in any built-in copy follows `#morpheus-voice`.

## Scope — P0 inventory
**Actions:** Button ✅(ref) · IconButton · ButtonGroup · Link
**Forms:** TextInput · Textarea · Select · Checkbox · Radio · Switch · Field (label+helper+error)
**Display:** Surface/Card · Divider · Avatar · Badge · Tag/Chip · Tooltip · Skeleton
**Feedback:** InlineMessage · Toast · Progress (linear+circular) · EmptyState
**Nav:** AppBar · SideNav · Tabs · Breadcrumb
**Overlay:** Modal/Dialog · Sheet · Popover · Menu/Dropdown
**AI (P0 for AI surfaces):** MessageTurn · StreamingText · PromptInput · SuggestionChips · AgentStatus ✅(ref) · ReasoningTrace · ToolCallCard · CitationCard · ConfidenceIndicator · HumanInLoopCard · FeedbackControl · GenerationState
