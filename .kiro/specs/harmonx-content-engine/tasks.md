# Implementation Plan — Harmonx Content Engine

## Overview

This plan builds the Content Engine as a new "Content" section inside the Harmonx platform, in TypeScript (strict) + React 18 with the Morpheus design system. It builds bottom-up: the pure Domain Core (types → functions, each with its property test) first, then the typed gateways, then the Morpheus components/patterns, then wiring into the platform shell. Each task builds on the previous and ends integrated — no orphaned code. All test tasks are required (comprehensive from the start).

## Tasks

- [ ] 1. Scaffold Content Engine structure and Domain Core types
  - Create `src/domain/content/` (types + functions) and `src/screens/content/`, `src/patterns/harmonx/content/` folders
  - Define branded ids (`AtomId`, `ProjectionId`, `FactId`, `SlideId`, `PillarId`) and reuse shared `Backlink`, `Confidence` from `src/domain/types`
  - Define `ContentFact`, `InsightAtom`, `ProofSignal`, `BrandExample`, `ContentPillar`, `Projection`, `ProjectionBody`, `Slide`, `ProjectionVersion`, `ValidationResult`, `MissingComponent`, enums (`AuthoringMode`, `ProjectionFormat`, `Channel`, `FounderVisibility`)
  - _Requirements: 2.1, 4.1, 4.2, 5.1, 5.2, 7.6, 11.1, 12.1_

- [ ] 2. Implement atom validation and fact-set core
  - [ ] 2.1 Implement `validateAtom` and `atomFactIds`
    - `validateAtom` checks non-whitespace insight, proof signal with backlink, brand example, exactly one pillar; returns exactly the missing components
    - `atomFactIds` returns the canonical set of the atom's fact ids
    - _Requirements: 2.1, 2.2, 2.3, 3.2, 3.3, 4.3, 5.4, 7.5_
  - [ ] 2.2 Write property test for atom validation
    - **Property 1: Atom validation reports exactly the missing components**
    - **Validates: Requirements 2.1, 2.2, 2.3, 3.2, 3.3, 4.3, 5.4, 7.5**
  - [ ] 2.3 Implement proof-signal validity check
    - A proof signal is acceptable iff it carries a numeric value, non-empty label, and an evidence backlink; reject free-typed stats without a backlink
    - _Requirements: 4.2, 4.5_
  - [ ] 2.4 Write property test for proof-signal validity
    - **Property 2: A proof signal is valid only with value, label, and evidence backlink**
    - **Validates: Requirements 4.2, 4.5**

- [ ] 3. Implement content-faithfulness (the headline guarantee)
  - [ ] 3.1 Implement `isFaithful(atom, projection)`
    - Returns true iff `projection.assertedFactIds ⊆ atomFactIds(atom)`; total, pure, no throw
    - _Requirements: 7.2, 7.3, 8.3, 10.2, 11.3, 13.3, 14.4_
  - [ ] 3.2 Write property test for content-faithfulness
    - **Property 3: Content-faithfulness holds for every projection (in both directions)**
    - **Validates: Requirements 7.2, 7.3, 8.3, 10.2, 11.3, 13.3, 14.4**
  - [ ] 3.3 Implement essay-completeness check and `isLiftedFrom`
    - Essay asserted set equals the atom's full fact set; `isLiftedFrom(child, essay)` = child facts ⊆ essay facts and `liftedFromEssayId === essay.id`; thesis length ≤ configured limit
    - _Requirements: 8.1, 8.2, 9.1, 9.2, 9.3, 13.2_
  - [ ] 3.4 Write property test for essay completeness
    - **Property 4: The Substack essay carries the complete atom argument**
    - **Validates: Requirements 8.1**
  - [ ] 3.5 Write property test for the X thesis lift + limit
    - **Property 5: The X thesis is lifted from the essay and within the platform limit**
    - **Validates: Requirements 8.2, 9.1, 9.2, 9.3, 13.2**

- [ ] 4. Implement projection-set, channel, visibility, staleness, and slide logic
  - [ ] 4.1 Implement `deriveProjectionFormats` and `channelsFor`
    - Mode → formats (full vs simple); `founderVideo` → `['tiktok','instagramReels']`
    - _Requirements: 7.1, 11.2, 13.1, 13.4_
  - [ ] 4.2 Write property test for projection-set derivation
    - **Property 6: Projection-set formats and channels are a pure function of mode**
    - **Validates: Requirements 7.1, 11.2, 13.1, 13.4**
  - [ ] 4.3 Implement founder-video constraints and `defaultFounderVisibility`
    - Video brief `targetSeconds` in [30,60] with non-empty script/shot direction; default visibility per format
    - _Requirements: 11.1, 12.2, 12.3_
  - [ ] 4.4 Write property tests for video-brief bounds and visibility defaults
    - **Property 7: The founder video brief targets 30–60 seconds with real direction**
    - **Property 8: Founder-visibility defaults follow the format**
    - **Validates: Requirements 11.1, 12.2, 12.3**
  - [ ] 4.5 Implement founder-visibility update, source-version stamping, `isStale`, `withNextDraft`, `reorderSlides`
    - Visibility update touches only the target projection; projection pins generating atom version; `isStale` = version mismatch; `withNextDraft` retains prior draft; `reorderSlides` is an order-preserving permutation
    - _Requirements: 7.4, 7.6, 10.1, 10.3, 12.4, 14.2, 14.3_
  - [ ] 4.6 Write property tests for visibility independence, staleness, regeneration, and reorder
    - **Property 9: Changing one projection's founder visibility leaves the others unchanged**
    - **Property 10: A projection pins its generating atom version and goes stale only when the atom advances**
    - **Property 11: Regeneration is isolated and retains the prior draft**
    - **Property 12: Carousel reordering is an order-preserving permutation**
    - **Validates: Requirements 7.4, 7.6, 10.1, 10.3, 12.4, 14.2, 14.3**

- [ ] 5. Checkpoint — Domain Core complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement typed gateways with mockable interfaces
  - [ ] 6.1 Define and implement `SignalGateway`, `GenerationGateway`, `ContentConfigGateway`
    - `SignalGateway.findSignals` pulls proof signals from the memory layer (references harmonx-platform R12/R19.10); `GenerationGateway` returns structured `Projection`s with `assertedFactIds`; `ContentConfigGateway` serves exactly three pillars, the curated brand-example set, and platform limits
    - Provide in-memory mock implementations for tests and Storybook
    - _Requirements: 3.1, 4.1, 5.1, 7.1, 9.3_
  - [ ] 6.2 Enforce faithfulness on gateway output
    - Wrap generation results so any returned projection failing `isFaithful` is rejected with a text reason before reaching surfaces
    - _Requirements: 7.2, 7.3_

- [ ] 7. Build atom-authoring components (Morpheus, five-file pattern)
  - [ ] 7.1 Implement `PillarSelect`
    - Choose exactly one of three config pillars; name + description text; all states; alias tokens only
    - _Requirements: 3.1, 3.2, 3.4_
  - [ ] 7.2 Implement `ProofSignalPicker` with CitationCard and empty state
    - Query `SignalGateway`; render selected signal value+label+backlink via CitationCard; defined empty state naming the gap; no free-typed unbacked stat
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - [ ] 7.3 Implement `BrandExamplePicker`
    - Select one brand from curated config set; render brand name + note as text (not logo/color alone)
    - _Requirements: 5.1, 5.2, 5.3_
  - [ ] 7.4 Implement `GuardrailFlag`
    - Inline text flag for unfaithful content and advisory political-framing / over-disclosure prompts; icon + text, never color alone
    - _Requirements: 6.2, 6.4, 7.3, 14.4_
  - [ ] 7.5 Implement `InsightAtomEditor` composing the above
    - Insight textarea + pickers + pillar; `validateAtom` gates save with `InlineMessage` listing missing components; guardrail advisories do not block save; in-memory state only
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 6.1, 6.3, 6.5_
  - [ ] 7.6 Write unit + axe tests for atom-authoring components
    - Save gating, empty-signal state, exactly-three pillars, text-only rendering
    - _Requirements: 3.1, 4.3, 4.4, 5.3_

- [ ] 8. Build projection components (Morpheus, five-file pattern)
  - [ ] 8.1 Implement `FounderVisibilityToggle`
    - Per-projection on-camera vs authored-voice; text state; change isolates to the one projection
    - _Requirements: 12.1, 12.2, 12.3, 12.4_
  - [ ] 8.2 Implement `CarouselEditor`
    - Ordered slides with keyboard, non-drag reorder using `reorderSlides`; slide meaning in text
    - _Requirements: 10.1, 10.3, 10.4_
  - [ ] 8.3 Implement `ProjectionEditor`
    - Format-specific editable body (essay / thesis / carousel / video brief); version history; faithfulness flag on edit preserving text; preserves source-atom link
    - _Requirements: 8.4, 9.4, 11.4, 14.1, 14.3, 14.4_
  - [ ] 8.4 Implement `ProjectionPanel` with generation status live region
    - Generate disabled while atom incomplete; run `GenerationGateway`; `aria-live="polite"` progress announced once per meaningful change; reject unfaithful candidates in text; staleness banner with regenerate/reconcile; regenerate isolates to one projection
    - _Requirements: 7.1, 7.3, 7.4, 7.5, 7.6, 14.2, 16.5_
  - [ ] 8.5 Write property test for the generation live region
    - **Property 14: Generation progress announces each meaningful change exactly once**
    - **Validates: Requirements 16.5**
  - [ ] 8.6 Write unit + axe tests for projection components
    - Editable bodies preserve source link, unfaithful edit flagged, regenerate retains prior draft, non-drag reorder operable by keyboard
    - _Requirements: 8.4, 9.4, 10.3, 11.4, 14.3, 14.4_

- [ ] 9. Assemble the atom workspace and content home
  - [ ] 9.1 Implement `AtomWorkspace`
    - Two areas (Atom | Projections); Simple/full mode toggle calling `deriveProjectionFormats` and reconciling the Projection Set on switch
    - _Requirements: 1.3, 1.4, 13.1, 13.4_
  - [ ] 9.2 Implement `ContentHome` atom list
    - List atoms showing insight summary + pillar as text; new-atom action; Morpheus-voice empty state
    - _Requirements: 1.2, 2.6, 3.4_
  - [ ] 9.3 Write property test for atom-list rendering
    - **Property 13: The atom list renders each atom's insight summary and pillar**
    - **Validates: Requirements 1.2, 2.6, 3.4**

- [ ] 10. Wire the Content Engine into the platform shell
  - [ ] 10.1 Register the "Content" destination and routes
    - Add the "Content" entry to the platform left nav filtered by the shared capability resolver; add routes for `ContentHome` and `AtomWorkspace`
    - _Requirements: 1.1, 1.5, 1.7_
  - [ ] 10.2 Write unit tests for nav registration and capability gating
    - Content entry present when permitted, hidden/disabled otherwise
    - _Requirements: 1.1, 1.7_

- [ ] 11. Responsive, reduced-motion, and material fallbacks
  - Apply token-driven responsive layout (xs–2xl); reuse platform `resolveMotion`/`resolveMaterialTier` so reduced motion → crossfade/instant and reduced transparency/forced-colors → Tier 2 Solid; touch targets ≥44px; no function gated on motion
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 16.6, 16.7_

- [ ] 12. Accessibility pass and final checkpoint
  - Run jest-axe on every component; verify keyboard-only operation (including non-drag carousel reorder and the generation live region), 200% zoom / 320px reflow, screen-reader announcements, reduced-motion, reduced-transparency, and forced-colors
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_

## Notes

- All tasks are required, including property tests and unit/axe tests (comprehensive from the start).
- Each task references specific requirements; property-test sub-tasks reference their design property number.
- Checkpoints (tasks 5 and 12) ensure incremental validation.
- Property tests use fast-check + Vitest at ≥100 iterations, tagged `Feature: harmonx-content-engine, Property {n}: {text}`; unit tests cover examples/edge cases; jest-axe gates accessibility.
