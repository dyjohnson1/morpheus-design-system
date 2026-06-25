import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Badge } from "./Badge";

/* ─── Label mode ────────────────────────────────────────────────────────── */
describe("Badge — label mode", () => {
  it("renders label content", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders all status variants without crashing", () => {
    render(
      <>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">✓ Active</Badge>
        <Badge variant="warning">⚠ Pending</Badge>
        <Badge variant="danger">✕ Error</Badge>
        <Badge variant="info">ℹ Beta</Badge>
      </>
    );
    expect(screen.getByText("✓ Active")).toBeInTheDocument();
    expect(screen.getByText("Accent")).toBeInTheDocument();
  });
});

/* ─── Count mode ────────────────────────────────────────────────────────── */
describe("Badge — count mode", () => {
  it("renders a count value", () => {
    render(<Badge count={7} aria-label="7 notifications" />);
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("truncates count to max+", () => {
    render(<Badge count={150} max={99} aria-label="99+ notifications" />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("renders count of 0", () => {
    render(<Badge count={0} aria-label="0 notifications" />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders the exact value when count equals max", () => {
    render(<Badge count={99} max={99} aria-label="99 notifications" />);
    expect(screen.getByText("99")).toBeInTheDocument();
  });

  it("renders max+ when count exceeds max", () => {
    render(<Badge count={100} max={99} aria-label="99+ notifications" />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });
});

/* ─── Dot mode ──────────────────────────────────────────────────────────── */
describe("Badge — dot mode", () => {
  it("renders a dot badge with no visible text", () => {
    const { container } = render(
      <Badge dot aria-label="Unread messages" />
    );
    // The badge element should have no text content (dot is visually empty)
    const badge = container.querySelector('[class*="dotBadge"]');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("");
  });

  it("exposes an accessible label on the dot badge via role=img", () => {
    render(<Badge dot aria-label="Unread messages" />);
    // dot badges get role="img" so aria-label is valid and queryable
    expect(screen.getByRole("img", { name: "Unread messages" })).toBeInTheDocument();
  });
});

/* ─── Overlay / wrapper mode ────────────────────────────────────────────── */
describe("Badge — overlay mode", () => {
  it("wraps child and renders count overlay when count + child are provided", () => {
    const { container } = render(
      <Badge count={3} aria-label="3 notifications">
        <span data-testid="avatar">Avatar</span>
      </Badge>
    );
    // Wrapper span contains both the child and the badge
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    // Wrapper has the wrapper class
    expect(container.querySelector('[class*="wrapper"]')).toBeInTheDocument();
  });

  it("wraps child and renders dot overlay when dot + child are provided", () => {
    const { container } = render(
      <Badge dot aria-label="Unread" variant="danger">
        <span data-testid="icon">Icon</span>
      </Badge>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(container.querySelector('[class*="dotBadge"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="wrapper"]')).toBeInTheDocument();
  });

  it("does not render a wrapper when there is no child in count mode", () => {
    const { container } = render(
      <Badge count={5} aria-label="5 items" />
    );
    expect(container.querySelector('[class*="wrapper"]')).not.toBeInTheDocument();
  });

  it("does not render a wrapper for a plain label badge with children", () => {
    // In label mode, children ARE the badge content — no wrapper needed
    const { container } = render(<Badge>Label content</Badge>);
    expect(container.querySelector('[class*="wrapper"]')).not.toBeInTheDocument();
    expect(screen.getByText("Label content")).toBeInTheDocument();
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("Badge — axe accessibility", () => {
  it("has no violations — default label", async () => {
    const { container } = render(<Badge>New</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — status variants with icon+text", async () => {
    const { container } = render(
      <>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="accent">Beta</Badge>
        <Badge variant="success">✓ Active</Badge>
        <Badge variant="warning">⚠ Pending</Badge>
        <Badge variant="danger">✕ Error</Badge>
        <Badge variant="info">ℹ Info</Badge>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — count badge with aria-label", async () => {
    const { container } = render(
      <Badge count={5} aria-label="5 notifications" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — dot badge with aria-label", async () => {
    const { container } = render(
      <Badge dot aria-label="Unread messages" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — overlay count on child", async () => {
    const { container } = render(
      <Badge count={3} aria-label="3 notifications">
        <span aria-label="User avatar" role="img">
          JD
        </span>
      </Badge>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — overlay dot on child", async () => {
    const { container } = render(
      <Badge dot variant="danger" aria-label="Error indicator">
        <span aria-label="Notifications" role="img">
          🔔
        </span>
      </Badge>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
