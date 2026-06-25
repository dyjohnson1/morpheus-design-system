import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Display/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["text", "circular", "rectangular", "rounded"],
    },
    animation: {
      control: { type: "boolean" },
    },
    width: { control: { type: "text" } },
    height: { control: { type: "text" } },
  },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

/* ── Variants ───────────────────────────────────────────────────────────── */

export const Text: Story = {
  args: { variant: "text", width: "200px", "aria-label": "Loading text" },
};

export const Circular: Story = {
  args: { variant: "circular", "aria-label": "Loading avatar" },
};

export const Rectangular: Story = {
  args: { variant: "rectangular", width: "240px", height: "120px", "aria-label": "Loading image" },
};

export const Rounded: Story = {
  args: { variant: "rounded", width: "240px", height: "120px", "aria-label": "Loading card" },
};

/* ── Animation states ───────────────────────────────────────────────────── */

export const Animated: Story = {
  args: { variant: "rectangular", width: "200px", height: "48px", animation: true, "aria-label": "Loading" },
};

export const Static: Story = {
  args: { variant: "rectangular", width: "200px", height: "48px", animation: false, "aria-label": "Loading" },
};

/* ── Custom sizing ──────────────────────────────────────────────────────── */

export const CustomSize: Story = {
  args: { variant: "rounded", width: "300px", height: "80px", "aria-label": "Loading content" },
};

export const NumericSize: Story = {
  args: { variant: "circular", width: 64, height: 64, "aria-label": "Loading profile" },
};

/* ── Composition examples ───────────────────────────────────────────────── */

/** Simulates a loading card with avatar + text lines. */
export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--morph-space-3)", alignItems: "flex-start", width: 300 }}>
      <Skeleton variant="circular" width={40} height={40} aria-label="Loading avatar" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--morph-space-2)" }}>
        <Skeleton variant="text" width="60%" aria-label="Loading name" />
        <Skeleton variant="text" width="100%" aria-label="Loading line 1" />
        <Skeleton variant="text" width="80%" aria-label="Loading line 2" />
      </div>
    </div>
  ),
};

/* ── All states matrix ──────────────────────────────────────────────────── */

/** Every documented variant and state at a glance. */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        alignItems: "flex-start",
        maxWidth: 400,
      }}
    >
      {/* Variants */}
      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: 8 }}>
          Variants
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
          <div>
            <span style={{ fontSize: 11, color: "var(--morph-color-on-surface-muted)" }}>text</span>
            <Skeleton variant="text" aria-label="Text skeleton" />
          </div>
          <div>
            <span style={{ fontSize: 11, color: "var(--morph-color-on-surface-muted)" }}>circular</span>
            <Skeleton variant="circular" aria-label="Circular skeleton" />
          </div>
          <div>
            <span style={{ fontSize: 11, color: "var(--morph-color-on-surface-muted)" }}>rectangular</span>
            <Skeleton variant="rectangular" height="60px" aria-label="Rectangular skeleton" />
          </div>
          <div>
            <span style={{ fontSize: 11, color: "var(--morph-color-on-surface-muted)" }}>rounded</span>
            <Skeleton variant="rounded" height="60px" aria-label="Rounded skeleton" />
          </div>
        </div>
      </section>

      {/* Animation */}
      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: 8 }}>
          Animation on / off
        </p>
        <div style={{ display: "flex", gap: 16, width: 300 }}>
          <Skeleton variant="rounded" height="48px" width="140px" animation={true} aria-label="Animated" />
          <Skeleton variant="rounded" height="48px" width="140px" animation={false} aria-label="Static" />
        </div>
      </section>

      {/* Composition */}
      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: 8 }}>
          Composition — card placeholder
        </p>
        <div style={{ display: "flex", gap: "var(--morph-space-3)", alignItems: "flex-start", width: 300 }}>
          <Skeleton variant="circular" width={40} height={40} aria-label="Loading avatar" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--morph-space-2)" }}>
            <Skeleton variant="text" width="60%" aria-label="Loading name" />
            <Skeleton variant="text" width="100%" aria-label="Loading line 1" />
            <Skeleton variant="text" width="80%" aria-label="Loading line 2" />
          </div>
        </div>
      </section>
    </div>
  ),
};
