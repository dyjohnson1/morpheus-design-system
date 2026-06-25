import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { MessageTurn } from "./MessageTurn";

describe("MessageTurn — role and semantics", () => {
  it("renders as an article element", () => {
    render(<MessageTurn role="user">Hello</MessageTurn>);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("has an accessible label for user messages", () => {
    render(<MessageTurn role="user">Hello</MessageTurn>);
    expect(
      screen.getByRole("article", { name: "Message from you" })
    ).toBeInTheDocument();
  });

  it("has an accessible label for assistant messages", () => {
    render(<MessageTurn role="assistant">Hi there</MessageTurn>);
    expect(
      screen.getByRole("article", { name: "Message from assistant" })
    ).toBeInTheDocument();
  });

  it("accepts a custom aria-label", () => {
    render(
      <MessageTurn role="assistant" aria-label="Reply from Morpheus">
        Content
      </MessageTurn>
    );
    expect(
      screen.getByRole("article", { name: "Reply from Morpheus" })
    ).toBeInTheDocument();
  });
});

describe("MessageTurn — user vs assistant differentiation", () => {
  it("sets data-role='user' for user messages", () => {
    render(<MessageTurn role="user">Hello</MessageTurn>);
    expect(screen.getByRole("article")).toHaveAttribute("data-role", "user");
  });

  it("sets data-role='assistant' for assistant messages", () => {
    render(<MessageTurn role="assistant">Hi</MessageTurn>);
    expect(screen.getByRole("article")).toHaveAttribute(
      "data-role",
      "assistant"
    );
  });
});

describe("MessageTurn — status", () => {
  it("defaults to complete status", () => {
    render(<MessageTurn role="assistant">Done</MessageTurn>);
    expect(screen.getByRole("article")).toHaveAttribute(
      "data-status",
      "complete"
    );
  });

  it("sets streaming status with aria-busy on content", () => {
    render(
      <MessageTurn role="assistant" status="streaming">
        Loading...
      </MessageTurn>
    );
    expect(screen.getByRole("article")).toHaveAttribute(
      "data-status",
      "streaming"
    );
    // The content region should be busy
    expect(screen.getByText("Loading...").closest("[aria-busy]")).toHaveAttribute(
      "aria-busy",
      "true"
    );
  });

  it("announces streaming status text via a live region", () => {
    render(
      <MessageTurn role="assistant" status="streaming">
        Generating...
      </MessageTurn>
    );
    const statusEl = screen.getByRole("status");
    expect(statusEl).toHaveTextContent("Generating response");
  });

  it("announces error status text via a live region", () => {
    render(
      <MessageTurn role="assistant" status="error">
        Failed content
      </MessageTurn>
    );
    const statusEl = screen.getByRole("status");
    expect(statusEl).toHaveTextContent("Message failed");
  });
});

describe("MessageTurn — timestamp", () => {
  it("renders a timestamp when provided", () => {
    render(
      <MessageTurn role="user" timestamp="3:45 PM">
        Hello
      </MessageTurn>
    );
    expect(screen.getByText("3:45 PM")).toBeInTheDocument();
  });

  it("uses a time element for the timestamp", () => {
    const { container } = render(
      <MessageTurn role="user" timestamp="3:45 PM">
        Hello
      </MessageTurn>
    );
    expect(container.querySelector("time")).toBeInTheDocument();
  });

  it("does not render timestamp when not provided", () => {
    const { container } = render(
      <MessageTurn role="user">Hello</MessageTurn>
    );
    expect(container.querySelector("time")).not.toBeInTheDocument();
  });
});

describe("MessageTurn — actions slot", () => {
  it("renders actions when provided", () => {
    render(
      <MessageTurn
        role="assistant"
        actions={<button type="button">Copy</button>}
      >
        Some content
      </MessageTurn>
    );
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });

  it("does not render actions container when not provided", () => {
    const { container } = render(
      <MessageTurn role="assistant">Some content</MessageTurn>
    );
    expect(container.querySelector('[class*="actions"]')).not.toBeInTheDocument();
  });
});

describe("MessageTurn — density", () => {
  it("defaults to comfortable density", () => {
    render(<MessageTurn role="user">Hello</MessageTurn>);
    expect(screen.getByRole("article")).toHaveAttribute(
      "data-density",
      "comfortable"
    );
  });

  it("supports compact density", () => {
    render(
      <MessageTurn role="user" density="compact">
        Hello
      </MessageTurn>
    );
    expect(screen.getByRole("article")).toHaveAttribute(
      "data-density",
      "compact"
    );
  });
});

describe("MessageTurn — avatar", () => {
  it("renders avatar when provided", () => {
    render(
      <MessageTurn
        role="assistant"
        avatar={<span data-testid="avatar-el">A</span>}
      >
        Content
      </MessageTurn>
    );
    expect(screen.getByTestId("avatar-el")).toBeInTheDocument();
  });

  it("hides avatar from assistive technology", () => {
    const { container } = render(
      <MessageTurn
        role="assistant"
        avatar={<span>A</span>}
      >
        Content
      </MessageTurn>
    );
    const avatarWrapper = container.querySelector('[class*="avatar"]');
    expect(avatarWrapper).toHaveAttribute("aria-hidden", "true");
  });
});

describe("MessageTurn — axe accessibility", () => {
  it("has no violations for user message", async () => {
    const { container } = render(
      <MessageTurn role="user" timestamp="2:00 PM">
        User content
      </MessageTurn>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations for assistant message", async () => {
    const { container } = render(
      <MessageTurn role="assistant" timestamp="2:01 PM">
        Assistant content
      </MessageTurn>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations for streaming state", async () => {
    const { container } = render(
      <MessageTurn role="assistant" status="streaming">
        Streaming content...
      </MessageTurn>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations for error state", async () => {
    const { container } = render(
      <MessageTurn role="assistant" status="error">
        Error content
      </MessageTurn>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with all props populated", async () => {
    const { container } = render(
      <MessageTurn
        role="assistant"
        avatar={<span>A</span>}
        timestamp="2:02 PM"
        actions={<button type="button">Copy</button>}
        status="complete"
      >
        Full message content
      </MessageTurn>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
