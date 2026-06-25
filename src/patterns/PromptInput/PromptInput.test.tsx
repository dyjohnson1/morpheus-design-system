import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { PromptInput } from "./PromptInput";

/* ─── Role & label ──────────────────────────────────────────────────────── */
describe("PromptInput — role and label", () => {
  it("renders a textarea with the accessible label", () => {
    render(<PromptInput aria-label="Chat prompt" />);
    expect(
      screen.getByRole("textbox", { name: "Chat prompt" })
    ).toBeInTheDocument();
  });

  it("renders with default aria-label when none provided", () => {
    render(<PromptInput />);
    expect(
      screen.getByRole("textbox", { name: "Prompt" })
    ).toBeInTheDocument();
  });

  it("renders with default placeholder", () => {
    render(<PromptInput />);
    expect(screen.getByPlaceholderText("Ask anything\u2026")).toBeInTheDocument();
  });

  it("renders a send button", () => {
    render(<PromptInput />);
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });
});

/* ─── Keyboard interaction ──────────────────────────────────────────────── */
describe("PromptInput — keyboard interaction", () => {
  it("submits on Enter", () => {
    const onSubmit = vi.fn();
    render(<PromptInput defaultValue="Hello" onSubmit={onSubmit} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });
    expect(onSubmit).toHaveBeenCalledWith("Hello");
  });

  it("does not submit on Shift+Enter (allows new line)", () => {
    const onSubmit = vi.fn();
    render(<PromptInput defaultValue="Hello" onSubmit={onSubmit} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("does not submit when value is empty/whitespace", () => {
    const onSubmit = vi.fn();
    render(<PromptInput defaultValue="   " onSubmit={onSubmit} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("clears input after successful submit (uncontrolled)", () => {
    const onSubmit = vi.fn();
    render(<PromptInput defaultValue="Hello" onSubmit={onSubmit} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });
    expect(textarea).toHaveValue("");
  });

  it("submits via the send button click", () => {
    const onSubmit = vi.fn();
    render(<PromptInput defaultValue="Click send" onSubmit={onSubmit} />);
    const sendBtn = screen.getByRole("button", { name: "Send" });
    fireEvent.click(sendBtn);
    expect(onSubmit).toHaveBeenCalledWith("Click send");
  });
});

/* ─── Disabled state ─────────────────────────────────────────────────────── */
describe("PromptInput — disabled state", () => {
  it("disables textarea and send button", () => {
    render(<PromptInput disabled defaultValue="Locked" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Send" })).toBeDisabled();
  });

  it("does not submit when disabled", () => {
    const onSubmit = vi.fn();
    render(<PromptInput disabled defaultValue="Locked" onSubmit={onSubmit} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

/* ─── Loading state ──────────────────────────────────────────────────────── */
describe("PromptInput — loading state", () => {
  it("disables interaction and shows loading label", () => {
    render(<PromptInput loading defaultValue="Waiting" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
    const btn = screen.getByRole("button", { name: "Sending" });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });

  it("renders custom loading label", () => {
    render(<PromptInput loading loadingLabel="Processing" defaultValue="x" />);
    expect(screen.getByRole("button", { name: "Processing" })).toBeInTheDocument();
  });
});

/* ─── Controlled mode ────────────────────────────────────────────────────── */
describe("PromptInput — controlled mode", () => {
  it("uses the controlled value", () => {
    render(<PromptInput value="Controlled" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("Controlled");
  });

  it("calls onChange on input", () => {
    const onChange = vi.fn();
    render(<PromptInput value="" onChange={onChange} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "New" } });
    expect(onChange).toHaveBeenCalledWith("New");
  });
});

/* ─── Density ────────────────────────────────────────────────────────────── */
describe("PromptInput — density", () => {
  it("applies comfortable density by default", () => {
    const { container } = render(<PromptInput />);
    const root = container.firstElementChild;
    expect(root?.className).toContain("comfortable");
  });

  it("applies compact density", () => {
    const { container } = render(<PromptInput density="compact" />);
    const root = container.firstElementChild;
    expect(root?.className).toContain("compact");
  });
});

/* ─── Slots ──────────────────────────────────────────────────────────────── */
describe("PromptInput — slots", () => {
  it("renders leading slot content", () => {
    render(<PromptInput leadingSlot={<span data-testid="lead">A</span>} />);
    expect(screen.getByTestId("lead")).toBeInTheDocument();
  });

  it("renders trailing slot content", () => {
    render(<PromptInput trailingSlot={<span data-testid="trail">B</span>} />);
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────── */
describe("PromptInput — forwardRef", () => {
  it("forwards a ref to the textarea element", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<PromptInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});

/* ─── Axe accessibility ──────────────────────────────────────────────────── */
describe("PromptInput — axe accessibility", () => {
  it("has no violations — default state", async () => {
    const { container } = render(<PromptInput />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with value", async () => {
    const { container } = render(
      <PromptInput defaultValue="Some prompt text" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — disabled", async () => {
    const { container } = render(
      <PromptInput disabled defaultValue="Disabled" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — loading", async () => {
    const { container } = render(
      <PromptInput loading defaultValue="Loading" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact density", async () => {
    const { container } = render(<PromptInput density="compact" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
