import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipProvider } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Display/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={0}>
        <div style={{ padding: 80 }}>
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
  argTypes: {
    side: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
    delayDuration: { control: { type: "number" } },
    arrow: { control: { type: "boolean" } },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

/* ── Default (top) ──────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    side: "top",
    children: <button>Hover me</button>,
  },
};

/* ── Sides ──────────────────────────────────────────────────────────────── */

export const Top: Story = {
  args: {
    content: "Tooltip on top",
    side: "top",
    children: <button>Top</button>,
  },
};

export const Right: Story = {
  args: {
    content: "Tooltip on right",
    side: "right",
    children: <button>Right</button>,
  },
};

export const Bottom: Story = {
  args: {
    content: "Tooltip on bottom",
    side: "bottom",
    children: <button>Bottom</button>,
  },
};

export const Left: Story = {
  args: {
    content: "Tooltip on left",
    side: "left",
    children: <button>Left</button>,
  },
};

/* ── Without arrow ──────────────────────────────────────────────────────── */

export const NoArrow: Story = {
  args: {
    content: "No arrow",
    arrow: false,
    children: <button>No arrow</button>,
  },
};

/* ── Long content ───────────────────────────────────────────────────────── */

export const LongContent: Story = {
  args: {
    content:
      "This tooltip has longer content that wraps within the max-width constraint of the container.",
    children: <button>Long content</button>,
  },
};

/* ── Focus trigger (keyboard) ───────────────────────────────────────────── */

export const FocusTrigger: Story = {
  name: "Focus (keyboard accessible)",
  args: {
    content: "Shown on focus",
    children: <button>Tab to me</button>,
  },
};

/* ── Open (controlled) ──────────────────────────────────────────────────── */

export const Open: Story = {
  args: {
    content: "Always visible (controlled)",
    open: true,
    children: <button>Controlled open</button>,
  },
};

/* ── All states matrix ──────────────────────────────────────────────────── */

export const AllStates: Story = {
  render: () => (
    <TooltipProvider delayDuration={0}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 64,
          alignItems: "center",
          padding: 80,
        }}
      >
        {/* Sides */}
        <section>
          <p
            style={{
              color: "var(--morph-color-on-surface-muted)",
              fontSize: 12,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Placement sides
          </p>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <Tooltip content="Top" side="top" open>
              <button>Top</button>
            </Tooltip>
            <Tooltip content="Right" side="right" open>
              <button>Right</button>
            </Tooltip>
            <Tooltip content="Bottom" side="bottom" open>
              <button>Bottom</button>
            </Tooltip>
            <Tooltip content="Left" side="left" open>
              <button>Left</button>
            </Tooltip>
          </div>
        </section>

        {/* With and without arrow */}
        <section>
          <p
            style={{
              color: "var(--morph-color-on-surface-muted)",
              fontSize: 12,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Arrow variants
          </p>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <Tooltip content="With arrow" arrow open>
              <button>Arrow</button>
            </Tooltip>
            <Tooltip content="No arrow" arrow={false} open>
              <button>No arrow</button>
            </Tooltip>
          </div>
        </section>

        {/* Long content */}
        <section>
          <p
            style={{
              color: "var(--morph-color-on-surface-muted)",
              fontSize: 12,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Long content (wraps at max-width)
          </p>
          <Tooltip
            content="This is a longer tooltip that demonstrates how text wraps within the max-width constraint."
            open
          >
            <button>Long text</button>
          </Tooltip>
        </section>
      </div>
    </TooltipProvider>
  ),
};
