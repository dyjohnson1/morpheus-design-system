import * as React from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import styles from "./Radio.module.css";

export type RadioSize = "comfortable" | "compact";
export type RadioOrientation = "vertical" | "horizontal";

export interface RadioGroupProps {
  /** Controlled value. */
  value?: string;
  /** Default value (uncontrolled). */
  defaultValue?: string;
  /** Callback when the selected value changes. */
  onValueChange?: (value: string) => void;
  /** Whether the entire group is disabled. */
  disabled?: boolean;
  /** Layout orientation of the radio items. @default "vertical" */
  orientation?: RadioOrientation;
  /**
   * Density size variant.
   * @default "comfortable"
   */
  size?: RadioSize;
  /** Accessible label for the radio group. */
  "aria-label"?: string;
  /** ID of element that labels this radio group. */
  "aria-labelledby"?: string;
  /** Radio items. */
  children: React.ReactNode;
}

export interface RadioItemProps {
  /** The value of this radio item (must be unique within the group). */
  value: string;
  /** Whether this individual item is disabled. */
  disabled?: boolean;
  /** Optional visible label rendered beside the radio circle. */
  label?: string;
  /** HTML id attribute for the radio input. */
  id?: string;
}

/**
 * Morpheus RadioGroup — accessible radio group built on @radix-ui/react-radio-group.
 *
 * Supports vertical/horizontal orientation. Arrow keys navigate between items.
 * Density-aware (comfortable/compact). Visible focus ring via --morph-color-focus.
 * Tokens only — zero raw hex/px/ms.
 *
 * WCAG 2.2 AA · reduced-motion safe · all states declared.
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      orientation = "vertical",
      size = "comfortable",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      children,
    },
    ref
  ) {
    return (
      <RadioGroupContext.Provider value={{ size }}>
        <RadixRadioGroup.Root
          ref={ref}
          className={[styles.group, styles[orientation]].join(" ")}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          orientation={orientation}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        >
          {children}
        </RadixRadioGroup.Root>
      </RadioGroupContext.Provider>
    );
  }
);

/**
 * Morpheus RadioItem — individual radio option within a RadioGroup.
 *
 * Renders a circle indicator with an inner dot when selected.
 * Optional label rendered as a <label> element.
 */
export const RadioItem = React.forwardRef<HTMLButtonElement, RadioItemProps>(
  function RadioItem({ value, disabled = false, label, id }, ref) {
    const { size } = useRadioGroupContext();
    const generatedId = React.useId();
    const itemId = id || generatedId;
    const labelId = `${itemId}-label`;

    const rootClasses = [
      styles.item,
      styles[size],
      disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    const radioElement = (
      <RadixRadioGroup.Item
        ref={ref}
        className={rootClasses}
        value={value}
        disabled={disabled}
        id={itemId}
        aria-labelledby={label ? labelId : undefined}
      >
        <RadixRadioGroup.Indicator className={styles.indicator} />
      </RadixRadioGroup.Item>
    );

    if (label) {
      return (
        <div className={styles.wrapper}>
          {radioElement}
          <label
            id={labelId}
            htmlFor={itemId}
            className={[styles.label, disabled && styles.labelDisabled]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </label>
        </div>
      );
    }

    return radioElement;
  }
);

/* ─── Internal context for passing size from group to items ────────────── */

interface RadioGroupContextValue {
  size: RadioSize;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({
  size: "comfortable",
});

function useRadioGroupContext(): RadioGroupContextValue {
  return React.useContext(RadioGroupContext);
}
