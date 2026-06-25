import * as React from "react";
import * as RadixToast from "@radix-ui/react-toast";
import styles from "./Toast.module.css";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type ToastVariant = "info" | "success" | "warning" | "error";

export interface ToastData {
  /** Unique ID for the toast instance. Auto-generated if not provided. */
  id?: string;
  /** Semantic variant — determines icon, color, and ARIA urgency. @default "info" */
  variant?: ToastVariant;
  /** Message content (required). */
  message: React.ReactNode;
  /** Optional action button. */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Auto-dismiss duration in ms. 0 = persistent. @default 5000 */
  duration?: number;
}

export interface ToastProps extends ToastData {
  /** Called when the toast is removed (dismiss, swipe, or timeout). */
  onRemove: (id: string) => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Position of the toast viewport. @default "bottom-right" */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** Max toasts visible at once. @default 5 */
  maxVisible?: number;
}

/* ─── Context for imperative API ────────────────────────────────────────── */

interface ToastContextValue {
  toast: (data: ToastData) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

/**
 * useToast — imperative API for showing toasts from anywhere in the tree.
 * Must be used within a ToastProvider.
 */
export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

/* ─── Provider ──────────────────────────────────────────────────────────── */

let toastCounter = 0;

/**
 * ToastProvider — wraps the app and provides the toast viewport + imperative API.
 * Uses Radix Toast under the hood for accessible live-region announcements.
 */
export function ToastProvider({
  children,
  position = "bottom-right",
  maxVisible = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<(ToastData & { id: string })[]>([]);

  const toast = React.useCallback((data: ToastData): string => {
    const id = data.id ?? `morph-toast-${++toastCounter}`;
    setToasts((prev) => {
      const next = [...prev, { ...data, id }];
      // Trim to maxVisible
      return next.slice(-maxVisible);
    });
    return id;
  }, [maxVisible]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  const contextValue = React.useMemo(
    () => ({ toast, dismiss, dismissAll }),
    [toast, dismiss, dismissAll]
  );

  const viewportClasses = [styles.viewport, styles[position.replace("-", "")]].filter(Boolean).join(" ");

  return (
    <ToastContext.Provider value={contextValue}>
      <RadixToast.Provider swipeDirection="right">
        {children}
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} id={t.id} onRemove={dismiss} />
        ))}
        <RadixToast.Viewport className={viewportClasses} />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}

/* ─── Single toast ──────────────────────────────────────────────────────── */

function ToastItem({
  id,
  variant = "info",
  message,
  action,
  duration = 5000,
  onRemove,
}: ToastProps) {
  const rootClasses = [styles.root, styles[variant]].filter(Boolean).join(" ");

  return (
    <RadixToast.Root
      className={rootClasses}
      duration={duration === 0 ? Infinity : duration}
      onOpenChange={(open) => {
        if (!open) onRemove(id!);
      }}
    >
      <span className={styles.icon} aria-hidden="true">
        {variantIcon(variant)}
      </span>
      <RadixToast.Description className={styles.content}>
        {message}
      </RadixToast.Description>
      {action && (
        <RadixToast.Action className={styles.action} altText={action.label} asChild>
          <button type="button" onClick={action.onClick}>
            {action.label}
          </button>
        </RadixToast.Action>
      )}
      <RadixToast.Close className={styles.dismiss} aria-label="Dismiss">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </RadixToast.Close>
    </RadixToast.Root>
  );
}

/* ─── Variant icons — distinct shape per variant (never color alone) ────── */

function variantIcon(variant: ToastVariant): React.ReactNode {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    focusable: "false" as const,
  };

  switch (variant) {
    case "info":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
    case "success":
      return (
        <svg {...props}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case "warning":
      return (
        <svg {...props}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "error":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
  }
}
