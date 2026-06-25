import * as React from "react";
import styles from "./Breadcrumb.module.css";
import { VisuallyHidden } from "../../primitives/VisuallyHidden";

/* ─── ChevronSeparator (default) ───────────────────────────────────────────── */

const ChevronSeparator = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ─── BreadcrumbItem ───────────────────────────────────────────────────────── */

export interface BreadcrumbItemProps {
  /** The URL to navigate to. If omitted, renders as plain text (current page). */
  href?: string;
  /** Whether this is the current/active page. Adds `aria-current="page"`. */
  current?: boolean;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Content (label text). */
  children: React.ReactNode;
  /** Additional class name. */
  className?: string;
}

/**
 * Individual crumb within a Breadcrumb trail.
 * The last item should use `current` to indicate the active page.
 */
export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps
>(function BreadcrumbItem(
  { href, current = false, icon, children, className, ...rest },
  ref
) {
  const content = (
    <>
      {icon && (
        <span className={styles.itemIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.itemLabel}>{children}</span>
    </>
  );

  return (
    <li
      ref={ref}
      className={[styles.item, current ? styles.current : undefined, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {href && !current ? (
        <a href={href} className={styles.link}>
          {content}
        </a>
      ) : (
        <span
          className={styles.text}
          aria-current={current ? "page" : undefined}
        >
          {content}
        </span>
      )}
    </li>
  );
});

/* ─── BreadcrumbEllipsis ───────────────────────────────────────────────────── */

export interface BreadcrumbEllipsisProps {
  /** Callback when the ellipsis is activated (expand collapsed items). */
  onExpand?: () => void;
  /** Accessible label for the expand button. */
  label?: string;
  /** Additional class name. */
  className?: string;
}

/**
 * Collapsed breadcrumb segment — renders an expandable "…" button.
 * Use when the trail is too long and middle items need truncation.
 */
export const BreadcrumbEllipsis = React.forwardRef<
  HTMLLIElement,
  BreadcrumbEllipsisProps
>(function BreadcrumbEllipsis(
  { onExpand, label = "Show collapsed breadcrumbs", className },
  ref
) {
  return (
    <li ref={ref} className={[styles.item, styles.ellipsisItem, className].filter(Boolean).join(" ")}>
      <button
        type="button"
        className={styles.ellipsisButton}
        onClick={onExpand}
        aria-label={label}
      >
        <span aria-hidden="true">…</span>
        <VisuallyHidden>{label}</VisuallyHidden>
      </button>
    </li>
  );
});

/* ─── Breadcrumb ───────────────────────────────────────────────────────────── */

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Accessible label for the navigation landmark. Default: "Breadcrumb". */
  "aria-label"?: string;
  /** Custom separator element. Default: chevron icon. */
  separator?: React.ReactNode;
  /** Density — comfortable (default) or compact. */
  density?: "comfortable" | "compact";
  /**
   * Maximum items to show before collapsing middle items.
   * When set, items beyond first + last N are collapsed behind an ellipsis.
   * Default: no collapsing.
   */
  maxItems?: number;
  /**
   * Number of items to always show at the end (after ellipsis).
   * Default: 1 (current page).
   */
  itemsAfterCollapse?: number;
  /**
   * Number of items to always show at the start (before ellipsis).
   * Default: 1 (root).
   */
  itemsBeforeCollapse?: number;
}

/**
 * Morpheus Breadcrumb — wayfinding navigation showing the current page's
 * position within a hierarchy.
 *
 * Uses a `<nav aria-label="Breadcrumb">` wrapper with a semantic `<ol>`.
 * Separators are injected between items via CSS `::before` pseudo-elements
 * or explicit separator nodes.
 *
 * Deference principle: breadcrumbs are infrastructure, not content — chrome
 * recedes. Muted color at rest, accent on hover.
 *
 * When to use: hierarchical page structures with 2+ levels of depth.
 * When not to use: flat navigation or single-level apps — use Tabs instead.
 *
 * Tokens only · density-aware · reduced-motion safe · WCAG 2.2 AA.
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    {
      "aria-label": ariaLabel = "Breadcrumb",
      separator,
      density = "comfortable",
      maxItems,
      itemsAfterCollapse = 1,
      itemsBeforeCollapse = 1,
      children,
      className,
      ...rest
    },
    ref
  ) {
    const [expanded, setExpanded] = React.useState(false);

    const items = React.Children.toArray(children).filter(React.isValidElement);

    // Determine if we need to collapse
    const shouldCollapse =
      !expanded && maxItems != null && items.length > maxItems;

    let renderedItems: React.ReactNode[];

    if (shouldCollapse) {
      const before = items.slice(0, itemsBeforeCollapse);
      const after = items.slice(items.length - itemsAfterCollapse);
      renderedItems = [
        ...before,
        <BreadcrumbEllipsis
          key="__breadcrumb-ellipsis"
          onExpand={() => setExpanded(true)}
        />,
        ...after,
      ];
    } else {
      renderedItems = items;
    }

    // Inject separators between items
    const separatorNode = separator ?? <ChevronSeparator />;
    const withSeparators = renderedItems.reduce<React.ReactNode[]>(
      (acc, item, index) => {
        if (index > 0) {
          acc.push(
            <li
              key={`sep-${index}`}
              className={styles.separator}
              aria-hidden="true"
            >
              {separatorNode}
            </li>
          );
        }
        acc.push(item);
        return acc;
      },
      []
    );

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        data-density={density}
        className={[styles.breadcrumb, styles[density], className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <ol className={styles.list}>{withSeparators}</ol>
      </nav>
    );
  }
);
