import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { StreamingText } from "./StreamingText";

describe("StreamingText — aria-live region", () => {
  it("renders a status role with aria-live='polite'", () => {
    render(<StreamingText content="Hello" status="streaming" />);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-live", "polite");
  });

  it("uses aria-atomic='false' for incremental announcements", () => {
    render(<StreamingText content="Hello world" status="streaming" />);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-atomic", "false");
  });

  it("has an accessible label on the live region", () => {
    render(<StreamingText content="Some text" status="idle" />);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-label", "Streaming response");
  });

  it("accepts a custom aria-label", () => {
    render(
      <StreamingText
        content="Text"
        status="idle"
        aria-label="Code generation"
      />
    );
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-label", "Code generation");
  });
});

describe("StreamingText — aria-busy while streaming", () => {
  it("sets aria-busy='true' while streaming", () => {
    render(<StreamingText content="Loading..." status="streaming" />);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-busy", "true");
  });

  it("does not set aria-busy when idle", () => {
    render(<StreamingText content="" status="idle" />);
    const region = screen.getByRole("status");
    expect(region).not.toHaveAttribute("aria-busy");
  });

  it("does not set aria-busy when complete", () => {
    render(<StreamingText content="Done" status="complete" />);
    const region = screen.getByRole("status");
    expect(region).not.toHaveAttribute("aria-busy");
  });
});

describe("StreamingText — cursor", () => {
  it("shows a cursor while streaming", () => {
    const { container } = render(
      <StreamingText content="Typing..." status="streaming" />
    );
    const cursor = container.querySelector('[class*="cursor"]');
    expect(cursor).toBeInTheDocument();
    expect(cursor).toHaveAttribute("aria-hidden", "true");
  });

  it("hides the cursor when complete", () => {
    const { container } = render(
      <StreamingText content="Done" status="complete" />
    );
    const cursor = container.querySelector('[class*="cursor"]');
    expect(cursor).not.toBeInTheDocument();
  });

  it("hides the cursor when idle", () => {
    const { container } = render(
      <StreamingText content="" status="idle" />
    );
    const cursor = container.querySelector('[class*="cursor"]');
    expect(cursor).not.toBeInTheDocument();
  });
});

describe("StreamingText — completion state", () => {
  it("renders a reveal overlay on completion", () => {
    const { container } = render(
      <StreamingText content="Complete text" status="complete" />
    );
    const reveal = container.querySelector('[class*="reveal"]');
    expect(reveal).toBeInTheDocument();
    expect(reveal).toHaveAttribute("aria-hidden", "true");
  });

  it("does not render the reveal while streaming", () => {
    const { container } = render(
      <StreamingText content="Text" status="streaming" />
    );
    const reveal = container.querySelector('[class*="reveal"]');
    expect(reveal).not.toBeInTheDocument();
  });
});

describe("StreamingText — jump to end", () => {
  it("shows jump-to-end button when enabled and streaming", () => {
    render(
      <StreamingText content="Long text" status="streaming" showJumpToEnd />
    );
    expect(
      screen.getByRole("button", { name: "Jump to end of response" })
    ).toBeInTheDocument();
  });

  it("hides jump-to-end when not streaming", () => {
    render(
      <StreamingText content="Done" status="complete" showJumpToEnd />
    );
    expect(
      screen.queryByRole("button", { name: "Jump to end of response" })
    ).not.toBeInTheDocument();
  });

  it("calls onJumpToEnd callback when clicked", async () => {
    const user = userEvent.setup();
    const onJumpToEnd = vi.fn();
    render(
      <StreamingText
        content="Long text"
        status="streaming"
        showJumpToEnd
        onJumpToEnd={onJumpToEnd}
      />
    );
    await user.click(
      screen.getByRole("button", { name: "Jump to end of response" })
    );
    expect(onJumpToEnd).toHaveBeenCalledTimes(1);
  });
});

describe("StreamingText — density", () => {
  it("defaults to comfortable density", () => {
    const { container } = render(
      <StreamingText content="Text" status="idle" />
    );
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("data-density", "comfortable");
  });

  it("supports compact density", () => {
    const { container } = render(
      <StreamingText content="Text" status="idle" density="compact" />
    );
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("data-density", "compact");
  });
});

describe("StreamingText — content display", () => {
  it("renders the provided content", () => {
    render(<StreamingText content="Hello world" status="idle" />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders empty content for idle state", () => {
    render(<StreamingText content="" status="idle" />);
    const region = screen.getByRole("status");
    expect(region).toBeInTheDocument();
  });
});

describe("StreamingText — axe accessibility", () => {
  it("has no violations in idle state", async () => {
    const { container } = render(
      <StreamingText content="" status="idle" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations while streaming", async () => {
    const { container } = render(
      <StreamingText content="Streaming content..." status="streaming" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations when complete", async () => {
    const { container } = render(
      <StreamingText content="Complete response" status="complete" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with jump-to-end visible", async () => {
    const { container } = render(
      <StreamingText
        content="Long content"
        status="streaming"
        showJumpToEnd
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
