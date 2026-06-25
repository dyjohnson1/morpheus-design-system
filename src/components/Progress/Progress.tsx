import * as React from "react";
import styles from "./Progress.module.css";

export type ProgressShape = "linear" | "circular";
export type ProgressSize = "comfortable" | "compact";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress value (0–100). Omit for indeterminate mode. */
  value?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Shape variant: horizontal bar or circular ring/spinner. @default "linear" */
  shape?: ProgressShape;
  /** Density size. @default "comfortable" */
  size?: ProgressSize;
  /** Accessible label describing what is loading. Required for screen readers. */
  label?: string;
  /** Whether to render the label visually. @default false (VisuallyHidden) */
  showLabel?: boolean;
}

/**
 * Morpheus Progress — determinate (bar/ring) and indeterminate (animation) progress indicator.
 *
 * Shapes: linear (horizontal bar) · circular (ring/spinner).
 * Modes: determinate (value 0–100) · indeterminate (no value, continuous animation).
 *
 * Accessibility: role="progressbar" with aria-valuenow/min/max for determinate;
 * indeterminate omits aria-valuenow and sets aria-busy.
 *
 * Motion: smooth fill transition (productive t3) for determinate; continuous spin/pulse
 * for indeterminate. Reduced-motion: static states, no animation.
 *
 * Tokens only · density-aware · WCAG 2.2 AA.
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    {
      value,
      max = 100,
      shape = "linear",
      size = "comfortable",
      label,
      showLabel = false,
      className,
      style,
      ...rest
    },
    ref
  ) {
    const isDeterminate = value !== undefined;
    const clampedValue = isDeterminate
      ? Math.min(Math.max(0, value), max)
      : undefined;
    const percentage = isDeterminate ? (clampedValue! / max) * 100 : undefined;

    const classNames = [
      styles.progress,
      styles[shape],
      styles[size],
      isDeterminate ? styles.determinate : styles.indeterminate,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const ariaProps: Record<string, unknown> = {
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": max,
      "aria-label": label,
    };

    if (isDeterminate) {
      ariaProps["aria-valuenow"] = clampedValue;
    } else {
      ariaProps["aria-busy"] = true;
    }

    return (
      <div ref={ref} className={classNames} style={style} {...ariaProps} {...rest}>
        {shape === "linear" ? (
          <LinearTrack percentage={percentage} />
        ) : (
          <CircularTrack percentage={percentage} size={size} />
        )}
        {label && (
          <span className={showLabel ? styles.label : styles.labelHidden}>
            {label}
          </span>
        )}
      </div>
    );
  }
);

/* ─── Internal: Linear track + fill ──────────────────────────────────────── */

function LinearTrack({ percentage }: { percentage?: number }) {
  const fillStyle: React.CSSProperties | undefined =
    percentage !== undefined ? { width: `${percentage}%` } : undefined;

  return (
    <div className={styles.track}>
      <div className={styles.fill} style={fillStyle} />
    </div>
  );
}

/* ─── Internal: Circular SVG ring ────────────────────────────────────────── */

function CircularTrack({
  percentage,
  size,
}: {
  percentage?: number;
  size: ProgressSize;
}) {
  // Ring dimensions based on density
  const ringSize = size === "compact" ? 24 : 40;
  const strokeWidth = size === "compact" ? 3 : 4;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    percentage !== undefined
      ? circumference - (percentage / 100) * circumference
      : undefined;

  return (
    <svg
      className={styles.ring}
      width={ringSize}
      height={ringSize}
      viewBox={`0 0 ${ringSize} ${ringSize}`}
      aria-hidden="true"
      focusable="false"
    >
      {/* Background track */}
      <circle
        className={styles.ringTrack}
        cx={ringSize / 2}
        cy={ringSize / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Fill arc */}
      <circle
        className={styles.ringFill}
        cx={ringSize / 2}
        cy={ringSize / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
      />
    </svg>
  );
}
