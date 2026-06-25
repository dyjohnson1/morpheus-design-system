import * as React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { CitationCard } from "./CitationCard";

const defaultProps = {
  title: "TypeScript Handbook",
  url: "https://www.typescriptlang.org/docs",
  sourceName: "typescriptlang.org",
};

/* ─── Article role + aria-label ─────────────────────────────────────────── */
describe("CitationCard — semantic structure", () => {
  it("renders as an article with a descriptive aria-label", () => {
    render(<CitationCard {...defaultProps} />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute(
      "aria-label",
      "Citation: TypeScript Handbook, from typescriptlang.org"
    );
  });

  it("includes index in aria-label when provided", () => {
    render(<CitationCard {...defaultProps} index={3} />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute(
      "aria-label",
      "Citation 3: TypeScript Handbook, from typescriptlang.org"
    );
  });
});

/* ─── Source as real link with discernible name ─────────────────────────── */
describe("CitationCard — source link", () => {
  it("renders source as a real anchor element", () => {
    render(<CitationCard {...defaultProps} />);
    const link = screen.getByRole("link", { name: "TypeScript Handbook" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://www.typescriptlang.org/docs");
  });

  it("has discernible accessible name (the title, not generic text)", () => {
    render(<CitationCard {...defaultProps} title="React Documentation" />);
    const link = screen.getByRole("link", { name: "React Documentation" });
    expect(link).toBeInTheDocument();
  });

  it("opens in new tab with noopener noreferrer", () => {
    render(<CitationCard {...defaultProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

/* ─── Index badge ───────────────────────────────────────────────────────── */
describe("CitationCard — index badge", () => {
  it("renders the index badge when index is provided", () => {
    render(<CitationCard {...defaultProps} index={1} />);
    expect(screen.getByText("[1]")).toBeInTheDocument();
  });

  it("renders index badge with aria-hidden (decorative)", () => {
    const { container } = render(<CitationCard {...defaultProps} index={2} />);
    const badge = container.querySelector('[class*="indexBadge"]');
    expect(badge).toHaveAttribute("aria-hidden", "true");
  });

  it("does not render badge when index is not provided", () => {
    render(<CitationCard {...defaultProps} />);
    expect(screen.queryByText(/\[\d+\]/)).not.toBeInTheDocument();
  });

  it("handles index 0 correctly", () => {
    render(<CitationCard {...defaultProps} index={0} />);
    expect(screen.getByText("[0]")).toBeInTheDocument();
  });
});

/* ─── Type indicator ────────────────────────────────────────────────────── */
describe("CitationCard — type indicator", () => {
  it("shows 'Web page' text for webpage type", () => {
    render(<CitationCard {...defaultProps} type="webpage" />);
    expect(screen.getByText("Web page")).toBeInTheDocument();
  });

  it("shows 'Document' text for document type", () => {
    render(<CitationCard {...defaultProps} type="document" />);
    expect(screen.getByText("Document")).toBeInTheDocument();
  });

  it("shows 'Code' text for code type", () => {
    render(<CitationCard {...defaultProps} type="code" />);
    expect(screen.getByText("Code")).toBeInTheDocument();
  });

  it("shows 'API' text for api type", () => {
    render(<CitationCard {...defaultProps} type="api" />);
    expect(screen.getByText("API")).toBeInTheDocument();
  });

  it("renders a type icon (SVG) alongside text", () => {
    const { container } = render(<CitationCard {...defaultProps} type="code" />);
    const typeIcon = container.querySelector('[class*="typeIcon"] svg');
    expect(typeIcon).toBeInTheDocument();
  });

  it("sets data-type attribute on root", () => {
    render(<CitationCard {...defaultProps} type="api" />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-type", "api");
  });
});

/* ─── Content rendering ─────────────────────────────────────────────────── */
describe("CitationCard — content", () => {
  it("renders the source name", () => {
    render(<CitationCard {...defaultProps} />);
    expect(screen.getByText("typescriptlang.org")).toBeInTheDocument();
  });

  it("renders snippet when provided", () => {
    render(
      <CitationCard {...defaultProps} snippet="This is a code snippet excerpt." />
    );
    expect(screen.getByText("This is a code snippet excerpt.")).toBeInTheDocument();
  });

  it("does not render snippet paragraph when snippet is not provided", () => {
    const { container } = render(<CitationCard {...defaultProps} />);
    expect(container.querySelector('[class*="snippet"]')).not.toBeInTheDocument();
  });

  it("renders custom icon", () => {
    const icon = <svg data-testid="custom-favicon" />;
    render(<CitationCard {...defaultProps} icon={icon} />);
    expect(screen.getByTestId("custom-favicon")).toBeInTheDocument();
  });
});

/* ─── Density ───────────────────────────────────────────────────────────── */
describe("CitationCard — density", () => {
  it("sets data-density=comfortable by default", () => {
    render(<CitationCard {...defaultProps} />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-density", "comfortable");
  });

  it("sets data-density=compact when specified", () => {
    render(<CitationCard {...defaultProps} density="compact" />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-density", "compact");
  });
});

/* ─── Keyboard focus ────────────────────────────────────────────────────── */
describe("CitationCard — keyboard focus", () => {
  it("source link is focusable", () => {
    render(<CitationCard {...defaultProps} />);
    const link = screen.getByRole("link");
    link.focus();
    expect(link).toHaveFocus();
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────── */
describe("CitationCard — forwardRef", () => {
  it("forwards ref to the root article element", () => {
    const ref = React.createRef<HTMLElement>();
    render(<CitationCard ref={ref} {...defaultProps} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("ARTICLE");
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("CitationCard — axe accessibility", () => {
  it("has no violations — default", async () => {
    const { container } = render(<CitationCard {...defaultProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with index and snippet", async () => {
    const { container } = render(
      <CitationCard
        {...defaultProps}
        index={1}
        snippet="A sample snippet from the source."
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — document type", async () => {
    const { container } = render(
      <CitationCard {...defaultProps} type="document" index={2} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact density", async () => {
    const { container } = render(
      <CitationCard {...defaultProps} density="compact" index={3} snippet="Short." />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with icon", async () => {
    const icon = <svg aria-hidden="true"><circle cx="12" cy="12" r="10" /></svg>;
    const { container } = render(
      <CitationCard {...defaultProps} icon={icon} index={4} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
