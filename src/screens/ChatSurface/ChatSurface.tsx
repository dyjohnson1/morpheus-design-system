import * as React from "react";
import styles from "./ChatSurface.module.css";
import { ARIA } from "./copy";

/**
 * The screen-level view state for the chat surface.
 * - "empty": first-run / no messages yet (warm voice guidance)
 * - "loading": initial data fetch or generating first response
 * - "error": a recoverable error occurred; shows message + retry
 * - "hitl": agent requests human-in-the-loop approval
 * - "populated": normal state with message history (default)
 */
export type ChatSurfaceState =
  | "empty"
  | "loading"
  | "error"
  | "hitl"
  | "populated";

export interface ChatSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class name for the root layout container. */
  className?: string;
  /** Content for the AppBar region (top, full-width). */
  appBar?: React.ReactNode;
  /** Content for the SideNav region (left column). */
  sideNav?: React.ReactNode;
  /** Whether the SideNav should be collapsed (icon-only) at md breakpoint. */
  sideNavCollapsed?: boolean;
  /** Accessible label for the SideNav aside landmark. */
  sideNavLabel?: string;
  /** Content for the composer/input region (sticky bottom of main). */
  composer?: React.ReactNode;
  /**
   * Current view state of the surface.
   * Controls which content/overlay is rendered in the message area.
   * @default "populated"
   */
  state?: ChatSurfaceState;
  /**
   * Content rendered when state is "empty" — typically an EmptyState component.
   * When provided and state="empty", replaces children in the message area.
   */
  emptyContent?: React.ReactNode;
  /**
   * Content rendered when state is "loading" — typically Skeleton + AgentStatus.
   * When provided and state="loading", replaces children in the message area.
   */
  loadingContent?: React.ReactNode;
  /**
   * Content rendered when state is "error" — typically an InlineMessage with retry.
   * When provided and state="error", replaces children in the message area.
   */
  errorContent?: React.ReactNode;
  /**
   * Content rendered when state is "hitl" — typically HumanInLoopCard + context.
   * Appended after children when state="hitl" (doesn't replace message history).
   */
  hitlContent?: React.ReactNode;
}

/**
 * Morpheus AI Chat Surface — screen-level layout shell for the conversational AI experience.
 *
 * Composes AppBar, SideNav, message history, and PromptInput into a cohesive
 * full-viewport grid layout with named regions:
 * - appbar: spans full width at top
 * - sidenav: left column (hidden xs/sm, collapsed md, full lg+)
 * - main: message area + sticky composer
 *
 * Tokens only · responsive xs–2xl · dark + light · WCAG 2.2 AA.
 */
export const ChatSurface = React.forwardRef<HTMLDivElement, ChatSurfaceProps>(
  function ChatSurface(
    {
      className,
      appBar,
      sideNav,
      sideNavCollapsed,
      sideNavLabel = ARIA.sideNavDefault,
      composer,
      state = "populated",
      emptyContent,
      loadingContent,
      errorContent,
      hitlContent,
      children,
      ...rest
    },
    ref
  ) {
    const rootClasses = [styles.root, className].filter(Boolean).join(" ");

    /**
     * Determine what renders in the message area based on state:
     * - empty: show emptyContent centered (no children)
     * - loading: show loadingContent (no children)
     * - error: show errorContent (no children)
     * - hitl: show children + hitlContent appended (history stays visible)
     * - populated: show children as-is
     */
    function renderMessageContent() {
      switch (state) {
        case "empty":
          return (
            <div className={styles.stateContainer} data-state="empty">
              {emptyContent}
            </div>
          );
        case "loading":
          return (
            <div className={styles.stateContainer} data-state="loading">
              {loadingContent}
            </div>
          );
        case "error":
          return (
            <div className={styles.stateContainer} data-state="error">
              {errorContent}
            </div>
          );
        case "hitl":
          return (
            <>
              {children}
              <div className={styles.hitlContainer} data-state="hitl">
                {hitlContent}
              </div>
            </>
          );
        case "populated":
        default:
          return children;
      }
    }

    return (
      <div ref={ref} className={rootClasses} data-state={state} {...rest}>
        {/* Skip link — keyboard shortcut to bypass navigation chrome */}
        <a href="#chat-main-content" className={styles.skipLink}>
          {ARIA.skipLink}
        </a>

        {appBar && <div className={styles.appbar}>{appBar}</div>}

        {sideNav && (
          <aside
            className={styles.sidenav}
            aria-label={sideNavLabel}
            data-collapsed={sideNavCollapsed || undefined}
          >
            {sideNav}
          </aside>
        )}

        <main className={styles.main} id="chat-main-content">
          <div className={styles.messageArea} aria-live="polite" aria-atomic={false}>
            <div className={styles.messageContent}>
              {renderMessageContent()}
            </div>
          </div>

          {composer && <div className={styles.composer}>{composer}</div>}
        </main>
      </div>
    );
  }
);
