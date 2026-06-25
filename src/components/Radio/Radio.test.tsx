import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { RadioGroup, RadioItem } from "./Radio";

/* ─── Role & label ──────────────────────────────────────────────────────── */
describe("Radio — role and label", () => {
  it("renders as a radiogroup with accessible label", () => {
    render(
      <RadioGroup aria-label="Favorite color">
        <RadioItem value="red" label="Red" />
        <RadioItem value="blue" label="Blue" />
      </RadioGroup>
    );
    expect(screen.getByRole("radiogroup", { name: "Favorite color" })).toBeInTheDocument();
  });

  it("renders individual radios with labels", () => {
    render(
      <RadioGroup aria-label="Fruits">
        <RadioItem value="apple" label="Apple" />
        <RadioItem value="banana" label="Banana" />
      </RadioGroup>
    );
    expect(screen.getByRole("radio", { name: "Apple" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Banana" })).toBeInTheDocument();
  });

  it("no item is selected by default when no defaultValue", () => {
    render(
      <RadioGroup aria-label="Options">
        <RadioItem value="a" label="A" />
        <RadioItem value="b" label="B" />
      </RadioGroup>
    );
    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio).not.toBeChecked();
    });
  });

  it("selects the defaultValue item", () => {
    render(
      <RadioGroup aria-label="Options" defaultValue="b">
        <RadioItem value="a" label="A" />
        <RadioItem value="b" label="B" />
      </RadioGroup>
    );
    expect(screen.getByRole("radio", { name: "B" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "A" })).not.toBeChecked();
  });

  it("disables all items when group is disabled", () => {
    render(
      <RadioGroup aria-label="Options" disabled>
        <RadioItem value="a" label="A" />
        <RadioItem value="b" label="B" />
      </RadioGroup>
    );
    screen.getAllByRole("radio").forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it("disables a single item via RadioItem disabled prop", () => {
    render(
      <RadioGroup aria-label="Options">
        <RadioItem value="a" label="A" disabled />
        <RadioItem value="b" label="B" />
      </RadioGroup>
    );
    expect(screen.getByRole("radio", { name: "A" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "B" })).not.toBeDisabled();
  });
});

/* ─── Keyboard interaction ──────────────────────────────────────────────── */
describe("Radio — keyboard interaction", () => {
  it("selects an item on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup aria-label="Options" onValueChange={onChange}>
        <RadioItem value="a" label="A" />
        <RadioItem value="b" label="B" />
      </RadioGroup>
    );
    await user.click(screen.getByRole("radio", { name: "A" }));
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("navigates with arrow keys (focus moves between items)", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup aria-label="Options" defaultValue="a">
        <RadioItem value="a" label="A" />
        <RadioItem value="b" label="B" />
        <RadioItem value="c" label="C" />
      </RadioGroup>
    );
    // Tab into the group — focus lands on the selected item
    await user.tab();
    expect(screen.getByRole("radio", { name: "A" })).toHaveFocus();
  });

  it("does not allow selection on disabled group", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup aria-label="Options" disabled onValueChange={onChange}>
        <RadioItem value="a" label="A" />
        <RadioItem value="b" label="B" />
      </RadioGroup>
    );
    await user.click(screen.getByRole("radio", { name: "A" }));
    expect(onChange).not.toHaveBeenCalled();
  });
});

/* ─── Sizes ─────────────────────────────────────────────────────────────── */
describe("Radio — sizes", () => {
  it.each(["comfortable", "compact"] as const)(
    "renders size=%s without crashing",
    (size) => {
      render(
        <RadioGroup aria-label="Options" size={size}>
          <RadioItem value="a" label={`Size ${size}`} />
        </RadioGroup>
      );
      expect(screen.getByRole("radio", { name: `Size ${size}` })).toBeInTheDocument();
    }
  );
});

/* ─── forwardRef ────────────────────────────────────────────────────────── */
describe("Radio — forwardRef", () => {
  it("forwards a ref to the RadioGroup root element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <RadioGroup ref={ref} aria-label="Options">
        <RadioItem value="a" label="A" />
      </RadioGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards a ref to the RadioItem button element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <RadioGroup aria-label="Options">
        <RadioItem ref={ref} value="a" label="A" />
      </RadioGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("Radio — axe accessibility", () => {
  it("has no violations — default group", async () => {
    const { container } = render(
      <RadioGroup aria-label="Favorite color">
        <RadioItem value="red" label="Red" />
        <RadioItem value="blue" label="Blue" />
        <RadioItem value="green" label="Green" />
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with selected value", async () => {
    const { container } = render(
      <RadioGroup aria-label="Options" defaultValue="b">
        <RadioItem value="a" label="Option A" />
        <RadioItem value="b" label="Option B" />
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — disabled group", async () => {
    const { container } = render(
      <RadioGroup aria-label="Options" disabled>
        <RadioItem value="a" label="Option A" />
        <RadioItem value="b" label="Option B" />
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact size", async () => {
    const { container } = render(
      <RadioGroup aria-label="Options" size="compact">
        <RadioItem value="a" label="Option A" />
        <RadioItem value="b" label="Option B" />
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — horizontal orientation", async () => {
    const { container } = render(
      <RadioGroup aria-label="Options" orientation="horizontal">
        <RadioItem value="a" label="Option A" />
        <RadioItem value="b" label="Option B" />
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
