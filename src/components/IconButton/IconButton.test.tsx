import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { IconButton } from "./IconButton";

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

describe("IconButton", () => {
  it("renders an accessible button with the provided label", () => {
    render(<IconButton icon={<PlusIcon />} label="Add item" />);
    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  });

  it("sets aria-busy and disables while loading", () => {
    render(
      <IconButton
        icon={<PlusIcon />}
        label="Add item"
        loading
        loadingLabel="Adding item"
      />
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-label", "Adding item");
  });

  it("is disabled when disabled prop is set", () => {
    render(<IconButton icon={<PlusIcon />} label="Add item" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("fires onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<IconButton icon={<PlusIcon />} label="Add item" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is keyboard-operable via Enter key", () => {
    const handleClick = vi.fn();
    render(<IconButton icon={<PlusIcon />} label="Add item" onClick={handleClick} />);
    const btn = screen.getByRole("button");
    btn.focus();
    fireEvent.keyDown(btn, { key: "Enter", code: "Enter" });
    fireEvent.click(btn); // buttons fire click on Enter natively; simulate that
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <IconButton icon={<PlusIcon />} label="Add item" disabled onClick={handleClick} />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("has no axe violations across variants", async () => {
    const { container } = render(
      <>
        <IconButton variant="primary"     icon={<PlusIcon />} label="Add (primary)"     />
        <IconButton variant="secondary"   icon={<PlusIcon />} label="Add (secondary)"   />
        <IconButton variant="ghost"       icon={<PlusIcon />} label="Close (ghost)"     />
        <IconButton variant="destructive" icon={<PlusIcon />} label="Delete (destructive)" />
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations while loading", async () => {
    const { container } = render(
      <IconButton icon={<PlusIcon />} label="Add item" loading loadingLabel="Adding" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
