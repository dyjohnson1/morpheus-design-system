import * as React from "react";
import styles from "./EmptyState.module.css";

export type EmptyStateSize = "comfortable" | "compact";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional icon or illustration rendered above the heading.
   * Pass an SVG element or any ReactNode.
   */
  icon?: React.ReactNode;
  /**
   * Primary heading text — communicates the empty condition.
   * Warm, inviting tone per Morpheus voice guidelines.
   */
  heading: string;
  /**
   * Descriptive text — provides guidance on what to do next.
   * Can be a string or ReactNode for richer content.
   */
  description?: React.ReactNode;
  /**
   * Optional action slot — typically one or two buttons.
   * Pass a Button or ButtonGroup for the primary call-to-action.
   */
  actions?: React.ReactNode;
  /**
   * Density size — controls spacing and typography scale.
   * @default "comfortable"
   */
  size?: EmptyStateSize;
}

/**
 * Morpheus EmptyState — a centered placeholder for empty views or sections
 * that provides warm guidance and optional actions.
 *
 * Follows Morpheus voice: warmth lives in empty states.
 * Tokens only · density-aware · WCAG 2.2 AA · reduced-motion safe.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    {
      icon,
      heading,
      description,
      actions,
      size = "comfortable",
      className,
      ...rest
    },
    ref
  ) {
    const rootClasses = [
      styles.root,
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={rootClasses} {...rest}>
        {icon && (
          <div className={styles.icon} aria-hidden="true">
            {icon}
          </div>
        )}
        <h2 className={styles.heading}>{heading}</h2>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
        {actions && (
          <div className={styles.actions}>{actions}</div>
        )}
      </div>
    );
  }
);
