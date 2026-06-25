import type { Meta, StoryObj } from "@storybook/react";
import { ConfidenceIndicator } from "./ConfidenceIndicator";

const meta: Meta<typeof ConfidenceIndicator> = {
  title: "Patterns/ConfidenceIndicator",
  component: ConfidenceIndicator,
};
export default meta;
type Story = StoryObj<typeof ConfidenceIndicator>;

export const High: Story = { args: { level: "high" } };
export const Medium: Story = { args: { level: "medium" } };
export const Low: Story = { args: { level: "low" } };
export const Uncertain: Story = { args: { level: "uncertain" } };

export const NumericHigh: Story = { args: { level: 0.92 } };
export const NumericMedium: Story = { args: { level: 0.6 } };
export const NumericLow: Story = { args: { level: 0.3 } };
export const NumericUncertain: Story = { args: { level: 0.1 } };

export const WithIcon: Story = { args: { level: "medium", showIcon: true } };
export const CustomLabel: Story = {
  args: { level: "high", label: "Likely accurate" },
};

export const Compact: Story = {
  args: { level: "medium", density: "compact", showIcon: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <ConfidenceIndicator level="high" />
      <ConfidenceIndicator level="medium" />
      <ConfidenceIndicator level="low" />
      <ConfidenceIndicator level="uncertain" />
      <ConfidenceIndicator level="high" showIcon />
      <ConfidenceIndicator level="medium" showIcon />
      <ConfidenceIndicator level="low" showIcon />
      <ConfidenceIndicator level="uncertain" showIcon />
      <ConfidenceIndicator level={0.85} label="Very likely" showIcon />
      <ConfidenceIndicator level="medium" density="compact" showIcon />
    </div>
  ),
};
