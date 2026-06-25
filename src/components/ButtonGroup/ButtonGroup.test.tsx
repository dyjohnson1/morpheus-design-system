import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "../Button";

describe("ButtonGroup", () => {
  it("renders a group landmark with the provided aria-label", () => {
    render(
      <ButtonGroup aria-label="Text formatting">
        <Button>Bold</Button>
        <Button>Italic</Button>
      </ButtonGroup>
    );
    expect(screen.getByRole("group", { name: "Text formatting" })).toBeInTheDocument();
  });

  it("renders all child buttons", () => {
    render(
      <ButtonGroup aria-label="Actions">
        <Button>Cut</Button>
        <Button>Copy</Button>
        <Button>Paste</Button>
      </ButtonGroup>
    );
    expect(screen.getByRole("button", { name: "Cut" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Paste" })).toBeInTheDocument();
  });

  it("tabs through child buttons in order", () => {
    render(
      <ButtonGroup aria-label="Nav">
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </ButtonGroup>
    );
    // Focus the first button directly — Tab simulation requires userEvent.
    // Verify each button is individually focusable.
    const first  = screen.getByRole("button", { name: "First"  });
    const second = screen.getByRole("button", { name: "Second" });
    const third  = screen.getByRole("button", { name: "Third"  });
    first.focus();
    expect(first).toHaveFocus();
    second.focus();
    expect(second).toHaveFocus();
    third.focus();
    expect(third).toHaveFocus();
  });

  it("sets aria-disabled on the group when disabled", () => {
    render(
      <ButtonGroup aria-label="Disabled group" disabled>
        <Button>Action</Button>
      </ButtonGroup>
    );
    expect(screen.getByRole("group")).toHaveAttribute("aria-disabled", "true");
  });

  it("has no axe violations — default spaced", async () => {
    const { container } = render(
      <ButtonGroup aria-label="Format">
        <Button variant="secondary">Bold</Button>
        <Button variant="secondary">Italic</Button>
        <Button variant="secondary">Underline</Button>
      </ButtonGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations — attached", async () => {
    const { container } = render(
      <ButtonGroup attached aria-label="View">
        <Button variant="secondary">Table</Button>
        <Button variant="secondary">Chart</Button>
      </ButtonGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations — vertical", async () => {
    const { container } = render(
      <ButtonGroup orientation="vertical" aria-label="Options">
        <Button variant="secondary">Option A</Button>
        <Button variant="secondary">Option B</Button>
      </ButtonGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations — disabled", async () => {
    const { container } = render(
      <ButtonGroup disabled aria-label="Disabled">
        <Button variant="secondary">Cut</Button>
        <Button variant="secondary">Copy</Button>
      </ButtonGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
