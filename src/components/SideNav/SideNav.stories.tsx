import type { Meta, StoryObj } from "@storybook/react";
import { SideNav, SideNavItem, SideNavGroup } from "./SideNav";

/* ─── Placeholder icons (24px grid, 1.75px stroke) ─────────────────────────── */
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const InboxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const meta: Meta<typeof SideNav> = {
  title: "Nav/SideNav",
  component: SideNav,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: 480, background: "var(--morph-color-ground)" }}>
        <Story />
        <div style={{ flex: 1, padding: "var(--morph-space-5)", color: "var(--morph-color-on-surface)" }}>
          <p>Page content area</p>
        </div>
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof SideNav>;

export const Default: Story = {
  render: () => (
    <SideNav aria-label="Main navigation">
      <SideNavItem icon={<HomeIcon />} label="Home" active />
      <SideNavItem icon={<InboxIcon />} label="Inbox" />
      <SideNavItem icon={<FileIcon />} label="Documents" />
      <SideNavItem icon={<ChartIcon />} label="Analytics" />
      <SideNavItem icon={<SettingsIcon />} label="Settings" />
    </SideNav>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <SideNav aria-label="App navigation">
      <SideNavGroup heading="Overview">
        <SideNavItem icon={<HomeIcon />} label="Home" active />
        <SideNavItem icon={<ChartIcon />} label="Analytics" />
      </SideNavGroup>
      <SideNavGroup heading="Workspace">
        <SideNavItem icon={<InboxIcon />} label="Inbox" />
        <SideNavItem icon={<FileIcon />} label="Documents" />
        <SideNavItem icon={<UsersIcon />} label="Team" />
      </SideNavGroup>
      <SideNavGroup heading="Settings">
        <SideNavItem icon={<SettingsIcon />} label="Preferences" />
      </SideNavGroup>
    </SideNav>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <SideNav aria-label="Main navigation" collapsed>
      <SideNavItem icon={<HomeIcon />} label="Home" active collapsed />
      <SideNavItem icon={<InboxIcon />} label="Inbox" collapsed />
      <SideNavItem icon={<FileIcon />} label="Documents" collapsed />
      <SideNavItem icon={<ChartIcon />} label="Analytics" collapsed />
      <SideNavItem icon={<SettingsIcon />} label="Settings" collapsed />
    </SideNav>
  ),
};

export const Compact: Story = {
  render: () => (
    <SideNav aria-label="Main navigation" density="compact">
      <SideNavItem icon={<HomeIcon />} label="Home" active />
      <SideNavItem icon={<InboxIcon />} label="Inbox" />
      <SideNavItem icon={<FileIcon />} label="Documents" />
      <SideNavItem icon={<ChartIcon />} label="Analytics" />
      <SideNavItem icon={<SettingsIcon />} label="Settings" />
    </SideNav>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <SideNav aria-label="Main navigation">
      <SideNavItem icon={<HomeIcon />} label="Home" active />
      <SideNavItem icon={<InboxIcon />} label="Inbox" />
      <SideNavItem icon={<FileIcon />} label="Documents" disabled />
      <SideNavItem icon={<ChartIcon />} label="Analytics" />
    </SideNav>
  ),
};

export const WithLinks: Story = {
  render: () => (
    <SideNav aria-label="Main navigation">
      <SideNavItem icon={<HomeIcon />} label="Home" href="#home" active />
      <SideNavItem icon={<InboxIcon />} label="Inbox" href="#inbox" />
      <SideNavItem icon={<FileIcon />} label="Documents" href="#docs" />
      <SideNavItem icon={<SettingsIcon />} label="Settings" href="#settings" />
    </SideNav>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <SideNav
      aria-label="Main navigation"
      header={
        <span style={{ fontWeight: 600, color: "var(--morph-color-on-surface)", fontSize: "var(--morph-font-size-subtitle, 18px)" }}>
          Morpheus
        </span>
      }
      footer={
        <SideNavItem icon={<SettingsIcon />} label="Settings" />
      }
    >
      <SideNavItem icon={<HomeIcon />} label="Home" active />
      <SideNavItem icon={<InboxIcon />} label="Inbox" />
      <SideNavItem icon={<FileIcon />} label="Documents" />
      <SideNavItem icon={<ChartIcon />} label="Analytics" />
    </SideNav>
  ),
};

/** All documented states at a glance. */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, height: 400 }}>
      {/* Expanded comfortable */}
      <SideNav aria-label="Comfortable expanded">
        <SideNavItem icon={<HomeIcon />} label="Rest state" />
        <SideNavItem icon={<InboxIcon />} label="Active state" active />
        <SideNavItem icon={<FileIcon />} label="Disabled state" disabled />
      </SideNav>

      {/* Collapsed */}
      <SideNav aria-label="Collapsed" collapsed>
        <SideNavItem icon={<HomeIcon />} label="Home" collapsed />
        <SideNavItem icon={<InboxIcon />} label="Active" active collapsed />
        <SideNavItem icon={<FileIcon />} label="Disabled" disabled collapsed />
      </SideNav>

      {/* Compact */}
      <SideNav aria-label="Compact" density="compact">
        <SideNavItem icon={<HomeIcon />} label="Rest" />
        <SideNavItem icon={<InboxIcon />} label="Active" active />
        <SideNavItem icon={<FileIcon />} label="Disabled" disabled />
      </SideNav>
    </div>
  ),
};
