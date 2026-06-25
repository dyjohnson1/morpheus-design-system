import * as React from "react";
import styles from "./ReasoningTrace.module.css";

export type ReasoningTraceStatus = "thinking" | "complete";
export type ReasoningTraceDensity = "comfortable" | "compact";

export interface ReasoningTraceProps {
  /** Steps or content to display in the reasoning trace. */
  steps: (string | React.ReactNode)[];
  /** Current status of the reasoning process. */
  status?: ReasoningTraceStatus;
  /** Label for the disclosure trigger. @default "Reasoning" */
  label?: string;
  /** Whether the trace is expanded (controlled). */
  expanded?: boolean;
  /** Default expanded state (uncontrolled). @default false */
  defaultExpanded?: boolean;
  /** Called when the expanded state changes. */
  onToggle?: (expanded: boolean) => void;
  /** Density variant. @default "comfortable" */
  density?: ReasoningTraceDensity;
  /** Additional class name on the root element. */
  className?: string;
}

/**
 * Morpheus ReasoningTrace — AI pattern.
 *
 * A collapsible disclosure that reveals the AI's reasoning/thinking steps.
 * Collapsed by default so screen readers don't auto-read reasoning content.
 * The user explicitly toggles to read the trace.
 *
 * - `aria-expanded` on the trigger button
 * - `aria-controls` links trigger to content panel
 * - No `aria-live` on content (user controls when to read)
 * - Thinking status shows a subtle animated indicator
 *
 * Tokens only · all states · WCAG 2.2 AA · reduced-motion fallback.
 */
export const ReasoningTrace = React.forwardRef<HTMLDivElement, ReasoningTraceProps>(
  function ReasoningTrace(
    {
      steps,
      status = "complete",
      label = "Reasoning",
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

    const contentId = React.useId();

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

    return (
      <div
        ref={ref}
        className={rootClasses}
        data-status={status}
        data-density={density}
      >
        <button
          type="button"
          className={styles.trigger}
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          <span className={styles.chevron} aria-hidden="true" data-expanded={expanded}>
            &#9654;
          </span>
          <span className={styles.label}>{label}</span>
          {status === "thinking" && (
            <span className={styles.indicator} aria-hidden="true" />
          )}
          {status === "thinking" && (
            <span className={styles.statusText}>thinking…</span>
          )}
        </button>

        <div
          id={contentId}
          className={styles.content}
          role="region"
          aria-labelledby={undefined}
          hidden={!expanded}
        >
          {expanded && (
            <ol className={styles.steps}>
              {steps.map((step, i) => (
                <li key={i} className={styles.step}>
                  {step}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
);
