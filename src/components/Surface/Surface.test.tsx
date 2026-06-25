import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Surface } from "./Surface";

describe("Surface", () => {
  it("renders children", () => {
    render(<Surface>Hello Surface</Surface>);
    expect(screen.getByText("Hello Surface")).toBeInTheDocument();
  });

  it("applies correct data attributes for variant and elevation", () => {
    const { container } = render(
      <Surface variant="overlay" elevation={3}>content</Surface>
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("data-variant", "overlay");
    expect(el).toHaveAttribute("data-elevation", "3");
  });

  it("marks disabled state with aria-disabled and data-disabled", () => {
    const { container } = render(
      <Surface disabled>disabled surface</Surface>
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("aria-disabled", "true");
    expect(el).toHaveAttribute("data-disabled");
  });

  it("does not set aria-disabled when not disabled", () => {
    const { container } = render(<Surface>active surface</Surface>);
    const el = container.firstChild as HTMLElement;
    expect(el).not.toHaveAttribute("aria-disabled");
  });

  it("has no axe violations across variants and elevations", async () => {
    const { container } = render(
      <>
        <Surface variant="flat" elevation={0}>Flat</Surface>
        <Surface variant="raised" elevation={1}>Raised</Surface>
        <Surface variant="overlay" elevation={3}>Overlay</Surface>
        <Surface variant="raised" elevation={2} disabled>Disabled</Surface>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
