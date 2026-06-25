import * as React from "react";
import styles from "./CitationCard.module.css";

export type CitationType = "webpage" | "document" | "code" | "api";
export type CitationCardDensity = "comfortable" | "compact";

export interface CitationCardProps {
  /** Citation title — the title of the referenced source. */
  title: string;
  /** URL of the source. Rendered as a real <a> link with a discernible name. */
  url: string;
  /** Source name or domain (e.g. "MDN Web Docs"). */
  sourceName: string;
  /** Optional snippet/excerpt from the cited source. */
  snippet?: string;
  /** Optional icon element (e.g. favicon). */
  icon?: React.ReactNode;
  /** Citation index number — displayed as a badge, e.g. "[1]". */
  index?: number;
  /** Type of the cited source — shown with icon + text. @default "webpage" */
  type?: CitationType;
  /** Density variant. @default "comfortable" */
  density?: CitationCardDensity;
  /** Additional class name on the root element. */
  className?: string;
}

const TYPE_LABELS: Record<CitationType, string> = {
  webpage: "Web page",
  document: "Document",
  code: "Code",
  api: "API",
};

/**
 * Morpheus CitationCard — AI pattern.
 *
 * Displays a citation/source reference from an AI response.
 * Real semantics — `<article>` root, source is a real `<a>` link
 * with a discernible accessible name (not a generic "click here").
 *
 * - Root is `<article>` with descriptive aria-label
 * - Source link is a real anchor with the title as accessible name
 * - Index rendered as a visual badge "[n]"
 * - Type shown with icon + text (never icon alone)
 * - Density-aware (comfortable/compact)
 * - Keyboard focusable via the source link
 *
 * Tokens only · all states · WCAG 2.2 AA · reduced-motion fallback.
 */
export const CitationCard = React.forwardRef<HTMLElement, CitationCardProps>(
  function CitationCard(
    {
      title,
      url,
      sourceName,
      snippet,
      icon,
      index,
      type = "webpage",
      density = "comfortable",
      className,
    },
    ref
  ) {
    const rootClasses = [styles.root, className].filter(Boolean).join(" ");
    const ariaLabel = index != null
      ? `Citation ${index}: ${title}, from ${sourceName}`
      : `Citation: ${title}, from ${sourceName}`;

    return (
      <article
        ref={ref}
        className={rootClasses}
        aria-label={ariaLabel}
        data-density={density}
        data-type={type}
      >
        <div className={styles.header}>
          {index != null && (
            <span className={styles.indexBadge} aria-hidden="true">
              [{index}]
            </span>
          )}

          {icon && (
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
          )}

          <div className={styles.titleGroup}>
            <a
              href={url}
              className={styles.titleLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
            <span className={styles.sourceName}>{sourceName}</span>
          </div>
        </div>

        {snippet && (
          <p className={styles.snippet}>{snippet}</p>
        )}

        <div className={styles.meta}>
          <span className={styles.typeIndicator}>
            <span className={styles.typeIcon} aria-hidden="true">
              {typeIcon(type)}
            </span>
            <span className={styles.typeLabel}>{TYPE_LABELS[type]}</span>
          </span>
        </div>
      </article>
    );
  }
);

/** Returns the appropriate SVG icon for each citation type. */
function typeIcon(type: CitationType): React.ReactNode {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    focusable: "false" as const,
    width: "14",
    height: "14",
  };

  switch (type) {
    case "webpage":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "document":
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "api":
      return (
        <svg {...props}>
          <path d="M4 11a9 9 0 0 1 9 9" />
          <path d="M4 4a16 16 0 0 1 16 16" />
          <circle cx="5" cy="19" r="1" />
        </svg>
      );
  }
}
