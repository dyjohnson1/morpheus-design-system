import * as React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import styles from "./SideNav.module.css";

/* ─── SideNavItem ──────────────────────────────────────────────────────────── */

export interface SideNavItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Optional leading icon (inherits currentColor). */
  icon?: React.ReactNode;
  /** Text label for the nav item. */
  label: string;
  /** Whether this item is the active/current page. */
  active?: boolean;
  /** Render as a link instead of a button. */
  href?: string;
  /** When collapsed, aria-label falls back to label for icon-only display. */
  collapsed?: boolean;
}

/**
 * Individual navigation item within a SideNav.
 * Supports icon + label, active indication via surface tonality (not color alone).
 */
export const SideNavItem = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  SideNavItemProps
>(function SideNavItem(
  {
    icon,
    label,
    active = false,
    href,
    collapsed = false,
    disabled = false,
    className,
    ...rest
  },
  ref
) {
  const classes = [
    styles.item,
    active ? styles.active : undefined,
    collapsed ? styles.collapsed : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && (
        <span className={styles.itemIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.itemLabel}>{label}</span>
    </>
  );

  if (href && !disabled) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        aria-current={active ? "page" : undefined}
        aria-label={collapsed ? label : undefined}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={classes}
      disabled={disabled}
      aria-current={active ? "page" : undefined}
      aria-label={collapsed ? label : undefined}
      {...rest}
    >
      {content}
    </button>
  );
});

/* ─── SideNavGroup ─────────────────────────────────────────────────────────── */

export interface SideNavGroupProps {
  /** Group heading label. */
  heading: string;
  /** Whether the group is collapsible. Default: true. */
  collapsible?: boolean;
  /** Controlled open state for the collapsible group. */
  open?: boolean;
  /** Default open state (uncontrolled). */
  defaultOpen?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Child SideNavItems. */
  children: React.ReactNode;
  /** Whether the parent SideNav is collapsed (icon-only mode). */
  collapsed?: boolean;
}

/**
 * A collapsible section within the SideNav, grouping related navigation items
 * under a heading. Uses Radix Collapsible for accessible expand/collapse.
 */
export function SideNavGroup({
  heading,
  collapsible = true,
  open,
  defaultOpen = true,
  onOpenChange,
  children,
  collapsed = false,
}: SideNavGroupProps) {
  if (collapsed) {
    // In collapsed mode, render items without group heading
    return <div className={styles.group} role="group" aria-label={heading}>{children}</div>;
  }

  if (!collapsible) {
    return (
      <div className={styles.group} role="group" aria-label={heading}>
        <span className={styles.groupHeading}>{heading}</span>
        <div className={styles.groupItems}>{children}</div>
      </div>
    );
  }

  return (
    <Collapsible.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      className={styles.group}
    >
      <Collapsible.Trigger className={styles.groupTrigger} aria-label={`${heading}, toggle section`}>
        <span className={styles.groupHeading}>{heading}</span>
        <span className={styles.groupChevron} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </Collapsible.Trigger>
      <Collapsible.Content className={styles.groupContent}>
        <div className={styles.groupItems}>{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

/* ─── SideNav ──────────────────────────────────────────────────────────────── */

export interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Accessible label for the navigation landmark. */
  "aria-label": string;
  /** Whether the nav is collapsed to icon-only mode. */
  collapsed?: boolean;
  /** Density — comfortable (default) or compact. */
  density?: "comfortable" | "compact";
  /** Header slot — brand, logo, or toggle button rendered above items. */
  header?: React.ReactNode;
  /** Footer slot — settings, profile, or collapse toggle rendered below items. */
  footer?: React.ReactNode;
}

/**
 * Morpheus SideNav — vertical navigation panel.
 *
 * Deference principle: the SideNav is infrastructure, not content — chrome
 * recedes. Active item indicated via subtle surface tonality shift.
 * Light as structure: no heavy backgrounds or borders for selection.
 *
 * When to use: persistent side navigation with grouped sections.
 * When not to use: contextual action panels — use a Sheet instead.
 *
 * Tokens only · density-aware · reduced-motion safe · WCAG 2.2 AA.
 */
export const SideNav = React.forwardRef<HTMLElement, SideNavProps>(
  function SideNav(
    {
      collapsed = false,
      density = "comfortable",
      header,
      footer,
      children,
      className,
      ...rest
    },
    ref
  ) {
    return (
      <nav
        ref={ref}
        data-collapsed={collapsed || undefined}
        data-density={density}
        className={[
          styles.sideNav,
          collapsed ? styles.collapsed : undefined,
          styles[density],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {header && <div className={styles.header}>{header}</div>}
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </nav>
    );
  }
);
