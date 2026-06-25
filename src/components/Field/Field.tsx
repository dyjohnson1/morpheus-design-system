import * as React from "react";
import styles from "./Field.module.css";

export interface FieldProps {
  /** Text label displayed above the input. */
  label: string;
  /** Ties the label to the input element via htmlFor. */
  htmlFor?: string;
  /** Hint text shown below the input (hidden when error is present). */
  helperText?: string;
  /** Error state. String displays a message; boolean shows error styling only. */
  error?: string | boolean;
  /** Marks the field as required with a "(required)" indicator. */
  required?: boolean;
  /** Disables the field — mutes label, helper, and child. */
  disabled?: boolean;
  /** The form input element. */
  children: React.ReactNode;
  /** Additional class name for the wrapper. */
  className?: string;
}

/**
 * Morpheus Field — compositional wrapper providing label, helper text,
 * and error message for any form input.
 *
 * Generates unique IDs for aria-describedby linking so child inputs
 * can reference helper/error text for screen readers.
 *
 * Tokens only · density-aware · WCAG 2.2 AA · error = icon + text + color.
 */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(
    {
      label,
      htmlFor,
      helperText,
      error,
      required = false,
      disabled = false,
      children,
      className,
    },
    ref
  ) {
    const id = React.useId();
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;

    // Build aria-describedby value for the child input
    const describedBy = hasError && errorMessage
      ? errorId
      : helperText
        ? helperId
        : undefined;

    const wrapperClasses = [
      styles.field,
      hasError && styles.error,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={wrapperClasses} data-describedby={describedBy}>
        <label
          className={styles.label}
          htmlFor={htmlFor}
        >
          {label}
          {required && (
            <span className={styles.required}>(required)</span>
          )}
        </label>

        <div className={styles.inputSlot}>
          {children}
        </div>

        {hasError && errorMessage ? (
          <div
            className={styles.errorMessage}
            id={errorId}
            role="alert"
            aria-live="polite"
          >
            <svg
              className={styles.errorIcon}
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        ) : helperText ? (
          <div className={styles.helperText} id={helperId}>
            {helperText}
          </div>
        ) : null}
      </div>
    );
  }
);
