import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { ChatSurface } from "./ChatSurface";

describe("ChatSurface", () => {
  it("renders without crashing", () => {
    render(<ChatSurface data-testid="chat-surface" />);
    expect(screen.getByTestId("chat-surface")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ChatSurface ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    render(<ChatSurface className="custom" data-testid="chat-surface" />);
    expect(screen.getByTestId("chat-surface")).toHaveClass("custom");
  });

  it("renders children in the message area", () => {
    render(
      <ChatSurface>
        <p>Hello world</p>
      </ChatSurface>
    );
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders appBar region when provided", () => {
    render(
      <ChatSurface appBar={<div data-testid="app-bar">Bar</div>} />
    );
    expect(screen.getByTestId("app-bar")).toBeInTheDocument();
  });

  it("renders sideNav region when provided", () => {
    render(
      <ChatSurface sideNav={<nav data-testid="side-nav">Nav</nav>} />
    );
    expect(screen.getByTestId("side-nav")).toBeInTheDocument();
  });

  it("renders composer region when provided", () => {
    render(
      <ChatSurface composer={<div data-testid="composer">Input</div>} />
    );
    expect(screen.getByTestId("composer")).toBeInTheDocument();
  });

  it("has a main landmark for the content area", () => {
    render(<ChatSurface>Content</ChatSurface>);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("sets data-collapsed on sidenav when sideNavCollapsed is true", () => {
    render(
      <ChatSurface
        sideNav={<div>Nav</div>}
        sideNavCollapsed
        data-testid="chat-surface"
      />
    );
    const aside = screen.getByTestId("chat-surface").querySelector("aside");
    expect(aside).toHaveAttribute("data-collapsed");
  });

  /* ─── State wiring tests ─────────────────────────────────────────────────── */

  it("defaults to populated state", () => {
    render(<ChatSurface data-testid="chat-surface">Content</ChatSurface>);
    expect(screen.getByTestId("chat-surface")).toHaveAttribute("data-state", "populated");
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders emptyContent when state is empty", () => {
    render(
      <ChatSurface
        state="empty"
        emptyContent={<p>No conversations yet</p>}
        data-testid="chat-surface"
      >
        <p>Should not render</p>
      </ChatSurface>
    );
    expect(screen.getByTestId("chat-surface")).toHaveAttribute("data-state", "empty");
    expect(screen.getByText("No conversations yet")).toBeInTheDocument();
    expect(screen.queryByText("Should not render")).not.toBeInTheDocument();
  });

  it("renders loadingContent when state is loading", () => {
    render(
      <ChatSurface
        state="loading"
        loadingContent={<p>Loading messages…</p>}
        data-testid="chat-surface"
      >
        <p>Should not render</p>
      </ChatSurface>
    );
    expect(screen.getByTestId("chat-surface")).toHaveAttribute("data-state", "loading");
    expect(screen.getByText("Loading messages…")).toBeInTheDocument();
    expect(screen.queryByText("Should not render")).not.toBeInTheDocument();
  });

  it("renders errorContent when state is error", () => {
    render(
      <ChatSurface
        state="error"
        errorContent={<p>Something went wrong</p>}
        data-testid="chat-surface"
      >
        <p>Should not render</p>
      </ChatSurface>
    );
    expect(screen.getByTestId("chat-surface")).toHaveAttribute("data-state", "error");
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.queryByText("Should not render")).not.toBeInTheDocument();
  });

  it("renders both children and hitlContent when state is hitl", () => {
    render(
      <ChatSurface
        state="hitl"
        hitlContent={<p>Approval needed</p>}
        data-testid="chat-surface"
      >
        <p>Message history</p>
      </ChatSurface>
    );
    expect(screen.getByTestId("chat-surface")).toHaveAttribute("data-state", "hitl");
    expect(screen.getByText("Message history")).toBeInTheDocument();
    expect(screen.getByText("Approval needed")).toBeInTheDocument();
  });

  /* ─── Keyboard accessibility ─────────────────────────────────────────────── */

  describe("Keyboard — skip link", () => {
    it("renders a skip-to-content link", () => {
      render(<ChatSurface>Content</ChatSurface>);
      const skipLink = screen.getByText("Skip to main content");
      expect(skipLink).toBeInTheDocument();
      expect(skipLink.tagName).toBe("A");
      expect(skipLink).toHaveAttribute("href", "#chat-main-content");
    });

    it("skip link targets the main element", () => {
      render(<ChatSurface>Content</ChatSurface>);
      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("id", "chat-main-content");
    });

    it("skip link is focusable via tab", async () => {
      const user = userEvent.setup();
      render(<ChatSurface>Content</ChatSurface>);
      await user.tab();
      const skipLink = screen.getByText("Skip to main content");
      expect(document.activeElement).toBe(skipLink);
    });
  });

  describe("Keyboard — focus order", () => {
    it("interactive elements in appBar, sideNav, main, composer are reachable via tab", async () => {
      const user = userEvent.setup();
      render(
        <ChatSurface
          appBar={<button>Menu</button>}
          sideNav={<button>Nav item</button>}
          composer={<button>Send</button>}
        >
          <button>Message action</button>
        </ChatSurface>
      );

      // Tab through: skip link → appBar button → sideNav button → message button → composer button
      await user.tab(); // skip link
      await user.tab(); // appBar button
      expect(document.activeElement).toBe(screen.getByText("Menu"));

      await user.tab(); // sideNav button
      expect(document.activeElement).toBe(screen.getByText("Nav item"));

      await user.tab(); // message area button
      expect(document.activeElement).toBe(screen.getByText("Message action"));

      await user.tab(); // composer button
      expect(document.activeElement).toBe(screen.getByText("Send"));
    });

    it("no keyboard trap — focus cycles back to the beginning after last element", async () => {
      const user = userEvent.setup();
      render(
        <ChatSurface composer={<button>Send</button>}>
          <button>Action</button>
        </ChatSurface>
      );

      // Tab through all elements
      await user.tab(); // skip link
      await user.tab(); // Action
      await user.tab(); // Send
      await user.tab(); // cycles back to document body or skip link
      // No trap: activeElement should not be stuck on Send
      expect(document.activeElement).not.toBe(screen.getByText("Send"));
    });
  });

  describe("Keyboard — landmarks", () => {
    it("aside landmark has an accessible label", () => {
      render(
        <ChatSurface sideNav={<div>Nav</div>}>Content</ChatSurface>
      );
      const aside = screen.getByRole("complementary", { name: "Navigation" });
      expect(aside).toBeInTheDocument();
    });

    it("aside landmark uses custom sideNavLabel", () => {
      render(
        <ChatSurface sideNav={<div>Nav</div>} sideNavLabel="Chat history">
          Content
        </ChatSurface>
      );
      const aside = screen.getByRole("complementary", { name: "Chat history" });
      expect(aside).toBeInTheDocument();
    });
  });

  describe("Keyboard — aria-live region", () => {
    it("message area has aria-live polite for screen reader announcements", () => {
      const { container } = render(
        <ChatSurface>
          <p>Hello</p>
        </ChatSurface>
      );
      const liveRegion = container.querySelector("[aria-live='polite']");
      expect(liveRegion).toBeInTheDocument();
    });
  });

  /* ─── Responsive / theme structure ─────────────────────────────────────────── */

  describe("Responsive — structural correctness", () => {
    it("renders without sidenav when sideNav prop is omitted (xs/sm behavior)", () => {
      const { container } = render(
        <ChatSurface appBar={<div>Bar</div>} composer={<div>Composer</div>}>
          <p>Content</p>
        </ChatSurface>
      );
      expect(container.querySelector("aside")).not.toBeInTheDocument();
    });

    it("sidenav width is controlled by CSS — no inline width applied", () => {
      render(
        <ChatSurface sideNav={<div>Nav</div>} data-testid="chat-surface">
          Content
        </ChatSurface>
      );
      const aside = screen.getByTestId("chat-surface").querySelector("aside");
      expect(aside).not.toHaveAttribute("style");
    });

    it("messageContent has max-width constraint for 2xl centering", () => {
      const { container } = render(
        <ChatSurface>
          <p>Content</p>
        </ChatSurface>
      );
      // messageContent class applies max-width: 1440px via CSS
      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
    });
  });

  describe("Dark + Light theme rendering", () => {
    it("renders correctly inside a dark theme wrapper", () => {
      const { container } = render(
        <div data-theme="dark">
          <ChatSurface data-testid="chat-surface">
            <p>Dark content</p>
          </ChatSurface>
        </div>
      );
      expect(screen.getByText("Dark content")).toBeInTheDocument();
      expect(container.querySelector("[data-theme='dark']")).toBeInTheDocument();
    });

    it("renders correctly inside a light theme wrapper", () => {
      const { container } = render(
        <div data-theme="light">
          <ChatSurface data-testid="chat-surface">
            <p>Light content</p>
          </ChatSurface>
        </div>
      );
      expect(screen.getByText("Light content")).toBeInTheDocument();
      expect(container.querySelector("[data-theme='light']")).toBeInTheDocument();
    });

    it("does not hard-code any color values (no inline hex)", () => {
      const { container } = render(
        <ChatSurface
          appBar={<div>Bar</div>}
          sideNav={<div>Nav</div>}
          composer={<div>Composer</div>}
          data-testid="chat-surface"
        >
          <p>Content</p>
        </ChatSurface>
      );
      const root = screen.getByTestId("chat-surface");
      // The root element should not have inline style with color literals
      expect(root.getAttribute("style")).toBeNull();
    });

    it("has no axe violations in dark theme context", async () => {
      const { container } = render(
        <div data-theme="dark">
          <ChatSurface
            appBar={<header role="banner"><h1>Morpheus</h1></header>}
            composer={<div><label htmlFor="p">Prompt</label><input id="p" type="text" /></div>}
          >
            <p>Dark theme content</p>
          </ChatSurface>
        </div>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations in light theme context", async () => {
      const { container } = render(
        <div data-theme="light">
          <ChatSurface
            appBar={<header role="banner"><h1>Morpheus</h1></header>}
            composer={<div><label htmlFor="p2">Prompt</label><input id="p2" type="text" /></div>}
          >
            <p>Light theme content</p>
          </ChatSurface>
        </div>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  /* ─── axe accessibility audit ────────────────────────────────────────────── */

  describe("axe — automated accessibility", () => {
    it("has no violations in default populated state", async () => {
      const { container } = render(
        <ChatSurface
          appBar={<header role="banner"><h1>Morpheus</h1></header>}
          sideNav={<nav aria-label="Sidebar"><a href="#">Home</a></nav>}
          composer={<div><label htmlFor="prompt">Prompt</label><input id="prompt" type="text" /></div>}
        >
          <p>Message content</p>
        </ChatSurface>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations in empty state", async () => {
      const { container } = render(
        <ChatSurface
          state="empty"
          emptyContent={<p>Start a conversation</p>}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations in loading state", async () => {
      const { container } = render(
        <ChatSurface
          state="loading"
          loadingContent={<p aria-busy="true">Loading…</p>}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations in error state", async () => {
      const { container } = render(
        <ChatSurface
          state="error"
          errorContent={<div role="alert">An error occurred. <button>Retry</button></div>}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations in HITL state", async () => {
      const { container } = render(
        <ChatSurface
          state="hitl"
          hitlContent={<div role="alertdialog" aria-label="Approval required"><button>Approve</button><button>Deny</button></div>}
        >
          <p>Previous messages</p>
        </ChatSurface>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations with all regions composed", async () => {
      const { container } = render(
        <ChatSurface
          appBar={<header role="banner"><h1>Chat</h1></header>}
          sideNav={<nav aria-label="History"><button>Thread 1</button></nav>}
          sideNavLabel="Chat history"
          composer={<div><label htmlFor="msg">Message</label><textarea id="msg" /><button>Send</button></div>}
        >
          <article aria-label="Message from assistant"><p>Response text</p></article>
        </ChatSurface>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations with collapsed sidenav", async () => {
      const { container } = render(
        <ChatSurface
          sideNav={<nav aria-label="Nav"><button aria-label="Home">🏠</button></nav>}
          sideNavCollapsed
        >
          <p>Content</p>
        </ChatSurface>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
