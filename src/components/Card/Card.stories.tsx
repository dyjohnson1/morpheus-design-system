import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Display/Card",
  component: Card,
  parameters: { layout: "centered" },
  args: {
    elevation: 1,
    variant: "raised",
    children: "Card body content goes here.",
    style: { minWidth: 280 },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const WithHeader: Story = {
  args: { header: "Card title" },
};

export const WithFooter: Story = {
  args: { footer: "Last updated 2 minutes ago" },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: "Card title",
    footer: "Last updated 2 minutes ago",
  },
};

export const Flat: Story = {
  args: { variant: "flat", elevation: 0, header: "Flat card" },
};

export const Overlay: Story = {
  args: { variant: "overlay", elevation: 3, header: "Overlay card" },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    header: "Clickable card",
    children: "Keyboard focusable and hover-responsive.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    header: "Disabled card",
    children: "This card is not interactive.",
  },
};

/** All states at a glance. */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(2, 1fr)", padding: 24 }}>
      <Card variant="flat" elevation={0} header="Flat / elev-0">
        Flush with ground surface.
      </Card>
      <Card variant="raised" elevation={1} header="Raised / elev-1">
        Default card elevation.
      </Card>
      <Card variant="raised" elevation={2} header="Raised / elev-2">
        Slightly deeper shadow.
      </Card>
      <Card variant="overlay" elevation={3} header="Overlay / elev-3">
        Overlay-level surface.
      </Card>
      <Card
        variant="raised"
        elevation={1}
        interactive
        header="Interactive"
      >
        Keyboard focusable, hover lift.
      </Card>
      <Card
        variant="raised"
        elevation={1}
        disabled
        header="Disabled"
      >
        Pointer events off, reduced opacity.
      </Card>
      <Card
        variant="raised"
        elevation={1}
        header="Header + footer"
        footer="Footer area"
      >
        Full card anatomy.
      </Card>
    </div>
  ),
};
