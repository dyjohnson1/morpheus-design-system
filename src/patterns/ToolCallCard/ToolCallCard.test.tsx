import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { ToolCallCard } from "./ToolCallCard";

const defaultProps = {
  name: "database_query",
  description: "Fetching active user records",
};

const detailContent = <pre>{"{ query: 'SELECT * FROM users' }"}</pre>;

/* ─── Article role + aria-label ─────────────────────────────────────────── */
describe("ToolCallCard — semantic structure", () => {
  it("renders as an article with a descriptive aria-label", () => {
    render(<ToolCallCard {...defaultProps} />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute(
      "aria-label",
      "Tool call: database_query, status: Pending"
    );
  });

  it("updates aria-label when status changes", () => {
    render(<ToolCallCard {...defaultProps} status="success" />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute(
      "aria-label",
      "Tool call: database_query, status: Completed"
    );
  });
});

/* ─── Status icon + text (never color alone) ────────────────────────────── */
describe("ToolCallCard — status indicator", () => {
  it("shows 'Pending' text for pending status", () => {
    render(<ToolCallCard {...defaultProps} status="pending" />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("shows 'Running' text for running status", () => {
    render(<ToolCallCard {...defaultProps} status="running" />);
    expect(screen.getByText("Running")).toBeInTheDocument();
  });

  it("shows 'Completed' text for success status", () => {
    render(<ToolCallCard {...defaultProps} status="success" />);
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("shows 'Failed' text for error status", () => {
    render(<ToolCallCard {...defaultProps} status="error" />);
    expect(screen.getByText("Failed")).toBeInTheDocument();
  });

  it("renders a status icon (SVG) alongside text", () => {
    const { container } = render(<ToolCallCard {...defaultProps} status="success" />);
    const statusIcon = container.querySelector('[class*="statusIcon"] svg');
    expect(statusIcon).toBeInTheDocument();
  });

  it("sets data-status attribute on root", () => {
    render(<ToolCallCard {...defaultProps} status="error" />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-status", "error");
  });
});

/* ─── Tool name and description ─────────────────────────────────────────── */
describe("ToolCallCard — content", () => {
  it("renders the tool name", () => {
    render(<ToolCallCard {...defaultProps} />);
    expect(screen.getByText("database_query")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<ToolCallCard {...defaultProps} />);
    expect(screen.getByText("Fetching active user records")).toBeInTheDocument();
  });

  it("renders duration when provided", () => {
    render(<ToolCallCard {...defaultProps} duration="1.2s" />);
    expect(screen.getByText("1.2s")).toBeInTheDocument();
  });

  it("renders custom icon", () => {
    const icon = <svg data-testid="custom-icon" />;
    render(<ToolCallCard {...defaultProps} icon={icon} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });
});

/* ─── Source URL as real link ───────────────────────────────────────────── */
describe("ToolCallCard — sourceUrl", () => {
  it("renders a real anchor element for sourceUrl", () => {
    render(
      <ToolCallCard
        {...defaultProps}
        sourceUrl="https://example.com/docs"
        sourceLabel="API Docs"
      />
    );
    const link = screen.getByRole("link", { name: "API Docs" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com/docs");
  });

  it("uses default label 'Source' when sourceLabel not provided", () => {
    render(<ToolCallCard {...defaultProps} sourceUrl="https://example.com" />);
    const link = screen.getByRole("link", { name: "Source" });
    expect(link).toBeInTheDocument();
  });

  it("opens in new tab with noopener noreferrer", () => {
    render(<ToolCallCard {...defaultProps} sourceUrl="https://example.com" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

/* ─── Collapsible detail section ────────────────────────────────────────── */
describe("ToolCallCard — collapsible detail", () => {
  it("renders a trigger button with aria-expanded=false by default", () => {
    render(<ToolCallCard {...defaultProps} detail={detailContent} />);
    const trigger = screen.getByRole("button", { name: /details/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders trigger with aria-expanded=true when defaultExpanded", () => {
    render(<ToolCallCard {...defaultProps} detail={detailContent} defaultExpanded />);
    const trigger = screen.getByRole("button", { name: /details/i });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("trigger has aria-controls pointing to the detail panel", () => {
    render(<ToolCallCard {...defaultProps} detail={detailContent} defaultExpanded />);
    const trigger = screen.getByRole("button", { name: /details/i });
    const controlsId = trigger.getAttribute("aria-controls");
    expect(controlsId).toBeTruthy();
    const panel = document.getElementById(controlsId!);
    expect(panel).toBeInTheDocument();
  });

  it("detail content is hidden when collapsed", () => {
    render(<ToolCallCard {...defaultProps} detail={detailContent} />);
    const trigger = screen.getByRole("button", { name: /details/i });
    const controlsId = trigger.getAttribute("aria-controls")!;
    const panel = document.getElementById(controlsId);
    expect(panel).toHaveAttribute("hidden");
  });

  it("detail content is visible when expanded", () => {
    render(<ToolCallCard {...defaultProps} detail={detailContent} defaultExpanded />);
    const trigger = screen.getByRole("button", { name: /details/i });
    const controlsId = trigger.getAttribute("aria-controls")!;
    const panel = document.getElementById(controlsId);
    expect(panel).not.toHaveAttribute("hidden");
  });

  it("does not render detail trigger when no detail prop", () => {
    render(<ToolCallCard {...defaultProps} />);
    expect(screen.queryByRole("button", { name: /details/i })).not.toBeInTheDocument();
  });
});

/* ─── Keyboard interaction ──────────────────────────────────────────────── */
describe("ToolCallCard — keyboard interaction", () => {
  it("toggles detail on Enter key", () => {
    render(<ToolCallCard {...defaultProps} detail={detailContent} />);
    const trigger = screen.getByRole("button", { name: /details/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles detail on Space key", () => {
    render(<ToolCallCard {...defaultProps} detail={detailContent} />);
    const trigger = screen.getByRole("button", { name: /details/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(trigger, { key: " " });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles detail on click", () => {
    render(<ToolCallCard {...defaultProps} detail={detailContent} />);
    const trigger = screen.getByRole("button", { name: /details/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

/* ─── Controlled mode ───────────────────────────────────────────────────── */
describe("ToolCallCard — controlled", () => {
  it("respects controlled expanded prop", () => {
    const { rerender } = render(
      <ToolCallCard {...defaultProps} detail={detailContent} expanded={false} />
    );
    const trigger = screen.getByRole("button", { name: /details/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    rerender(<ToolCallCard {...defaultProps} detail={detailContent} expanded={true} />);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onToggle when trigger is clicked", () => {
    const onToggle = vi.fn();
    render(
      <ToolCallCard {...defaultProps} detail={detailContent} expanded={false} onToggle={onToggle} />
    );
    fireEvent.click(screen.getByRole("button", { name: /details/i }));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

/* ─── Density ───────────────────────────────────────────────────────────── */
describe("ToolCallCard — density", () => {
  it("sets data-density=comfortable by default", () => {
    render(<ToolCallCard {...defaultProps} />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-density", "comfortable");
  });

  it("sets data-density=compact when specified", () => {
    render(<ToolCallCard {...defaultProps} density="compact" />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-density", "compact");
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────── */
describe("ToolCallCard — forwardRef", () => {
  it("forwards ref to the root article element", () => {
    const ref = React.createRef<HTMLElement>();
    render(<ToolCallCard ref={ref} {...defaultProps} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("ARTICLE");
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("ToolCallCard — axe accessibility", () => {
  it("has no violations — pending", async () => {
    const { container } = render(<ToolCallCard {...defaultProps} status="pending" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — running", async () => {
    const { container } = render(<ToolCallCard {...defaultProps} status="running" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — success with detail expanded", async () => {
    const { container } = render(
      <ToolCallCard {...defaultProps} status="success" detail={detailContent} defaultExpanded />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — error", async () => {
    const { container } = render(<ToolCallCard {...defaultProps} status="error" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with sourceUrl", async () => {
    const { container } = render(
      <ToolCallCard {...defaultProps} sourceUrl="https://example.com" sourceLabel="Docs" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact density", async () => {
    const { container } = render(
      <ToolCallCard {...defaultProps} density="compact" detail={detailContent} defaultExpanded />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
