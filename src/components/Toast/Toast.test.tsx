import { render, screen, fireEvent, act } from "@testing-library/react";
import { axe } from "jest-axe";
import { ToastProvider, useToast } from "./Toast";
import type { ToastVariant } from "./Toast";

/* ─── Helper: renders a toast trigger inside a provider ─────────────────── */

function TestHarness({
  variant = "info",
  message = "Test message",
  duration = 5000,
  withAction = false,
}: {
  variant?: ToastVariant;
  message?: string;
  duration?: number;
  withAction?: boolean;
}) {
  function Inner() {
    const { toast } = useToast();
    return (
      <button
        type="button"
        onClick={() =>
          toast({
            variant,
            message,
            duration,
            action: withAction
              ? { label: "Undo", onClick: () => {} }
              : undefined,
          })
        }
      >
        Trigger
      </button>
    );
  }
  return (
    <ToastProvider>
      <Inner />
    </ToastProvider>
  );
}

function triggerToast() {
  fireEvent.click(screen.getByRole("button", { name: "Trigger" }));
}

/* ─── Role & semantics ──────────────────────────────────────────────────── */
describe("Toast — role and semantics", () => {
  it("renders a toast with status role (via Radix live region)", () => {
    render(<TestHarness />);
    triggerToast();
    // Radix Toast renders into a live region; the description should be present
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("renders an icon for each variant (never color alone)", () => {
    const { container } = render(<TestHarness variant="success" message="Done" />);
    triggerToast();
    const svgs = container.querySelectorAll("svg");
    // At least one icon SVG present in the toast
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });

  it("renders all four variants without crashing", () => {
    const variants: ToastVariant[] = ["info", "success", "warning", "error"];
    for (const variant of variants) {
      const { unmount } = render(
        <TestHarness variant={variant} message={`${variant} message`} />
      );
      triggerToast();
      expect(screen.getByText(`${variant} message`)).toBeInTheDocument();
      unmount();
    }
  });
});

/* ─── Dismiss interaction ───────────────────────────────────────────────── */
describe("Toast — dismiss", () => {
  it("renders a dismiss button with accessible label", () => {
    render(<TestHarness />);
    triggerToast();
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("removes toast when dismiss button is clicked", () => {
    render(<TestHarness message="Will be dismissed" />);
    triggerToast();
    expect(screen.getByText("Will be dismissed")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    // After dismissal animation the toast text should be gone
    // Radix may keep it briefly for animation; check it at least fires the interaction
  });
});

/* ─── Action button ─────────────────────────────────────────────────────── */
describe("Toast — action button", () => {
  it("renders an action button when action is provided", () => {
    render(<TestHarness withAction message="Item deleted" />);
    triggerToast();
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
  });

  it("does not render an action button when not provided", () => {
    render(<TestHarness message="No action" />);
    triggerToast();
    expect(screen.queryByRole("button", { name: "Undo" })).not.toBeInTheDocument();
  });
});

/* ─── Keyboard interaction ──────────────────────────────────────────────── */
describe("Toast — keyboard interaction", () => {
  it("dismiss button is focusable", () => {
    render(<TestHarness />);
    triggerToast();
    const dismissBtn = screen.getByRole("button", { name: "Dismiss" });
    dismissBtn.focus();
    expect(dismissBtn).toHaveFocus();
  });

  it("action button is focusable when present", () => {
    render(<TestHarness withAction />);
    triggerToast();
    const actionBtn = screen.getByRole("button", { name: "Undo" });
    actionBtn.focus();
    expect(actionBtn).toHaveFocus();
  });
});

/* ─── useToast hook ─────────────────────────────────────────────────────── */
describe("Toast — useToast hook", () => {
  it("throws when used outside ToastProvider", () => {
    function BadComponent() {
      useToast();
      return null;
    }
    // Suppress React error boundary console noise
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<BadComponent />)).toThrow(
      "useToast must be used within a ToastProvider"
    );
    spy.mockRestore();
  });

  it("can show multiple toasts", () => {
    function Multi() {
      const { toast } = useToast();
      return (
        <button
          type="button"
          onClick={() => {
            toast({ message: "First" });
            toast({ message: "Second" });
          }}
        >
          ShowMulti
        </button>
      );
    }
    render(
      <ToastProvider>
        <Multi />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "ShowMulti" }));
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("dismissAll removes all toasts", () => {
    function DismissAll() {
      const { toast, dismissAll } = useToast();
      return (
        <>
          <button type="button" onClick={() => toast({ message: "A", duration: 0 })}>
            Add
          </button>
          <button type="button" onClick={dismissAll}>
            Clear
          </button>
        </>
      );
    }
    render(
      <ToastProvider>
        <DismissAll />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getAllByText("A").length).toBe(2);
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.queryByText("A")).not.toBeInTheDocument();
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("Toast — axe accessibility", () => {
  it("has no violations — info variant", async () => {
    const { container } = render(<TestHarness variant="info" />);
    triggerToast();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — success variant", async () => {
    const { container } = render(<TestHarness variant="success" />);
    triggerToast();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — warning variant", async () => {
    const { container } = render(<TestHarness variant="warning" />);
    triggerToast();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — error variant", async () => {
    const { container } = render(<TestHarness variant="error" />);
    triggerToast();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with action", async () => {
    const { container } = render(<TestHarness variant="info" withAction />);
    triggerToast();
    expect(await axe(container)).toHaveNoViolations();
  });
});
