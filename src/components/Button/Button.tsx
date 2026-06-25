import * as React from "react";
import styles from "./Button.module.css";
import { VisuallyHidden } from "../../primitives/VisuallyHidden";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual intent. One primary action per view (Deference). */
  variant?: ButtonVariant;
  /** Shows a quiet busy state; disables interaction and sets aria-busy. */
  loading?: boolean;
  /** Optional leading icon (inherits currentColor). */
  iconLeading?: React.ReactNode;
  /** Accessible label announced while loading. */
  loadingLabel?: string;
}

/**
 * Morpheus Button — the reference component.
 * Tokens only · all states · reduced-motion safe · WCAG 2.2 AA.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "secondary",
      loading = false,
      iconLeading,
      loadingLabel = "Working on it",
      disabled,
      children,
      className,
      ...rest
    },
    ref
  ) {
    const isDisabled = disabled || loading;
    return (
      <button
        ref={ref}
        type="button"
        className={[styles.button, styles[variant], className]
          .filter(Boolean)
          .join(" ")}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading ? (
          <>
            <span className={styles.dots} aria-hidden="true">
              <i /><i /><i />
            </span>
            <VisuallyHidden>{loadingLabel}</VisuallyHidden>
          </>
        ) : (
          <>
            {iconLeading && (
              <span className={styles.icon} aria-hidden="true">
                {iconLeading}
              </span>
            )}
            <span className={styles.label}>{children}</span>
          </>
        )}
      </button>
    );
  }
);
