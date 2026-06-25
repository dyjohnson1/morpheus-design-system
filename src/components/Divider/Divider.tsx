import * as React from "react";
import styles from "./Divider.module.css";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "subtle" | "default" | "strong";
export type DividerSpacing = "none" | "sm" | "md" | "lg";

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Axis of the divider line.
   * Horizontal renders an `<hr>` (semantic); vertical renders a decorative
   * `<div role="separator">`.
   * @default "horizontal"
   */
  orientation?: DividerOrientation;
  /**
   * Visual weight of the line.
   * @default "default"
   */
  variant?: DividerVariant;
  /**
   * Optional label centred within the divider (e.g. "OR").
   * When provided, the element gains a `role="separator"` landmark and the
   * label is wrapped in a `<span>` for correct semantics.
   */
  label?: string;
  /**
   * Block/inline spacing applied symmetrically around the divider.
   * Maps to spacing tokens.
   * @default "md"
   */
  spacing?: DividerSpacing;
}

/**
 * Morpheus Divider — semantic separator between content sections.
 *
 * Horizontal: `<hr>` (implicit role="separator").
 * Vertical: `<div role="separator" aria-orientation="vertical">`.
 * Labeled: wrapper with centred label text — aria-label set to the label value.
 *
 * No motion — this is a static structural element.
 * Tokens only · WCAG 2.2 AA · density-aware spacing.
 */
export const Divider = React.forwardRef<HTMLElement, DividerProps>(
  function Divider(
    {
      orientation = "horizontal",
      variant = "default",
      label,
      spacing = "md",
      className,
      ...rest
    },
    ref
  ) {
    const isVertical = orientation === "vertical";
    const hasLabel = Boolean(label);

    const classNames = [
      styles.divider,
      styles[orientation],
      styles[variant],
      styles[`spacing-${spacing}`],
      hasLabel && styles.labeled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // ── Labeled divider (horizontal only, "OR" pattern) ──────────────────
    if (hasLabel) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-label={label}
          className={classNames}
          {...rest}
        >
          <span className={styles.labelText} aria-hidden="true">
            {label}
          </span>
        </div>
      );
    }

    // ── Vertical decorative separator ────────────────────────────────────
    if (isVertical) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="vertical"
          className={classNames}
          {...rest}
        />
      );
    }

    // ── Horizontal semantic separator (default) ──────────────────────────
    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        className={classNames}
        {...rest}
      />
    );
  }
);
