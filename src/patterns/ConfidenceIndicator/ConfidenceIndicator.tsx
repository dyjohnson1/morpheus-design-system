import * as React from "react";
import styles from "./ConfidenceIndicator.module.css";

export type ConfidenceLevel = "high" | "medium" | "low" | "uncertain";
export type ConfidenceIndicatorDensity = "comfortable" | "compact";

export interface ConfidenceIndicatorProps {
  /**
   * Confidence level — either a named level or a numeric value between 0 and 1.
   * Numeric values map: ≥0.75 → high, ≥0.5 → medium, ≥0.25 → low, <0.25 → uncertain.
   */
  level: ConfidenceLevel | number;
  /** Custom label text. When omitted, a default label is derived from the level. */
  label?: string;
  /** Show a small muted icon alongside the text. @default false */
  showIcon?: boolean;
  /** Density variant. @default "comfortable" */
  density?: ConfidenceIndicatorDensity;
  /** Additional class name on the root element. */
  className?: string;
}

const DEFAULT_LABELS: Record<ConfidenceLevel, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
  uncertain: "Uncertain",
};

/** Maps a numeric 0–1 value to a named confidence level. */
function numericToLevel(value: number): ConfidenceLevel {
  if (value >= 0.75) return "high";
  if (value >= 0.5) return "medium";
  if (value >= 0.25) return "low";
  return "uncertain";
}

/**
 * Morpheus ConfidenceIndicator — AI pattern.
 *
 * Displays a textual confidence level for an AI response or claim.
 * Purely textual and muted — uses `on-surface-muted`, never alarm/status colors.
 * Confidence is conveyed in text, not color/styling alone (WCAG compliant).
 *
 * - Inline display as muted text (e.g. "High confidence")
 * - Accepts named level or numeric 0–1
 * - Optional muted icon (never colored)
 * - Density-aware (comfortable/compact)
 * - No motion (static text display)
 *
 * Tokens only · WCAG 2.2 AA · never alarm colors.
 */
export const ConfidenceIndicator = React.forwardRef<
  HTMLSpanElement,
  ConfidenceIndicatorProps
>(function ConfidenceIndicator(
  { level, label, showIcon = false, density = "comfortable", className },
  ref
) {
  const resolvedLevel =
    typeof level === "number" ? numericToLevel(level) : level;
  const text = label ?? DEFAULT_LABELS[resolvedLevel];

  const rootClasses = [styles.root, className].filter(Boolean).join(" ");

  return (
    <span
      ref={ref}
      className={rootClasses}
      data-level={resolvedLevel}
      data-density={density}
      aria-label={text}
    >
      {showIcon && (
        <span className={styles.icon} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            width="14"
            height="14"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </span>
      )}
      <span className={styles.label}>{text}</span>
    </span>
  );
});
