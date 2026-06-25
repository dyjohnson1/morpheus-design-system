import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import styles from "./Sheet.module.css";

/* ─── Types ───────────────────────────────────────────────────────────────── */

export type SheetSide = "left" | "right" | "top" | "bottom";

export interface SheetProps {
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Whether the sheet opens by default (uncontrolled). */
  defaultOpen?: boolean;
  /** Whether to render as modal with backdrop. Default: true. */
  modal?: boolean;
  children: React.ReactNode;
}

export interface SheetTriggerProps {
  /** The element that opens the sheet — must accept a ref. */
  children: React.ReactElement;
  /** Use `asChild` to merge trigger props onto the child. Default: true. */
  asChild?: boolean;
}

export interface SheetContentProps {
  /** Sheet content. */
  children: React.ReactNode;
  /** Side the sheet slides in from. Default: right. */
  side?: SheetSide;
  /** Additional CSS class. */
  className?: string;
  /** Whether to show the default close button. Default: true. */
  showClose?: boolean;
  /** Accessible label for the close button. Default: "Close sheet". */
  closeLabel?: string;
  /** Callback when escape key is pressed. */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /** Callback when pointer down outside content. */
  onPointerDownOutside?: (event: CustomEvent) => void;
}

export interface SheetTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface SheetDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface SheetCloseProps {
  /** The element that closes the sheet — must accept a ref. */
  children: React.ReactElement;
  /** Use `asChild` to merge close props onto the child. Default: true. */
  asChild?: boolean;
}

/* ─── Components ──────────────────────────────────────────────────────────── */

/**
 * Morpheus Sheet — sliding panel overlay (drawer) from a screen edge.
 *
 * Built on @radix-ui/react-dialog for accessible behavior:
 * - Focus trap when open
 * - Escape key closes
 * - Overlay click closes
 * - aria-labelledby / aria-describedby managed by Radix
 *
 * Compound pattern: Sheet, SheetTrigger, SheetContent,
 * SheetTitle, SheetDescription, SheetClose.
 *
 * Tokens only · WCAG 2.2 AA · reduced-motion safe.
 */
export function Sheet({
  open,
  onOpenChange,
  defaultOpen,
  modal = true,
  children,
}: SheetProps) {
  return (
    <RadixDialog.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      modal={modal}
    >
      {children}
    </RadixDialog.Root>
  );
}

/**
 * Trigger that opens the sheet.
 * Merges props onto the child element via Radix `asChild`.
 */
export function SheetTrigger({ children, asChild = true }: SheetTriggerProps) {
  return <RadixDialog.Trigger asChild={asChild}>{children}</RadixDialog.Trigger>;
}

/**
 * Sheet content panel — slides in from a screen edge with overlay.
 * Includes focus trap, Escape dismiss, overlay click dismiss.
 *
 * Motion: productive/t4 entrance (slide in from edge), t3 exit (slide out + fade).
 * Reduced-motion: crossfade at t2 only.
 */
export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  function SheetContent(
    {
      children,
      side = "right",
      className,
      showClose = true,
      closeLabel = "Close sheet",
      onEscapeKeyDown,
      onPointerDownOutside,
    },
    ref
  ) {
    const contentClasses = [styles.content, styles[side], className]
      .filter(Boolean)
      .join(" ");

    return (
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay} />
        <RadixDialog.Content
          ref={ref}
          className={contentClasses}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
        >
          {children}
          {showClose && (
            <RadixDialog.Close className={styles.close} aria-label={closeLabel}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </RadixDialog.Close>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    );
  }
);

/**
 * Sheet title — rendered as an accessible heading.
 * Automatically associated via aria-labelledby by Radix.
 */
export function SheetTitle({ children, className }: SheetTitleProps) {
  const titleClasses = [styles.title, className].filter(Boolean).join(" ");
  return <RadixDialog.Title className={titleClasses}>{children}</RadixDialog.Title>;
}

/**
 * Sheet description — supporting text below the title.
 * Automatically associated via aria-describedby by Radix.
 */
export function SheetDescription({ children, className }: SheetDescriptionProps) {
  const descClasses = [styles.description, className].filter(Boolean).join(" ");
  return (
    <RadixDialog.Description className={descClasses}>
      {children}
    </RadixDialog.Description>
  );
}

/**
 * Close trigger — merges close behavior onto the child element.
 */
export function SheetClose({ children, asChild = true }: SheetCloseProps) {
  return <RadixDialog.Close asChild={asChild}>{children}</RadixDialog.Close>;
}
