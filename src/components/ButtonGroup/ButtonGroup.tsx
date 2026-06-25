import * as React from "react";
import styles from "./ButtonGroup.module.css";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Layout direction of the grouped buttons.
   * @default "horizontal"
   */
  orientation?: ButtonGroupOrientation;
  /**
   * When true, buttons are joined with shared borders (segmented control pattern).
   * When false, buttons retain individual rounding with a gap.
   * @default false
   */
  attached?: boolean;
  /**
   * Disables all child buttons. Individual button disabled state still respected.
   */
  disabled?: boolean;
}

/**
 * Morpheus ButtonGroup — lays out a set of Button or IconButton components in a row or column.
 *
 * Provides the `role="group"` landmark and manages attached-border layout.
 * Does not control variant or state of individual buttons — each Button manages its own.
 *
 * When to use: toolbar clusters, segmented controls, multi-action affordances.
 * When not to use: when only one action exists (use Button directly).
 *
 * Tokens only · all states · reduced-motion safe · WCAG 2.2 AA.
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(
    {
      orientation = "horizontal",
      attached = false,
      disabled = false,
      children,
      className,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        data-orientation={orientation}
        data-attached={attached || undefined}
        data-disabled={disabled || undefined}
        className={[
          styles.group,
          styles[orientation],
          attached && styles.attached,
          disabled && styles.disabled,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
