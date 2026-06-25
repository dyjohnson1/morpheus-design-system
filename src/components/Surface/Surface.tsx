import * as React from "react";
import styles from "./Surface.module.css";

export type SurfaceElevation = 0 | 1 | 2 | 3 | 4;
export type SurfaceVariant = "flat" | "raised" | "overlay";

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Elevation tier 0–4; maps to tonal + shadow depth.
   * 0 = ground level, 4 = top-most overlay.
   */
  elevation?: SurfaceElevation;
  /**
   * Visual variant:
   * - `flat`    → no elevation, flush with ground
   * - `raised`  → default — sits above ground (card-level)
   * - `overlay` → top-level dialogs, menus, tooltips
   */
  variant?: SurfaceVariant;
  /** When true, pointer events are removed and opacity drops. */
  disabled?: boolean;
}

/**
 * Morpheus Surface — base material container.
 *
 * Material fallback ladder (highest tier rendered when supported):
 *   Tier 0  — backdrop-filter blur + tonal tint (capable GPU / browser)
 *   Tier 1  — semi-opaque tonal fill + soft shadow
 *   Tier 2  — solid tonal surface + shadow only (reduced-transparency / fallback)
 *
 * Tier selection via `@supports (backdrop-filter: blur(1px))` in CSS;
 * `prefers-reduced-transparency` forces Tier 2.
 *
 * Tokens only · all states · reduced-motion safe · WCAG 2.2 AA.
 */
export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  function Surface(
    {
      elevation = 1,
      variant = "raised",
      disabled = false,
      children,
      className,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-elevation={elevation}
        data-variant={variant}
        data-disabled={disabled || undefined}
        className={[styles.surface, styles[variant], className]
          .filter(Boolean)
          .join(" ")}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
