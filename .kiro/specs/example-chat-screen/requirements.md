# Screen: AI Chat Surface — Requirements

## Purpose
<One sentence: what this screen lets the user do.>

## Prerequisite
P0 components exist and are exported from `src/index.ts`.

## Layout intent
<Describe regions top-to-bottom: e.g. "App bar with title + theme toggle; left SideNav;
main column with message history; sticky PromptInput at bottom.">

## Components used (compose, don't invent)
<List existing components: AppBar, SideNav, MessageTurn, StreamingText, AgentStatus, PromptInput, ...>

## States this screen must handle
- Empty / first-run (warm voice — see #morpheus-voice)
- Loading / generating (AgentStatus + GenerationState)
- Populated / normal
- Error / recoverable
- Human-in-the-loop checkpoint (if agentic)

## Acceptance criteria
1. Built ONLY from existing exported components + layout primitives; no new tokens, no inline hex/px/ms.
2. Responsive across xs–2xl per the grid in #morpheus-foundations.
3. Dark + light both correct; respects reduced-motion/transparency.
4. Full keyboard path through the primary task; visible focus throughout.
5. Copy follows the voice tone matrix (#morpheus-voice).
6. axe clean; a keyboard + SR pass documented.
