import * as React from "react";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import styles from "./Menu.module.css";

/* ─── Types ───────────────────────────────────────────────────────────────── */

export type MenuSide = "top" | "right" | "bottom" | "left";
export type MenuAlign = "start" | "center" | "end";

export interface MenuProps {
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Whether the menu opens by default (uncontrolled). */
  defaultOpen?: boolean;
  /** Whether the menu is modal (traps focus). Default: true. */
  modal?: boolean;
  children: React.ReactNode;
}

export interface MenuTriggerProps {
  /** The element that toggles the menu — must accept a ref. */
  children: React.ReactElement;
  /** Use `asChild` to merge trigger props onto the child. Default: true. */
  asChild?: boolean;
}

export interface MenuContentProps {
  /** Menu content (MenuItems, MenuGroups, etc.). */
  children: React.ReactNode;
  /** Which side of the trigger the menu appears on. Default: bottom. */
  side?: MenuSide;
  /** Alignment along the side axis. Default: start. */
  align?: MenuAlign;
  /** Offset from the trigger in px. Default: 4. */
  sideOffset?: number;
  /** Additional CSS class. */
  className?: string;
  /** Callback when escape key is pressed. */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /** Callback when pointer down outside content. */
  onPointerDownOutside?: (event: CustomEvent) => void;
}

export interface MenuItemProps {
  /** Callback when item is selected. */
  onSelect?: (event: Event) => void;
  /** Whether the item is disabled. */
  disabled?: boolean;
  /** Optional destructive/danger styling. */
  destructive?: boolean;
  /** Content for the item. */
  children: React.ReactNode;
  /** Additional CSS class. */
  className?: string;
}

export interface MenuCheckboxItemProps {
  /** Whether the item is checked. */
  checked?: boolean;
  /** Callback when checked state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the item is disabled. */
  disabled?: boolean;
  /** Content for the item. */
  children: React.ReactNode;
}

export interface MenuRadioGroupProps {
  /** Current selected value. */
  value?: string;
  /** Callback when value changes. */
  onValueChange?: (value: string) => void;
  /** MenuRadioItem elements. */
  children: React.ReactNode;
}

export interface MenuRadioItemProps {
  /** The value for this radio item. */
  value: string;
  /** Whether the item is disabled. */
  disabled?: boolean;
  /** Content for the item. */
  children: React.ReactNode;
}

export interface MenuGroupProps {
  /** Optional label for the group. */
  label?: string;
  /** Menu items within this group. */
  children: React.ReactNode;
}

export interface MenuSubProps {
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Whether the submenu opens by default (uncontrolled). */
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export interface MenuSubTriggerProps {
  /** Whether the sub-trigger is disabled. */
  disabled?: boolean;
  /** Content for the sub-trigger. */
  children: React.ReactNode;
  /** Additional CSS class. */
  className?: string;
}

export interface MenuSubContentProps {
  /** Submenu content. */
  children: React.ReactNode;
  /** Offset from the trigger in px. Default: 2. */
  sideOffset?: number;
  /** Additional CSS class. */
  className?: string;
}

/* ─── Components ──────────────────────────────────────────────────────────── */

/**
 * Morpheus Menu — dropdown menu anchored to a trigger.
 *
 * Built on @radix-ui/react-dropdown-menu for accessible behavior:
 * - Full keyboard navigation (arrow keys, typeahead, Home/End)
 * - Escape key dismissal with focus return
 * - aria-expanded on trigger, role="menu" on content, role="menuitem" on items
 * - Submenus, checkbox items, radio groups
 * - Collision-aware positioning
 *
 * Compound pattern: Menu, MenuTrigger, MenuContent, MenuItem,
 * MenuCheckboxItem, MenuRadioGroup, MenuRadioItem, MenuGroup,
 * MenuSeparator, MenuSub, MenuSubTrigger, MenuSubContent.
 *
 * Motion: productive/t3 entrance (scale from 0.96 + fade), t2 exit (fade).
 * Reduced-motion: simple fade at t2.
 *
 * Tokens only · WCAG 2.2 AA · reduced-motion safe.
 */
export function Menu({
  open,
  onOpenChange,
  defaultOpen,
  modal = true,
  children,
}: MenuProps) {
  return (
    <RadixDropdown.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      modal={modal}
    >
      {children}
    </RadixDropdown.Root>
  );
}


/**
 * Trigger that toggles the menu.
 * Merges props onto the child element via Radix `asChild`.
 */
export function MenuTrigger({ children, asChild = true }: MenuTriggerProps) {
  return <RadixDropdown.Trigger asChild={asChild}>{children}</RadixDropdown.Trigger>;
}

/**
 * Menu content panel — positioned relative to the trigger.
 *
 * Surface: overlay material with subtle border, elevation shadow.
 * Motion: productive/t3 entrance (scale + fade), t2 exit (fade).
 * Reduced-motion: simple fade at t2.
 */
export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuContent(
    {
      children,
      side = "bottom",
      align = "start",
      sideOffset = 4,
      className,
      onEscapeKeyDown,
      onPointerDownOutside,
    },
    ref
  ) {
    const contentClasses = [styles.content, className].filter(Boolean).join(" ");

    return (
      <RadixDropdown.Portal>
        <RadixDropdown.Content
          ref={ref}
          className={contentClasses}
          side={side}
          align={align}
          sideOffset={sideOffset}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
        >
          {children}
        </RadixDropdown.Content>
      </RadixDropdown.Portal>
    );
  }
);

/**
 * A single selectable item within the menu.
 * Supports destructive styling for dangerous actions.
 */
export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  function MenuItem({ onSelect, disabled = false, destructive = false, children, className }, ref) {
    const itemClasses = [
      styles.item,
      destructive && styles.destructive,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <RadixDropdown.Item
        ref={ref}
        className={itemClasses}
        onSelect={onSelect}
        disabled={disabled}
      >
        {children}
      </RadixDropdown.Item>
    );
  }
);

/**
 * A checkbox menu item — toggles checked state.
 */
export const MenuCheckboxItem = React.forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  function MenuCheckboxItem({ checked, onCheckedChange, disabled = false, children }, ref) {
    return (
      <RadixDropdown.CheckboxItem
        ref={ref}
        className={styles.checkboxItem}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      >
        <RadixDropdown.ItemIndicator className={styles.itemIndicator}>
          <CheckIcon />
        </RadixDropdown.ItemIndicator>
        {children}
      </RadixDropdown.CheckboxItem>
    );
  }
);

/**
 * Radio group for mutually exclusive menu items.
 */
export function MenuRadioGroup({ value, onValueChange, children }: MenuRadioGroupProps) {
  return (
    <RadixDropdown.RadioGroup value={value} onValueChange={onValueChange}>
      {children}
    </RadixDropdown.RadioGroup>
  );
}

/**
 * A radio menu item — selectable within a MenuRadioGroup.
 */
export const MenuRadioItem = React.forwardRef<HTMLDivElement, MenuRadioItemProps>(
  function MenuRadioItem({ value, disabled = false, children }, ref) {
    return (
      <RadixDropdown.RadioItem
        ref={ref}
        className={styles.radioItem}
        value={value}
        disabled={disabled}
      >
        <RadixDropdown.ItemIndicator className={styles.itemIndicator}>
          <DotIcon />
        </RadixDropdown.ItemIndicator>
        {children}
      </RadixDropdown.RadioItem>
    );
  }
);

/**
 * Groups related items with an optional label.
 */
export function MenuGroup({ label, children }: MenuGroupProps) {
  return (
    <RadixDropdown.Group>
      {label && <RadixDropdown.Label className={styles.label}>{label}</RadixDropdown.Label>}
      {children}
    </RadixDropdown.Group>
  );
}

/**
 * Visual separator between items/groups.
 */
export function MenuSeparator() {
  return <RadixDropdown.Separator className={styles.separator} />;
}

/**
 * Submenu root — wraps a sub-trigger and sub-content pair.
 */
export function MenuSub({ open, onOpenChange, defaultOpen, children }: MenuSubProps) {
  return (
    <RadixDropdown.Sub open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      {children}
    </RadixDropdown.Sub>
  );
}

/**
 * Trigger that opens a submenu. Styled like a MenuItem with a chevron.
 */
export const MenuSubTrigger = React.forwardRef<HTMLDivElement, MenuSubTriggerProps>(
  function MenuSubTrigger({ disabled = false, children, className }, ref) {
    const triggerClasses = [styles.subTrigger, className].filter(Boolean).join(" ");

    return (
      <RadixDropdown.SubTrigger ref={ref} className={triggerClasses} disabled={disabled}>
        {children}
        <ChevronRightIcon />
      </RadixDropdown.SubTrigger>
    );
  }
);

/**
 * Submenu content panel.
 */
export const MenuSubContent = React.forwardRef<HTMLDivElement, MenuSubContentProps>(
  function MenuSubContent({ children, sideOffset = 2, className }, ref) {
    const contentClasses = [styles.content, styles.subContent, className]
      .filter(Boolean)
      .join(" ");

    return (
      <RadixDropdown.Portal>
        <RadixDropdown.SubContent
          ref={ref}
          className={contentClasses}
          sideOffset={sideOffset}
        >
          {children}
        </RadixDropdown.SubContent>
      </RadixDropdown.Portal>
    );
  }
);

/* ─── Icons (inline SVG, 1.75px stroke on 24px grid) ──────────────────────── */

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

function DotIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      className={styles.subChevron}
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
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
