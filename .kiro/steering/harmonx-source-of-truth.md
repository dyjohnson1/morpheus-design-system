---
inclusion: always
---

# Harmonx — Source of Truth & Sync

Harmonx knowledge lives in two systems. This file defines which one owns what, and how to keep them in sync, so they never quietly drift apart.

## The split

- **Notion = business source of truth.** Strategy, narrative, positioning, pricing, connector registry, and any exec- or client-facing decisions. Non-engineers work here. Authoritative docs today: "Harmonx — Business & Website (Final, July 2026)", "HARMONX website v1", and the legacy "Resonate" workspace (note: Resonate is the retired brand name for Harmonx).
- **Git repo (`.kiro/specs/`) = build source of truth.** Requirements, design, and tasks that engineers implement. If it drives what gets built, it lives here. Authoritative when there is any conflict about *what to build*.
- **Kiro = the bridge.** Kiro reconciles the two on demand via the Notion MCP connection. Sync is a deliberate, reviewed step — never a silent background copy.

## Rules

1. **Business intent flows Notion → spec.** When business direction changes in Notion, update the affected `.kiro/specs/*` docs to match, then note the reconciliation in that spec.
2. **Build detail stays in the spec.** Requirements, EARS acceptance criteria, correctness properties, and tasks are authored and owned in git — do not push implementation detail back into Notion as the master copy.
3. **Record reconciliations, don't silently resolve.** When Notion and a spec conflict, resolve in favor of Notion for business questions and the spec for build questions, and write the decision down (e.g. the "Open Reconciliation Decisions" / "Open Questions & Tensions" sections the Harmonx specs already use).
4. **Cite the Notion source.** When a spec is reconciled against Notion, name the exact Notion doc and the date it was reconciled, so staleness is visible.
5. **One vocabulary.** Shared terms (Brand Imprint™, data substrate, memory layer, Projection, Core Insight, data-faithfulness) mean the same thing in Notion and in every spec. Reuse; never redefine.

## Reconcile checklist (Notion → spec)

Run this when asked to sync a Harmonx spec with Notion:

1. Fetch the relevant Notion doc(s) via the Notion connection.
2. Diff the business intent against the target spec's requirements/design.
3. List each divergence as a decision (Notion wins for business, spec wins for build).
4. Apply the accepted changes to the spec.
5. Add/refresh a reconciliation note in the spec: source doc name + reconcile date + decisions made.
6. Commit the spec change to git with a message referencing the Notion source.

## What is not tracked

Notion pages are **not** mirrored into the git repo, and repo code is **not** pushed into Notion. The link between them is reconciliation notes plus this rule — not file duplication.
