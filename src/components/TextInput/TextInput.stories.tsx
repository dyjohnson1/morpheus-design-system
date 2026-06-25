import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Forms/TextInput",
  component: TextInput,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof TextInput>;

/* ─── Placeholder search icon for demos ─────────────────────────────────── */
const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const AlertIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/* ─── Rest ──────────────────────────────────────────────────────────────── */
export const Rest: Story = {
  args: { placeholder: "Enter text…" },
};

/* ─── With value ────────────────────────────────────────────────────────── */
export const WithValue: Story = {
  args: { defaultValue: "Hello, Morpheus" },
};

/* ─── Focused (use autoFocus for demo) ──────────────────────────────────── */
export const Focused: Story = {
  args: { placeholder: "Focused input", autoFocus: true },
};

/* ─── Error ─────────────────────────────────────────────────────────────── */
export const Error: Story = {
  args: { error: true, defaultValue: "Invalid entry" },
};

/* ─── Disabled ──────────────────────────────────────────────────────────── */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Cannot edit" },
};

/* ─── Leading icon ──────────────────────────────────────────────────────── */
export const LeadingIcon: Story = {
  args: { leadingIcon: <SearchIcon />, placeholder: "Search…" },
};

/* ─── Trailing icon ─────────────────────────────────────────────────────── */
export const TrailingIcon: Story = {
  args: { trailingIcon: <AlertIcon />, error: true, defaultValue: "Bad value" },
};

/* ─── Both icons ────────────────────────────────────────────────────────── */
export const BothIcons: Story = {
  args: {
    leadingIcon: <SearchIcon />,
    trailingIcon: <AlertIcon />,
    placeholder: "Search with status…",
  },
};

/* ─── Compact size ──────────────────────────────────────────────────────── */
export const Compact: Story = {
  args: { size: "compact", placeholder: "Compact input" },
};

/* ─── Compact with icons ────────────────────────────────────────────────── */
export const CompactWithIcons: Story = {
  args: {
    size: "compact",
    leadingIcon: <SearchIcon />,
    placeholder: "Compact search…",
  },
};

/* ─── All states matrix ─────────────────────────────────────────────────── */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--morph-space-3)",
        width: 320,
      }}
    >
      <TextInput placeholder="Rest" />
      <TextInput defaultValue="With value" />
      <TextInput placeholder="Focused" autoFocus />
      <TextInput error defaultValue="Error state" />
      <TextInput disabled defaultValue="Disabled" />
      <TextInput leadingIcon={<SearchIcon />} placeholder="Leading icon" />
      <TextInput trailingIcon={<AlertIcon />} placeholder="Trailing icon" />
      <TextInput
        leadingIcon={<SearchIcon />}
        trailingIcon={<AlertIcon />}
        placeholder="Both icons"
      />
      <TextInput size="compact" placeholder="Compact" />
      <TextInput
        size="compact"
        leadingIcon={<SearchIcon />}
        placeholder="Compact + icon"
      />
      <TextInput
        size="compact"
        error
        defaultValue="Compact + error"
      />
      <TextInput size="compact" disabled defaultValue="Compact + disabled" />
    </div>
  ),
};
