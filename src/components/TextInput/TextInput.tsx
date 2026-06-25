import * as React from "react";
import styles from "./TextInput.module.css";

export type TextInputSize = "comfortable" | "compact";

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Error state — applies danger border styling. */
  error?: boolean;
  /** Optional leading icon (displayed before the input text). */
  leadingIcon?: React.ReactNode;
  /** Optional trailing icon (displayed after the input text). */
  trailingIcon?: React.ReactNode;
  /**
   * Density size variant.
   * @default "comfortable"
   */
  size?: TextInputSize;
}

/**
 * Morpheus TextInput — styled text input field.
 *
 * Works standalone or composed inside a Field wrapper for label/helper/error.
 * Supports leading/trailing icon slots, comfortable/compact density,
 * error state, and full keyboard accessibility.
 *
 * Tokens only · all states · WCAG 2.2 AA · reduced-motion safe.
 */
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      error = false,
      leadingIcon,
      trailingIcon,
      size = "comfortable",
      disabled = false,
      className,
      ...rest
    },
    ref
  ) {
    const wrapperClasses = [
      styles.wrapper,
      styles[size],
      error && styles.error,
      disabled && styles.disabled,
      leadingIcon && styles.hasLeadingIcon,
      trailingIcon && styles.hasTrailingIcon,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClasses}>
        {leadingIcon && (
          <span className={styles.icon} aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          className={styles.input}
          disabled={disabled}
          aria-invalid={error || undefined}
          {...rest}
        />
        {trailingIcon && (
          <span className={styles.icon} aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </div>
    );
  }
);
