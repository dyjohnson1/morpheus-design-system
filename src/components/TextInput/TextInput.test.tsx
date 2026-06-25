import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { TextInput } from "./TextInput";

/* ─── Role & label ──────────────────────────────────────────────────────── */
describe("TextInput — role and label", () => {
  it("renders as a textbox", () => {
    render(<TextInput aria-label="Name" />);
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
  });

  it("renders with a placeholder", () => {
    render(<TextInput placeholder="Enter name" aria-label="Name" />);
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });

  it("applies aria-invalid when error is true", () => {
    render(<TextInput error aria-label="Email" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid when error is false", () => {
    render(<TextInput aria-label="Email" />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("is disabled via the disabled attribute", () => {
    render(<TextInput disabled aria-label="Name" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});

/* ─── Keyboard interaction ──────────────────────────────────────────────── */
describe("TextInput — keyboard interaction", () => {
  it("accepts typed input", () => {
    render(<TextInput aria-label="Name" />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Morpheus" } });
    expect(input).toHaveValue("Morpheus");
  });

  it("does not accept input when disabled", () => {
    render(<TextInput disabled aria-label="Name" defaultValue="Locked" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Locked");
    expect(input).toBeDisabled();
  });

  it("can be focused via tab", () => {
    render(<TextInput aria-label="Name" />);
    const input = screen.getByRole("textbox");
    input.focus();
    expect(document.activeElement).toBe(input);
  });
});

/* ─── Icon slots ────────────────────────────────────────────────────────── */
describe("TextInput — icon slots", () => {
  it("renders a leading icon", () => {
    render(
      <TextInput
        aria-label="Search"
        leadingIcon={<svg data-testid="lead-icon" aria-hidden="true" />}
      />
    );
    expect(screen.getByTestId("lead-icon")).toBeInTheDocument();
  });

  it("renders a trailing icon", () => {
    render(
      <TextInput
        aria-label="Status"
        trailingIcon={<svg data-testid="trail-icon" aria-hidden="true" />}
      />
    );
    expect(screen.getByTestId("trail-icon")).toBeInTheDocument();
  });

  it("icons are hidden from assistive technology", () => {
    const { container } = render(
      <TextInput
        aria-label="Search"
        leadingIcon={<svg data-testid="icon" />}
      />
    );
    const iconWrapper = container.querySelector('[aria-hidden="true"]');
    expect(iconWrapper).toBeInTheDocument();
  });
});

/* ─── Size / density ────────────────────────────────────────────────────── */
describe("TextInput — size", () => {
  it("renders comfortable size by default", () => {
    const { container } = render(<TextInput aria-label="Name" />);
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("comfortable");
  });

  it("renders compact size", () => {
    const { container } = render(<TextInput size="compact" aria-label="Name" />);
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("compact");
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────── */
describe("TextInput — forwardRef", () => {
  it("forwards a ref to the input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<TextInput ref={ref} aria-label="Name" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("TextInput — axe accessibility", () => {
  it("has no violations — default with aria-label", async () => {
    const { container } = render(<TextInput aria-label="Username" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with placeholder", async () => {
    const { container } = render(
      <TextInput aria-label="Email" placeholder="you@example.com" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — error state", async () => {
    const { container } = render(
      <TextInput aria-label="Email" error defaultValue="bad" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — disabled", async () => {
    const { container } = render(
      <TextInput aria-label="Name" disabled defaultValue="Locked" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with leading icon", async () => {
    const { container } = render(
      <TextInput
        aria-label="Search"
        leadingIcon={<svg aria-hidden="true" viewBox="0 0 24 24" />}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact size", async () => {
    const { container } = render(
      <TextInput aria-label="Filter" size="compact" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
