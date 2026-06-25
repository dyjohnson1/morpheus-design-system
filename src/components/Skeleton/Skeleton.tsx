import * as React from "react";
import styles from "./Skeleton.module.css";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Shape variant. Default: text. */
  variant?: SkeletonVariant;
  /** Explicit width (CSS value). Falls back to 100% for text/rectangular/rounded, size for circular. */
  width?: string | number;
  /** Explicit height (CSS value). Falls back to 1em for text, size for circular. */
  height?: string | number;
  /** Whether the shimmer animation is active. Default: true. */
  animation?: boolean;
  /** Accessible label describing what content is loading. */
  "aria-label"?: string;
}

/**
 * Morpheus Skeleton — loading placeholder that indicates where content will appear.
 *
 * Variants: text (inline with line-height), circular, rectangular, rounded.
 * Animation: shimmer sweep using productive motion (t3) with reduced-motion fallback.
 * Accessibility: aria-busy + aria-label for screen readers.
 *
 * Tokens only · reduced-motion safe · WCAG 2.2 AA.
 */
export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(
  function Skeleton(
    {
      variant = "text",
      width,
      height,
      animation = true,
      className,
      style,
      "aria-label": ariaLabel = "Loading",
      ...rest
    },
    ref
  ) {
    const classNames = [
      styles.skeleton,
      styles[variant],
      animation ? styles.animated : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inlineStyle: React.CSSProperties = {
      ...style,
      ...(width != null ? { width: typeof width === "number" ? `${width}px` : width } : {}),
      ...(height != null ? { height: typeof height === "number" ? `${height}px` : height } : {}),
    };

    return (
      <span
        ref={ref}
        className={classNames}
        role="status"
        aria-busy="true"
        aria-label={ariaLabel}
        data-variant={variant}
        style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
        {...rest}
      />
    );
  }
);
