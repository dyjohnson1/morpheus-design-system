import type { Meta, StoryObj } from "@storybook/react";
import { Field } from "./Field";

const meta: Meta<typeof Field> = {
  title: "Forms/Field",
  component: Field,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Field>;

/** Placeholder input for stories — mimics a real TextInput. */
const MockInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type="text"
    style={{
      width: "100%",
      padding: "var(--morph-space-2) var(--morph-space-3)",
      borderRadius: "var(--morph-radius-2, 10px)",
      border: "1px solid var(--morph-color-border-subtle)",
      background: "var(--morph-color-surface)",
      color: "var(--morph-color-on-surface)",
      fontFamily: "var(--morph-font-ui)",
      fontSize: "var(--morph-font-size-body, 16px)",
      outline: "none",
    }}
    {...props}
  />
);

/* ─── Rest state ─────────────────────────────────────────────────────────── */

export const Rest: Story = {
  render: () => (
    <Field label="Email address" htmlFor="email-rest">
      <MockInput id="email-rest" placeholder="you@example.com" />
    </Field>
  ),
};

/* ─── With helper text ───────────────────────────────────────────────────── */

export const WithHelperText: Story = {
  render: () => (
    <Field
      label="Username"
      htmlFor="username-helper"
      helperText="Must be 3–20 characters, letters and numbers only."
    >
      <MockInput id="username-helper" placeholder="morpheus_user" />
    </Field>
  ),
};

/* ─── Required ───────────────────────────────────────────────────────────── */

export const Required: Story = {
  render: () => (
    <Field label="Full name" htmlFor="name-required" required>
      <MockInput id="name-required" placeholder="Ada Lovelace" />
    </Field>
  ),
};

/* ─── Error state ────────────────────────────────────────────────────────── */

export const Error: Story = {
  render: () => (
    <Field
      label="Email address"
      htmlFor="email-error"
      error="Please enter a valid email address."
    >
      <MockInput
        id="email-error"
        defaultValue="not-an-email"
        aria-invalid="true"
        aria-describedby=":r0:-error"
      />
    </Field>
  ),
};

/* ─── Disabled state ─────────────────────────────────────────────────────── */

export const Disabled: Story = {
  render: () => (
    <Field label="Organization" htmlFor="org-disabled" disabled helperText="Contact admin to change.">
      <MockInput id="org-disabled" value="Morpheus Labs" disabled />
    </Field>
  ),
};

/* ─── Error replaces helper ──────────────────────────────────────────────── */

export const ErrorReplacesHelper: Story = {
  name: "Error replaces helper text",
  render: () => (
    <Field
      label="Password"
      htmlFor="pw-error"
      helperText="At least 8 characters."
      error="Password is too short."
    >
      <MockInput id="pw-error" type="password" defaultValue="abc" aria-invalid="true" />
    </Field>
  ),
};

/* ─── All states matrix ──────────────────────────────────────────────────── */

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-4, 24px)" }}>
      <Field label="Rest" htmlFor="all-rest">
        <MockInput id="all-rest" placeholder="Default state" />
      </Field>

      <Field label="With helper" htmlFor="all-helper" helperText="Helpful guidance text.">
        <MockInput id="all-helper" placeholder="Has helper text" />
      </Field>

      <Field label="Required" htmlFor="all-req" required>
        <MockInput id="all-req" placeholder="Mandatory field" />
      </Field>

      <Field label="Error" htmlFor="all-error" error="Something went wrong.">
        <MockInput id="all-error" defaultValue="Bad input" aria-invalid="true" />
      </Field>

      <Field label="Error (boolean)" htmlFor="all-error-bool" error>
        <MockInput id="all-error-bool" defaultValue="Error no message" aria-invalid="true" />
      </Field>

      <Field label="Disabled" htmlFor="all-disabled" disabled helperText="Cannot edit.">
        <MockInput id="all-disabled" value="Locked" disabled />
      </Field>

      <Field label="Required + error" htmlFor="all-req-err" required error="This field is required.">
        <MockInput id="all-req-err" aria-invalid="true" />
      </Field>
    </div>
  ),
};
