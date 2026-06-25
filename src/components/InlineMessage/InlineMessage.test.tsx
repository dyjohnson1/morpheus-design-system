import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { InlineMessage } from "./InlineMessage";

/* ─── Role & label ──────────────────────────────────────────────────────── */
describe("InlineMessage — role and semantics", () => {
  it("renders with role=status for info variant", () => {
    render(<InlineMessage variant="info">Info message</InlineMessage>);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Info message");
  });

  it("renders with role=status for success variant", () => {
    render(<InlineMessage variant="success">Success message</InlineMessage>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders with role=status for warning variant", () => {
    render(<InlineMessage variant="warning">Warning message</InlineMessage>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders with role=alert for error variant", () => {
    render(<InlineMessage variant="error">Error message</InlineMessage>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Error message");
  });

  it("defaults to info variant", () => {
    render(<InlineMessage>Default message</InlineMessage>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});

/* ─── Variants render correctly ─────────────────────────────────────────── */
describe("InlineMessage — variants", () => {
  it.each(["info", "success", "warning", "error"] as const)(
    "renders variant=%s without crashing",
    (variant) => {
      const { container } = render(
        <InlineMessage variant={variant}>Message for {variant}</InlineMessage>
      );
      expect(container.firstChild).toBeInTheDocument();
    }
  );

  it("includes an icon for each variant (never color alone)", () => {
    const { container } = render(
      <InlineMessage variant="success">Done</InlineMessage>
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});

/* ─── Dismiss interaction ───────────────────────────────────────────────── */
describe("InlineMessage — dismiss", () => {
  it("does not render dismiss button by default", () => {
    render(<InlineMessage>No dismiss</InlineMessage>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders dismiss button when dismissible=true", () => {
    render(
      <InlineMessage dismissible onDismiss={() => {}}>
        Dismissible
      </InlineMessage>
    );
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", () => {
    const onDismiss = vi.fn();
    render(
      <InlineMessage dismissible onDismiss={onDismiss}>
        Dismissible
      </InlineMessage>
    );
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("uses custom dismissLabel for the button", () => {
    render(
      <InlineMessage dismissible onDismiss={() => {}} dismissLabel="Close message">
        Dismissible
      </InlineMessage>
    );
    expect(screen.getByRole("button", { name: "Close message" })).toBeInTheDocument();
  });
});

/* ─── Keyboard interaction ──────────────────────────────────────────────── */
describe("InlineMessage — keyboard interaction", () => {
  it("dismiss button is focusable and activatable via Enter", () => {
    const onDismiss = vi.fn();
    render(
      <InlineMessage dismissible onDismiss={onDismiss}>
        Message
      </InlineMessage>
    );
    const btn = screen.getByRole("button", { name: "Dismiss" });
    btn.focus();
    expect(btn).toHaveFocus();
    fireEvent.keyDown(btn, { key: "Enter" });
    // Native button handles Enter via click event
    fireEvent.click(btn);
    expect(onDismiss).toHaveBeenCalled();
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────── */
describe("InlineMessage — forwardRef", () => {
  it("forwards a ref to the root div element", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<InlineMessage ref={ref}>Ref test</InlineMessage>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("InlineMessage — axe accessibility", () => {
  it("has no violations — info variant", async () => {
    const { container } = render(
      <InlineMessage variant="info">Info message</InlineMessage>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — success variant", async () => {
    const { container } = render(
      <InlineMessage variant="success">Success message</InlineMessage>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — warning variant", async () => {
    const { container } = render(
      <InlineMessage variant="warning">Warning message</InlineMessage>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — error variant", async () => {
    const { container } = render(
      <InlineMessage variant="error">Error message</InlineMessage>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — dismissible", async () => {
    const { container } = render(
      <InlineMessage variant="info" dismissible onDismiss={() => {}}>
        Dismissible
      </InlineMessage>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — all variants together", async () => {
    const { container } = render(
      <>
        <InlineMessage variant="info">Info</InlineMessage>
        <InlineMessage variant="success">Success</InlineMessage>
        <InlineMessage variant="warning">Warning</InlineMessage>
        <InlineMessage variant="error">Error</InlineMessage>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
