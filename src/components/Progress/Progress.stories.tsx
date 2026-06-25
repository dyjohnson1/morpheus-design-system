import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Feedback/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    max: { control: { type: "number" } },
    shape: { control: { type: "select" }, options: ["linear", "circular"] },
    size: { control: { type: "select" }, options: ["comfortable", "compact"] },
  },
};
export default meta;
type Story = StoryObj<typeof Progress>;

/* ─── Linear — determinate ──────────────────────────────────────────────── */

export const LinearDeterminate: Story = {
  name: "Linear — determinate (50%)",
  args: {
    shape: "linear",
    value: 50,
    label: "Uploading file",
    showLabel: true,
  },
};

export const LinearDeterminateZero: Story = {
  name: "Linear — determinate (0%)",
  args: {
    shape: "linear",
    value: 0,
    label: "Starting upload",
  },
};

export const LinearDeterminate100: Story = {
  name: "Linear — determinate (100%)",
  args: {
    shape: "linear",
    value: 100,
    label: "Upload complete",
    showLabel: true,
  },
};

/* ─── Linear — indeterminate ────────────────────────────────────────────── */

export const LinearIndeterminate: Story = {
  name: "Linear — indeterminate",
  args: {
    shape: "linear",
    label: "Loading content",
    showLabel: true,
  },
};

/* ─── Circular — determinate ────────────────────────────────────────────── */

export const CircularDeterminate: Story = {
  name: "Circular — determinate (75%)",
  args: {
    shape: "circular",
    value: 75,
    label: "Processing",
    showLabel: true,
  },
};

export const CircularDeterminateZero: Story = {
  name: "Circular — determinate (0%)",
  args: {
    shape: "circular",
    value: 0,
    label: "Queued",
  },
};

export const CircularDeterminate100: Story = {
  name: "Circular — determinate (100%)",
  args: {
    shape: "circular",
    value: 100,
    label: "Complete",
    showLabel: true,
  },
};

/* ─── Circular — indeterminate ──────────────────────────────────────────── */

export const CircularIndeterminate: Story = {
  name: "Circular — indeterminate",
  args: {
    shape: "circular",
    label: "Thinking",
    showLabel: true,
  },
};

/* ─── Compact size ──────────────────────────────────────────────────────── */

export const LinearCompact: Story = {
  name: "Linear — compact",
  args: {
    shape: "linear",
    size: "compact",
    value: 60,
    label: "Compact progress",
    showLabel: true,
  },
};

export const CircularCompact: Story = {
  name: "Circular — compact",
  args: {
    shape: "circular",
    size: "compact",
    value: 60,
    label: "Compact spinner",
    showLabel: true,
  },
};

export const CircularCompactIndeterminate: Story = {
  name: "Circular — compact indeterminate",
  args: {
    shape: "circular",
    size: "compact",
    label: "Loading",
  },
};

/* ─── All states matrix ─────────────────────────────────────────────────── */

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--morph-space-5)",
        width: 320,
      }}
    >
      {/* Linear determinate at various values */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-3)" }}>
        <span style={{ color: "var(--morph-color-on-surface-muted)", fontSize: "var(--morph-font-size-caption)" }}>
          Linear — determinate
        </span>
        <Progress shape="linear" value={0} label="0%" showLabel />
        <Progress shape="linear" value={25} label="25%" showLabel />
        <Progress shape="linear" value={50} label="50%" showLabel />
        <Progress shape="linear" value={75} label="75%" showLabel />
        <Progress shape="linear" value={100} label="100%" showLabel />
      </div>

      {/* Linear indeterminate */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-3)" }}>
        <span style={{ color: "var(--morph-color-on-surface-muted)", fontSize: "var(--morph-font-size-caption)" }}>
          Linear — indeterminate
        </span>
        <Progress shape="linear" label="Loading" showLabel />
        <Progress shape="linear" size="compact" label="Loading compact" showLabel />
      </div>

      {/* Circular variants */}
      <div style={{ display: "flex", gap: "var(--morph-space-4)", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--morph-space-2)" }}>
          <span style={{ color: "var(--morph-color-on-surface-muted)", fontSize: "var(--morph-font-size-caption)" }}>
            0%
          </span>
          <Progress shape="circular" value={0} label="0%" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--morph-space-2)" }}>
          <span style={{ color: "var(--morph-color-on-surface-muted)", fontSize: "var(--morph-font-size-caption)" }}>
            50%
          </span>
          <Progress shape="circular" value={50} label="50%" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--morph-space-2)" }}>
          <span style={{ color: "var(--morph-color-on-surface-muted)", fontSize: "var(--morph-font-size-caption)" }}>
            100%
          </span>
          <Progress shape="circular" value={100} label="100%" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--morph-space-2)" }}>
          <span style={{ color: "var(--morph-color-on-surface-muted)", fontSize: "var(--morph-font-size-caption)" }}>
            Spinner
          </span>
          <Progress shape="circular" label="Loading" />
        </div>
      </div>

      {/* Compact circular */}
      <div style={{ display: "flex", gap: "var(--morph-space-4)", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--morph-space-2)" }}>
          <span style={{ color: "var(--morph-color-on-surface-muted)", fontSize: "var(--morph-font-size-caption)" }}>
            Compact 50%
          </span>
          <Progress shape="circular" size="compact" value={50} label="50%" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--morph-space-2)" }}>
          <span style={{ color: "var(--morph-color-on-surface-muted)", fontSize: "var(--morph-font-size-caption)" }}>
            Compact spinner
          </span>
          <Progress shape="circular" size="compact" label="Loading" />
        </div>
      </div>
    </div>
  ),
};
