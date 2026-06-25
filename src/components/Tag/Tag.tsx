import * as React from "react";
import styles from "./Tag.module.css";
import { VisuallyHidden } from "../../primitives/VisuallyHidden";

export type TagVariant =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type TagSize = "sm" | "md";

export interface TagProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Visual intent — pairs icon + text so color is never the sole signal.
   * @default "neutral"
   */
  variant?: TagVariant;
  /**
   * Size variant. md is the comfortable density default.
   * @default "md"
   */
  size?: TagSize;
  /** Whether the tag is in a selected / active state (toggle chip). */
  selected?: boolean;
  /**
   * When true, renders an × button. Pair with onRemove.
   * The dismiss button is suppressed while disabled.
   */
  removable?: boolean;
  /** Callback fired when the × remove button is clicked. */
  onRemove?: () => void;
  /** Accessible label for the remove button. Defaults to "Remove". */
  removeLabel?: string;
  /** Disables the tag and dims it. */
  disabled?: boolean;
  /** Optional leading icon (inherits currentColor, sized by CSS). */
  iconLeading?: React.ReactNode;
}

/**
 * Morpheus Tag / Chip — compact interactive label for filtering,
 * categorising, or selecting items.
 *
 * - Use as a **filter chip** (toggle): `selected` + `onClick`
 * - Use as a **removable tag**: `removable` + `onRemove`
 *
 * When `removable=true` the chip renders as a `<span role="button">` with
 * the × as a sibling `<button>` inside a wrapper — this is the only valid
 * HTML pattern that satisfies WCAG (no button-in-button nesting).
 *
 * Status meaning is NEVER conveyed by color alone — always pair with icon/text.
 * Tokens only · all states · WCAG 2.2 AA · reduced-motion safe.
 */
export const Tag = React.forwardRef<HTMLElement, TagProps>(
  function Tag(
    {
      variant = "neutral",
      size = "md",
      selected = false,
      removable = false,
      onRemove,
      removeLabel = "Remove",
      disabled = false,
      iconLeading,
      children,
      className,
      onClick,
      onKeyDown,
      ...rest
    },
    ref
  ) {
    const chipClasses = [
      styles.tag,
      styles[variant],
      styles[size],
      selected && styles.selected,
      disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    const innerContent = (
      <>
        {iconLeading && (
          <span className={styles.icon} aria-hidden="true">
            {iconLeading}
          </span>
        )}
        <span className={styles.label}>{children}</span>
      </>
    );

    // ── Removable mode ────────────────────────────────────────────────────
    // A <button> cannot be a descendant of another <button> (causes
    // axe nested-interactive violation). When the chip is removable, we
    // render the chip body as `<span role="button">` and the × as a sibling
    // <button>, both inside a flex wrapper <span>.
    if (removable) {
      function handleChipKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
        if (!disabled && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
          onClick?.(e as unknown as React.MouseEvent<HTMLElement>);
        }
        (onKeyDown as React.KeyboardEventHandler<HTMLSpanElement> | undefined)?.(e);
      }

      function handleRemoveClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        onRemove?.();
      }

      function handleRemoveKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          onRemove?.();
        }
      }

      return (
        <span className={[styles.chipWrapper, className].filter(Boolean).join(" ")}>
          {/* Chip body — ARIA button so screen readers can toggle it */}
          <span
            ref={ref as React.Ref<HTMLSpanElement>}
            role="button"
            className={chipClasses}
            tabIndex={disabled ? -1 : 0}
            aria-pressed={selected}
            aria-disabled={disabled || undefined}
            onClick={disabled ? undefined : (onClick as React.MouseEventHandler<HTMLSpanElement> | undefined)}
            onKeyDown={handleChipKeyDown}
            {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
          >
            {innerContent}
          </span>
          {/* × remove button — only when not disabled */}
          {!disabled && (
            <button
              type="button"
              className={styles.remove}
              onClick={handleRemoveClick}
              onKeyDown={handleRemoveKeyDown}
              aria-label={removeLabel}
              tabIndex={0}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
                focusable="false"
              >
                <line x1="4" y1="4" x2="12" y2="12" />
                <line x1="12" y1="4" x2="4" y2="12" />
              </svg>
              <VisuallyHidden>{removeLabel}</VisuallyHidden>
            </button>
          )}
        </span>
      );
    }

    // ── Non-removable mode — plain <button> ───────────────────────────────
    function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onClick?.(e as unknown as React.MouseEvent<HTMLElement>);
      }
      (onKeyDown as React.KeyboardEventHandler<HTMLButtonElement> | undefined)?.(e);
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={[chipClasses, className].filter(Boolean).join(" ")}
        disabled={disabled}
        aria-pressed={selected}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
        onKeyDown={handleKeyDown}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {innerContent}
      </button>
    );
  }
);
