import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Actions/Link",
  component: Link,
  args: { href: "#", children: "Read the documentation" },
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const Muted: Story = {
  args: { variant: "muted", children: "View source" },
};

export const Accent: Story = {
  args: { variant: "accent", children: "Generate a new report" },
};

export const External: Story = {
  args: {
    href: "https://example.com",
    external: true,
    children: "View on GitHub",
  },
};

export const ExternalMuted: Story = {
  args: {
    href: "https://example.com",
    external: true,
    variant: "muted",
    children: "License details",
  },
};

export const NoUnderline: Story = {
  args: {
    noUnderline: true,
    children: "Nav item",
  },
};

export const InlineInProse: Story = {
  render: () => (
    <p style={{ maxWidth: 480, fontFamily: "Inter, system-ui, sans-serif", fontSize: 16, lineHeight: 1.6, color: "var(--morph-color-on-surface)" }}>
      This model was trained on a curated dataset.{" "}
      <Link href="#" variant="default">Learn about our data practices</Link>{" "}
      or review the{" "}
      <Link href="https://example.com" external variant="accent">
        open-source training pipeline
      </Link>
      .
    </p>
  ),
};

/** All documented states at a glance. */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "Inter, system-ui, sans-serif", fontSize: 16 }}>
      <Link href="#" variant="default">Default link</Link>
      <Link href="#" variant="muted">Muted link</Link>
      <Link href="#" variant="accent">Accent link</Link>
      <Link href="https://example.com" external>External link</Link>
      <Link href="#" noUnderline>No-underline link</Link>
    </div>
  ),
};
