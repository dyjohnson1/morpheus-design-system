import * as React from "react";
import styles from "./ToolCallCard.module.css";

export type ToolCallStatus = "pending" | "running" | "success" | "error";
export type ToolCallDensity = "comfortable" | "compact";

export interface ToolCallCardProps {
  /** Name of the tool/function being called. */
  name: string;
  /** Brief description or purpose of the tool call. */
  description?: string;
  /** Current execution status. @default "pending" */
  status?: ToolCallStatus;
  /** Optional icon element for the tool. */
  icon?: React.ReactNode;
  /** Duration string (e.g. "1.2s") showing how long the tool call took. */
  duration?: string;
  /** URL linking to the tool source or documentation. */
  sourceUrl?: string;
  /** Label for the source link. @default "Source" */
  sourceLabel?: string;
  /** Collapsible detail content (input/output data). */
  detail?: React.ReactNode;
  /** Whether the detail section is expanded (controlled). */
  expanded?: boolean;
  /** Default expanded state (uncontrolled). @default false */
  defaultExpanded?: boolean;
  /** Called when the expanded state changes. */
  onToggle?: (expanded: boolean) => void;
  /** Density variant. @default "comfortable" */
  density?: ToolCallDensity;
  /** Additional class name on the root element. */
  className?: string;
}

const STATUS_LABELS: Record<ToolCallStatus, string> = {
  pending: "Pending",
  running: "Running",
  success: "Completed",
  error: "Failed",
};

/**
 * Morpheus ToolCallCard — AI pattern.
 *
 * Displays information about a tool/function call made by an AI agent.
 * Shows tool name, status (icon + text + color), optional description,
 * duration, source link, and collapsible detail section.
 *
 * - Root is `<article>` with a descriptive aria-label
 * - Status uses icon + text + color (never color alone)
 * - Collapsible detail with `aria-expanded` on trigger
 * - Source URL rendered as a real `<a>` link
 * - Density-aware (comfortable/compact)
 *
 * Tokens only · all states · WCAG 2.2 AA · reduced-motion fallback.
 */
export const ToolCallCard = React.forwardRef<HTMLElement, ToolCallCardProps>(
  function ToolCallCard(
    {
      name,
      description,
      status = "pending",
      icon,
      duration,
      sourceUrl,
      sourceLabel = "Source",
      detail,
      expanded: controlledExpanded,
      defaultExpanded = false,
      onToggle,
      density = "comfortable",
      className,
    },
    ref
  ) {
    const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded);
    const isControlled = controlledExpanded !== undefined;
    const expanded = isControlled ? controlledExpanded : internalExpanded;

    const detailId = React.useId();

    const handleToggle = () => {
      const next = !expanded;
      if (!isControlled) {
        setInternalExpanded(next);
      }
      onToggle?.(next);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    };

    const rootClasses = [styles.root, className].filter(Boolean).join(" ");
    const ariaLabel = `Tool call: ${name}, status: ${STATUS_LABELS[status]}`;

    return (
      <article
        ref={ref}
        className={rootClasses}
        aria-label={ariaLabel}
        data-status={status}
        data-density={density}
      >
        <div className={styles.header}>
          <div className={styles.titleRow}>
            {icon && (
              <span className={styles.icon} aria-hidden="true">
                {icon}
              </span>
            )}
            <span className={styles.name}>{name}</span>
            {duration && (
              <span className={styles.duration}>{duration}</span>
            )}
          </div>

          <div className={styles.statusRow}>
            <span className={styles.statusIcon} aria-hidden="true">
              {statusIcon(status)}
            </span>
            <span className={styles.statusText}>{STATUS_LABELS[status]}</span>
          </div>
        </div>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {sourceUrl && (
          <a
            href={sourceUrl}
            className={styles.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {sourceLabel}
          </a>
        )}

        {detail && (
          <>
            <button
              type="button"
              className={styles.detailTrigger}
              aria-expanded={expanded}
              aria-controls={detailId}
              onClick={handleToggle}
              onKeyDown={handleKeyDown}
            >
              <span className={styles.chevron} aria-hidden="true" data-expanded={expanded}>
                &#9654;
              </span>
              <span>Details</span>
            </button>

            <div
              id={detailId}
              className={styles.detailContent}
              role="region"
              aria-label="Tool call details"
              hidden={!expanded}
            >
              {expanded && (
                <div className={styles.detailInner}>{detail}</div>
              )}
            </div>
          </>
        )}
      </article>
    );
  }
);

/** Returns the appropriate SVG icon for each status. */
function statusIcon(status: ToolCallStatus): React.ReactNode {
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
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "running":
      return (
        <svg {...props}>
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="M4.93 4.93l2.83 2.83" />
          <path d="M16.24 16.24l2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
          <path d="M4.93 19.07l2.83-2.83" />
          <path d="M16.24 7.76l2.83-2.83" />
        </svg>
      );
    case "success":
      return (
        <svg {...props}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case "error":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
  }
}
