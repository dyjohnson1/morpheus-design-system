import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

function renderTabs(props: Partial<React.ComponentProps<typeof Tabs>> = {}) {
  return render(
    <Tabs defaultValue="one" {...props}>
      <TabsList aria-label="Test tabs">
        <TabsTrigger value="one">Tab One</TabsTrigger>
        <TabsTrigger value="two">Tab Two</TabsTrigger>
        <TabsTrigger value="three" disabled>Tab Three</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Content one</TabsContent>
      <TabsContent value="two">Content two</TabsContent>
      <TabsContent value="three">Content three</TabsContent>
    </Tabs>
  );
}

describe("Tabs — role and label", () => {
  it("renders tablist with accessible label", () => {
    renderTabs();
    expect(screen.getByRole("tablist", { name: "Test tabs" })).toBeInTheDocument();
  });

  it("renders tab triggers with role='tab'", () => {
    renderTabs();
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveTextContent("Tab One");
  });

  it("renders active tab panel with role='tabpanel'", () => {
    renderTabs();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content one");
  });

  it("marks active tab with aria-selected", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "Tab One" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Tab Two" })).toHaveAttribute("aria-selected", "false");
  });
});

describe("Tabs — keyboard interaction", () => {
  it("navigates between tabs with arrow keys", async () => {
    const user = userEvent.setup();
    renderTabs();

    // Focus first tab
    await user.tab();
    expect(screen.getByRole("tab", { name: "Tab One" })).toHaveFocus();

    // Arrow right moves to next tab
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab Two" })).toHaveFocus();
  });

  it("skips disabled tabs during keyboard navigation", async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.tab();
    // Tab One → Tab Two → loops back to Tab One (skips disabled Tab Three)
    await user.keyboard("{ArrowRight}");
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab One" })).toHaveFocus();
  });

  it("activates tab on click", async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByRole("tab", { name: "Tab Two" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content two");
  });
});

describe("Tabs — controlled mode", () => {
  it("calls onValueChange when tab is selected", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Tabs value="one" onValueChange={onValueChange}>
        <TabsList aria-label="Controlled tabs">
          <TabsTrigger value="one">First</TabsTrigger>
          <TabsTrigger value="two">Second</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First content</TabsContent>
        <TabsContent value="two">Second content</TabsContent>
      </Tabs>
    );

    await user.click(screen.getByRole("tab", { name: "Second" }));
    expect(onValueChange).toHaveBeenCalledWith("two");
  });
});

describe("Tabs — axe accessibility", () => {
  it("has no violations in default state", async () => {
    const { container } = renderTabs();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with contained variant", async () => {
    const { container } = renderTabs({ variant: "contained" });
    expect(await axe(container)).toHaveNoViolations();
  });
});
