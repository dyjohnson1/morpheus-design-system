---
inclusion: always
---

# Morpheus — Foundations (color, type, layout, motion, material, density)

All values are token source-of-truth. Concrete primitives live in `/tokens/*.json`; this file is the rationale + the contract.

## COLOR — "Fortunate" (dark-first; all WCAG-verified)
Neutral ramp drifts cool→warm as it lightens (blue-black shadow → cream light). Warmth lives in high tones + accent, not shadows.

**Neutral:** `1000 #0C1119` · `950 #111A26` · `900 #16212F` · `850 #1C2A3A` · `800 #243446` · `700 #36495E` · `600 #516577` · `500 #6F8392` · `400 #94A1AB` · `300 #B9BDB4` · `200 #D7D2C1` · `150 #E4DDC9` · `100 #ECE6D4` · `50 #F4EFE0` · `0 #FAF7EE`

**Accent (muted plum signature):** `900 #271A37` · `800 #3A2850` · `700 #50386B` · `600 #684E87` · `500 #8463A8` (signature/fills) · `400 #9E81BE` (text/icon on dark; focus) · `300 #BAA2D3` (emphasis on dark) · `200 #D3C4E4` · `100 #E9E0F2`

**Status** (base; on-dark text-safe variant ≥4.5:1 in parens): danger `#C0584A` (`#D06B5C`) · warning `#C7913F` (`#D5A24F`) · success `#5F9070` (`#74A585`) · info `#5E81A8` (`#7596BC`).

**Alias roles** (dark | light): ground `n1000|n50` · surface `n900|n0` · surface-raised `n800|n100` · surface-overlay `n850+material|n0+material` · on-surface `n50|n1000` · on-surface-muted `n400|n600` · border-subtle `n700|n200` · accent `a500|a600` · accent-text `a300|a700` · on-accent `n0|n0` · focus `a400|a600`.

**Rules:** ONE accent — plum is a light source, not a fill; used sparingly for the single most important action/moment per view. Status only on status. Never color alone (pair icon + text). Default neutral.

## TYPOGRAPHY
Type carries hierarchy. Faces: UI/body **Inter** (→ Söhne/Diatype); expressive display **Canela/Reckless/GT Sectra** (one per view max); mono **Berkeley Mono/JetBrains Mono**.

Scale (role · px size/lh · weight · tracking): display 48/52 600 -0.02 · headline 32/38 600 -0.015 · title 24/30 600 -0.01 · subtitle 18/26 500 -0.005 · body 16/26 400 0 · body-sm 14/22 400 0 · label 13/16 500 0.01 · caption 12/16 400 0.02.

Rules: tracking tightens as size grows; body leading 1.6×; sentence case everywhere (incl. buttons/titles); mobile body +6%, display scales down; support resize to 200% + reflow.

## LAYOUT — grid & breakpoints
12-col fluid; gutters/margins are tokens. xs 0–479 (4col, m16/g12) · sm 480–767 (8col, m24/g16) · md 768–1023 (12col, m24/g16) · lg 1024–1439 (12col, m32/g24) · xl 1440–1919 (12col, m48/g24) · 2xl 1920+ (centered, max 1440). Container-query-aware where supported.

## SPACE / RADIUS / ELEVATION
Space (4pt, non-linear top): 0,4,8,12,16,24,32,48,64,96,128. Radius: 0,6,10,16,24,full; default 10. Elevation: elev-0 ground → elev-4 overlay; each step = +1 tonal step + shadow (+material at 3/4).

## MOTION (Carbon grammar, Apple restraint)
Registers: **productive** (default ~95%, fast, confirms/orients) · **expressive** (exception; earned moments only). Material 3 Expressive is the ceiling you rarely touch.

Timing scale (treat like type): t1 80ms (micro) · t2 140 (hover/focus) · t3 220 (standard — default) · t4 320 (surface change) · t5 480 (expressive only). Duration dynamic to distance/size; never linear.

Easing: interactive/gesture → **spring** (default response 0.4 / damping 0.86; snappy press 0.28/0.9). Non-interactive → bezier: standard `cubic-bezier(0.2,0,0.38,0.9)`, entrance `cubic-bezier(0,0,0.38,0.9)`, exit `cubic-bezier(0.2,0,1,0.9)`.

Choreography: stagger entrances by t1/item, max 5 then batch; never animate >2 properties on one element. Never animate: body text, data mid-read, focus rings (instant), error appearance (immediate).

**Signature — "the reveal":** earned moment → focal element gains luminance/material as a light source crosses it (cream specular sweep + scale-from-0.96, t5, spring). Deliberate, rare.

Reduced motion: translate/scale → opacity crossfade at t2; springs → standard ease; reveal → plain fade. Never gate function on motion.

## MATERIAL & DEPTH + fallback ladder
Depth = light + material, not borders. Every material surface declares 3 tiers; renderer picks the highest supported:
- **Tier 0 True:** Apple / `backdrop-filter` / capable GPU → translucency + backdrop blur + tonal tint + specular edge.
- **Tier 1 Simulated:** no backdrop-filter → semi-opaque tonal fill + soft shadow + 1px inner light edge.
- **Tier 2 Solid:** low-end / reduced-transparency / print → solid raised tonal surface + elevation shadow only.
Decide tier at the token level. `prefers-reduced-transparency` → force Tier 2.

## DENSITY
`comfortable` (default): control 44px, row 56, pad-x space-4, pad-y space-3, font body. `compact` (data-dense): control 32, row 36, pad-x space-3, pad-y space-2, font body-sm. compact never drops touch targets <44px on touch modality. Use compact for tables/dashboards/agent logs.
