---
inclusion: always
---

# Morpheus — Accessibility (a gate, not a polish pass)

Floor: WCAG 2.2 AA; body text targets AAA. Every element must pass before ship.

## Color & contrast
- Verified pairings in foundations (text ≥4.5:1, large/non-text ≥3:1; focus ring ≥3:1 vs adjacent).
- **Never color alone** — status = icon + text + color. (Low-chroma warm neutrals make contrast tighter; this matters more here.)
- Honor `prefers-contrast`, `forced-colors` / high-contrast mode.

## Keyboard & focus
- Full keyboard operability; logical order; visible focus always (use `color-focus`).
- WCAG 2.2: focus-not-obscured (sticky headers must not cover the focused element); target size ≥24px (we use 44 comfortable / 32 compact + spacing); dragging has a non-drag alternative.
- Documented shortcuts; no keyboard traps; skip-to-content.

## Text & reflow
- Resize to 200% and reflow to 320px CSS width with no loss / no horizontal text scroll.
- Respect Dynamic Type; no fixed-height containers that clip text.

## Motion, sound, haptic
- Honor `prefers-reduced-motion` and `prefers-reduced-transparency`.
- Sound (`#morpheus-sensory`) and haptics are never the sole channel; each has a visual equivalent; audio off by default.

## AI-specific accessibility (where most systems fail)
- **Streaming text → screen readers:** never per-token. Use `aria-live="polite"` and announce at sentence/chunk boundaries or on completion. Provide a "jump to response end" affordance.
- **Agent status = managed live region:** announce meaningful state changes once each (debounce); never spam intermediate frames.
- **Reasoning/thinking traces:** collapsible, `aria-expanded`, not auto-read.
- **Human-in-the-loop checkpoints:** keyboard + SR operable; the rationale text is part of the accessible name/description.
- **Confidence/uncertainty:** conveyed in text, not color/styling alone.
- **Tool-call & citation cards:** real semantics (not div soup); sources are real links with discernible names.

## Cognitive
Undo for destructive actions; error prevention on irreversible steps; consistent patterns; plain language (`#morpheus-voice`); no time limits without extension.

## Testing protocol
Automated (axe) on every component PLUS manual: keyboard-only, VoiceOver + NVDA, 200% zoom, reduced-motion, forced-colors. AA is the floor, not the target.
