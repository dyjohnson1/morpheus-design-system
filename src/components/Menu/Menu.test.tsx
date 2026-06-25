import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuGroup,
  MenuSeparator,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
} from "./Menu";

/** Helper — renders a basic menu. */
function renderMenu({ defaultOpen = false }: { defaultOpen?: boolean } = {}) {
  return render(
    <Menu defaultOpen={defaultOpen}>
      <MenuTrigger>
        <button>Actions</button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem disabled>Archive</MenuItem>
        <MenuItem destructive>Delete</MenuItem>
      </MenuContent>
    </Menu>
  );
}

describe("Menu — role and label", () => {
  it("renders trigger with correct accessible attributes", () => {
    renderMenu();
    const trigger = screen.getByRole("button", { name: "Actions" });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
  });

  it("renders menu content with role=menu when open", () => {
    renderMenu({ defaultOpen: true });
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("renders items with role=menuitem", () => {
    renderMenu({ defaultOpen: true });
    const items = screen.getAllByRole("menuitem");
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  it("does not render menu content when closed", () => {
    renderMenu({ defaultOpen: false });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("trigger shows aria-expanded=true when open", () => {
    renderMenu({ defaultOpen: true });
    // Radix marks trigger aria-hidden when modal menu opens (focus moves to content),
    // so we query by the underlying button element directly.
    const trigger = screen.getByRole("button", { name: "Actions", hidden: true });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Menu — keyboard interaction", () => {
  it("opens menu when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("closes menu when Escape is pressed", async () => {
    const user = userEvent.setup();
    renderMenu({ defaultOpen: true });

    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("navigates items with arrow keys", async () => {
    const user = userEvent.setup();
    renderMenu({ defaultOpen: true });

    await user.keyboard("{ArrowDown}");
    const firstItem = screen.getByRole("menuitem", { name: "Edit" });
    expect(firstItem).toHaveAttribute("data-highlighted", "");
  });

  it("calls onSelect when item is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <Menu defaultOpen>
        <MenuTrigger>
          <button>Menu</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem onSelect={onSelect}>Action</MenuItem>
        </MenuContent>
      </Menu>
    );

    await user.click(screen.getByRole("menuitem", { name: "Action" }));
    expect(onSelect).toHaveBeenCalled();
  });

  it("does not call onSelect for disabled items", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <Menu defaultOpen>
        <MenuTrigger>
          <button>Menu</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem onSelect={onSelect} disabled>
            Disabled action
          </MenuItem>
        </MenuContent>
      </Menu>
    );

    await user.click(screen.getByRole("menuitem", { name: "Disabled action" }));
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe("Menu — checkbox items", () => {
  it("renders checkbox items with menuitemcheckbox role", () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger>
          <button>View</button>
        </MenuTrigger>
        <MenuContent>
          <MenuCheckboxItem checked={true}>Toolbar</MenuCheckboxItem>
          <MenuCheckboxItem checked={false}>Sidebar</MenuCheckboxItem>
        </MenuContent>
      </Menu>
    );

    const items = screen.getAllByRole("menuitemcheckbox");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveAttribute("aria-checked", "true");
    expect(items[1]).toHaveAttribute("aria-checked", "false");
  });
});

describe("Menu — radio items", () => {
  it("renders radio items with menuitemradio role", () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger>
          <button>Theme</button>
        </MenuTrigger>
        <MenuContent>
          <MenuRadioGroup value="dark">
            <MenuRadioItem value="light">Light</MenuRadioItem>
            <MenuRadioItem value="dark">Dark</MenuRadioItem>
          </MenuRadioGroup>
        </MenuContent>
      </Menu>
    );

    const items = screen.getAllByRole("menuitemradio");
    expect(items).toHaveLength(2);
    expect(items[1]).toHaveAttribute("aria-checked", "true");
  });
});

describe("Menu — axe accessibility", () => {
  it("has no violations when closed", async () => {
    const { container } = renderMenu({ defaultOpen: false });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations when open", async () => {
    const { container } = renderMenu({ defaultOpen: true });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with checkbox items", async () => {
    const { container } = render(
      <Menu defaultOpen>
        <MenuTrigger>
          <button>View</button>
        </MenuTrigger>
        <MenuContent>
          <MenuCheckboxItem checked={true}>Toolbar</MenuCheckboxItem>
          <MenuCheckboxItem checked={false}>Sidebar</MenuCheckboxItem>
        </MenuContent>
      </Menu>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with radio items", async () => {
    const { container } = render(
      <Menu defaultOpen>
        <MenuTrigger>
          <button>Theme</button>
        </MenuTrigger>
        <MenuContent>
          <MenuRadioGroup value="dark">
            <MenuRadioItem value="light">Light</MenuRadioItem>
            <MenuRadioItem value="dark">Dark</MenuRadioItem>
          </MenuRadioGroup>
        </MenuContent>
      </Menu>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
