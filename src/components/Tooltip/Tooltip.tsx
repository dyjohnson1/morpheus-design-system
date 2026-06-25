import * as React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import styles from "./Tooltip.module.css";

export type TooltipSide = "top" | "right" | "bottom" | "left";
export type TooltipAlign = "start" | "center" | "end";

export interface TooltipProps {
  /** Content displayed inside the tooltip. */
  content: React.ReactNode;
  /** The trigger element — must accept a ref. */
  children: React.ReactElement;
  /** Which side of the trigger the tooltip appears on. Default: top. */
  side?: TooltipSide;
  /** Alignment along the side axis. Default: center. */
  align?: TooltipAlign;
  /** Delay in ms before the tooltip opens on hover. Default: 700. */
  delayDuration?: number;
  /** Whether to show the arrow pointing at the trigger. Default: true. */
  arrow?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes (controlled mode). */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Morpheus Tooltip — informational overlay triggered by hover or focus.
 *
 * Built on @radix-ui/react-tooltip for accessible behavior:
 * - role="tooltip" (provided by Radix)
 * - Keyboard: focus on trigger shows tooltip; Escape dismisses
 * - Delay sharing across provider
 * - Motion: productive/t2 entrance (scale + fade), t1 exit (fade)
 * - Reduced-motion: instant opacity, no scale
 *
 * Tokens only · WCAG 2.2 AA · reduced-motion safe.
 */
export function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 700,
  arrow = true,
  open,
  onOpenChange,
}: TooltipProps) {
  return (
    <RadixTooltip.Root
      delayDuration={delayDuration}
      open={open}
      onOpenChange={onOpenChange}
    >
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          className={styles.content}
          side={side}
          align={align}
          sideOffset={6}
        >
          {content}
          {arrow && <RadixTooltip.Arrow className={styles.arrow} />}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}

export interface TooltipProviderProps {
  /** Shared delay across all tooltips in this provider tree. Default: 700. */
  delayDuration?: number;
  /** How long before the tooltip hides after pointer leaves. Default: 300. */
  skipDelayDuration?: number;
  children: React.ReactNode;
}

/**
 * Wraps the app (or a subtree) to share tooltip delay timing.
 * Place at the root of your app for consistent tooltip behavior.
 */
export function TooltipProvider({
  delayDuration = 700,
  skipDelayDuration = 300,
  children,
}: TooltipProviderProps) {
  return (
    <RadixTooltip.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      {children}
    </RadixTooltip.Provider>
  );
}
