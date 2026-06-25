import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Nav/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: { type: "select" }, options: ["underline", "contained"] },
    density: { control: { type: "select" }, options: ["comfortable", "compact"] },
    orientation: { control: { type: "select" }, options: ["horizontal", "vertical"] },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

/* ── Default (underline) ────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="overview" {...args}>
      <TabsList aria-label="Project tabs">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Project overview content goes here.</TabsContent>
      <TabsContent value="activity">Recent activity and history.</TabsContent>
      <TabsContent value="settings">Project settings and configuration.</TabsContent>
    </Tabs>
  ),
};

/* ── Contained ──────────────────────────────────────────────────────────── */

export const Contained: Story = {
  render: () => (
    <Tabs defaultValue="code" variant="contained">
      <TabsList aria-label="Editor tabs">
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="console">Console</TabsTrigger>
      </TabsList>
      <TabsContent value="code">Code editor panel.</TabsContent>
      <TabsContent value="preview">Live preview panel.</TabsContent>
      <TabsContent value="console">Console output panel.</TabsContent>
    </Tabs>
  ),
};

/* ── Compact density ────────────────────────────────────────────────────── */

export const Compact: Story = {
  render: () => (
    <Tabs defaultValue="all" density="compact">
      <TabsList aria-label="Filter tabs">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="all">All items.</TabsContent>
      <TabsContent value="active">Active items only.</TabsContent>
      <TabsContent value="archived">Archived items.</TabsContent>
    </Tabs>
  ),
};

/* ── Disabled tab ───────────────────────────────────────────────────────── */

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="general">
      <TabsList aria-label="Settings tabs">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="advanced" disabled>Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="general">General settings.</TabsContent>
      <TabsContent value="billing">Billing details.</TabsContent>
      <TabsContent value="advanced">Advanced configuration.</TabsContent>
    </Tabs>
  ),
};

/* ── Vertical ───────────────────────────────────────────────────────────── */

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="profile" orientation="vertical">
      <TabsList aria-label="Account tabs">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">Profile settings content.</TabsContent>
      <TabsContent value="security">Security settings content.</TabsContent>
      <TabsContent value="notifications">Notification preferences.</TabsContent>
    </Tabs>
  ),
};

/* ── All states matrix ──────────────────────────────────────────────────── */

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: 12 }}>
          Underline variant (default)
        </p>
        <Tabs defaultValue="a" variant="underline">
          <TabsList aria-label="Underline tabs">
            <TabsTrigger value="a">Active</TabsTrigger>
            <TabsTrigger value="b">Inactive</TabsTrigger>
            <TabsTrigger value="c" disabled>Disabled</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Active panel content.</TabsContent>
          <TabsContent value="b">Inactive panel content.</TabsContent>
          <TabsContent value="c">Disabled panel content.</TabsContent>
        </Tabs>
      </section>

      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: 12 }}>
          Contained variant
        </p>
        <Tabs defaultValue="a" variant="contained">
          <TabsList aria-label="Contained tabs">
            <TabsTrigger value="a">Active</TabsTrigger>
            <TabsTrigger value="b">Inactive</TabsTrigger>
            <TabsTrigger value="c" disabled>Disabled</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Active panel content.</TabsContent>
          <TabsContent value="b">Inactive panel content.</TabsContent>
          <TabsContent value="c">Disabled panel content.</TabsContent>
        </Tabs>
      </section>

      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: 12 }}>
          Compact density
        </p>
        <Tabs defaultValue="a" density="compact">
          <TabsList aria-label="Compact tabs">
            <TabsTrigger value="a">Active</TabsTrigger>
            <TabsTrigger value="b">Inactive</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Compact active.</TabsContent>
          <TabsContent value="b">Compact inactive.</TabsContent>
        </Tabs>
      </section>

      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: 12 }}>
          Vertical orientation
        </p>
        <Tabs defaultValue="a" orientation="vertical">
          <TabsList aria-label="Vertical tabs">
            <TabsTrigger value="a">First</TabsTrigger>
            <TabsTrigger value="b">Second</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Vertical first panel.</TabsContent>
          <TabsContent value="b">Vertical second panel.</TabsContent>
        </Tabs>
      </section>
    </div>
  ),
};
