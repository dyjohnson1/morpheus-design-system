import * as React from "react";
import styles from "./SuggestionChips.module.css";
import { VisuallyHidden } from "../../primitives/VisuallyHidden";

export type SuggestionChipsDensity = "comfortable" | "compact";

export interface Suggestion {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SuggestionChipsProps {
  /** Array of suggestion items to display as chips. */
  suggestions: Suggestion[];
  /** Called with the selected suggestion's id when a chip is activated. */
  onSelect?: (id: string) => void;
  /** Accessible label for the chip group (rendered as visually hidden text). */
  label?: string;
  /** Disables the entire group. */
  disabled?: boolean;
  /** Density variant — controls chip sizing. */
  density?: SuggestionChipsDensity;
  /** When true, renders skeleton placeholder chips. */
  loading?: boolean;
  /** Number of skeleton chips to show in loading state. @default 3 */
  loadingCount?: number;
  /** Additional class name on the root element. */
  className?: string;
}

/**
 * Morpheus SuggestionChips — AI pattern.
 *
 * A horizontal group of clickable chip/pill buttons that suggest prompts
 * or actions to the user. Chips wrap when space is limited.
 *
 * Keyboard: Tab enters the group, arrow keys navigate between chips.
 * Motion: staggered entrance (t1/item, max 5 then batch); reduced-motion safe.
 * Density-aware; never <44px touch target on touch modality.
 *
 * Tokens only · all states · WCAG 2.2 AA · reduced-motion fallback.
 */
export const SuggestionChips = React.forwardRef<HTMLDivElement, SuggestionChipsProps>(
  function SuggestionChips(
    {
      suggestions,
      onSelect,
      label = "Suggestions",
      disabled = false,
      density = "comfortable",
      loading = false,
      loadingCount = 3,
      className,
    },
    ref
  ) {
    const chipsRef = React.useRef<(HTMLButtonElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = React.useState(-1);

    // Reset chip refs when suggestions change
    React.useEffect(() => {
      chipsRef.current = chipsRef.current.slice(0, suggestions.length);
    }, [suggestions.length]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const enabledIndices = suggestions
        .map((s, i) => (!s.disabled && !disabled ? i : -1))
        .filter((i) => i !== -1);

      if (enabledIndices.length === 0) return;

      let nextIndex = -1;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const currentPos = enabledIndices.indexOf(focusedIndex);
        nextIndex = enabledIndices[(currentPos + 1) % enabledIndices.length];
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const currentPos = enabledIndices.indexOf(focusedIndex);
        nextIndex =
          enabledIndices[(currentPos - 1 + enabledIndices.length) % enabledIndices.length];
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = enabledIndices[0];
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = enabledIndices[enabledIndices.length - 1];
      }

      if (nextIndex !== -1) {
        setFocusedIndex(nextIndex);
        chipsRef.current[nextIndex]?.focus();
      }
    };

    const handleChipClick = (suggestion: Suggestion) => {
      if (disabled || suggestion.disabled) return;
      onSelect?.(suggestion.id);
    };

    const handleChipFocus = (index: number) => {
      setFocusedIndex(index);
    };

    const rootClasses = [
      styles.root,
      styles[density],
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Loading state — skeleton chips
    if (loading) {
      return (
        <div
          ref={ref}
          className={rootClasses}
          role="group"
          aria-label={label}
          aria-busy="true"
          data-density={density}
        >
          <VisuallyHidden>{label}</VisuallyHidden>
          {Array.from({ length: loadingCount }, (_, i) => (
            <span
              key={i}
              className={[styles.chip, styles.skeleton].join(" ")}
              aria-hidden="true"
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={rootClasses}
        role="group"
        aria-label={label}
        aria-disabled={disabled || undefined}
        data-density={density}
        onKeyDown={handleKeyDown}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        {suggestions.map((suggestion, index) => {
          const isDisabled = disabled || suggestion.disabled;
          const chipClasses = [
            styles.chip,
            isDisabled && styles.chipDisabled,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={suggestion.id}
              ref={(el) => {
                chipsRef.current[index] = el;
              }}
              type="button"
              className={chipClasses}
              disabled={isDisabled}
              tabIndex={
                isDisabled
                  ? -1
                  : focusedIndex === -1 && index === 0
                    ? 0
                    : focusedIndex === index
                      ? 0
                      : -1
              }
              onClick={() => handleChipClick(suggestion)}
              onFocus={() => handleChipFocus(index)}
              style={
                { "--chip-index": Math.min(index, 4) } as React.CSSProperties
              }
              aria-disabled={isDisabled || undefined}
            >
              {suggestion.icon && (
                <span className={styles.icon} aria-hidden="true">
                  {suggestion.icon}
                </span>
              )}
              <span className={styles.label}>{suggestion.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
