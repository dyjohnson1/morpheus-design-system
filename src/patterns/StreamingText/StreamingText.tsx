import * as React from "react";
import styles from "./StreamingText.module.css";

export type StreamingStatus = "idle" | "streaming" | "complete";
export type StreamingDensity = "comfortable" | "compact";

export interface StreamingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The current text content to display (streamed in progressively). */
  content: string;
  /** Current streaming status. Default: "idle". */
  status?: StreamingStatus;
  /** Density mode. Default: "comfortable". */
  density?: StreamingDensity;
  /** Show "jump to end" affordance for long content. Default: false. */
  showJumpToEnd?: boolean;
  /** Callback when "jump to end" is activated. */
  onJumpToEnd?: () => void;
  /** Accessible label for the streaming region. */
  "aria-label"?: string;
}

/**
 * Morpheus StreamingText — AI streaming text pattern.
 *
 * Appends text into a single `aria-live="polite"` region. Announces at
 * sentence boundaries, not per token. Completion triggers the signature
 * "reveal" (luminance sweep, t5) — gated by reduced-motion.
 *
 * Tokens only · all states · reduced-motion safe · density-aware · WCAG 2.2 AA.
 */
export const StreamingText = React.forwardRef<HTMLDivElement, StreamingTextProps>(
  function StreamingText(
    {
      content,
      status = "idle",
      density = "comfortable",
      showJumpToEnd = false,
      onJumpToEnd,
      className,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) {
    const endRef = React.useRef<HTMLSpanElement>(null);

    const handleJumpToEnd = () => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      onJumpToEnd?.();
    };

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        data-status={status}
        data-density={density}
        {...rest}
      >
        {/* Jump to end affordance — keyboard accessible */}
        {showJumpToEnd && status === "streaming" && (
          <button
            type="button"
            className={styles.jumpToEnd}
            onClick={handleJumpToEnd}
            aria-label="Jump to end of response"
          >
            Jump to end
          </button>
        )}

        {/* Single live region — announces at sentence/chunk boundaries */}
        <div
          className={styles.content}
          role="status"
          aria-live="polite"
          aria-atomic="false"
          aria-busy={status === "streaming" || undefined}
          aria-label={ariaLabel ?? "Streaming response"}
        >
          <span className={styles.text}>{content}</span>

          {/* Blinking cursor — CSS-only, visible while streaming */}
          {status === "streaming" && (
            <span className={styles.cursor} aria-hidden="true" />
          )}

          {/* Anchor for jump-to-end scroll */}
          <span ref={endRef} className={styles.endAnchor} />
        </div>

        {/* Completion reveal overlay — expressive, gated by reduced-motion */}
        {status === "complete" && (
          <span className={styles.reveal} aria-hidden="true" />
        )}
      </div>
    );
  }
);
