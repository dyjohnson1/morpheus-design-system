import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Textarea } from "./Textarea";

/* ─── Role & label ──────────────────────────────────────────────────────── */
describe("Textarea — role and label", () => {
  it("renders as a textbox", () => {
    render(<Textarea aria-label="Message" />);
    expect(
      screen.getByRole("textbox", { name: "Message" })
    ).toBeInTheDocument();
  });

  it("renders with a placeholder", () => {
    render(<Textarea placeholder="Enter message" aria-label="Message" />);
    expect(screen.getByPlaceholderText("Enter message")).toBeInTheDocument();
  });

  it("applies aria-invalid when error is true", () => {
    render(<Textarea error aria-label="Message" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid when error is false", () => {
    render(<Textarea aria-label="Message" />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("is disabled via the disabled attribute", () => {
    render(<Textarea disabled aria-label="Message" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});

/* ─── Keyboard interaction ──────────────────────────────────────────────── */
describe("Textarea — keyboard interaction", () => {
  it("accepts typed input", () => {
    render(<Textarea aria-label="Message" />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Hello Morpheus" } });
    expect(textarea).toHaveValue("Hello Morpheus");
  });

  it("does not accept input when disabled", () => {
    render(
      <Textarea disabled aria-label="Message" defaultValue="Locked" />
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("Locked");
    expect(textarea).toBeDisabled();
  });

  it("can be focused via tab", () => {
    render(<Textarea aria-label="Message" />);
    const textarea = screen.getByRole("textbox");
    textarea.focus();
    expect(document.activeElement).toBe(textarea);
  });

  it("accepts multi-line input", () => {
    render(<Textarea aria-label="Message" />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, {
      target: { value: "Line 1\nLine 2\nLine 3" },
    });
    expect(textarea).toHaveValue("Line 1\nLine 2\nLine 3");
  });
});

/* ─── Size / density ────────────────────────────────────────────────────── */
describe("Textarea — size", () => {
  it("renders comfortable size by default", () => {
    const { container } = render(<Textarea aria-label="Message" />);
    const textarea = container.querySelector("textarea");
    expect(textarea?.className).toContain("comfortable");
  });

  it("renders compact size", () => {
    const { container } = render(
      <Textarea size="compact" aria-label="Message" />
    );
    const textarea = container.querySelector("textarea");
    expect(textarea?.className).toContain("compact");
  });
});

/* ─── Resize prop ───────────────────────────────────────────────────────── */
describe("Textarea — resize", () => {
  it("defaults to vertical resize", () => {
    render(<Textarea aria-label="Message" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveStyle({ resize: "vertical" });
  });

  it("applies resize none", () => {
    render(<Textarea resize="none" aria-label="Message" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveStyle({ resize: "none" });
  });

  it("applies resize both", () => {
    render(<Textarea resize="both" aria-label="Message" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveStyle({ resize: "both" });
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────── */
describe("Textarea — forwardRef", () => {
  it("forwards a ref to the textarea element", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} aria-label="Message" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("Textarea — axe accessibility", () => {
  it("has no violations — default with aria-label", async () => {
    const { container } = render(<Textarea aria-label="Message" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with placeholder", async () => {
    const { container } = render(
      <Textarea aria-label="Message" placeholder="Type here…" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — error state", async () => {
    const { container } = render(
      <Textarea aria-label="Message" error defaultValue="Bad content" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — disabled", async () => {
    const { container } = render(
      <Textarea aria-label="Message" disabled defaultValue="Locked" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact size", async () => {
    const { container } = render(
      <Textarea aria-label="Note" size="compact" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
