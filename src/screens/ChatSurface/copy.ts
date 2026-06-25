/**
 * ChatSurface — Voice copy constants (tone matrix aligned).
 *
 * All user-facing strings for the Chat Surface screen, organized by state.
 * Sourced from the Morpheus voice tone matrix:
 * - Empty state → warm
 * - Success/completion → warm, brief
 * - Generating → warm, calm
 * - Recoverable error → neutral-warm
 * - Blocking error → plain
 * - Destructive confirm → plain, precise
 * - Dense data → plain labels only
 *
 * Sentence case throughout. No exclamation points. No hype.
 */

/** Copy for the empty / first-run state (warm register). */
export const EMPTY_STATE = {
  heading: "Nothing here yet — let\u2019s make something",
  description:
    "Ask about your codebase, design tokens, accessibility, or anything you\u2019re building. I\u2019ll bring what I know.",
} as const;

/** Copy for the loading / generating state (warm, calm register). */
export const LOADING_STATE = {
  generating: "Working on it — give me a few seconds",
  thinking: "Working on it",
} as const;

/** Copy for error states (neutral-warm for recoverable, plain for blocking). */
export const ERROR_STATE = {
  recoverable:
    "Couldn\u2019t reach the server. Give it a second and try again.",
  blocking: "Something went wrong and this session can\u2019t continue. Start a new one.",
  retryLabel: "Retry",
} as const;

/** Copy for the HITL / agent-waiting state (plain, precise register). */
export const HITL_STATE = {
  agentStatus: "Waiting on you",
  composerPlaceholder: "Add context or approve above\u2026",
} as const;

/** Copy for the idle / populated state (warm, brief or plain). */
export const POPULATED_STATE = {
  agentReady: "Ready when you are",
  composerPlaceholder: "Ask anything\u2026",
  completionConfirm: "There we go",
} as const;

/** Accessible labels and landmark text (plain, functional). */
export const ARIA = {
  skipLink: "Skip to main content",
  sideNavDefault: "Navigation",
  messageArea: "Conversation",
  composerLabel: "Prompt",
} as const;
