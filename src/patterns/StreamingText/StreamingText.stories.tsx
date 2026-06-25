import type { Meta, StoryObj } from "@storybook/react";
import { StreamingText } from "./StreamingText";

const meta: Meta<typeof StreamingText> = {
  title: "Patterns/StreamingText",
  component: StreamingText,
  parameters: {
    layout: "padded",
  },
};
export default meta;
type Story = StoryObj<typeof StreamingText>;

const SAMPLE_PARTIAL =
  "The token system uses three tiers: global primitives, alias (semantic) tokens, and component-level tokens.";

const SAMPLE_COMPLETE =
  "The token system uses three tiers: global primitives, alias (semantic) tokens, and component-level tokens. Components always reference alias tokens only — never skip a tier. This ensures consistency and enables theme switching via a single data attribute on the root element.";

export const Idle: Story = {
  args: {
    content: "",
    status: "idle",
  },
};

export const Streaming: Story = {
  args: {
    content: SAMPLE_PARTIAL,
    status: "streaming",
  },
};

export const Complete: Story = {
  args: {
    content: SAMPLE_COMPLETE,
    status: "complete",
  },
};

export const StreamingWithJumpToEnd: Story = {
  args: {
    content: SAMPLE_PARTIAL,
    status: "streaming",
    showJumpToEnd: true,
  },
};

export const CompactStreaming: Story = {
  args: {
    content: SAMPLE_PARTIAL,
    status: "streaming",
    density: "compact",
  },
};

export const CompactComplete: Story = {
  args: {
    content: SAMPLE_COMPLETE,
    status: "complete",
    density: "compact",
  },
};

export const LongContent: Story = {
  args: {
    content: Array(8)
      .fill(SAMPLE_COMPLETE)
      .join("\n\n"),
    status: "streaming",
    showJumpToEnd: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxHeight: 200, overflow: "auto" }}>
        <Story />
      </div>
    ),
  ],
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24, maxWidth: 640 }}>
      <div>
        <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>Idle</p>
        <StreamingText content="" status="idle" />
      </div>
      <div>
        <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
          Streaming (with cursor)
        </p>
        <StreamingText content={SAMPLE_PARTIAL} status="streaming" />
      </div>
      <div>
        <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
          Complete (reveal animation)
        </p>
        <StreamingText content={SAMPLE_COMPLETE} status="complete" />
      </div>
      <div>
        <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
          Streaming with jump-to-end
        </p>
        <StreamingText
          content={SAMPLE_PARTIAL}
          status="streaming"
          showJumpToEnd
        />
      </div>
      <div>
        <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
          Compact density — streaming
        </p>
        <StreamingText
          content={SAMPLE_PARTIAL}
          status="streaming"
          density="compact"
        />
      </div>
      <div>
        <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
          Compact density — complete
        </p>
        <StreamingText
          content={SAMPLE_COMPLETE}
          status="complete"
          density="compact"
        />
      </div>
    </div>
  ),
};
