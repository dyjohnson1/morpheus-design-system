import type { Meta, StoryObj } from "@storybook/react";
import { AgentStatus } from "./AgentStatus";

const meta: Meta<typeof AgentStatus> = {
  title: "Patterns/AgentStatus",
  component: AgentStatus,
};
export default meta;
type Story = StoryObj<typeof AgentStatus>;

export const Idle: Story = { args: { state: "idle" } };
export const Thinking: Story = { args: { state: "thinking" } };
export const Acting: Story = { args: { state: "acting" } };
export const WaitingOnYou: Story = { args: { state: "waiting-on-you" } };
export const Done: Story = { args: { state: "done" } };
export const Error: Story = { args: { state: "error" } };

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      {(["idle","thinking","acting","waiting-on-you","done","error"] as const).map(s => (
        <AgentStatus key={s} state={s} />
      ))}
    </div>
  ),
};
