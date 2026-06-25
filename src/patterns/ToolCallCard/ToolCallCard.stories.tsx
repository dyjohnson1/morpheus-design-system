import type { Meta, StoryObj } from "@storybook/react";
import { ToolCallCard } from "./ToolCallCard";

const meta: Meta<typeof ToolCallCard> = {
  title: "Patterns/ToolCallCard",
  component: ToolCallCard,
};
export default meta;
type Story = StoryObj<typeof ToolCallCard>;

const sampleDetail = (
  <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
    {JSON.stringify(
      { query: "SELECT * FROM users WHERE active = true", limit: 100 },
      null,
      2
    )}
  </pre>
);

const toolIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

export const Pending: Story = {
  args: {
    name: "database_query",
    description: "Fetching active user records from the database",
    status: "pending",
    icon: toolIcon,
    detail: sampleDetail,
  },
};

export const Running: Story = {
  args: {
    name: "database_query",
    description: "Fetching active user records from the database",
    status: "running",
    icon: toolIcon,
    detail: sampleDetail,
  },
};

export const Success: Story = {
  args: {
    name: "database_query",
    description: "Fetching active user records from the database",
    status: "success",
    duration: "1.2s",
    icon: toolIcon,
    detail: sampleDetail,
    defaultExpanded: true,
  },
};

export const Error: Story = {
  args: {
    name: "database_query",
    description: "Connection timeout — unable to reach the database",
    status: "error",
    duration: "5.0s",
    icon: toolIcon,
    detail: (
      <pre style={{ margin: 0, whiteSpace: "pre-wrap", color: "var(--morph-status-danger-text)" }}>
        Error: ETIMEDOUT — connection refused at 10.0.0.1:5432
      </pre>
    ),
  },
};

export const WithSourceUrl: Story = {
  args: {
    name: "web_search",
    description: "Searching for latest TypeScript documentation",
    status: "success",
    duration: "0.8s",
    sourceUrl: "https://www.typescriptlang.org/docs",
    sourceLabel: "TypeScript Docs",
  },
};

export const NoDescription: Story = {
  args: {
    name: "calculator",
    status: "success",
    duration: "0.1s",
  },
};

export const DetailCollapsed: Story = {
  args: {
    name: "file_read",
    description: "Reading configuration file",
    status: "success",
    duration: "0.3s",
    detail: sampleDetail,
    defaultExpanded: false,
  },
};

export const DetailExpanded: Story = {
  args: {
    name: "file_read",
    description: "Reading configuration file",
    status: "success",
    duration: "0.3s",
    detail: sampleDetail,
    defaultExpanded: true,
  },
};

export const Compact: Story = {
  args: {
    name: "database_query",
    description: "Fetching records",
    status: "success",
    duration: "1.2s",
    density: "compact",
    icon: toolIcon,
    detail: sampleDetail,
    defaultExpanded: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24, maxWidth: 480 }}>
      <ToolCallCard
        name="database_query"
        description="Waiting in queue"
        status="pending"
        icon={toolIcon}
      />
      <ToolCallCard
        name="database_query"
        description="Fetching active users"
        status="running"
        icon={toolIcon}
      />
      <ToolCallCard
        name="database_query"
        description="Successfully fetched 42 records"
        status="success"
        duration="1.2s"
        icon={toolIcon}
        detail={sampleDetail}
        defaultExpanded
      />
      <ToolCallCard
        name="database_query"
        description="Connection timeout"
        status="error"
        duration="5.0s"
        icon={toolIcon}
      />
      <ToolCallCard
        name="web_search"
        description="With source link"
        status="success"
        duration="0.8s"
        sourceUrl="https://example.com"
        sourceLabel="Example.com"
      />
      <ToolCallCard
        name="calculator"
        description="Compact density"
        status="success"
        duration="0.1s"
        density="compact"
        icon={toolIcon}
        detail={sampleDetail}
        defaultExpanded
      />
    </div>
  ),
};
