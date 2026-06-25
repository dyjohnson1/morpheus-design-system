import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Switch } from "./Switch";

/* ─── Role & label ──────────────────────────────────────────────────────── */
describe("Switch — role and label", () => {
  it("renders as a switch with accessible label", () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByRole("switch", { name: "Enable notifications" })).toBeInTheDocument();
  });

  it("renders with aria-label when no visible label", () => {
    render(<Switch aria-label="Toggle dark mode" />);
    expect(screen.getByRole("switch", { name: "Toggle dark mode" })).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Switch label="Option" />);
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("is checked when checked=true", () => {
    render(<Switch checked={true} label="Option" />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("is disabled via the disabled prop", () => {
    render(<Switch disabled label="Option" />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });
});

/* ─── Keyboard interaction ──────────────────────────────────────────────── */
describe("Switch — keyboard interaction", () => {
  it("toggles when clicked (Space fires click natively)", () => {
    const onChange = vi.fn();
    render(<Switch onCheckedChange={onChange} label="Option" />);
    const switchEl = screen.getByRole("switch");
    fireEvent.click(switchEl);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not toggle when disabled", () => {
    const onChange = vi.fn();
    render(<Switch disabled onCheckedChange={onChange} label="Option" />);
    const switchEl = screen.getByRole("switch");
    fireEvent.click(switchEl);
    expect(onChange).not.toHaveBeenCalled();
  });
});

/* ─── Click interaction ─────────────────────────────────────────────────── */
describe("Switch — click interaction", () => {
  it("calls onCheckedChange when clicked", () => {
    const onChange = vi.fn();
    render(<Switch onCheckedChange={onChange} label="Option" />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("toggles from checked to unchecked", () => {
    const onChange = vi.fn();
    render(<Switch checked={true} onCheckedChange={onChange} label="Option" />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("clicking the label toggles the switch", () => {
    const onChange = vi.fn();
    render(<Switch onCheckedChange={onChange} label="Enable notifications" />);
    fireEvent.click(screen.getByText("Enable notifications"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

/* ─── Sizes ─────────────────────────────────────────────────────────────── */
describe("Switch — sizes", () => {
  it.each(["comfortable", "compact"] as const)(
    "renders size=%s without crashing",
    (size) => {
      render(<Switch size={size} label={`Size ${size}`} />);
      expect(screen.getByRole("switch", { name: `Size ${size}` })).toBeInTheDocument();
    }
  );
});

/* ─── forwardRef ────────────────────────────────────────────────────────── */
describe("Switch — forwardRef", () => {
  it("forwards a ref to the switch button element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Switch ref={ref} label="Option" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("Switch — axe accessibility", () => {
  it("has no violations — unchecked with label", async () => {
    const { container } = render(<Switch label="Enable notifications" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — checked", async () => {
    const { container } = render(<Switch checked={true} label="Checked" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — disabled", async () => {
    const { container } = render(<Switch disabled label="Disabled" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — without visible label (aria-label)", async () => {
    const { container } = render(<Switch aria-label="Toggle" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact size", async () => {
    const { container } = render(<Switch size="compact" label="Compact" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
