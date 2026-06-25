import * as React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import styles from "./Switch.module.css";

export type SwitchSize = "comfortable" | "compact";

export interface SwitchProps {
  /** Controlled checked state. */
  checked?: boolean;
  /** Default checked state (uncontrolled). */
  defaultChecked?: boolean;
  /** Callback when checked state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the switch is disabled. */
  disabled?: boolean;
  /** Optional visible label rendered beside the switch. */
  label?: string;
  /**
   * Density size variant.
   * @default "comfortable"
   */
  size?: SwitchSize;
  /** HTML id attribute for the switch input. */
  id?: string;
  /** HTML name attribute for form submission. */
  name?: string;
  /** Accessible label when no visible label is provided. */
  "aria-label"?: string;
  /** ID of element that labels this switch. */
  "aria-labelledby"?: string;
}

/**
 * Morpheus Switch — accessible toggle switch built on @radix-ui/react-switch.
 *
 * A binary on/off toggle with a sliding thumb indicator.
 * Density-aware (comfortable/compact). Keyboard operable (Space toggles).
 * Visible focus ring via --morph-color-focus. Tokens only.
 *
 * WCAG 2.2 AA · reduced-motion safe · all states declared.
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch(
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
    const switchId = id || generatedId;
    const labelId = `${switchId}-label`;

    const rootClasses = [
      styles.root,
      styles[size],
      disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    const switchElement = (
      <RadixSwitch.Root
        ref={ref}
        className={rootClasses}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        id={switchId}
        name={name}
        aria-label={!label ? ariaLabel : undefined}
        aria-labelledby={label ? labelId : ariaLabelledBy}
      >
        <RadixSwitch.Thumb className={styles.thumb} />
      </RadixSwitch.Root>
    );

    if (label) {
      return (
        <div className={styles.wrapper}>
          {switchElement}
          <label
            id={labelId}
            htmlFor={switchId}
            className={[styles.label, disabled && styles.labelDisabled]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </label>
        </div>
      );
    }

    return switchElement;
  }
);
