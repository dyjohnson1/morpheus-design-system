import type { Meta, StoryObj } from "@storybook/react";
import { ChatSurface } from "./ChatSurface";
import {
  EMPTY_STATE,
  LOADING_STATE,
  ERROR_STATE,
  HITL_STATE,
  POPULATED_STATE,
} from "./copy";
import { AppBar } from "../../components/AppBar";
import { SideNav, SideNavGroup, SideNavItem } from "../../components/SideNav";
import { Avatar } from "../../components/Avatar";
import { MessageTurn } from "../../patterns/MessageTurn";
import { StreamingText } from "../../patterns/StreamingText";
import { CitationCard } from "../../patterns/CitationCard";
import { AgentStatus } from "../../patterns/AgentStatus";
import { GenerationState } from "../../patterns/GenerationState";
import { PromptInput } from "../../patterns/PromptInput";
import { SuggestionChips } from "../../patterns/SuggestionChips";
import { FeedbackControl } from "../../patterns/FeedbackControl";
import { HumanInLoopCard } from "../../patterns/HumanInLoopCard";
import { EmptyState } from "../../components/EmptyState";
import { InlineMessage } from "../../components/InlineMessage";
import { Skeleton } from "../../components/Skeleton";
import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";

const meta: Meta<typeof ChatSurface> = {
  title: "Screens/ChatSurface",
  component: ChatSurface,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ChatSurface>;

/* ─── Helper: themed decorator ─────────────────────────────────────────────── */
function withTheme(theme: "dark" | "light") {
  return (Story: () => React.JSX.Element) => (
    <div data-theme={theme} style={{ height: "100dvh" }}>
      <Story />
    </div>
  );
}

/* ─── Icons (inline SVG, 24px grid, 1.75px stroke) ────────────────────────── */

function ThemeToggleIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

/* ─── Layout — basic regions demo ──────────────────────────────────────────── */

/** Layout regions — AppBar, SideNav, message area, and composer. */
export const Layout: Story = {
  render: () => (
    <ChatSurface
      appBar={<AppBar title="Morpheus" />}
      sideNav={
        <SideNav aria-label="Main navigation">
          <SideNavGroup heading="Conversations">
            <SideNavItem label="New chat" active />
            <SideNavItem label="Previous session" />
          </SideNavGroup>
        </SideNav>
      }
      composer={
        <div style={{ padding: "var(--morph-space-3)" }}>
          Composer placeholder
        </div>
      }
    >
      <p style={{ color: "var(--morph-color-on-surface-muted)" }}>
        Message area — content renders here.
      </p>
    </ChatSurface>
  ),
};

/** Collapsed SideNav (md breakpoint behavior). */
export const CollapsedNav: Story = {
  render: () => (
    <ChatSurface
      appBar={<AppBar title="Morpheus" />}
      sideNav={
        <SideNav aria-label="Main navigation" collapsed>
          <SideNavGroup heading="Conversations" collapsed>
            <SideNavItem label="New chat" active collapsed />
          </SideNavGroup>
        </SideNav>
      }
      sideNavCollapsed
      composer={
        <div style={{ padding: "var(--morph-space-3)" }}>
          Composer placeholder
        </div>
      }
    >
      <p style={{ color: "var(--morph-color-on-surface-muted)" }}>
        Message area with collapsed nav.
      </p>
    </ChatSurface>
  ),
};

/** No SideNav (xs/sm breakpoint behavior). */
export const MobileLayout: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <ChatSurface
      appBar={<AppBar title="Morpheus" density="compact" />}
      composer={
        <div style={{ padding: "var(--morph-space-3)" }}>
          Composer placeholder
        </div>
      }
    >
      <p style={{ color: "var(--morph-color-on-surface-muted)" }}>
        Mobile layout — no side nav.
      </p>
    </ChatSurface>
  ),
};

/* ─── Populated — normal state with real components ────────────────────────── */

/**
 * Populated / normal state — a realistic multi-turn conversation
 * composed entirely from existing components and patterns.
 */
export const Populated: Story = {
  render: () => (
    <ChatSurface
      appBar={
        <AppBar
          title="Morpheus"
          trailing={
            <IconButton
              icon={<ThemeToggleIcon />}
              label="Toggle theme"
              variant="ghost"
              size="sm"
            />
          }
        />
      }
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Today">
            <SideNavItem icon={<ChatIcon />} label="Design system tokens" active />
            <SideNavItem icon={<ChatIcon />} label="Layout grid help" />
          </SideNavGroup>
          <SideNavGroup heading="Yesterday">
            <SideNavItem icon={<ChatIcon />} label="Color contrast check" />
            <SideNavItem icon={<ChatIcon />} label="Motion timing" />
          </SideNavGroup>
        </SideNav>
      }
      composer={
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-3)" }}>
          <AgentStatus state="idle" />
          <PromptInput placeholder={POPULATED_STATE.composerPlaceholder} />
          <SuggestionChips
            suggestions={[
              { id: "explain", label: "Explain the token tiers" },
              { id: "example", label: "Show a button example" },
              { id: "contrast", label: "Check contrast ratios" },
            ]}
          />
        </div>
      }
    >
      {/* Turn 1: User message */}
      <MessageTurn
        role="user"
        avatar={<Avatar initials="JD" size="sm" />}
        timestamp="10:42 AM"
      >
        <p>How does the three-tier token architecture work in Morpheus?</p>
      </MessageTurn>

      {/* Turn 2: Assistant response — complete, with citations and feedback */}
      <MessageTurn
        role="assistant"
        avatar={<Avatar initials="M" size="sm" shape="square" />}
        timestamp="10:42 AM"
        status="complete"
        actions={<FeedbackControl value={null} />}
      >
        <StreamingText
          status="complete"
          content="Morpheus uses a three-tier token system: global primitives define raw values (colors, spacing, timing), alias tokens map those to semantic roles (surface, on-surface, accent), and component tokens bind aliases to specific component properties. Components only reference alias tokens — never globals directly. This ensures theme switching is a single-layer swap at the alias level."
        />
        <div style={{ display: "flex", gap: "var(--morph-space-3)", marginTop: "var(--morph-space-3)", flexWrap: "wrap" }}>
          <CitationCard
            title="Style Dictionary documentation"
            url="https://amzn.github.io/style-dictionary"
            sourceName="Style Dictionary"
            index={1}
            type="webpage"
            density="compact"
          />
          <CitationCard
            title="Design tokens format"
            url="https://design-tokens.github.io/community-group/format/"
            sourceName="W3C Design Tokens CG"
            index={2}
            type="document"
            density="compact"
          />
        </div>
      </MessageTurn>

      {/* Turn 3: User follow-up */}
      <MessageTurn
        role="user"
        avatar={<Avatar initials="JD" size="sm" />}
        timestamp="10:43 AM"
      >
        <p>Can you show me how alias tokens map between dark and light themes?</p>
      </MessageTurn>

      {/* Turn 4: Assistant response — complete */}
      <MessageTurn
        role="assistant"
        avatar={<Avatar initials="M" size="sm" shape="square" />}
        timestamp="10:43 AM"
        status="complete"
        actions={<FeedbackControl value="positive" />}
      >
        <StreamingText
          status="complete"
          content={`In dark theme, the alias "surface" resolves to neutral-900 (#16212F), while in light theme it resolves to neutral-0 (#FAF7EE). The switching happens via data-theme on the root element — CSS custom properties cascade the correct values without any component code changes. Here's the mapping:\n\n• ground: n1000 (dark) → n50 (light)\n• surface: n900 → n0\n• surface-raised: n800 → n100\n• on-surface: n50 → n1000\n• accent: a500 → a600`}
        />
      </MessageTurn>
    </ChatSurface>
  ),
};

/* ─── Empty / first-run state ──────────────────────────────────────────────── */

function MorpheusIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ color: "var(--morph-color-accent)" }}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

/**
 * Empty / first-run — warm voice guidance for new users.
 * Follows Morpheus voice: warmth lives in empty states.
 */
export const Empty: Story = {
  render: () => (
    <ChatSurface
      state="empty"
      appBar={<AppBar title="Morpheus" />}
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Conversations">
            <SideNavItem label="New chat" active />
          </SideNavGroup>
        </SideNav>
      }
      emptyContent={
        <EmptyState
          icon={<MorpheusIcon />}
          heading={EMPTY_STATE.heading}
          description={EMPTY_STATE.description}
          actions={
            <SuggestionChips
              suggestions={[
                { id: "tokens", label: "Explain the token tiers" },
                { id: "a11y", label: "Run an accessibility check" },
                { id: "component", label: "Build a new component" },
              ]}
            />
          }
        />
      }
      composer={<PromptInput placeholder="Ask anything…" />}
    />
  ),
};

/* ─── Loading / generating state ───────────────────────────────────────────── */

/**
 * Loading — initial fetch or waiting for the first response.
 * Uses Skeleton placeholders + AgentStatus to indicate generation in progress.
 */
export const Loading: Story = {
  render: () => (
    <ChatSurface
      state="loading"
      appBar={<AppBar title="Morpheus" />}
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Conversations">
            <SideNavItem label="New chat" active />
          </SideNavGroup>
        </SideNav>
      }
      loadingContent={
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-4)", width: "100%", maxWidth: "640px" }}>
          <Skeleton variant="text" width="60%" aria-label="Loading message" />
          <Skeleton variant="text" width="80%" aria-label="Loading message" />
          <Skeleton variant="text" width="45%" aria-label="Loading message" />
          <div style={{ marginTop: "var(--morph-space-4)" }}>
            <GenerationState state="generating" label={LOADING_STATE.generating} />
          </div>
        </div>
      }
      composer={
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-3)" }}>
          <AgentStatus state="thinking" />
          <PromptInput placeholder="Ask anything…" disabled />
        </div>
      }
    />
  ),
};

/* ─── Error / recoverable state ────────────────────────────────────────────── */

/**
 * Error — a recoverable error with warm guidance and a retry action.
 * Uses InlineMessage (error variant) + Button for retry.
 */
export const Error: Story = {
  render: () => (
    <ChatSurface
      state="error"
      appBar={<AppBar title="Morpheus" />}
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Conversations">
            <SideNavItem label="New chat" active />
          </SideNavGroup>
        </SideNav>
      }
      errorContent={
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-4)", maxWidth: "480px", width: "100%" }}>
          <InlineMessage variant="error" dismissible>
            {ERROR_STATE.recoverable}
          </InlineMessage>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="secondary">{ERROR_STATE.retryLabel}</Button>
          </div>
        </div>
      }
      composer={
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-3)" }}>
          <AgentStatus state="error" />
          <PromptInput placeholder="Ask anything…" />
        </div>
      }
    />
  ),
};

/* ─── Human-in-the-loop state ──────────────────────────────────────────────── */

/**
 * HITL — agent reached a checkpoint requiring human approval.
 * Message history remains visible; HumanInLoopCard is appended below.
 */
export const HumanInTheLoop: Story = {
  render: () => (
    <ChatSurface
      state="hitl"
      appBar={<AppBar title="Morpheus" />}
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Conversations">
            <SideNavItem label="Deploy review" active />
          </SideNavGroup>
        </SideNav>
      }
      hitlContent={
        <HumanInLoopCard
          action="Deploy updated color tokens to production"
          rationale="This will update the live design system with the new neutral ramp. All downstream consumers will receive the updated values on their next build."
          status="pending"
          onApprove={() => {}}
          onModify={() => {}}
          onReject={() => {}}
        />
      }
      composer={
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-3)" }}>
          <AgentStatus state="waiting-on-you" label={HITL_STATE.agentStatus} />
          <PromptInput placeholder={HITL_STATE.composerPlaceholder} />
        </div>
      }
    >
      {/* Existing conversation history stays visible in HITL */}
      <MessageTurn
        role="user"
        avatar={<Avatar initials="JD" size="sm" />}
        timestamp="2:15 PM"
      >
        <p>Go ahead and deploy the updated color tokens.</p>
      </MessageTurn>

      <MessageTurn
        role="assistant"
        avatar={<Avatar initials="M" size="sm" shape="square" />}
        timestamp="2:15 PM"
        status="complete"
      >
        <StreamingText
          status="complete"
          content="I've prepared the token deployment. Before I push to production, I need your sign-off — this affects all downstream consumers."
        />
      </MessageTurn>
    </ChatSurface>
  ),
};

/* ─── Dark theme (default / explicit) ──────────────────────────────────────── */

/** Dark theme — the default Morpheus surface. */
export const DarkTheme: Story = {
  decorators: [withTheme("dark")],
  render: () => (
    <ChatSurface
      appBar={
        <AppBar
          title="Morpheus"
          trailing={
            <IconButton
              icon={<ThemeToggleIcon />}
              label="Toggle theme"
              variant="ghost"
              size="sm"
            />
          }
        />
      }
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Today">
            <SideNavItem icon={<ChatIcon />} label="Dark theme demo" active />
          </SideNavGroup>
        </SideNav>
      }
      composer={<PromptInput placeholder="Ask anything…" />}
    >
      <MessageTurn
        role="assistant"
        avatar={<Avatar initials="M" size="sm" shape="square" />}
        timestamp="Now"
        status="complete"
      >
        <StreamingText
          status="complete"
          content="Dark theme is the default in Morpheus. Cool blue-black ground (n1000), warm cream text (n50), muted plum accent as a light source."
        />
      </MessageTurn>
    </ChatSurface>
  ),
};

/* ─── Light theme ──────────────────────────────────────────────────────────── */

/** Light theme — flipped alias tokens via data-theme="light". */
export const LightTheme: Story = {
  decorators: [withTheme("light")],
  render: () => (
    <ChatSurface
      appBar={
        <AppBar
          title="Morpheus"
          trailing={
            <IconButton
              icon={<ThemeToggleIcon />}
              label="Toggle theme"
              variant="ghost"
              size="sm"
            />
          }
        />
      }
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Today">
            <SideNavItem icon={<ChatIcon />} label="Light theme demo" active />
          </SideNavGroup>
        </SideNav>
      }
      composer={<PromptInput placeholder="Ask anything…" />}
    >
      <MessageTurn
        role="assistant"
        avatar={<Avatar initials="M" size="sm" shape="square" />}
        timestamp="Now"
        status="complete"
      >
        <StreamingText
          status="complete"
          content="Light theme swaps alias tokens: ground → n50, surface → n0, on-surface → n1000. Same layout, inverted luminance hierarchy."
        />
      </MessageTurn>
    </ChatSurface>
  ),
};

/* ─── Responsive: xs viewport (mobile portrait) ────────────────────────────── */

/** xs viewport — no sidenav, compact padding. */
export const ResponsiveXs: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <ChatSurface
      appBar={<AppBar title="Morpheus" density="compact" />}
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Conversations">
            <SideNavItem label="Session" active />
          </SideNavGroup>
        </SideNav>
      }
      composer={<PromptInput placeholder="Ask anything…" />}
    >
      <MessageTurn
        role="user"
        avatar={<Avatar initials="JD" size="sm" />}
        timestamp="Now"
      >
        <p>Testing at xs breakpoint — sidenav is hidden.</p>
      </MessageTurn>
    </ChatSurface>
  ),
};

/* ─── Responsive: sm viewport (mobile landscape / small tablet) ────────────── */

/** sm viewport — still no sidenav, slightly more padding. */
export const ResponsiveSm: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
  render: () => (
    <ChatSurface
      appBar={<AppBar title="Morpheus" density="compact" />}
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Conversations">
            <SideNavItem label="Session" active />
          </SideNavGroup>
        </SideNav>
      }
      composer={<PromptInput placeholder="Ask anything…" />}
    >
      <MessageTurn
        role="user"
        avatar={<Avatar initials="JD" size="sm" />}
        timestamp="Now"
      >
        <p>Testing at sm breakpoint — sidenav still hidden.</p>
      </MessageTurn>
    </ChatSurface>
  ),
};

/* ─── Responsive: md viewport (tablet portrait) ────────────────────────────── */

/** md viewport — collapsed sidenav (icon-only). */
export const ResponsiveMd: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <ChatSurface
      appBar={<AppBar title="Morpheus" />}
      sideNav={
        <SideNav aria-label="Chat history" collapsed>
          <SideNavGroup heading="Conversations" collapsed>
            <SideNavItem icon={<ChatIcon />} label="Session" active collapsed />
          </SideNavGroup>
        </SideNav>
      }
      sideNavCollapsed
      composer={<PromptInput placeholder="Ask anything…" />}
    >
      <MessageTurn
        role="user"
        avatar={<Avatar initials="JD" size="sm" />}
        timestamp="Now"
      >
        <p>Testing at md breakpoint — sidenav is collapsed to icon-only.</p>
      </MessageTurn>
    </ChatSurface>
  ),
};

/* ─── Responsive: lg viewport (desktop) ────────────────────────────────────── */

/** lg viewport — full sidenav (240px), standard spacing. */
export const ResponsiveLg: Story = {
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
  render: () => (
    <ChatSurface
      appBar={<AppBar title="Morpheus" />}
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Today">
            <SideNavItem icon={<ChatIcon />} label="Token architecture" active />
            <SideNavItem icon={<ChatIcon />} label="Motion timing" />
          </SideNavGroup>
        </SideNav>
      }
      composer={<PromptInput placeholder="Ask anything…" />}
    >
      <MessageTurn
        role="user"
        avatar={<Avatar initials="JD" size="sm" />}
        timestamp="Now"
      >
        <p>Testing at lg breakpoint — full sidenav with 240px width.</p>
      </MessageTurn>
    </ChatSurface>
  ),
};

/* ─── Responsive: xl viewport (wide desktop) ──────────────────────────────── */

/** xl viewport — full sidenav (260px), expanded padding. */
export const ResponsiveXl: Story = {
  parameters: {
    viewport: { defaultViewport: "1440px" },
    chromatic: { viewports: [1440] },
  },
  render: () => (
    <ChatSurface
      appBar={<AppBar title="Morpheus" />}
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Today">
            <SideNavItem icon={<ChatIcon />} label="Token architecture" active />
            <SideNavItem icon={<ChatIcon />} label="Motion timing" />
          </SideNavGroup>
        </SideNav>
      }
      composer={<PromptInput placeholder="Ask anything…" />}
    >
      <MessageTurn
        role="user"
        avatar={<Avatar initials="JD" size="sm" />}
        timestamp="Now"
      >
        <p>Testing at xl breakpoint — full sidenav with 260px width, expanded horizontal padding.</p>
      </MessageTurn>
    </ChatSurface>
  ),
};

/* ─── Responsive: 2xl viewport (ultrawide) ─────────────────────────────────── */

/** 2xl viewport — full sidenav (280px), content max-width 1440px, centered. */
export const Responsive2xl: Story = {
  parameters: {
    viewport: { defaultViewport: "1920px" },
    chromatic: { viewports: [1920] },
  },
  render: () => (
    <ChatSurface
      appBar={<AppBar title="Morpheus" />}
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Today">
            <SideNavItem icon={<ChatIcon />} label="Token architecture" active />
            <SideNavItem icon={<ChatIcon />} label="Motion timing" />
          </SideNavGroup>
        </SideNav>
      }
      composer={<PromptInput placeholder="Ask anything…" />}
    >
      <MessageTurn
        role="user"
        avatar={<Avatar initials="JD" size="sm" />}
        timestamp="Now"
      >
        <p>Testing at 2xl breakpoint — content capped at 1440px max-width, centered in the main area.</p>
      </MessageTurn>
    </ChatSurface>
  ),
};

/* ─── Dark + Light side-by-side comparison ─────────────────────────────────── */

/** Side-by-side dark + light comparison for visual review. */
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100dvh" }}>
      <div data-theme="dark" style={{ height: "100%" }}>
        <ChatSurface
          appBar={<AppBar title="Dark" />}
          composer={<PromptInput placeholder="Dark theme…" />}
        >
          <MessageTurn
            role="assistant"
            avatar={<Avatar initials="M" size="sm" shape="square" />}
            timestamp="Now"
            status="complete"
          >
            <StreamingText
              status="complete"
              content="Dark: ground n1000, surface n900, on-surface n50, accent a500."
            />
          </MessageTurn>
        </ChatSurface>
      </div>
      <div data-theme="light" style={{ height: "100%" }}>
        <ChatSurface
          appBar={<AppBar title="Light" />}
          composer={<PromptInput placeholder="Light theme…" />}
        >
          <MessageTurn
            role="assistant"
            avatar={<Avatar initials="M" size="sm" shape="square" />}
            timestamp="Now"
            status="complete"
          >
            <StreamingText
              status="complete"
              content="Light: ground n50, surface n0, on-surface n1000, accent a600."
            />
          </MessageTurn>
        </ChatSurface>
      </div>
    </div>
  ),
};

/* ─── Streaming / generation-in-progress ───────────────────────────────────── */

/**
 * Streaming — agent is actively generating a response.
 * Shows a partial StreamingText with in-progress status, AgentStatus thinking,
 * and disabled prompt input.
 */
export const Streaming: Story = {
  render: () => (
    <ChatSurface
      appBar={
        <AppBar
          title="Morpheus"
          trailing={
            <IconButton
              icon={<ThemeToggleIcon />}
              label="Toggle theme"
              variant="ghost"
              size="sm"
            />
          }
        />
      }
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Today">
            <SideNavItem icon={<ChatIcon />} label="Streaming demo" active />
          </SideNavGroup>
        </SideNav>
      }
      composer={
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-3)" }}>
          <AgentStatus state="thinking" />
          <PromptInput placeholder="Ask anything…" disabled />
        </div>
      }
    >
      <MessageTurn
        role="user"
        avatar={<Avatar initials="JD" size="sm" />}
        timestamp="11:20 AM"
      >
        <p>Explain how the motion system works in Morpheus.</p>
      </MessageTurn>

      <MessageTurn
        role="assistant"
        avatar={<Avatar initials="M" size="sm" shape="square" />}
        timestamp="11:20 AM"
        status="streaming"
      >
        <StreamingText
          status="streaming"
          content="Morpheus motion uses a dual-register grammar: productive motion (the default) is fast and confirming — it orients the user after an action. Expressive motion is reserved for earned moments, like onboarding reveals or completion celebrations. The timing scale runs t1 (80ms) through t5 (480ms), with t3 (220ms) as the standard duration for most transitions. Interactive elements use spring physics (response 0.4, damping 0.86) for natural feel, while non-interactive state changes"
        />
      </MessageTurn>
    </ChatSurface>
  ),
};

/* ─── Keyboard + focus accessibility showcase ──────────────────────────────── */

/**
 * Keyboard + accessibility — demonstrates the full keyboard path:
 * skip link, focus traversal through AppBar → SideNav → messages → composer.
 * All interactive elements have visible focus rings using morph-color-focus.
 *
 * Review checklist:
 * - Tab through: skip link → AppBar actions → SideNav items → message actions → composer
 * - Skip link visible on focus (bypasses chrome)
 * - Focus ring visible on all interactive elements (≥3:1 contrast)
 * - aria-live on message area for streaming announcements
 * - HITL card fully keyboard operable
 */
export const KeyboardAccessibility: Story = {
  render: () => (
    <ChatSurface
      appBar={
        <AppBar
          title="Morpheus"
          trailing={
            <IconButton
              icon={<ThemeToggleIcon />}
              label="Toggle theme"
              variant="ghost"
              size="sm"
            />
          }
        />
      }
      sideNav={
        <SideNav aria-label="Chat history">
          <SideNavGroup heading="Today">
            <SideNavItem icon={<ChatIcon />} label="Accessibility review" active />
            <SideNavItem icon={<ChatIcon />} label="Another session" />
          </SideNavGroup>
        </SideNav>
      }
      composer={
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--morph-space-3)" }}>
          <AgentStatus state="idle" />
          <PromptInput placeholder="Tab here to focus the composer…" />
          <SuggestionChips
            suggestions={[
              { id: "tab", label: "Tab through chips" },
              { id: "enter", label: "Press Enter to select" },
            ]}
          />
        </div>
      }
    >
      <MessageTurn
        role="assistant"
        avatar={<Avatar initials="M" size="sm" shape="square" />}
        timestamp="Now"
        status="complete"
        actions={<FeedbackControl value={null} />}
      >
        <StreamingText
          status="complete"
          content="Use Tab to traverse: skip link → AppBar → SideNav → message feedback actions → composer input → suggestion chips. Focus rings should be visible throughout (plum accent, ≥3:1 contrast against adjacent colors)."
        />
      </MessageTurn>
    </ChatSurface>
  ),
};
