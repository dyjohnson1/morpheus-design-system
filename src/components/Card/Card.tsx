import * as React from "react";
import { Surface, type SurfaceElevation, type SurfaceVariant } from "../Surface";
import styles from "./Card.module.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Elevation tier 0–4; passed through to Surface. */
  elevation?: SurfaceElevation;
  /** Visual material variant; passed through to Surface. */
  variant?: SurfaceVariant;
  /** Optional header slot — rendered above the body with a divider. */
  header?: React.ReactNode;
  /** Optional footer slot — rendered below the body with a divider. */
  footer?: React.ReactNode;
  /** When true, pointer events are removed and opacity drops. */
  disabled?: boolean;
  /**
   * When true, the card is keyboard-focusable and shows a focus ring.
   * Use for clickable/selectable cards; omit for purely decorative containers.
   */
  interactive?: boolean;
}

/**
 * Morpheus Card — Surface + padding + optional header/footer slots.
 *
 * Composes Surface for all material-tier logic.
 * Tokens only · all states · reduced-motion safe · WCAG 2.2 AA.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      elevation = 1,
      variant = "raised",
      header,
      footer,
      disabled = false,
      interactive = false,
      children,
      className,
      tabIndex,
      ...rest
    },
    ref
  ) {
    const resolvedTabIndex =
      interactive && !disabled ? (tabIndex ?? 0) : tabIndex;

    return (
      <Surface
        ref={ref}
        elevation={elevation}
        variant={variant}
        disabled={disabled}
        className={[styles.card, interactive && styles.interactive, className]
          .filter(Boolean)
          .join(" ")}
        tabIndex={resolvedTabIndex}
        {...rest}
      >
        {header && (
          <div className={styles.header}>
            {header}
          </div>
        )}
        <div className={styles.body}>{children}</div>
        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </Surface>
    );
  }
);
