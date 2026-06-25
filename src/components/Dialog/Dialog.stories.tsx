import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Overlay/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Dialog>;

/* ── Default (md) ─────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <button>Open dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogDescription>
          This is a description of the dialog content. It provides context for the
          user about what action or information is being presented.
        </DialogDescription>
        <div style={{ display: "flex", gap: "var(--morph-space-3)", justifyContent: "flex-end" }}>
          <DialogClose>
            <button>Cancel</button>
          </DialogClose>
          <button>Confirm</button>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

/* ── Small ────────────────────────────────────────────────────────────────── */

export const Small: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <button>Open small dialog</button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogTitle>Confirm action</DialogTitle>
        <DialogDescription>
          Are you sure you want to proceed? This action cannot be undone.
        </DialogDescription>
        <div style={{ display: "flex", gap: "var(--morph-space-3)", justifyContent: "flex-end" }}>
          <DialogClose>
            <button>Cancel</button>
          </DialogClose>
          <button>Delete</button>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

/* ── Large ────────────────────────────────────────────────────────────────── */

export const Large: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <button>Open large dialog</button>
      </DialogTrigger>
      <DialogContent size="lg">
        <DialogTitle>Review changes</DialogTitle>
        <DialogDescription>
          The following changes will be applied to your workspace. Review each item
          before confirming.
        </DialogDescription>
        <div
          style={{
            padding: "var(--morph-space-4)",
            background: "var(--morph-color-surface)",
            borderRadius: "var(--morph-radius-2)",
            marginBottom: "var(--morph-space-5)",
            border: "1px solid var(--morph-color-border-subtle)",
          }}
        >
          <p style={{ margin: 0, color: "var(--morph-color-on-surface-muted)" }}>
            Content area for larger dialog layouts such as forms, lists, or detailed
            information.
          </p>
        </div>
        <div style={{ display: "flex", gap: "var(--morph-space-3)", justifyContent: "flex-end" }}>
          <DialogClose>
            <button>Cancel</button>
          </DialogClose>
          <button>Apply changes</button>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

/* ── Without close button ─────────────────────────────────────────────────── */

export const NoCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <button>Open (no close button)</button>
      </DialogTrigger>
      <DialogContent showClose={false}>
        <DialogTitle>Important notice</DialogTitle>
        <DialogDescription>
          This dialog does not show a close icon. Use the action buttons or press
          Escape to dismiss.
        </DialogDescription>
        <div style={{ display: "flex", gap: "var(--morph-space-3)", justifyContent: "flex-end" }}>
          <DialogClose>
            <button>Dismiss</button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

/* ── Controlled ───────────────────────────────────────────────────────────── */

export const Controlled: Story = {
  render: function ControlledDialog() {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <p style={{ color: "var(--morph-color-on-surface-muted)", marginBottom: "var(--morph-space-3)" }}>
          State: {open ? "open" : "closed"}
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <button>Open controlled dialog</button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Controlled dialog</DialogTitle>
            <DialogDescription>
              This dialog is controlled via external state. The parent can
              programmatically open or close it.
            </DialogDescription>
            <div style={{ display: "flex", gap: "var(--morph-space-3)", justifyContent: "flex-end" }}>
              <DialogClose>
                <button>Close</button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

/* ── Open (for visual testing) ────────────────────────────────────────────── */

export const Open: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger>
        <button>Trigger (dialog already open)</button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Visible dialog</DialogTitle>
        <DialogDescription>
          This dialog renders open by default for visual testing.
        </DialogDescription>
        <div style={{ display: "flex", gap: "var(--morph-space-3)", justifyContent: "flex-end" }}>
          <DialogClose>
            <button>Close</button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

/* ── All states matrix ────────────────────────────────────────────────────── */

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-4)", alignItems: "center" }}>
      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: "var(--morph-space-3)", textAlign: "center" }}>
          Size variants
        </p>
        <div style={{ display: "flex", gap: "var(--morph-space-4)" }}>
          <Dialog>
            <DialogTrigger>
              <button>Small</button>
            </DialogTrigger>
            <DialogContent size="sm">
              <DialogTitle>Small dialog</DialogTitle>
              <DialogDescription>Compact confirmation or alert.</DialogDescription>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <DialogClose><button>OK</button></DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <button>Medium (default)</button>
            </DialogTrigger>
            <DialogContent size="md">
              <DialogTitle>Medium dialog</DialogTitle>
              <DialogDescription>Standard dialog for forms and messages.</DialogDescription>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <DialogClose><button>OK</button></DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <button>Large</button>
            </DialogTrigger>
            <DialogContent size="lg">
              <DialogTitle>Large dialog</DialogTitle>
              <DialogDescription>Wider layout for detailed content.</DialogDescription>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <DialogClose><button>OK</button></DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: "var(--morph-space-3)", textAlign: "center" }}>
          Close button variants
        </p>
        <div style={{ display: "flex", gap: "var(--morph-space-4)" }}>
          <Dialog>
            <DialogTrigger>
              <button>With close button</button>
            </DialogTrigger>
            <DialogContent showClose>
              <DialogTitle>With close</DialogTitle>
              <DialogDescription>Shows the X close button.</DialogDescription>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <DialogClose><button>Done</button></DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <button>Without close button</button>
            </DialogTrigger>
            <DialogContent showClose={false}>
              <DialogTitle>Without close</DialogTitle>
              <DialogDescription>No X button. Use Escape or action buttons.</DialogDescription>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <DialogClose><button>Done</button></DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  ),
};
