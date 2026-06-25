import * as React from "react";
import styles from "./IconButton.module.css";
import { VisuallyHidden } from "../../primitives/VisuallyHidden";

export type IconButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual intent — matches Button variants. One primary per view (Deference). */
  variant?: IconButtonVariant;
  /** The icon to render. Should be an SVG element. */
  icon: React.ReactNode;
  /** Accessible label — required; rendered via VisuallyHidden. */
  label: string;
  /** Size tier. Defaults to md (44px, comfortable density). */
  size?: IconButtonSize;
  /** Shows a quiet busy state; disables interaction and sets aria-busy. */
  loading?: boolean;
  /** Accessible label announced while loading. */
  loadingLabel?: string;
}

/**
 * Morpheus IconButton — an icon-only action control.
 *
 * Always requires a `label` prop for screen-reader accessibility.
 * Matches Button token contract: alias tokens only · all states · reduced-motion safe · WCAG 2.2 AA.
 *
 * When to use: toolbar actions, compact UI surfaces, icon-only affordances.
 * When not to use: when the action needs a text label for clarity — use Button instead.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      variant = "secondary",
      icon,
      label,
      size = "md",
      loading = false,
      loadingLabel = "Working on it",
      disabled,
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
        className={[
          styles.iconButton,
          styles[variant],
          styles[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-label={loading ? loadingLabel : label}
        {...rest}
      >
        {loading ? (
          <span className={styles.dots} aria-hidden="true">
            <i /><i /><i />
          </span>
        ) : (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        {/* VisuallyHidden backs the aria-label for SR announcements */}
        <VisuallyHidden>{loading ? loadingLabel : label}</VisuallyHidden>
      </button>
    );
  }
);
