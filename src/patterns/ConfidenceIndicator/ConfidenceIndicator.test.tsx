import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { ConfidenceIndicator } from "./ConfidenceIndicator";

describe("ConfidenceIndicator", () => {
  it("renders the correct textual label for named levels", () => {
    render(<ConfidenceIndicator level="high" />);
    expect(screen.getByText("High confidence")).toBeInTheDocument();
  });

  it("maps numeric values to named levels", () => {
    const { rerender } = render(<ConfidenceIndicator level={0.9} />);
    expect(screen.getByText("High confidence")).toBeInTheDocument();

    rerender(<ConfidenceIndicator level={0.6} />);
    expect(screen.getByText("Medium confidence")).toBeInTheDocument();

    rerender(<ConfidenceIndicator level={0.3} />);
    expect(screen.getByText("Low confidence")).toBeInTheDocument();

    rerender(<ConfidenceIndicator level={0.1} />);
    expect(screen.getByText("Uncertain")).toBeInTheDocument();
  });

  it("uses a custom label when provided", () => {
    render(<ConfidenceIndicator level="high" label="Likely accurate" />);
    expect(screen.getByText("Likely accurate")).toBeInTheDocument();
  });

  it("has an accessible aria-label", () => {
    render(<ConfidenceIndicator level="low" />);
    const root = screen.getByLabelText("Low confidence");
    expect(root).toBeInTheDocument();
  });

  it("never uses alarm/status colors (no data-status attribute)", () => {
    const { container } = render(<ConfidenceIndicator level="low" />);
    const root = container.firstElementChild!;
    expect(root).not.toHaveAttribute("data-status");
    // Verify data-level is present for styling, but CSS only uses muted color
    expect(root).toHaveAttribute("data-level", "low");
  });

  it("renders icon when showIcon is true", () => {
    const { container } = render(
      <ConfidenceIndicator level="medium" showIcon />
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("does not render icon when showIcon is false", () => {
    const { container } = render(<ConfidenceIndicator level="medium" />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("supports density variants", () => {
    const { container, rerender } = render(
      <ConfidenceIndicator level="high" density="comfortable" />
    );
    expect(container.firstElementChild).toHaveAttribute(
      "data-density",
      "comfortable"
    );

    rerender(<ConfidenceIndicator level="high" density="compact" />);
    expect(container.firstElementChild).toHaveAttribute(
      "data-density",
      "compact"
    );
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <ConfidenceIndicator level="medium" showIcon />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
