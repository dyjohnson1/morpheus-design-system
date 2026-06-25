import * as React from "react";
import styles from "./InlineMessage.module.css";

export type InlineMessageVariant = "info" | "success" | "warning" | "error";

export interface InlineMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Semantic intent — determines icon, color, and ARIA role.
   * @default "info"
   */
  variant?: InlineMessageVariant;
  /**
   * When true, renders a dismiss button. Pair with onDismiss.
   * @default false
   */
  dismissible?: boolean;
  /** Callback fired when the dismiss button is clicked. */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button. @default "Dismiss" */
  dismissLabel?: string;
}

/**
 * Morpheus InlineMessage — contextual feedback displayed inline within page content.
 *
 * Variants: info · success · warning · error.
 * Status is never conveyed by color alone — each variant renders a distinct icon + text.
 *
 * - `info` / `success` / `warning` → `role="status"` (polite announcement)
 * - `error` → `role="alert"` (assertive announcement)
 *
 * Optional dismiss action via `dismissible` + `onDismiss`.
 * Tokens only · all states · WCAG 2.2 AA · reduced-motion safe.
 */
export const InlineMessage = React.forwardRef<HTMLDivElement, InlineMessageProps>(
  function InlineMessage(
    {
      variant = "info",
      dismissible = false,
      onDismiss,
      dismissLabel = "Dismiss",
      children,
      className,
      ...rest
    },
    ref
  ) {
    // Error variant uses role="alert" for assertive announcement
    const role = variant === "error" ? "alert" : "status";

    const rootClasses = [
      styles.root,
      styles[variant],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={rootClasses} role={role} {...rest}>
        <span className={styles.icon} aria-hidden="true">
          {variantIcon(variant)}
        </span>
        <span className={styles.content}>{children}</span>
        {dismissible && (
          <button
            type="button"
            className={styles.dismiss}
            onClick={onDismiss}
            aria-label={dismissLabel}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

/** Returns the appropriate SVG icon for each variant. */
function variantIcon(variant: InlineMessageVariant): React.ReactNode {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    focusable: "false" as const,
  };

  switch (variant) {
    case "info":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
    case "success":
      return (
        <svg {...props}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case "warning":
      return (
        <svg {...props}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "error":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
  }
}
