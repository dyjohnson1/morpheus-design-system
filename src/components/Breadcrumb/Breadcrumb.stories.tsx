import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";

/* ─── Placeholder icons (24px grid, 1.75px stroke) ─────────────────────────── */
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const meta: Meta<typeof Breadcrumb> = {
  title: "Nav/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ padding: "var(--morph-space-5)", background: "var(--morph-color-ground)", minHeight: 120 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#products">Products</BreadcrumbItem>
      <BreadcrumbItem href="#category">Category</BreadcrumbItem>
      <BreadcrumbItem current>Current page</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const TwoLevels: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem current>Dashboard</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#home" icon={<HomeIcon />}>Home</BreadcrumbItem>
      <BreadcrumbItem href="#docs" icon={<FolderIcon />}>Documents</BreadcrumbItem>
      <BreadcrumbItem href="#project" icon={<FolderIcon />}>Project</BreadcrumbItem>
      <BreadcrumbItem current icon={<FolderIcon />}>Design specs</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <Breadcrumb maxItems={4} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#products">Products</BreadcrumbItem>
      <BreadcrumbItem href="#electronics">Electronics</BreadcrumbItem>
      <BreadcrumbItem href="#phones">Phones</BreadcrumbItem>
      <BreadcrumbItem href="#smartphones">Smartphones</BreadcrumbItem>
      <BreadcrumbItem current>iPhone 15 Pro</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb separator="/">
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#docs">Documents</BreadcrumbItem>
      <BreadcrumbItem href="#project">Project</BreadcrumbItem>
      <BreadcrumbItem current>File</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const Compact: Story = {
  render: () => (
    <Breadcrumb density="compact">
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#settings">Settings</BreadcrumbItem>
      <BreadcrumbItem href="#account">Account</BreadcrumbItem>
      <BreadcrumbItem current>Security</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const LongLabels: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#category">A very long category name that should truncate</BreadcrumbItem>
      <BreadcrumbItem href="#sub">Another lengthy subcategory label</BreadcrumbItem>
      <BreadcrumbItem current>The current page with a really long title</BreadcrumbItem>
    </Breadcrumb>
  ),
};

/** All documented states at a glance. */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-5)" }}>
      {/* Default comfortable */}
      <div>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: "var(--morph-font-size-caption, 12px)", marginBottom: "var(--morph-space-2)" }}>
          Comfortable density
        </p>
        <Breadcrumb>
          <BreadcrumbItem href="#home">Home</BreadcrumbItem>
          <BreadcrumbItem href="#section">Section</BreadcrumbItem>
          <BreadcrumbItem current>Current</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Compact */}
      <div>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: "var(--morph-font-size-caption, 12px)", marginBottom: "var(--morph-space-2)" }}>
          Compact density
        </p>
        <Breadcrumb density="compact">
          <BreadcrumbItem href="#home">Home</BreadcrumbItem>
          <BreadcrumbItem href="#section">Section</BreadcrumbItem>
          <BreadcrumbItem current>Current</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* With icons */}
      <div>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: "var(--morph-font-size-caption, 12px)", marginBottom: "var(--morph-space-2)" }}>
          With icons
        </p>
        <Breadcrumb>
          <BreadcrumbItem href="#home" icon={<HomeIcon />}>Home</BreadcrumbItem>
          <BreadcrumbItem href="#docs" icon={<FolderIcon />}>Documents</BreadcrumbItem>
          <BreadcrumbItem current icon={<FolderIcon />}>Current</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Collapsed */}
      <div>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: "var(--morph-font-size-caption, 12px)", marginBottom: "var(--morph-space-2)" }}>
          Collapsed (maxItems=3)
        </p>
        <Breadcrumb maxItems={3}>
          <BreadcrumbItem href="#1">Level 1</BreadcrumbItem>
          <BreadcrumbItem href="#2">Level 2</BreadcrumbItem>
          <BreadcrumbItem href="#3">Level 3</BreadcrumbItem>
          <BreadcrumbItem href="#4">Level 4</BreadcrumbItem>
          <BreadcrumbItem current>Level 5</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Custom separator */}
      <div>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: "var(--morph-font-size-caption, 12px)", marginBottom: "var(--morph-space-2)" }}>
          Custom separator (/)
        </p>
        <Breadcrumb separator="/">
          <BreadcrumbItem href="#home">Home</BreadcrumbItem>
          <BreadcrumbItem href="#section">Section</BreadcrumbItem>
          <BreadcrumbItem current>Current</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  ),
};
