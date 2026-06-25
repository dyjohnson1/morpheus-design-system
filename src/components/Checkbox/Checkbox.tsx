import * as React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import styles from "./Checkbox.module.css";

export type CheckboxSize = "comfortable" | "compact";

export interface CheckboxProps {
  /** Controlled checked state. */
  checked?: boolean | "indeterminate";
  /** Default checked state (uncontrolled). */
  defaultChecked?: boolean;
  /** Callback when checked state changes. */
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  /** Whether the checkbox is disabled. */
  disabled?: boolean;
  /** Optional visible label rendered beside the checkbox. */
  label?: string;
  /**
   * Density size variant.
   * @default "comfortable"
   */
  size?: CheckboxSize;
  /** HTML id attribute for the checkbox input. */
  id?: string;
  /** HTML name attribute for form submission. */
  name?: string;
  /** Accessible label when no visible label is provided. */
  "aria-label"?: string;
  /** ID of element that labels this checkbox. */
  "aria-labelledby"?: string;
}

/**
 * Morpheus Checkbox — accessible checkbox built on @radix-ui/react-checkbox.
 *
 * Supports checked, unchecked, and indeterminate states.
 * Density-aware (comfortable/compact). Keyboard operable (Space toggles).
 * Visible focus ring via --morph-color-focus. Tokens only.
 *
 * WCAG 2.2 AA · reduced-motion safe · all states declared.
 */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox(
    {
      checked,
      defaultChecked,
      onCheckedChange,
      disabled = false,
      label,
      size = "comfortable",
      id,
      name,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
    },
    ref
  ) {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    const labelId = `${checkboxId}-label`;

    const rootClasses = [
      styles.root,
      styles[size],
      disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    const checkboxElement = (
      <RadixCheckbox.Root
        ref={ref}
        className={rootClasses}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        id={checkboxId}
        name={name}
        aria-label={!label ? ariaLabel : undefined}
        aria-labelledby={label ? labelId : ariaLabelledBy}
      >
        <RadixCheckbox.Indicator className={styles.indicator} forceMount>
          <CheckIcon className={styles.checkIcon} />
          <DashIcon className={styles.dashIcon} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
    );

    if (label) {
      return (
        <div className={styles.wrapper}>
          {checkboxElement}
          <label
            id={labelId}
            htmlFor={checkboxId}
            className={[styles.label, disabled && styles.labelDisabled]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </label>
        </div>
      );
    }

    return checkboxElement;
  }
);

/* ─── Icons (inline SVG, 1.75px stroke on 24px grid) ──────────────────────── */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function DashIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 12h12" />
    </svg>
  );
}
