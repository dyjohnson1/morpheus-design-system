import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FeedbackControl } from "./FeedbackControl";

const meta: Meta<typeof FeedbackControl> = {
  title: "Patterns/FeedbackControl",
  component: FeedbackControl,
};
export default meta;
type Story = StoryObj<typeof FeedbackControl>;

export const Rest: Story = {
  args: {
    value: null,
  },
};

export const PositiveSelected: Story = {
  args: {
    value: "positive",
  },
};

export const NegativeSelected: Story = {
  args: {
    value: "negative",
  },
};

export const WithTextField: Story = {
  args: {
    value: "negative",
    showTextField: true,
  },
};

export const Disabled: Story = {
  args: {
    value: null,
    disabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    value: "positive",
    disabled: true,
  },
};

export const Compact: Story = {
  args: {
    value: null,
    density: "compact",
  },
};

export const CompactSelected: Story = {
  args: {
    value: "positive",
    density: "compact",
  },
};

export const CompactWithTextField: Story = {
  args: {
    value: "negative",
    density: "compact",
    showTextField: true,
  },
};

export const AllStates: Story = {
  render: () => {
    const [values, setValues] = React.useState<Record<string, "positive" | "negative" | null>>({
      rest: null,
      positive: "positive",
      negative: "negative",
      disabled: null,
      disabledSelected: "positive",
      compact: null,
      compactSelected: "negative",
      withText: "negative",
    });

    return (
      <div style={{ display: "grid", gap: 32, maxWidth: 400 }}>
        <div>
          <p style={{ marginBottom: 8, color: "var(--morph-color-on-surface-muted)" }}>Rest</p>
          <FeedbackControl
            value={values.rest}
            onFeedback={(v) => setValues((s) => ({ ...s, rest: v }))}
          />
        </div>
        <div>
          <p style={{ marginBottom: 8, color: "var(--morph-color-on-surface-muted)" }}>Positive selected</p>
          <FeedbackControl
            value={values.positive}
            onFeedback={(v) => setValues((s) => ({ ...s, positive: v }))}
          />
        </div>
        <div>
          <p style={{ marginBottom: 8, color: "var(--morph-color-on-surface-muted)" }}>Negative selected</p>
          <FeedbackControl
            value={values.negative}
            onFeedback={(v) => setValues((s) => ({ ...s, negative: v }))}
          />
        </div>
        <div>
          <p style={{ marginBottom: 8, color: "var(--morph-color-on-surface-muted)" }}>Disabled</p>
          <FeedbackControl value={values.disabled} disabled />
        </div>
        <div>
          <p style={{ marginBottom: 8, color: "var(--morph-color-on-surface-muted)" }}>Disabled + selected</p>
          <FeedbackControl value={values.disabledSelected} disabled />
        </div>
        <div>
          <p style={{ marginBottom: 8, color: "var(--morph-color-on-surface-muted)" }}>Compact</p>
          <FeedbackControl
            value={values.compact}
            density="compact"
            onFeedback={(v) => setValues((s) => ({ ...s, compact: v }))}
          />
        </div>
        <div>
          <p style={{ marginBottom: 8, color: "var(--morph-color-on-surface-muted)" }}>Compact + selected</p>
          <FeedbackControl
            value={values.compactSelected}
            density="compact"
            onFeedback={(v) => setValues((s) => ({ ...s, compactSelected: v }))}
          />
        </div>
        <div>
          <p style={{ marginBottom: 8, color: "var(--morph-color-on-surface-muted)" }}>With text field</p>
          <FeedbackControl
            value={values.withText}
            showTextField
            onFeedback={(v) => setValues((s) => ({ ...s, withText: v }))}
            onTextSubmit={(text) => console.log("Submitted:", text)}
          />
        </div>
      </div>
    );
  },
};
