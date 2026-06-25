---
inclusion: fileMatch
fileMatchPattern: 'src/components/**/*|src/patterns/**/*|src/icons/**/*|*.tsx|*.jsx'
---

# Morpheus — Components, Patterns, Multimodal, Icons

## Every component spec declares
anatomy · states (rest/hover/focus/active/selected/disabled/loading/error) · alias token bindings · motion register + timing · density behavior · modality behaviors · a11y notes · when-to / when-not-to. Default motion: productive, t3, unless escalated. Build accessible behavior on Radix primitives; skin via tokens.

## Inventory (tiered)
**P0 — Foundations:** button (primary/secondary/ghost/destructive), icon button, button group, link · text input, textarea, select, checkbox, radio, switch, field (label+helper+error) · surface/card, divider, avatar, badge, tag/chip, tooltip, skeleton · inline message, toast, progress (linear/circular), empty state · app bar, side nav, tabs, breadcrumb · modal/dialog, sheet, popover, menu/dropdown.

**P1 — Expansion:** combobox/autocomplete, multiselect, token input, slider, stepper, date picker, time picker, file upload, search field, segmented control, rating, fieldset · list, accordion, disclosure, table (sortable/selectable/sticky — Carbon-grade), data grid, stat tile, timeline, tree, carousel, avatar group · pagination, command palette (⌘K), wizard nav, drawer nav, menu bar · alert/banner, status dot, loading overlay, meter.

**P2 — Advanced:** split button, menu button, FAB, floating toolbar · kanban, calendar, color picker, code block (+copy), diff viewer, media gallery, charts · theme switcher, density switcher, locale/RTL switcher, sound/haptic toggle.

## AI components (the differentiator — P0 for AI surfaces)
message turn (tonality + alignment, not bubbles) · streaming text (calm cadence, SR-safe, completes with "the reveal") · prompt input (multiline, attachments, send/stop, slash-commands) · suggestion chips · agent status indicator (idle/thinking/acting/waiting-on-you/done/error — motion = state, never a generic spinner; thinking = slow breathing pulse) · reasoning/thinking trace (collapsible, mono, dimmed) · tool-call card · citation/source card · confidence/uncertainty indicator (textual, muted) · human-in-the-loop approval card (action + rationale + approve/modify/reject; haptic-agent-checkpoint) · feedback control (thumbs/correction) · generation states (empty → generating skeleton → revealed → editable; the machine→actionable shift must be unambiguous).

## Data-viz
Chart palette from accent + extended desaturated set (never the bright-12 default). Sequential = accent tonal ramp; categorical = ≤6 desaturated hues + shape/texture for color-blind safety; label directly over legend; respect dark/light.

## Multimodal (each interactive component declares per modality)
- Touch: target ≥44×44pt; primary actions in thumb reach.
- Cursor: hover affordances (productive motion); precise targets ok.
- Keyboard: full operability, visible focus, logical order, shortcuts.
- Voice: every action has a speakable label; can announce state.
- Spatial (visionOS): depth-aware; gaze = intent/hover-equiv, gesture = commit; honor comfort (no large required movements); near = active, far = ambient.
**Continuity:** modality is fluid — a task begun in one resumes in another without losing state; adapt density + affordance to active modality automatically.

## Iconography
Single 1.75px stroke, geometric-humanist, 24px grid, 2px padding/20px live area; rounded joins (echoes radius-2). Sizes 16/20/24/32 (redraw at 16, don't scale). `currentColor`; default on-surface-muted, active accent-text. No multicolor except status (paired with text). State changes use t2; avoid spinners — prefer the agent status indicator. Required AI/agent icons: thinking, acting, waiting-on-you, done, error, tool-call, source/citation, regenerate, feedback up/down, stop.
