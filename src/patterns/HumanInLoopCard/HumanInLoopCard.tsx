import * as React from "react";
import styles from "./HumanInLoopCard.module.css";

export type HumanInLoopStatus = "pending" | "approved" | "modified" | "rejected";
export type HumanInLoopDensity = "comfortable" | "compact";

export interface HumanInLoopCardProps {
  /** The proposed action the agent wants to perform. */
  action: string;
  /** Why the agent is proposing this action. Part of the accessible description. */
  rationale: string;
  /** Current resolution status. @default "pending" */
  status?: HumanInLoopStatus;
  /** Called when user approves the action. */
  onApprove?: () => void;
  /** Called when user chooses to modify the action. */
  onModify?: () => void;
  /** Called when user rejects the action. */
  onReject?: () => void;
  /** Density variant. @default "comfortable" */
  density?: HumanInLoopDensity;
  /** Additional class name on the root element. */
  className?: string;
}

const STATUS_LABELS: Record<HumanInLoopStatus, string> = {
  pending: "Waiting on you",
  approved: "Approved",
  modified: "Modified",
  rejected: "Rejected",
};

/**
 * Morpheus HumanInLoopCard — AI pattern.
 *
 * Displays an AI checkpoint requiring human approval/decision.
 * Shows the proposed action, rationale (as accessible description),
 * and approve/modify/reject buttons.
 *
 * - Root is `<article>` with descriptive aria-label
 * - Rationale is part of the accessible description (aria-describedby)
 * - Status uses icon + text (never color alone)
 * - Buttons disabled once resolved
 * - Density-aware (comfortable/compact)
 * - Keyboard + SR operable
 *
 * Tokens only · all states · WCAG 2.2 AA · reduced-motion fallback.
 */
export const HumanInLoopCard = React.forwardRef<HTMLElement, HumanInLoopCardProps>(
  function HumanInLoopCard(
    {
      action,
      rationale,
      status = "pending",
      onApprove,
      onModify,
      onReject,
      density = "comfortable",
      className,
    },
    ref
  ) {
    const rationaleId = React.useId();
    const isResolved = status !== "pending";
    const rootClasses = [styles.root, className].filter(Boolean).join(" ");

    return (
      <article
        ref={ref}
        className={rootClasses}
        aria-label={`Agent checkpoint: ${action}`}
        aria-describedby={rationaleId}
        data-status={status}
        data-density={density}
      >
        {/* Status indicator — icon + text, never color alone */}
        <div className={styles.statusRow}>
          <span className={styles.statusIcon} aria-hidden="true">
            {statusIcon(status)}
          </span>
          <span className={styles.statusText}>{STATUS_LABELS[status]}</span>
        </div>

        {/* Action */}
        <div className={styles.action}>{action}</div>

        {/* Rationale — accessible description */}
        <p className={styles.rationale} id={rationaleId}>
          {rationale}
        </p>

        {/* Action buttons */}
        <div className={styles.actions} role="group" aria-label="Decision actions">
          <button
            type="button"
            className={`${styles.btn} ${styles.btnApprove}`}
            onClick={onApprove}
            disabled={isResolved}
            aria-disabled={isResolved}
          >
            {approveIcon()}
            <span>Approve</span>
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnModify}`}
            onClick={onModify}
            disabled={isResolved}
            aria-disabled={isResolved}
          >
            {modifyIcon()}
            <span>Modify</span>
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnReject}`}
            onClick={onReject}
            disabled={isResolved}
            aria-disabled={isResolved}
          >
            {rejectIcon()}
            <span>Reject</span>
          </button>
        </div>
      </article>
    );
  }
);

/* ─── Status icons ──────────────────────────────────────────────────────── */
function statusIcon(status: HumanInLoopStatus): React.ReactNode {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    focusable: "false" as const,
    width: "16",
    height: "16",
  };

  switch (status) {
    case "pending":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    case "approved":
      return (
        <svg {...props}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case "modified":
      return (
        <svg {...props}>
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      );
    case "rejected":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
  }
}

/* ─── Button icons ──────────────────────────────────────────────────────── */
function approveIcon(): React.ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
      className={styles.btnIcon}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function modifyIcon(): React.ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
      className={styles.btnIcon}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function rejectIcon(): React.ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
      className={styles.btnIcon}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
