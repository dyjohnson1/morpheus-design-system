import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Tag } from "./Tag";

/* ─── Role & label ──────────────────────────────────────────────────────── */
describe("Tag — role and label", () => {
  it("renders as a button with visible label", () => {
    render(<Tag>React</Tag>);
    expect(screen.getByRole("button", { name: "React" })).toBeInTheDocument();
  });

  it("exposes aria-pressed=false when not selected", () => {
    render(<Tag>React</Tag>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("exposes aria-pressed=true when selected", () => {
    render(<Tag selected>React</Tag>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("is disabled via the disabled attribute", () => {
    render(<Tag disabled>React</Tag>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

/* ─── Variants ──────────────────────────────────────────────────────────── */
describe("Tag — variants", () => {
  it.each(["neutral", "accent", "success", "warning", "danger", "info"] as const)(
    "renders variant=%s without crashing",
    (variant) => {
      render(<Tag variant={variant}>{variant}</Tag>);
      expect(screen.getByRole("button", { name: variant })).toBeInTheDocument();
    }
  );
});

/* ─── Sizes ─────────────────────────────────────────────────────────────── */
describe("Tag — sizes", () => {
  it.each(["sm", "md"] as const)("renders size=%s without crashing", (size) => {
    render(<Tag size={size}>Label</Tag>);
    expect(screen.getByRole("button", { name: "Label" })).toBeInTheDocument();
  });
});

/* ─── Click / toggle interaction ────────────────────────────────────────── */
describe("Tag — click interaction", () => {
  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Tag onClick={onClick}>React</Tag>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(<Tag onClick={onClick} disabled>React</Tag>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});

/* ─── Keyboard interaction ──────────────────────────────────────────────── */
describe("Tag — keyboard interaction", () => {
  it("calls onClick when Enter is pressed", () => {
    const onClick = vi.fn();
    render(<Tag onClick={onClick}>React</Tag>);
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("calls onClick when Space is pressed", () => {
    const onClick = vi.fn();
    render(<Tag onClick={onClick}>React</Tag>);
    fireEvent.keyDown(screen.getByRole("button"), { key: " " });
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire onClick for other keys", () => {
    const onClick = vi.fn();
    render(<Tag onClick={onClick}>React</Tag>);
    fireEvent.keyDown(screen.getByRole("button"), { key: "Tab" });
    expect(onClick).not.toHaveBeenCalled();
  });
});

/* ─── Removable ─────────────────────────────────────────────────────────── */
describe("Tag — removable", () => {
  it("renders a remove button when removable=true", () => {
    render(
      <Tag removable onRemove={() => {}} removeLabel="Remove React tag">
        React
      </Tag>
    );
    expect(screen.getByRole("button", { name: "Remove React tag" })).toBeInTheDocument();
  });

  it("does not render remove button when removable=false", () => {
    render(<Tag removeLabel="Remove tag">React</Tag>);
    expect(screen.queryByRole("button", { name: "Remove tag" })).not.toBeInTheDocument();
  });

  it("does not render remove button when disabled", () => {
    render(
      <Tag removable disabled removeLabel="Remove tag">
        React
      </Tag>
    );
    // only the chip button itself is present; the × button is suppressed
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  it("calls onRemove when remove button is clicked", () => {
    const onRemove = vi.fn();
    render(
      <Tag removable onRemove={onRemove} removeLabel="Remove tag">
        React
      </Tag>
    );
    fireEvent.click(screen.getByRole("button", { name: "Remove tag" }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("calls onRemove when Enter is pressed on remove button", () => {
    const onRemove = vi.fn();
    render(
      <Tag removable onRemove={onRemove} removeLabel="Remove tag">
        React
      </Tag>
    );
    fireEvent.keyDown(screen.getByRole("button", { name: "Remove tag" }), { key: "Enter" });
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("calls onRemove when Space is pressed on remove button", () => {
    const onRemove = vi.fn();
    render(
      <Tag removable onRemove={onRemove} removeLabel="Remove tag">
        React
      </Tag>
    );
    fireEvent.keyDown(screen.getByRole("button", { name: "Remove tag" }), { key: " " });
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("clicking remove button does not also toggle the chip", () => {
    const onClick = vi.fn();
    const onRemove = vi.fn();
    render(
      <Tag removable onRemove={onRemove} onClick={onClick} removeLabel="Remove tag">
        React
      </Tag>
    );
    fireEvent.click(screen.getByRole("button", { name: "Remove tag" }));
    expect(onRemove).toHaveBeenCalledOnce();
    expect(onClick).not.toHaveBeenCalled();
  });
});

/* ─── Leading icon ──────────────────────────────────────────────────────── */
describe("Tag — leading icon", () => {
  it("renders a leading icon slot", () => {
    render(
      <Tag iconLeading={<svg data-testid="check-icon" aria-hidden="true" />}>
        Active
      </Tag>
    );
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────── */
describe("Tag — forwardRef", () => {
  it("forwards a ref to the button element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Tag ref={ref}>React</Tag>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("Tag — axe accessibility", () => {
  it("has no violations — default neutral", async () => {
    const { container } = render(<Tag>React</Tag>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — selected", async () => {
    const { container } = render(<Tag selected>TypeScript</Tag>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — removable with label", async () => {
    const { container } = render(
      <Tag removable onRemove={() => {}} removeLabel="Remove React tag">
        React
      </Tag>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — disabled", async () => {
    const { container } = render(<Tag disabled>Disabled</Tag>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — status variants with icon+text", async () => {
    const { container } = render(
      <>
        <Tag variant="neutral">Neutral</Tag>
        <Tag variant="accent">Accent</Tag>
        <Tag variant="success">
          <span aria-hidden="true">✓</span> Active
        </Tag>
        <Tag variant="warning">
          <span aria-hidden="true">⚠</span> Pending
        </Tag>
        <Tag variant="danger">
          <span aria-hidden="true">✕</span> Error
        </Tag>
        <Tag variant="info">
          <span aria-hidden="true">ℹ</span> Beta
        </Tag>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — size sm", async () => {
    const { container } = render(<Tag size="sm">Small</Tag>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with leading icon", async () => {
    const { container } = render(
      <Tag iconLeading={<svg aria-hidden="true" viewBox="0 0 16 16" />}>
        Starred
      </Tag>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
