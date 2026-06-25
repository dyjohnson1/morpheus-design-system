---
inclusion: always
---

# Morpheus — Core (identity, principles, governance)

## Lineage (what we borrow and why)
One voice governs: Apple-style restraint and deference. That single authority makes this a system, not a parts bin.

| Layer | Source | Borrowed |
|---|---|---|
| Taste / ceiling | Apple HIG (+ visionOS) | deference, materials & depth, restraint-first motion, type precision, space, spatial principles |
| Token bones | Microsoft Fluent 2 | three-tier token architecture; multi-platform parity |
| Adaptive color | Material 3 (Material You) | tonal-palette → semantic-role engine |
| Motion grammar | IBM Carbon | productive vs. expressive duality; non-linear duration |
| AI patterns | IBM Carbon for AI | LLM chat, agentic status, human-in-the-loop |
| Doc craft | Adobe Spectrum | when-to / when-not-to rationale; touch-vs-cursor scaling |

## Five principles (priority order)
1. Deference 2. Light as structure 3. Restraint by default 4. Adaptiveness without playfulness 5. Precision over volume. Conflicts resolve upward; Deference always wins (the veto hierarchy).

## Governance
- **Token-first.** No raw hex/px/ms in components. Prefix `morph-`.
- **Tiers:** global → alias → component. Components reference alias only.
- **Naming:** `category-role-variant-state`, kebab-case, semantic not literal.
- **A11y floor:** WCAG 2.2 AA (AAA target on body). A gate, not polish (`#morpheus-accessibility`).
- **Reduced-motion / reduced-transparency first-class** — every motion/material token ships a fallback.
- **Definition of done:** alias tokens only · all states · motion register + reduced-motion fallback · modality behaviors · passes AA · when-to/when-not-to rationale.

## Signature
North star: cool blue-black ground, warm cream highs, one muted-plum signature reading as a light source. The recognizable motion fingerprint is "the reveal" — a brief cream specular sweep as if a light source crosses a focal element on an earned moment (see `#morpheus-foundations`, Motion).
