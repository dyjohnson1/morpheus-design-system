import type { Meta, StoryObj } from "@storybook/react";
import { ReasoningTrace } from "./ReasoningTrace";

const meta: Meta<typeof ReasoningTrace> = {
  title: "Patterns/ReasoningTrace",
  component: ReasoningTrace,
};
export default meta;
type Story = StoryObj<typeof ReasoningTrace>;

const sampleSteps = [
  "Analyzing the user's request for relevant context",
  "Searching knowledge base for related documentation",
  "Synthesizing findings into a coherent response",
  "Verifying accuracy against source material",
];

export const Collapsed: Story = {
  args: {
    steps: sampleSteps,
    status: "complete",
  },
};

export const Expanded: Story = {
  args: {
    steps: sampleSteps,
    status: "complete",
    defaultExpanded: true,
  },
};

export const Thinking: Story = {
  args: {
    steps: ["Analyzing the user's request…", "Searching knowledge base…"],
    status: "thinking",
    defaultExpanded: true,
  },
};

export const ThinkingCollapsed: Story = {
  args: {
    steps: ["Analyzing the user's request…"],
    status: "thinking",
  },
};

export const Complete: Story = {
  args: {
    steps: sampleSteps,
    status: "complete",
    defaultExpanded: true,
  },
};

export const CustomLabel: Story = {
  args: {
    steps: sampleSteps,
    status: "complete",
    label: "Chain of thought",
    defaultExpanded: true,
  },
};

export const Compact: Story = {
  args: {
    steps: sampleSteps,
    status: "complete",
    density: "compact",
    defaultExpanded: true,
  },
};

export const SingleStep: Story = {
  args: {
    steps: ["The user asked about deployment strategies for microservices."],
    status: "complete",
    defaultExpanded: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      <ReasoningTrace steps={sampleSteps} status="complete" label="Collapsed (default)" />
      <ReasoningTrace steps={sampleSteps} status="complete" label="Expanded" defaultExpanded />
      <ReasoningTrace
        steps={["Analyzing…", "Searching…"]}
        status="thinking"
        label="Thinking (collapsed)"
      />
      <ReasoningTrace
        steps={["Analyzing…", "Searching…"]}
        status="thinking"
        label="Thinking (expanded)"
        defaultExpanded
      />
      <ReasoningTrace steps={sampleSteps} status="complete" label="Compact" density="compact" defaultExpanded />
    </div>
  ),
};
