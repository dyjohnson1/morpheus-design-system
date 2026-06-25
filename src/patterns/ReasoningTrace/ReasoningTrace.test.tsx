import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { ReasoningTrace } from "./ReasoningTrace";

const steps = [
  "Analyzing the user's request",
  "Searching knowledge base",
  "Synthesizing response",
];

/* ─── Disclosure button — aria-expanded ─────────────────────────────────── */
describe("ReasoningTrace — disclosure button", () => {
  it("renders a trigger button with aria-expanded=false by default", () => {
    render(<ReasoningTrace steps={steps} />);
    const trigger = screen.getByRole("button", { name: /reasoning/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders a trigger button with aria-expanded=true when defaultExpanded", () => {
    render(<ReasoningTrace steps={steps} defaultExpanded />);
    const trigger = screen.getByRole("button", { name: /reasoning/i });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("supports custom label text on the trigger", () => {
    render(<ReasoningTrace steps={steps} label="Chain of thought" />);
    expect(screen.getByRole("button", { name: /chain of thought/i })).toBeInTheDocument();
  });
});

/* ─── aria-controls linking ─────────────────────────────────────────────── */
describe("ReasoningTrace — aria-controls", () => {
  it("trigger has aria-controls pointing to the content panel id", () => {
    render(<ReasoningTrace steps={steps} defaultExpanded />);
    const trigger = screen.getByRole("button");
    const controlsId = trigger.getAttribute("aria-controls");
    expect(controlsId).toBeTruthy();
    const panel = document.getElementById(controlsId!);
    expect(panel).toBeInTheDocument();
  });
});

/* ─── Content visibility ────────────────────────────────────────────────── */
describe("ReasoningTrace — content visibility", () => {
  it("content is hidden when collapsed", () => {
    render(<ReasoningTrace steps={steps} />);
    const trigger = screen.getByRole("button");
    const controlsId = trigger.getAttribute("aria-controls")!;
    const panel = document.getElementById(controlsId);
    expect(panel).toHaveAttribute("hidden");
  });

  it("content is visible when expanded", () => {
    render(<ReasoningTrace steps={steps} defaultExpanded />);
    const trigger = screen.getByRole("button");
    const controlsId = trigger.getAttribute("aria-controls")!;
    const panel = document.getElementById(controlsId);
    expect(panel).not.toHaveAttribute("hidden");
  });

  it("shows step content when expanded", () => {
    render(<ReasoningTrace steps={steps} defaultExpanded />);
    expect(screen.getByText("Analyzing the user's request")).toBeInTheDocument();
    expect(screen.getByText("Searching knowledge base")).toBeInTheDocument();
    expect(screen.getByText("Synthesizing response")).toBeInTheDocument();
  });

  it("does not render step content when collapsed", () => {
    render(<ReasoningTrace steps={steps} />);
    expect(screen.queryByText("Analyzing the user's request")).not.toBeInTheDocument();
  });
});

/* ─── Keyboard toggle ───────────────────────────────────────────────────── */
describe("ReasoningTrace — keyboard interaction", () => {
  it("toggles expanded on Enter key", () => {
    render(<ReasoningTrace steps={steps} />);
    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles expanded on Space key", () => {
    render(<ReasoningTrace steps={steps} />);
    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(trigger, { key: " " });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("click toggles expanded state", () => {
    render(<ReasoningTrace steps={steps} />);
    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

/* ─── Thinking status indicator ─────────────────────────────────────────── */
describe("ReasoningTrace — thinking status", () => {
  it("shows status text when thinking", () => {
    render(<ReasoningTrace steps={steps} status="thinking" />);
    expect(screen.getByText("thinking…")).toBeInTheDocument();
  });

  it("does not show status text when complete", () => {
    render(<ReasoningTrace steps={steps} status="complete" />);
    expect(screen.queryByText("thinking…")).not.toBeInTheDocument();
  });

  it("sets data-status attribute on root", () => {
    const { container } = render(<ReasoningTrace steps={steps} status="thinking" />);
    expect(container.firstElementChild).toHaveAttribute("data-status", "thinking");
  });
});

/* ─── Density ───────────────────────────────────────────────────────────── */
describe("ReasoningTrace — density", () => {
  it("sets data-density=comfortable by default", () => {
    const { container } = render(<ReasoningTrace steps={steps} />);
    expect(container.firstElementChild).toHaveAttribute("data-density", "comfortable");
  });

  it("sets data-density=compact when specified", () => {
    const { container } = render(<ReasoningTrace steps={steps} density="compact" />);
    expect(container.firstElementChild).toHaveAttribute("data-density", "compact");
  });
});

/* ─── Controlled mode ───────────────────────────────────────────────────── */
describe("ReasoningTrace — controlled", () => {
  it("respects controlled expanded prop", () => {
    const { rerender } = render(<ReasoningTrace steps={steps} expanded={false} />);
    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    rerender(<ReasoningTrace steps={steps} expanded={true} />);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onToggle when trigger is clicked", () => {
    const onToggle = vi.fn();
    render(<ReasoningTrace steps={steps} expanded={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────── */
describe("ReasoningTrace — forwardRef", () => {
  it("forwards ref to the root element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ReasoningTrace ref={ref} steps={steps} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ─── Not auto-read ─────────────────────────────────────────────────────── */
describe("ReasoningTrace — not auto-read by SR", () => {
  it("content panel does not have aria-live attribute", () => {
    render(<ReasoningTrace steps={steps} defaultExpanded />);
    const trigger = screen.getByRole("button");
    const controlsId = trigger.getAttribute("aria-controls")!;
    const panel = document.getElementById(controlsId);
    expect(panel).not.toHaveAttribute("aria-live");
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("ReasoningTrace — axe accessibility", () => {
  it("has no violations — collapsed", async () => {
    const { container } = render(<ReasoningTrace steps={steps} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — expanded", async () => {
    const { container } = render(<ReasoningTrace steps={steps} defaultExpanded />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — thinking", async () => {
    const { container } = render(
      <ReasoningTrace steps={steps} status="thinking" defaultExpanded />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact density", async () => {
    const { container } = render(
      <ReasoningTrace steps={steps} density="compact" defaultExpanded />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
