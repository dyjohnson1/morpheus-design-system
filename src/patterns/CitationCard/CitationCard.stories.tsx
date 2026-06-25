import type { Meta, StoryObj } from "@storybook/react";
import { CitationCard } from "./CitationCard";

const meta: Meta<typeof CitationCard> = {
  title: "Patterns/CitationCard",
  component: CitationCard,
};
export default meta;
type Story = StoryObj<typeof CitationCard>;

const faviconIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const Default: Story = {
  args: {
    title: "TypeScript: Documentation - Everyday Types",
    url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
    sourceName: "typescriptlang.org",
    index: 1,
    type: "webpage",
  },
};

export const WithSnippet: Story = {
  args: {
    title: "React useEffect Hook – Complete Guide",
    url: "https://react.dev/reference/react/useEffect",
    sourceName: "react.dev",
    snippet:
      "useEffect is a React Hook that lets you synchronize a component with an external system. Call useEffect at the top level of your component to declare an Effect.",
    index: 2,
    type: "webpage",
    icon: faviconIcon,
  },
};

export const DocumentType: Story = {
  args: {
    title: "WCAG 2.2 Understanding Success Criterion 2.4.7: Focus Visible",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html",
    sourceName: "w3.org",
    snippet:
      "The purpose of this success criterion is to help a user know which element among multiple elements has the keyboard focus.",
    index: 3,
    type: "document",
  },
};

export const CodeType: Story = {
  args: {
    title: "vitest/packages/runner/src/run.ts",
    url: "https://github.com/vitest-dev/vitest/blob/main/packages/runner/src/run.ts",
    sourceName: "github.com",
    snippet: "Main test runner execution logic for Vitest framework.",
    index: 4,
    type: "code",
  },
};

export const ApiType: Story = {
  args: {
    title: "OpenAI API Reference — Chat Completions",
    url: "https://platform.openai.com/docs/api-reference/chat",
    sourceName: "platform.openai.com",
    snippet:
      "Creates a model response for the given chat conversation. The messages parameter takes an array of message objects.",
    index: 5,
    type: "api",
  },
};

export const WithIcon: Story = {
  args: {
    title: "MDN Web Docs — CSS Grid Layout",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
    sourceName: "developer.mozilla.org",
    snippet:
      "CSS Grid Layout excels at dividing a page into major regions or defining the relationship in terms of size, position, and layer.",
    index: 6,
    type: "webpage",
    icon: faviconIcon,
  },
};

export const NoIndex: Story = {
  args: {
    title: "Style Dictionary Documentation",
    url: "https://amzn.github.io/style-dictionary/",
    sourceName: "amzn.github.io",
    type: "document",
  },
};

export const Compact: Story = {
  args: {
    title: "TypeScript: Documentation - Everyday Types",
    url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
    sourceName: "typescriptlang.org",
    snippet: "TypeScript's type system allows building new types from existing ones using operators.",
    index: 1,
    type: "webpage",
    density: "compact",
    icon: faviconIcon,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24, maxWidth: 480 }}>
      <CitationCard
        title="TypeScript Handbook — Everyday Types"
        url="https://www.typescriptlang.org/docs"
        sourceName="typescriptlang.org"
        index={1}
        type="webpage"
        icon={faviconIcon}
      />
      <CitationCard
        title="WCAG 2.2 Understanding Focus Visible"
        url="https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html"
        sourceName="w3.org"
        snippet="The purpose of this success criterion is to help a user know which element has keyboard focus."
        index={2}
        type="document"
      />
      <CitationCard
        title="vitest/packages/runner/src/run.ts"
        url="https://github.com/vitest-dev/vitest/blob/main/packages/runner/src/run.ts"
        sourceName="github.com"
        snippet="Main test runner execution logic."
        index={3}
        type="code"
      />
      <CitationCard
        title="OpenAI Chat Completions API"
        url="https://platform.openai.com/docs/api-reference/chat"
        sourceName="platform.openai.com"
        snippet="Creates a model response for the given chat conversation."
        index={4}
        type="api"
      />
      <CitationCard
        title="Compact density example"
        url="https://example.com"
        sourceName="example.com"
        index={5}
        type="webpage"
        density="compact"
        icon={faviconIcon}
      />
      <CitationCard
        title="No index badge example"
        url="https://example.com/no-index"
        sourceName="example.com"
        type="webpage"
      />
    </div>
  ),
};
