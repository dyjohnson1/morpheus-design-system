import type { Meta, StoryObj } from "@storybook/react";
import { HumanInLoopCard } from "./HumanInLoopCard";

const meta: Meta<typeof HumanInLoopCard> = {
  title: "Patterns/HumanInLoopCard",
  component: HumanInLoopCard,
};
export default meta;
type Story = StoryObj<typeof HumanInLoopCard>;

export const Pending: Story = {
  args: {
    action: "Delete 3 inactive user accounts",
    rationale:
      "These accounts have been inactive for over 90 days and match the cleanup policy criteria.",
    status: "pending",
  },
};

export const Approved: Story = {
  args: {
    action: "Deploy updated pricing model to production",
    rationale:
      "The staging environment tests passed with 100% coverage and no regressions detected.",
    status: "approved",
  },
};

export const Modified: Story = {
  args: {
    action: "Send notification to all 2,400 users",
    rationale:
      "A critical security patch requires all users to update their credentials within 48 hours.",
    status: "modified",
  },
};

export const Rejected: Story = {
  args: {
    action: "Drop legacy database table",
    rationale:
      "The table appears unused based on query logs from the past 30 days.",
    status: "rejected",
  },
};

export const Compact: Story = {
  args: {
    action: "Archive completed project files",
    rationale:
      "Project marked complete 14 days ago; archiving frees active storage.",
    status: "pending",
    density: "compact",
  },
};

export const CompactApproved: Story = {
  args: {
    action: "Archive completed project files",
    rationale:
      "Project marked complete 14 days ago; archiving frees active storage.",
    status: "approved",
    density: "compact",
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24, maxWidth: 520 }}>
      <HumanInLoopCard
        action="Delete 3 inactive user accounts"
        rationale="These accounts have been inactive for over 90 days and match the cleanup policy criteria."
        status="pending"
      />
      <HumanInLoopCard
        action="Deploy updated pricing model to production"
        rationale="The staging environment tests passed with 100% coverage and no regressions detected."
        status="approved"
      />
      <HumanInLoopCard
        action="Send notification to all 2,400 users"
        rationale="A critical security patch requires all users to update their credentials within 48 hours."
        status="modified"
      />
      <HumanInLoopCard
        action="Drop legacy database table"
        rationale="The table appears unused based on query logs from the past 30 days."
        status="rejected"
      />
      <HumanInLoopCard
        action="Archive completed project files"
        rationale="Project marked complete 14 days ago; archiving frees active storage."
        status="pending"
        density="compact"
      />
    </div>
  ),
};
