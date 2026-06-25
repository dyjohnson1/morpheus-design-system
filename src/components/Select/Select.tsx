import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import styles from "./Select.module.css";

export type SelectSize = "comfortable" | "compact";

export interface SelectProps {
  /** Controlled value. */
  value?: string;
  /** Default value (uncontrolled). */
  defaultValue?: string;
  /** Callback when value changes. */
  onValueChange?: (value: string) => void;
  /** Placeholder text shown when no value is selected. */
  placeholder?: string;
  /** Whether the select is disabled. */
  disabled?: boolean;
  /** Whether the select is in an error state. */
  error?: boolean;
  /**
   * Density size variant.
   * @default "comfortable"
   */
  size?: SelectSize;
  /** Accessible label for screen readers. */
  "aria-label"?: string;
  /** ID of element that labels this select. */
  "aria-labelledby"?: string;
  /** SelectItem, SelectGroup, or SelectSeparator elements. */
  children: React.ReactNode;
}

/**
 * Morpheus Select — accessible dropdown built on @radix-ui/react-select.
 *
 * Trigger styled to match TextInput (border, radius, height, focus ring).
 * Supports comfortable/compact density, error state, placeholder, and
 * full keyboard accessibility via Radix primitives.
 *
 * Tokens only · all states · WCAG 2.2 AA · reduced-motion safe.
 */
export function Select({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option",
  disabled = false,
  error = false,
  size = "comfortable",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
}: SelectProps) {
  const triggerClasses = [
    styles.trigger,
    styles[size],
    error && styles.error,
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <RadixSelect.Trigger
        className={triggerClasses}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={error || undefined}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className={styles.chevron}>
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className={styles.content} position="popper" sideOffset={4}>
          <RadixSelect.ScrollUpButton className={styles.scrollButton}>
            <ChevronUpIcon />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className={styles.viewport}>
            {children}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className={styles.scrollButton}>
            <ChevronDownIcon />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

/* ─── SelectItem ──────────────────────────────────────────────────────────── */

export interface SelectItemProps {
  /** The value submitted when this item is selected. */
  value: string;
  /** Whether the item is disabled. */
  disabled?: boolean;
  /** Display text for the item. */
  children: React.ReactNode;
}

/**
 * An individual option within a Select.
 */
export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem({ value, disabled = false, children }, ref) {
    return (
      <RadixSelect.Item
        ref={ref}
        className={styles.item}
        value={value}
        disabled={disabled}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className={styles.itemIndicator}>
          <CheckIcon />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    );
  }
);

/* ─── SelectGroup ─────────────────────────────────────────────────────────── */

export interface SelectGroupProps {
  /** Label for the group. */
  label: string;
  /** SelectItem elements within this group. */
  children: React.ReactNode;
}

/**
 * Groups related SelectItems with a label (optgroup equivalent).
 */
export function SelectGroup({ label, children }: SelectGroupProps) {
  return (
    <RadixSelect.Group>
      <RadixSelect.Label className={styles.groupLabel}>{label}</RadixSelect.Label>
      {children}
    </RadixSelect.Group>
  );
}

/* ─── SelectSeparator ─────────────────────────────────────────────────────── */

/**
 * Visual separator between items/groups.
 */
export function SelectSeparator() {
  return <RadixSelect.Separator className={styles.separator} />;
}

/* ─── Icons (inline SVG, 1.75px stroke on 24px grid) ──────────────────────── */

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
