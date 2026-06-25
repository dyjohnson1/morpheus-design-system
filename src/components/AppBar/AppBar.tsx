import * as React from "react";
import styles from "./AppBar.module.css";

export type AppBarVariant = "surface" | "transparent";
export type AppBarPosition = "sticky" | "fixed" | "static";

export interface AppBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual variant — surface (default, subtle elevation) or transparent (blends into content). */
  variant?: AppBarVariant;
  /** Positioning behavior. Sticky by default for persistent top-level nav. */
  position?: AppBarPosition;
  /** Leading slot — typically a logo, brand mark, or back button. */
  leading?: React.ReactNode;
  /** Title text — the primary label for the current view. */
  title?: React.ReactNode;
  /** Trailing slot — actions, icon buttons, avatar, menus. */
  trailing?: React.ReactNode;
  /** Density — comfortable (default, 56px) or compact (44px for data-dense views). */
  density?: "comfortable" | "compact";
}

/**
 * Morpheus AppBar — top-level navigation chrome.
 *
 * Deference principle: chrome recedes, content leads. The AppBar uses
 * subtle surface tonality and elevation rather than heavy borders or
 * high-contrast backgrounds.
 *
 * When to use: persistent top-level navigation with brand, title, and actions.
 * When not to use: contextual toolbars within content areas — use a Surface instead.
 *
 * Tokens only · density-aware · reduced-motion safe · WCAG 2.2 AA.
 */
export const AppBar = React.forwardRef<HTMLElement, AppBarProps>(
  function AppBar(
    {
      variant = "surface",
      position = "sticky",
      leading,
      title,
      trailing,
      density = "comfortable",
      className,
      children,
      ...rest
    },
    ref
  ) {
    return (
      <header
        ref={ref}
        role="banner"
        data-variant={variant}
        data-position={position}
        data-density={density}
        className={[
          styles.appBar,
          styles[variant],
          styles[position],
          styles[density],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {leading && (
          <div className={styles.leading}>{leading}</div>
        )}
        {title && (
          <div className={styles.title}>{title}</div>
        )}
        {children && (
          <div className={styles.content}>{children}</div>
        )}
        {trailing && (
          <div className={styles.trailing}>{trailing}</div>
        )}
      </header>
    );
  }
);
