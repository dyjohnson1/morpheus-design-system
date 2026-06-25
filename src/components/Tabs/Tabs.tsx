import * as React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import styles from "./Tabs.module.css";

export type TabsVariant = "underline" | "contained";

export interface TabsProps {
  /** Controlled active tab value. */
  value?: string;
  /** Default active tab (uncontrolled). */
  defaultValue?: string;
  /** Callback when the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Visual style. Default: underline. */
  variant?: TabsVariant;
  /** Density — comfortable (default) or compact. */
  density?: "comfortable" | "compact";
  /** Orientation for keyboard navigation. Default: horizontal. */
  orientation?: "horizontal" | "vertical";
  /** Whether keyboard navigation loops from last to first. Default: true. */
  loop?: boolean;
  /** Child TabsList and TabsContent elements. */
  children: React.ReactNode;
  /** Additional class name. */
  className?: string;
}

/**
 * Morpheus Tabs — content-area navigation built on @radix-ui/react-tabs.
 *
 * Keyboard: Arrow keys navigate between triggers; Home/End jump to first/last.
 * Focus: visible focus ring via --morph-color-focus.
 * Motion: productive/t2 indicator slide; reduced-motion: instant.
 *
 * Tokens only · density-aware · reduced-motion safe · WCAG 2.2 AA.
 */
export function Tabs({
  value,
  defaultValue,
  onValueChange,
  variant = "underline",
  density = "comfortable",
  orientation = "horizontal",
  loop = true,
  children,
  className,
}: TabsProps) {
  return (
    <RadixTabs.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      orientation={orientation}
      className={[styles.root, styles[variant], styles[density], className]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
      data-density={density}
    >
      {children}
    </RadixTabs.Root>
  );
}

/* ─── TabsList ─────────────────────────────────────────────────────────────── */

export interface TabsListProps {
  /** Accessible label for the tab list. */
  "aria-label": string;
  /** Whether keyboard navigation loops. Default: true. */
  loop?: boolean;
  /** Tab trigger children. */
  children: React.ReactNode;
  /** Additional class name. */
  className?: string;
}

/**
 * Container for tab triggers — renders role="tablist".
 */
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList({ children, className, ...rest }, ref) {
    return (
      <RadixTabs.List
        ref={ref}
        className={[styles.list, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </RadixTabs.List>
    );
  }
);

/* ─── TabsTrigger ──────────────────────────────────────────────────────────── */

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Unique value matching a TabsContent. */
  value: string;
  /** Optional leading icon. */
  icon?: React.ReactNode;
}

/**
 * Individual tab trigger — rendered as a button with role="tab".
 */
export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger({ value, icon, children, className, disabled, ...rest }, ref) {
    return (
      <RadixTabs.Trigger
        ref={ref}
        value={value}
        disabled={disabled}
        className={[styles.trigger, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {icon && (
          <span className={styles.triggerIcon} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={styles.triggerLabel}>{children}</span>
      </RadixTabs.Trigger>
    );
  }
);

/* ─── TabsContent ──────────────────────────────────────────────────────────── */

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value matching the corresponding TabsTrigger. */
  value: string;
  /** Whether to force-mount the content (keep in DOM when inactive). */
  forceMount?: true;
}

/**
 * Panel content for a tab — renders role="tabpanel".
 */
export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent({ value, forceMount, children, className, ...rest }, ref) {
    return (
      <RadixTabs.Content
        ref={ref}
        value={value}
        forceMount={forceMount}
        className={[styles.content, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </RadixTabs.Content>
    );
  }
);
