import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Forms/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

/* ─── Rest ──────────────────────────────────────────────────────────────── */
export const Rest: Story = {
  args: { placeholder: "Enter text…", "aria-label": "Message" },
};

/* ─── With value ────────────────────────────────────────────────────────── */
export const WithValue: Story = {
  args: {
    defaultValue: "Hello, Morpheus. This is a multi-line text area.",
    "aria-label": "Message",
  },
};

/* ─── Focused (use autoFocus for demo) ──────────────────────────────────── */
export const Focused: Story = {
  args: {
    placeholder: "Focused textarea",
    autoFocus: true,
    "aria-label": "Message",
  },
};

/* ─── Error ─────────────────────────────────────────────────────────────── */
export const Error: Story = {
  args: {
    error: true,
    defaultValue: "Invalid entry",
    "aria-label": "Message",
  },
};

/* ─── Disabled ──────────────────────────────────────────────────────────── */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Cannot edit this content",
    "aria-label": "Message",
  },
};

/* ─── Resize none ───────────────────────────────────────────────────────── */
export const ResizeNone: Story = {
  args: {
    resize: "none",
    placeholder: "Cannot resize",
    "aria-label": "Message",
  },
};

/* ─── Resize both ───────────────────────────────────────────────────────── */
export const ResizeBoth: Story = {
  args: {
    resize: "both",
    placeholder: "Resize in both directions",
    "aria-label": "Message",
  },
};

/* ─── Compact size ──────────────────────────────────────────────────────── */
export const Compact: Story = {
  args: {
    size: "compact",
    placeholder: "Compact textarea",
    "aria-label": "Message",
  },
};

/* ─── Compact error ─────────────────────────────────────────────────────── */
export const CompactError: Story = {
  args: {
    size: "compact",
    error: true,
    defaultValue: "Compact error state",
    "aria-label": "Message",
  },
};

/* ─── All states matrix ─────────────────────────────────────────────────── */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--morph-space-3)",
        width: 360,
      }}
    >
      <Textarea placeholder="Rest" aria-label="Rest" />
      <Textarea
        defaultValue="With value — multi-line content goes here."
        aria-label="With value"
      />
      <Textarea placeholder="Focused" autoFocus aria-label="Focused" />
      <Textarea error defaultValue="Error state" aria-label="Error" />
      <Textarea disabled defaultValue="Disabled" aria-label="Disabled" />
      <Textarea
        resize="none"
        placeholder="Resize none"
        aria-label="No resize"
      />
      <Textarea
        resize="both"
        placeholder="Resize both"
        aria-label="Both resize"
      />
      <Textarea size="compact" placeholder="Compact" aria-label="Compact" />
      <Textarea
        size="compact"
        error
        defaultValue="Compact + error"
        aria-label="Compact error"
      />
      <Textarea
        size="compact"
        disabled
        defaultValue="Compact + disabled"
        aria-label="Compact disabled"
      />
    </div>
  ),
};
