import * as React from "react";
import styles from "./AgentStatus.module.css";

export type AgentState =
  | "idle" | "thinking" | "acting" | "waiting-on-you" | "done" | "error";

export interface AgentStatusProps {
  state: AgentState;
  /** Optional override for the announced/visible label. */
  label?: string;
}

const DEFAULTS: Record<AgentState, string> = {
  idle: "Ready when you are",
  thinking: "Working on it",
  acting: "Working on it",
  "waiting-on-you": "Waiting on you",
  done: "There we go",
  error: "Couldn't complete that",
};

/**
 * Morpheus AgentStatus — AI reference pattern.
 * Motion communicates state (thinking = breathing pulse; idle = still),
 * never a generic spinner. State changes are announced once via a polite
 * live region (SR-safe, debounced by React's single text update).
 */
export function AgentStatus({ state, label }: AgentStatusProps) {
  const text = label ?? DEFAULTS[state];
  return (
    <div className={styles.root} data-state={state}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{text}</span>
      {/* Managed live region: announces the current state once, politely. */}
      <span role="status" aria-live="polite" className={styles.srOnly}>
        {text}
      </span>
    </div>
  );
}
