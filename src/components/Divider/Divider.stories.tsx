import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Display/Divider",
  component: Divider,
  parameters: { layout: "padded" },
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    variant: { control: "radio", options: ["subtle", "default", "strong"] },
    spacing: { control: "radio", options: ["none", "sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

/* ─── Orientation ────────────────────────────────────────────────────────── */

export const Horizontal: Story = {
  args: { orientation: "horizontal", variant: "default", spacing: "md" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Above content
      </p>
      <Divider {...args} />
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Below content
      </p>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical", variant: "default", spacing: "md" },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", height: 48, gap: 0 }}>
      <span style={{ color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Left
      </span>
      <Divider {...args} />
      <span style={{ color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Right
      </span>
    </div>
  ),
};

/* ─── Variants ───────────────────────────────────────────────────────────── */

export const Subtle: Story = {
  args: { variant: "subtle", spacing: "md" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Above
      </p>
      <Divider {...args} />
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Below
      </p>
    </div>
  ),
};

export const Default: Story = {
  args: { variant: "default", spacing: "md" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Above
      </p>
      <Divider {...args} />
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Below
      </p>
    </div>
  ),
};

export const Strong: Story = {
  args: { variant: "strong", spacing: "md" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Above
      </p>
      <Divider {...args} />
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Below
      </p>
    </div>
  ),
};

/* ─── Spacing variants ───────────────────────────────────────────────────── */

export const SpacingNone: Story = {
  name: "Spacing — none",
  args: { spacing: "none" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        No margin
      </p>
      <Divider {...args} />
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        No margin
      </p>
    </div>
  ),
};

export const SpacingSm: Story = {
  name: "Spacing — sm",
  args: { spacing: "sm" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Small spacing
      </p>
      <Divider {...args} />
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Small spacing
      </p>
    </div>
  ),
};

export const SpacingLg: Story = {
  name: "Spacing — lg",
  args: { spacing: "lg" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Large spacing
      </p>
      <Divider {...args} />
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Large spacing
      </p>
    </div>
  ),
};

/* ─── Labeled divider ────────────────────────────────────────────────────── */

export const Labeled: Story = {
  args: { label: "OR", spacing: "md" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Sign in with email
      </p>
      <Divider {...args} />
      <p style={{ margin: 0, color: "var(--morph-color-on-surface)", fontFamily: "var(--morph-font-ui)" }}>
        Continue with SSO
      </p>
    </div>
  ),
};

export const LabeledSubtle: Story = {
  name: "Labeled — subtle",
  args: { label: "SECTION", variant: "subtle", spacing: "md" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Divider {...args} />
    </div>
  ),
};

export const LabeledStrong: Story = {
  name: "Labeled — strong",
  args: { label: "CONTINUED", variant: "strong", spacing: "md" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Divider {...args} />
    </div>
  ),
};

/* ─── All states matrix ──────────────────────────────────────────────────── */

/** Every documented state at a glance. */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--morph-space-6)",
        width: 400,
        fontFamily: "var(--morph-font-ui)",
        color: "var(--morph-color-on-surface-muted)",
        fontSize: 12,
      }}
    >
      {/* Horizontal variants */}
      <div>
        <p style={{ margin: "0 0 var(--morph-space-2)" }}>Horizontal — subtle</p>
        <Divider orientation="horizontal" variant="subtle" spacing="none" />
      </div>
      <div>
        <p style={{ margin: "0 0 var(--morph-space-2)" }}>Horizontal — default</p>
        <Divider orientation="horizontal" variant="default" spacing="none" />
      </div>
      <div>
        <p style={{ margin: "0 0 var(--morph-space-2)" }}>Horizontal — strong</p>
        <Divider orientation="horizontal" variant="strong" spacing="none" />
      </div>

      {/* Spacing variants */}
      <div>
        <p style={{ margin: 0 }}>Spacing: none</p>
        <Divider spacing="none" />
        <p style={{ margin: 0 }}>Spacing: sm</p>
        <Divider spacing="sm" />
        <p style={{ margin: 0 }}>Spacing: md</p>
        <Divider spacing="md" />
        <p style={{ margin: 0 }}>Spacing: lg</p>
        <Divider spacing="lg" />
        <p style={{ margin: 0 }}>End</p>
      </div>

      {/* Vertical variants */}
      <div>
        <p style={{ margin: "0 0 var(--morph-space-2)" }}>Vertical variants</p>
        <div style={{ display: "flex", alignItems: "center", height: 48 }}>
          <span>Left</span>
          <Divider orientation="vertical" variant="subtle" spacing="md" />
          <span>Centre</span>
          <Divider orientation="vertical" variant="default" spacing="md" />
          <span>Centre</span>
          <Divider orientation="vertical" variant="strong" spacing="md" />
          <span>Right</span>
        </div>
      </div>

      {/* Labeled dividers */}
      <div>
        <p style={{ margin: "0 0 var(--morph-space-2)" }}>Labeled — OR</p>
        <Divider label="OR" spacing="none" />
      </div>
      <div>
        <p style={{ margin: "0 0 var(--morph-space-2)" }}>Labeled — subtle</p>
        <Divider label="SECTION" variant="subtle" spacing="none" />
      </div>
      <div>
        <p style={{ margin: "0 0 var(--morph-space-2)" }}>Labeled — strong</p>
        <Divider label="CONTINUED" variant="strong" spacing="none" />
      </div>
    </div>
  ),
};
