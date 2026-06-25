import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./Sheet";

const meta: Meta<typeof Sheet> = {
  title: "Overlay/Sheet",
  component: Sheet,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Sheet>;

/* ── Default (right) ──────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <button>Open sheet</button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Sheet title</SheetTitle>
        <SheetDescription>
          This is a description of the sheet content. It slides in from the right
          edge of the screen by default.
        </SheetDescription>
        <div style={{ display: "flex", gap: "var(--morph-space-3)", justifyContent: "flex-end", marginTop: "var(--morph-space-5)" }}>
          <SheetClose>
            <button>Close</button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

/* ── Left ─────────────────────────────────────────────────────────────────── */

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <button>Open left sheet</button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle>Navigation</SheetTitle>
        <SheetDescription>
          A left-side sheet is commonly used for navigation menus and sidebars.
        </SheetDescription>
        <nav style={{ marginTop: "var(--morph-space-4)" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--morph-space-3)" }}>
            <li><a href="#" style={{ color: "var(--morph-color-on-surface)" }}>Dashboard</a></li>
            <li><a href="#" style={{ color: "var(--morph-color-on-surface)" }}>Projects</a></li>
            <li><a href="#" style={{ color: "var(--morph-color-on-surface)" }}>Settings</a></li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

/* ── Top ──────────────────────────────────────────────────────────────────── */

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <button>Open top sheet</button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetTitle>Notification panel</SheetTitle>
        <SheetDescription>
          A top sheet slides down from the top edge. Useful for notifications or
          banners.
        </SheetDescription>
      </SheetContent>
    </Sheet>
  ),
};

/* ── Bottom ───────────────────────────────────────────────────────────────── */

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <button>Open bottom sheet</button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetTitle>Actions</SheetTitle>
        <SheetDescription>
          A bottom sheet slides up. Commonly used for mobile action sheets or
          supplemental content.
        </SheetDescription>
        <div style={{ display: "flex", gap: "var(--morph-space-3)", marginTop: "var(--morph-space-4)" }}>
          <SheetClose>
            <button>Cancel</button>
          </SheetClose>
          <button>Confirm</button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

/* ── Without close button ─────────────────────────────────────────────────── */

export const NoCloseButton: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <button>Open (no close button)</button>
      </SheetTrigger>
      <SheetContent showClose={false}>
        <SheetTitle>Important panel</SheetTitle>
        <SheetDescription>
          This sheet does not show a close icon. Use the action buttons or press
          Escape to dismiss.
        </SheetDescription>
        <div style={{ display: "flex", gap: "var(--morph-space-3)", justifyContent: "flex-end", marginTop: "var(--morph-space-5)" }}>
          <SheetClose>
            <button>Dismiss</button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

/* ── Controlled ───────────────────────────────────────────────────────────── */

export const Controlled: Story = {
  render: function ControlledSheet() {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <p style={{ color: "var(--morph-color-on-surface-muted)", marginBottom: "var(--morph-space-3)" }}>
          State: {open ? "open" : "closed"}
        </p>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <button>Open controlled sheet</button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Controlled sheet</SheetTitle>
            <SheetDescription>
              This sheet is controlled via external state. The parent can
              programmatically open or close it.
            </SheetDescription>
            <div style={{ display: "flex", gap: "var(--morph-space-3)", justifyContent: "flex-end", marginTop: "var(--morph-space-5)" }}>
              <SheetClose>
                <button>Close</button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  },
};

/* ── Open (for visual testing) ────────────────────────────────────────────── */

export const Open: Story = {
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger>
        <button>Trigger (sheet already open)</button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Visible sheet</SheetTitle>
        <SheetDescription>
          This sheet renders open by default for visual testing.
        </SheetDescription>
        <div style={{ display: "flex", gap: "var(--morph-space-3)", justifyContent: "flex-end", marginTop: "var(--morph-space-5)" }}>
          <SheetClose>
            <button>Close</button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

/* ── All states matrix ────────────────────────────────────────────────────── */

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-4)", alignItems: "center" }}>
      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: "var(--morph-space-3)", textAlign: "center" }}>
          Side variants
        </p>
        <div style={{ display: "flex", gap: "var(--morph-space-4)", flexWrap: "wrap" }}>
          <Sheet>
            <SheetTrigger><button>Right (default)</button></SheetTrigger>
            <SheetContent side="right">
              <SheetTitle>Right sheet</SheetTitle>
              <SheetDescription>Slides in from the right.</SheetDescription>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--morph-space-4)" }}>
                <SheetClose><button>Close</button></SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger><button>Left</button></SheetTrigger>
            <SheetContent side="left">
              <SheetTitle>Left sheet</SheetTitle>
              <SheetDescription>Slides in from the left.</SheetDescription>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--morph-space-4)" }}>
                <SheetClose><button>Close</button></SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger><button>Top</button></SheetTrigger>
            <SheetContent side="top">
              <SheetTitle>Top sheet</SheetTitle>
              <SheetDescription>Slides in from the top.</SheetDescription>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--morph-space-4)" }}>
                <SheetClose><button>Close</button></SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger><button>Bottom</button></SheetTrigger>
            <SheetContent side="bottom">
              <SheetTitle>Bottom sheet</SheetTitle>
              <SheetDescription>Slides in from the bottom.</SheetDescription>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--morph-space-4)" }}>
                <SheetClose><button>Close</button></SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </section>

      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: "var(--morph-space-3)", textAlign: "center" }}>
          Close button variants
        </p>
        <div style={{ display: "flex", gap: "var(--morph-space-4)" }}>
          <Sheet>
            <SheetTrigger><button>With close button</button></SheetTrigger>
            <SheetContent showClose>
              <SheetTitle>With close</SheetTitle>
              <SheetDescription>Shows the X close button.</SheetDescription>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--morph-space-4)" }}>
                <SheetClose><button>Done</button></SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger><button>Without close button</button></SheetTrigger>
            <SheetContent showClose={false}>
              <SheetTitle>Without close</SheetTitle>
              <SheetDescription>No X button. Use Escape or action buttons.</SheetDescription>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--morph-space-4)" }}>
                <SheetClose><button>Done</button></SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </section>
    </div>
  ),
};
