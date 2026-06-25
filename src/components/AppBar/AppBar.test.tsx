import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { AppBar } from "./AppBar";

describe("AppBar", () => {
  it("renders as a banner landmark", () => {
    render(<AppBar title="Test App" />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders the title text", () => {
    render(<AppBar title="Dashboard" />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders leading and trailing slots", () => {
    render(
      <AppBar
        leading={<button aria-label="Menu">Menu</button>}
        title="App"
        trailing={<button aria-label="Profile">Profile</button>}
      />
    );
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Profile" })).toBeInTheDocument();
  });

  it("renders children in the content slot", () => {
    render(
      <AppBar>
        <nav aria-label="Main">Navigation</nav>
      </AppBar>
    );
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it("applies density data attribute", () => {
    render(<AppBar title="Compact" density="compact" />);
    expect(screen.getByRole("banner")).toHaveAttribute("data-density", "compact");
  });

  it("applies variant data attribute", () => {
    render(<AppBar title="Clear" variant="transparent" />);
    expect(screen.getByRole("banner")).toHaveAttribute("data-variant", "transparent");
  });

  it("applies position data attribute", () => {
    render(<AppBar title="Fixed" position="fixed" />);
    expect(screen.getByRole("banner")).toHaveAttribute("data-position", "fixed");
  });

  it("interactive elements within are keyboard-operable", () => {
    render(
      <AppBar
        leading={<button aria-label="Menu">☰</button>}
        trailing={<button aria-label="Search">🔍</button>}
      />
    );
    const menuBtn = screen.getByRole("button", { name: "Menu" });
    const searchBtn = screen.getByRole("button", { name: "Search" });
    // Buttons are focusable by default
    menuBtn.focus();
    expect(document.activeElement).toBe(menuBtn);
    searchBtn.focus();
    expect(document.activeElement).toBe(searchBtn);
  });

  it("has no axe violations in default state", async () => {
    const { container } = render(
      <AppBar
        leading={<button aria-label="Menu">☰</button>}
        title="Morpheus"
        trailing={<button aria-label="Profile">P</button>}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations with transparent variant", async () => {
    const { container } = render(
      <AppBar title="Transparent" variant="transparent" aria-label="App navigation" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations with compact density", async () => {
    const { container } = render(
      <AppBar title="Compact" density="compact" aria-label="App navigation" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
