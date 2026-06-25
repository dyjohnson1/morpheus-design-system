import type { Meta, StoryObj } from "@storybook/react";
import { MessageTurn } from "./MessageTurn";

const meta: Meta<typeof MessageTurn> = {
  title: "Patterns/MessageTurn",
  component: MessageTurn,
  parameters: {
    layout: "padded",
  },
};
export default meta;
type Story = StoryObj<typeof MessageTurn>;

export const UserMessage: Story = {
  args: {
    role: "user",
    timestamp: "2:34 PM",
    children: "Can you explain how the token system works?",
  },
};

export const AssistantMessage: Story = {
  args: {
    role: "assistant",
    timestamp: "2:34 PM",
    children:
      "The token system uses three tiers: global primitives, alias (semantic) tokens, and component-level tokens. Components always reference alias tokens only.",
  },
};

export const Streaming: Story = {
  args: {
    role: "assistant",
    status: "streaming",
    children: "The design system follows a token-first approach where...",
  },
};

export const ErrorState: Story = {
  args: {
    role: "assistant",
    status: "error",
    children: "Something went wrong while generating a response.",
  },
};

export const WithAvatar: Story = {
  args: {
    role: "assistant",
    avatar: (
      <span
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "var(--morph-color-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--morph-color-on-accent)",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        M
      </span>
    ),
    timestamp: "2:35 PM",
    children: "Here is a response with an avatar displayed.",
  },
};

export const WithActions: Story = {
  args: {
    role: "assistant",
    timestamp: "2:35 PM",
    actions: (
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" style={{ fontSize: 12, opacity: 0.7 }}>
          Copy
        </button>
        <button type="button" style={{ fontSize: 12, opacity: 0.7 }}>
          Regenerate
        </button>
      </div>
    ),
    children: "This message has action buttons in the footer.",
  },
};

export const CompactDensity: Story = {
  args: {
    role: "assistant",
    density: "compact",
    timestamp: "2:36 PM",
    children: "Compact density for data-dense views like agent logs.",
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 640 }}>
      <MessageTurn role="user" timestamp="2:30 PM">
        User message — aligned to the end, raised surface.
      </MessageTurn>
      <MessageTurn role="assistant" timestamp="2:30 PM">
        Assistant message — aligned to the start, default surface.
      </MessageTurn>
      <MessageTurn role="assistant" status="streaming">
        Streaming content appears here as it generates...
      </MessageTurn>
      <MessageTurn role="assistant" status="error">
        An error occurred while generating the response.
      </MessageTurn>
      <MessageTurn role="user" density="compact" timestamp="2:31 PM">
        Compact density user message.
      </MessageTurn>
      <MessageTurn role="assistant" density="compact" timestamp="2:31 PM">
        Compact density assistant message.
      </MessageTurn>
    </div>
  ),
};
