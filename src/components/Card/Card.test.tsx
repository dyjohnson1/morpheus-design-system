import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Card } from "./Card";

describe("Card", () => {
  it("renders body content", () => {
    render(<Card>Card body</Card>);
    expect(screen.getByText("Card body")).toBeInTheDocument();
  });

  it("renders header when provided", () => {
    render(<Card header="Card title">Body</Card>);
    expect(screen.getByText("Card title")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(<Card footer="Footer note">Body</Card>);
    expect(screen.getByText("Footer note")).toBeInTheDocument();
  });

  it("renders header and footer together", () => {
    render(
      <Card header="Title" footer="Footer">
        Content
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("is keyboard-focusable when interactive", () => {
    const { container } = render(
      <Card interactive>Interactive card</Card>
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("tabindex", "0");
  });

  it("is not focusable when interactive and disabled", () => {
    const { container } = render(
      <Card interactive disabled>Disabled interactive card</Card>
    );
    const el = container.firstChild as HTMLElement;
    expect(el).not.toHaveAttribute("tabindex", "0");
  });

  it("sets aria-disabled when disabled", () => {
    const { container } = render(<Card disabled>Disabled card</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("has no axe violations — default", async () => {
    const { container } = render(<Card header="Title" footer="Footer">Body</Card>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations — interactive", async () => {
    const { container } = render(
      <Card interactive aria-label="Open project">
        Clickable card
      </Card>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations — disabled", async () => {
    const { container } = render(
      <Card disabled header="Disabled card">
        Not interactive
      </Card>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
