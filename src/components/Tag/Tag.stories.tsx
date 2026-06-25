import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

/* ─── Inline icon helpers ────────────────────────────────────────────────── */
const StarIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="8,2 10,6 14,6.5 11,9.5 12,14 8,11.5 4,14 5,9.5 2,6.5 6,6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="2,8 6,12 14,4" />
  </svg>
);

const WarningIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 2L14 13H2L8 2z" />
    <line x1="8" y1="7" x2="8" y2="10" />
    <circle cx="8" cy="12" r="0.5" fill="currentColor" />
  </svg>
);

const DangerIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="6" />
    <line x1="8" y1="5" x2="8" y2="9" />
    <circle cx="8" cy="11" r="0.5" fill="currentColor" />
  </svg>
);

const InfoIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="6" />
    <line x1="8" y1="7" x2="8" y2="11" />
    <circle cx="8" cy="5" r="0.5" fill="currentColor" />
  </svg>
);

/* ─── Meta ───────────────────────────────────────────────────────────────── */
const meta: Meta<typeof Tag> = {
  title: "Display/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  args: { children: "React" },
};
export default meta;
type Story = StoryObj<typeof Tag>;

/* ─── Variants ───────────────────────────────────────────────────────────── */

export const Neutral: Story = {};

export const Accent: Story = {
  args: { variant: "accent", children: "Beta" },
};

export const Success: Story = {
  args: { variant: "success", children: "Active", iconLeading: <CheckIcon /> },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Pending", iconLeading: <WarningIcon /> },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Error", iconLeading: <DangerIcon /> },
};

export const Info: Story = {
  args: { variant: "info", children: "Info", iconLeading: <InfoIcon /> },
};

/* ─── Sizes ──────────────────────────────────────────────────────────────── */

export const SizeSm: Story = {
  name: "Size — sm",
  args: { size: "sm", children: "Small" },
};

export const SizeMd: Story = {
  name: "Size — md (default)",
  args: { size: "md", children: "Medium" },
};

/* ─── Interactive states ─────────────────────────────────────────────────── */

export const Selected: Story = {
  args: { selected: true, children: "Selected" },
};

export const SelectedAccent: Story = {
  name: "Selected — accent",
  args: { variant: "accent", selected: true, children: "Selected" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};

/* ─── Removable ──────────────────────────────────────────────────────────── */

export const Removable: Story = {
  args: {
    removable: true,
    onRemove: () => alert("Removed"),
    removeLabel: "Remove React tag",
  },
};

export const RemovableSelected: Story = {
  name: "Removable + selected",
  args: {
    removable: true,
    selected: true,
    onRemove: () => alert("Removed"),
    removeLabel: "Remove React tag",
  },
};

export const RemovableDisabled: Story = {
  name: "Removable — disabled (no × shown)",
  args: {
    removable: true,
    disabled: true,
    removeLabel: "Remove React tag",
  },
};

/* ─── With leading icon ──────────────────────────────────────────────────── */

export const WithLeadingIcon: Story = {
  args: { iconLeading: <StarIcon /> },
};

export const WithIconAndRemove: Story = {
  name: "Leading icon + removable",
  args: {
    iconLeading: <StarIcon />,
    removable: true,
    onRemove: () => alert("Removed"),
    removeLabel: "Remove React tag",
  },
};

/* ─── Toggle / filter chip demo ─────────────────────────────────────────── */

/** Demonstrates keyboard-togglable filter chips. */
export const FilterChipDemo: Story = {
  name: "Filter chip — toggle demo",
  render: () => {
    const [active, setActive] = React.useState<string[]>(["TypeScript"]);
    const options = ["TypeScript", "React", "CSS", "Testing", "Accessibility"];

    return (
      <div style={{ display: "flex", gap: "var(--morph-space-2)", flexWrap: "wrap" }}>
        {options.map((opt) => (
          <Tag
            key={opt}
            selected={active.includes(opt)}
            onClick={() =>
              setActive((prev) =>
                prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]
              )
            }
            aria-label={`Filter by ${opt}`}
          >
            {opt}
          </Tag>
        ))}
      </div>
    );
  },
};

/* ─── AllStates matrix ───────────────────────────────────────────────────── */

/** Every documented state at a glance. */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "var(--morph-space-2)",
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: 640,
      }}
    >
      {/* Variants */}
      <Tag>Neutral</Tag>
      <Tag variant="accent">Accent</Tag>
      <Tag variant="success" iconLeading={<CheckIcon />}>Success</Tag>
      <Tag variant="warning" iconLeading={<WarningIcon />}>Warning</Tag>
      <Tag variant="danger" iconLeading={<DangerIcon />}>Danger</Tag>
      <Tag variant="info" iconLeading={<InfoIcon />}>Info</Tag>

      {/* Sizes */}
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>

      {/* States */}
      <Tag selected>Selected</Tag>
      <Tag selected variant="accent">Selected accent</Tag>
      <Tag disabled>Disabled</Tag>

      {/* Removable */}
      <Tag removable onRemove={() => {}} removeLabel="Remove neutral tag">Removable</Tag>
      <Tag variant="accent" removable onRemove={() => {}} removeLabel="Remove accent tag">Removable accent</Tag>

      {/* Icon + removable */}
      <Tag iconLeading={<StarIcon />} removable onRemove={() => {}} removeLabel="Remove starred tag">
        Icon + remove
      </Tag>

      {/* Selected + removable */}
      <Tag selected removable onRemove={() => {}} removeLabel="Remove tag">Selected + removable</Tag>

      {/* Small removable */}
      <Tag size="sm" removable onRemove={() => {}} removeLabel="Remove small tag">Small removable</Tag>
    </div>
  ),
};
