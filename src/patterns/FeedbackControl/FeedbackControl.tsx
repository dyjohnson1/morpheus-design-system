import * as React from "react";
import styles from "./FeedbackControl.module.css";

export type FeedbackValue = "positive" | "negative" | null;
export type FeedbackDensity = "comfortable" | "compact";

export interface FeedbackControlProps {
  /** Current selected feedback value. */
  value?: FeedbackValue;
  /** Called when feedback is selected or deselected (toggle). */
  onFeedback?: (value: FeedbackValue) => void;
  /** Whether to show a text field after selection for additional context. */
  showTextField?: boolean;
  /** Called when the user submits text feedback. */
  onTextSubmit?: (text: string) => void;
  /** Placeholder text for the feedback textarea. */
  textPlaceholder?: string;
  /** Density variant. */
  density?: FeedbackDensity;
  /** Disables the entire control. */
  disabled?: boolean;
  /** Additional className for the root element. */
  className?: string;
}

/**
 * Morpheus FeedbackControl — thumbs-up / thumbs-down feedback for AI responses.
 *
 * Supports toggle selection, optional text feedback, density, and full accessibility.
 * Alias tokens only · all states · WCAG 2.2 AA · reduced-motion safe.
 *
 * When to use: after an AI-generated response to gather user sentiment.
 * When not to use: for rating scales or multi-option surveys — use a dedicated rating component.
 */
export const FeedbackControl = React.forwardRef<
  HTMLDivElement,
  FeedbackControlProps
>(function FeedbackControl(
  {
    value = null,
    onFeedback,
    showTextField = false,
    onTextSubmit,
    textPlaceholder = "Tell us more (optional)",
    density = "comfortable",
    disabled = false,
    className,
  },
  ref
) {
  const [textValue, setTextValue] = React.useState("");

  const handleFeedback = (type: "positive" | "negative") => {
    if (disabled) return;
    if (value === type) {
      onFeedback?.(null);
    } else {
      onFeedback?.(type);
    }
  };

  const handleTextSubmit = () => {
    if (disabled || !textValue.trim()) return;
    onTextSubmit?.(textValue.trim());
    setTextValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleTextSubmit();
    }
  };

  const showTextArea = showTextField && value !== null;

  return (
    <div
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-density={density}
    >
      <div className={styles.buttons} role="group" aria-label="Response feedback">
        <button
          type="button"
          className={[
            styles.feedbackButton,
            styles[density],
            value === "positive" && styles.selected,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label="Rate as helpful"
          aria-pressed={value === "positive"}
          disabled={disabled}
          onClick={() => handleFeedback("positive")}
        >
          <span className={styles.icon} aria-hidden="true">
            <ThumbUpIcon filled={value === "positive"} />
          </span>
        </button>

        <button
          type="button"
          className={[
            styles.feedbackButton,
            styles[density],
            value === "negative" && styles.selected,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label="Rate as not helpful"
          aria-pressed={value === "negative"}
          disabled={disabled}
          onClick={() => handleFeedback("negative")}
        >
          <span className={styles.icon} aria-hidden="true">
            <ThumbDownIcon filled={value === "negative"} />
          </span>
        </button>
      </div>

      {showTextArea && (
        <div className={styles.textField}>
          <textarea
            className={[styles.textarea, styles[density]]
              .filter(Boolean)
              .join(" ")}
            placeholder={textPlaceholder}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-label="Additional feedback"
            rows={3}
          />
          <button
            type="button"
            className={[styles.submitButton, styles[density]]
              .filter(Boolean)
              .join(" ")}
            disabled={disabled || !textValue.trim()}
            onClick={handleTextSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
});

/* ─── Inline SVG icons (24px grid, 1.75px stroke) ────────────────────────── */

function ThumbUpIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 22V11l3-1 2-6a2 2 0 0 1 2-2h.5a1.5 1.5 0 0 1 1.5 1.5V9h4.17a2 2 0 0 1 1.98 2.27l-1.34 8A2 2 0 0 1 18.83 21H7Z" />
      <path d="M2 11v11h3V11H2Z" />
    </svg>
  );
}

function ThumbDownIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 2v11l-3 1-2 6a2 2 0 0 1-2 2h-.5A1.5 1.5 0 0 1 8 20.5V15H3.83a2 2 0 0 1-1.98-2.27l1.34-8A2 2 0 0 1 5.17 3H17Z" />
      <path d="M22 2v11h-3V2h3Z" />
    </svg>
  );
}
