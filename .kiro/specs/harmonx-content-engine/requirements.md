# Requirements Document — Harmonx Content Engine

## Introduction

The Harmonx Content Engine is a content-repurposing tool inside the Harmonx product. A founder/CEO authors **one** source of truth once — an **Insight Atom** — and the engine generates platform-native content drafts (**Projections**) for multiple channels: a Substack long-form essay, an X/Twitter thesis statement, an Instagram carousel and/or reel, and a TikTok founder video. Each channel output is a *projection* of the atom, native to its platform, never a separately authored piece.

This mirrors the existing platform architecture. The `harmonx-platform` spec commits to a **Narrative Spine → Projection** model: one committed source is projected into many deliverable formats, and every projection re-presents committed content rather than authoring new claims. The Content Engine reuses that mental model at the scale of a single piece of thought-leadership content: the Insight Atom is the committed source; each platform draft is a projection of it. The platform's **data-faithfulness** guarantee (a styled render may change aesthetics but never the underlying data values) has a direct analog here — **content-faithfulness**: a projection may change format, length, and platform voice but SHALL NOT introduce a claim, statistic, or brand fact that is not present in the source atom.

**Where this lives.** The Content Engine is **a new section inside the Harmonx platform**, not a standalone app. It is an additional destination in the platform's existing global shell — the same left navigation that holds Projects, Memory Layer, Lab, Connectors, and Settings (`harmonx-platform` R1) — reached as a top-level "Content" entry. Living inside the platform is also what lets it reach the **data substrate / memory layer** to pull a Proof Signal. This spec therefore **extends** the platform's navigation (R1) with one destination rather than defining a separate shell.

This is software, not a document. It is built **using the Morpheus design system** (React 18 + TypeScript strict, Vite, Style Dictionary tokens, CSS Modules, Radix primitives, Storybook, Vitest + Testing Library + jest-axe). Every surface composes Morpheus components/patterns, references **alias tokens only** (no raw hex/px/ms), is **dark-first** via `data-theme`, declares all states, ships reduced-motion / reduced-transparency / forced-colors fallbacks, passes the **WCAG 2.2 AA** gate, and follows the Morpheus **voice** (warm, precise mentor; sentence case; no hype, exclamation, or emoji). Per tech.md, **no browser storage APIs** (localStorage/sessionStorage) are used in sandboxed render paths; atom and projection state is held in memory only.

> **Reconciliation with existing specs.** This spec reuses the shared vocabulary of `harmonx-platform` and `harmonx-landing` rather than inventing new terms: **Brand Imprint™ / Informed Brand Intelligence (IBI)**, **data substrate**, **memory layer**, **Projection**, **Core Insight**, **defense copy**, **evidence backlinks**, and **data-faithfulness**. Where this tool depends on a platform capability — specifically pulling a real stat/signal from the Harmonx system as proof — it **references** the platform spec (the data substrate / memory layer, `harmonx-platform` R12 and R19.10) rather than re-specifying that capability. Points needing later reconciliation are recorded under **Open Questions & Tensions**.

## Glossary

Terms reused from `harmonx-platform` are marked *(reused)*.

- **Content Engine**: The complete content-repurposing tool specified by this document, running as an authenticated surface inside the Harmonx product.
- **Insight Atom** (**Atom**): The single source of truth for one piece of content. It comprises exactly one **behavioral insight**, exactly one **proof signal** pulled from the Harmonx system, and exactly one **brand example**, plus its assigned **content pillar** and editorial metadata. Every Projection derives from the atom; the atom is the content analog of the platform's committed source (**Narrative Spine** *(reused)*).
- **Behavioral Insight**: The core claim of an atom — a statement about how storytelling, proximity, or brand behavior works, grounded in human psychology. The content-level analog of the platform **Core Insight** *(reused)*.
- **Proof Signal**: One real statistic or signal attached to the atom as evidence, pulled from the Harmonx **data substrate / memory layer** *(reused)* via the platform. It carries the value, a human-readable label, and an **evidence backlink** *(reused)* to its source in the Harmonx system.
- **Brand Example**: One real brand referenced in the atom to illustrate the insight, drawn from a curated set focused on Black/POC-founded brands and brands with strong cultural footing. Carries the brand name and a one-line note on what the brand did.
- **Content Pillar**: One of three fixed editorial themes an atom is assigned to: **P1 — how storytelling actually works**, **P2 — proximity as the path to culture** ("be culture by being within proximity"), **P3 — the secret to billion-dollar brands** (an "expose in a good way": building understanding through interviews with executives and business owners).
- **Projection** *(reused)*: A platform-native rendering of an Insight Atom into a specific channel format. A projection re-presents the atom's content in a channel's native form; it does not author new claims, statistics, or brand facts. The five projection formats are Substack essay, X thesis, Instagram carousel, Instagram/TikTok founder video, and (via simple mode) the derived pairings below.
- **Substack Essay**: The long-form projection — the full argument of the atom. It is effectively the source narrative from which shorter projections are lifted.
- **X Thesis**: The X/Twitter projection — a single provocative thesis statement lifted from the Substack essay (a "proactive statement").
- **Instagram Carousel**: The Instagram projection rendered as an informational visual carousel — an ordered set of **Slides** distilling the argument.
- **Slide**: One ordered element of an Instagram Carousel, carrying slide text and an optional visual note.
- **Founder Video**: A founder talking-head video projection, 30–60 seconds, produced as a **video brief** (script + shot direction). The same Founder Video serves both TikTok and Instagram Reels.
- **Video Brief**: The authored/derived specification of a Founder Video — a spoken script plus shot direction and duration target — that a founder records against. The Content Engine produces the brief; it does not produce the recorded video file.
- **Founder Visibility**: A per-projection setting declaring whether the founder appears on camera (talking-head formats) or the projection is authored in the founder's voice without the founder's face (essay, carousel). The founder reads as CEO/founder and thinker-and-tinker across all projections regardless of on-camera presence.
- **Simple Mode**: A reduced authoring path in which the Substack essay feeds the X thesis, and one Founder Video serves both TikTok and Instagram Reels — the minimal set of projections for a single atom.
- **Content-Faithfulness**: The guarantee that a Projection may alter format, length, ordering, and platform-native voice but SHALL NOT add, drop into fact, or change any claim, statistic, or brand fact that is not present in the source Insight Atom. The content analog of the platform **data-faithfulness** *(reused)* guarantee.
- **Editorial Guardrails**: The fixed POV/tone rules every atom and projection must satisfy: provocative but inspiring; **politically agnostic** (brand behavior and human psychology, never politics); avoids a "rage against the machine" / controversial tone; tells the Harmonx story and how Harmonx thinks about growing a brand through storytelling **without giving away the actual work for free**.
- **Harmonx Story**: The framing every atom carries — how Harmonx thinks about and helps grow a brand through storytelling — expressed at a level that builds understanding without disclosing proprietary method or client-specific work.
- **Data Substrate / Memory Layer** *(reused)*: The Harmonx platform's deterministic quantitative store and cross-project graph from which a Proof Signal is drawn. Owned and specified by `harmonx-platform` (R12, R19.10); referenced here, not re-specified.
- **Projection Set**: The collection of Projections generated from a single Insight Atom. Full mode includes all channel formats; Simple Mode includes the reduced pairing.

## Requirements

### Requirement 1: Content Engine Shell & Navigation

**User Story:** As a founder, I want a dedicated, uncluttered section inside the Harmonx platform for authoring atoms and reviewing their projections, so that I can move between my content and its channel drafts without leaving the product.

#### Acceptance Criteria

1. THE Harmonx Platform SHALL present the Content Engine as a top-level destination ("Content") in the existing global left navigation alongside Projects, Memory Layer, Lab, Connectors, and Settings (extending `harmonx-platform` R1).
2. WHEN a user selects the Content destination, THE Content Engine SHALL render a primary surface listing the founder's Insight Atoms, each showing the atom's behavioral insight summary and its assigned content pillar.
3. WHEN a user selects an Insight Atom, THE Content Engine SHALL open that atom's workspace showing the atom source and its Projection Set.
4. THE Content Engine SHALL present the atom workspace as two areas: the **Atom** (source of truth) and the **Projections** (channel drafts derived from it).
5. WHEN a user requests a new atom, THE Content Engine SHALL open an empty Insight Atom authoring surface.
6. THE Content Engine SHALL render all surfaces using Morpheus components and alias tokens only, with no raw color, spacing, or timing literals.
7. WHILE a surface or action is not permitted for the current user, THE Content Engine SHALL hide or disable that entry rather than render an inaccessible surface.

### Requirement 2: Insight Atom Authoring

**User Story:** As a founder, I want to author one insight atom with a single insight, one proof signal, and one brand example, so that I have a single committed source of truth for every channel.

#### Acceptance Criteria

1. THE Content Engine SHALL allow a user to author an Insight Atom composed of exactly one Behavioral Insight, exactly one Proof Signal, and exactly one Brand Example.
2. WHEN a user saves an Insight Atom, THE Content Engine SHALL require the Behavioral Insight to be non-empty text that is not solely whitespace.
3. IF a required atom component (Behavioral Insight, Proof Signal, Brand Example, or content pillar) is missing when the user attempts to save, THEN THE Content Engine SHALL prevent the save and identify each missing component in text.
4. THE Content Engine SHALL allow a user to edit any component of an Insight Atom while the atom is the working source.
5. WHEN an Insight Atom is saved, THE Content Engine SHALL hold the atom in memory only and SHALL NOT use browser storage APIs.
6. WHERE an atom has an assigned content pillar, THE Content Engine SHALL display the pillar as text alongside the atom.

### Requirement 3: Content Pillar Classification

**User Story:** As a founder, I want every atom assigned to one of my three content pillars, so that my content stays on-strategy and balanced across my themes.

#### Acceptance Criteria

1. THE Content Engine SHALL present exactly three content pillars sourced from configuration data: P1 (how storytelling actually works), P2 (proximity as the path to culture), and P3 (the secret to billion-dollar brands).
2. WHEN a user assigns a content pillar to an Insight Atom, THE Content Engine SHALL record exactly one pillar for that atom.
3. IF a user attempts to save an Insight Atom without a content pillar, THEN THE Content Engine SHALL prevent the save and state that a pillar is required.
4. THE Content Engine SHALL convey each pillar through its name and description text rather than through color or position alone.

### Requirement 4: Proof Signal from the Harmonx System

**User Story:** As a founder, I want each atom to carry one real stat pulled from the Harmonx system, so that my content is backed by proof rather than assertion.

#### Acceptance Criteria

1. THE Content Engine SHALL allow a user to attach exactly one Proof Signal to an Insight Atom, drawn from the Harmonx data substrate / memory layer as specified by `harmonx-platform` (R12, R19.10).
2. WHEN a Proof Signal is attached, THE Content Engine SHALL record the signal value, a human-readable label, and an evidence backlink to its source in the Harmonx system.
3. IF the Harmonx system returns no available signal for the atom, THEN THE Content Engine SHALL present a defined empty state that names the gap in text and SHALL prevent projection generation until a Proof Signal is attached.
4. THE Content Engine SHALL display the Proof Signal as text (value plus label) and SHALL NOT convey the signal through color alone.
5. THE Content Engine SHALL NOT allow a user to enter a free-typed statistic that lacks an evidence backlink to the Harmonx system as a Proof Signal.

### Requirement 5: Brand Example

**User Story:** As a founder, I want each atom to reference one culturally-grounded brand example, so that my insight is illustrated through brands with real cultural footing.

#### Acceptance Criteria

1. THE Content Engine SHALL allow a user to attach exactly one Brand Example to an Insight Atom, selected from a curated set focused on Black/POC-founded brands and brands with strong cultural footing, sourced from configuration data.
2. WHEN a Brand Example is attached, THE Content Engine SHALL record the brand name and a one-line note on what the brand did.
3. THE Content Engine SHALL present the Brand Example as text and SHALL NOT rely on brand color or logo alone to identify the example.
4. IF no Brand Example is attached when the user attempts to generate projections, THEN THE Content Engine SHALL prevent generation and state that a brand example is required.

### Requirement 6: Editorial Guardrails & Harmonx Voice

**User Story:** As a founder, I want the tool to keep every atom and draft on-voice and politically agnostic, so that my content stays provocative-but-inspiring and never reads as controversial or political.

#### Acceptance Criteria

1. THE Content Engine SHALL apply Editorial Guardrails to every Insight Atom and every Projection: provocative but inspiring, politically agnostic, and free of a "rage against the machine" tone.
2. WHEN an Insight Atom or a Projection contains political framing rather than brand-behavior or human-psychology framing, THE Content Engine SHALL flag the affected content in text for the user to revise.
3. THE Content Engine SHALL frame every atom to tell the Harmonx Story — how Harmonx thinks about growing a brand through storytelling — without disclosing proprietary method or client-specific work.
4. IF an atom or projection would disclose the actual work (proprietary method or client-specific execution), THEN THE Content Engine SHALL flag the affected content in text as over-disclosure for the user to revise.
5. THE Content Engine SHALL express all engine-authored copy and generated drafts in the Morpheus voice: sentence case, warm and precise, without hype, exclamation, or emoji.

### Requirement 7: Projection Generation & Content-Faithfulness

**User Story:** As a founder, I want the tool to generate channel drafts strictly from my atom, so that no draft ever invents a claim, stat, or brand my source did not contain.

#### Acceptance Criteria

1. WHEN a user requests projection generation for an Insight Atom, THE Content Engine SHALL generate the Projection Set from that atom's committed content only.
2. THE Content Engine SHALL ensure every Projection satisfies Content-Faithfulness: a Projection SHALL NOT add, drop into fact, or change any claim, statistic, or brand fact that is not present in the source atom.
3. IF a candidate Projection introduces a claim, statistic, or brand fact absent from the source atom, THEN THE Content Engine SHALL reject that candidate and report the unfaithful content in text.
4. WHEN the source Insight Atom is edited after projections exist, THE Content Engine SHALL mark the existing Projection Set as stale until regenerated or reconciled against the edited atom.
5. THE Content Engine SHALL prevent projection generation while the source atom is missing any required component (Behavioral Insight, Proof Signal, Brand Example, or content pillar).
6. THE Content Engine SHALL record, for each Projection, a reference to the source atom version it was generated from.

### Requirement 8: Substack Essay Projection

**User Story:** As a founder, I want a long-form essay that carries the full argument, so that I have the source narrative every shorter format is drawn from.

#### Acceptance Criteria

1. WHEN projections are generated, THE Content Engine SHALL produce a Substack Essay projection that presents the full argument of the source atom: the behavioral insight, the proof signal, and the brand example.
2. THE Content Engine SHALL treat the Substack Essay as the source narrative from which the X Thesis is lifted.
3. THE Substack Essay SHALL satisfy Content-Faithfulness with respect to the source atom.
4. THE Content Engine SHALL present the Substack Essay as editable text while preserving its link to the source atom.

### Requirement 9: X Thesis Projection

**User Story:** As a founder, I want a single provocative thesis statement pulled from my essay, so that I have a sharp X post that stays true to the long-form argument.

#### Acceptance Criteria

1. WHEN projections are generated, THE Content Engine SHALL produce an X Thesis projection as a single provocative thesis statement lifted from the Substack Essay.
2. THE Content Engine SHALL ensure the X Thesis is traceable to content present in the Substack Essay and satisfies Content-Faithfulness with respect to the source atom.
3. WHERE the target platform imposes a character limit, THE Content Engine SHALL produce an X Thesis within that limit sourced from configuration data.
4. THE Content Engine SHALL present the X Thesis as editable text while preserving its link to the source atom and the essay it was lifted from.

### Requirement 10: Instagram Carousel Projection

**User Story:** As a founder, I want an informational carousel that distills my argument into slides, so that I can teach the insight visually on Instagram.

#### Acceptance Criteria

1. WHEN projections are generated, THE Content Engine SHALL produce an Instagram Carousel projection as an ordered set of Slides distilling the source atom's argument.
2. THE Content Engine SHALL ensure each Slide satisfies Content-Faithfulness with respect to the source atom.
3. THE Content Engine SHALL present the Carousel Slides in an explicit order and SHALL allow a user to reorder Slides with a keyboard-operable, non-drag alternative.
4. THE Content Engine SHALL convey each Slide's meaning through its text and SHALL NOT rely on color or imagery alone.

### Requirement 11: Founder Video Projection (TikTok + Instagram Reels)

**User Story:** As a founder, I want one 30–60 second talking-head video brief that serves both TikTok and Instagram Reels, so that I record once and post to both.

#### Acceptance Criteria

1. WHEN projections are generated, THE Content Engine SHALL produce a Founder Video projection as a Video Brief containing a spoken script and shot direction targeting a duration of 30 to 60 seconds.
2. THE Content Engine SHALL make the single Founder Video serve both the TikTok projection and the Instagram Reels projection.
3. THE Content Engine SHALL ensure the Video Brief satisfies Content-Faithfulness with respect to the source atom.
4. THE Content Engine SHALL present the Video Brief as editable text while preserving its link to the source atom.

### Requirement 12: Founder Visibility (Per-Projection Setting)

**User Story:** As a founder, I want to decide per format whether I appear on camera, so that talking-head formats feature me while essays and carousels can be my voice without my face.

#### Acceptance Criteria

1. THE Content Engine SHALL expose Founder Visibility as a per-projection setting with two states: on-camera and authored-voice-without-face.
2. WHERE a projection is a talking-head format (Founder Video), THE Content Engine SHALL default Founder Visibility to on-camera.
3. WHERE a projection is an authored format (Substack Essay, X Thesis, Instagram Carousel), THE Content Engine SHALL default Founder Visibility to authored-voice-without-face.
4. WHEN a user changes a projection's Founder Visibility, THE Content Engine SHALL apply the change only to that projection and SHALL NOT alter Founder Visibility on other projections.
5. THE Content Engine SHALL frame every projection so the founder reads as CEO/founder and thinker-and-tinker regardless of on-camera presence.

### Requirement 13: Simple Mode

**User Story:** As a founder short on time, I want a minimal path that produces just the essentials, so that I can ship the core content set from one atom quickly.

#### Acceptance Criteria

1. WHERE Simple Mode is selected for an Insight Atom, THE Content Engine SHALL produce a reduced Projection Set: the Substack Essay, the X Thesis fed from the essay, and one Founder Video serving both TikTok and Instagram Reels.
2. WHEN Simple Mode is active, THE Content Engine SHALL derive the X Thesis from the Substack Essay rather than from the atom independently.
3. THE Content Engine SHALL apply Content-Faithfulness to every projection produced in Simple Mode.
4. WHEN a user switches an atom between Simple Mode and full mode, THE Content Engine SHALL update the Projection Set to the corresponding set of formats.

### Requirement 14: Projection Editing & Regeneration

**User Story:** As a founder, I want to edit any draft or regenerate it from the atom, so that I keep control of the final copy while preserving faithfulness to my source.

#### Acceptance Criteria

1. THE Content Engine SHALL allow a user to edit the text of any Projection in place.
2. WHEN a user regenerates a single Projection, THE Content Engine SHALL regenerate only that Projection from the current source atom and SHALL leave other Projections unchanged.
3. WHEN a user regenerates a Projection, THE Content Engine SHALL retain the immediately prior draft as a recoverable version so edits are not silently lost.
4. IF a user edit to a Projection introduces content that violates Content-Faithfulness, THEN THE Content Engine SHALL flag the affected content in text while preserving the user's entered text.
5. THE Content Engine SHALL hold all Projection drafts and their version history in memory only and SHALL NOT use browser storage APIs.

### Requirement 15: Responsive Layout & Reflow

**User Story:** As a founder on any device, I want the tool to adapt to my screen and zoom, so that I can author and review without friction.

#### Acceptance Criteria

1. THE Content Engine SHALL render correctly across the Morpheus breakpoints xs through 2xl using the token-defined grid, gutters, and margins.
2. WHEN the viewport is resized to a 320px CSS width, THE Content Engine SHALL reflow without loss of content or horizontal text scrolling.
3. WHEN text is resized to 200%, THE Content Engine SHALL reflow without clipping content in fixed-height containers.
4. WHERE the modality is touch, THE Content Engine SHALL maintain interactive target sizes of at least 44px.
5. THE Content Engine SHALL determine responsive layout from token-driven breakpoints rather than hard-coded pixel literals in components.

### Requirement 16: Design-System, Accessibility & Voice Conformance (Cross-Cutting)

**User Story:** As the design-system owner, I want the tool to meet the Morpheus definition of done, so that it is a faithful expression of the system and passes the accessibility gate.

#### Acceptance Criteria

1. THE Content Engine SHALL reference alias tokens only in components (no raw color, spacing, or timing literals) and SHALL consume tokens via CSS custom properties.
2. THE Content Engine SHALL declare all relevant states (rest, hover, focus, active, disabled, loading, error, empty) for every interactive surface it introduces.
3. THE Content Engine SHALL pass the WCAG 2.2 AA gate, verified by automated axe checks on every component plus the manual protocol (keyboard-only, screen reader, 200% zoom, reduced-motion, forced-colors).
4. THE Content Engine SHALL never convey status or meaning through color alone; status SHALL pair icon plus text plus color.
5. WHILE generation or processing is in progress, THE Content Engine SHALL surface progress through an `aria-live="polite"` status region that announces meaningful state changes once each.
6. WHERE the resolved material tier is Tier 2 Solid or reduced transparency is preferred, THE Content Engine SHALL render surfaces without translucency while preserving all meaning-bearing content.
7. WHILE reduced motion is preferred, THE Content Engine SHALL replace translate/scale motion with opacity crossfades or instant state changes and SHALL NOT gate any function on completion of a motion effect.

## Open Questions & Tensions

- **OQ-1 — Proof Signal retrieval contract.** This spec references the Harmonx data substrate / memory layer (`harmonx-platform` R12, R19.10) as the source of a Proof Signal but does not specify the retrieval interface. The exact query/response contract for pulling a signal into an atom should be reconciled with the platform's gateway design before implementation.
- **OQ-2 — Content-faithfulness detection mechanism.** Requirement 7 mandates content-faithfulness as a guarantee. Whether faithfulness is enforced by structured extraction of claims/stats/brands from the atom and set-containment checking, by human review, or both is a design decision deferred to design.md. The correctness property will be stated over the structured representation.
- **OQ-3 — Brand Example curation ownership.** The curated set of Black/POC and culturally-grounded brands is sourced from configuration (R5.1). Who owns and updates that configuration set (and whether it draws from the platform memory layer) is unresolved.
- **OQ-4 — Political-framing and over-disclosure flagging.** Requirements 6.2 and 6.4 require flagging political framing and over-disclosure of proprietary work. The detection approach (heuristic, model-assisted, or human-in-the-loop) is deferred to design; these criteria may be non-property-testable and handled as guidance rather than automated gates.
- **OQ-5 — Recorded video artifact.** The Founder Video projection is specified as a Video Brief (script + shot direction), not a rendered video file (R11.1). Whether the engine later ingests or links the recorded video is out of scope for this spec.
