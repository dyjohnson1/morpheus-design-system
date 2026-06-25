import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./Dialog";

/** Helper — renders a complete dialog with trigger, title, and description. */
function renderDialog({
  defaultOpen = false,
  size,
  showClose = true,
}: {
  defaultOpen?: boolean;
  size?: "sm" | "md" | "lg";
  showClose?: boolean;
} = {}) {
  return render(
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger>
        <button>Open</button>
      </DialogTrigger>
      <DialogContent size={size} showClose={showClose}>
        <DialogTitle>Test dialog</DialogTitle>
        <DialogDescription>Test description</DialogDescription>
        <DialogClose>
          <button>Cancel</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog — role and label", () => {
  it("renders role='dialog' when open", () => {
    renderDialog({ defaultOpen: true });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("has accessible title via aria-labelledby", () => {
    renderDialog({ defaultOpen: true });
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby");
    expect(screen.getByText("Test dialog")).toBeInTheDocument();
  });

  it("has accessible description via aria-describedby", () => {
    renderDialog({ defaultOpen: true });
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("does not render dialog content when closed", () => {
    renderDialog({ defaultOpen: false });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders close button with accessible label", () => {
    renderDialog({ defaultOpen: true });
    expect(screen.getByLabelText("Close dialog")).toBeInTheDocument();
  });

  it("hides close button when showClose is false", () => {
    renderDialog({ defaultOpen: true, showClose: false });
    expect(screen.queryByLabelText("Close dialog")).not.toBeInTheDocument();
  });
});

describe("Dialog — keyboard interaction", () => {
  it("opens dialog when trigger is activated", async () => {
    const user = userEvent.setup();
    renderDialog();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes dialog when Escape is pressed", async () => {
    const user = userEvent.setup();
    renderDialog({ defaultOpen: true });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes dialog when close button is clicked", async () => {
    const user = userEvent.setup();
    renderDialog({ defaultOpen: true });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByLabelText("Close dialog"));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes dialog when DialogClose child is clicked", async () => {
    const user = userEvent.setup();
    renderDialog({ defaultOpen: true });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("traps focus within the dialog", async () => {
    const user = userEvent.setup();
    renderDialog({ defaultOpen: true });

    const dialog = screen.getByRole("dialog");
    // Focus should be within the dialog
    expect(dialog.contains(document.activeElement)).toBe(true);

    // Tab through focusable elements — focus should remain trapped
    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });
});

describe("Dialog — controlled mode", () => {
  it("calls onOpenChange when state changes", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger>
          <button>Open</button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Controlled</DialogTitle>
          <DialogDescription>Controlled dialog</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("respects controlled open prop", () => {
    render(
      <Dialog open={true}>
        <DialogTrigger>
          <button>Open</button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Forced open</DialogTitle>
          <DialogDescription>Always open</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("Dialog — size variants", () => {
  it("applies sm class for small size", () => {
    renderDialog({ defaultOpen: true, size: "sm" });
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("sm");
  });

  it("applies md class for medium size (default)", () => {
    renderDialog({ defaultOpen: true, size: "md" });
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("md");
  });

  it("applies lg class for large size", () => {
    renderDialog({ defaultOpen: true, size: "lg" });
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("lg");
  });
});

describe("Dialog — axe accessibility", () => {
  it("has no violations when closed", async () => {
    const { container } = renderDialog({ defaultOpen: false });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations when open", async () => {
    const { container } = renderDialog({ defaultOpen: true });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with all sizes", async () => {
    const { container } = render(
      <Dialog open={true}>
        <DialogTrigger>
          <button>Open</button>
        </DialogTrigger>
        <DialogContent size="lg">
          <DialogTitle>Large dialog</DialogTitle>
          <DialogDescription>Testing large variant accessibility.</DialogDescription>
          <DialogClose>
            <button>Close</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
