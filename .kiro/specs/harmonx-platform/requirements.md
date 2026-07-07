# Requirements Document — Harmonx — Brand Imprint™ Platform

## Introduction

Harmonx is an AI-native brand intelligence workspace and the productized form of the **Brand Imprint™ / Informed Brand Intelligence (IBI)** methodology. It decodes the psychological and cultural world a customer lives in, distills that world to one core insight, locks a human-validated brief, renders creative from that locked brief, observes real-world performance, and writes results back into a compounding memory graph.

The platform is built **using the Morpheus design system** (React 18 + TypeScript strict, Vite, Style Dictionary tokens, CSS Modules, Radix primitives, Storybook, Vitest + jest-axe). Every screen composes Morpheus components/patterns, references alias tokens only, is dark-first, declares all states, ships reduced-motion/transparency fallbacks, and passes the WCAG 2.2 AA gate.

The single governing architectural principle is the **anti-hallucination gate**: no AI *creative generation or rendering* occurs until a human locks a validated brief. (AI *analysis and assist* — connector queries, signal surfacing, clone gut-checks, proposed taxonomy — is permitted before lock; AI *render of deliverable creative* is not. This boundary is defined precisely in Requirement 8 and Open Question OQ-7.)

This document specifies requirements for the entire platform: global shell, project lifecycle, the five-stage pipeline (Immerse, Uncover, Distill, Direct, Observe), the Brief-Lock gate, version control and branching, node detail and the score lifecycle, the Memory Layer, Connectors and tiers, the Lab, permissions, the client portal, and cross-cutting design-system and accessibility conformance.

> **Note on sources.** This spec reconciles two sources of truth: the Notion "Resonate" workspace (business case + engine spec + connectors registry) and the Figma "Harmonx — Brand Imprint™ Platform — User Flow v1". Notion uses the legacy **Resonance/Resonate** brand; the product is now **Harmonx**. Where the two sources conflict or under-specify, the conflict is recorded in the **Open Questions & Tensions** section at the end rather than silently resolved.

## Glossary

- **Harmonx Platform**: The complete AI-native brand intelligence workspace described by this document.
- **Project**: A single brand/audience engagement that travels the five-stage pipeline. Has stages, branches, a project-scoped memory subgraph, and connectors.
- **Pipeline**: The circular five-stage methodology: Immerse → Uncover → Distill → Direct → Observe → (re-enters Immerse).
- **Stage**: One of the five pipeline phases. Each stage is a canvas workspace with Work and History tabs.
- **Stage Workspace**: The canvas for a stage, containing a **Work** tab (current work) and a **History** tab (provenance: inputs, change log, diffs).
- **Project Overview**: The landing surface when a project is opened; shows the stage timeline, branches, project memory subgraph, and connectors. Collapses to a docked rail.
- **Four-Layer Signal Taxonomy**: The taxonomy used in Uncover to classify raw signal: **Stated preference**, **Revealed behavior**, **Cultural velocity**, **Structural context**. (Distinct from the Emotional Layers.)
- **Emotional Layers**: The four named emotional dimensions — **Belonging, Identity, Trust, Meaning** — that form the emotional axis of the decoded audience profile (alongside stated/revealed behavior and cultural/structural context). Scored in Distill and served by creative taxonomy nodes. The layer names are stored as data/configuration so they can be edited later without redesign. (Distinct from the Four-Layer Signal Taxonomy.)
- **Agent**: An AI analysis unit that assists the decode. Agents span pipeline stages (most assist Uncover; the Validation Chain Agent acts at brief-lock; the Report Compiler acts in Direct). The active roster is data-driven; the canonical roster today is the 13 agents enumerated in the PRFAQ. The legacy "24-agent" label is retired; the AI-vs-human distinction is an org model, not a UI concept. Per-agent input/output behavior is deferred to a separate follow-up spec.
- **Core Insight**: The single distilled insight a project resolves to in Distill. Ladders up to the project's Opportunity Thesis (it is the distilled answer to the problem the thesis frames).
- **Opportunity Thesis**: The first-class artifact that frames *why* a project exists, authored in Immerse and refinable through Uncover, and **frozen into the brief at lock** (part of brief version v1.0). It comprises: the **durable use case / problem** being solved; the **target audience and rationale** (who and why them); the **evidence** backing the audience choice (what the data shows), linked to sources; the **opportunity sizing** (a high-level audience size + revenue estimate up front, with an on-demand TAM/SAM/SOM deep dive: addressable population → serviceable segment → obtainable target); and the **solution rationale** (why the end-to-end full-funnel approach solves it). Everything distilled ladders up to the Opportunity Thesis. Post-lock changes to the thesis occur through a recut (a new brief version), consistent with the immutable-freeze model.
- **Opportunity Sizing**: The sizing component of the Opportunity Thesis. A high-level figure (audience size + revenue estimate) is surfaced up front and is client-facing (the investment case); a detailed TAM/SAM/SOM breakdown is available on demand rather than immediately exposed.
- **Deliverable**: A rendered Direct output (Brand Imprint™ Report, "Life with [Brand]", sizzle reel, Data Humanism visual) produced as a projection of the locked brief. Deliverables are editable in-system and via external round-trip, and carry their own version history.
- **Deliverable Version**: An entry in a deliverable's edit history. Every edit — human text change, image replacement, or AI re-render — produces a new Deliverable Version so the edit trail of a distilled project is inspectable.
- **Live Link**: The canonical, in-system, view-only URL for a deliverable. When a deliverable is opened in an external editor (for example, Word or Figma), the Harmonx copy remains the canonical live link; external edits do not silently overwrite it.
- **Creative Taxonomy Node** (**Node**): A unit of the creative asset taxonomy attached to a brief. Carries category, asset type, interpretation, asset render, Resonance Layer, served emotional layers, evidence backlinks, defense copy, and a score lifecycle.
- **Resonance Layer**: The governing behavioral principle attached to a node. **Core IP — internal only**; never exposed in client-facing surfaces.
- **Brief**: The locked artifact comprising the core insight, the emotional-layer scores, and the human-reviewed creative taxonomy nodes.
- **Brief-Lock Gate** (**Lock**): The human commit point that freezes the brief as a version (v1.0) and is the precondition for AI creative rendering in Direct.
- **Score Lifecycle**: The per-node sequence of increasingly costly, increasingly true scores: **Projected → Clone read → Tested → Observed** (four steps). **Crossover** is a separate generalization verdict attached to an insight/node — not a fifth inline step (resolved; see OQ-3).
- **Memory Layer**: The global, cross-project neural/Obsidian-style graph of nodes and backlinks. The compounding asset. Only locked or ported work writes back.
- **Memory Subgraph**: The slice of the Memory Layer that a single project touches.
- **Connector**: A data/tool source that feeds one or more stages. Organized into categories and investment tiers.
- **Tier**: An investment level (Bootstrap, Foundation, Professional, Full Stack) that gates which connectors and asset coverage are available.
- **Provisioning Mode**: How a connector's contract, credential, and entitlement are supplied. One of three: **Platform-managed** (Harmonx holds the contract/credentials and meters usage into tier pricing), **Client-supplied / BYO** (the client supplies their own account/key and entitlement), or **Pass-through** (per-project field research procured and billed through to the client). Provisioning mode is a licensing/billing attribute distinct from a connector's category and tier; it exists because many syndicated sources prohibit resale or redistribution, which forces client-supplied provisioning for those sources.
- **Lab**: Standalone experimentation surface running Digital Clones, the Scenario Runner, Human Testing, and the General-Market Crossover test.
- **Digital Clone** (**Clone**): A persona-agent seeded from a decoded memory-layer profile. Clone output is signal, not proof.
- **Branch**: A project-level sandbox copy of a locked brief (e.g. v1.0·b) for experimentation. Never the memory graph.
- **Port**: A human lifting a single node across branches. No automatic merge.
- **Capability**: An atomic, grantable permission (e.g. Approve-gate, Edit project, Branch & port).
- **Role**: A named bundle of capabilities (Admin, Strategist, Analyst, Producer, Client).
- **Client Portal**: The tier-gated, client-facing "Life with [Brand]" view. Exposes taxonomy + one evidence hop + defense copy; never the Resonance Layer or full graph unless partnership-unlocked.
- **Strategy Lead**: Not a distinct role, but whichever role bundles the **Approve-gate** capability (Strategist and/or Admin). The brief-lock gate is gated on the capability, not on a role literally named "Strategy Lead" (resolved; see OQ-5).
- **Render Engine**: The post-lock generative-creative layer that produces deliverable assets (image, video, audio, copy) for creative taxonomy nodes. Driven by Generative Model Connectors; operates only after a brief is locked (governed by Requirement 8).
- **Generative Model Connector**: A connector whose output is generated creative (image, video, audio/music, or copy), distinct from input, measurement, and deployment connectors. Powers asset render in Direct and Node Detail. Vendor-agnostic and pluggable (no vendor names in the spec). Carries a **commercial-licensing/clearance attribute** describing the rights status of assets the model produces.
- **Clearance Status**: The commercial-licensing/rights state of a rendered asset, derived from the generative model connector that produced it (for example, cleared-for-commercial-use, requires-review, or restricted). Surfaced on rendered assets and governed under Requirement 25.
- **Data-Faithfulness**: The guarantee that carries the Data Humanism visual (see Requirement 19). A Data Humanism render is a **hybrid**: a deterministic **data substrate** (a programmatic projection of the locked brief's real quantitative values — emotional-layer scores, projected-vs-observed deltas, resonance scores) with an **AI styling layer** applied on top. Data-Faithfulness is the property that the styling layer MAY alter aesthetic treatment but SHALL NOT alter the underlying data values or their quantitative encoding (bar heights, proportions, and positions that carry meaning), so the rendered visual remains a truthful representation of the deterministic data substrate. This guarantee is specific to the Data Humanism hybrid; purely-generative outputs (image, video, audio, copy) do not carry it.
- **Confidence**: A quantified, text-surfaced measure of certainty attached to a Core Insight or a node score.
- **Narrative Spine**: A first-class Distill artifact: an authored/derived, ordered arc that sequences creative taxonomy nodes into a coherent "Life with [Brand]" story. Authored or derived during Distill, human-edited (accept/edit/add), and **frozen into the brief at lock** as part of brief version v1.0 — not assembled at Direct. The spine is modeled as an ordered sequence of **Beats**; every beat must ladder to the single Core Insight. Each Direct deliverable (Brand Imprint Report, "Life with [Brand]", sizzle reel, Data Humanism visual) is a **projection** of the frozen Narrative Spine into a format, not an independent generation job.
- **Beat** (**Narrative Beat**): An ordered element of the Narrative Spine. Each beat binds {a moment in the persona's day} → {the node(s) that play in that moment} → {the emotional layer(s) it moves} → {the evidence backlinks + defense copy that justify it}, and must ladder to the single Core Insight.
- **Projection**: A rendering of the frozen Narrative Spine (or of the brief) into a specific deliverable format. The client-portal view modes are projections: **Chronological** = the Narrative Spine order, **Linear** = the report sections, **Graph** = the project memory subgraph. A projection re-presents committed brief content in a format; it does not author new narrative content.
- **Crossover Hypothesis**: A statement attached to a Core Insight predicting whether and how the community-decoded insight generalizes to a broader/general-market audience; tested in the Lab to produce the crossover verdict and score (per Requirement 14).
- **Notification**: A managed, per-user alert for a meaningful platform event (agent-run completion, brief lock, observed-data arrival, assignment, or mention).
- **Audit Log**: An append-only record of capability-gated actions (lock, port, publish, export, connector activation, permission change) maintained for governance and review.
- **Creative Render**: The act of generating or persisting a deliverable creative asset (image, video, audio, or copy intended for a deliverable or client-facing surface). This is the precise boundary of the anti-hallucination gate: Creative Render is permitted only after a brief is locked; all other AI use (analysis and assist) is permitted pre-lock (see Requirement 8 and OQ-6).
- **Script**: A detailed narrative expansion of the frozen Narrative Spine produced post-lock as part of the Direct stage's pre-production sub-pipeline. Each spine beat becomes a Script Scene with scene direction, visual/audio notes, transitions, pacing, tone, and copy direction. One script is the shared source for ALL deliverables (sizzle reel, creative taxonomy deck, Data Humanism visual). Script generation is classified as analysis/assist (not Creative Render). The script must be approved before storyboard generation can begin.
- **Script Scene**: A single scene within the Script, expanding one Narrative Beat into production-ready direction. Contains scene direction, visual notes, audio notes, transitions, pacing, tone, and copy direction.
- **Storyboard**: A per-deliverable visual pre-visualization produced post-script-approval. Each storyboard is a sequence of Storyboard Frames showing sketch-level representations of what the final render will look like for a specific deliverable format. Storyboard generation is a lightweight Creative Render (sketch-level, uses model connectors post-lock).
- **Storyboard Frame**: A single frame within a Storyboard — a sketch-level visual representation of a Script Scene interpreted for a specific deliverable format (sizzle frame = video still; deck frame = slide layout; Data Humanism frame = chart sketch).
- **Composite Deliverable**: A deliverable that combines multiple output types into one artifact. The "Life with [Brand]" / creative taxonomy deck is a composite: it includes the applied creative taxonomy (rendered nodes per beat, per the script/storyboard) AND the Data Humanism visual (the styled data portrait) together in one artifact, not as separate downloads.

## Requirements

### Requirement 1: Global Shell & Navigation

**User Story:** As a platform user, I want a consistent global shell with primary navigation and a recent-projects dashboard, so that I can orient myself and move between the major areas of the workspace.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL render a persistent left navigation containing the destinations: Projects, Memory Layer, Lab, Connectors, and Settings.
2. WHEN a user opens the homepage, THE Harmonx Platform SHALL display a recent-projects dashboard composed of project cards.
3. WHERE a project card is displayed, THE Harmonx Platform SHALL show the project name and its current stage with stage substatus (for example, "Distill · brief-lock pending").
4. WHEN a user selects a left-navigation destination, THE Harmonx Platform SHALL navigate to that destination and indicate the active destination in the navigation.
5. THE Harmonx Platform SHALL render the shell using Morpheus components and alias tokens only, with no raw color, spacing, or timing literals.
6. WHILE a destination is not permitted for the current user's capabilities, THE Harmonx Platform SHALL hide or disable that destination's navigation entry rather than render an inaccessible surface.

### Requirement 2: Project Lifecycle & Overview

**User Story:** As a strategist, I want a project overview that shows where a project is in its lifecycle and lets me re-enter any prior episode, so that I can navigate the work without losing provenance.

#### Acceptance Criteria

1. WHEN a user opens a project, THE Project Overview SHALL display the stage timeline, the project's branches, the project memory subgraph, and the project's connectors.
2. THE Project Overview SHALL present a single primary "Continue" affordance whose label is determined by project state: "Start → Immerse" for a new project, "Continue → {current stage}" for a mid-flight project, and "Review" for a shipped project.
3. WHEN a user selects a stage in the timeline, THE Project Overview SHALL open that stage's Stage Workspace.
4. WHEN a Stage Workspace is opened from the Project Overview, THE Project Overview SHALL collapse to a docked rail.
5. WHEN a user activates the expand control on the docked rail, THE Project Overview SHALL expand to full screen.
6. THE Project Overview SHALL allow a user to travel back into any prior stage episode that exists for the project.
7. WHERE the project memory subgraph contains nodes, THE Project Overview SHALL render the subgraph using the same graph semantics as the Memory Layer.

### Requirement 3: Stage Workspace & Provenance (History)

**User Story:** As an analyst, I want every stage to record what fed it and every human judgment, so that any decision is auditable and re-enterable.

#### Acceptance Criteria

1. THE Stage Workspace SHALL present two tabs for each stage: Work and History.
2. WHEN a user opens the History tab, THE Stage Workspace SHALL display what fed the stage (its inputs), a change log, and diffs.
3. WHERE a change-log entry exists, THE Stage Workspace SHALL record who made the change, when it occurred, and whether the change was made by a human or by the system.
4. WHEN a human judgment modifies stage content, THE Stage Workspace SHALL record a re-enterable diff for that judgment.
5. WHEN a user selects a historical diff, THE Stage Workspace SHALL allow the user to re-enter the state represented by that diff.

### Requirement 4: Stage 1 — Immerse

**User Story:** As a strategist, I want to set up the brand world and intake baseline and external data, so that the decode has a grounded starting point.

#### Acceptance Criteria

1. WHEN a user starts Immerse, THE Immerse Stage SHALL provide inputs for company/project setup and a persona/demographic baseline.
2. THE Immerse Stage SHALL allow a user to intake data from the project's connected connectors.
3. THE Immerse Stage SHALL allow a user to upload external research artifacts.
4. WHEN a user submits the Immerse stage, THE Harmonx Platform SHALL advance the project to the Uncover stage.
5. IF required setup fields (company/project setup, persona/demographic baseline) are incomplete, THEN THE Immerse Stage SHALL prevent submission and identify the incomplete fields in text.
6. THE Immerse Stage SHALL allow a user with edit capability to author the Opportunity Thesis — the durable use case/problem, the target audience and rationale, the supporting evidence, the opportunity sizing, and the solution rationale — and SHALL allow the thesis to be modified while the project remains in Immerse (per Requirement 27).

### Requirement 5: Stage 2 — Uncover

**User Story:** As an analyst, I want to decode psychological and cultural signal across a four-layer taxonomy with agent assistance, so that raw signal is surfaced and organized before distillation.

#### Acceptance Criteria

1. THE Uncover Stage SHALL allow a user to run queries against the project's connectors and the Memory Layer.
2. THE Uncover Stage SHALL allow a user to add external data to the decode.
3. WHEN signal is surfaced, THE Uncover Stage SHALL classify each signal item under exactly one of the Four-Layer Signal Taxonomy layers: Stated preference, Revealed behavior, Cultural velocity, or Structural context.
4. THE Uncover Stage SHALL provide agent-assisted decoding over the surfaced signal and SHALL display the active agent count derived from the agent roster (for example, "13-agent decode" for the current roster) rather than a hard-coded number.
5. WHEN a user submits the Uncover stage, THE Harmonx Platform SHALL advance the project to the Distill stage.
6. WHILE agent assistance is producing output, THE Uncover Stage SHALL surface agent status through a managed live region that announces meaningful state changes once each.
7. WHERE agents act at a pipeline stage (for example, the Validation Chain Agent at brief-lock or the Report Compiler in Direct), THE Harmonx Platform SHALL display a per-stage agent-assist badge indicating that agents act at that stage.
8. THE Uncover Stage SHALL allow a user with edit capability to refine the Opportunity Thesis as surfaced signal substantiates or challenges the audience choice, evidence, or sizing (per Requirement 27).

### Requirement 6: Stage 3 — Distill

**User Story:** As a strategist, I want signal to resolve into one core insight with scored emotional layers and a proposed creative taxonomy I can edit, so that I can commit a validated brief.

#### Acceptance Criteria

1. THE Distill Stage SHALL resolve surfaced signal into a proposed Core Insight.
2. THE Distill Stage SHALL score the four Emotional Layers — Belonging, Identity, Trust, and Meaning — for the project, reading the layer names from configuration rather than hard-coding them.
3. THE Distill Stage SHALL propose a creative taxonomy of nodes derived from the signal.
4. THE Distill Stage SHALL allow a user with edit capability to accept, edit, or add creative taxonomy nodes.
5. THE Distill Stage SHALL provide an inline clone cross-reference for fast gut-checks of nodes against decoded clones.
6. WHEN the brief is locked, THE Distill Stage SHALL freeze the Opportunity Thesis, the Core Insight, the Emotional-Layer scores, the creative taxonomy, and the Narrative Spine as brief version v1.0.
7. THE Distill Stage SHALL terminate in the Brief-Lock gate as its commit point.
8. THE Distill Stage SHALL author or derive the Narrative Spine as an ordered sequence of beats (per Requirement 21) before lock, so that the spine is human-edited and validated within Distill rather than assembled at the Direct stage.
9. THE Distill Stage SHALL require the proposed Core Insight to ladder to the project's Opportunity Thesis and SHALL flag in text a Core Insight that does not resolve the problem the thesis frames (per Requirement 27).

### Requirement 7: Brief-Lock Gate

**User Story:** As a Strategy Lead, I want a deliberate lock gate with a pre-lock checklist and an explicit approval step, so that nothing is rendered until a human has validated and committed the brief.

#### Acceptance Criteria

1. WHEN a user initiates a lock, THE Brief-Lock Gate SHALL present a confirmation modal stating that locking freezes everything below as v1.0 and that Direct renders occur only after lock.
2. THE Brief-Lock Gate SHALL display what is being locked: the creative taxonomy nodes, the emotional layers, and the core insight.
3. THE Brief-Lock Gate SHALL present a pre-lock checklist covering: Opportunity Thesis present, evidence-backed, and sized; baselines/projected scores set; taxonomy human-reviewed; defense copy present per node; and connector coverage confirmed.
4. IF any pre-lock checklist item is unmet, THEN THE Brief-Lock Gate SHALL prevent the lock and identify the unmet items in text.
5. IF the acting user does not hold the Approve-gate capability, THEN THE Brief-Lock Gate SHALL prevent the lock regardless of the user's edit capability.
6. WHEN a user holding the Approve-gate capability confirms the lock with all checklist items met, THE Brief-Lock Gate SHALL commit the brief as version v1.0 and record the approver and timestamp.
7. WHILE a brief is not locked, THE Harmonx Platform SHALL prevent the Direct stage from producing creative renders.

### Requirement 8: AI Generation Gating (Anti-Hallucination Architecture)

**User Story:** As a platform owner, I want AI creative rendering to be architecturally impossible before a brief is locked, so that the system cannot hallucinate deliverables from unvalidated input.

#### Acceptance Criteria

1. WHILE a brief version is not in a locked state, THE Harmonx Platform SHALL refuse all creative-render generation requests for that brief.
2. WHEN a creative-render generation request is made, THE Harmonx Platform SHALL verify the existence of a locked brief version before initiating rendering.
3. THE Harmonx Platform SHALL permit pre-lock AI analysis and assist functions (connector queries, signal classification, agent-assisted decoding, proposed taxonomy, inline clone cross-reference, confidence scoring, and narrative-spine suggestions) without requiring a lock.
4. IF a creative-render request references a brief whose lock has been superseded or removed, THEN THE Harmonx Platform SHALL refuse the request and report the missing-lock condition in text.
5. THE Harmonx Platform SHALL define a creative-render request as a request to generate or persist a deliverable creative asset (image, video, audio, or copy intended for a deliverable or client-facing surface), and SHALL NOT classify analysis or assist functions as creative-render requests. (Resolves OQ-6: the gate is drawn at rendering a deliverable asset, not at any model call.)

### Requirement 9: Stage 4 — Direct

**User Story:** As a producer, I want to render internal and client-facing outputs from a locked brief and recut via re-lock, so that all deliverables trace to a committed brief.

#### Acceptance Criteria

1. WHILE a brief is locked, THE Direct Stage SHALL allow generation of the Brand Imprint™ Report (internal), the "Life with [Brand]" output (client-facing), the Sizzle reel, and the Data Humanism visual.
2. THE Direct Stage SHALL produce each deliverable as a projection of the frozen Narrative Spine and creative taxonomy from the locked brief, and SHALL NOT author or re-sequence the Narrative Spine at the Direct stage.
3. THE Direct Stage SHALL classify each output as internal or client-facing.
4. WHERE an output is client-facing, THE Direct Stage SHALL exclude the Resonance Layer from that output.
5. WHEN a user performs a re-lock to recut, THE Direct Stage SHALL produce an incremented brief version (for example, v1.1).
6. IF no locked brief exists, THEN THE Direct Stage SHALL present no render actions and SHALL state that a locked brief is required.
7. WHEN producing a deliverable, THE Direct Stage SHALL lead with the Opportunity Thesis framing (problem, audience rationale, evidence, and high-level sizing) before the distilled artifacts, as the cover of the projection (per Requirement 27).
8. THE Direct Stage SHALL follow a pre-production sub-pipeline within the locked state: **Lock → Script → Storyboard → Final Render** (per Requirements 32 and 33). The Script is a shared source for all deliverables; Storyboards are per-deliverable; Final Render is gated behind storyboard approval.
9. THE Direct Stage SHALL treat the "Life with [Brand]" / creative taxonomy deck as a **Composite Deliverable** that includes BOTH the applied creative taxonomy (rendered nodes per beat, per the script/storyboard) AND the Data Humanism visual (the styled data portrait) together in one artifact, not as separate downloads.

### Requirement 10: Stage 5 — Observe

**User Story:** As an analyst, I want to compare observed performance to projections per node and write results back to memory, so that the graph compounds and the project re-enters the pipeline.

#### Acceptance Criteria

1. WHEN performance data is available, THE Observe Stage SHALL display observed versus projected values per node.
2. THE Observe Stage SHALL support two observed fidelity tiers: public signal and owned-platform.
3. WHEN a project's work is locked or ported, THE Observe Stage SHALL write that work back to the Memory Layer.
4. IF a node's work is neither locked nor ported, THEN THE Observe Stage SHALL exclude that work from Memory Layer writeback.
5. WHEN observed performance descends from a locked-or-ported lineage, THE Observe Stage SHALL write it back to the Memory Layer; IF observed performance exists only on a branch that is never re-locked or ported, THEN THE Observe Stage SHALL exclude it from writeback. (Resolves OQ-8.)
6. WHEN Observe completes, THE Harmonx Platform SHALL allow the project to re-enter the Immerse stage.

### Requirement 11: Node Detail & Score Lifecycle

**User Story:** As a strategist, I want a full node detail view with its evidence, defense copy, and score lifecycle, so that I can review and defend every creative decision.

#### Acceptance Criteria

1. WHEN a user opens a creative taxonomy node, THE Node Detail SHALL display category, asset type, interpretation for this brand, asset render, Resonance Layer, served emotional layers (drawn from Belonging, Identity, Trust, Meaning), evidence backlinks, defense copy, and the score lifecycle.
2. WHERE the Resonance Layer is displayed, THE Node Detail SHALL mark it as internal-only and SHALL exclude it from client-facing surfaces.
3. THE Node Detail SHALL provide asset-render actions: regenerate, upload, edit, and expand.
4. WHILE no locked brief exists for the node, THE Node Detail SHALL disable the regenerate action.
5. THE Node Detail SHALL display the score lifecycle in order: Projected, Clone read, Tested, Observed.
6. WHERE evidence backlinks exist, THE Node Detail SHALL link each to its source (persona, citation, or connector) with a discernible accessible name.
7. WHEN a score advances to a later lifecycle step, THE Node Detail SHALL retain the prior step's value so that the delta between steps is computable.

### Requirement 12: Memory Layer

**User Story:** As a strategist, I want a global cross-project memory graph with search, filters, and a cross-project lens, so that decoded knowledge compounds into a rentable asset.

#### Acceptance Criteria

1. THE Memory Layer SHALL render a global graph of nodes and backlinks across projects.
2. THE Memory Layer SHALL display aggregate statistics including node count, project count, and backlink count.
3. THE Memory Layer SHALL provide search over nodes.
4. THE Memory Layer SHALL provide filters by project, emotional layer, source/connector, and performance delta.
5. WHEN a user selects a node that appears in multiple projects, THE Memory Layer SHALL present a cross-project lens showing the per-project appearances of that node.
6. WHEN a user opens a node panel, THE Memory Layer SHALL display appears-in (with per-project delta), backlinks, and performance writeback.
7. THE Memory Layer SHALL admit writeback only from work that is locked or ported.
8. WHILE a user lacks the Access-memory-layer capability, THE Harmonx Platform SHALL prevent access to the Memory Layer.

### Requirement 13: Connectors & Tiers

**User Story:** As an admin, I want a connector directory organized by category, tier, and the stages each connector feeds, so that I can manage data coverage and know when to upgrade.

#### Acceptance Criteria

1. THE Connectors directory SHALL list all available connectors grouped by category and investment tier.
2. WHERE a connector is listed, THE Connectors directory SHALL tag which pipeline stages it feeds (Immerse, Uncover, Distill, Direct, Observe).
3. THE Connectors directory SHALL present the investment tiers Bootstrap, Foundation, Professional, and Full Stack with the connectors available at each.
4. WHEN a project's required asset taxonomy needs coverage the current tier cannot feed, THE Connectors directory SHALL surface an upgrade trigger identifying the coverage gap.
5. WHILE a user lacks the Manage-connectors capability, THE Connectors directory SHALL present connectors as read-only.
6. WHERE a connector is partnership-gated (for example, Performance/Owned sources), THE Connectors directory SHALL indicate the gated status and SHALL prevent activation without the partnership unlock.
7. WHERE connector, category, touchpoint, or asset-type counts are displayed, THE Connectors directory SHALL derive those counts from the connector registry so that adding or removing connectors updates the displayed counts without code changes.
8. THE Connectors directory SHALL allow a connector to be provisioned in one of three provisioning modes — platform-managed, client-supplied (BYO), or pass-through — and SHALL display the active provisioning mode for each connector.
9. WHERE a connector is in platform-managed mode, THE Harmonx Platform SHALL meter its usage into the project's tier pricing, consistent with Requirement 24.
10. WHERE both a client-supplied credential and a platform-managed credential exist for the same source, THE Harmonx Platform SHALL prefer the client-supplied credential, so as to respect the client's license and avoid double-billing.
11. WHERE a source's license prohibits redistribution or resale, THE Harmonx Platform SHALL require client-supplied or pass-through provisioning for that source, SHALL NOT serve that source in platform-managed mode, and SHALL prevent platform-managed reuse of that source across clients.

### Requirement 14: Lab — Clones, Scenario Runner, Human Testing, Crossover

**User Story:** As an analyst, I want a Lab to pre-test concepts with clones, confirm with humans, and test crossover, so that weak ideas are killed cheaply before spend and ground truth confirms what ships.

#### Acceptance Criteria

1. THE Lab SHALL provide Digital Clones seeded from decoded memory-layer profiles.
2. WHEN a user runs the Scenario Runner with a chosen stimulus and clones, THE Lab SHALL produce clone reactions, clone reasoning, a clone-read score, and an A/B variant comparison.
3. THE Lab SHALL present a synthetic resonance summary of a clone run.
4. THE Lab SHALL provide a Human Testing column comprising the advisory council (paid, veto power), a recruited segment, and a live A/B small spend.
5. WHEN human testing produces a result, THE Lab SHALL write a Tested score back to the Memory Layer.
6. WHEN a community-decoded insight is run against general-market clones, THE Lab SHALL produce a crossover read and a crossover score and SHALL write the crossover score to the Memory Layer.
7. THE Lab SHALL label clone results as signal and SHALL state in text that human testing is the confirming ground truth.
8. WHERE the Lab is offered inline within Distill, THE Lab SHALL provide the lightweight clone cross-reference without requiring the user to leave the Distill stage.

### Requirement 15: Permissions & Capabilities

**User Story:** As an admin, I want capability-based access bundled into roles with a clear separation between approving and editing, so that authority is precise and extensible.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL model access as atomic capabilities including: Edit project, Approve-gate/lock-brief, Branch & port nodes, Publish external, Manage connectors, Access memory layer, and View (read-only).
2. THE Harmonx Platform SHALL bundle capabilities into the roles Admin, Strategist, Analyst, Producer, and Client.
3. THE Harmonx Platform SHALL treat the Approve-gate capability as distinct from the Edit-project capability.
4. WHEN a new capability is added, THE Harmonx Platform SHALL register it into the permissions grid without requiring roles to be rebuilt.
5. WHEN a user attempts an action, THE Harmonx Platform SHALL permit the action only if the user's role bundle includes the required capability.
6. THE Settings area SHALL provide sections for Workspace, Members & Roles, Permissions, Billing & Tier, and Integrations (Notion, Figma, Drive, and data connectors).
7. WHERE billing-related information is shown, THE Settings area SHALL expose it only to roles holding a billing-visible capability.

### Requirement 16: Client Portal — "Life with [Brand]"

**User Story:** As a client, I want a tier-gated portal to explore my brand's "Life with [Brand]" view, so that I can understand the work without accessing internal IP.

#### Acceptance Criteria

1. THE Client Portal SHALL provide view modes: Graph, Linear, and Chronological, where the Chronological view follows the frozen Narrative Spine order, the Linear view follows the report sections, and the Graph view presents the project memory subgraph.
2. WHEN a client opens a node in the portal, THE Client Portal SHALL display the node's taxonomy, exactly one evidence hop, and the defense copy.
3. THE Client Portal SHALL exclude the Resonance Layer and the full graph from the default client view.
4. WHERE live graph access is requested, THE Client Portal SHALL grant it only on partnership unlock.
5. THE Client Portal SHALL gate the actions Login, Share, Download, and Live graph by the client's tier and unlock status.
6. WHILE a portal action is not permitted by the client's tier, THE Client Portal SHALL present that action in a locked state with a text indication of the gate.
7. WHEN gating live-graph access, THE Client Portal SHALL evaluate three mechanisms in precedence order and SHALL grant access only if all pass: (1) the acting party holds the required capability (Publish-external to grant; client View to consume), (2) the client's tier makes the portal visible, and (3) an explicit partnership unlock is set on top of tier. (Resolves OQ-9.)
8. THE Client Portal SHALL present the Opportunity Thesis problem statement, audience rationale, evidence, and a high-level opportunity-size figure (audience size + revenue estimate) as the investment case, and SHALL make the detailed TAM/SAM/SOM breakdown available on demand rather than exposing it immediately (per Requirement 27).

### Requirement 17: Version Control & Branching

**User Story:** As a strategist, I want version control over the locked back-half of a project with branching and manual porting, so that experimentation never corrupts the source of truth or the memory graph.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL treat the Locked Brief v1.0 as the single source of truth governing the Distill → Direct → Observe back-half.
2. WHEN a user clones a locked brief into a branch, THE Harmonx Platform SHALL create a project-level sandbox version (for example, v1.0·b) and SHALL NOT modify the Memory Layer.
3. WHEN a user re-locks on a branch, THE Harmonx Platform SHALL commit the re-lock on that branch and SHALL NOT modify the original brief.
4. WHEN a user ports a node across branches, THE Harmonx Platform SHALL transfer only the human-selected node and SHALL NOT perform an automatic merge.
5. WHEN a client deliverable is shipped, THE Harmonx Platform SHALL pin the shipped deck at v1.0 and SHALL change its version only on a deliberate recut to v1.1.
6. THE Harmonx Platform SHALL admit Memory Layer writeback only from locked or ported work.
7. THE Harmonx Platform SHALL apply this version scheme: a locked mainline is `v1.0` (next mainline recut `v1.1`); a branch appends a letter suffix (`v1.0·b`, `v1.0·c`); a re-lock on a branch increments a branch-local counter (`v1.0·b.1`, `v1.0·b.2`). (Resolves OQ-10.)
8. WHEN a node is ported across branches, THE Harmonx Platform SHALL retain on the ported node a back-reference to its origin brief version and SHALL NOT perform an automatic merge.

### Requirement 18: Design-System & Accessibility Conformance (Cross-Cutting)

**User Story:** As a design-system steward, I want every Harmonx surface to conform to Morpheus and pass WCAG 2.2 AA, so that accessibility is a gate rather than a polish pass.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL build every surface from existing Morpheus components and layout primitives, referencing alias tokens only, with no raw color, spacing, or timing literals.
2. THE Harmonx Platform SHALL render correctly in both dark and light themes via the `data-theme` attribute, with dark as default.
3. THE Harmonx Platform SHALL be responsive across the Morpheus breakpoints xs through 2xl and SHALL reflow to a 320px CSS width and to 200% zoom without loss of content or horizontal text scrolling.
4. WHILE `prefers-reduced-motion` is set, THE Harmonx Platform SHALL substitute the reduced-motion fallback for every animated transition.
5. WHILE `prefers-reduced-transparency` or a low-capability/forced-colors condition is detected, THE Harmonx Platform SHALL render material surfaces at the solid (Tier 2) fallback.
6. THE Harmonx Platform SHALL provide a full keyboard path through each primary task with a visible focus indicator throughout, and SHALL NOT obscure the focused element behind sticky regions.
7. WHERE status or confidence is conveyed, THE Harmonx Platform SHALL convey it with text and icon, never by color alone.
8. WHEN AI text streams to the interface, THE Harmonx Platform SHALL announce it to assistive technology at sentence or chunk boundaries via `aria-live="polite"` rather than per token, and SHALL provide a "jump to response end" affordance.
9. WHERE reasoning or thinking traces are shown, THE Harmonx Platform SHALL render them collapsible with `aria-expanded` and SHALL NOT auto-read them.
10. WHERE tool-call or citation cards are shown, THE Harmonx Platform SHALL use real semantic elements with sources as real links bearing discernible names.
11. WHERE sound or haptic feedback is offered, THE Harmonx Platform SHALL default it off and SHALL provide a visual equivalent.
12. THE Harmonx Platform SHALL persist application state (projects, briefs, graph, and user preferences) server-side, and SHALL NOT use browser storage APIs within sandboxed render-preview surfaces (for example, the asset-render iframe in Direct and Node Detail). (Resolves OQ-7.)
13. WHEN a destructive or irreversible action is initiated, THE Harmonx Platform SHALL provide an undo or an error-prevention confirmation before committing.

### Requirement 19: Generative Creative Render Engine & Model Connectors

**User Story:** As a producer, I want a generative render engine driven by model connectors that turns locked-brief nodes into image, video, audio, and copy assets, so that deliverables are produced from a validated brief rather than improvised.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL provide a Generative Model Connector class — distinct from input, measurement, and deployment connectors — that produces (rather than reads) creative, spanning the purely-generative modalities Image, Video, Audio (music and voice), and Copy; and THE Harmonx Platform SHALL model the Data Humanism visualization as a **hybrid** deliverable (a deterministic data substrate with an AI styling layer, per 19.10, 19.13, 19.14, and 19.15) rather than as a purely-generative modality.
2. WHERE a creative taxonomy node maps to an asset type, THE Render Engine SHALL select generative model connectors capable of producing that asset type's media (visual, audio, verbal, or data-humanism visualization).
3. WHILE no locked brief exists for a node, THE Render Engine SHALL refuse to render that node's asset, consistent with Requirement 8.
4. WHEN a user invokes regenerate on a node that has a locked brief, THE Render Engine SHALL produce a new asset render and SHALL retain the prior render as a version.
5. WHERE a required asset type has no generative model connector available at the project's tier, THE Render Engine SHALL surface the coverage gap and SHALL NOT substitute an unrelated model.
6. WHEN an asset is rendered, THE Render Engine SHALL derive the render prompt from the locked brief — the node interpretation, the Resonance Layer, the served emotional layers, and the defense copy — and SHALL NOT accept a free-typed render prompt.
7. WHEN an asset is rendered, THE Render Engine SHALL provenance-stamp it with the generative model connector used, the locked brief version, and the derived prompt, and SHALL write that provenance to both the Audit Log and the Memory Layer.
8. THE Render Engine SHALL meter each generation as a usage event, consistent with Requirement 24.
9. THE Render Engine's Audio modality SHALL include generative music conditioned on the decoded persona profile — its emotional layers, cultural/structural context, and behavioral-KB parameters (for example, tempo and affect) — alongside voice/TTS.
10. THE Render Engine SHALL produce the Data Humanism visualization's **data substrate** deterministically as a programmatic projection of the locked brief's real quantitative values (emotional-layer scores, projected-vs-observed deltas, and resonance scores), such that the same locked brief yields the same data mapping and encodings reproducibly, and SHALL NOT use a generative model for this data-substrate layer.
11. THE Harmonx Platform SHALL attach a commercial-licensing/clearance attribute to each Generative Model Connector, and SHALL keep model selection vendor-agnostic and pluggable.
12. WHEN an asset is rendered, THE Render Engine SHALL surface the clearance status of that asset, derived from the producing connector's clearance attribute, consistent with Requirement 25.
13. WHERE a Data Humanism visualization is produced, THE Render Engine SHALL apply an AI-generated styling layer to the deterministic data substrate, conditioned on curated visual references in the W.E.B. Du Bois / Giorgia Lupi lineage (reference images maintained as style-conditioning assets), and SHALL keep this styling conditioning vendor-agnostic and pluggable.
14. WHILE applying the styling layer to a Data Humanism visualization, THE Render Engine SHALL preserve data-faithfulness: the styling layer MAY alter aesthetic treatment but SHALL NOT alter the underlying data values or their quantitative encoding (bar heights, proportions, and positions that carry meaning), so that the rendered visual remains a truthful representation of the deterministic data substrate.
15. WHEN a Data Humanism visualization is produced, THE Render Engine SHALL route the styled visual through the Brief-Lock gate as a Creative Render (consistent with Requirements 8 and 9) and SHALL attach both a clearance status and a data-faithfulness guarantee to it, the data-faithfulness guarantee being an assurance that purely-generative outputs do not carry.

> **Non-normative note (recommended default stack).** Model selection is vendor-agnostic and pluggable; the concrete model roster lives in a separate connector document, not in this spec. As provenance for that document, the current recommended commercially-licensed default stack is **Adobe Firefly** (image), **Google Veo 3.1** (video), **ElevenLabs Music** (music), and **ElevenLabs** (voice). Rationale: for client deliverables, **licensing cleanliness outranks raw output quality** — a slightly weaker but clearly cleared model is preferable to a stronger model with ambiguous commercial rights. This list is illustrative and expected to change; it imposes no normative requirement beyond the clearance attribute in 19.11–19.12. The Data Humanism styling layer (19.13) is likewise vendor-agnostic; its curated Du Bois / Lupi reference images are design-reference inputs, not a named model vendor, and impose no normative requirement beyond the data-faithfulness guarantee in 19.14–19.15.



**User Story:** As a strategist, I want every insight and node score to carry a confidence value shown in text, so that I can weigh how much to trust each read.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL attach a confidence value to each Core Insight and to each node score in the score lifecycle.
2. WHERE confidence is displayed, THE Harmonx Platform SHALL convey it with text (and optional icon) and never by color alone.
3. WHEN a node score advances along the lifecycle (Projected → Clone read → Tested → Observed), THE Harmonx Platform SHALL update the confidence value and SHALL retain prior confidence values so the change is computable.
4. WHERE a Core Insight's confidence falls below a configured threshold, THE Harmonx Platform SHALL flag it in text in the Distill stage and in the pre-lock checklist.
5. THE Harmonx Platform SHALL store confidence thresholds as configuration rather than hard-coded values.

### Requirement 21: Narrative Spine & Crossover Hypothesis

**User Story:** As a strategist, I want to author a narrative spine that orders nodes into a story and attach a crossover hypothesis to each insight, so that "Life with [Brand]" reads as a coherent arc and the generalization claim is instrumented.

#### Acceptance Criteria

1. THE Distill Stage SHALL author or derive a Narrative Spine that orders creative taxonomy nodes into a sequence of beats, and SHALL allow a user with edit capability to human-edit it (accept, edit, add, remove, or reorder beats).
2. WHERE a beat exists, THE Distill Stage SHALL model that beat as a binding of a moment in the persona's day to the node(s) that play in that moment, the emotional layer(s) the beat moves (drawn from Belonging, Identity, Trust, Meaning), and the evidence backlinks and defense copy that justify it.
3. THE Distill Stage SHALL require every beat to ladder to the single Core Insight, and SHALL flag in text any beat that does not reference the Core Insight.
4. WHEN the brief is locked, THE Brief-Lock Gate SHALL freeze the Narrative Spine (its beat sequence and each beat's bindings) into brief version v1.0, consistent with Requirement 6.6, so that the spine is a committed part of the brief rather than a Direct-stage assembly step.
5. WHERE a Narrative Spine exists, THE Client Portal SHALL use its beat order for the Chronological view mode of "Life with [Brand]", consistent with Requirement 16.
6. THE Direct Stage SHALL treat each deliverable (Brand Imprint™ Report, "Life with [Brand]", sizzle reel, Data Humanism visual) as a projection of the frozen Narrative Spine into a format and SHALL NOT generate deliverable narrative content independently of the spine, consistent with Requirement 9.2.
7. THE Distill Stage SHALL allow a user with edit capability to attach a Crossover Hypothesis to each Core Insight.
8. WHEN a Crossover Hypothesis is tested in the Lab, THE Harmonx Platform SHALL associate the resulting crossover verdict and crossover score with that hypothesis, consistent with Requirement 14.
9. WHERE a Core Insight has no Crossover Hypothesis, THE Brief-Lock Gate SHALL surface this as an advisory item in the pre-lock checklist without blocking the lock.
10. WHEN the Narrative Spine is reordered or a beat's bindings change, THE Stage Workspace SHALL record the change as a re-enterable diff, consistent with Requirement 3.

### Requirement 22: Collaboration — Comments, Assignment & Notifications

**User Story:** As a team member, I want comments, assignments, and notifications, so that the team can coordinate without losing provenance.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL allow a user with edit capability to attach comments to a stage, a node, or a brief.
2. WHEN a user is mentioned in a comment, THE Harmonx Platform SHALL generate a notification for that user.
3. THE Harmonx Platform SHALL allow a user with edit capability to assign a stage or node to another member.
4. WHEN a meaningful platform event occurs (agent-run completion, brief lock, observed-data arrival, assignment, or mention), THE Harmonx Platform SHALL generate a notification for the affected users.
5. WHERE notifications are surfaced, THE Harmonx Platform SHALL present them through a managed live region that announces each event once, consistent with Requirement 18.
6. THE Harmonx Platform SHALL record comments and assignments in the stage History as provenance, consistent with Requirement 3.
7. WHILE a user lacks view capability for a surface, THE Harmonx Platform SHALL exclude that surface's comments and notifications from that user.

### Requirement 23: Deliverable Export & Outbound Sync

**User Story:** As a producer, I want to export and sync deliverables to PDF/deck, Figma, and Drive, so that client-facing outputs leave the platform cleanly and traceably.

#### Acceptance Criteria

1. WHILE a brief is locked, THE Direct Stage SHALL allow export of a deliverable to PDF/deck, Figma, and Drive.
2. WHERE an exported deliverable is client-facing, THE Harmonx Platform SHALL exclude the Resonance Layer from the export, consistent with Requirement 9.4.
3. IF the acting user does not hold the Publish-external capability, THEN THE Harmonx Platform SHALL prevent export of client-facing deliverables.
4. WHEN a deliverable is exported, THE Harmonx Platform SHALL record the exported brief version and the destination in provenance.
5. WHEN a shipped deliverable is exported, THE Harmonx Platform SHALL pin it to its brief version, consistent with Requirement 17.5, and SHALL indicate the version on the export.
6. IF no locked brief exists, THEN THE Harmonx Platform SHALL present no export actions and SHALL state that a locked brief is required.

### Requirement 24: Usage & Cost Metering

**User Story:** As an admin, I want to see consumption of connectors, clone runs, and renders against the tier, so that upgrade triggers are grounded in real usage.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL record usage events for connector queries, clone runs, human-test runs, and asset renders.
2. THE Settings area SHALL present a usage view summarizing consumption by category and by project.
3. WHERE consumption approaches a tier limit or a coverage gap exists, THE Harmonx Platform SHALL surface the upgrade trigger with the specific gap, consistent with Requirement 13.4.
4. WHILE a user lacks a billing-visible capability, THE Harmonx Platform SHALL exclude cost figures from the usage view, consistent with Requirement 15.7, while still permitting non-cost usage counts where view capability exists.
5. THE Harmonx Platform SHALL store tier limits and metering thresholds as configuration rather than hard-coded values.
6. WHEN a generative render or re-render occurs, THE Harmonx Platform SHALL record token-level (or unit-level) consumption for the producing generative model connector, so that internal cost can be attributed per model, per deliverable, and per project.
7. THE Harmonx Platform SHALL compute a baseline cost-to-create for a project that aggregates all generative consumption including initial renders and subsequent edits, modifications, and re-renders, and SHALL expose this internal baseline only to roles holding the billing-visible capability.

### Requirement 25: Data Governance, Consent & Audit

**User Story:** As an admin, I want consent, data handling, and an audit trail tracked, so that audience decoding and clean-room activation meet privacy and enterprise obligations.

#### Acceptance Criteria

1. WHEN external data or connector data is ingested, THE Harmonx Platform SHALL record the source and its consent/licensing basis.
2. IF a data source lacks a recorded consent/licensing basis, THEN THE Harmonx Platform SHALL flag the source in text and SHALL exclude it from client-facing outputs until the basis is resolved.
3. THE Harmonx Platform SHALL maintain an append-only Audit Log of capability-gated actions: lock, port, publish, export, connector activation, and permission change.
4. WHERE personally identifiable information is handled, THE Harmonx Platform SHALL restrict access to roles holding the required capability and SHALL exclude that information from client-facing surfaces.
5. WHEN an admin requests an audit export, THE Harmonx Platform SHALL produce the Audit Log for a selected scope and time range.
6. WHERE a connector is partnership-gated or clean-room based, THE Harmonx Platform SHALL apply governance constraints before activation, consistent with Requirement 13.6.

### Requirement 26: Onboarding & Empty States

**User Story:** As a new user, I want guided onboarding and helpful empty states, so that I can start without a populated workspace.

#### Acceptance Criteria

1. WHERE a destination or stage has no content yet, THE Harmonx Platform SHALL present an empty state that explains the surface and offers the primary next action.
2. WHEN a user opens a new project, THE Harmonx Platform SHALL present the "Start → Immerse" primary action, consistent with Requirement 2.2.
3. THE Harmonx Platform SHALL present onboarding guidance in the Morpheus voice and SHALL allow experienced users to proceed without completing it.
4. WHERE onboarding guidance is dismissible, THE Harmonx Platform SHALL allow a user to dismiss it and SHALL NOT re-present dismissed guidance unless the user resets it in Settings.
5. THE Harmonx Platform SHALL render empty states and onboarding using Morpheus components and alias tokens only.

### Requirement 27: Opportunity Thesis (Durable Use Case & Investment Case)

**User Story:** As a strategist, I want to frame the durable problem, the audience and why, the evidence, the opportunity size, and why our solution wins before any distilled artifact exists, so that everything the project produces ladders back to a defensible reason to invest.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL model an Opportunity Thesis per project comprising: the durable use case/problem, the target audience and rationale, the supporting evidence, the opportunity sizing, and the solution rationale.
2. THE Immerse Stage SHALL allow a user with edit capability to author the Opportunity Thesis, and THE Uncover Stage SHALL allow a user with edit capability to refine it as signal substantiates or challenges it.
3. WHERE the Opportunity Thesis states a target audience, THE Harmonx Platform SHALL require at least one evidence backlink to a source and SHALL flag in text any audience claim that has no supporting evidence.
4. THE Opportunity Thesis SHALL present a high-level opportunity size (audience size plus revenue estimate) up front and SHALL provide a detailed TAM/SAM/SOM breakdown (addressable population → serviceable segment → obtainable target) on demand rather than immediately exposed.
5. WHEN the brief is locked, THE Brief-Lock Gate SHALL freeze the Opportunity Thesis into brief version v1.0, consistent with Requirement 6.6.
6. THE Brief-Lock Gate SHALL treat "Opportunity Thesis present, evidence-backed, and sized" as a blocking pre-lock checklist item, consistent with Requirement 7.3, and IF the item is unmet THEN THE Brief-Lock Gate SHALL prevent the lock.
7. WHEN a user modifies a frozen Opportunity Thesis after lock, THE Harmonx Platform SHALL require a recut that produces a new brief version and SHALL NOT mutate the frozen version, consistent with Requirement 17.
8. THE Harmonx Platform SHALL require the Core Insight to ladder to the Opportunity Thesis, so that the distilled truth resolves the problem the thesis frames.
9. WHERE a deliverable or client-portal view is produced, THE Harmonx Platform SHALL present the Opportunity Thesis (problem, audience rationale, evidence, and high-level sizing) ahead of the distilled artifacts, and SHALL keep the detailed sizing on demand.

### Requirement 28: Deliverable Editing, Versioning & Live Link

**User Story:** As a producer, I want to edit deliverables in-system and via external editors while keeping a single canonical live link and a full edit history, so that clients can collaborate on outputs without losing provenance or the source of truth.

#### Acceptance Criteria

1. WHILE a brief is locked, THE Harmonx Platform SHALL allow an authorized user to edit a deliverable in-system by changing text, replacing images, and invoking AI re-render of an asset.
2. WHEN a deliverable asset is AI re-rendered, THE Render Engine SHALL route the re-render through the AI-generation gate and provenance-stamp it, consistent with Requirements 8 and 19.
3. WHEN any edit is made to a deliverable (human text change, image replacement, or AI re-render), THE Harmonx Platform SHALL record a new Deliverable Version and SHALL retain prior versions so the edit history of the distilled project is inspectable.
4. THE Harmonx Platform SHALL provide a canonical, view-only Live Link for each deliverable.
5. WHEN a deliverable is opened in an external editor (for example, Word, Figma, or Drive), THE Harmonx Platform SHALL keep the Harmonx copy as the canonical Live Link and SHALL NOT allow external edits to silently overwrite it.
6. WHERE a deliverable is client-facing, THE Harmonx Platform SHALL exclude the Resonance Layer from all edited and exported versions, consistent with Requirement 9.4.
7. IF the acting user does not hold the Publish-external capability, THEN THE Harmonx Platform SHALL prevent editing or exporting of client-facing deliverables.
8. WHEN a deliverable version is created, THE Harmonx Platform SHALL record the brief version it derives from and the editor (human or system), consistent with Requirement 3.

### Requirement 29: Brand Intelligence Ingestion (Client Brand Intake)

**User Story:** As a strategist, I want to ingest a client's existing brand identity — either scraped from their web presence or uploaded from brand guidelines — so that every output the platform produces for the engagement is in the client's brand language while being native to the target audience's life.

#### Acceptance Criteria

1. THE Immerse Stage SHALL provide a Brand Intake flow that accepts a client brand URL for automated analysis and/or uploaded brand documents (guidelines PDF, style guides, voice documentation).
2. WHEN a URL is provided, THE Brand Intake flow SHALL scrape and analyze the client's visual identity (color palette, typography, imagery patterns), brand voice (tone, vocabulary, cadence), current positioning (taglines, hero messaging, value propositions), and channel presence (social tone, content themes).
3. WHEN brand documents are uploaded, THE Brand Intake flow SHALL extract identity attributes and populate the Brand Identity Profile alongside or in place of scraped data.
4. THE Brand Intake flow SHALL produce a Brand Identity Profile artifact comprising: color system, typography system, voice attributes, visual language, positioning snapshot, and channel presence map.
5. THE Brand Identity Profile SHALL be editable by a user with edit capability, so that a strategist or the client can correct, refine, or override any scraped or extracted attribute.
6. THE Brand Identity Profile SHALL be versioned alongside the brief, so that brand evolution during an engagement is tracked; the profile active at lock is frozen with the brief version.
7. WHEN the Direct stage renders a deliverable, THE Harmonx Platform SHALL check the output against the Brand Identity Profile and SHALL flag in text any deliverable that drifts from the ingested brand attributes (brand-coherence check).
8. THE Client Portal SHALL present deliverables rendered in the client's brand language — never in HarmonX's internal visual language or Morpheus tokens — consistent with the Brand Identity Profile.
9. WHERE the platform's Proximity Snapshot (website lead-gen feature) generates a micro-audit for a prospect, THE Harmonx Platform SHALL use a lightweight version of the same ingestion pipeline (URL scrape only, no uploads) to produce the snapshot.

### Requirement 30: Company → Engagement Hierarchy (Compounding Relationship)

**User Story:** As a strategist, I want a Company-level view that contains all engagements for a client and shows how intelligence compounds over time, so that the client sees the value of a long-term relationship and every engagement benefits from prior work.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL model a Company as the top-level entity, with Engagements (formerly Projects) nested within a Company.
2. WHEN a user opens a Company, THE Company Overview SHALL display: the Brand Identity Profile, all engagements (with status, metrics, and key insights per engagement), cross-engagement insights, performance trajectory over time, the company memory subgraph, and a shared context library.
3. WHEN an engagement is locked or ported, THE Harmonx Platform SHALL write that work back to the Company-level memory subgraph.
4. THE Harmonx Platform SHALL allow the Company-level memory subgraph to feed subsequent engagements within the same Company, so that Immerse and Uncover for a new engagement benefit from all prior decoded knowledge for that client.
5. THE Company Overview SHALL present a performance trajectory view showing how HarmonX's intelligence has compounded for this client over time (cross-engagement metrics, insight depth, campaign performance trends).
6. THE Harmonx Platform SHALL maintain a shared context library per Company that stores documents, research, internal materials, and organizational knowledge the client has provided, accessible to all engagements within that Company.
7. THE Client Portal SHALL present the Company-level view — the full relationship over time — with each engagement as a sub-view, rather than showing only a single engagement.
8. THE Memory Layer SHALL support two tiers of writeback: Engagement → Company subgraph (on lock/port), and Company subgraph → Global Memory Layer (cross-client generalizable patterns only, excluding client-confidential intelligence).

### Requirement 31: Behavioral & Ethnographic Connector Category

**User Story:** As a strategist, I want connectors for ethnographic field research, behavioral science sources, and lived-experience data, so that the Immerse stage can study the full world the audience actually lives in — not just their digital signal.

#### Acceptance Criteria

1. THE Connectors directory SHALL include a Behavioral & Ethnographic category alongside existing connector categories.
2. THE Behavioral & Ethnographic category SHALL support: upload of ethnographic field research (notes, video diaries, observational studies, ride-alongs), anthropological frameworks (cultural models, ritual mapping, identity narratives), and environmental documentation (photo/video of the audience's actual spaces).
3. THE Behavioral & Ethnographic category SHALL support behavioral science sources: academic databases (behavioral psychology, cultural studies, sociology), behavioral pattern libraries (how a population moves through a day), and decision science frameworks (heuristics, biases, mental models specific to the audience).
4. THE Behavioral & Ethnographic category SHALL support lived-experience data: community forums and discourse, oral history and interview transcripts, day-in-the-life documentation (first-person video, journals), and vernacular and language patterns.
5. WHERE ethnographic field research is commissioned per-project, THE Harmonx Platform SHALL provision it as pass-through (billed through to the client), consistent with the provisioning model in Requirement 13.
6. THE Immerse Stage SHALL accept uploaded field research artifacts from the Behavioral & Ethnographic category, so that a strategist can commission an ethnographer and feed the raw material directly into the decode.

### Requirement 32: Pre-Production Script

**User Story:** As a producer, I want a detailed script derived from the locked brief that I can edit inline before any visual work begins, so that creative direction is aligned before expensive rendering.

#### Acceptance Criteria

1. AFTER a brief is locked, THE Direct Stage SHALL require a Script before allowing storyboard generation or final rendering.
2. THE Direct Stage SHALL derive the Script from the locked brief — the Narrative Spine beats, node interpretations, Resonance Layer, emotional layers, defense copy, and any relevant connector/signal context.
3. THE Script SHALL expand each spine beat into a Script Scene comprising: scene direction, visual/audio notes, transitions, pacing, tone, and copy direction.
4. THE Script SHALL serve as the shared source for ALL deliverables (sizzle reel, creative taxonomy deck, Data Humanism visual); each deliverable's storyboard and final render SHALL trace to this single Script.
5. THE Script SHALL be inline-editable by a user with edit capability.
6. THE Direct Stage SHALL allow a user to immediately approve the AI-derived Script without editing it.
7. WHEN a user approves the Script, THE Direct Stage SHALL record the approval with who (user identity) and when (timestamp) in the stage's change log, consistent with Requirement 3.
8. THE Script SHALL be an intermediate internal artifact; THE Harmonx Platform SHALL NOT expose the Script as a client-facing deliverable on its own.
9. Script generation SHALL be classified as analysis/assist (not Creative Render) per Requirement 8 — it is a text expansion of locked brief content, not a generative creative asset.
10. WHILE no Script is approved for a project, THE Direct Stage SHALL block storyboard generation for all deliverables and SHALL state in text that an approved script is required.

### Requirement 33: Pre-Production Storyboard

**User Story:** As a producer, I want per-deliverable storyboards showing sketch-level frames before final rendering, so that I can iterate cheaply on visual direction.

#### Acceptance Criteria

1. THE Direct Stage SHALL produce one Storyboard per deliverable type: one for the sizzle reel, one for the creative taxonomy deck (composite deliverable), and one for the Data Humanism visual.
2. EACH Storyboard SHALL be a sequence of Storyboard Frames — sketch-level visual pre-visualizations of what the final render will look like for that deliverable format.
3. EACH Storyboard Frame SHALL reference a Script Scene but interpret it for the specific deliverable format: a sizzle frame is a video still; a deck frame is a slide layout; a Data Humanism frame is a sketch of the chart.
4. WHERE beats are shared across deliverables, THE Script SHALL hold the shared scene direction; EACH Storyboard SHALL show its own format-specific interpretation without redundantly re-specifying the scene direction.
5. THE Storyboard SHALL be inline-editable by a user with edit capability.
6. THE Direct Stage SHALL allow a user to immediately approve the Storyboard without editing it.
7. WHEN a user approves a Storyboard, THE Direct Stage SHALL record the approval with who (user identity) and when (timestamp) in the stage's change log, consistent with Requirement 3.
8. WHILE no Storyboard is approved for a given deliverable, THE Direct Stage SHALL block final rendering for that deliverable and SHALL state in text that an approved storyboard is required.
9. Storyboard generation SHALL be classified as a lightweight Creative Render (sketch-level fidelity, uses generative model connectors post-lock) — it passes the `canRender` gate since the brief is locked, but operates at sketch/low-fidelity rather than full production quality.

### Figma Impact Note — Pre-Production Sub-Pipeline

The following Figma changes are needed to represent the pre-production pipeline:

- The Direct stage gains three visible sub-states in the timeline/progress: **Script** (editing / approved), **Storyboard** (per-deliverable, editing / approved), and **Final Render**.
- The StageTimeline and any progress indicators should show which sub-state each deliverable is in (e.g., "Sizzle reel — storyboard approved", "Deck — script editing").
- The deck deliverable shows as a composite deliverable (applied creative taxonomy + Data Humanism together) in the Figma flow.
- Script and Storyboard approval states should be visually distinct but lighter-weight than the Brief-Lock ceremony (no modal; inline action with recorded attribution).

### Requirement 32: Grounding Provenance (Grounded, Not Guessing)

**User Story:** As a strategist, I want every agent-produced output to declare which grounding source(s) backed it, so that the intelligence is demonstrably grounded — in curated science, real connector data, or the Memory Layer — rather than an ungrounded model guess.

#### Acceptance Criteria

1. WHEN an agent produces an analysis output (signal classification, proposed node, score, insight, competitive read), THE Harmonx Platform SHALL attach a grounding record identifying the source(s) that backed it: one or more of curated behavioral knowledge base, connector data, Memory Layer, or client-supplied context.
2. WHERE an agent output has no grounding source, THE Harmonx Platform SHALL flag it in text as ungrounded and SHALL exclude it from the pre-lock checklist's satisfied items until grounded or human-overridden.
3. THE Node Detail and evidence surfaces SHALL display the grounding source(s) for each output with a discernible link to the backing source, consistent with the evidence-backlink requirement (R11.6).
4. WHEN the Brief-Lock Gate presents its pre-lock checklist, THE Harmonx Platform SHALL include "all core claims grounded" as a checklist item and SHALL identify any ungrounded claim in text.
5. THE grounding record SHALL distinguish the grounding kind (curated-KB, connector, memory-layer, client-context) so that grounding coverage can be reported per brief.

### Requirement 33: Curated Behavioral Knowledge Base

**User Story:** As an analyst, I want a curated behavioral knowledge base of frameworks, mechanisms, and findings that the agents reason against, and I want to grow it from vetted research and client-contributed context, so that the decode is grounded in real behavioral science rather than model priors.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL maintain an internal, cross-client curated behavioral knowledge base of behavioral/cultural/decision-science entries, each with a source citation and a vetting status.
2. THE Harmonx Platform SHALL maintain a per-Company knowledge base for client-specific behavioral context, distinct from the internal cross-client knowledge base.
3. WHEN an agent lacks grounding for a claim, THE Harmonx Platform SHALL prompt the user to supply contextual information — lived experience, prior research findings, or uploaded studies — and SHALL record who supplied it and when.
4. WHEN a user contributes a research finding or context item, THE Harmonx Platform SHALL add it to the Company knowledge base, and SHALL allow an admin with the required capability to promote a vetted, generalizable entry into the internal cross-client knowledge base.
5. IF a knowledge-base entry lacks a source citation or vetting status, THEN THE Harmonx Platform SHALL mark it unvetted and SHALL exclude unvetted entries from client-facing grounding until vetted.
6. WHERE a client-contributed entry contains confidential or proprietary client information, THE Harmonx Platform SHALL NOT promote it to the internal cross-client knowledge base without explicit admin action and a recorded consent basis (consistent with Requirement 25).
7. THE Harmonx Platform SHALL make knowledge-base entries queryable by the agents as a grounding source and SHALL record knowledge-base grounding in the grounding provenance (Requirement 32).

### Requirement 34: Internal Admin Console

**User Story:** As a Harmonx operator, I want an internal admin console — separate from the client-facing surfaces — to manage the knowledge base, agent roster, connectors, companies, and usage/cost, so that we can operate and maintain the platform.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL provide an internal Admin Console accessible only to users holding an internal-admin capability, and SHALL NOT expose it to client-role users.
2. THE Admin Console SHALL allow management of the internal curated behavioral knowledge base: create, edit, vet, deprecate, and promote entries from Company knowledge bases.
3. THE Admin Console SHALL allow management of the agent roster (the data-driven agent list that drives the displayed agent count, consistent with Requirement 5.4).
4. THE Admin Console SHALL surface cross-company operational views: usage and internal cost baselines (consistent with Requirement 24), connector health and provisioning, and knowledge-base coverage.
5. THE Admin Console SHALL present the internal cost-to-create baseline per company and per engagement to internal-admin/billing-visible roles, consistent with Requirement 24.7.
6. WHILE a user lacks the internal-admin capability, THE Harmonx Platform SHALL hide or disable Admin Console destinations rather than render an inaccessible surface, consistent with Requirement 1.6.
7. THE Admin Console SHALL render using Morpheus components and alias tokens only, consistent with the rest of the platform.

### Requirement 35: Ethics & Regulatory Guardrails

**User Story:** As a platform owner, I want an ethics/regulatory review gate and guardrails for regulated categories and protected audiences, so that decoding and creative never cross legal or ethical lines.

#### Acceptance Criteria

1. WHEN an engagement is set up, THE Harmonx Platform SHALL flag regulated categories (for example alcohol, health/pharma, financial, gambling) and protected/vulnerable audiences (for example minors) derived from the Opportunity Thesis audience and the company's industry.
2. WHERE a regulated category or protected audience is flagged, THE Brief-Lock Gate SHALL require an ethics/regulatory review checklist item and SHALL block the lock until a user holding an ethics-review capability completes it.
3. THE Harmonx Platform SHALL maintain a configurable set of bright-line prohibitions and SHALL refuse to render creative that violates them, reporting the violation in text.
4. WHERE an audience includes minors, THE Harmonx Platform SHALL apply heightened review and SHALL record the review basis.
5. THE Harmonx Platform SHALL record all ethics-review actions in the Audit Log, consistent with Requirement 25.
6. THE ethics-review capability SHALL be distinct from the edit and approve-gate capabilities.

### Requirement 36: Measurement, Attribution & Proof-over-Time

**User Story:** As a strategist, I want honest measurement with baselines and controlled comparison, so that Harmonx's impact is demonstrable over time rather than merely claimed.

#### Acceptance Criteria

1. WHEN an engagement is set up in Immerse, THE Harmonx Platform SHALL capture a pre-engagement baseline for the metrics the engagement intends to move.
2. THE Observe Stage SHALL support controlled comparison designs (holdout or matched-market) where feasible and SHALL record which design was used.
3. THE Observe Stage SHALL distinguish correlation from attributed causation in text and SHALL NOT present causation absent a controlled design.
4. THE Harmonx Platform SHALL accumulate results into a proof record per Company and a generalizable cross-client proof record, so that ROI evidence compounds over time.
5. WHERE execution is performed by the client or a third party, THE Harmonx Platform SHALL require a data-access/instrumentation arrangement to observe outcomes, and IF it is absent THEN THE Observe Stage SHALL mark results as unverified.
6. THE Harmonx Platform SHALL surface confidence in any reported impact in text, never by styling alone, consistent with Requirement 20.

### Requirement 37: Agent Conflict Resolution

**User Story:** As an analyst, when two agents reach conflicting conclusions on the same input, I want the conflict surfaced and a human to choose the resolution, so that the decode resolves disagreements deliberately rather than silently.

#### Acceptance Criteria

1. WHEN two or more agents produce conflicting outputs on the same signal, node, or score, THE Harmonx Platform SHALL surface the conflict rather than silently selecting one.
2. THE Harmonx Platform SHALL present each conflicting output with its grounding provenance, consistent with Requirement 32.
3. THE Harmonx Platform SHALL require a user with edit capability to select a resolution type: accept one, accept both as coexisting (where both hold for different sub-segments or moments), merge, or reject both and re-run.
4. WHERE the resolving users disagree on the resolution, THE Harmonx Platform SHALL escalate to a user holding a conflict-resolver (tie-breaker) capability, whose selection is decisive.
5. WHEN a conflict is resolved, THE Harmonx Platform SHALL record the resolution type, the actor, and the rationale in the change log, consistent with Requirement 3.
6. WHILE a conflict on a core claim is unresolved, THE Harmonx Platform SHALL flag it as an unmet pre-lock checklist item.

### Requirement 38: Enterprise Security & Data Protection

**User Story:** As an enterprise client, I want my data handled to enterprise security standards, so that I can trust Harmonx with brand and audience intelligence.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL isolate each Company's data (brand profile, company knowledge base, memory subgraph, uploads) so that one client's confidential data is never exposed to another.
2. THE Harmonx Platform SHALL scope access to sensitive data by capability, consistent with Requirement 15, and SHALL record access to sensitive data.
3. WHEN a client requests it, THE Harmonx Platform SHALL support export and deletion of that Company's data, consistent with Requirement 25.
4. THE Harmonx Platform SHALL record a data-processing basis per Company and SHALL support a reference to a data-processing agreement.
5. WHERE a rendered or exported artifact leaves the platform, THE Harmonx Platform SHALL carry the client-facing redaction and consent constraints, consistent with Requirements 9.4 and 25.

## Open Questions & Tensions — Decision Record (all resolved)

These are the points where the Notion business case and the Figma flow conflicted, under-specified, or strained. **All eleven have now been reviewed and resolved**, with each decision baked into the requirements above. They are retained here as a decision record (and as provenance for the design phase) rather than as open items.

- **OQ-1 — Connector counts and categories. ✅ RESOLVED.** The directory is **data-driven**: counts come from the connector registry, never hard-coded, and adding connectors updates the displayed counts automatically. Design against **Notion registry v2.2: 69 platform connectors / 11 categories / tiers 19·25·43·69**, plus two activation layers (10 vertical + 4 demographic) for **83+ touchpoints**, mapped to **41 creative asset types**. Encoded in Requirement 13 (see 13.7).

- **OQ-2 — Two different "four-layer" concepts collide. ✅ RESOLVED.** Uncover uses a **Four-Layer Signal Taxonomy** (Stated preference, Revealed behavior, Cultural velocity, Structural context); these remain distinct named concepts. The **four Emotional Layers are now named: Belonging, Identity, Trust, Meaning** — the emotional axis of the decoded audience profile (alongside stated/revealed behavior and cultural/structural context per the engine spec), scored in Distill and served by creative taxonomy nodes. Names are stored as data/config so they are editable later without redesign. Encoded in the glossary, Requirement 6.2, and Requirement 11.1.

- **OQ-3 — Is "Crossover" part of the per-node score lifecycle or a separate verdict? ✅ RESOLVED.** Crossover is a **separate generalization verdict** — general-market clones run on a community-decoded insight, producing a verdict plus a delta vs. the community read — **not** a fifth inline step in the per-node Projected → Clone read → Tested → Observed lifecycle. The engine spec's "+ Crossover" is reconciled by treating it as an attached verdict, not a sequential step. Requirement 11 keeps the 4-step lifecycle; Crossover lives in Requirement 14 (the Lab).

- **OQ-4 — The "24-agent assist". ✅ RESOLVED.** The legacy **"24-agent" label is retired**; in the product they are simply **agents** (the AI-vs-human split is an org model, not a UI concept). The canonical roster today is the **13 agents** enumerated in the PRFAQ: Cultural Velocity Analyzer, Schema Congruity Engine, Phonaesthetic Scorer, Processing Fluency Auditor, Symbolic Resonance Mapper, Sentiment Baseline Engine, Competitive Intelligence Agent, Psychographic Profiler, Media Channel Optimizer, Risk/Opportunity Modeler, Behavioral Stickiness Auditor, Validation Chain Agent, Report Compiler. The agent **count is displayed data-driven** (reads "13-agent decode" today, updates as the roster changes — same pattern as connectors). Agents span stages (most assist Uncover; Validation Chain acts at lock; Report Compiler at Direct), so a per-stage assist badge shows where agents act. Encoded in Requirement 5 (5.4, 5.7) and the glossary. **Full per-agent I/O behavior is explicitly DEFERRED to a separate follow-up spec.**

- **OQ-5 — Approver role name mismatch. ✅ RESOLVED.** The brief-lock gate is gated on the **Approve-gate capability**, not on a role literally named "Strategy Lead." "Strategy Lead" is whichever role bundles Approve-gate (Strategist and/or Admin). Requirement 7 stays as-is (capability-gated); the glossary entry for "Strategy Lead" is updated accordingly.

- **OQ-6 — AI gating boundary definition. ✅ RESOLVED.** The gate distinguishes **AI analysis/assist (pre-lock OK)** from **Creative Render of deliverables (post-lock only)**. The boundary is drawn at **rendering or persisting a deliverable creative asset** (image/video/audio/copy for a deliverable or client surface), **not** at any model call. Pre-lock model use (connector queries, signal classification, agent decode, proposed taxonomy, inline clone gut-check, confidence scoring, narrative-spine suggestions) is explicitly permitted. Encoded in Requirement 8 (8.3, new 8.5), Requirement 19, and the "Creative Render" glossary entry.

- **OQ-7 — No-browser-storage constraint vs. persistence. ✅ RESOLVED.** All real persistence (projects, briefs, graph, user preferences) is **server-side**. The no-storage prohibition applies **only to sandboxed render-preview surfaces** (the asset-render iframe in Direct/Node Detail). Encoded in the tightened Requirement 18.12.

- **OQ-8 — Memory writeback timing for Observe. ✅ RESOLVED.** Observed data writes back **only when it descends from a locked-or-ported lineage**. Branch-only observations that are never re-locked or ported **do not** write back. Encoded in Requirement 10 (new 10.5) and Requirement 17.6.

- **OQ-9 — Client live-graph gating precedence. ✅ RESOLVED.** The three mechanisms stack in explicit order, and **all three must pass** for live-graph: **(1) capability** (Publish-external to grant; client View to consume), then **(2) tier** (portal visible at the client's tier), then **(3) partnership unlock** (an explicit flag on top of tier). Encoded in Requirement 16 (new 16.7).

- **OQ-10 — Branch versioning scheme. ✅ RESOLVED.** Scheme: locked mainline `v1.0` (next mainline recut `v1.1`); a branch appends a letter suffix (`v1.0·b`, `v1.0·c`); a re-lock on a branch increments a branch-local counter (`v1.0·b.1`, `v1.0·b.2`). Ported nodes retain a back-reference to their origin brief version; no automatic merge. Encoded in Requirement 17 (new 17.7, 17.8).

- **OQ-11 — Brand/terminology migration. ✅ RESOLVED.** "Resonance/Resonate" as **company/product name → Harmonx**. Retained as **feature names**: **Resonance Layer** (the behavioral-principle IP), **Resonance score / Resonance scoring**, and **synthetic resonance summary** (Requirement 14.3). All other "Resonance/Resonate" usages migrate to Harmonx.

## Notes on Testability

Several requirements describe UI feel or organizational concerns that are not automatically testable as properties (for example, R18.4 reduced-motion *feel*, the *aesthetic* qualities). The design phase will run acceptance-criteria prework to separate property-testable rules (version-control state transitions, gating logic, score-delta retention, writeback admission, serialization round-trips of locked briefs) from example/edge-case tests and non-testable UI-quality statements.
