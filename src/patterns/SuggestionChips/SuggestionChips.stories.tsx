import type { Meta, StoryObj } from "@storybook/react";
import { SuggestionChips } from "./SuggestionChips";

const meta: Meta<typeof SuggestionChips> = {
  title: "Patterns/SuggestionChips",
  component: SuggestionChips,
};
export default meta;
type Story = StoryObj<typeof SuggestionChips>;

const defaultSuggestions = [
  { id: "1", label: "Summarize this document" },
  { id: "2", label: "Explain the key concepts" },
  { id: "3", label: "Generate action items" },
  { id: "4", label: "Find related topics" },
];

const suggestionsWithIcons = [
  {
    id: "1",
    label: "Summarize",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h10M4 18h14" />
      </svg>
    ),
  },
  {
    id: "2",
    label: "Translate",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1" />
        <path d="M22 22l-5-10-5 10M14 18h6" />
      </svg>
    ),
  },
  {
    id: "3",
    label: "Rewrite",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
];

export const Rest: Story = {
  args: {
    suggestions: defaultSuggestions,
    onSelect: (id) => console.log("Selected:", id),
  },
};

export const WithIcons: Story = {
  args: {
    suggestions: suggestionsWithIcons,
    onSelect: (id) => console.log("Selected:", id),
  },
};

export const Disabled: Story = {
  args: {
    suggestions: defaultSuggestions,
    disabled: true,
  },
};

export const IndividualDisabled: Story = {
  args: {
    suggestions: [
      { id: "1", label: "Available action" },
      { id: "2", label: "Disabled action", disabled: true },
      { id: "3", label: "Another available action" },
    ],
    onSelect: (id) => console.log("Selected:", id),
  },
};

export const Compact: Story = {
  args: {
    suggestions: defaultSuggestions,
    density: "compact",
    onSelect: (id) => console.log("Selected:", id),
  },
};

export const Loading: Story = {
  args: {
    suggestions: [],
    loading: true,
    loadingCount: 4,
  },
};

export const Wrapping: Story = {
  args: {
    suggestions: [
      { id: "1", label: "What are the main points?" },
      { id: "2", label: "How does this relate to previous work?" },
      { id: "3", label: "Can you elaborate on section three?" },
      { id: "4", label: "Generate a summary table" },
      { id: "5", label: "Find contradictions" },
      { id: "6", label: "List all references" },
      { id: "7", label: "Create an outline" },
    ],
    onSelect: (id) => console.log("Selected:", id),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, opacity: 0.6 }}>Rest (comfortable)</p>
        <SuggestionChips suggestions={defaultSuggestions} />
      </div>
      <div>
        <p style={{ marginBottom: 8, opacity: 0.6 }}>Rest (compact)</p>
        <SuggestionChips suggestions={defaultSuggestions} density="compact" />
      </div>
      <div>
        <p style={{ marginBottom: 8, opacity: 0.6 }}>With icons</p>
        <SuggestionChips suggestions={suggestionsWithIcons} />
      </div>
      <div>
        <p style={{ marginBottom: 8, opacity: 0.6 }}>Disabled (group)</p>
        <SuggestionChips suggestions={defaultSuggestions} disabled />
      </div>
      <div>
        <p style={{ marginBottom: 8, opacity: 0.6 }}>Individual disabled</p>
        <SuggestionChips
          suggestions={[
            { id: "1", label: "Enabled" },
            { id: "2", label: "Disabled", disabled: true },
            { id: "3", label: "Enabled" },
          ]}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, opacity: 0.6 }}>Loading</p>
        <SuggestionChips suggestions={[]} loading loadingCount={3} />
      </div>
    </div>
  ),
};
