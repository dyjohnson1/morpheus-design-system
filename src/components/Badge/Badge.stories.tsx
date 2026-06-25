import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Display/Badge",
  component: Badge,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Badge>;

/* ─── Label variants ────────────────────────────────────────────────────── */

export const Neutral: Story = {
  args: { children: "Label" },
};

export const Accent: Story = {
  args: { variant: "accent", children: "Beta" },
};

export const Success: Story = {
  args: { variant: "success", children: "✓ Active" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "⚠ Pending" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "✕ Error" },
};

export const Info: Story = {
  args: { variant: "info", children: "ℹ Info" },
};

/* ─── Count mode ────────────────────────────────────────────────────────── */

export const Count: Story = {
  args: { count: 7, "aria-label": "7 notifications" },
};

export const CountMax: Story = {
  name: "Count (truncated)",
  args: { count: 120, max: 99, "aria-label": "99+ notifications" },
};

export const CountZero: Story = {
  name: "Count (zero)",
  args: { count: 0, "aria-label": "0 notifications" },
};

/* ─── Dot mode ──────────────────────────────────────────────────────────── */

export const Dot: Story = {
  args: { dot: true, "aria-label": "Unread messages" },
};

export const DotDanger: Story = {
  name: "Dot (danger)",
  args: { dot: true, variant: "danger", "aria-label": "Connection error" },
};

export const DotSuccess: Story = {
  name: "Dot (success)",
  args: { dot: true, variant: "success", "aria-label": "Online" },
};

/* ─── Overlay / wrapper mode ────────────────────────────────────────────── */

/** Count badge overlaid on a placeholder avatar. */
export const OverlayCount: Story = {
  name: "Overlay — count on avatar",
  render: () => (
    <Badge count={3} aria-label="3 notifications">
      <span
        style={{
          display: "inline-flex",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "var(--morph-color-surface-raised)",
          border: "1px solid var(--morph-color-border-subtle)",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--morph-color-on-surface-muted)",
          fontFamily: "var(--morph-font-ui)",
          fontSize: 14,
          fontWeight: 500,
        }}
        aria-hidden="true"
      >
        JD
      </span>
    </Badge>
  ),
};

/** Dot badge overlaid as an unread/status indicator. */
export const OverlayDot: Story = {
  name: "Overlay — dot on icon",
  render: () => (
    <Badge dot variant="danger" aria-label="Unread notification">
      <span
        style={{
          display: "inline-flex",
          width: 40,
          height: 40,
          borderRadius: "var(--morph-radius-2)",
          background: "var(--morph-color-surface-raised)",
          border: "1px solid var(--morph-color-border-subtle)",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--morph-color-on-surface-muted)",
        }}
        aria-hidden="true"
      >
        {/* Placeholder bell icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          width={20}
          height={20}
          aria-hidden="true"
          focusable="false"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </span>
    </Badge>
  ),
};

/* ─── All states matrix ─────────────────────────────────────────────────── */

/** Every documented state at a glance. */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "var(--morph-space-3)",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Label variants */}
      <Badge>Neutral</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">✓ Success</Badge>
      <Badge variant="warning">⚠ Warning</Badge>
      <Badge variant="danger">✕ Danger</Badge>
      <Badge variant="info">ℹ Info</Badge>

      {/* Count mode */}
      <Badge count={3} aria-label="3 notifications" />
      <Badge count={42} aria-label="42 notifications" />
      <Badge count={120} max={99} aria-label="99+ notifications" />
      <Badge count={0} aria-label="0 notifications" />

      {/* Dot mode */}
      <Badge dot aria-label="Unread" />
      <Badge dot variant="success" aria-label="Online" />
      <Badge dot variant="danger" aria-label="Error" />
      <Badge dot variant="warning" aria-label="Warning" />

      {/* Overlay: count on placeholder */}
      <Badge count={5} aria-label="5 notifications">
        <span
          style={{
            display: "inline-flex",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "var(--morph-color-surface-raised)",
            border: "1px solid var(--morph-color-border-subtle)",
          }}
        />
      </Badge>

      {/* Overlay: dot on placeholder */}
      <Badge dot variant="danger" aria-label="Error">
        <span
          style={{
            display: "inline-flex",
            width: 40,
            height: 40,
            borderRadius: "var(--morph-radius-2)",
            background: "var(--morph-color-surface-raised)",
            border: "1px solid var(--morph-color-border-subtle)",
          }}
        />
      </Badge>
    </div>
  ),
};
