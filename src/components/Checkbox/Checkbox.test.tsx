import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Checkbox } from "./Checkbox";

/* ─── Role & label ──────────────────────────────────────────────────────── */
describe("Checkbox — role and label", () => {
  it("renders as a checkbox with accessible label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeInTheDocument();
  });

  it("renders with aria-label when no visible label", () => {
    render(<Checkbox aria-label="Toggle option" />);
    expect(screen.getByRole("checkbox", { name: "Toggle option" })).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Checkbox label="Option" />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("is checked when checked=true", () => {
    render(<Checkbox checked={true} label="Option" />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("is disabled via the disabled prop", () => {
    render(<Checkbox disabled label="Option" />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });
});

/* ─── Keyboard interaction ──────────────────────────────────────────────── */
describe("Checkbox — keyboard interaction", () => {
  it("toggles when Space is pressed", () => {
    const onChange = vi.fn();
    render(<Checkbox onCheckedChange={onChange} label="Option" />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.keyDown(checkbox, { key: " " });
    fireEvent.keyUp(checkbox, { key: " " });
    // Radix toggles on click, which the space key fires natively
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not toggle when disabled", () => {
    const onChange = vi.fn();
    render(<Checkbox disabled onCheckedChange={onChange} label="Option" />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });
});

/* ─── Click interaction ─────────────────────────────────────────────────── */
describe("Checkbox — click interaction", () => {
  it("calls onCheckedChange when clicked", () => {
    const onChange = vi.fn();
    render(<Checkbox onCheckedChange={onChange} label="Option" />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("toggles from checked to unchecked", () => {
    const onChange = vi.fn();
    render(<Checkbox checked={true} onCheckedChange={onChange} label="Option" />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("clicking the label toggles the checkbox", () => {
    const onChange = vi.fn();
    render(<Checkbox onCheckedChange={onChange} label="Accept terms" />);
    fireEvent.click(screen.getByText("Accept terms"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

/* ─── Sizes ─────────────────────────────────────────────────────────────── */
describe("Checkbox — sizes", () => {
  it.each(["comfortable", "compact"] as const)(
    "renders size=%s without crashing",
    (size) => {
      render(<Checkbox size={size} label={`Size ${size}`} />);
      expect(screen.getByRole("checkbox", { name: `Size ${size}` })).toBeInTheDocument();
    }
  );
});

/* ─── forwardRef ────────────────────────────────────────────────────────── */
describe("Checkbox — forwardRef", () => {
  it("forwards a ref to the checkbox button element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} label="Option" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("Checkbox — axe accessibility", () => {
  it("has no violations — unchecked with label", async () => {
    const { container } = render(<Checkbox label="Accept terms" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — checked", async () => {
    const { container } = render(<Checkbox checked={true} label="Checked" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — indeterminate", async () => {
    const { container } = render(<Checkbox checked="indeterminate" label="Mixed" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — disabled", async () => {
    const { container } = render(<Checkbox disabled label="Disabled" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — without visible label (aria-label)", async () => {
    const { container } = render(<Checkbox aria-label="Toggle" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact size", async () => {
    const { container } = render(<Checkbox size="compact" label="Compact" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
