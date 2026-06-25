import * as React from "react";
import styles from "./Textarea.module.css";

export type TextareaSize = "comfortable" | "compact";
export type TextareaResize = "vertical" | "horizontal" | "both" | "none";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** Error state — applies danger border styling. */
  error?: boolean;
  /**
   * Resize behavior.
   * @default "vertical"
   */
  resize?: TextareaResize;
  /**
   * Density size variant.
   * @default "comfortable"
   */
  size?: TextareaSize;
}

/**
 * Morpheus Textarea — styled multi-line text input.
 *
 * Supports error state, resize control, comfortable/compact density,
 * and full keyboard accessibility.
 *
 * Tokens only · all states · WCAG 2.2 AA · reduced-motion safe.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      error = false,
      resize = "vertical",
      size = "comfortable",
      disabled = false,
      className,
      style,
      ...rest
    },
    ref
  ) {
    const classes = [
      styles.textarea,
      styles[size],
      error && styles.error,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <textarea
        ref={ref}
        className={classes}
        disabled={disabled}
        aria-invalid={error || undefined}
        style={{ ...style, resize } as React.CSSProperties}
        {...rest}
      />
    );
  }
);
