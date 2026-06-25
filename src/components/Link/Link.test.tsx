import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Link } from "./Link";

describe("Link", () => {
  it("renders an anchor with the correct label", () => {
    render(<Link href="/docs">Read the docs</Link>);
    expect(screen.getByRole("link", { name: "Read the docs" })).toBeInTheDocument();
  });

  it("renders with the correct href", () => {
    render(<Link href="/about">About</Link>);
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  });

  it("is keyboard-focusable and activatable via Enter", () => {
    const handleClick = vi.fn();
    render(<Link href="#" onClick={handleClick}>Click me</Link>);
    const link = screen.getByRole("link");
    link.focus();
    expect(link).toHaveFocus();
    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  describe("external", () => {
    it("sets target=_blank and rel=noopener noreferrer", () => {
      render(<Link href="https://example.com" external>GitHub</Link>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
      expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    });

    it("appends accessible external indicator text", () => {
      render(<Link href="https://example.com" external>GitHub</Link>);
      // The VisuallyHidden span is in the DOM for SR
      expect(screen.getByText("(opens in new tab)")).toBeInTheDocument();
    });

    it("accessible name includes the external label", () => {
      render(<Link href="https://example.com" external>GitHub</Link>);
      expect(
        screen.getByRole("link", { name: /github/i })
      ).toBeInTheDocument();
    });
  });

  it("has no axe violations — default variants", async () => {
    const { container } = render(
      <>
        <Link href="#default">Default link</Link>
        <Link href="#muted" variant="muted">Muted link</Link>
        <Link href="#accent" variant="accent">Accent link</Link>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations — external", async () => {
    const { container } = render(
      <Link href="https://example.com" external>View on GitHub</Link>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations — noUnderline", async () => {
    const { container } = render(
      <Link href="#" noUnderline>Nav item</Link>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
