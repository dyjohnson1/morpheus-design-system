import type { Meta, StoryObj } from "@storybook/react";
import { InlineMessage } from "./InlineMessage";

const meta: Meta<typeof InlineMessage> = {
  title: "Feedback/InlineMessage",
  component: InlineMessage,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof InlineMessage>;

/* ─── Variants ──────────────────────────────────────────────────────────── */

export const Info: Story = {
  args: {
    variant: "info",
    children: "Your session will expire in 10 minutes.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Changes saved successfully.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "This action cannot be undone once confirmed.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Unable to save changes. Check your connection and try again.",
  },
};

/* ─── Dismissible ───────────────────────────────────────────────────────── */

export const Dismissible: Story = {
  args: {
    variant: "info",
    dismissible: true,
    onDismiss: () => {},
    children: "You can dismiss this message when you are ready.",
  },
};

export const DismissibleWarning: Story = {
  name: "Dismissible (warning)",
  args: {
    variant: "warning",
    dismissible: true,
    onDismiss: () => {},
    children: "Your subscription is expiring soon.",
  },
};

/* ─── Long content ──────────────────────────────────────────────────────── */

export const LongContent: Story = {
  name: "Long content",
  args: {
    variant: "info",
    dismissible: true,
    onDismiss: () => {},
    children:
      "This is a longer message that demonstrates how the InlineMessage component handles multi-line content. The text wraps naturally while the icon stays aligned to the top and the dismiss button remains accessible.",
  },
};

/* ─── All states matrix ─────────────────────────────────────────────────── */

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--morph-space-4)",
        maxWidth: 560,
      }}
    >
      <InlineMessage variant="info">
        Your session will expire in 10 minutes.
      </InlineMessage>
      <InlineMessage variant="success">
        Changes saved successfully.
      </InlineMessage>
      <InlineMessage variant="warning">
        This action cannot be undone once confirmed.
      </InlineMessage>
      <InlineMessage variant="error">
        Unable to save changes. Check your connection and try again.
      </InlineMessage>
      <InlineMessage variant="info" dismissible onDismiss={() => {}}>
        Dismissible info message.
      </InlineMessage>
      <InlineMessage variant="error" dismissible onDismiss={() => {}}>
        Dismissible error message.
      </InlineMessage>
    </div>
  ),
};
