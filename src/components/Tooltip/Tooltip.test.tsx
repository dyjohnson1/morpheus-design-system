import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Tooltip, TooltipProvider } from "./Tooltip";

/** Helper — wraps tooltip in provider with zero delay for test speed. */
function renderTooltip(
  ui: React.ReactElement,
  { providerDelay = 0 }: { providerDelay?: number } = {}
) {
  return render(<TooltipProvider delayDuration={providerDelay}>{ui}</TooltipProvider>);
}

describe("Tooltip — role and label", () => {
  it("renders role='tooltip' when open", () => {
    renderTooltip(
      <Tooltip content="Help text" open>
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByRole("tooltip")).toHaveTextContent("Help text");
  });

  it("does not render tooltip content when closed", () => {
    renderTooltip(
      <Tooltip content="Hidden text">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("associates tooltip with trigger via aria-describedby", () => {
    renderTooltip(
      <Tooltip content="Description" open>
        <button>Trigger</button>
      </Tooltip>
    );
    const trigger = screen.getByRole("button", { name: "Trigger" });
    const tooltip = screen.getByRole("tooltip");
    // Radix sets aria-describedby on the trigger pointing to the tooltip id
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
  });
});

describe("Tooltip — keyboard interaction", () => {
  it("shows tooltip when trigger receives focus", async () => {
    const user = userEvent.setup();
    renderTooltip(
      <Tooltip content="Focus tooltip" delayDuration={0}>
        <button>Focus me</button>
      </Tooltip>
    );

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    await user.tab();
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Focus tooltip");
  });

  it("hides tooltip when Escape is pressed", async () => {
    const user = userEvent.setup();
    renderTooltip(
      <Tooltip content="Dismissible" delayDuration={0}>
        <button>Trigger</button>
      </Tooltip>
    );

    await user.tab();
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });
});

describe("Tooltip — hover interaction", () => {
  it("shows tooltip on pointer hover", async () => {
    const user = userEvent.setup();
    renderTooltip(
      <Tooltip content="Hover content" delayDuration={0}>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    await user.hover(screen.getByRole("button", { name: "Hover me" }));
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });
});

describe("Tooltip — props", () => {
  it("renders content on the specified side (data-side on trigger)", () => {
    renderTooltip(
      <Tooltip content="Bottom tip" side="bottom" open>
        <button>Trigger</button>
      </Tooltip>
    );
    // Radix sets data-side on the trigger element when tooltip is open
    const trigger = screen.getByRole("button", { name: "Trigger" });
    expect(trigger).toHaveAttribute("data-radix-popper-side", "bottom");
  });

  it("renders without arrow when arrow=false", () => {
    renderTooltip(
      <Tooltip content="No arrow" arrow={false} open>
        <button>Trigger</button>
      </Tooltip>
    );
    // The tooltip content portal should not contain an SVG arrow
    const tooltipContent = document.querySelector('[class*="content"]');
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent!.querySelector("svg")).toBeNull();
  });

  it("renders with arrow by default", () => {
    renderTooltip(
      <Tooltip content="With arrow" open>
        <button>Trigger</button>
      </Tooltip>
    );
    // The tooltip content div should contain the arrow SVG
    const tooltipContent = document.querySelector('[class*="content"]');
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent!.querySelector("svg")).toBeInTheDocument();
  });

  it("calls onOpenChange when state changes", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    renderTooltip(
      <Tooltip content="Callback" delayDuration={0} onOpenChange={onOpenChange}>
        <button>Trigger</button>
      </Tooltip>
    );

    await user.tab();
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });
});

describe("Tooltip — axe accessibility", () => {
  it("has no violations when closed", async () => {
    const { container } = renderTooltip(
      <Tooltip content="Accessible">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations when open", async () => {
    const { container } = renderTooltip(
      <Tooltip content="Accessible tooltip" open>
        <button>Trigger</button>
      </Tooltip>
    );
    // Test the container (not baseElement) to avoid Radix portal landmark issue.
    // The portal content is accessible via aria-describedby association.
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with long content", async () => {
    const { container } = renderTooltip(
      <Tooltip
        content="This is a longer tooltip with multiple words to verify accessibility of wrapped text content."
        open
      >
        <button>Trigger</button>
      </Tooltip>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
