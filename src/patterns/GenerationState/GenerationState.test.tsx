import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { GenerationState } from "./GenerationState";

describe("GenerationState — live region", () => {
  it("renders role='status' with aria-live='polite'", () => {
    render(<GenerationState state="generating" />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("announces the default label for each state", () => {
    const { rerender } = render(<GenerationState state="generating" />);
    expect(screen.getByRole("status")).toHaveTextContent("Working on it — give me a few seconds");

    rerender(<GenerationState state="complete" />);
    expect(screen.getByRole("status")).toHaveTextContent("There we go");

    rerender(<GenerationState state="error" />);
    expect(screen.getByRole("status")).toHaveTextContent("Couldn't finish that one. Try again when you're ready");

    rerender(<GenerationState state="cancelled" />);
    expect(screen.getByRole("status")).toHaveTextContent("Stopped");
  });

  it("renders empty content for idle state", () => {
    render(<GenerationState state="idle" />);
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent("");
  });

  it("uses custom label when provided", () => {
    render(<GenerationState state="generating" label="Writing code..." />);
    expect(screen.getByRole("status")).toHaveTextContent("Writing code...");
  });
});

describe("GenerationState — icon indicator", () => {
  it("renders an indicator dot when not idle", () => {
    const { container } = render(<GenerationState state="generating" />);
    const indicator = container.querySelector('[class*="indicator"]');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveAttribute("aria-hidden", "true");
  });

  it("does not render indicator in idle state without label", () => {
    const { container } = render(<GenerationState state="idle" />);
    const indicator = container.querySelector('[class*="indicator"]');
    expect(indicator).not.toBeInTheDocument();
  });
});

describe("GenerationState — progress", () => {
  it("renders a progressbar when progress is provided during generating", () => {
    render(<GenerationState state="generating" progress={45} />);
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "45");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
  });

  it("clamps progress to 0–100", () => {
    render(<GenerationState state="generating" progress={150} />);
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "100");
  });

  it("does not render progressbar in non-generating states", () => {
    render(<GenerationState state="complete" progress={100} />);
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});

describe("GenerationState — cancel button", () => {
  it("shows cancel button during generating when onCancel is provided", () => {
    render(<GenerationState state="generating" onCancel={() => {}} />);
    expect(
      screen.getByRole("button", { name: "Cancel generation" })
    ).toBeInTheDocument();
  });

  it("does not show cancel button in non-generating states", () => {
    render(<GenerationState state="complete" onCancel={() => {}} />);
    expect(
      screen.queryByRole("button", { name: "Cancel generation" })
    ).not.toBeInTheDocument();
  });

  it("calls onCancel when clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<GenerationState state="generating" onCancel={onCancel} />);
    await user.click(
      screen.getByRole("button", { name: "Cancel generation" })
    );
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("cancel button is keyboard accessible", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<GenerationState state="generating" onCancel={onCancel} />);
    const button = screen.getByRole("button", { name: "Cancel generation" });
    button.focus();
    await user.keyboard("{Enter}");
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

describe("GenerationState — density", () => {
  it("defaults to comfortable density", () => {
    const { container } = render(<GenerationState state="generating" />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("data-density", "comfortable");
  });

  it("supports compact density", () => {
    const { container } = render(
      <GenerationState state="generating" density="compact" />
    );
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("data-density", "compact");
  });
});

describe("GenerationState — state data attribute", () => {
  it("sets data-state attribute for CSS styling", () => {
    const { container } = render(<GenerationState state="error" />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("data-state", "error");
  });
});

describe("GenerationState — axe accessibility", () => {
  it("has no violations in idle state", async () => {
    const { container } = render(<GenerationState state="idle" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations while generating", async () => {
    const { container } = render(<GenerationState state="generating" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with progress", async () => {
    const { container } = render(
      <GenerationState state="generating" progress={50} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with cancel button", async () => {
    const { container } = render(
      <GenerationState state="generating" onCancel={() => {}} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations in error state", async () => {
    const { container } = render(<GenerationState state="error" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations in complete state", async () => {
    const { container } = render(<GenerationState state="complete" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
