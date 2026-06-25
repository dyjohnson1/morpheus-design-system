import * as React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { axe } from "jest-axe";
import { SuggestionChips } from "./SuggestionChips";
import type { Suggestion } from "./SuggestionChips";

const suggestions: Suggestion[] = [
  { id: "1", label: "Summarize" },
  { id: "2", label: "Translate" },
  { id: "3", label: "Rewrite" },
];

/* ─── Role & label ──────────────────────────────────────────────────────── */
describe("SuggestionChips — role and label", () => {
  it("renders as a group with an accessible label", () => {
    render(<SuggestionChips suggestions={suggestions} label="Quick actions" />);
    const group = screen.getByRole("group", { name: "Quick actions" });
    expect(group).toBeInTheDocument();
  });

  it("renders each suggestion as a button", () => {
    render(<SuggestionChips suggestions={suggestions} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent("Summarize");
    expect(buttons[1]).toHaveTextContent("Translate");
    expect(buttons[2]).toHaveTextContent("Rewrite");
  });

  it("uses default label 'Suggestions' when no label provided", () => {
    render(<SuggestionChips suggestions={suggestions} />);
    expect(screen.getByRole("group", { name: "Suggestions" })).toBeInTheDocument();
  });
});

/* ─── onSelect callback ─────────────────────────────────────────────────── */
describe("SuggestionChips — onSelect", () => {
  it("calls onSelect with the suggestion id when clicked", () => {
    const onSelect = vi.fn();
    render(<SuggestionChips suggestions={suggestions} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "Translate" }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith("2");
  });

  it("does not call onSelect when group is disabled", () => {
    const onSelect = vi.fn();
    render(<SuggestionChips suggestions={suggestions} onSelect={onSelect} disabled />);
    fireEvent.click(screen.getByRole("button", { name: "Summarize" }));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("does not call onSelect for a disabled suggestion", () => {
    const onSelect = vi.fn();
    const withDisabled: Suggestion[] = [
      { id: "1", label: "Enabled" },
      { id: "2", label: "Disabled", disabled: true },
    ];
    render(<SuggestionChips suggestions={withDisabled} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "Disabled" }));
    expect(onSelect).not.toHaveBeenCalled();
  });
});

/* ─── Keyboard navigation ───────────────────────────────────────────────── */
describe("SuggestionChips — keyboard navigation", () => {
  it("first chip has tabIndex=0 (roving tabindex entry point)", () => {
    render(<SuggestionChips suggestions={suggestions} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("tabindex", "0");
    expect(buttons[1]).toHaveAttribute("tabindex", "-1");
    expect(buttons[2]).toHaveAttribute("tabindex", "-1");
  });

  it("ArrowRight moves focus to next chip", () => {
    render(<SuggestionChips suggestions={suggestions} />);
    const group = screen.getByRole("group");
    const buttons = screen.getAllByRole("button");

    act(() => { buttons[0].focus(); });
    fireEvent.keyDown(group, { key: "ArrowRight" });

    expect(buttons[1]).toHaveFocus();
  });

  it("ArrowLeft moves focus to previous chip (wraps)", () => {
    render(<SuggestionChips suggestions={suggestions} />);
    const group = screen.getByRole("group");
    const buttons = screen.getAllByRole("button");

    act(() => { buttons[0].focus(); });
    fireEvent.keyDown(group, { key: "ArrowLeft" });

    // Wraps to last
    expect(buttons[2]).toHaveFocus();
  });

  it("ArrowRight wraps from last to first", () => {
    render(<SuggestionChips suggestions={suggestions} />);
    const group = screen.getByRole("group");
    const buttons = screen.getAllByRole("button");

    act(() => { buttons[2].focus(); });
    fireEvent.keyDown(group, { key: "ArrowRight" });

    expect(buttons[0]).toHaveFocus();
  });

  it("skips disabled chips during navigation", () => {
    const withDisabled: Suggestion[] = [
      { id: "1", label: "First" },
      { id: "2", label: "Disabled", disabled: true },
      { id: "3", label: "Third" },
    ];
    render(<SuggestionChips suggestions={withDisabled} />);
    const group = screen.getByRole("group");
    const buttons = screen.getAllByRole("button");

    act(() => { buttons[0].focus(); });
    fireEvent.keyDown(group, { key: "ArrowRight" });

    // Should skip disabled and move to third
    expect(buttons[2]).toHaveFocus();
  });

  it("Home moves focus to first enabled chip", () => {
    render(<SuggestionChips suggestions={suggestions} />);
    const group = screen.getByRole("group");
    const buttons = screen.getAllByRole("button");

    act(() => { buttons[2].focus(); });
    fireEvent.keyDown(group, { key: "Home" });

    expect(buttons[0]).toHaveFocus();
  });

  it("End moves focus to last enabled chip", () => {
    render(<SuggestionChips suggestions={suggestions} />);
    const group = screen.getByRole("group");
    const buttons = screen.getAllByRole("button");

    act(() => { buttons[0].focus(); });
    fireEvent.keyDown(group, { key: "End" });

    expect(buttons[2]).toHaveFocus();
  });
});

/* ─── Disabled state ────────────────────────────────────────────────────── */
describe("SuggestionChips — disabled", () => {
  it("marks the group aria-disabled when disabled", () => {
    render(<SuggestionChips suggestions={suggestions} disabled />);
    expect(screen.getByRole("group")).toHaveAttribute("aria-disabled", "true");
  });

  it("all buttons are disabled when group is disabled", () => {
    render(<SuggestionChips suggestions={suggestions} disabled />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});

/* ─── Density ───────────────────────────────────────────────────────────── */
describe("SuggestionChips — density", () => {
  it("sets data-density=comfortable by default", () => {
    render(<SuggestionChips suggestions={suggestions} />);
    expect(screen.getByRole("group")).toHaveAttribute("data-density", "comfortable");
  });

  it("sets data-density=compact when specified", () => {
    render(<SuggestionChips suggestions={suggestions} density="compact" />);
    expect(screen.getByRole("group")).toHaveAttribute("data-density", "compact");
  });
});

/* ─── Loading state ─────────────────────────────────────────────────────── */
describe("SuggestionChips — loading", () => {
  it("renders skeleton chips when loading", () => {
    const { container } = render(
      <SuggestionChips suggestions={[]} loading loadingCount={4} />
    );
    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("aria-busy", "true");
    // Skeleton chips are aria-hidden spans
    const skeletons = container.querySelectorAll("[aria-hidden='true']");
    expect(skeletons.length).toBe(4);
  });

  it("does not render chip buttons when loading", () => {
    render(<SuggestionChips suggestions={suggestions} loading />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});

/* ─── Icon support ──────────────────────────────────────────────────────── */
describe("SuggestionChips — icons", () => {
  it("renders an icon when provided", () => {
    const withIcon: Suggestion[] = [
      {
        id: "1",
        label: "Write",
        icon: <svg data-testid="write-icon" aria-hidden="true" />,
      },
    ];
    render(<SuggestionChips suggestions={withIcon} />);
    expect(screen.getByTestId("write-icon")).toBeInTheDocument();
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────── */
describe("SuggestionChips — forwardRef", () => {
  it("forwards ref to the root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SuggestionChips ref={ref} suggestions={suggestions} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("SuggestionChips — axe accessibility", () => {
  it("has no violations — default state", async () => {
    const { container } = render(
      <SuggestionChips suggestions={suggestions} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — disabled", async () => {
    const { container } = render(
      <SuggestionChips suggestions={suggestions} disabled />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — loading", async () => {
    const { container } = render(
      <SuggestionChips suggestions={[]} loading />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact density", async () => {
    const { container } = render(
      <SuggestionChips suggestions={suggestions} density="compact" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with icons", async () => {
    const withIcons: Suggestion[] = [
      { id: "1", label: "Summarize", icon: <svg aria-hidden="true" /> },
      { id: "2", label: "Translate", icon: <svg aria-hidden="true" /> },
    ];
    const { container } = render(
      <SuggestionChips suggestions={withIcons} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
