import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "../Button";
import { IconButton } from "../IconButton";

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);
const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

const meta: Meta<typeof ButtonGroup> = {
  title: "Actions/ButtonGroup",
  component: ButtonGroup,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup aria-label="Text formatting">
      <Button variant="secondary">Bold</Button>
      <Button variant="secondary">Italic</Button>
      <Button variant="secondary">Underline</Button>
    </ButtonGroup>
  ),
};

export const Attached: Story = {
  render: () => (
    <ButtonGroup attached aria-label="View mode">
      <Button variant="secondary">Table</Button>
      <Button variant="secondary">Chart</Button>
      <Button variant="secondary">Summary</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" aria-label="Actions">
      <Button variant="secondary">Save draft</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="ghost">Discard</Button>
    </ButtonGroup>
  ),
};

export const VerticalAttached: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" attached aria-label="Options">
      <Button variant="secondary">Option A</Button>
      <Button variant="secondary">Option B</Button>
      <Button variant="secondary">Option C</Button>
    </ButtonGroup>
  ),
};

export const WithIconButtons: Story = {
  render: () => (
    <ButtonGroup attached aria-label="Layout">
      <IconButton icon={<GridIcon />} label="Grid view" variant="secondary" />
      <IconButton icon={<ListIcon />} label="List view" variant="secondary" />
      <IconButton icon={<MapIcon />}  label="Map view"  variant="secondary" />
    </ButtonGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ButtonGroup disabled aria-label="Unavailable actions">
      <Button variant="secondary">Cut</Button>
      <Button variant="secondary">Copy</Button>
      <Button variant="secondary">Paste</Button>
    </ButtonGroup>
  ),
};

/** All documented states at a glance. */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <ButtonGroup aria-label="Spaced horizontal">
        <Button variant="secondary">Bold</Button>
        <Button variant="secondary">Italic</Button>
        <Button variant="secondary">Underline</Button>
      </ButtonGroup>

      <ButtonGroup attached aria-label="Attached horizontal">
        <Button variant="secondary">Table</Button>
        <Button variant="secondary">Chart</Button>
        <Button variant="secondary">Summary</Button>
      </ButtonGroup>

      <ButtonGroup orientation="vertical" attached aria-label="Attached vertical">
        <Button variant="secondary">Option A</Button>
        <Button variant="secondary">Option B</Button>
        <Button variant="secondary">Option C</Button>
      </ButtonGroup>

      <ButtonGroup disabled aria-label="Disabled group">
        <Button variant="secondary">Cut</Button>
        <Button variant="secondary">Copy</Button>
      </ButtonGroup>
    </div>
  ),
};
