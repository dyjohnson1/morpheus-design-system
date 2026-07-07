# Implementation Plan — Harmonx Landing (Brand Imprint™ Platform)

## Overview

Convert the design into incremental coding steps. The pure **Domain Core** is built and property-tested first (it holds most of the verifiable logic and is reused from the platform where possible), then the typed Gateways, then the Morpheus surfaces section by section, ending with page assembly, metadata, and accessibility test coverage. Each step builds on the previous ones and wires into the page so nothing is orphaned.

All test tasks are required (comprehensive from the start), consistent with the Morpheus rule that accessibility and correctness are a gate, not a polish pass. Each property test references a numbered correctness property from the design and the requirements it validates.

## Tasks

- [ ] 1. Scaffold the landing surface, Domain Core module, and test setup
  - Create `src/screens/landing/`, `src/patterns/harmonx/`, `src/domain/landing/`, and `src/gateways/` directories
  - Define `src/domain/landing/types.ts` interfaces (StageItem, CaseStudy, CaseStudyDetail, MediaRef, PageMeta, BrandSignal, SnapshotAnswers, LeadForm, ValidationResult, MotionPreference/Decision, MaterialTier, DeviceCapability, SnapshotState/Phase/Event); import shared `DataSubstrate`/`Encoding`/`MicroSnapshotRender` from `src/domain/types`
  - Confirm Vitest + fast-check + Testing Library + jest-axe are configured for the package
  - _Requirements: 13.1_

- [ ] 2. Build the Domain Core pure logic
  - [ ] 2.1 Implement validation, ordering, and resolution functions
    - `isValidBrandUrl`, `orderStageItems`, `orderCaseStudies`, `validateLeadForm`, `resolveMotion`, `resolveMaterialTier` as pure, dependency-free functions
    - _Requirements: 5.2, 3.2, 4.1, 9.3, 9.4, 12.1, 12.2, 12.3_
  - [ ] 2.2 Write property test for brand URL validation
    - **Property 1: Brand URL validation is correct**
    - **Validates: Requirements 5.2**
  - [ ] 2.3 Write property test for config ordering
    - **Property 5: Config ordering is a sorted permutation**
    - **Validates: Requirements 3.2, 4.1**
  - [ ] 2.4 Write property test for lead-form validation
    - **Property 7: Lead-form validation flags exactly the invalid fields**
    - **Validates: Requirements 9.3, 9.4**
  - [ ] 2.5 Write property test for motion resolution
    - **Property 8: Motion resolution honors preference**
    - **Validates: Requirements 12.1, 12.2**
  - [ ] 2.6 Write property test for material tier resolution
    - **Property 9: Material tier resolution forces solid when required**
    - **Validates: Requirements 12.3**

- [ ] 3. Implement the Proximity Snapshot Domain Core (substrate, faithfulness, reducer)
  - [ ] 3.1 Implement `projectSnapshotSubstrate` reusing the shared platform substrate model
    - Deterministic projection of BrandSignal + SnapshotAnswers to a DataSubstrate; no generative model
    - _Requirements: 6.1, 6.4_
  - [ ] 3.2 Write property test for substrate determinism
    - **Property 2: Snapshot substrate is deterministic**
    - **Validates: Requirements 6.1, 6.4**
  - [ ] 3.3 Wire `preservesDataSubstrate` for the micro output (reuse shared platform function)
    - Faithfulness check over styled MicroSnapshotRender vs substrate
    - _Requirements: 6.3, 6.7_
  - [ ] 3.4 Write property test for data-faithfulness
    - **Property 3: Styling preserves data-faithfulness**
    - **Validates: Requirements 6.3, 6.7**
  - [ ] 3.5 Implement `snapshotReducer` state machine
    - Phases intake → questions → processing → output → revealing → contact, plus error; guard invalid URL; advance one question at a time; contact reachable from any phase
    - _Requirements: 5.3, 5.4, 5.7, 7.1, 7.4, 12.5_
  - [ ] 3.6 Write property test for the snapshot reducer
    - **Property 10: Snapshot reducer advances safely and keeps contact reachable**
    - **Validates: Requirements 5.3, 5.4, 5.7, 7.1, 7.4, 12.5**

- [ ] 4. Checkpoint — Domain Core
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Define typed Gateways with mock implementations
  - Interfaces for brand ingestion (server-side URL scrape → BrandSignal), snapshot styling render (substrate → styledAssetId), lead submission, and content/config loading; in-memory mock implementations for development and tests
  - _Requirements: 5.5, 6.2, 9.1_

- [ ] 6. Build the Landing Shell
  - Header (HX mark + minimal nav), minimal footer (nav + legal, no newsletter), skip-to-content control, `data-theme="dark"` root; alias tokens only; anchor activation moves focus and scrolls; focus-not-obscured under sticky header
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_
  - [ ] 6.1 Write unit + axe tests for the shell
    - Footer has no newsletter; skip-link focus; dark theme default; nav focus/scroll
    - _Requirements: 1.2, 1.3, 1.4, 1.5_

- [ ] 7. Build the Hero (film + positioning) with motion/material resolution
  - `HeroFilm` pattern: full-screen muted looping film with pause control and poster; real-text positioning overlay with contrast scrim; reads `resolveMotion` (reduced → poster) and `resolveMaterialTier` (Tier 2 → solid overlay); poster fallback on load failure; film text alternative
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_
  - [ ] 7.1 Write unit + axe tests for the hero
    - Reduced-motion shows poster; load failure shows poster with legible positioning text; positioning is real DOM text
    - _Requirements: 2.3, 2.4, 2.6_

- [ ] 8. Build the What We Do section
  - `WhatWeDo` pattern: headline copy; config-driven expandable stage disclosures via Radix Accordion using `orderStageItems`; `aria-expanded`; keyboard operable
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [ ] 8.1 Write unit + axe tests for What We Do
    - Headline renders; expand/collapse toggles `aria-expanded`; stages render in configured order
    - _Requirements: 3.1, 3.3, 3.4_

- [ ] 9. Build The Work (case studies)
  - [ ] 9.1 Implement `TheWork` grid
    - 2×2 grid from config via `orderCaseStudies`; client brand color via scoped CSS variable (client brand, not Morpheus); breathe on hover/focus with reduced-motion instant fallback; text brand label present; empty state
    - _Requirements: 4.1, 4.2, 4.5, 4.6_
  - [ ] 9.2 Write property test for case study brand label
    - **Property 6: Case study rendering includes its text brand label**
    - **Validates: Requirements 4.5**
  - [ ] 9.3 Implement `CaseStudyDetail`
    - Sizzle + six parts (Person, World, Insight, Strategy, Creative Direction) in client brand + Data Humanism framing; no internal-only concepts
    - _Requirements: 4.3, 4.4_
  - [ ] 9.4 Write unit + axe tests for The Work
    - Card activation opens six-part detail; empty config renders empty state
    - _Requirements: 4.3, 4.6_

- [ ] 10. Build the Proximity Snapshot experience
  - [ ] 10.1 Implement `SnapshotIntake`
    - Prominent URL field with headline/subhead copy; validate via `isValidBrandUrl` before advancing; four questions one at a time (no chatbot affordances); `aria-live="polite"` progress region; drives `snapshotReducer`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.6, 5.8_
  - [ ] 10.2 Implement `MicroDataHumanism`
    - Render the data substrate + styling layer in the sandboxed `AssetRenderFrame` (no browser storage); accessible text label per encoding; presents profile + gap + opportunity as a partial taste; solid render under Material Tier 2
    - _Requirements: 6.5, 6.6, 6.7, 5.8_
  - [ ] 10.3 Write property test for micro-output encoding labels
    - **Property 4: Every micro-output encoding has an accessible text label**
    - **Validates: Requirements 6.5**
  - [ ] 10.4 Implement `MirageReveal` and Contact Surface
    - Particle dissolution → Contact Surface with reduced-motion crossfade; contact copy + calendar/email only; keyboard operable; access never gated on the animation; routes to Lead Capture
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  - [ ] 10.5 Wire `ProximitySnapshot` orchestration
    - Compose intake → output → mirage → contact against `snapshotReducer` and the ingestion + styling Gateways; error phase routes to Contact Surface
    - _Requirements: 5.5, 5.7, 6.1, 6.2, 6.3_
  - [ ] 10.6 Write unit + axe tests for the snapshot flow
    - Invalid URL blocks progression and preserves entries; ingestion failure still reaches contact; contact reachable without animation
    - _Requirements: 5.3, 5.7, 7.4_

- [ ] 11. Checkpoint — interactive centerpiece
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Build The Conversation and Lead Capture
  - [ ] 12.1 Implement `TheConversation`
    - Full-screen closing line + single "Start the conversation" action; keyboard operable; routes to Lead Capture
    - _Requirements: 8.1, 8.2, 8.3_
  - [ ] 12.2 Implement `LeadCaptureForm`
    - Email-capture form (or calendar link) validated via `validateLeadForm`; associated labels; validation surfaced to AT; confirmation and failure states; in-memory only
    - _Requirements: 9.1, 9.2, 9.4, 9.5, 9.6, 9.7, 9.8_
  - [ ] 12.3 Write unit + axe tests for Lead Capture
    - Invalid submission identifies each field and preserves entries; valid submission confirms; submission failure preserves entries
    - _Requirements: 9.4, 9.5, 9.6, 9.7_

- [ ] 13. Implement page metadata, headings, and media alternatives
  - [ ] 13.1 Render document head + structure
    - Title, meta description, canonical, Open Graph/card from `PageMeta` config; single h1 with nested outline; `lang` + scalable viewport; poster as hero initial paint
    - _Requirements: 11.1, 11.2, 11.4, 11.5_
  - [ ] 13.2 Write property test for page metadata completeness
    - **Property 11: Page metadata is complete**
    - **Validates: Requirements 11.1**
  - [ ] 13.3 Write property test for media text alternatives
    - **Property 12: Non-text content has a text alternative**
    - **Validates: Requirements 11.3**

- [ ] 14. Assemble the page and wire cross-cutting resolution
  - Compose the six sections in order in `src/screens/landing`; initialize `resolveMotion`/`resolveMaterialTier` once per session and pass results to all animated/material surfaces; route both Contact Surface and The Conversation to Lead Capture; responsive grid xs–2xl from tokens
  - _Requirements: 10.1, 10.5, 12.1, 12.3, 12.4, 12.5, 13.2, 13.6_
  - [ ] 14.1 Write axe + reflow interaction tests across the assembled page
    - jest-axe on each section; forced-colors and reduced-motion render paths; 320px/200% reflow smoke checks
    - _Requirements: 10.2, 10.3, 10.4, 12.4, 13.3, 13.4_

- [ ] 15. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All test tasks are required (comprehensive from the start).
- Each property test references a numbered property from the design and the requirements clause it validates.
- Manual accessibility passes (keyboard-only, VoiceOver/NVDA, forced-colors, zoom) are performed outside the coding tasks per the design's testing protocol; task 14.1 covers the automatable axe/reflow portion.
- Token-only, no-browser-storage, and voice/sentence-case rules are enforced by lint and review rather than dedicated tasks.
