import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Display/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    shape: {
      control: { type: "radio" },
      options: ["circle", "square"],
    },
    status: {
      control: { type: "select" },
      options: [undefined, "online", "offline", "busy", "away"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

/* ── Fallback chain ─────────────────────────────────────────────────────── */

export const WithImage: Story = {
  args: { src: "https://i.pravatar.cc/80?img=5", alt: "Jane Doe", size: "md" },
};

export const WithInitials: Story = {
  args: { initials: "JD", size: "md", "aria-label": "Jane Doe" },
};

export const WithIcon: Story = {
  args: { size: "md", "aria-label": "Unknown user" },
};

/**
 * Error state — when the image URL is broken the component falls back to
 * initials (if provided) then the generic icon.
 */
export const BrokenImageFallback: Story = {
  args: {
    src: "/this-image-does-not-exist.jpg",
    alt: "User",
    initials: "FB",
    "aria-label": "Fallback user",
  },
};

/* ── Sizes ──────────────────────────────────────────────────────────────── */

export const ExtraSmall: Story = {
  args: { initials: "XS", size: "xs", "aria-label": "Extra small avatar" },
};

export const Small: Story = {
  args: { initials: "SM", size: "sm", "aria-label": "Small avatar" },
};

export const Medium: Story = {
  args: { initials: "MD", size: "md", "aria-label": "Medium avatar" },
};

export const Large: Story = {
  args: { initials: "LG", size: "lg", "aria-label": "Large avatar" },
};

export const ExtraLarge: Story = {
  args: { initials: "XL", size: "xl", "aria-label": "Extra large avatar" },
};

/* ── Shape ──────────────────────────────────────────────────────────────── */

export const Circle: Story = {
  args: { initials: "JD", shape: "circle", size: "md", "aria-label": "Circular avatar" },
};

export const Square: Story = {
  args: { initials: "JD", shape: "square", size: "md", "aria-label": "Square avatar" },
};

/* ── Status indicators (icon + color — never color alone) ───────────────── */

export const StatusOnline: Story = {
  args: {
    initials: "AL",
    size: "md",
    status: "online",
    "aria-label": "Alice Liu",
  },
};

export const StatusOffline: Story = {
  args: {
    initials: "BR",
    size: "md",
    status: "offline",
    "aria-label": "Bob Ross",
  },
};

export const StatusBusy: Story = {
  args: {
    initials: "CM",
    size: "md",
    status: "busy",
    "aria-label": "Carol Marks",
  },
};

export const StatusAway: Story = {
  args: {
    initials: "DK",
    size: "md",
    status: "away",
    "aria-label": "David Kim",
  },
};

/* ── Interactive state (focus / hover / active via onClick) ─────────────── */

export const Interactive: Story = {
  args: {
    initials: "JD",
    size: "md",
    "aria-label": "Jane Doe — click to view profile",
    onClick: () => {},
  },
};

/* ── All states matrix ──────────────────────────────────────────────────── */

/** Every documented state at a glance. */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        alignItems: "flex-start",
      }}
    >
      {/* Sizes */}
      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: 8 }}>
          Sizes
        </p>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar initials="XS" size="xs" aria-label="Extra small" />
          <Avatar initials="SM" size="sm" aria-label="Small" />
          <Avatar initials="MD" size="md" aria-label="Medium" />
          <Avatar initials="LG" size="lg" aria-label="Large" />
          <Avatar initials="XL" size="xl" aria-label="Extra large" />
        </div>
      </section>

      {/* Shapes */}
      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: 8 }}>
          Shapes
        </p>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar initials="CI" shape="circle" size="md" aria-label="Circle" />
          <Avatar initials="SQ" shape="square" size="md" aria-label="Square" />
        </div>
      </section>

      {/* Fallback chain */}
      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: 8 }}>
          Fallback chain: image → initials → icon
        </p>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar src="https://i.pravatar.cc/80?img=1" alt="Alice" size="md" />
          <Avatar initials="JD" size="md" aria-label="Jane Doe" />
          <Avatar size="md" aria-label="Unknown user" />
          <Avatar
            src="/nonexistent.jpg"
            alt="User"
            initials="FB"
            aria-label="Fallback (broken image)"
            size="md"
          />
        </div>
      </section>

      {/* Status badges */}
      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: 8 }}>
          Status (icon + color — never color alone)
        </p>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <Avatar initials="ON" size="md" status="online" aria-label="Online user" />
            <span style={{ fontSize: 11, color: "var(--morph-color-on-surface-muted)" }}>Online</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <Avatar initials="OF" size="md" status="offline" aria-label="Offline user" />
            <span style={{ fontSize: 11, color: "var(--morph-color-on-surface-muted)" }}>Offline</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <Avatar initials="BU" size="md" status="busy" aria-label="Busy user" />
            <span style={{ fontSize: 11, color: "var(--morph-color-on-surface-muted)" }}>Busy</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <Avatar initials="AW" size="md" status="away" aria-label="Away user" />
            <span style={{ fontSize: 11, color: "var(--morph-color-on-surface-muted)" }}>Away</span>
          </div>
        </div>
      </section>

      {/* Interactive */}
      <section>
        <p style={{ color: "var(--morph-color-on-surface-muted)", fontSize: 12, marginBottom: 8 }}>
          Interactive (focus ring via --morph-color-focus)
        </p>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar
            initials="JD"
            size="md"
            aria-label="Jane Doe — view profile"
            onClick={() => {}}
          />
          <Avatar
            src="https://i.pravatar.cc/80?img=3"
            alt="Bob"
            size="md"
            status="online"
            aria-label="Bob — online, view profile"
            onClick={() => {}}
          />
        </div>
      </section>
    </div>
  ),
};
