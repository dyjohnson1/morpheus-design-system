import * as React from "react";
import styles from "./Avatar.module.css";
import { VisuallyHidden } from "../../primitives/VisuallyHidden";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL — falls back to initials then generic icon if absent or broken. */
  src?: string;
  /** Alt text for the image. Required when src conveys identity. */
  alt?: string;
  /** Initials to show when no image is available (1–2 chars). */
  initials?: string;
  /** Size variant. Default: md. */
  size?: AvatarSize;
  /** Shape of the avatar container. Default: circle. */
  shape?: AvatarShape;
  /**
   * Presence/status badge. Always rendered as icon + text (never color alone).
   * Renders as a small badge in the bottom-right corner.
   */
  status?: AvatarStatus;
  /**
   * When provided, the avatar becomes a focusable button-like element
   * (role="button", tabIndex=0, keyboard-activatable).
   */
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  /** Accessible label override. Falls back to alt → initials → "User avatar". */
  "aria-label"?: string;
}

/** Fallback icon — generic person silhouette, 24px grid, 1.75px stroke. */
function PersonIcon() {
  return (
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
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

/** Status badge icons — each is a distinct shape so they differ beyond color. */
const STATUS_ICONS: Record<AvatarStatus, React.ReactElement> = {
  online: (
    // Filled circle
    <svg viewBox="0 0 8 8" aria-hidden="true" focusable="false">
      <circle cx="4" cy="4" r="3" fill="currentColor" />
    </svg>
  ),
  offline: (
    // Empty circle (ring)
    <svg viewBox="0 0 8 8" aria-hidden="true" focusable="false">
      <circle cx="4" cy="4" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  ),
  busy: (
    // Circle with minus / do-not-disturb line
    <svg viewBox="0 0 8 8" aria-hidden="true" focusable="false">
      <circle cx="4" cy="4" r="3" fill="currentColor" />
      <line x1="2" y1="4" x2="6" y2="4" stroke="var(--morph-color-surface)" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  ),
  away: (
    // Clock / crescent moon shape — half-circle
    <svg viewBox="0 0 8 8" aria-hidden="true" focusable="false">
      <circle cx="4" cy="4" r="3" fill="currentColor" opacity="0.5" />
      <path d="M4 1 A3 3 0 0 1 4 7 Z" fill="currentColor" />
    </svg>
  ),
};

const STATUS_LABELS: Record<AvatarStatus, string> = {
  online: "Online",
  offline: "Offline",
  busy: "Busy",
  away: "Away",
};

/**
 * Morpheus Avatar — circular (or square) image / initials / icon, with optional
 * presence-status badge. Follows the reference Button pattern.
 *
 * Fallback chain: image → initials → generic icon.
 * Status badge: icon + hidden label (never color alone) — WCAG 2.2 AA.
 * Interactive variant: add `onClick` to get focus/hover/active states.
 *
 * Tokens only · all states · reduced-motion safe · WCAG 2.2 AA.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  function Avatar(
    {
      src,
      alt,
      initials,
      size = "md",
      shape = "circle",
      status,
      onClick,
      className,
      "aria-label": ariaLabel,
      onKeyDown,
      ...rest
    },
    ref
  ) {
    const [imgError, setImgError] = React.useState(false);
    const showImage = !!src && !imgError;
    const showInitials = !showImage && !!initials;
    const showIcon = !showImage && !showInitials;

    const isInteractive = !!onClick;

    // Compose accessible label: include status so SR users hear "Jane Doe, Online"
    const baseLabel = ariaLabel ?? alt ?? initials ?? "User avatar";
    const fullLabel = status
      ? `${baseLabel}, ${STATUS_LABELS[status]}`
      : baseLabel;

    // Keyboard handler — activate on Enter/Space when interactive (button pattern)
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLSpanElement>) => {
        onKeyDown?.(e);
        if (isInteractive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.(e as unknown as React.MouseEvent<HTMLSpanElement>);
        }
      },
      [isInteractive, onClick, onKeyDown]
    );

    const classNames = [
      styles.avatar,
      styles[size],
      shape === "square" ? styles.square : styles.circle,
      isInteractive ? styles.interactive : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span
        ref={ref}
        className={classNames}
        role={isInteractive ? "button" : "img"}
        aria-label={fullLabel}
        tabIndex={isInteractive ? 0 : undefined}
        data-shape={shape}
        data-size={size}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {showImage && (
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className={styles.image}
            onError={() => setImgError(true)}
          />
        )}
        {showInitials && (
          <span className={styles.initials} aria-hidden="true">
            {initials!.slice(0, 2).toUpperCase()}
          </span>
        )}
        {showIcon && (
          <span className={styles.icon} aria-hidden="true">
            <PersonIcon />
          </span>
        )}

        {status && (
          <span
            className={[styles.statusBadge, styles[`status-${status}`]]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          >
            {STATUS_ICONS[status]}
          </span>
        )}
      </span>
    );
  }
);
