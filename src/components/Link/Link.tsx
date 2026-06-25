import * as React from "react";
import styles from "./Link.module.css";
import { VisuallyHidden } from "../../primitives/VisuallyHidden";

export type LinkVariant = "default" | "muted" | "accent";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Visual variant.
   * - `default` — on-surface color; underline on hover (body copy links)
   * - `muted`   — on-surface-muted; quieter secondary references
   * - `accent`  — accent-text color; for single high-emphasis inline actions
   * @default "default"
   */
  variant?: LinkVariant;
  /**
   * When true, renders a trailing external-link icon and adds
   * " (opens in new tab)" to the accessible name.
   */
  external?: boolean;
  /** Suppress the underline decoration (use sparingly — reduces legibility cue). */
  noUnderline?: boolean;
}

/**
 * Morpheus Link — semantic inline hyperlink.
 *
 * Always renders an `<a>` element; do not use for in-page actions (use Button ghost).
 * Tokens only · all states · reduced-motion safe · WCAG 2.2 AA.
 *
 * When to use: navigation, citations, external references within prose or UI.
 * When not to use: triggering actions without navigation — use Button ghost instead.
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(
    {
      variant = "default",
      external = false,
      noUnderline = false,
      children,
      className,
      target,
      rel,
      ...rest
    },
    ref
  ) {
    // If external is set, automatically open in new tab and add noopener
    const resolvedTarget = external ? "_blank" : target;
    const resolvedRel = external
      ? [rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
      : rel;

    return (
      <a
        ref={ref}
        target={resolvedTarget}
        rel={resolvedRel}
        className={[
          styles.link,
          styles[variant],
          noUnderline && styles.noUnderline,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
        {external && (
          <>
            {/* Icon: 1.75px stroke, 24px grid — matches Morpheus icon set spec */}
            <span className={styles.externalIcon} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </span>
            {/* Accessible label for the external indicator */}
            <VisuallyHidden>(opens in new tab)</VisuallyHidden>
          </>
        )}
      </a>
    );
  }
);
