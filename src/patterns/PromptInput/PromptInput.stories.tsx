import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PromptInput } from "./PromptInput";

const meta: Meta<typeof PromptInput> = {
  title: "Patterns/PromptInput",
  component: PromptInput,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof PromptInput>;

/* ─── Rest ──────────────────────────────────────────────────────────────── */
export const Rest: Story = {
  args: { placeholder: "Ask anything\u2026" },
};

/* ─── With value ────────────────────────────────────────────────────────── */
export const WithValue: Story = {
  args: { defaultValue: "Explain how token tiers work in Morpheus" },
};

/* ─── Focused ───────────────────────────────────────────────────────────── */
export const Focused: Story = {
  render: () => <PromptInput defaultValue="" />,
  play: async ({ canvasElement }) => {
    const textarea = canvasElement.querySelector("textarea");
    textarea?.focus();
  },
};

/* ─── Disabled ──────────────────────────────────────────────────────────── */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Cannot edit" },
};

/* ─── Loading ───────────────────────────────────────────────────────────── */
export const Loading: Story = {
  args: { loading: true, defaultValue: "Generating response\u2026" },
};

/* ─── Compact ───────────────────────────────────────────────────────────── */
export const Compact: Story = {
  args: { density: "compact", placeholder: "Quick question\u2026" },
};

/* ─── With leading slot ─────────────────────────────────────────────────── */
export const WithLeadingSlot: Story = {
  args: {
    leadingSlot: (
      <button
        type="button"
        style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0 }}
        aria-label="Attach file"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
      </button>
    ),
    placeholder: "Attach or type\u2026",
  },
};

/* ─── With trailing slot ────────────────────────────────────────────────── */
export const WithTrailingSlot: Story = {
  args: {
    trailingSlot: (
      <button
        type="button"
        style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0 }}
        aria-label="Voice input"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      </button>
    ),
    placeholder: "Type or speak\u2026",
  },
};

/* ─── Controlled ────────────────────────────────────────────────────────── */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("Controlled input");
    return (
      <div style={{ width: 480 }}>
        <PromptInput
          value={value}
          onChange={setValue}
          onSubmit={(v) => {
            alert(`Submitted: ${v}`);
            setValue("");
          }}
        />
        <p style={{ fontSize: 12, marginTop: 8, color: "var(--morph-color-on-surface-muted)" }}>
          Current value: "{value}"
        </p>
      </div>
    );
  },
};

/* ─── All states matrix ─────────────────────────────────────────────────── */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-4)", width: 480 }}>
      <PromptInput placeholder="Rest — empty" />
      <PromptInput defaultValue="With content to submit" />
      <PromptInput disabled defaultValue="Disabled state" />
      <PromptInput loading defaultValue="Loading state" />
      <PromptInput density="compact" placeholder="Compact density" />
      <PromptInput density="compact" disabled defaultValue="Compact disabled" />
      <PromptInput density="compact" loading defaultValue="Compact loading" />
    </div>
  ),
};
