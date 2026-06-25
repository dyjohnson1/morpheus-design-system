import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button";

const meta: Meta<typeof EmptyState> = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

/* ─── Default icon for stories ───────────────────────────────────────────── */
const InboxIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const SearchIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const FileIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

/* ─── Stories ────────────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    icon: InboxIcon,
    heading: "Nothing here yet",
    description: "When you receive messages, they will appear in this space.",
  },
};

export const WithAction: Story = {
  name: "With action",
  args: {
    icon: InboxIcon,
    heading: "Your inbox is empty",
    description: "Start a conversation to see messages here.",
    actions: <Button variant="primary">Start a conversation</Button>,
  },
};

export const WithMultipleActions: Story = {
  name: "With multiple actions",
  args: {
    icon: FileIcon,
    heading: "No documents yet",
    description: "Create a new document or import an existing one to get started.",
    actions: (
      <>
        <Button variant="primary">Create document</Button>
        <Button variant="secondary">Import</Button>
      </>
    ),
  },
};

export const NoResults: Story = {
  name: "No search results",
  args: {
    icon: SearchIcon,
    heading: "No results found",
    description: "Try adjusting your search terms or clearing filters.",
    actions: <Button variant="secondary">Clear search</Button>,
  },
};

export const WithoutIcon: Story = {
  name: "Without icon",
  args: {
    heading: "No items to display",
    description: "Check back later for updates.",
  },
};

export const WithoutDescription: Story = {
  name: "Without description",
  args: {
    icon: InboxIcon,
    heading: "All caught up",
  },
};

export const Compact: Story = {
  args: {
    icon: InboxIcon,
    heading: "Nothing here yet",
    description: "When you receive messages, they will appear in this space.",
    size: "compact",
  },
};

export const CompactWithAction: Story = {
  name: "Compact with action",
  args: {
    icon: FileIcon,
    heading: "No files uploaded",
    description: "Drag and drop files here, or click the button below.",
    actions: <Button variant="secondary">Upload file</Button>,
    size: "compact",
  },
};

/* ─── All states matrix ─────────────────────────────────────────────────── */

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--morph-space-8)",
        maxWidth: 560,
      }}
    >
      <EmptyState
        icon={InboxIcon}
        heading="Nothing here yet"
        description="When you receive messages, they will appear in this space."
      />
      <EmptyState
        icon={SearchIcon}
        heading="No results found"
        description="Try adjusting your search terms or clearing filters."
        actions={<Button variant="secondary">Clear search</Button>}
      />
      <EmptyState
        icon={FileIcon}
        heading="No documents yet"
        description="Create a new document or import an existing one to get started."
        actions={
          <>
            <Button variant="primary">Create document</Button>
            <Button variant="secondary">Import</Button>
          </>
        }
      />
      <EmptyState
        heading="No items to display"
        description="Check back later for updates."
      />
      <EmptyState
        icon={InboxIcon}
        heading="Nothing here yet"
        description="Smaller variant for dense layouts."
        size="compact"
      />
    </div>
  ),
};
