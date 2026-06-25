import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

/** Placeholder SVG icon — replace with the Morpheus icon set in production. */
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: "Actions/IconButton",
  component: IconButton,
  args: { icon: <PlusIcon />, label: "Add item" },
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost", label: "Close", icon: <CloseIcon /> } };
export const Destructive: Story = {
  args: { variant: "destructive", label: "Delete item", icon: <TrashIcon /> },
};
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };
export const Loading: Story = { args: { variant: "primary", loading: true } };
export const Disabled: Story = { args: { variant: "primary", disabled: true } };

/** All documented states at a glance. */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <IconButton variant="primary"     icon={<PlusIcon />}  label="Add (primary)"     />
      <IconButton variant="secondary"   icon={<PlusIcon />}  label="Add (secondary)"   />
      <IconButton variant="ghost"       icon={<CloseIcon />} label="Close (ghost)"     />
      <IconButton variant="destructive" icon={<TrashIcon />} label="Delete (destructive)" />
      <IconButton variant="primary" size="sm" icon={<PlusIcon />} label="Add (small)"  />
      <IconButton variant="primary" size="lg" icon={<PlusIcon />} label="Add (large)"  />
      <IconButton variant="primary" loading    icon={<PlusIcon />} label="Add"          />
      <IconButton variant="primary" disabled   icon={<PlusIcon />} label="Add"          />
    </div>
  ),
};
