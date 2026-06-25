import * as React from "react";
import styles from "./PromptInput.module.css";
import { VisuallyHidden } from "../../primitives/VisuallyHidden";

export type PromptInputDensity = "comfortable" | "compact";

export interface PromptInputProps {
  /** Current value (controlled mode). */
  value?: string;
  /** Change handler (controlled mode). */
  onChange?: (value: string) => void;
  /** Default value (uncontrolled mode). */
  defaultValue?: string;
  /** Called with the trimmed value when the user submits. */
  onSubmit?: (value: string) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Accessible label for the textarea. */
  "aria-label"?: string;
  /** Disabled state — no interaction. */
  disabled?: boolean;
  /** Loading state — shows indicator, disables interaction. */
  loading?: boolean;
  /** Accessible label announced while loading. */
  loadingLabel?: string;
  /** Density variant. */
  density?: PromptInputDensity;
  /** Optional leading slot (e.g. attachment/tools buttons). */
  leadingSlot?: React.ReactNode;
  /** Optional trailing slot (beside send button). */
  trailingSlot?: React.ReactNode;
  /** Additional class name. */
  className?: string;
}

/**
 * Morpheus PromptInput — AI prompt composition surface.
 *
 * Auto-growing textarea with Enter-to-submit (Shift+Enter for new line),
 * optional leading/trailing slots, loading indicator, and density support.
 *
 * Tokens only · all states · reduced-motion safe · density-aware · WCAG 2.2 AA.
 */
export const PromptInput = React.forwardRef<HTMLTextAreaElement, PromptInputProps>(
  function PromptInput(
    {
      value: controlledValue,
      onChange,
      defaultValue = "",
      onSubmit,
      placeholder = "Ask anything\u2026",
      "aria-label": ariaLabel = "Prompt",
      disabled = false,
      loading = false,
      loadingLabel = "Sending",
      density = "comfortable",
      leadingSlot,
      trailingSlot,
      className,
    },
    ref
  ) {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = isControlled ? controlledValue : internalValue;

    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const isDisabled = disabled || loading;

    // Merge forwarded ref with internal ref
    const mergedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      },
      [ref]
    );

    // Auto-grow textarea height
    React.useEffect(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, [currentValue]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const next = e.target.value;
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const handleSubmit = () => {
      const trimmed = currentValue.trim();
      if (!trimmed || isDisabled) return;
      onSubmit?.(trimmed);
      if (!isControlled) setInternalValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };

    const rootClasses = [
      styles.root,
      styles[density],
      isDisabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={rootClasses} data-density={density}>
        {/* Leading slot */}
        {leadingSlot && (
          <div className={styles.leadingSlot}>{leadingSlot}</div>
        )}

        {/* Textarea */}
        <textarea
          ref={mergedRef}
          className={styles.textarea}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isDisabled}
          aria-label={ariaLabel}
          aria-busy={loading || undefined}
          rows={1}
        />

        {/* Trailing slot */}
        {trailingSlot && (
          <div className={styles.trailingSlot}>{trailingSlot}</div>
        )}

        {/* Send / loading button */}
        <button
          type="button"
          className={styles.sendButton}
          onClick={handleSubmit}
          disabled={isDisabled || !currentValue.trim()}
          aria-label={loading ? loadingLabel : "Send"}
          aria-busy={loading || undefined}
        >
          {loading ? (
            <>
              <span className={styles.dots} aria-hidden="true">
                <i /><i /><i />
              </span>
              <VisuallyHidden>{loadingLabel}</VisuallyHidden>
            </>
          ) : (
            <svg
              className={styles.sendIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22 11 13 2 9z" />
            </svg>
          )}
        </button>
      </div>
    );
  }
);
