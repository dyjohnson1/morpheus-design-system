import * as React from "react";
import styles from "./GenerationState.module.css";

export type GenerationStatus =
  | "idle"
  | "generating"
  | "complete"
  | "error"
  | "cancelled";

export type GenerationDensity = "comfortable" | "compact";

export interface GenerationStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Current generation state. */
  state: GenerationStatus;
  /** Optional override for the visible/announced label. */
  label?: string;
  /** Determinate progress (0–100). Only shown during "generating". */
  progress?: number;
  /** Callback when the cancel button is pressed. Shows cancel button when provided and state is "generating". */
  onCancel?: () => void;
  /** Density mode. @default "comfortable" */
  density?: GenerationDensity;
}

const DEFAULT_LABELS: Record<GenerationStatus, string> = {
  idle: "",
  generating: "Working on it — give me a few seconds",
  complete: "There we go",
  error: "Couldn't finish that one. Try again when you're ready",
  cancelled: "Stopped",
};

/**
 * Morpheus GenerationState — AI generation status live region.
 *
 * Announces the current state of AI generation via `role="status"` with
 * `aria-live="polite"`. State is conveyed by icon + text (never color alone).
 * The generating state shows a subtle pulsing indicator (reduced-motion safe).
 * Optional determinate progress bar and cancel button during generation.
 *
 * Tokens only · density-aware · reduced-motion safe · WCAG 2.2 AA.
 */
export const GenerationState = React.forwardRef<
  HTMLDivElement,
  GenerationStateProps
>(function GenerationState(
  {
    state,
    label,
    progress,
    onCancel,
    density = "comfortable",
    className,
    ...rest
  },
  ref
) {
  const text = label ?? DEFAULT_LABELS[state];

  // Don't render anything visible in idle state (still mount the live region)
  const isIdle = state === "idle" && !label;

  const showProgress =
    state === "generating" && progress !== undefined;
  const clampedProgress = showProgress
    ? Math.min(Math.max(0, progress!), 100)
    : undefined;

  return (
    <div
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-state={state}
      data-density={density}
      role="status"
      aria-live="polite"
      {...rest}
    >
      {!isIdle && (
        <div className={styles.content}>
          <span className={styles.indicator} aria-hidden="true" />
          <span className={styles.label}>{text}</span>

          {showProgress && (
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuenow={clampedProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Generation progress"
            >
              <div
                className={styles.progressFill}
                style={{ width: `${clampedProgress}%` }}
              />
            </div>
          )}

          {state === "generating" && onCancel && (
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
              aria-label="Cancel generation"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
});
