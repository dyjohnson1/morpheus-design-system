import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { SideNav, SideNavItem, SideNavGroup } from "./SideNav";

describe("SideNav", () => {
  it("renders as a navigation landmark with aria-label", () => {
    render(
      <SideNav aria-label="Main navigation">
        <SideNavItem label="Home" />
      </SideNav>
    );
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
  });

  it("renders density data attribute", () => {
    render(
      <SideNav aria-label="Nav" density="compact">
        <SideNavItem label="Home" />
      </SideNav>
    );
    expect(screen.getByRole("navigation")).toHaveAttribute("data-density", "compact");
  });

  it("renders collapsed data attribute", () => {
    render(
      <SideNav aria-label="Nav" collapsed>
        <SideNavItem label="Home" collapsed />
      </SideNav>
    );
    expect(screen.getByRole("navigation")).toHaveAttribute("data-collapsed", "true");
  });
});

describe("SideNavItem", () => {
  it("renders a button with the item label", () => {
    render(<SideNavItem label="Dashboard" />);
    expect(screen.getByRole("button", { name: "Dashboard" })).toBeInTheDocument();
  });

  it("renders as a link when href is provided", () => {
    render(<SideNavItem label="Home" href="/home" />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/home");
  });

  it("marks active item with aria-current=page", () => {
    render(<SideNavItem label="Home" active />);
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute("aria-current", "page");
  });

  it("disables interaction when disabled", () => {
    render(<SideNavItem label="Locked" disabled />);
    expect(screen.getByRole("button", { name: "Locked" })).toBeDisabled();
  });

  it("collapsed item has aria-label for screen readers", () => {
    render(<SideNavItem label="Settings" collapsed />);
    expect(screen.getByRole("button", { name: "Settings" })).toHaveAttribute("aria-label", "Settings");
  });

  it("is keyboard focusable", () => {
    render(<SideNavItem label="Focus me" />);
    const item = screen.getByRole("button", { name: "Focus me" });
    item.focus();
    expect(document.activeElement).toBe(item);
  });

  it("responds to click events", async () => {
    const onClick = vi.fn();
    render(<SideNavItem label="Click me" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("responds to Enter key", async () => {
    const onClick = vi.fn();
    render(<SideNavItem label="Press me" onClick={onClick} />);
    const item = screen.getByRole("button", { name: "Press me" });
    item.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("SideNavGroup", () => {
  it("renders a collapsible group with heading", () => {
    render(
      <SideNavGroup heading="Workspace">
        <SideNavItem label="Projects" />
        <SideNavItem label="Team" />
      </SideNavGroup>
    );
    expect(screen.getByRole("button", { name: /Workspace/i })).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("collapses and expands on trigger click", async () => {
    render(
      <SideNavGroup heading="Section" defaultOpen={true}>
        <SideNavItem label="Item A" />
      </SideNavGroup>
    );
    const trigger = screen.getByRole("button", { name: /Section/i });
    expect(screen.getByText("Item A")).toBeVisible();

    await userEvent.click(trigger);
    // Radix Collapsible hides content
    const content = trigger.nextElementSibling;
    expect(content).toHaveAttribute("data-state", "closed");
  });

  it("toggle works with Enter key", async () => {
    render(
      <SideNavGroup heading="Section" defaultOpen={true}>
        <SideNavItem label="Item B" />
      </SideNavGroup>
    );
    const trigger = screen.getByRole("button", { name: /Section/i });
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    const content = trigger.nextElementSibling;
    expect(content).toHaveAttribute("data-state", "closed");
  });

  it("renders non-collapsible group when collapsible=false", () => {
    render(
      <SideNavGroup heading="Resources" collapsible={false}>
        <SideNavItem label="Projects" />
      </SideNavGroup>
    );
    // No collapsible trigger button for the group heading
    expect(screen.queryByRole("button", { name: /Resources/i })).not.toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("in collapsed mode renders group without heading text", () => {
    render(
      <SideNavGroup heading="Hidden heading" collapsed>
        <SideNavItem label="Item" collapsed />
      </SideNavGroup>
    );
    // group has aria-label
    expect(screen.getByRole("group", { name: "Hidden heading" })).toBeInTheDocument();
  });
});

describe("SideNav accessibility", () => {
  it("has no axe violations in default state", async () => {
    const { container } = render(
      <SideNav aria-label="Main navigation">
        <SideNavItem icon={<span>🏠</span>} label="Home" active />
        <SideNavItem icon={<span>📥</span>} label="Inbox" />
        <SideNavItem icon={<span>📄</span>} label="Documents" />
      </SideNav>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations in collapsed state", async () => {
    const { container } = render(
      <SideNav aria-label="Main navigation" collapsed>
        <SideNavItem icon={<span>🏠</span>} label="Home" active collapsed />
        <SideNavItem icon={<span>📥</span>} label="Inbox" collapsed />
      </SideNav>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations with groups", async () => {
    const { container } = render(
      <SideNav aria-label="App navigation">
        <SideNavGroup heading="Overview">
          <SideNavItem label="Home" active />
          <SideNavItem label="Analytics" />
        </SideNavGroup>
        <SideNavGroup heading="Workspace">
          <SideNavItem label="Projects" />
          <SideNavItem label="Team" />
        </SideNavGroup>
      </SideNav>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations with disabled items", async () => {
    const { container } = render(
      <SideNav aria-label="Nav">
        <SideNavItem label="Enabled" />
        <SideNavItem label="Disabled" disabled />
      </SideNav>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations with link items", async () => {
    const { container } = render(
      <SideNav aria-label="Nav">
        <SideNavItem label="Home" href="/home" active />
        <SideNavItem label="About" href="/about" />
      </SideNav>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
