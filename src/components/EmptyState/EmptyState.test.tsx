import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { EmptyState } from "./EmptyState";

const TestIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

/* ─── Role & semantics ──────────────────────────────────────────────────── */
describe("EmptyState — role and semantics", () => {
  it("renders a heading element with the heading text", () => {
    render(<EmptyState heading="Nothing here yet" />);
    expect(
      screen.getByRole("heading", { name: "Nothing here yet" })
    ).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(
      <EmptyState
        heading="Nothing here yet"
        description="Check back later for updates."
      />
    );
    expect(screen.getByText("Check back later for updates.")).toBeInTheDocument();
  });

  it("renders icon with aria-hidden", () => {
    const { container } = render(
      <EmptyState heading="Empty" icon={TestIcon} />
    );
    const iconWrapper = container.querySelector("[aria-hidden='true']");
    expect(iconWrapper).toBeInTheDocument();
  });

  it("renders actions slot", () => {
    render(
      <EmptyState
        heading="No items"
        actions={<button type="button">Add item</button>}
      />
    );
    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  });
});

/* ─── Size variants ─────────────────────────────────────────────────────── */
describe("EmptyState — size variants", () => {
  it("defaults to comfortable size", () => {
    const { container } = render(<EmptyState heading="Default size" />);
    expect(container.firstChild).toHaveClass(/comfortable/);
  });

  it("applies compact size class", () => {
    const { container } = render(
      <EmptyState heading="Compact" size="compact" />
    );
    expect(container.firstChild).toHaveClass(/compact/);
  });
});

/* ─── Optional slots ────────────────────────────────────────────────────── */
describe("EmptyState — optional slots", () => {
  it("renders without icon", () => {
    const { container } = render(<EmptyState heading="No icon" />);
    const iconSlot = container.querySelector("[aria-hidden='true']");
    expect(iconSlot).not.toBeInTheDocument();
  });

  it("renders without description", () => {
    render(<EmptyState heading="No description" />);
    const paragraphs = document.querySelectorAll("p");
    expect(paragraphs.length).toBe(0);
  });

  it("renders without actions", () => {
    render(<EmptyState heading="No actions" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders with all slots populated", () => {
    render(
      <EmptyState
        heading="All slots"
        icon={TestIcon}
        description="Description text"
        actions={<button type="button">Action</button>}
      />
    );
    expect(screen.getByRole("heading", { name: "All slots" })).toBeInTheDocument();
    expect(screen.getByText("Description text")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────── */
describe("EmptyState — forwardRef", () => {
  it("forwards a ref to the root div element", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<EmptyState ref={ref} heading="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ─── Keyboard interaction ──────────────────────────────────────────────── */
describe("EmptyState — keyboard interaction", () => {
  it("action buttons within EmptyState are focusable", () => {
    render(
      <EmptyState
        heading="With action"
        actions={<button type="button">Do something</button>}
      />
    );
    const btn = screen.getByRole("button", { name: "Do something" });
    btn.focus();
    expect(btn).toHaveFocus();
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("EmptyState — axe accessibility", () => {
  it("has no violations — basic", async () => {
    const { container } = render(
      <EmptyState heading="Nothing here yet" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with icon and description", async () => {
    const { container } = render(
      <EmptyState
        heading="No results"
        icon={TestIcon}
        description="Try adjusting your search terms."
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with actions", async () => {
    const { container } = render(
      <EmptyState
        heading="Empty inbox"
        icon={TestIcon}
        description="Start a conversation."
        actions={<button type="button">New message</button>}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact size", async () => {
    const { container } = render(
      <EmptyState
        heading="No files"
        icon={TestIcon}
        description="Upload a file to get started."
        size="compact"
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
