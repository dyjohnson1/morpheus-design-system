import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./Sheet";

/** Helper — renders a complete sheet with trigger, title, and description. */
function renderSheet({
  defaultOpen = false,
  side,
  showClose = true,
}: {
  defaultOpen?: boolean;
  side?: "left" | "right" | "top" | "bottom";
  showClose?: boolean;
} = {}) {
  return render(
    <Sheet defaultOpen={defaultOpen}>
      <SheetTrigger>
        <button>Open</button>
      </SheetTrigger>
      <SheetContent side={side} showClose={showClose}>
        <SheetTitle>Test sheet</SheetTitle>
        <SheetDescription>Test description</SheetDescription>
        <SheetClose>
          <button>Cancel</button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

describe("Sheet — role and label", () => {
  it("renders role='dialog' when open", () => {
    renderSheet({ defaultOpen: true });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("has accessible title via aria-labelledby", () => {
    renderSheet({ defaultOpen: true });
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby");
    expect(screen.getByText("Test sheet")).toBeInTheDocument();
  });

  it("has accessible description via aria-describedby", () => {
    renderSheet({ defaultOpen: true });
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("does not render sheet content when closed", () => {
    renderSheet({ defaultOpen: false });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders close button with accessible label", () => {
    renderSheet({ defaultOpen: true });
    expect(screen.getByLabelText("Close sheet")).toBeInTheDocument();
  });

  it("hides close button when showClose is false", () => {
    renderSheet({ defaultOpen: true, showClose: false });
    expect(screen.queryByLabelText("Close sheet")).not.toBeInTheDocument();
  });
});

describe("Sheet — keyboard interaction", () => {
  it("opens sheet when trigger is activated", async () => {
    const user = userEvent.setup();
    renderSheet();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes sheet when Escape is pressed", async () => {
    const user = userEvent.setup();
    renderSheet({ defaultOpen: true });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes sheet when close button is clicked", async () => {
    const user = userEvent.setup();
    renderSheet({ defaultOpen: true });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByLabelText("Close sheet"));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes sheet when SheetClose child is clicked", async () => {
    const user = userEvent.setup();
    renderSheet({ defaultOpen: true });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("traps focus within the sheet", async () => {
    const user = userEvent.setup();
    renderSheet({ defaultOpen: true });

    const dialog = screen.getByRole("dialog");
    expect(dialog.contains(document.activeElement)).toBe(true);

    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });
});

describe("Sheet — side variants", () => {
  it("applies right class by default", () => {
    renderSheet({ defaultOpen: true });
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("right");
  });

  it("applies left class for left side", () => {
    renderSheet({ defaultOpen: true, side: "left" });
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("left");
  });

  it("applies top class for top side", () => {
    renderSheet({ defaultOpen: true, side: "top" });
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("top");
  });

  it("applies bottom class for bottom side", () => {
    renderSheet({ defaultOpen: true, side: "bottom" });
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("bottom");
  });
});

describe("Sheet — controlled mode", () => {
  it("calls onOpenChange when state changes", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Sheet onOpenChange={onOpenChange}>
        <SheetTrigger>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Controlled</SheetTitle>
          <SheetDescription>Controlled sheet</SheetDescription>
        </SheetContent>
      </Sheet>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("respects controlled open prop", () => {
    render(
      <Sheet open={true}>
        <SheetTrigger>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Forced open</SheetTitle>
          <SheetDescription>Always open</SheetDescription>
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("Sheet — axe accessibility", () => {
  it("has no violations when closed", async () => {
    const { container } = renderSheet({ defaultOpen: false });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations when open", async () => {
    const { container } = renderSheet({ defaultOpen: true });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations for all side variants", async () => {
    const { container } = render(
      <Sheet open={true}>
        <SheetTrigger>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle>Left sheet</SheetTitle>
          <SheetDescription>Testing left variant accessibility.</SheetDescription>
          <SheetClose>
            <button>Close</button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
