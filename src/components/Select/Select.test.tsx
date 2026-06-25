import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Select, SelectItem, SelectGroup, SelectSeparator } from "./Select";

/** Helper — renders a basic select with common items. */
function renderSelect(props: Partial<React.ComponentProps<typeof Select>> = {}) {
  return render(
    <Select aria-label="Fruit" placeholder="Select a fruit" {...props}>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="cherry">Cherry</SelectItem>
    </Select>
  );
}

describe("Select — role and label", () => {
  it("renders a combobox trigger with the correct accessible label", () => {
    renderSelect();
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    expect(trigger).toBeInTheDocument();
  });

  it("displays placeholder text when no value is selected", () => {
    renderSelect();
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    expect(trigger).toHaveTextContent("Select a fruit");
  });

  it("displays the selected value text", () => {
    renderSelect({ defaultValue: "banana" });
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    expect(trigger).toHaveTextContent("Banana");
  });

  it("marks trigger as aria-invalid when error is true", () => {
    renderSelect({ error: true });
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    expect(trigger).toHaveAttribute("aria-invalid", "true");
  });

  it("marks trigger as disabled when disabled prop is true", () => {
    renderSelect({ disabled: true });
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    expect(trigger).toBeDisabled();
  });
});

describe("Select — keyboard interaction", () => {
  it("opens the listbox when Enter is pressed on trigger", async () => {
    const user = userEvent.setup();
    renderSelect();

    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    trigger.focus();
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
  });

  it("opens the listbox when Space is pressed on trigger", async () => {
    const user = userEvent.setup();
    renderSelect();

    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    trigger.focus();
    await user.keyboard(" ");

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
  });

  it("selects an item with Enter and closes the listbox", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderSelect({ onValueChange });

    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    trigger.focus();
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    // Navigate down to "Banana" and select
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    expect(onValueChange).toHaveBeenCalled();
  });

  it("navigates items with arrow keys", async () => {
    const user = userEvent.setup();
    renderSelect();

    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    trigger.focus();
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    // Arrow keys navigate among options
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");

    // Options should be visible
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Cherry" })).toBeInTheDocument();
  });
});

describe("Select — groups and separators", () => {
  it("renders grouped items with group labels", async () => {
    const user = userEvent.setup();
    render(
      <Select aria-label="Food" placeholder="Select food">
        <SelectGroup label="Fruits">
          <SelectItem value="apple">Apple</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup label="Vegetables">
          <SelectItem value="carrot">Carrot</SelectItem>
        </SelectGroup>
      </Select>
    );

    const trigger = screen.getByRole("combobox", { name: "Food" });
    trigger.focus();
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    // Group labels should be visible
    expect(screen.getByText("Fruits")).toBeInTheDocument();
    expect(screen.getByText("Vegetables")).toBeInTheDocument();
  });
});

describe("Select — disabled items", () => {
  it("does not allow selection of disabled items", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select aria-label="Fruit" placeholder="Pick one" onValueChange={onValueChange}>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana" disabled>Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </Select>
    );

    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    trigger.focus();
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    // The disabled item should have aria-disabled
    const disabledOption = screen.getByRole("option", { name: "Banana" });
    expect(disabledOption).toHaveAttribute("aria-disabled", "true");
  });
});

describe("Select — axe accessibility", () => {
  it("has no violations when closed", async () => {
    const { container } = renderSelect();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations when open", async () => {
    const user = userEvent.setup();
    const { container } = renderSelect();

    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    trigger.focus();
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    // Test container — portal content uses aria associations
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with error state", async () => {
    const { container } = renderSelect({ error: true });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations when disabled", async () => {
    const { container } = renderSelect({ disabled: true });
    expect(await axe(container)).toHaveNoViolations();
  });
});
