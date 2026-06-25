import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectItem, SelectGroup, SelectSeparator } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 280, padding: 80 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["comfortable", "compact"],
    },
    disabled: { control: { type: "boolean" } },
    error: { control: { type: "boolean" } },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

/* ── Default (rest) ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    placeholder: "Select a fruit",
    "aria-label": "Fruit",
    children: undefined,
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="cherry">Cherry</SelectItem>
      <SelectItem value="dragonfruit">Dragonfruit</SelectItem>
    </Select>
  ),
};

/* ── With default value (selected) ──────────────────────────────────────── */

export const Selected: Story = {
  args: {
    defaultValue: "banana",
    "aria-label": "Fruit",
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="cherry">Cherry</SelectItem>
    </Select>
  ),
};

/* ── Disabled ───────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: {
    placeholder: "Disabled select",
    disabled: true,
    "aria-label": "Disabled fruit",
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </Select>
  ),
};

/* ── Error state ────────────────────────────────────────────────────────── */

export const Error: Story = {
  args: {
    placeholder: "Select required",
    error: true,
    "aria-label": "Required fruit",
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="cherry">Cherry</SelectItem>
    </Select>
  ),
};

/* ── Compact size ───────────────────────────────────────────────────────── */

export const Compact: Story = {
  args: {
    placeholder: "Compact select",
    size: "compact",
    "aria-label": "Compact fruit",
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="cherry">Cherry</SelectItem>
    </Select>
  ),
};

/* ── With groups ────────────────────────────────────────────────────────── */

export const WithGroups: Story = {
  args: {
    placeholder: "Select a food",
    "aria-label": "Food",
  },
  render: (args) => (
    <Select {...args}>
      <SelectGroup label="Fruits">
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup label="Vegetables">
        <SelectItem value="carrot">Carrot</SelectItem>
        <SelectItem value="potato">Potato</SelectItem>
        <SelectItem value="spinach">Spinach</SelectItem>
      </SelectGroup>
    </Select>
  ),
};

/* ── Disabled items ─────────────────────────────────────────────────────── */

export const DisabledItems: Story = {
  args: {
    placeholder: "Some items disabled",
    "aria-label": "Fruit with disabled",
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana" disabled>Banana (out of stock)</SelectItem>
      <SelectItem value="cherry">Cherry</SelectItem>
      <SelectItem value="dragonfruit" disabled>Dragonfruit (out of stock)</SelectItem>
    </Select>
  ),
};

/* ── All states matrix ──────────────────────────────────────────────────── */

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        width: 280,
      }}
    >
      {/* Rest */}
      <section>
        <p
          style={{
            color: "var(--morph-color-on-surface-muted)",
            fontSize: 12,
            marginBottom: 8,
          }}
        >
          Rest (placeholder)
        </p>
        <Select placeholder="Select a fruit" aria-label="Rest state">
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </Select>
      </section>

      {/* Selected */}
      <section>
        <p
          style={{
            color: "var(--morph-color-on-surface-muted)",
            fontSize: 12,
            marginBottom: 8,
          }}
        >
          Selected
        </p>
        <Select defaultValue="banana" aria-label="Selected state">
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </Select>
      </section>

      {/* Error */}
      <section>
        <p
          style={{
            color: "var(--morph-color-on-surface-muted)",
            fontSize: 12,
            marginBottom: 8,
          }}
        >
          Error
        </p>
        <Select placeholder="Required field" error aria-label="Error state">
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </Select>
      </section>

      {/* Disabled */}
      <section>
        <p
          style={{
            color: "var(--morph-color-on-surface-muted)",
            fontSize: 12,
            marginBottom: 8,
          }}
        >
          Disabled
        </p>
        <Select placeholder="Not available" disabled aria-label="Disabled state">
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </Select>
      </section>

      {/* Compact */}
      <section>
        <p
          style={{
            color: "var(--morph-color-on-surface-muted)",
            fontSize: 12,
            marginBottom: 8,
          }}
        >
          Compact
        </p>
        <Select placeholder="Compact" size="compact" aria-label="Compact state">
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </Select>
      </section>

      {/* Grouped */}
      <section>
        <p
          style={{
            color: "var(--morph-color-on-surface-muted)",
            fontSize: 12,
            marginBottom: 8,
          }}
        >
          Grouped with separator
        </p>
        <Select placeholder="Select food" aria-label="Grouped state">
          <SelectGroup label="Fruits">
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup label="Vegetables">
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="spinach">Spinach</SelectItem>
          </SelectGroup>
        </Select>
      </section>
    </div>
  ),
};
