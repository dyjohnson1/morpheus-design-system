import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

/* ─── Meta ───────────────────────────────────────────────────────────────── */
const meta: Meta<typeof Switch> = {
  title: "Forms/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  args: { label: "Enable notifications" },
};
export default meta;
type Story = StoryObj<typeof Switch>;

/* ─── States ─────────────────────────────────────────────────────────────── */

export const Unchecked: Story = {
  args: { label: "Unchecked" },
};

export const Checked: Story = {
  args: { checked: true, label: "Checked" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled" },
};

export const DisabledChecked: Story = {
  name: "Disabled — checked",
  args: { disabled: true, checked: true, label: "Disabled checked" },
};

/* ─── Sizes ──────────────────────────────────────────────────────────────── */

export const Comfortable: Story = {
  name: "Size — comfortable (default)",
  args: { size: "comfortable", label: "Comfortable" },
};

export const Compact: Story = {
  name: "Size — compact",
  args: { size: "compact", label: "Compact" },
};

/* ─── Without label ──────────────────────────────────────────────────────── */

export const WithoutLabel: Story = {
  name: "Without visible label",
  args: { label: undefined, "aria-label": "Toggle dark mode" },
};

/* ─── Controlled toggle demo ─────────────────────────────────────────────── */

export const ControlledDemo: Story = {
  name: "Controlled — toggle demo",
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-3)" }}>
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          label="Dark mode"
        />
        <span style={{ fontFamily: "var(--morph-font-ui)", fontSize: "var(--morph-font-size-body-sm)", color: "var(--morph-color-on-surface-muted)" }}>
          State: {checked ? "on" : "off"}
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
        gridTemplateColumns: "repeat(2, auto)",
        gap: "var(--morph-space-4)",
        alignItems: "start",
      }}
    >
      {/* Unchecked states */}
      <Switch label="Unchecked" />
      <Switch label="Unchecked compact" size="compact" />

      {/* Checked states */}
      <Switch checked={true} label="Checked" />
      <Switch checked={true} label="Checked compact" size="compact" />

      {/* Disabled states */}
      <Switch disabled label="Disabled unchecked" />
      <Switch disabled checked={true} label="Disabled checked" />

      {/* Without label */}
      <Switch aria-label="Standalone switch" />
      <Switch aria-label="Standalone compact" size="compact" />
    </div>
  ),
};
