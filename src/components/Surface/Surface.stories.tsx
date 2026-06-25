import type { Meta, StoryObj } from "@storybook/react";
import { Surface } from "./Surface";

const meta: Meta<typeof Surface> = {
  title: "Display/Surface",
  component: Surface,
  parameters: { layout: "centered" },
  args: {
    elevation: 1,
    variant: "raised",
    children: "Surface content",
    style: { padding: "24px 32px", minWidth: 200 },
  },
};
export default meta;
type Story = StoryObj<typeof Surface>;

export const Flat: Story = { args: { variant: "flat", elevation: 0 } };
export const Raised: Story = { args: { variant: "raised", elevation: 1 } };
export const Overlay: Story = { args: { variant: "overlay", elevation: 3 } };
export const Elevation0: Story = { args: { elevation: 0, variant: "flat" } };
export const Elevation2: Story = { args: { elevation: 2, variant: "raised" } };
export const Elevation3: Story = { args: { elevation: 3, variant: "raised" } };
export const Elevation4: Story = { args: { elevation: 4, variant: "overlay" } };
export const Disabled: Story = {
  args: { variant: "raised", elevation: 1, disabled: true },
};

/** All states at a glance. */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(3, 1fr)",
        padding: 24,
      }}
    >
      {(["flat", "raised", "overlay"] as const).map((variant) =>
        ([0, 1, 2, 3, 4] as const).map((elevation) => (
          <Surface
            key={`${variant}-${elevation}`}
            variant={variant}
            elevation={elevation}
            style={{ padding: "16px 20px" }}
          >
            <span
              style={{
                fontSize: 12,
                opacity: 0.7,
                display: "block",
                marginBottom: 4,
              }}
            >
              {variant} / elev-{elevation}
            </span>
            Surface content
          </Surface>
        ))
      )}
    </div>
  ),
};
