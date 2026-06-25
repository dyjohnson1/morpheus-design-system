import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverArrow,
} from "./Popover";

/** Helper — renders a complete popover with trigger and content. */
function renderPopover({
  defaultOpen = false,
  side,
  arrow = false,
}: {
  defaultOpen?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  arrow?: boolean;
} = {}) {
  return render(
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger>
        <button>Open</button>
      </PopoverTrigger>
      <PopoverContent side={side}>
        {arrow && <PopoverArrow />}
        <p>Popover content</p>
        <PopoverClose>
          <button>Close</button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover — role and label", () => {
  it("renders with proper accessible structure when open", () => {
    renderPopover({ defaultOpen: true });
    // Radix Popover uses role="dialog" on the content
    const popoverContent = screen.getByRole("dialog");
    expect(popoverContent).toBeInTheDocument();
  });

  it("does not render content when closed", () => {
    renderPopover({ defaultOpen: false });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("trigger has aria-expanded=true when popover is open", () => {
    renderPopover({ defaultOpen: true });
    const trigger = screen.getByRole("button", { name: "Open" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("trigger has aria-expanded=false when popover is closed", () => {
    renderPopover({ defaultOpen: false });
    const trigger = screen.getByRole("button", { name: "Open" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

describe("Popover — keyboard interaction", () => {
  it("opens popover when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderPopover();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes popover when Escape is pressed", async () => {
    const user = userEvent.setup();
    renderPopover({ defaultOpen: true });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes popover when PopoverClose child is clicked", async () => {
    const user = userEvent.setup();
    renderPopover({ defaultOpen: true });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("returns focus to trigger when closed via Escape", async () => {
    const user = userEvent.setup();
    renderPopover({ defaultOpen: true });

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: "Open" })).toHaveFocus();
  });
});

describe("Popover — controlled mode", () => {
  it("calls onOpenChange when state changes", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <button>Open</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Content</p>
        </PopoverContent>
      </Popover>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("respects controlled open prop", () => {
    render(
      <Popover open={true}>
        <PopoverTrigger>
          <button>Open</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Forced open</p>
        </PopoverContent>
      </Popover>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("Popover — arrow", () => {
  it("renders arrow when PopoverArrow is included", () => {
    renderPopover({ defaultOpen: true, arrow: true });
    const popoverContent = screen.getByRole("dialog");
    expect(popoverContent.querySelector("svg")).toBeInTheDocument();
  });

  it("does not render arrow when PopoverArrow is not included", () => {
    renderPopover({ defaultOpen: true, arrow: false });
    const popoverContent = screen.getByRole("dialog");
    expect(popoverContent.querySelector("svg")).not.toBeInTheDocument();
  });
});

describe("Popover — axe accessibility", () => {
  it("has no violations when closed", async () => {
    const { container } = renderPopover({ defaultOpen: false });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations when open", async () => {
    const { container } = renderPopover({ defaultOpen: true });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with arrow", async () => {
    const { container } = renderPopover({ defaultOpen: true, arrow: true });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with rich content", async () => {
    const { container } = render(
      <Popover open={true}>
        <PopoverTrigger>
          <button>Settings</button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <div>
            <h4>Preferences</h4>
            <label>
              <input type="checkbox" />
              Enable notifications
            </label>
            <PopoverClose>
              <button>Done</button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
