---
system: Morpheus Design System
version: 0.2
purpose: Master steering document for agentic build (Kiro)
token-prefix: morph-
inclusion: always
---

# Morpheus — Design System Steering Document

> **Morpheus** — Greek god of dreams and *forms* (root *morph-*, "to shape"); and the mentor of *The Matrix*, the one who shows you what's real. A design system is a shaper of form and a revealer of truth. The name is the thesis: **light reveals form.** Chrome recedes, content leads, depth comes from light and material — not borders. Aesthetic lineage: afro-gothic modernism by way of Vermeer's chiaroscuro and the Maxwell *Fortunate* palette — cool shadow, warm light, a plum signature between them.

---

## 0. How to use this document (Kiro)

Master file. For production, split into `.kiro/steering/`:

| File | Contents | Inclusion |
|---|---|---|
| `morpheus-identity.md` | §1 Identity, §2 Personality | `always` |
| `morpheus-governance.md` | §3 Governance, §4 Tokens overview | `always` |
| `morpheus-color.md` | §5 Color | `always` |
| `morpheus-type.md` | §6 Typography | `always` |
| `morpheus-layout.md` | §7 Grid/breakpoints, §8 Spacing/radius/elevation, §11 Density | `always` |
| `morpheus-motion.md` | §9 Motion | `always` |
| `morpheus-material.md` | §10 Material & depth | `always` |
| `morpheus-icon.md` | §12 Iconography | conditional |
| `morpheus-sound-haptic.md` | §13 Sound, §14 Haptics | conditional |
| `morpheus-a11y.md` | §15 Accessibility | `always` |
| `morpheus-components.md` | §16 Components | conditional (`*.tsx,*.jsx,*.swift`) |
| `morpheus-patterns.md` | §17 Patterns | conditional |
| `morpheus-multimodal.md` | §18 Multimodal | conditional |
| `morpheus-voice.md` | §19 Writing & voice | conditional (content) |

Everything below is the contract. **When a rule here conflicts with a borrowed source system's default, this document wins.**

---

## 1. Identity & philosophy (the anti-Frankenstein layer)

Morpheus is assembled from the strongest layer of six mature systems, but **one voice governs: Apple-style restraint and deference.** That single authority is what makes it a system, not a parts bin.

**Source lineage — what we take and why:**

| Layer | Source | Borrowed |
|---|---|---|
| Taste / ceiling | Apple HIG (+ visionOS) | Deference, materials & depth, restraint-first motion, type precision, generous space, spatial principles |
| Token bones | Microsoft Fluent 2 | Three-tier token architecture; multi-platform parity |
| Adaptive color | Material 3 (Material You) | Tonal-palette → semantic-role engine from a seed |
| Motion grammar | IBM Carbon | Productive vs. expressive duality; non-linear duration |
| AI patterns | IBM Carbon for AI | LLM chat, agentic status, human-in-the-loop |
| Doc craft | Adobe Spectrum | When-to / when-not-to rationale; touch-vs-cursor scaling; writing discipline |

**Five governing principles (priority order — higher overrules lower):**

1. **Deference.** Content over chrome. Overrules everything, including expressiveness and personality.
2. **Light as structure.** Hierarchy and depth via luminance, material, shadow — not borders, dividers, boxes. Chiaroscuro, not wireframe.
3. **Restraint by default, expression by exception.** Motion, saturation, ornament sit at their quietest unless a moment earns escalation.
4. **Adaptiveness without playfulness.** The interface adapts (color, density, modality, motion-reduction) but never performs.
5. **Precision over volume.** Fewer, sharper elements. Type and space do decoration's job.

**North star:** cool blue-black ground (the *Fortunate* video), warm cream luminous highs (the album cover), one muted-plum signature reading as a light source. One light source revealing a quiet scene — the Vermeer move.

---

## 2. Personality & brand character

Morpheus has a voice: **a warmly scientific mentor with a soft-Southern, African-American cadence and a dry, light wit.** Think the calm certainty of the Matrix Morpheus crossed with a brilliant Southern professor who explains the *why*, never talks down, and lands the occasional quiet joke. Precise, unhurried, generous.

**Personality has a *where* (this is the discipline that keeps warmth from fighting Deference):**

| Personality ON (warm, characterful) | Personality QUIET (precise, plain) |
|---|---|
| Onboarding, first-run | Blocking errors |
| Empty states | Destructive / irreversible confirms |
| Success & completion moments | Dense data, tables, forms mid-task |
| Tooltips, helper text | Security / legal / financial surfaces |
| The agent's conversational voice | Anything time-critical |

**Voice traits:** calm · certain · warm · precise · dryly funny (rarely) · never hype, never goofy, never an exclamation point. Full rules and tone matrix in §19.

---

## 3. Governance & global rules

- **Token-first.** No raw hex/px/ms in components — everything references a token. Prefix all tokens `morph-`.
- **Three token tiers (Fluent):** **global** (primitives: `morph-palette-neutral-900`, `morph-time-220`) → **alias** (intent: `morph-color-surface`, `morph-motion-duration-standard`) → **component** (`morph-button-bg-rest`). Components reference **alias only**; alias references global; never skip a tier.
- **Naming:** `category-role-variant-state`, kebab-case, semantic not literal (`color-accent`, never `color-purple`).
- **Accessibility floor:** WCAG 2.2 AA minimum; AAA target on body text. Full spec §15. A11y is a gate, not a polish pass.
- **Reduced-motion / reduced-transparency are first-class** — every motion & material token ships a fallback. Never gate function on animation or blur.
- **The veto hierarchy:** conflicts resolve upward through §1's five principles. Deference always wins.
- **Definition of done (every element):** references only alias tokens · all states declared · motion register + reduced-motion fallback · modality behaviors (§18) · passes AA · has when-to/when-not-to rationale.

---

## 4. Token system overview

Categories, each defined in its section: **color (§5) · type (§6) · grid (§7) · space/radius/elevation (§8) · motion (§9) · material (§10) · density (§11) · icon (§12) · sound (§13) · haptic (§14).** All three tiers (global/alias/component) apply to every category.

---

## 5. Color — "Fortunate"

Engine: Material You tonal generation from seeds, **output constrained to the Maxwell palette.** Mode: **dark-first**; light mode (cream) is the adaptive counterpart. All values below are WCAG-verified for their intended use.

**Temperature logic:** the neutral ramp drifts *cool→warm* as it lightens — cool blue-black shadow (video) resolving to warm cream light (album cover). Warmth lives in the high tones and the accent, not the shadows.

### 5.1 Global — Neutral ramp (cool→warm drift)

| Token | Hex | Role hint |
|---|---|---|
| `neutral-1000` | `#0C1119` | deepest ground |
| `neutral-950` | `#111A26` | |
| `neutral-900` | `#16212F` | default surface |
| `neutral-850` | `#1C2A3A` | |
| `neutral-800` | `#243446` | raised surface |
| `neutral-700` | `#36495E` | |
| `neutral-600` | `#516577` | borders (subtle) |
| `neutral-500` | `#6F8392` | disabled / mid |
| `neutral-400` | `#94A1AB` | muted text on dark (7.16:1) |
| `neutral-300` | `#B9BDB4` | (drift to neutral) |
| `neutral-200` | `#D7D2C1` | (warming) |
| `neutral-150` | `#E4DDC9` | |
| `neutral-100` | `#ECE6D4` | cream — light-mode bg / album tan |
| `neutral-50`  | `#F4EFE0` | primary text on dark (16.5:1) |
| `neutral-0`   | `#FAF7EE` | lightest cream / pure light |

### 5.2 Global — Accent ramp (muted plum signature)

| Token | Hex | Use |
|---|---|---|
| `accent-900` | `#271A37` | deep aubergine bg |
| `accent-800` | `#3A2850` | |
| `accent-700` | `#50386B` | accent text on cream (7.94:1) |
| `accent-600` | `#684E87` | accent text on cream (5.56:1) |
| `accent-500` | `#8463A8` | **signature** — fills, primary action |
| `accent-400` | `#9E81BE` | accent text/icon on dark (5.71:1); focus ring |
| `accent-300` | `#BAA2D3` | accent text on dark, emphasis (8.29:1) |
| `accent-200` | `#D3C4E4` | |
| `accent-100` | `#E9E0F2` | text on accent-700 fill (7.74:1) |

### 5.3 Status (desaturated; pulled from the video's warm accent lights)

Base for fills/large; **on-dark text-safe variant** in parens (≥4.5:1):

- `danger` `#C0584A` (text-on-dark `#D06B5C` · 5.35:1)
- `warning` `#C7913F` (text-on-dark `#D5A24F` · 8.21:1)
- `success` `#5F9070` (text-on-dark `#74A585` · 6.72:1)
- `info` `#5E81A8` (text-on-dark `#7596BC` · 6.17:1)

### 5.4 Alias — semantic roles (dark-first)

| Alias | Dark binding | Light binding |
|---|---|---|
| `color-ground` | neutral-1000 | neutral-50 |
| `color-surface` | neutral-900 | neutral-0 |
| `color-surface-raised` | neutral-800 | neutral-100 |
| `color-surface-overlay` | neutral-850 + material | neutral-0 + material |
| `color-on-surface` | neutral-50 | neutral-1000 |
| `color-on-surface-muted` | neutral-400 | neutral-600 |
| `color-border-subtle` | neutral-700 | neutral-200 |
| `color-accent` | accent-500 | accent-600 |
| `color-accent-text` | accent-300 | accent-700 |
| `color-on-accent` | neutral-0 | neutral-0 |
| `color-focus` | accent-400 | accent-600 |

**Rules:** **one accent.** Plum is a *light source*, not a fill color — used sparingly for the single most important action or moment per view. Saturation earns its place; default neutral. Status colors only on status. In light mode keep accent at -600/-700 for contrast on cream.

---

## 6. Typography

Type carries hierarchy that borders/color carry elsewhere. Optical precision is the craft signal.

**Typefaces (SF unavailable off-Apple):**
- **UI / body:** **Inter** (variable) default; upgrade path **Söhne** or **ABC Diatype** for a more characterful neo-grotesque.
- **Expressive display** (the exception tier — afro-gothic editorial, one per view max): high-contrast display serif — **Canela**, **Reckless**, or **GT Sectra**. This is the Vermeer-light register.
- **Mono** (code, data, agent reasoning traces): **Berkeley Mono** or **JetBrains Mono**.

**Scale** (role · size/line-height px · weight · tracking):

| Role | Size/LH | Wt | Tracking |
|---|---|---|---|
| `display` | 48/52 | 600 | -0.02em |
| `headline` | 32/38 | 600 | -0.015em |
| `title` | 24/30 | 600 | -0.01em |
| `subtitle` | 18/26 | 500 | -0.005em |
| `body` | 16/26 | 400 | 0 |
| `body-sm` | 14/22 | 400 | 0 |
| `label` | 13/16 | 500 | 0.01em |
| `caption` | 12/16 | 400 | 0.02em |

**Rules:** tracking tightens as size grows (optical). Body leading 1.6×. **Sentence case everywhere** (buttons, titles included) — never Title Case, never all-caps except micro `label`/`caption`. Mobile scales body +~6%; display scales *down* on small screens. Support Dynamic Type / browser resize to 200% with reflow (§15).

---

## 7. Layout, grid & breakpoints

**Grid:** 12-column fluid. Gutters and margins are spacing tokens, not fixed px.

| Breakpoint | Range | Columns | Margin | Gutter |
|---|---|---|---|---|
| `xs` | 0–479 | 4 | space-4 (16) | space-3 (12) |
| `sm` | 480–767 | 8 | space-5 (24) | space-4 (16) |
| `md` | 768–1023 | 12 | space-5 (24) | space-4 (16) |
| `lg` | 1024–1439 | 12 | space-6 (32) | space-5 (24) |
| `xl` | 1440–1919 | 12 | space-7 (48) | space-5 (24) |
| `2xl` | 1920+ | 12 | centered, max-content 1440 | space-5 (24) |

**Rules:** content max-width caps at `2xl` (don't let lines run forever — Deference). Layouts are container-query-aware where supported, not just viewport. Define spatial (visionOS) layout separately in §18 — depth replaces some columnar logic.

---

## 8. Spacing, radius, elevation

**Spacing** (4pt base, non-linear top): `space-0:0 · 1:4 · 2:8 · 3:12 · 4:16 · 5:24 · 6:32 · 7:48 · 8:64 · 9:96 · 10:128` (px).

**Radius:** `radius-0:0 · 1:6 · 2:10 · 3:16 · 4:24 · full:9999`. Default `radius-2`. Soft, never cartoonish.

**Elevation** (luminance + shadow + material — see §10): `elev-0` ground · `elev-1` raised card · `elev-2` sticky/nav · `elev-3` popover/menu · `elev-4` modal/overlay. Each step = one tonal step lighter + one shadow step (+ material at -3/-4).

---

## 9. Motion

Grammar from Carbon, recalibrated to Apple restraint. Two registers:
- **Productive** — default, ~95% of motion. Fast, near-invisible; confirms and orients.
- **Expressive** — exception. Earned moments only (generation completing, destructive confirm, first-run, state resolving). Material 3 Expressive is the *ceiling you rarely touch.*

### 9.1 Timing scale (`t1`–`t5`, treat like a type scale)

| Token | ms | Use |
|---|---|---|
| `t1` | 80 | micro feedback (press, toggle) |
| `t2` | 140 | hover, focus, small state |
| `t3` | 220 | standard transition (dropdown, popover) — **default** |
| `t4` | 320 | surface change (sheet, modal, route) |
| `t5` | 480 | expressive only (reveal, resolve) |

Duration is **dynamic to distance/size** — larger travel ≈ top of band. Never linear.

### 9.2 Easing
- **Interactive/gesture → spring.** Default `response 0.4, damping 0.86`; snappy press `response 0.28, damping 0.9`.
- **Non-interactive state → bezier:** `ease-standard cubic-bezier(0.2,0,0.38,0.9)` · `ease-entrance cubic-bezier(0,0,0.38,0.9)` · `ease-exit cubic-bezier(0.2,0,1,0.9)`. Side-panel-that-returns uses `ease-standard`, not exit.

### 9.3 Choreography
Stagger related entrances by `t1` per item, max 5 then batch. Never animate >2 properties on one element at once (avoid "performing").

### 9.4 Never animates
Body text content, data mid-read, focus rings (instant), error appearance (immediate).

### 9.5 Signature motion — "the reveal"
On an earned moment, the focal element gains luminance/material as if a light source crosses it: brief cream specular sweep + scale-from-0.96, `t5`, spring. This is Morpheus's recognizable fingerprint (the chiaroscuro reveal). Deliberate and rare.

### 9.6 Reduced motion
`prefers-reduced-motion` → translate/scale become opacity crossfade at `t2`; springs become `ease-standard`; the reveal becomes a plain fade. Function never gated on motion.

---

## 10. Material & depth + cross-surface fallback ladder

Depth = light + material, not borders (Apple/Fluent "light, depth, material"). Every material surface declares all three tiers; renderer picks the highest it supports.

| Tier | Condition | Treatment |
|---|---|---|
| **0 — True material** | Apple platforms; web `backdrop-filter`; capable GPU | translucency + backdrop blur + tonal tint + subtle specular edge |
| **1 — Simulated** | no backdrop-filter; mid device | semi-opaque tonal fill (no blur) + soft drop shadow + 1px inner light edge |
| **2 — Solid** | low-end / reduced-transparency / print | solid raised tonal surface + elevation shadow only |

Decide tier **at the token level** per surface. Respect `prefers-reduced-transparency` → force Tier 2.

---

## 11. Density modes

Two modes, switchable via a root token; components consume density-aware spacing/sizing.

| Token | `comfortable` (default) | `compact` (data-dense) |
|---|---|---|
| `density-control-height` | 44px | 32px |
| `density-row-height` | 56px | 36px |
| `density-padding-x` | space-4 | space-3 |
| `density-padding-y` | space-3 | space-2 |
| `density-font-base` | body (16) | body-sm (14) |

**Rule:** `compact` never drops touch targets below 44px on touch modality (override to comfortable on touch). Use `compact` for tables, dashboards, agent logs; `comfortable` everywhere else.

---

## 12. Iconography

- **Style:** single-weight line icons, geometric-humanist, 1.75px stroke on a 24px grid; rounded joins/caps (echoes `radius-2`). Optional filled variants for selected/active states only.
- **Grid & keyline:** 24×24 with 2px padding; 20px live area. Provide 16 / 20 / 24 / 32 sizes; redraw (not scale) at 16.
- **Color:** inherit `currentColor`; default `color-on-surface-muted`, active `color-accent-text`. Never multicolor except status icons (paired with text — §15).
- **Motion:** icon state changes use `t2`; avoid spinning loaders — prefer the agent status indicator (§17).
- **AI/agent icon set (required):** thinking, acting, waiting-on-you, done, error, tool-call, source/citation, regenerate, feedback up/down, stop.

---

## 13. Sound tokens (sonic identity — a rare differentiator)

Restrained, warm, low-register — the audio equivalent of the plum-on-blue palette. Soft, rounded synths; no bright digital "blips." All sound is **optional, off by default, user-toggleable**, and always has a non-audio equivalent (§15).

| Token | Use | Character |
|---|---|---|
| `sound-tap` | confirm primary action | short, soft, low |
| `sound-toggle` | state on/off | two-note, subtle |
| `sound-notify` | passive notification | warm single tone |
| `sound-success` | completion / reveal | gentle rising two-note |
| `sound-error` | blocking error | low, soft, non-alarming |
| `sound-agent-start` | agent begins acting | near-subliminal swell |
| `sound-agent-done` | agent completes | the `success` motif, softer |

**Rules:** max ~400ms each; normalized loudness; respect OS silent/Do-Not-Disturb; never required to understand state.

---

## 14. Haptic tokens

Map to platform haptic engines (iOS UIFeedbackGenerator / Android VibrationEffect / web Vibration where available). Subtle, informative, never buzzy.

| Token | Use | Pattern |
|---|---|---|
| `haptic-light` | selection, hover-equiv on touch | light tap |
| `haptic-medium` | confirm primary action | medium tap |
| `haptic-success` | completion | light–light double |
| `haptic-warning` | warning | medium–light |
| `haptic-error` | blocking error | sharp single (not a long buzz) |
| `haptic-agent-checkpoint` | human-in-the-loop prompt | gentle medium to draw attention |

**Rules:** never the sole signal; pair with visual. Honor OS haptic settings. No sustained vibration.

---

## 15. Accessibility (full — including AI-specific)

A11y is a gate. Floor WCAG 2.2 AA; body text targets AAA.

### 15.1 Color & contrast
- Verified pairings in §5 (text ≥4.5:1, large/non-text ≥3:1). Focus ring `color-focus` ≥3:1 vs adjacent.
- **Never color alone.** Status = icon + text + color. (The low-chroma warm neutrals make contrast tighter — this matters more here.)
- Support forced-colors / high-contrast mode; honor `prefers-contrast`.

### 15.2 Keyboard & focus
- Full keyboard operability; logical order; visible focus always.
- **WCAG 2.2:** focus-not-obscured (sticky headers must not hide focused element); target size ≥24px (we use 44 comfortable / 32 compact + spacing); dragging has a non-drag alternative.
- Documented shortcuts; no keyboard traps; skip-to-content.

### 15.3 Text & reflow
- Resize to 200% and reflow to 320px CSS width without loss; no horizontal scroll for text.
- Respect Dynamic Type; no fixed-height text containers that clip.

### 15.4 Motion, sound, haptic
- `prefers-reduced-motion` (§9.6), `prefers-reduced-transparency` (§10) honored.
- Sound (§13) and haptic (§14) are never the sole channel; each has a visual equivalent. Audio off by default.

### 15.5 AI-specific accessibility (where most systems fail)
- **Streaming text → screen readers:** never announce token-by-token. Use `aria-live="polite"` and announce in **sentence/chunk boundaries or on completion**, not per token. Provide a "jump to response end" affordance.
- **Agent status as a managed live region:** announce meaningful state changes (`thinking → done`, `waiting-on-you`) once each — debounce; never spam SR with intermediate frames.
- **Reasoning/thinking traces:** collapsible, `aria-expanded`, not auto-read.
- **Human-in-the-loop checkpoints:** must be reachable and operable by keyboard and SR; the rationale text is part of the accessible name/description.
- **Confidence/uncertainty:** conveyed in text, not color or styling alone.
- **Tool-call & citation cards:** semantic structure (not div soup); sources are real links with discernible names.

### 15.6 Cognitive
- Undo for destructive actions; error prevention on irreversible steps; consistent patterns; plain language (§19); no time limits without extension.

### 15.7 Testing protocol
- Automated (axe) on every component **plus** manual passes: keyboard-only, VoiceOver + NVDA, 200% zoom, reduced-motion, forced-colors. AA is the floor, not the test target.

---

## 16. Components (full inventory, tiered P0→P2)

Every spec declares: anatomy · states (rest/hover/focus/active/selected/disabled/loading/error) · alias token bindings · motion register + timing · density behavior · modality behaviors (§18) · a11y notes · when-to / when-not-to. Default motion: productive, `t3`, unless escalated.

### P0 — Foundations (build first)
**Actions:** button (primary/secondary/ghost/destructive) · icon button · button group · link.
**Forms:** text input · textarea · select · checkbox · radio · toggle/switch · field label + helper + error.
**Display:** surface/card · divider · avatar · badge · tag/chip · tooltip · skeleton.
**Feedback:** inline message · toast/notification · progress (linear/circular) · empty state.
**Nav:** top bar / app bar · side nav · tabs · breadcrumb.
**Overlay:** modal/dialog · sheet (bottom/side) · popover · menu/dropdown.

### P1 — Expansion
**Forms:** combobox/autocomplete · multiselect · token/tag input · slider · stepper/number · date picker · time picker · file upload · search field · segmented control · rating · form layout/fieldset.
**Display:** list (+ item) · accordion · disclosure · table (sortable, selectable, sticky header — Carbon-grade) · data grid · stat/metric tile · timeline · tree · carousel · avatar group.
**Nav:** pagination · command palette (⌘K) · wizard/stepper-nav · drawer nav · sub-nav/menu bar.
**Feedback:** alert/banner · status dot · loading overlay · meter/gauge.

### P2 — Advanced & domain
**Actions:** split button · menu button · FAB · floating toolbar.
**Display:** kanban/board · calendar · color picker · code block (+ copy) · diff viewer · file/media gallery · charts (see data-viz §16.1).
**System:** theme switcher (dark/light) · density switcher · locale/RTL switcher · sound/haptic toggle.

### 16.1 AI components (the differentiator — full depth, treat as P0 for AI surfaces)
- **Message turn** (user / agent; surface-tonality + alignment, not bubbles)
- **Streaming text** (calm cadence, SR-safe §15.5, completes with the reveal §9.5)
- **Prompt input** (multiline, attachments, send/stop, slash-commands)
- **Suggestion chips** (prompt starters)
- **Agent status indicator** (`idle/thinking/acting/waiting-on-you/done/error`; motion = state, never a generic spinner)
- **Reasoning / thinking trace** (collapsible, mono, dimmed)
- **Tool-call card** (what tool, inputs, result, status)
- **Citation / source card** (title, source, link; real semantics)
- **Confidence / uncertainty indicator** (textual; muted, no alarm color)
- **Human-in-the-loop approval card** (action + rationale + approve/modify/reject; haptic-agent-checkpoint)
- **Feedback control** (thumbs / correction)
- **Generation states** (empty → generating skeleton → revealed → editable)

### 16.2 Data-viz guidelines
Chart palette derives from accent + extended desaturated set (never the 12-bright-colors default). Sequential = accent tonal ramp; categorical = max 6 desaturated hues + texture/shape for color-blind safety; always label directly over legend where possible; respect dark/light surfaces.

---

## 17. Patterns (incl. AI / agentic — the "feels AI" layer)

Carbon for AI is the backbone here.
- **LLM chat surface** — streaming reveal on completion; turns differ by tonality + alignment, not bubbles.
- **Agent status** — persistent, legible states; thinking = slow breathing pulse; idle = stillness. Never just "busy."
- **Human-in-the-loop checkpoint** — calm confirm showing *what* and *why*; destructive/irreversible always checkpoints. The trust layer.
- **Confidence/uncertainty** — say it plainly (muted text, no alarm).
- **Generation lifecycle** — empty → generating → revealed (reveal motion) → editable; the "machine made this → you can act on it" shift must be unambiguous.
- **Multimodal handoff** — a voice-initiated query can resolve to a visual/tappable result; the switch feels continuous, not a reset.
- **Common app patterns** — forms & validation, empty/loading/error triad, onboarding, search & filter, settings, notifications, undo.

---

## 18. Multimodal

Modalities: touch · cursor · keyboard · voice · gaze + gesture (spatial). Apple/visionOS sets the philosophy; each interactive component declares per-modality behavior:
- **Touch:** target ≥44×44pt; primary actions in thumb reach.
- **Cursor:** hover affordances (productive motion); precise targets allowed.
- **Keyboard:** full operability, visible focus, logical order, shortcuts.
- **Voice:** every action has a speakable label; component can announce state.
- **Spatial:** depth-aware; gaze = intent/hover-equiv, gesture = commit; honor comfort (no large required movements); near = active, far = ambient.

**Continuity principle:** modality is fluid — a task begun in one modality resumes in another without losing state. The interface adapts density (§11) and affordance to the active modality automatically.

---

## 19. Writing & voice

**Voice north star (from §2):** the warmly-scientific mentor — calm, certain, warm, precise, dryly funny, soft-Southern cadence. Speaks like Morpheus crossed with a brilliant Southern professor.

**Rules (Spectrum discipline + Apple plainness):**
- Sentence case. Active voice. Plain language over jargon.
- No exclamation points. No hype ("magic," "effortless," "amazing"). No filler. No emoji in product UI.
- Lead with the outcome/action, then detail. Say it once, sharply (precision over volume).
- Buttons are verbs (`Save`, `Generate`, `Discard`).
- Errors: what happened, why, next step — calm, no blame.
- AI/agent copy: state capability and limits honestly; surface uncertainty plainly; don't anthropomorphize beyond clarity.

**Tone matrix (the warmth has a where — §2):**

| Surface | Register | Example |
|---|---|---|
| Empty state | Warm | "Nothing here yet. That's alright — let's make something." |
| Success | Warm, brief | "There we go." |
| Onboarding | Warm, guiding | "Let's get you set up. Won't take but a minute." |
| Tooltip | Warm, light | "Quick one: this controls who can see your work." |
| Generating | Warm, calm | "Working on it — give me a few seconds." |
| Recoverable error | Neutral-warm | "Hm — couldn't reach the server. Give it a second and try again." |
| Blocking error | Plain | "Upload failed: file exceeds 25 MB. Choose a smaller file." |
| Destructive confirm | Plain, precise | "Delete this project? This can't be undone." |
| Dense data / table | Plain | (labels only, no voice) |

**Anti-patterns:** ❌ "Oops! Something went wrong 😅" ❌ "Hang tight, the magic is happening!" ❌ "Awesome job!!!"

---

## 20. Reference links

- Apple HIG — https://developer.apple.com/design/human-interface-guidelines/
- Apple visionOS / spatial — https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos
- Material 3 — https://m3.material.io/
- Material 3 Motion — https://m3.material.io/styles/motion/overview
- IBM Carbon Motion — https://carbondesignsystem.com/elements/motion/overview/
- IBM Carbon for AI — https://carbondesignsystem.com/guidelines/carbon-for-ai/
- Microsoft Fluent 2 — https://fluent2.microsoft.design/
- Adobe Spectrum — https://spectrum.adobe.com/
- WCAG 2.2 — https://www.w3.org/TR/WCAG22/
- prefers-reduced-motion — https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

---

## 21. Build sequence (for Kiro)

1. **Tokens first** — global → alias → component for color (§5), type (§6), grid/space/elevation (§7–8), motion (§9), material (§10), density (§11). Nothing visual until tokens exist.
2. Material fallback ladder (§10) + reduced-motion/transparency fallbacks as token-resolved primitives.
3. Iconography (§12); sound/haptic tokens (§13–14) wired but off by default.
4. P0 components (§16), each meeting the §3 definition-of-done.
5. AI components (§16.1) + patterns (§17).
6. P1, then P2 components.
7. Multimodal behaviors (§18) per component.
8. Voice rules + tone matrix (§19) applied to all system copy.
9. Validate every surface against the veto hierarchy (§1) and the full a11y protocol (§15.7) before ship.
