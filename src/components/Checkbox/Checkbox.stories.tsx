import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

/* ─── Meta ───────────────────────────────────────────────────────────────── */
const meta: Meta<typeof Checkbox> = {
  title: "Forms/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  args: { label: "Accept terms" },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

/* ─── States ─────────────────────────────────────────────────────────────── */

export const Unchecked: Story = {
  args: { label: "Unchecked" },
};

export const Checked: Story = {
  args: { checked: true, label: "Checked" },
};

export const Indeterminate: Story = {
  args: { checked: "indeterminate", label: "Indeterminate" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled" },
};

export const DisabledChecked: Story = {
  name: "Disabled — checked",
  args: { disabled: true, checked: true, label: "Disabled checked" },
};

export const DisabledIndeterminate: Story = {
  name: "Disabled — indeterminate",
  args: { disabled: true, checked: "indeterminate", label: "Disabled indeterminate" },
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
  args: { label: undefined, "aria-label": "Toggle option" },
};

/* ─── Controlled toggle demo ─────────────────────────────────────────────── */

export const ControlledDemo: Story = {
  name: "Controlled — toggle demo",
  render: () => {
    const [checked, setChecked] = React.useState<boolean | "indeterminate">(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-3)" }}>
        <Checkbox
          checked={checked}
          onCheckedChange={setChecked}
          label="Subscribe to newsletter"
        />
        <span style={{ fontFamily: "var(--morph-font-ui)", fontSize: "var(--morph-font-size-body-sm)", color: "var(--morph-color-on-surface-muted)" }}>
          State: {String(checked)}
        </span>
      </div>
    );
  },
};

/* ─── Indeterminate parent demo ──────────────────────────────────────────── */

export const IndeterminateDemo: Story = {
  name: "Indeterminate — parent/child demo",
  render: () => {
    const [items, setItems] = React.useState([true, false, true]);
    const allChecked = items.every(Boolean);
    const noneChecked = items.every((v) => !v);
    const parentChecked = allChecked ? true : noneChecked ? false : "indeterminate" as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-3)" }}>
        <Checkbox
          checked={parentChecked}
          onCheckedChange={(checked) => {
            setItems(items.map(() => checked === true));
          }}
          label="Select all"
        />
        <div style={{ paddingLeft: "var(--morph-space-5)", display: "flex", flexDirection: "column", gap: "var(--morph-space-2)" }}>
          {["Emails", "Notifications", "Updates"].map((name, i) => (
            <Checkbox
              key={name}
              checked={items[i]}
              onCheckedChange={(checked) => {
                const next = [...items];
                next[i] = checked === true;
                setItems(next);
              }}
              label={name}
            />
          ))}
        </div>
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
      <Checkbox label="Unchecked" />
      <Checkbox label="Unchecked compact" size="compact" />

      {/* Checked states */}
      <Checkbox checked={true} label="Checked" />
      <Checkbox checked={true} label="Checked compact" size="compact" />

      {/* Indeterminate states */}
      <Checkbox checked="indeterminate" label="Indeterminate" />
      <Checkbox checked="indeterminate" label="Indeterminate compact" size="compact" />

      {/* Disabled states */}
      <Checkbox disabled label="Disabled unchecked" />
      <Checkbox disabled checked={true} label="Disabled checked" />
      <Checkbox disabled checked="indeterminate" label="Disabled indeterminate" />

      {/* Without label */}
      <Checkbox aria-label="Standalone checkbox" />
    </div>
  ),
};
