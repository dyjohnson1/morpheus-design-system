import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { FeedbackControl } from "./FeedbackControl";

/* ─── Semantic structure + aria ──────────────────────────────────────────── */
describe("FeedbackControl — semantic structure", () => {
  it("renders a button group with accessible label", () => {
    render(<FeedbackControl />);
    const group = screen.getByRole("group", { name: /response feedback/i });
    expect(group).toBeInTheDocument();
  });

  it("renders thumbs up button with correct aria-label", () => {
    render(<FeedbackControl />);
    const btn = screen.getByRole("button", { name: "Rate as helpful" });
    expect(btn).toBeInTheDocument();
  });

  it("renders thumbs down button with correct aria-label", () => {
    render(<FeedbackControl />);
    const btn = screen.getByRole("button", { name: "Rate as not helpful" });
    expect(btn).toBeInTheDocument();
  });

  it("sets aria-pressed=false when not selected", () => {
    render(<FeedbackControl value={null} />);
    expect(screen.getByRole("button", { name: "Rate as helpful" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(screen.getByRole("button", { name: "Rate as not helpful" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("sets aria-pressed=true on positive when value is positive", () => {
    render(<FeedbackControl value="positive" />);
    expect(screen.getByRole("button", { name: "Rate as helpful" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "Rate as not helpful" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("sets aria-pressed=true on negative when value is negative", () => {
    render(<FeedbackControl value="negative" />);
    expect(screen.getByRole("button", { name: "Rate as helpful" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(screen.getByRole("button", { name: "Rate as not helpful" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});

/* ─── Toggle behavior + callbacks ────────────────────────────────────────── */
describe("FeedbackControl — toggle behavior", () => {
  it("calls onFeedback with 'positive' when thumbs up is clicked", () => {
    const onFeedback = vi.fn();
    render(<FeedbackControl value={null} onFeedback={onFeedback} />);
    fireEvent.click(screen.getByRole("button", { name: "Rate as helpful" }));
    expect(onFeedback).toHaveBeenCalledWith("positive");
  });

  it("calls onFeedback with 'negative' when thumbs down is clicked", () => {
    const onFeedback = vi.fn();
    render(<FeedbackControl value={null} onFeedback={onFeedback} />);
    fireEvent.click(screen.getByRole("button", { name: "Rate as not helpful" }));
    expect(onFeedback).toHaveBeenCalledWith("negative");
  });

  it("calls onFeedback with null when same button is clicked (deselect)", () => {
    const onFeedback = vi.fn();
    render(<FeedbackControl value="positive" onFeedback={onFeedback} />);
    fireEvent.click(screen.getByRole("button", { name: "Rate as helpful" }));
    expect(onFeedback).toHaveBeenCalledWith(null);
  });

  it("calls onFeedback with 'negative' when switching from positive", () => {
    const onFeedback = vi.fn();
    render(<FeedbackControl value="positive" onFeedback={onFeedback} />);
    fireEvent.click(screen.getByRole("button", { name: "Rate as not helpful" }));
    expect(onFeedback).toHaveBeenCalledWith("negative");
  });
});

/* ─── Disabled state ─────────────────────────────────────────────────────── */
describe("FeedbackControl — disabled state", () => {
  it("disables both buttons when disabled prop is true", () => {
    render(<FeedbackControl disabled />);
    expect(screen.getByRole("button", { name: "Rate as helpful" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Rate as not helpful" })).toBeDisabled();
  });

  it("does not call onFeedback when disabled", () => {
    const onFeedback = vi.fn();
    render(<FeedbackControl disabled onFeedback={onFeedback} />);
    fireEvent.click(screen.getByRole("button", { name: "Rate as helpful" }));
    expect(onFeedback).not.toHaveBeenCalled();
  });
});

/* ─── Text field ─────────────────────────────────────────────────────────── */
describe("FeedbackControl — text field", () => {
  it("does not show text field when showTextField is false", () => {
    render(<FeedbackControl value="positive" showTextField={false} />);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("does not show text field when value is null even if showTextField is true", () => {
    render(<FeedbackControl value={null} showTextField />);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("shows text field when showTextField is true and value is selected", () => {
    render(<FeedbackControl value="negative" showTextField />);
    expect(screen.getByRole("textbox", { name: /additional feedback/i })).toBeInTheDocument();
  });

  it("shows submit button when text field is visible", () => {
    render(<FeedbackControl value="positive" showTextField />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("submit button is disabled when textarea is empty", () => {
    render(<FeedbackControl value="positive" showTextField />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  it("calls onTextSubmit with trimmed text when submit is clicked", () => {
    const onTextSubmit = vi.fn();
    render(<FeedbackControl value="positive" showTextField onTextSubmit={onTextSubmit} />);
    const textarea = screen.getByRole("textbox", { name: /additional feedback/i });
    fireEvent.change(textarea, { target: { value: "  Great response  " } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(onTextSubmit).toHaveBeenCalledWith("Great response");
  });
});

/* ─── Keyboard operability ───────────────────────────────────────────────── */
describe("FeedbackControl — keyboard", () => {
  it("feedback buttons respond to click (native keyboard Enter/Space)", () => {
    const onFeedback = vi.fn();
    render(<FeedbackControl value={null} onFeedback={onFeedback} />);
    const btn = screen.getByRole("button", { name: "Rate as helpful" });
    fireEvent.click(btn);
    expect(onFeedback).toHaveBeenCalledWith("positive");
  });
});

/* ─── Density ────────────────────────────────────────────────────────────── */
describe("FeedbackControl — density", () => {
  it("sets data-density=comfortable by default", () => {
    const { container } = render(<FeedbackControl />);
    expect(container.firstElementChild).toHaveAttribute("data-density", "comfortable");
  });

  it("sets data-density=compact when specified", () => {
    const { container } = render(<FeedbackControl density="compact" />);
    expect(container.firstElementChild).toHaveAttribute("data-density", "compact");
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────── */
describe("FeedbackControl — forwardRef", () => {
  it("forwards ref to the root element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<FeedbackControl ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ─── Axe accessibility ──────────────────────────────────────────────────── */
describe("FeedbackControl — axe accessibility", () => {
  it("has no violations — rest state", async () => {
    const { container } = render(<FeedbackControl value={null} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — positive selected", async () => {
    const { container } = render(<FeedbackControl value="positive" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with text field", async () => {
    const { container } = render(<FeedbackControl value="negative" showTextField />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — disabled", async () => {
    const { container } = render(<FeedbackControl disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact density", async () => {
    const { container } = render(<FeedbackControl density="compact" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
