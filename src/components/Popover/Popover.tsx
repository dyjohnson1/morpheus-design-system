import * as React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import styles from "./Popover.module.css";

/* ─── Types ───────────────────────────────────────────────────────────────── */

export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverProps {
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Whether the popover opens by default (uncontrolled). */
  defaultOpen?: boolean;
  /** Whether the popover is modal (traps focus). Default: false. */
  modal?: boolean;
  children: React.ReactNode;
}

export interface PopoverTriggerProps {
  /** The element that toggles the popover — must accept a ref. */
  children: React.ReactElement;
  /** Use `asChild` to merge trigger props onto the child. Default: true. */
  asChild?: boolean;
}

export interface PopoverContentProps {
  /** Popover content. */
  children: React.ReactNode;
  /** Which side of the trigger the popover appears on. Default: bottom. */
  side?: PopoverSide;
  /** Alignment along the side axis. Default: center. */
  align?: PopoverAlign;
  /** Offset from the trigger in px. Default: 8. */
  sideOffset?: number;
  /** Additional CSS class. */
  className?: string;
  /** Callback when escape key is pressed. */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /** Callback when pointer down outside content. */
  onPointerDownOutside?: (event: CustomEvent) => void;
  /** Callback when focus moves outside content. */
  onFocusOutside?: (event: CustomEvent) => void;
}

export interface PopoverCloseProps {
  /** The element that closes the popover — must accept a ref. */
  children: React.ReactElement;
  /** Use `asChild` to merge close props onto the child. Default: true. */
  asChild?: boolean;
}

export interface PopoverArrowProps {
  /** Width of the arrow in px. Default: 12. */
  width?: number;
  /** Height of the arrow in px. Default: 6. */
  height?: number;
  /** Additional CSS class. */
  className?: string;
}

/* ─── Components ──────────────────────────────────────────────────────────── */

/**
 * Morpheus Popover — floating content panel anchored to a trigger.
 *
 * Built on @radix-ui/react-popover for accessible behavior:
 * - Collision-aware positioning (flips/shifts to stay in viewport)
 * - Escape key and outside click dismissal
 * - Focus management (returns focus to trigger on close)
 * - aria-expanded on trigger, proper association
 *
 * Compound pattern: Popover, PopoverTrigger, PopoverContent,
 * PopoverClose, PopoverArrow.
 *
 * Motion: productive/t3 entrance (scale from 0.96 + fade), t2 exit (fade).
 * Reduced-motion: simple fade at t2.
 *
 * Tokens only · WCAG 2.2 AA · reduced-motion safe.
 */
export function Popover({
  open,
  onOpenChange,
  defaultOpen,
  modal = false,
  children,
}: PopoverProps) {
  return (
    <RadixPopover.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      modal={modal}
    >
      {children}
    </RadixPopover.Root>
  );
}

/**
 * Trigger that toggles the popover.
 * Merges props onto the child element via Radix `asChild`.
 */
export function PopoverTrigger({ children, asChild = true }: PopoverTriggerProps) {
  return <RadixPopover.Trigger asChild={asChild}>{children}</RadixPopover.Trigger>;
}

/**
 * Popover content panel — positioned relative to the trigger.
 *
 * Surface: overlay material with subtle border, elevation shadow.
 * Motion: productive/t3 entrance (scale + fade), t2 exit (fade).
 * Reduced-motion: simple fade at t2.
 */
export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    {
      children,
      side = "bottom",
      align = "center",
      sideOffset = 8,
      className,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
    },
    ref
  ) {
    const contentClasses = [styles.content, className].filter(Boolean).join(" ");

    return (
      <RadixPopover.Portal>
        <RadixPopover.Content
          ref={ref}
          className={contentClasses}
          side={side}
          align={align}
          sideOffset={sideOffset}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onFocusOutside={onFocusOutside}
        >
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    );
  }
);

/**
 * Close trigger — merges close behavior onto the child element.
 */
export function PopoverClose({ children, asChild = true }: PopoverCloseProps) {
  return <RadixPopover.Close asChild={asChild}>{children}</RadixPopover.Close>;
}

/**
 * Optional arrow pointing at the trigger.
 * Inherits surface fill from the content panel.
 */
export function PopoverArrow({
  width = 12,
  height = 6,
  className,
}: PopoverArrowProps) {
  const arrowClasses = [styles.arrow, className].filter(Boolean).join(" ");
  return <RadixPopover.Arrow className={arrowClasses} width={width} height={height} />;
}
