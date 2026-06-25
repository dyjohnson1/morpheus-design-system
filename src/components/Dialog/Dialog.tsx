import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import styles from "./Dialog.module.css";

/* ─── Types ───────────────────────────────────────────────────────────────── */

export type DialogSize = "sm" | "md" | "lg";

export interface DialogProps {
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Whether the dialog opens by default (uncontrolled). */
  defaultOpen?: boolean;
  /** Whether to render the overlay/content in a portal. Default: true. */
  modal?: boolean;
  children: React.ReactNode;
}

export interface DialogTriggerProps {
  /** The element that opens the dialog — must accept a ref. */
  children: React.ReactElement;
  /** Use `asChild` to merge trigger props onto the child. Default: true. */
  asChild?: boolean;
}

export interface DialogContentProps {
  /** Dialog content. */
  children: React.ReactNode;
  /** Size variant controlling max-width. Default: md. */
  size?: DialogSize;
  /** Additional CSS class. */
  className?: string;
  /** Whether to show the default close button. Default: true. */
  showClose?: boolean;
  /** Accessible label for the close button. Default: "Close dialog". */
  closeLabel?: string;
  /** Callback when escape key is pressed. */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /** Callback when pointer down outside content. */
  onPointerDownOutside?: (event: CustomEvent) => void;
}

export interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogCloseProps {
  /** The element that closes the dialog — must accept a ref. */
  children: React.ReactElement;
  /** Use `asChild` to merge close props onto the child. Default: true. */
  asChild?: boolean;
}

/* ─── Components ──────────────────────────────────────────────────────────── */

/**
 * Morpheus Dialog — modal overlay for focused tasks.
 *
 * Built on @radix-ui/react-dialog for accessible behavior:
 * - Focus trap when open
 * - Escape key closes
 * - Overlay click closes
 * - aria-labelledby / aria-describedby managed by Radix
 *
 * Compound pattern: Dialog, DialogTrigger, DialogContent,
 * DialogTitle, DialogDescription, DialogClose.
 *
 * Tokens only · WCAG 2.2 AA · reduced-motion safe.
 */
export function Dialog({
  open,
  onOpenChange,
  defaultOpen,
  modal = true,
  children,
}: DialogProps) {
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
 * Trigger that opens the dialog.
 * Merges props onto the child element via Radix `asChild`.
 */
export function DialogTrigger({ children, asChild = true }: DialogTriggerProps) {
  return <RadixDialog.Trigger asChild={asChild}>{children}</RadixDialog.Trigger>;
}

/**
 * Dialog content panel — centered modal with overlay.
 * Includes focus trap, Escape dismiss, overlay click dismiss.
 *
 * Motion: productive/t4 entrance (scale + fade), t2 exit (fade).
 * Reduced-motion: crossfade at t2 only.
 */
export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(
    {
      children,
      size = "md",
      className,
      showClose = true,
      closeLabel = "Close dialog",
      onEscapeKeyDown,
      onPointerDownOutside,
    },
    ref
  ) {
    const contentClasses = [styles.content, styles[size], className]
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
 * Dialog title — rendered as an accessible heading.
 * Automatically associated via aria-labelledby by Radix.
 */
export function DialogTitle({ children, className }: DialogTitleProps) {
  const titleClasses = [styles.title, className].filter(Boolean).join(" ");
  return <RadixDialog.Title className={titleClasses}>{children}</RadixDialog.Title>;
}

/**
 * Dialog description — supporting text below the title.
 * Automatically associated via aria-describedby by Radix.
 */
export function DialogDescription({ children, className }: DialogDescriptionProps) {
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
export function DialogClose({ children, asChild = true }: DialogCloseProps) {
  return <RadixDialog.Close asChild={asChild}>{children}</RadixDialog.Close>;
}
