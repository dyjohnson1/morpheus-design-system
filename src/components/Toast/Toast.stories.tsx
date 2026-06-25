import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./Toast";
import type { ToastVariant } from "./Toast";

const meta: Meta<typeof ToastProvider> = {
  title: "Feedback/Toast",
  component: ToastProvider,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 400, padding: "var(--morph-space-5)" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ToastProvider>;

/* ─── Helper: trigger button ────────────────────────────────────────────── */

function TriggerButton({
  variant = "info",
  message,
  withAction,
  duration,
}: {
  variant?: ToastVariant;
  message: string;
  withAction?: boolean;
  duration?: number;
}) {
  const { toast } = useToast();
  return (
    <button
      type="button"
      onClick={() =>
        toast({
          variant,
          message,
          duration,
          action: withAction
            ? { label: "Undo", onClick: () => {} }
            : undefined,
        })
      }
      style={{
        padding: "var(--morph-space-2) var(--morph-space-4)",
        borderRadius: "var(--morph-radius-2)",
        border: "1px solid var(--morph-color-border-subtle)",
        background: "var(--morph-color-surface-raised)",
        color: "var(--morph-color-on-surface)",
        cursor: "pointer",
        fontFamily: "var(--morph-font-ui)",
      }}
    >
      Show {variant} toast
    </button>
  );
}

/* ─── Variants ──────────────────────────────────────────────────────────── */

export const Info: Story = {
  render: () => (
    <ToastProvider>
      <TriggerButton variant="info" message="Your session will expire in 10 minutes." />
    </ToastProvider>
  ),
};

export const Success: Story = {
  render: () => (
    <ToastProvider>
      <TriggerButton variant="success" message="Changes saved successfully." />
    </ToastProvider>
  ),
};

export const Warning: Story = {
  render: () => (
    <ToastProvider>
      <TriggerButton variant="warning" message="This action cannot be undone once confirmed." />
    </ToastProvider>
  ),
};

export const Error: Story = {
  render: () => (
    <ToastProvider>
      <TriggerButton variant="error" message="Unable to save. Check your connection and try again." />
    </ToastProvider>
  ),
};

/* ─── With action ───────────────────────────────────────────────────────── */

export const WithAction: Story = {
  name: "With action button",
  render: () => (
    <ToastProvider>
      <TriggerButton
        variant="success"
        message="Item deleted."
        withAction
      />
    </ToastProvider>
  ),
};

/* ─── Persistent (no auto-dismiss) ──────────────────────────────────────── */

export const Persistent: Story = {
  name: "Persistent (no auto-dismiss)",
  render: () => (
    <ToastProvider>
      <TriggerButton
        variant="warning"
        message="Connection lost. Retrying..."
        duration={0}
      />
    </ToastProvider>
  ),
};

/* ─── Positions ─────────────────────────────────────────────────────────── */

export const TopRight: Story = {
  name: "Position: top-right",
  render: () => (
    <ToastProvider position="top-right">
      <TriggerButton variant="info" message="Toast at top-right." />
    </ToastProvider>
  ),
};

export const BottomLeft: Story = {
  name: "Position: bottom-left",
  render: () => (
    <ToastProvider position="bottom-left">
      <TriggerButton variant="info" message="Toast at bottom-left." />
    </ToastProvider>
  ),
};

/* ─── All states matrix ─────────────────────────────────────────────────── */

export const AllStates: Story = {
  render: () => (
    <ToastProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--morph-space-3)",
          maxWidth: 300,
        }}
      >
        <TriggerButton variant="info" message="Informational toast." />
        <TriggerButton variant="success" message="Success toast." />
        <TriggerButton variant="warning" message="Warning toast." />
        <TriggerButton variant="error" message="Error toast." />
        <TriggerButton variant="success" message="Action toast." withAction />
        <TriggerButton variant="warning" message="Persistent toast." duration={0} />
      </div>
    </ToastProvider>
  ),
};
