import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";

function renderBreadcrumb(props: Partial<React.ComponentProps<typeof Breadcrumb>> = {}) {
  return render(
    <Breadcrumb {...props}>
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#products">Products</BreadcrumbItem>
      <BreadcrumbItem href="#category">Category</BreadcrumbItem>
      <BreadcrumbItem current>Current page</BreadcrumbItem>
    </Breadcrumb>
  );
}

describe("Breadcrumb — role and label", () => {
  it("renders as a navigation landmark with aria-label", () => {
    renderBreadcrumb();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("supports custom aria-label", () => {
    renderBreadcrumb({ "aria-label": "Page path" });
    expect(screen.getByRole("navigation", { name: "Page path" })).toBeInTheDocument();
  });

  it("renders an ordered list inside the nav", () => {
    renderBreadcrumb();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("renders items as list items", () => {
    renderBreadcrumb();
    const items = screen.getAllByRole("listitem");
    // Only breadcrumb items (separators are aria-hidden)
    expect(items.length).toBe(4);
  });

  it("marks the current item with aria-current='page'", () => {
    renderBreadcrumb();
    expect(screen.getByText("Current page").closest("[aria-current='page']")).toBeInTheDocument();
  });

  it("renders non-current items as links", () => {
    renderBreadcrumb();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Category" })).toBeInTheDocument();
  });

  it("does not render the current item as a link", () => {
    renderBreadcrumb();
    expect(screen.queryByRole("link", { name: "Current page" })).not.toBeInTheDocument();
  });
});

describe("Breadcrumb — keyboard interaction", () => {
  it("links are keyboard navigable via Tab", async () => {
    const user = userEvent.setup();
    renderBreadcrumb();

    await user.tab();
    expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("link", { name: "Products" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("link", { name: "Category" })).toHaveFocus();
  });
});

describe("Breadcrumb — separator", () => {
  it("renders separators between items (hidden from a11y tree)", () => {
    renderBreadcrumb();
    const nav = screen.getByRole("navigation");
    const separators = nav.querySelectorAll("[aria-hidden='true']");
    // 3 separators between 4 items
    expect(separators.length).toBe(3);
  });

  it("supports custom separator content", () => {
    render(
      <Breadcrumb separator="/">
        <BreadcrumbItem href="#a">A</BreadcrumbItem>
        <BreadcrumbItem current>B</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText("/")).toBeInTheDocument();
  });
});

describe("Breadcrumb — collapse", () => {
  it("collapses middle items when maxItems is set", () => {
    render(
      <Breadcrumb maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
        <BreadcrumbItem href="#1">First</BreadcrumbItem>
        <BreadcrumbItem href="#2">Second</BreadcrumbItem>
        <BreadcrumbItem href="#3">Third</BreadcrumbItem>
        <BreadcrumbItem href="#4">Fourth</BreadcrumbItem>
        <BreadcrumbItem current>Fifth</BreadcrumbItem>
      </Breadcrumb>
    );

    // First and last shown, middle collapsed
    expect(screen.getByRole("link", { name: "First" })).toBeInTheDocument();
    expect(screen.getByText("Fifth")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Second" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Third" })).not.toBeInTheDocument();

    // Ellipsis button present
    expect(screen.getByRole("button", { name: "Show collapsed breadcrumbs" })).toBeInTheDocument();
  });

  it("expands collapsed items when ellipsis is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Breadcrumb maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
        <BreadcrumbItem href="#1">First</BreadcrumbItem>
        <BreadcrumbItem href="#2">Second</BreadcrumbItem>
        <BreadcrumbItem href="#3">Third</BreadcrumbItem>
        <BreadcrumbItem href="#4">Fourth</BreadcrumbItem>
        <BreadcrumbItem current>Fifth</BreadcrumbItem>
      </Breadcrumb>
    );

    await user.click(screen.getByRole("button", { name: "Show collapsed breadcrumbs" }));

    // All items now visible
    expect(screen.getByRole("link", { name: "First" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Second" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Third" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Fourth" })).toBeInTheDocument();
    expect(screen.getByText("Fifth")).toBeInTheDocument();

    // Ellipsis no longer present
    expect(screen.queryByRole("button", { name: "Show collapsed breadcrumbs" })).not.toBeInTheDocument();
  });
});

describe("Breadcrumb — density", () => {
  it("applies density data attribute", () => {
    renderBreadcrumb({ density: "compact" });
    expect(screen.getByRole("navigation")).toHaveAttribute("data-density", "compact");
  });
});

describe("Breadcrumb — axe accessibility", () => {
  it("has no violations in default state", async () => {
    const { container } = renderBreadcrumb();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with compact density", async () => {
    const { container } = renderBreadcrumb({ density: "compact" });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with collapsed items", async () => {
    const { container } = render(
      <Breadcrumb maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
        <BreadcrumbItem href="#1">First</BreadcrumbItem>
        <BreadcrumbItem href="#2">Second</BreadcrumbItem>
        <BreadcrumbItem href="#3">Third</BreadcrumbItem>
        <BreadcrumbItem href="#4">Fourth</BreadcrumbItem>
        <BreadcrumbItem current>Fifth</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
