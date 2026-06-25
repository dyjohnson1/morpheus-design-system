import type { Meta, StoryObj } from "@storybook/react";
import { AppBar } from "./AppBar";

/** Placeholder icons for stories. */
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const AvatarPlaceholder = () => (
  <div
    style={{
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: "var(--morph-color-surface-raised)",
      border: "1px solid var(--morph-color-border-subtle)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12,
      fontWeight: 500,
      color: "var(--morph-color-on-surface-muted)",
    }}
  >
    M
  </div>
);

const IconBtn = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button
    aria-label={label}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      borderRadius: "var(--morph-radius-2)",
      border: "none",
      background: "transparent",
      color: "var(--morph-color-on-surface)",
      cursor: "pointer",
    }}
  >
    <span style={{ width: 20, height: 20, display: "inline-flex" }}>{icon}</span>
  </button>
);

const meta: Meta<typeof AppBar> = {
  title: "Nav/AppBar",
  component: AppBar,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
  args: {
    title: "Morpheus",
    trailing: (
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <IconBtn icon={<SearchIcon />} label="Search" />
        <IconBtn icon={<BellIcon />} label="Notifications" />
        <AvatarPlaceholder />
      </div>
    ),
  },
};

export const WithLeading: Story = {
  args: {
    leading: <IconBtn icon={<MenuIcon />} label="Open menu" />,
    title: "Dashboard",
    trailing: <AvatarPlaceholder />,
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    leading: <IconBtn icon={<MenuIcon />} label="Open menu" />,
    title: "Morpheus",
    trailing: <AvatarPlaceholder />,
  },
};

export const Compact: Story = {
  args: {
    density: "compact",
    leading: <IconBtn icon={<MenuIcon />} label="Open menu" />,
    title: "Compact view",
    trailing: (
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <IconBtn icon={<SearchIcon />} label="Search" />
        <AvatarPlaceholder />
      </div>
    ),
  },
};

export const Fixed: Story = {
  args: {
    position: "fixed",
    title: "Fixed position",
    trailing: <AvatarPlaceholder />,
  },
  decorators: [
    (Story) => (
      <div style={{ paddingTop: 56 }}>
        <Story />
        <div style={{ padding: "var(--morph-space-5)" }}>
          <p style={{ color: "var(--morph-color-on-surface)" }}>
            Content scrolls behind the fixed AppBar.
          </p>
        </div>
      </div>
    ),
  ],
};

export const WithCustomContent: Story = {
  args: {
    leading: <IconBtn icon={<MenuIcon />} label="Open menu" />,
    trailing: <AvatarPlaceholder />,
    children: (
      <nav aria-label="Main navigation" style={{ display: "flex", gap: "var(--morph-space-4)" }}>
        <a href="#" style={{ color: "var(--morph-color-on-surface)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
          Projects
        </a>
        <a href="#" style={{ color: "var(--morph-color-on-surface-muted)", textDecoration: "none", fontSize: 14 }}>
          Templates
        </a>
        <a href="#" style={{ color: "var(--morph-color-on-surface-muted)", textDecoration: "none", fontSize: 14 }}>
          Settings
        </a>
      </nav>
    ),
  },
};

/** All documented states at a glance. */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <AppBar
        variant="surface"
        position="static"
        title="Surface variant"
        trailing={<AvatarPlaceholder />}
      />
      <AppBar
        variant="transparent"
        position="static"
        title="Transparent variant"
        trailing={<AvatarPlaceholder />}
      />
      <AppBar
        variant="surface"
        position="static"
        density="compact"
        title="Compact density"
        trailing={<AvatarPlaceholder />}
      />
      <AppBar
        variant="surface"
        position="static"
        leading={<IconBtn icon={<MenuIcon />} label="Open menu" />}
        title="With leading"
        trailing={
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <IconBtn icon={<SearchIcon />} label="Search" />
            <IconBtn icon={<BellIcon />} label="Notifications" />
            <AvatarPlaceholder />
          </div>
        }
      />
    </div>
  ),
};
