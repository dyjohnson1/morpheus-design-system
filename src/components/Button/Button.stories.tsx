import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Actions/Button",
  component: Button,
  args: { children: "Generate" },
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Cancel" } };
export const Destructive: Story = { args: { variant: "destructive", children: "Delete project" } };
export const Loading: Story = { args: { variant: "primary", loading: true } };
export const Disabled: Story = { args: { variant: "primary", disabled: true } };

/** All states at a glance (the documented matrix). */
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridAutoFlow: "column" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="primary" loading>Primary</Button>
      <Button variant="primary" disabled>Primary</Button>
    </div>
  ),
};
