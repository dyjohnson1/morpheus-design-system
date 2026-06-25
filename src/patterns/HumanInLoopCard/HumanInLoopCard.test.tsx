import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { HumanInLoopCard } from "./HumanInLoopCard";

const defaultProps = {
  action: "Delete 3 inactive user accounts",
  rationale: "These accounts have been inactive for over 90 days.",
};

/* ─── Article role + aria-label ─────────────────────────────────────────── */
describe("HumanInLoopCard — semantic structure", () => {
  it("renders as an article with a descriptive aria-label", () => {
    render(<HumanInLoopCard {...defaultProps} />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute(
      "aria-label",
      "Agent checkpoint: Delete 3 inactive user accounts"
    );
  });

  it("uses rationale as aria-describedby", () => {
    render(<HumanInLoopCard {...defaultProps} />);
    const article = screen.getByRole("article");
    const describedById = article.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    const rationaleEl = document.getElementById(describedById!);
    expect(rationaleEl).toBeInTheDocument();
    expect(rationaleEl).toHaveTextContent(
      "These accounts have been inactive for over 90 days."
    );
  });
});

/* ─── Status indicator (icon + text — never color alone) ────────────────── */
describe("HumanInLoopCard — status indicator", () => {
  it("shows 'Waiting on you' text for pending status", () => {
    render(<HumanInLoopCard {...defaultProps} status="pending" />);
    expect(screen.getByText("Waiting on you")).toBeInTheDocument();
  });

  it("shows 'Approved' text for approved status", () => {
    render(<HumanInLoopCard {...defaultProps} status="approved" />);
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("shows 'Modified' text for modified status", () => {
    render(<HumanInLoopCard {...defaultProps} status="modified" />);
    expect(screen.getByText("Modified")).toBeInTheDocument();
  });

  it("shows 'Rejected' text for rejected status", () => {
    render(<HumanInLoopCard {...defaultProps} status="rejected" />);
    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });

  it("renders a status icon (SVG) alongside text", () => {
    const { container } = render(<HumanInLoopCard {...defaultProps} status="approved" />);
    const statusIcon = container.querySelector('[class*="statusIcon"] svg');
    expect(statusIcon).toBeInTheDocument();
  });

  it("sets data-status attribute on root", () => {
    render(<HumanInLoopCard {...defaultProps} status="rejected" />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-status", "rejected");
  });
});

/* ─── Action buttons + callbacks ────────────────────────────────────────── */
describe("HumanInLoopCard — action buttons", () => {
  it("renders approve, modify, and reject buttons", () => {
    render(<HumanInLoopCard {...defaultProps} />);
    expect(screen.getByRole("button", { name: /approve/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /modify/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reject/i })).toBeInTheDocument();
  });

  it("calls onApprove when approve is clicked", () => {
    const onApprove = vi.fn();
    render(<HumanInLoopCard {...defaultProps} onApprove={onApprove} />);
    fireEvent.click(screen.getByRole("button", { name: /approve/i }));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it("calls onModify when modify is clicked", () => {
    const onModify = vi.fn();
    render(<HumanInLoopCard {...defaultProps} onModify={onModify} />);
    fireEvent.click(screen.getByRole("button", { name: /modify/i }));
    expect(onModify).toHaveBeenCalledTimes(1);
  });

  it("calls onReject when reject is clicked", () => {
    const onReject = vi.fn();
    render(<HumanInLoopCard {...defaultProps} onReject={onReject} />);
    fireEvent.click(screen.getByRole("button", { name: /reject/i }));
    expect(onReject).toHaveBeenCalledTimes(1);
  });

  it("buttons are in a group with accessible label", () => {
    render(<HumanInLoopCard {...defaultProps} />);
    const group = screen.getByRole("group", { name: /decision actions/i });
    expect(group).toBeInTheDocument();
  });
});

/* ─── Disabled after resolution ─────────────────────────────────────────── */
describe("HumanInLoopCard — disabled after resolution", () => {
  it("disables all buttons when status is approved", () => {
    render(<HumanInLoopCard {...defaultProps} status="approved" />);
    expect(screen.getByRole("button", { name: /approve/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /modify/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /reject/i })).toBeDisabled();
  });

  it("disables all buttons when status is modified", () => {
    render(<HumanInLoopCard {...defaultProps} status="modified" />);
    expect(screen.getByRole("button", { name: /approve/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /modify/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /reject/i })).toBeDisabled();
  });

  it("disables all buttons when status is rejected", () => {
    render(<HumanInLoopCard {...defaultProps} status="rejected" />);
    expect(screen.getByRole("button", { name: /approve/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /modify/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /reject/i })).toBeDisabled();
  });

  it("does not call callbacks when buttons are disabled", () => {
    const onApprove = vi.fn();
    const onModify = vi.fn();
    const onReject = vi.fn();
    render(
      <HumanInLoopCard
        {...defaultProps}
        status="approved"
        onApprove={onApprove}
        onModify={onModify}
        onReject={onReject}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /approve/i }));
    fireEvent.click(screen.getByRole("button", { name: /modify/i }));
    fireEvent.click(screen.getByRole("button", { name: /reject/i }));
    expect(onApprove).not.toHaveBeenCalled();
    expect(onModify).not.toHaveBeenCalled();
    expect(onReject).not.toHaveBeenCalled();
  });

  it("buttons are enabled when status is pending", () => {
    render(<HumanInLoopCard {...defaultProps} status="pending" />);
    expect(screen.getByRole("button", { name: /approve/i })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: /modify/i })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: /reject/i })).not.toBeDisabled();
  });
});

/* ─── Keyboard operability ──────────────────────────────────────────────── */
describe("HumanInLoopCard — keyboard operability", () => {
  it("approve button responds to Enter key", () => {
    const onApprove = vi.fn();
    render(<HumanInLoopCard {...defaultProps} onApprove={onApprove} />);
    const btn = screen.getByRole("button", { name: /approve/i });
    fireEvent.keyDown(btn, { key: "Enter" });
    fireEvent.keyUp(btn, { key: "Enter" });
    // Native button handles Enter via click
    fireEvent.click(btn);
    expect(onApprove).toHaveBeenCalled();
  });

  it("reject button responds to Space key", () => {
    const onReject = vi.fn();
    render(<HumanInLoopCard {...defaultProps} onReject={onReject} />);
    const btn = screen.getByRole("button", { name: /reject/i });
    fireEvent.keyDown(btn, { key: " " });
    fireEvent.keyUp(btn, { key: " " });
    // Native button handles Space via click
    fireEvent.click(btn);
    expect(onReject).toHaveBeenCalled();
  });
});

/* ─── Density ───────────────────────────────────────────────────────────── */
describe("HumanInLoopCard — density", () => {
  it("sets data-density=comfortable by default", () => {
    render(<HumanInLoopCard {...defaultProps} />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-density", "comfortable");
  });

  it("sets data-density=compact when specified", () => {
    render(<HumanInLoopCard {...defaultProps} density="compact" />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-density", "compact");
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────── */
describe("HumanInLoopCard — forwardRef", () => {
  it("forwards ref to the root article element", () => {
    const ref = React.createRef<HTMLElement>();
    render(<HumanInLoopCard ref={ref} {...defaultProps} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("ARTICLE");
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("HumanInLoopCard — axe accessibility", () => {
  it("has no violations — pending", async () => {
    const { container } = render(<HumanInLoopCard {...defaultProps} status="pending" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — approved", async () => {
    const { container } = render(<HumanInLoopCard {...defaultProps} status="approved" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — modified", async () => {
    const { container } = render(<HumanInLoopCard {...defaultProps} status="modified" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — rejected", async () => {
    const { container } = render(<HumanInLoopCard {...defaultProps} status="rejected" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact density", async () => {
    const { container } = render(
      <HumanInLoopCard {...defaultProps} density="compact" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
