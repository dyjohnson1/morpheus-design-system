import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioItem } from "./Radio";

/* ─── Meta ───────────────────────────────────────────────────────────────── */
const meta: Meta<typeof RadioGroup> = {
  title: "Forms/Radio",
  component: RadioGroup,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

/* ─── States ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <RadioGroup aria-label="Favorite color">
      <RadioItem value="red" label="Red" />
      <RadioItem value="blue" label="Blue" />
      <RadioItem value="green" label="Green" />
    </RadioGroup>
  ),
};

export const WithDefaultValue: Story = {
  name: "With default value",
  render: () => (
    <RadioGroup aria-label="Plan" defaultValue="pro">
      <RadioItem value="free" label="Free" />
      <RadioItem value="pro" label="Pro" />
      <RadioItem value="enterprise" label="Enterprise" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup aria-label="Options" disabled defaultValue="a">
      <RadioItem value="a" label="Option A" />
      <RadioItem value="b" label="Option B" />
      <RadioItem value="c" label="Option C" />
    </RadioGroup>
  ),
};

export const DisabledItem: Story = {
  name: "Disabled — single item",
  render: () => (
    <RadioGroup aria-label="Options" defaultValue="a">
      <RadioItem value="a" label="Option A" />
      <RadioItem value="b" label="Option B (disabled)" disabled />
      <RadioItem value="c" label="Option C" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup aria-label="Alignment" orientation="horizontal">
      <RadioItem value="left" label="Left" />
      <RadioItem value="center" label="Center" />
      <RadioItem value="right" label="Right" />
    </RadioGroup>
  ),
};

/* ─── Sizes ──────────────────────────────────────────────────────────────── */

export const Comfortable: Story = {
  name: "Size — comfortable (default)",
  render: () => (
    <RadioGroup aria-label="Options" size="comfortable" defaultValue="a">
      <RadioItem value="a" label="Comfortable A" />
      <RadioItem value="b" label="Comfortable B" />
    </RadioGroup>
  ),
};

export const Compact: Story = {
  name: "Size — compact",
  render: () => (
    <RadioGroup aria-label="Options" size="compact" defaultValue="a">
      <RadioItem value="a" label="Compact A" />
      <RadioItem value="b" label="Compact B" />
    </RadioGroup>
  ),
};

/* ─── Controlled demo ────────────────────────────────────────────────────── */

export const ControlledDemo: Story = {
  name: "Controlled — demo",
  render: () => {
    const [value, setValue] = React.useState("banana");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-3)" }}>
        <RadioGroup aria-label="Fruit" value={value} onValueChange={setValue}>
          <RadioItem value="apple" label="Apple" />
          <RadioItem value="banana" label="Banana" />
          <RadioItem value="cherry" label="Cherry" />
        </RadioGroup>
        <span
          style={{
            fontFamily: "var(--morph-font-ui)",
            fontSize: "var(--morph-font-size-body-sm)",
            color: "var(--morph-color-on-surface-muted)",
          }}
        >
          Selected: {value}
        </span>
      </div>
    );
  },
};

/* ─── AllStates matrix ───────────────────────────────────────────────────── */

/** Every documented state at a glance. */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "var(--morph-space-6)",
        alignItems: "start",
      }}
    >
      {/* Unselected */}
      <div>
        <p style={{ fontFamily: "var(--morph-font-ui)", fontSize: "var(--morph-font-size-label)", color: "var(--morph-color-on-surface-muted)", marginBottom: "var(--morph-space-2)" }}>
          Unselected
        </p>
        <RadioGroup aria-label="Unselected">
          <RadioItem value="a" label="Option A" />
          <RadioItem value="b" label="Option B" />
        </RadioGroup>
      </div>

      {/* Selected */}
      <div>
        <p style={{ fontFamily: "var(--morph-font-ui)", fontSize: "var(--morph-font-size-label)", color: "var(--morph-color-on-surface-muted)", marginBottom: "var(--morph-space-2)" }}>
          Selected
        </p>
        <RadioGroup aria-label="Selected" defaultValue="a">
          <RadioItem value="a" label="Option A" />
          <RadioItem value="b" label="Option B" />
        </RadioGroup>
      </div>

      {/* Disabled */}
      <div>
        <p style={{ fontFamily: "var(--morph-font-ui)", fontSize: "var(--morph-font-size-label)", color: "var(--morph-color-on-surface-muted)", marginBottom: "var(--morph-space-2)" }}>
          Disabled
        </p>
        <RadioGroup aria-label="Disabled" disabled defaultValue="a">
          <RadioItem value="a" label="Option A" />
          <RadioItem value="b" label="Option B" />
        </RadioGroup>
      </div>

      {/* Compact */}
      <div>
        <p style={{ fontFamily: "var(--morph-font-ui)", fontSize: "var(--morph-font-size-label)", color: "var(--morph-color-on-surface-muted)", marginBottom: "var(--morph-space-2)" }}>
          Compact
        </p>
        <RadioGroup aria-label="Compact" size="compact" defaultValue="b">
          <RadioItem value="a" label="Option A" />
          <RadioItem value="b" label="Option B" />
        </RadioGroup>
      </div>

      {/* Horizontal */}
      <div>
        <p style={{ fontFamily: "var(--morph-font-ui)", fontSize: "var(--morph-font-size-label)", color: "var(--morph-color-on-surface-muted)", marginBottom: "var(--morph-space-2)" }}>
          Horizontal
        </p>
        <RadioGroup aria-label="Horizontal" orientation="horizontal" defaultValue="a">
          <RadioItem value="a" label="Left" />
          <RadioItem value="b" label="Center" />
          <RadioItem value="c" label="Right" />
        </RadioGroup>
      </div>

      {/* Single disabled item */}
      <div>
        <p style={{ fontFamily: "var(--morph-font-ui)", fontSize: "var(--morph-font-size-label)", color: "var(--morph-color-on-surface-muted)", marginBottom: "var(--morph-space-2)" }}>
          Single disabled item
        </p>
        <RadioGroup aria-label="Partial disabled">
          <RadioItem value="a" label="Available" />
          <RadioItem value="b" label="Unavailable" disabled />
          <RadioItem value="c" label="Available" />
        </RadioGroup>
      </div>
    </div>
  ),
};
