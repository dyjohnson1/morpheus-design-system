import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Button } from "./Button";

describe("Button", () => {
  it("renders an accessible button with its label", () => {
    render(<Button variant="primary">Generate</Button>);
    expect(screen.getByRole("button", { name: "Generate" })).toBeInTheDocument();
  });

  it("sets aria-busy and disables interaction while loading", () => {
    render(<Button loading loadingLabel="Working on it">Generate</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn).toBeDisabled();
    expect(screen.getByText("Working on it")).toBeInTheDocument();
  });

  it("has no axe violations across variants", async () => {
    const { container } = render(
      <>
        <Button variant="primary">A</Button>
        <Button variant="secondary">B</Button>
        <Button variant="ghost">C</Button>
        <Button variant="destructive">D</Button>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
