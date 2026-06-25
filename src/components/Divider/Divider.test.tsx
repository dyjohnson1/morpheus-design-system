import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Divider } from "./Divider";

/* ─── Semantic element / role assertions ────────────────────────────────── */

describe("Divider — horizontal (default)", () => {
  it("renders an <hr> element with implicit role=separator", () => {
    render(<Divider />);
    const el = screen.getByRole("separator");
    expect(el.tagName).toBe("HR");
  });

  it("does not set aria-orientation on horizontal (browser default)", () => {
    render(<Divider orientation="horizontal" />);
    const el = screen.getByRole("separator");
    expect(el).not.toHaveAttribute("aria-orientation");
  });
});

describe("Divider — vertical", () => {
  it("renders a div with role=separator and aria-orientation=vertical", () => {
    render(<Divider orientation="vertical" />);
    const el = screen.getByRole("separator");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveAttribute("aria-orientation", "vertical");
  });
});

/* ─── Labeled divider ────────────────────────────────────────────────────── */

describe("Divider — labeled", () => {
  it("renders a div with role=separator and aria-label matching the label prop", () => {
    render(<Divider label="OR" />);
    const el = screen.getByRole("separator", { name: "OR" });
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("DIV");
  });

  it("renders the label text visually (aria-hidden span)", () => {
    render(<Divider label="SECTION" />);
    // The visible text is inside an aria-hidden span; getByText still finds it
    expect(screen.getByText("SECTION")).toBeInTheDocument();
  });

  it("does not render label text when label prop is omitted", () => {
    render(<Divider />);
    // No visible label text
    expect(screen.queryByText("OR")).not.toBeInTheDocument();
  });
});

/* ─── Variant class smoke tests ─────────────────────────────────────────── */

describe("Divider — variants", () => {
  it("renders the subtle variant without crashing", () => {
    render(<Divider variant="subtle" data-testid="d" />);
    expect(screen.getByTestId("d")).toBeInTheDocument();
  });

  it("renders the strong variant without crashing", () => {
    render(<Divider variant="strong" data-testid="d" />);
    expect(screen.getByTestId("d")).toBeInTheDocument();
  });
});

/* ─── Spacing variants ───────────────────────────────────────────────────── */

describe("Divider — spacing", () => {
  it.each(["none", "sm", "md", "lg"] as const)(
    "renders spacing=%s without crashing",
    (spacing) => {
      render(<Divider spacing={spacing} data-testid="d" />);
      expect(screen.getByTestId("d")).toBeInTheDocument();
    }
  );
});

/* ─── forwardRef ─────────────────────────────────────────────────────────── */

describe("Divider — forwardRef", () => {
  it("forwards a ref to the underlying DOM element", () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<Divider ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current!.tagName).toBe("HR");
  });

  it("forwards a ref for vertical orientation", () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<Divider orientation="vertical" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current!.tagName).toBe("DIV");
  });
});

/* ─── Axe accessibility ──────────────────────────────────────────────────── */

describe("Divider — axe accessibility", () => {
  it("has no violations — horizontal default", async () => {
    const { container } = render(<Divider />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — vertical", async () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — labeled OR", async () => {
    const { container } = render(<Divider label="OR" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — all variants", async () => {
    const { container } = render(
      <>
        <Divider variant="subtle" />
        <Divider variant="default" />
        <Divider variant="strong" />
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — labeled all variants", async () => {
    const { container } = render(
      <>
        <Divider label="SECTION" variant="subtle" />
        <Divider label="OR" variant="default" />
        <Divider label="CONTINUED" variant="strong" />
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
