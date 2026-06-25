import type { Meta, StoryObj } from "@storybook/react";
import { GenerationState } from "./GenerationState";

const meta: Meta<typeof GenerationState> = {
  title: "Patterns/GenerationState",
  component: GenerationState,
};
export default meta;
type Story = StoryObj<typeof GenerationState>;

export const Idle: Story = { args: { state: "idle" } };

export const Generating: Story = { args: { state: "generating" } };

export const GeneratingWithProgress: Story = {
  args: { state: "generating", progress: 45 },
};

export const GeneratingWithCancel: Story = {
  args: { state: "generating", onCancel: () => {} },
};

export const GeneratingCustomLabel: Story = {
  args: { state: "generating", label: "Writing code..." },
};

export const Complete: Story = { args: { state: "complete" } };

export const Error: Story = { args: { state: "error" } };

export const Cancelled: Story = { args: { state: "cancelled" } };

export const CompactDensity: Story = {
  args: { state: "generating", density: "compact", progress: 60 },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <GenerationState state="idle" />
      <GenerationState state="generating" />
      <GenerationState state="generating" progress={33} />
      <GenerationState state="generating" onCancel={() => {}} />
      <GenerationState
        state="generating"
        progress={72}
        onCancel={() => {}}
        label="Writing code..."
      />
      <GenerationState state="complete" />
      <GenerationState state="error" />
      <GenerationState state="cancelled" />
      <GenerationState state="generating" density="compact" progress={50} />
      <GenerationState state="complete" density="compact" />
    </div>
  ),
};
