# Implementation Plan — Harmonx — Brand Imprint™ Platform

## Overview

This plan implements Harmonx as a React 18 + TypeScript (strict) SPA on the Morpheus design system (Vite, CSS Modules referencing alias tokens only, Radix-backed accessible behavior, Storybook, Vitest + Testing Library + jest-axe, fast-check for property-based tests).

The work is ordered to build the **pure Domain Core first** — the gate predicate, capability resolution, versioning/branching, redaction, score-delta retention, credential selection, writeback admission, thesis laddering, spine projection, and the Data Humanism data-substrate + faithfulness check — each paired with the property-based tests that validate the 47 correctness properties from the design. Only after the testable rules exist do we build the NEW Morpheus components/patterns, the typed gateways, the surfaces/screens, the client portal + redaction wiring, and the cross-cutting accessibility verification.

Conventions:
- **PBT** sub-tasks implement a single design Correctness Property with fast-check (min 100 runs), tagged `// Feature: harmonx-platform, Property {n}: {title}`. Each names its property and the requirement clause it validates.
- All test, story, and a11y sub-tasks are required (comprehensive from the start).
- No task depends on a backend; server concerns are reached only through the typed gateways, which are mocked in tests. No deployment/infra tasks beyond the frontend build.

## Tasks

- [ ] 1. Project scaffold, tooling, and shared foundations
  - Initialize the Vite + React 18 + TypeScript (strict) library/app per `structure.md` (`src/domain`, `src/gateways`, `src/components`, `src/patterns/harmonx`, `src/screens`, `src/tokens`).
  - Wire the token pipeline: `npm run tokens` (Style Dictionary) producing CSS custom properties + typed TS exports re-exported from `src/tokens`; confirm components will consume `var(--morph-*)` only.
  - Configure Vitest + Testing Library + jest-axe + fast-check; add the `npm run test` script and a Storybook workbench.
  - Add lint rule / CI check forbidding raw hex/px/ms literals in `src/components` and `src/patterns` (alias tokens only).
  - _Requirements: 18.1, 18.2_

- [ ] 2. Domain types and branded IDs
  - Define all `src/domain/types` interfaces from the design (Project, StageEpisode, ChangeLogEntry, BriefVersion, LockRecord, BriefVersionLabel, LockScope, CreativeNode, ScoreLifecycle, EmotionalLayerScore, CoreInsight, OpportunityThesis, NarrativeSpine/Beat, SpineProjection, DataSubstrate/DataEncoding/DataHumanismRender, Script/ScriptScene/ApprovalRecord, Storyboard/StoryboardFrame, MemoryGraph/MemoryNode/Backlink, Connector/ConnectorBinding, GenerativeModelConnector/RenderRequest/DerivedPrompt/RenderedAsset, Deliverable/DeliverableVersion, UsageEvent, Clone/ScenarioRun, Capability/Role/Scope/RoleGrant/UserAssignment, AuditEntry, PlatformEvent).
  - Use opaque branded string IDs (`ProjectId`, `BriefVersionId`, `NodeId`, `ScriptId`, `ScriptSceneId`, `StoryboardId`, `FrameId`, …) to prevent cross-entity mixups.
  - No logic in this task — types only, so the Domain Core functions below share one contract.
  - _Requirements: 2.1, 6.6, 11.1, 13.8, 15.1, 17.7, 19.1, 21.2, 27.1, 28.3, 32.3, 33.2_

  - [ ] 2.1 Author fast-check generators for the domain types
    - Create `src/domain/__generators__` arbitraries for Project, BriefVersion (draft/locked/superseded/branch), BriefVersionLabel, OpportunityThesis (backed/unbacked, sized/unsized), CreativeNode + ScoreLifecycle, NarrativeSpine/Beat, Script/ScriptScene (draft/approved), Storyboard/StoryboardFrame (draft/approved, per-deliverable-format), DataSubstrate, Deliverable + edit sequences, MemoryGraph, Connector/ConnectorBinding, UserAssignment/RoleGrant/Scope, usage-event streams, agent-status frames, token streams.
    - Deliberately generate prework edge cases: empty/whitespace/non-ASCII, redistribution-prohibited sources, superseded locks, branch-only lineages, unbacked audience claims, zero-node graphs, single-beat spines, scripts with unapproved state blocking storyboards, storyboards with unapproved state blocking final render.
    - _Requirements: 18.1, 32.10, 33.8_

### Domain Core — Gate & generation

- [ ] 3. Anti-hallucination gate predicate
  - Implement `isLockCurrent(bound, lineage)` and `canRender(scope, lineage)` in `src/domain/gate` (locked iff bound version is `locked` and not superseded along its own lineage; per-binding currency so a later mainline recut never stales a shipped deck).
  - Implement `isCreativeRender(request)` classifying render-vs-analysis, and a discriminated `Ok | Refused{reason}` result carrying a screen-reader-available refusal reason.
  - _Requirements: 7.7, 8.1, 8.2, 8.3, 8.4, 8.5, 9.6, 11.4, 19.3, 23.6_

  - [ ] 3.1 PBT — Property 1: render impossible without a current lock for the bound version
    - **Property 1: Render is impossible without a current lock for the bound version**
    - **Validates: Requirements 7.7, 8.1, 8.2, 8.4, 9.6, 11.4, 19.3, 23.6**

  - [ ] 3.2 PBT — Property 2: analysis/assist is never gated as a render
    - **Property 2: Analysis/assist is never gated as a render**
    - **Validates: Requirements 8.3, 8.5**

- [ ] 4. Render selection and prompt derivation (domain)
  - Implement `selectModel(modality, tier)` (matches required media; surfaces coverage gap and selects nothing on no-match — no unrelated substitution) and `derivePrompt(brief, node)` (pure function of interpretation, Resonance Layer, served emotional layers, defense copy; rejects any free-typed prompt).
  - Implement `render(req, registry)` composing `canRender` → `selectModel` → `derivePrompt` → produce asset → stamp provenance (model id, brief version, derived prompt) and set clearance from the producing connector; retain prior asset as `priorVersionId` on regenerate.
  - Route Data Humanism data-substrate requests to the projection pipeline (task 16), not a model connector.
  - _Requirements: 19.2, 19.4, 19.5, 19.6, 19.7, 19.12_

  - [ ] 4.1 PBT — Property 3: render prompts derived from the locked brief, never free-typed
    - **Property 3: Render prompts are derived from the locked brief, never free-typed**
    - **Validates: Requirements 19.6**

  - [ ] 4.2 PBT — Property 5: model selection matches media; data-substrate routes to projection; no substitution
    - **Property 5: Model selection matches required media; Data-Humanism's data substrate routes to projection; no substitution across a gap**
    - **Validates: Requirements 19.2, 19.5, 19.10**

  - [ ] 4.3 PBT — Property 6: regenerate retains the prior render as a version
    - **Property 6: Regenerate retains the prior render as a version**
    - **Validates: Requirements 19.4**

  - [ ] 4.4 PBT — Property 7: surfaced clearance equals the producing connector's clearance
    - **Property 7: Surfaced clearance equals the producing connector's clearance**
    - **Validates: Requirements 19.12**

### Domain Core — Capability & access

- [ ] 5. Capability resolution and access checks
  - Implement `resolveCapabilities(assignment, roles, scope)` and `can(caps, required)` in `src/domain/capabilities` (workspace grants apply everywhere; project/portal grants apply only to that resource; Approve-gate distinct from Edit-project; new capabilities register without rebuilding roles).
  - Implement the three-mechanism live-graph gate `canAccessLiveGraph(capability, tier, partnershipUnlock)` evaluating capability → tier → partnership unlock in precedence, granting only if all pass.
  - _Requirements: 1.6, 7.5, 12.8, 13.5, 15.1, 15.3, 15.4, 15.5, 15.7, 16.4, 16.5, 16.6, 16.7, 22.1, 22.3, 22.7, 23.3, 24.4_

  - [ ] 5.1 PBT — Property 8: action permitted iff required capability held for the acting scope
    - **Property 8: An action is permitted iff the required capability is held for the acting scope**
    - **Validates: Requirements 1.6, 7.5, 12.8, 13.5, 15.3, 15.5, 15.7, 22.1, 22.3, 22.7, 23.3, 24.4**

  - [ ] 5.2 PBT — Property 10: live-graph access requires all three mechanisms in precedence
    - **Property 10: Live-graph access requires all three mechanisms in precedence**
    - **Validates: Requirements 16.4, 16.5, 16.6, 16.7**

- [ ] 6. Client redaction model
  - Implement `redactForClient(value)` (removes Resonance Layer; clamps node evidence to exactly one hop) and `redactGraphForClient(graph, {maxDepth:1})` (bounds client Graph-view traversal so an adjacent node's backlink cannot leak a second hop; removes full-graph access unless partnership-unlocked).
  - Ensure headline Opportunity Thesis sizing is preserved while the TAM/SAM/SOM deep-dive is gated behind an on-demand request.
  - _Requirements: 9.4, 11.2, 16.2, 16.3, 16.8, 23.2, 25.4, 27.9_

  - [ ] 6.1 PBT — Property 9: client redaction removes IP, clamps node evidence, bounds graph depth
    - **Property 9: Client redaction removes internal IP, clamps node evidence to one hop, and bounds graph depth**
    - **Validates: Requirements 9.4, 11.2, 16.2, 16.3, 23.2, 25.4**

  - [ ] 6.2 PBT — Property 44: headline sizing always exposed; deep-dive only on demand
    - **Property 44: Headline sizing is always exposed; the deep-dive is only on demand**
    - **Validates: Requirements 27.4, 16.8**

### Domain Core — Versioning, branching & memory

- [ ] 7. Brief-version label scheme (format/parse)
  - Implement `format(label)` and `parse(text)` for `BriefVersionLabel` in `src/domain/versioning` covering `v1.0`, `v1.1`, `v1.0·b`, `v1.0·b.1`.
  - _Requirements: 17.7_

  - [ ] 7.1 PBT — Property 11: brief-version labels round-trip through format/parse
    - **Property 11: Brief-version labels round-trip through format/parse**
    - **Validates: Requirements 17.7**

- [ ] 8. Lock, recut, branch, and port operations
  - Implement `lockBrief(draft, approver, checklist)` producing an immutable frozen snapshot; `recut(mainline)` incrementing the minor version; `branch(locked)` creating a project-local sandbox label without touching the Memory graph; `relockBranch` committing only on the branch; `portNode(node, targetBranch)` transferring only the selected node (no auto-merge) and retaining an origin-brief back-reference.
  - _Requirements: 6.6, 7.6, 9.5, 17.1, 17.2, 17.3, 17.4, 17.5, 17.8, 21.4, 27.5, 27.7_

  - [ ] 8.1 PBT — Property 12: recut increments version; branch work never mutates mainline
    - **Property 12: Recut increments version; branch work never mutates the mainline**
    - **Validates: Requirements 9.5, 17.2, 17.3, 17.5**

  - [ ] 8.2 PBT — Property 13: porting moves only the selected node and preserves origin lineage
    - **Property 13: Porting moves only the selected node and preserves origin lineage**
    - **Validates: Requirements 17.4, 17.8**

  - [ ] 8.3 PBT — Property 15: locking freezes an immutable brief snapshot
    - **Property 15: Locking freezes an immutable brief snapshot**
    - **Validates: Requirements 6.6, 7.6, 21.4, 27.5, 27.7**

- [ ] 9. Memory writeback admission, provenance, stats, and search/filter
  - Implement `admitWriteback(work)` (true iff descends from locked-or-ported lineage) and `writeRenderProvenance(asset, target)` (branch renders → project subgraph only; promote to global Memory on port or mainline re-lock).
  - Implement `stats(graph)` (node/project/backlink counts derived from the graph) and `searchNodes` / `filterNodes` (project, emotional layer, source/connector, performance delta; per-project appearances).
  - _Requirements: 19.7, 10.3, 10.4, 10.5, 12.2, 12.3, 12.4, 12.5, 12.7, 17.6_

  - [ ] 9.1 PBT — Property 4: every rendered asset provenance-stamped; branch renders project-local
    - **Property 4: Every rendered asset is fully provenance-stamped, with branch renders project-local**
    - **Validates: Requirements 19.7**

  - [ ] 9.2 PBT — Property 14: global writeback admitted only from locked-or-ported lineage
    - **Property 14: Global memory writeback is admitted only from locked-or-ported lineage**
    - **Validates: Requirements 10.3, 10.4, 10.5, 12.7, 17.6**

  - [ ] 9.3 PBT — Property 16: aggregate graph stats equal true derived counts
    - **Property 16: Aggregate graph stats equal the true derived counts**
    - **Validates: Requirements 12.2**

  - [ ] 9.4 PBT — Property 17: search and filter results satisfy their predicates
    - **Property 17: Search and filter results satisfy their predicates**
    - **Validates: Requirements 12.3, 12.4, 12.5**

- [ ] 10. Checkpoint — gate, access, versioning, memory
  - Ensure all tests pass, ask the user if questions arise.

### Domain Core — Score lifecycle & confidence

- [ ] 11. Score lifecycle, delta retention, and confidence
  - Implement `advanceScore(lifecycle, step)` (append-only in canonical order Projected → Clone read → Tested → Observed; prior values retained) and `delta(stepA, stepB)`.
  - Implement confidence helpers: attach confidence to insights/scores, and `isBelowThreshold(insight, config)` reading thresholds from configuration.
  - _Requirements: 11.5, 11.7, 20.1, 20.3, 20.4, 20.5_

  - [ ] 11.1 PBT — Property 18: score advancement is append-only and order-preserving
    - **Property 18: Score advancement is append-only and order-preserving**
    - **Validates: Requirements 11.5, 11.7, 20.3**

  - [ ] 11.2 PBT — Property 20: low-confidence insights flagged in text at Distill and pre-lock
    - **Property 20: Low-confidence insights are flagged in text at Distill and pre-lock**
    - **Validates: Requirements 20.4**

  - [ ] 11.3 Confidence text+icon helper unit tests
    - Cover Property 19's non-graphical helper (confidence present; text + icon; never color alone) at the domain/format level; the render-side assertion is completed with the ScoreLifecycle component (task 23).
    - _Requirements: 18.7, 20.1, 20.2_

### Domain Core — Pipeline, stages & provenance

- [ ] 12. Pipeline transitions, input validation, taxonomy, and data-driven counts
  - Implement `nextStage(stage)` (circular immerse→uncover→distill→direct→observe→immerse) and `validateStageInputs(inputs)` returning the named missing required fields.
  - Implement `classifySignal` guaranteeing exactly one of the Four-Layer Signal Taxonomy layers per item, and derived-count helpers (`agentCount(roster)`, connector/category/touchpoint/asset-type counts from the registry, emotional-layer names from config).
  - _Requirements: 4.4, 4.5, 5.3, 5.4, 6.2, 7.4, 10.6, 13.7, 27.6_

  - [ ] 12.1 PBT — Property 21: stage transitions follow the circular pipeline
    - **Property 21: Stage transitions follow the circular pipeline**
    - **Validates: Requirements 4.4, 5.5, 10.6**

  - [ ] 12.2 PBT — Property 22: incomplete required input blocks submission and names the gaps
    - **Property 22: Incomplete required input blocks submission and names the gaps**
    - **Validates: Requirements 4.5, 7.4, 27.6**

  - [ ] 12.3 PBT — Property 23: signal items carry exactly one taxonomy layer
    - **Property 23: Signal items carry exactly one taxonomy layer**
    - **Validates: Requirements 5.3**

  - [ ] 12.4 PBT — Property 24: data-driven counts equal registry/roster derivations
    - **Property 24: Data-driven counts equal registry/roster derivations**
    - **Validates: Requirements 5.4, 6.2, 13.7**

- [ ] 13. Change-log attribution and re-enterable diffs
  - Implement change-log append (actor, timestamp, human/system) and `applyDiff(state, diff)` reconstructing captured state (including narrative-spine reorders and beat-binding changes).
  - _Requirements: 3.3, 3.4, 3.5, 21.10_

  - [ ] 13.1 PBT — Property 25: every change-log entry is attributed and re-enterable
    - **Property 25: Every change-log entry is attributed and re-enterable**
    - **Validates: Requirements 3.3, 3.4, 3.5, 21.10**

### Domain Core — Opportunity Thesis, narrative spine & projections

- [ ] 14. Opportunity Thesis rules and thesis laddering
  - Implement thesis well-formedness (all five parts present), audience-evidence check (flag zero-backlink audience claims), and `laddersToThesis(coreInsight, thesis)` flagging a Core Insight that does not resolve the framed problem.
  - _Requirements: 27.1, 27.2, 27.3, 27.8_

  - [ ] 14.1 PBT — Property 43: thesis well-formed, evidence-backed, and Core Insight ladders to it
    - **Property 43: The Opportunity Thesis is well-formed, evidence-backed, and the Core Insight ladders to it**
    - **Validates: Requirements 27.1, 27.3, 27.8**

- [ ] 15. Narrative spine projection and beat well-formedness
  - Implement `project(spine, format, audience)` for `report`/`lifeWithBrand`/`sizzle` (preserve beat order, introduce no new beats, lead with the Opportunity Thesis framing; Chronological view uses exactly the frozen beat order) and beat validation (moment-of-day + node(s) + emotional layer(s) + evidence/defense; every beat ladders to the single Core Insight).
  - Implement crossover-hypothesis advisory handling (absent hypothesis is advisory, non-blocking, in the pre-lock checklist).
  - _Requirements: 9.2, 9.7, 16.1, 21.2, 21.3, 21.5, 21.6, 21.9, 27.9_

  - [ ] 15.1 PBT — Property 26: projections lead with thesis, preserve spine order, author no new beats
    - **Property 26: Projections lead with the thesis, preserve spine order, and author no new beats**
    - **Validates: Requirements 9.2, 9.7, 16.1, 21.5, 21.6, 27.9**

  - [ ] 15.2 PBT — Property 27: every beat is well-formed and ladders to the single Core Insight
    - **Property 27: Every beat is well-formed and ladders to the single Core Insight**
    - **Validates: Requirements 21.2, 21.3**

  - [ ] 15.3 PBT — Property 28: absent crossover hypothesis is advisory, not blocking
    - **Property 28: Absent crossover hypothesis is advisory, not blocking**
    - **Validates: Requirements 21.9**

- [ ] 16. Data Humanism data substrate and faithfulness check (hybrid)
  - Implement `projectDataSubstrate(brief)` — a pure, deterministic projection of the locked brief's real values (emotional-layer scores, projected-vs-observed deltas, resonance scores) into meaning-bearing encodings (height/length/position/angle/area); same brief yields the same encodings reproducibly, with no generative model.
  - Implement `preservesDataSubstrate(before, render)` — verifies a styled Data Humanism render preserves every substrate encoding by datumId, value, channel, and encoded magnitude (styling may add aesthetic attributes but may not add, drop, or change a meaning-bearing encoding).
  - _Requirements: 19.10, 19.13, 19.14, 19.15_

  - [ ] 16.1 PBT — Property 47: Data Humanism styling preserves the deterministic data substrate
    - **Property 47: Data Humanism styling preserves the deterministic data substrate**
    - **Validates: Requirements 19.10, 19.13, 19.14, 19.15**

### Domain Core — Pre-production pipeline (Script & Storyboard)

- [ ] 16b. Script and storyboard approval predicates + change-log recording
  - Implement `canGenerateStoryboard(script)` (returns true iff `script.state === 'approved'`) and `canFinalRender(storyboard)` (returns true iff `storyboard.state === 'approved'`) in `src/domain/gate`.
  - Implement `approveScript(script, approver, at)` and `approveStoryboard(storyboard, approver, at)` that transition state to `approved` and produce an `ApprovalRecord`.
  - Implement change-log recording for approvals: each approval appends a `ChangeLogEntry` with actor, timestamp, and a re-enterable diff capturing the draft→approved transition (consistent with Requirement 3).
  - Refused requests carry a text reason stating what is required (approved script for storyboards; approved storyboard for final render).
  - _Requirements: 32.7, 32.10, 33.7, 33.8, 33.9, 9.8, 3.3_

  - [ ] 16b.1 PBT — Property 49: final render is blocked until the relevant storyboard is approved
    - **Property 49: Final render is blocked until the relevant storyboard is approved**
    - **Validates: Requirements 33.8, 9.8**

  - [ ] 16b.2 PBT — Property 50: storyboard generation is blocked until the script is approved
    - **Property 50: Storyboard generation is blocked until the script is approved**
    - **Validates: Requirements 32.10, 33.9**

  - [ ] 16b.3 PBT — Property 51: script and storyboard approvals are recorded with actor + timestamp in the change log
    - **Property 51: Script and storyboard approvals are recorded with actor + timestamp in the change log**
    - **Validates: Requirements 32.7, 33.7, 3.3**

### Domain Core — Connectors, lab, metering & governance

- [ ] 17. Connector credential resolution and coverage/upgrade triggers
  - Implement `selectCredential(binding)` (prefers `client`; else `platform` only when present and not redistribution-prohibited; else `none`) and coverage-gap detection producing an upgrade trigger naming the specific gap; block activation of partnership-gated connectors without an unlock.
  - _Requirements: 13.4, 13.6, 13.9, 13.10, 13.11, 24.3, 25.6_

  - [ ] 17.1 PBT — Property 29: credential resolution prefers client-supplied and never violates redistribution
    - **Property 29: Credential resolution prefers client-supplied and never violates redistribution rules**
    - **Validates: Requirements 13.9, 13.10, 13.11**

  - [ ] 17.2 PBT — Property 30: coverage gaps and tier thresholds surface a specific upgrade trigger
    - **Property 30: Coverage gaps and tier thresholds surface a specific upgrade trigger**
    - **Validates: Requirements 13.4, 13.6, 24.3, 25.6**

- [ ] 18. Lab verdicts and writeback
  - Implement clone-run result shaping (labeled "signal"; text stating human testing is confirming ground truth), Tested-score writeback, and crossover verdict/score production associated with the hypothesis.
  - _Requirements: 14.2, 14.5, 14.6, 14.7, 21.8_

  - [ ] 18.1 PBT — Property 31: clone results labeled signal and write correct verdicts back
    - **Property 31: Clone results are labeled signal and write the correct verdicts back**
    - **Validates: Requirements 14.5, 14.6, 14.7, 21.8**

- [ ] 19. Usage metering, cost baseline, audit log, and consent
  - Implement `recordUsage` (exactly one event per metered action; generative renders carry token/unit detail), `summarizeUsage(events)`, and `projectCostBaseline(events, rates)` (sum of generative consumption incl. edits/re-renders; billing-gated).
  - Implement append-only audit log with scope/range export, and consent-basis recording (flag + client-exclude sources lacking a basis).
  - _Requirements: 19.8, 24.1, 24.2, 24.6, 24.7, 25.1, 25.2, 25.3, 25.5_

  - [ ] 19.1 PBT — Property 32: every metered action records one usage event with token detail; aggregates correctly
    - **Property 32: Every metered action records exactly one usage event with token detail, and aggregates correctly**
    - **Validates: Requirements 19.8, 24.1, 24.2, 24.6**

  - [ ] 19.2 PBT — Property 33: audit log append-only and scope/range export exact
    - **Property 33: The Audit Log is append-only and scope/range export is exact**
    - **Validates: Requirements 25.3, 25.5**

  - [ ] 19.3 PBT — Property 34: ingested sources record consent basis or are flagged and client-excluded
    - **Property 34: Ingested sources record a consent basis or are flagged and client-excluded**
    - **Validates: Requirements 25.1, 25.2**

  - [ ] 19.4 PBT — Property 46: project cost baseline equals summed generative consumption incl. edits; billing-gated
    - **Property 46: Project cost baseline equals summed generative consumption including edits, and is billing-gated**
    - **Validates: Requirements 24.7**

### Domain Core — Deliverable editing, notifications, material & onboarding helpers

- [ ] 20. Deliverable edit history and external round-trip
  - Implement append-only `DeliverableVersion` recording (text / image-replace / ai-rerender; records source brief version + human|system editor) with AI re-render routed through `render(...)`; opening in an external editor never overwrites the canonical live-link content (re-import creates a new version explicitly); client-facing versions compose `redactForClient`.
  - _Requirements: 28.1, 28.2, 28.3, 28.5, 28.6, 28.8_

  - [ ] 20.1 PBT — Property 45: deliverable edits append-only and attributed; external open never overwrites canonical
    - **Property 45: Deliverable edits are append-only and attributed; external open never overwrites the canonical copy**
    - **Validates: Requirements 28.3, 28.5, 28.8**

- [ ] 21. Notifications, live-region dedupe, streaming batcher, material/motion resolver, onboarding & continue-state helpers
  - Implement `announceOnce(prev, event)` and the managed live-region reducer consuming a typed `MeaningfulChangePredicate` + `dedupeKey` (emit at most once per key across notification and live-region channels; never per intermediate frame); notification fan-out per affected user incl. mentions.
  - Implement the streaming-text announcer batching to sentence/chunk boundaries with a "jump to response end" affordance; the material-tier/motion resolver (Tier 2 solid under reduced-transparency/forced-colors/low-capability; reduced-motion fallback variant); onboarding dismissal idempotence; and the state-derived Continue label + empty-state mapping.
  - _Requirements: 5.6, 18.4, 18.5, 18.8, 22.2, 22.4, 22.5, 22.6, 26.1, 26.2, 26.4, 2.2_

  - [ ] 21.1 PBT — Property 35: meaningful events notify affected users once per dedupe key; mentions notify
    - **Property 35: Meaningful events notify affected users exactly once per dedupe key; mentions notify the mentioned user**
    - **Validates: Requirements 22.2, 22.4, 22.6**

  - [ ] 21.2 PBT — Property 36: managed live regions announce each meaningful change once across channels
    - **Property 36: Managed live regions announce each meaningful change exactly once across channels**
    - **Validates: Requirements 5.6, 22.5**

  - [ ] 21.3 PBT — Property 37: streaming text announces at sentence/chunk boundaries, never per token
    - **Property 37: Streaming text announces at sentence/chunk boundaries, never per token**
    - **Validates: Requirements 18.8**

  - [ ] 21.4 PBT — Property 38: material tier and motion resolve to fallbacks under reduced conditions
    - **Property 38: Material tier and motion resolve to fallbacks under reduced conditions**
    - **Validates: Requirements 18.4, 18.5**

  - [ ] 21.5 PBT — Property 41: dismissed onboarding is not re-presented until reset
    - **Property 41: Dismissed onboarding is not re-presented until reset**
    - **Validates: Requirements 26.4**

  - [ ] 21.6 PBT — Property 42: continue affordance and empty states are state-derived
    - **Property 42: The continue affordance and empty states are state-derived**
    - **Validates: Requirements 2.2, 26.1, 26.2**

- [ ] 22. Checkpoint — Domain Core complete
  - Ensure all Domain Core property and unit tests pass, ask the user if questions arise.

### NEW Morpheus components & patterns

Each item below is built with the Morpheus five-file pattern (`X.tsx`, `X.module.css`, `X.stories.tsx`, `X.test.tsx`, `index.ts`), references **alias tokens only** (no raw hex/px/ms), declares all documented states (rest/hover/focus/active/selected/disabled/loading/error where applicable), and ships axe + keyboard-operable stories. Each story/a11y sub-task is the jest-axe + keyboard-interaction verification for that component.

- [ ] 23. ScoreLifecycle + ScoreLifecycleChip (`src/components/ScoreLifecycle`)
  - Render the 4-step chip strip (Projected→Clone read→Tested→Observed) with deltas and confidence; text + icon, never color alone; consume the domain score/confidence helpers.
  - _Requirements: 11.5, 11.7, 18.7, 20.1, 20.2_

  - [ ] 23.1 PBT — Property 19: confidence present and conveyed by text + icon, never color alone
    - **Property 19: Confidence is present and conveyed by text + icon, never color alone**
    - **Validates: Requirements 18.7, 20.1, 20.2**

  - [ ] 23.2 Stories + jest-axe + keyboard interaction for all states

- [ ] 24. Status/asset badges: ProvisioningModeBadge + ClearanceBadge (`src/components/…`)
  - ProvisioningModeBadge shows platform-managed / client-supplied / pass-through; ClearanceBadge surfaces cleared-commercial / requires-review / restricted. Both text + icon.
  - _Requirements: 13.8, 19.12, 25_

  - [ ] 24.1 Stories + jest-axe + keyboard interaction for all states

- [ ] 25. UpgradeTrigger (`src/components/UpgradeTrigger`)
  - Coverage-gap / tier-limit prompt naming the specific gap in text; consumes the domain upgrade-trigger output.
  - _Requirements: 13.4, 24.3_

  - [ ] 25.1 Stories + jest-axe + keyboard interaction for all states

- [ ] 26. AssetRenderFrame (`src/components/AssetRenderFrame`)
  - Sandboxed render-preview surface for asset renders; uses no browser storage APIs in the sandboxed path (R18.12); loading/error/empty states.
  - _Requirements: 18.12, 11.3_

  - [ ] 26.1 Stories + jest-axe + keyboard interaction; assert no browser-storage usage in the sandboxed path

- [ ] 27. StageTimeline (`src/patterns/harmonx/StageTimeline`)
  - Circular five-stage timeline with substatus and per-stage agent-assist badges; keyboard-navigable; state-derived Continue affordance.
  - _Requirements: 1.3, 2.2, 5.7_

  - [ ] 27.1 Stories + jest-axe + keyboard traversal for all states

- [ ] 28. GraphCanvas (`src/patterns/harmonx/GraphCanvas`)
  - Keyboard-navigable node+backlink graph with real semantics for Memory Layer / project subgraph / portal; nodes and edges reachable and labeled.
  - _Requirements: 2.7, 12.1, 16.1_

  - [ ] 28.1 Stories + jest-axe + keyboard traversal (incl. zero-node empty state)

- [ ] 29. VersionBranchRail (`src/patterns/harmonx/VersionBranchRail`)
  - Version/branch tree rendering mainline + branch suffixes from the domain label scheme.
  - _Requirements: 17.7_

  - [ ] 29.1 Stories + jest-axe + keyboard interaction for all states

- [ ] 30. ConnectorGrid (`src/patterns/harmonx/ConnectorGrid`)
  - Directory grouped by category/tier; stage tags; counts derived from the registry; partnership-gated status; read-only without Manage-connectors; embeds ProvisioningModeBadge.
  - _Requirements: 13.1, 13.2, 13.3, 13.5, 13.6, 13.7_

  - [ ] 30.1 Stories + jest-axe + keyboard interaction for all states

- [ ] 31. NarrativeSpineEditor (`src/patterns/harmonx/NarrativeSpineEditor`)
  - Ordered beat editor (accept/edit/add/remove/reorder) with a non-drag reorder alternative; flags beats that do not ladder to the Core Insight; records changes as re-enterable diffs.
  - _Requirements: 18.6, 21.1, 21.2, 21.3, 21.10_

  - [ ] 31.1 Stories + jest-axe + keyboard interaction incl. non-drag reorder path

- [ ] 32. BriefLockGate (`src/patterns/harmonx/BriefLockGate`)
  - Lock modal + pre-lock checklist (incl. thesis present/backed/sized; advisory crossover item) + Approve-gate capability guard; blocks on unmet items with text; confirm commits v1.0 with approver+timestamp; destructive-action confirmation before commit.
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 18.13, 20.4, 21.9, 27.6_

  - [ ] 32.1 PBT — Property 40: destructive actions require confirm/undo before commit
    - **Property 40: Destructive actions require confirm/undo before commit**
    - **Validates: Requirements 18.13**

  - [ ] 32.2 Stories + jest-axe + keyboard interaction for all states

- [ ] 33. NodeDetailPanel (`src/patterns/harmonx/NodeDetailPanel`)
  - Full node detail: category, asset type, interpretation, asset render (AssetRenderFrame), Resonance Layer marked internal-only, served emotional layers, evidence backlinks as real links with discernible names, defense copy, ScoreLifecycle; regenerate disabled without a current lock and routed through `canRender`.
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.6, 18.10_

  - [ ] 33.1 PBT — Property 39: citations and backlinks render as real links with discernible names
    - **Property 39: Citations and backlinks render as real links with discernible names**
    - **Validates: Requirements 11.6, 18.10**

  - [ ] 33.2 Stories + jest-axe + keyboard interaction for all states

- [ ] 34. CloneRunner (`src/patterns/harmonx/CloneRunner`)
  - Scenario runner: reactions, reasoning, clone-read score, A/B; synthetic resonance summary; results labeled "signal" with ground-truth text; lightweight inline variant for Distill.
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.7, 14.8_

  - [ ] 34.1 Stories + jest-axe + keyboard interaction for all states

- [ ] 35. HistoryTimeline (`src/patterns/harmonx/HistoryTimeline`)
  - Stage History: inputs, change log with human/system attribution, re-enterable diffs.
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ] 35.1 Stories + jest-axe + keyboard interaction for all states

- [ ] 36. OpportunityThesisEditor (`src/patterns/harmonx/OpportunityThesisEditor`)
  - Author/refine problem, audience+rationale, evidence, sizing, solution rationale; headline sizing always shown with on-demand TAM/SAM/SOM deep dive; flags unbacked audience claims.
  - _Requirements: 27.1, 27.2, 27.3, 27.4_

  - [ ] 36.1 Stories + jest-axe + keyboard interaction for all states

- [ ] 37. DeliverableEditor (`src/patterns/harmonx/DeliverableEditor`)
  - In-system edit (text, image replace, AI re-render), version history, canonical live link, external round-trip; publish-external gating; client-facing redaction; AI re-render routes through the gate.
  - _Requirements: 28.1, 28.2, 28.3, 28.4, 28.5, 28.6, 28.7_

  - [ ] 37.1 Stories + jest-axe + keyboard interaction for all states

- [ ] 38. UsageCostView (`src/patterns/harmonx/UsageCostView`)
  - Internal usage + token/cost baseline per model/deliverable/project; cost figures billing-gated; non-cost counts under view.
  - _Requirements: 24.2, 24.4, 24.6, 24.7_

  - [ ] 38.1 Stories + jest-axe + keyboard interaction for all states

- [ ] 39. PortalShell (`src/patterns/harmonx/PortalShell`)
  - Client-facing "Life with [Brand]" shell with view modes (Chronological/Linear/Graph), composes `redactForClient`/`redactGraphForClient`, leads with the Opportunity Thesis, gates Login/Share/Download/Live-graph in locked states with text.
  - _Requirements: 16.1, 16.2, 16.3, 16.5, 16.6, 16.8_

  - [ ] 39.1 Stories + jest-axe + keyboard interaction for all states

- [ ] 39b. ScriptEditor (`src/patterns/harmonx/ScriptEditor`)
  - Inline scene editor for the pre-production Script; renders per-scene cards (direction, visual/audio notes, transitions, pacing, tone, copy direction) derived from the locked brief's spine beats; inline-editable text fields per scene; lightweight "Script approved" action (not a modal ceremony — inline button with confirmation); approval records who + when and appends to stage change log; shows script state (draft/approved) with text + icon; disabled editing after approval (edit requires reverting approval or starting a new script from a recut).
  - _Requirements: 32.1, 32.2, 32.3, 32.5, 32.6, 32.7, 32.8_

  - [ ] 39b.1 Stories + jest-axe + keyboard interaction for all states (draft editing, immediate approve, approved read-only, scene expansion)

- [ ] 39c. StoryboardCanvas (`src/patterns/harmonx/StoryboardCanvas`)
  - Per-deliverable frame sequence showing sketch-level visual pre-viz; renders StoryboardFrames that reference shared Script Scenes (shows the scene direction as read-only context alongside the format-specific sketch/layout); inline-editable layout notes per frame; sketch asset display (AssetRenderFrame); lightweight "Storyboard approved" action with attribution; approval records who + when and appends to stage change log; overlap-aware design (shared direction from script displayed as context, per-deliverable interpretation as the editable/visual layer); shows storyboard state (draft/approved) with text + icon; deliverable format selector (sizzle/deck/Data Humanism) as tabs or segmented control.
  - _Requirements: 33.1, 33.2, 33.3, 33.4, 33.5, 33.6, 33.7_

  - [ ] 39c.1 Stories + jest-axe + keyboard interaction for all states (per-deliverable tabs, frame editing, sketch display, immediate approve, approved read-only, overlap context display)

- [ ] 40. Checkpoint — component library
  - Ensure all component tests and axe/keyboard stories pass, ask the user if questions arise.

### Typed gateways (data access)

- [ ] 41. Typed gateway interfaces and mock implementations
  - [ ] 41.1 Project/brief/stage gateway
    - Define `src/gateways` interfaces for projects, stage episodes, briefs, and lock/recut/branch/port operations; provide an in-memory mock for tests. Surfaces depend on interfaces only.
    - _Requirements: 2.1, 3.2, 6.6, 17.1_
  - [ ] 41.2 Render/deliverable gateway
    - Interface for creative-render requests (routed through the Domain Core gate), regenerate, and deliverable versions; mock implementation stamps provenance/clearance.
    - _Requirements: 8.2, 19.7, 28.3_
  - [ ] 41.3 Memory-layer gateway
    - Interface for graph read, search/filter, node panel, and writeback admission; mock implementation.
    - _Requirements: 12.1, 12.3, 12.6, 12.7_
  - [ ] 41.4 Connector-registry gateway
    - Interface exposing the connector registry (categories, tiers, counts, provisioning modes, credentials); mock implementation.
    - _Requirements: 13.1, 13.7, 13.8_
  - [ ] 41.5 Lab gateway
    - Interface for clone seeding, scenario runs, human-test results, crossover runs, and score writeback; mock implementation.
    - _Requirements: 14.1, 14.2, 14.5, 14.6_
  - [ ] 41.6 Usage/audit/governance gateway
    - Interface for usage events, cost baseline, append-only audit log + export, and consent/licensing records; mock implementation.
    - _Requirements: 24.1, 25.1, 25.3, 25.5_
  - [ ] 41.7 Notifications/collaboration gateway
    - Interface for comments, assignments, and platform-event notifications feeding the managed live-region reducer; mock implementation.
    - _Requirements: 22.1, 22.3, 22.4_
  - [ ] 41.8 Gateway contract tests against mocks
    - Verify each mock satisfies its interface contract and that the Domain Core rules (gate, redaction, writeback) are enforced at the boundary.
    - _Requirements: 8.2, 9.4, 12.7_

### Wiring the shell and surfaces

- [ ] 42. Global shell, routing, and recent-projects dashboard
  - Compose AppBar + SideNav + content outlet; path-based routing per the design route table; filter nav entries through `resolveCapabilities`; render the recent-projects Card grid with name/stage/substatus and EmptyState in Morpheus voice.
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 26.1_

  - [ ] 42.1 Interaction tests: nav capability filtering, active destination, empty dashboard
    - _Requirements: 1.4, 1.6, 26.1_

- [ ] 43. Project Overview and docked rail
  - Assemble StageTimeline + project subgraph (GraphCanvas) + VersionBranchRail + connector summary; state-derived Continue label; collapse to docked Sheet rail with expand; travel back into any prior stage episode.
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ] 43.1 Interaction tests for continue-state mapping and rail collapse/expand
    - _Requirements: 2.2, 2.4, 2.5_

- [ ] 44. Stage workspaces — Immerse & Uncover
  - Tabs (Work/History → HistoryTimeline); Immerse setup + connector intake + upload + OpportunityThesisEditor with submit validation (InlineMessage); Uncover PromptInput querying connectors + Memory, single-layer signal classification (Tag), AgentStatus managed live region, data-driven agent count, per-stage agent-assist badge.
  - _Requirements: 3.1, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

  - [ ] 44.1 Interaction tests: Immerse submit-blocking + Uncover agent-status live region
    - _Requirements: 4.5, 5.6_

- [ ] 45. Stage workspaces — Distill & Brief-Lock
  - Proposed Core Insight + emotional-layer scores (names from config) + proposed taxonomy with accept/edit/add; inline clone cross-reference; NarrativeSpineEditor; ConfidenceIndicator with below-threshold flag; laddersToThesis flagging; terminate in BriefLockGate.
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 20.4, 21.1, 27.8_

  - [ ] 45.1 Interaction tests: taxonomy edit, spine edit, lock gate wiring
    - _Requirements: 6.4, 6.7, 7.1_

- [ ] 46. Stage workspaces — Direct & Observe
  - Direct follows the pre-production sub-pipeline (Lock → Script → Storyboard → Final Render, R9.8): wire ScriptEditor for script derivation/editing/approval; wire StoryboardCanvas per deliverable for sketch generation/editing/approval; gate final render actions behind `canFinalRender(storyboard)` in addition to `canRender(scope, lineage)`; the "Life with [Brand]" deck renders as a composite deliverable (taxonomy + Data Humanism together, R9.9). Render actions enabled only while locked; each deliverable a projection leading with the thesis; internal/client-facing classification with Resonance-Layer exclusion; DeliverableEditor; recut via re-lock; export behind Publish-external with version pinning. Observe: observed-vs-projected per node, fidelity tiers, writeback via locked-or-ported, re-enter Immerse.
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10.1, 10.2, 10.3, 10.6, 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 32.1, 32.10, 33.1, 33.8_

  - [ ] 46.1 PBT — Property 21: stage transitions follow the circular pipeline (surface-level wiring)
    - **Property 21: Stage transitions follow the circular pipeline**
    - **Validates: Requirements 4.4, 5.5, 10.6**

  - [ ] 46.2 Interaction tests: render actions gated by lock; export gated by capability
    - _Requirements: 9.6, 23.3_

- [ ] 47. Node Detail, Memory Layer, Connectors, Lab, and Settings surfaces
  - Wire NodeDetailPanel route; Memory Layer (GraphCanvas + stats + search/filters + node panel) gated by Access-memory-layer; ConnectorGrid directory; Lab (CloneRunner + human testing column + crossover); Settings sections (Workspace, Members & Roles, Permissions, Billing & Tier, Integrations) with UsageCostView billing-gated.
  - _Requirements: 11.1, 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.8, 13.1, 14.1, 14.4, 15.6, 15.7, 24.2_

  - [ ] 47.1 Interaction tests: memory access gating, connector read-only mode, settings billing visibility
    - _Requirements: 12.8, 13.5, 15.7_

- [ ] 48. Collaboration and notifications wiring
  - Wire comments/assignments to stage History provenance; managed live-region notifications via the Domain Core dedupe reducer; visibility gated by view capability.
  - _Requirements: 22.1, 22.3, 22.5, 22.6, 22.7_

  - [ ] 48.1 Interaction tests: mention notification, once-per-event announcement
    - _Requirements: 22.2, 22.5_

- [ ] 49. Checkpoint — surfaces integrated
  - Ensure all surface/integration tests pass, ask the user if questions arise.

### Client portal + redaction

- [ ] 50. Client Portal wiring with redaction and three-mechanism gate
  - Wire `/portal/:token` to PortalShell; compose `redactForClient` on every node/report/deliverable projection and `redactGraphForClient({maxDepth:1})` on the Graph view; lead with the Opportunity Thesis (headline sizing, deep-dive on demand); enforce the capability → tier → partnership-unlock precedence for Login/Share/Download/Live-graph, rendering ungranted actions in a locked state with text.
  - _Requirements: 9.4, 11.2, 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8, 25.4, 27.9_

  - [ ] 50.1 PBT — Property 9: client redaction removes IP, clamps evidence, bounds graph depth (portal wiring)
    - **Property 9: Client redaction removes internal IP, clamps node evidence to one hop, and bounds graph depth**
    - **Validates: Requirements 9.4, 11.2, 16.2, 16.3, 23.2, 25.4**

  - [ ] 50.2 PBT — Property 10: live-graph access requires all three mechanisms in precedence (portal wiring)
    - **Property 10: Live-graph access requires all three mechanisms in precedence**
    - **Validates: Requirements 16.4, 16.5, 16.6, 16.7**

  - [ ] 50.3 Interaction tests: view-mode switching, locked-state actions with text
    - _Requirements: 16.1, 16.6_

### Cross-cutting accessibility verification (the gate)

- [ ] 51. Streaming text and AI-surface accessibility wiring
  - Wire StreamingText to announce at sentence/chunk boundaries via `aria-live="polite"` with a "jump to response end" affordance; ReasoningTrace collapsible with `aria-expanded` (not auto-read); confidence text+icon everywhere.
  - _Requirements: 18.7, 18.8, 18.9_

  - [ ] 51.1 PBT — Property 37: streaming text announces at sentence/chunk boundaries, never per token (integration)
    - **Property 37: Streaming text announces at sentence/chunk boundaries, never per token**
    - **Validates: Requirements 18.8**

- [ ] 52. Theming, motion, material, and reflow conformance
  - Verify dark/light via `data-theme` (dark default); reduced-motion substitutes the fallback on every transition; reduced-transparency/forced-colors/low-capability force Tier 2 solid; responsive xs–2xl with reflow to 320px and 200% zoom without loss or horizontal text scroll.
  - _Requirements: 18.2, 18.3, 18.4, 18.5_

  - [ ] 52.1 PBT — Property 38: material tier and motion resolve to fallbacks under reduced conditions (integration)
    - **Property 38: Material tier and motion resolve to fallbacks under reduced conditions**
    - **Validates: Requirements 18.4, 18.5**

- [ ] 53. Full keyboard-path and automated a11y sweep
  - Playwright keyboard-only traversal of each primary task; focus-not-obscured checks against sticky regions; jest-axe across all component/pattern stories; media-emulation passes for reduced-motion, reduced-transparency, and forced-colors; 200%/320px reflow.
  - _Requirements: 18.1, 18.3, 18.4, 18.5, 18.6, 18.11_

- [ ] 54. Final checkpoint — full suite and a11y gate
  - Run the complete unit + property + axe/keyboard suite and the frontend build; ensure the WCAG 2.2 AA gate passes. Ask the user if questions arise.

## Notes

- Every test, story, and a11y sub-task is required (comprehensive from the start). PBT sub-tasks each implement one design Correctness Property with fast-check (min 100 runs) and are tagged `// Feature: harmonx-platform, Property {n}: {title}`.
- All 51 correctness properties are covered by a PBT sub-task (Properties 1–51), placed next to the implementation they validate; some properties (9, 10, 21, 37, 38) also have an integration-level assertion where they cross a surface boundary.
- Every task references the requirement clause(s) it implements.
- No deployment/infrastructure tasks are included beyond the frontend build; server persistence, agent execution, and model inference are reached only through the mocked typed gateways.
