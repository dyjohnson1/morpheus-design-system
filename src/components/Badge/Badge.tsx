import * as React from "react";
import styles from "./Badge.module.css";

export type BadgeVariant =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual intent. Pairs with an icon/text so color is never the sole signal.
   * @default "neutral"
   */
  variant?: BadgeVariant;
  /** Numeric count. When provided, renders as a compact count pill. */
  count?: number;
  /**
   * Maximum count before truncating with "+". E.g. max=99 → "99+".
   * Only meaningful when `count` is provided.
   * @default 99
   */
  max?: number;
  /**
   * Renders as a small filled dot with no label — useful for unread indicators.
   * Requires an `aria-label` on the Badge (or a wrapping element) so the state
   * is not conveyed by color/shape alone.
   */
  dot?: boolean;
  /**
   * When provided, the Badge is absolutely positioned over the child as a
   * count/status overlay (e.g. avatar + notification count).
   * The wrapper receives `position: relative` automatically.
   */
  children?: React.ReactNode;
}

/**
 * Morpheus Badge — small count/status indicator.
 *
 * Three modes:
 *   1. **Label** — `<Badge variant="success">✓ Active</Badge>`
 *   2. **Count** — `<Badge count={7} aria-label="7 notifications" />`
 *   3. **Dot** — `<Badge dot aria-label="Unread messages" />`
 *
 * Overlay mode: when `count` or `dot` is used alongside a child element,
 * the Badge floats in the top-right corner of the child:
 *   `<Badge count={3} aria-label="3 notifications"><Avatar /></Badge>`
 *
 * Status meaning is never conveyed by color alone — always pair with icon/text
 * or a descriptive aria-label. Tokens only · WCAG 2.2 AA.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(
    {
      variant = "neutral",
      count,
      max = 99,
      dot = false,
      children,
      className,
      ...rest
    },
    ref
  ) {
    const isCount = count !== undefined;
    const isOverlay = (isCount || dot) && React.Children.count(children) > 0;

    const displayCount = isCount
      ? count > max
        ? `${max}+`
        : String(count)
      : null;

    const badgeClasses = [
      styles.badge,
      styles[variant],
      isCount && styles.countBadge,
      dot && styles.dotBadge,
      isOverlay && styles.overlayBadge,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Dot badges have no visible text — they need a role so aria-label is valid.
    // Use "img" (a visual indicator conveying meaning). Callers can override
    // with their own role via the ...rest spread.
    const impliedRole = dot && !rest.role ? "img" : undefined;

    const badgeEl = (
      <span ref={ref} className={badgeClasses} role={impliedRole} {...rest}>
        {dot ? null : isCount ? displayCount : children}
      </span>
    );

    // Overlay mode: wrap the child in a relative-positioned container
    if (isOverlay) {
      return (
        <span className={styles.wrapper}>
          {children}
          {badgeEl}
        </span>
      );
    }

    return badgeEl;
  }
);
