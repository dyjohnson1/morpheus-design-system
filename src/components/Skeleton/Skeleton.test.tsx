import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Skeleton } from "./Skeleton";

describe("Skeleton — role and label", () => {
  it("renders with status role and aria-busy", () => {
    render(<Skeleton aria-label="Loading content" />);
    const el = screen.getByRole("status", { name: "Loading content" });
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("uses default aria-label when none is provided", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("accepts a custom aria-label", () => {
    render(<Skeleton aria-label="Loading user profile" />);
    expect(
      screen.getByRole("status", { name: "Loading user profile" })
    ).toBeInTheDocument();
  });
});

describe("Skeleton — variants", () => {
  it.each(["text", "circular", "rectangular", "rounded"] as const)(
    "renders %s variant with correct data attribute",
    (variant) => {
      render(<Skeleton variant={variant} aria-label={`${variant} skeleton`} />);
      const el = screen.getByRole("status", { name: `${variant} skeleton` });
      expect(el).toHaveAttribute("data-variant", variant);
    }
  );

  it("defaults to text variant", () => {
    render(<Skeleton aria-label="Default" />);
    expect(screen.getByRole("status", { name: "Default" })).toHaveAttribute(
      "data-variant",
      "text"
    );
  });
});

describe("Skeleton — sizing", () => {
  it("applies string width and height via inline style", () => {
    render(<Skeleton width="200px" height="40px" aria-label="Sized" />);
    const el = screen.getByRole("status", { name: "Sized" });
    expect(el).toHaveStyle({ width: "200px", height: "40px" });
  });

  it("applies numeric width and height as px", () => {
    render(<Skeleton width={100} height={50} aria-label="Numeric" />);
    const el = screen.getByRole("status", { name: "Numeric" });
    expect(el).toHaveStyle({ width: "100px", height: "50px" });
  });

  it("does not set inline style when no size is specified", () => {
    render(<Skeleton aria-label="No size" />);
    const el = screen.getByRole("status", { name: "No size" });
    expect(el).not.toHaveAttribute("style");
  });
});

describe("Skeleton — animation", () => {
  it("has animated class by default", () => {
    const { container } = render(<Skeleton aria-label="Animated" />);
    expect(container.firstChild).toHaveClass(/animated/);
  });

  it("does not have animated class when animation is false", () => {
    const { container } = render(<Skeleton animation={false} aria-label="Static" />);
    expect(container.firstChild).not.toHaveClass(/animated/);
  });
});

describe("Skeleton — className and style forwarding", () => {
  it("merges custom className", () => {
    const { container } = render(
      <Skeleton className="custom-class" aria-label="Custom" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("merges custom style with size styles", () => {
    render(<Skeleton width="200px" style={{ opacity: 0.5 }} aria-label="Styled" />);
    const el = screen.getByRole("status", { name: "Styled" });
    expect(el).toHaveStyle({ width: "200px", opacity: "0.5" });
  });
});

describe("Skeleton — ref forwarding", () => {
  it("forwards ref to the span element", () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement | null>;
    render(<Skeleton ref={ref} aria-label="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

describe("Skeleton — axe accessibility", () => {
  it("has no violations with text variant", async () => {
    const { container } = render(<Skeleton variant="text" aria-label="Loading text" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with circular variant", async () => {
    const { container } = render(<Skeleton variant="circular" aria-label="Loading avatar" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with rectangular variant", async () => {
    const { container } = render(
      <Skeleton variant="rectangular" width="200px" height="100px" aria-label="Loading image" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with rounded variant", async () => {
    const { container } = render(
      <Skeleton variant="rounded" width="200px" height="100px" aria-label="Loading card" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations when animation is disabled", async () => {
    const { container } = render(
      <Skeleton animation={false} aria-label="Static skeleton" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations across all variants together", async () => {
    const { container } = render(
      <div>
        <Skeleton variant="text" aria-label="Text loading" />
        <Skeleton variant="circular" aria-label="Circle loading" />
        <Skeleton variant="rectangular" aria-label="Rect loading" />
        <Skeleton variant="rounded" aria-label="Rounded loading" />
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
