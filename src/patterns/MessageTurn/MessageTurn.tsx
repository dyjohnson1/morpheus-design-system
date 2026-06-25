import * as React from "react";
import styles from "./MessageTurn.module.css";

export type MessageRole = "user" | "assistant";
export type MessageStatus = "complete" | "streaming" | "error";
export type MessageDensity = "comfortable" | "compact";

export interface MessageTurnProps extends React.HTMLAttributes<HTMLElement> {
  /** Who sent this message. Drives alignment + surface tonality. */
  role: MessageRole;
  /** Optional avatar element (e.g. <Avatar />) rendered beside the message. */
  avatar?: React.ReactNode;
  /** Optional timestamp string displayed below content. */
  timestamp?: string;
  /** Optional actions slot (copy, regenerate, etc.) rendered in the footer. */
  actions?: React.ReactNode;
  /** Message delivery status. Default: "complete". */
  status?: MessageStatus;
  /** Density mode. Default: "comfortable". */
  density?: MessageDensity;
  /** Accessible label for the message attribution (e.g. "Message from assistant"). */
  "aria-label"?: string;
  /** Message content. */
  children?: React.ReactNode;
}

const ROLE_LABELS: Record<MessageRole, string> = {
  user: "Message from you",
  assistant: "Message from assistant",
};

const STATUS_LABELS: Record<MessageStatus, string> = {
  complete: "",
  streaming: "Generating response",
  error: "Message failed",
};

/**
 * Morpheus MessageTurn — a single turn in a conversation.
 *
 * Differentiates user vs assistant by surface tonality + alignment, not bubbles.
 * User messages align end with a raised surface; assistant messages align start
 * with the default surface. Agent streaming surfaces use `aria-live="polite"`
 * to announce content at chunk boundaries.
 *
 * Tokens only · all states · reduced-motion safe · density-aware · WCAG 2.2 AA.
 */
export const MessageTurn = React.forwardRef<HTMLElement, MessageTurnProps>(
  function MessageTurn(
    {
      role,
      avatar,
      timestamp,
      actions,
      status = "complete",
      density = "comfortable",
      children,
      className,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) {
    const label = ariaLabel ?? ROLE_LABELS[role];
    const statusText = STATUS_LABELS[status];

    return (
      <article
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        data-role={role}
        data-status={status}
        data-density={density}
        aria-label={label}
        {...rest}
      >
        {avatar && (
          <div className={styles.avatar} aria-hidden="true">
            {avatar}
          </div>
        )}

        <div className={styles.body}>
          <div
            className={styles.content}
            aria-live={role === "assistant" && status === "streaming" ? "polite" : undefined}
            aria-atomic={role === "assistant" && status === "streaming" ? "false" : undefined}
            aria-busy={status === "streaming" || undefined}
          >
            {children}
          </div>

          {(timestamp || actions || statusText) && (
            <div className={styles.footer}>
              {statusText && (
                <span className={styles.statusText} role="status" aria-live="polite">
                  {statusText}
                </span>
              )}
              {timestamp && (
                <time className={styles.timestamp}>{timestamp}</time>
              )}
              {actions && (
                <div className={styles.actions}>{actions}</div>
              )}
            </div>
          )}
        </div>
      </article>
    );
  }
);
