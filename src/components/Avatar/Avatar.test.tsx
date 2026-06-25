import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Avatar } from "./Avatar";

describe("Avatar — role and label", () => {
  it("renders as img role with accessible label from initials", () => {
    render(<Avatar initials="JD" aria-label="Jane Doe" />);
    expect(screen.getByRole("img", { name: "Jane Doe" })).toBeInTheDocument();
  });

  it("renders as img role with accessible label from alt", () => {
    render(<Avatar src="https://example.com/photo.jpg" alt="Profile photo" />);
    expect(screen.getByRole("img", { name: "Profile photo" })).toBeInTheDocument();
  });

  it("falls back to a default label when nothing is provided", () => {
    render(<Avatar />);
    expect(screen.getByRole("img", { name: "User avatar" })).toBeInTheDocument();
  });

  it("truncates initials to 2 characters", () => {
    render(<Avatar initials="ABC" aria-label="Test user" />);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders the icon fallback when no src or initials are given", () => {
    render(<Avatar aria-label="Unknown user" />);
    // SVG is aria-hidden; the parent span carries the role
    expect(screen.getByRole("img", { name: "Unknown user" })).toBeInTheDocument();
  });
});

describe("Avatar — fallback chain", () => {
  it("falls back to initials when the image errors", async () => {
    render(
      <Avatar
        src="/nonexistent.jpg"
        alt="User"
        initials="FB"
        aria-label="Fallback user"
      />
    );
    const imgEl = document.querySelector("img");
    expect(imgEl).toBeTruthy();
    fireEvent.error(imgEl!);
    await waitFor(() => {
      expect(screen.getByText("FB")).toBeInTheDocument();
    });
  });
});

describe("Avatar — size variants", () => {
  it.each(["xs", "sm", "md", "lg", "xl"] as const)(
    "renders %s size without crashing",
    (size) => {
      render(<Avatar initials="AB" size={size} aria-label={`${size} avatar`} />);
      expect(screen.getByRole("img", { name: `${size} avatar` })).toBeInTheDocument();
    }
  );
});

describe("Avatar — shape variants", () => {
  it("renders circle shape (default)", () => {
    const { container } = render(<Avatar initials="JD" aria-label="Jane Doe" />);
    expect(container.firstChild).toHaveAttribute("data-shape", "circle");
  });

  it("renders square shape", () => {
    const { container } = render(
      <Avatar initials="JD" shape="square" aria-label="Jane Doe" />
    );
    expect(container.firstChild).toHaveAttribute("data-shape", "square");
  });
});

describe("Avatar — status indicator (never color alone)", () => {
  it.each(["online", "offline", "busy", "away"] as const)(
    "includes status text '%s' in the accessible label",
    (status) => {
      const labels: Record<typeof status, string> = {
        online: "Online",
        offline: "Offline",
        busy: "Busy",
        away: "Away",
      };
      render(
        <Avatar
          initials="JD"
          aria-label="Jane Doe"
          status={status}
        />
      );
      // Status text is merged into the parent aria-label
      expect(
        screen.getByRole("img", { name: `Jane Doe, ${labels[status]}` })
      ).toBeInTheDocument();
    }
  );

  it("renders status badge element for each status value", () => {
    const { container, rerender } = render(
      <Avatar initials="JD" aria-label="Jane" status="online" />
    );
    expect(container.querySelector('[class*="statusBadge"]')).toBeInTheDocument();

    rerender(<Avatar initials="JD" aria-label="Jane" status="busy" />);
    expect(container.querySelector('[class*="statusBadge"]')).toBeInTheDocument();
  });

  it("renders no badge when status is not provided", () => {
    const { container } = render(<Avatar initials="JD" aria-label="Jane" />);
    expect(container.querySelector('[class*="statusBadge"]')).not.toBeInTheDocument();
  });
});

describe("Avatar — keyboard interaction", () => {
  it("is not focusable without onClick", () => {
    render(<Avatar initials="JD" aria-label="Jane Doe" />);
    const el = screen.getByRole("img", { name: "Jane Doe" });
    expect(el).not.toHaveAttribute("tabindex");
  });

  it("becomes button role and is focusable when onClick is provided", () => {
    const handleClick = vi.fn();
    render(
      <Avatar initials="JD" aria-label="Jane Doe" onClick={handleClick} />
    );
    const btn = screen.getByRole("button", { name: "Jane Doe" });
    expect(btn).toHaveAttribute("tabindex", "0");
  });

  it("fires onClick when Enter is pressed", async () => {
    const handleClick = vi.fn();
    render(
      <Avatar initials="JD" aria-label="Jane Doe" onClick={handleClick} />
    );
    const btn = screen.getByRole("button", { name: "Jane Doe" });
    btn.focus();
    await userEvent.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("fires onClick when Space is pressed", async () => {
    const handleClick = vi.fn();
    render(
      <Avatar initials="JD" aria-label="Jane Doe" onClick={handleClick} />
    );
    const btn = screen.getByRole("button", { name: "Jane Doe" });
    btn.focus();
    await userEvent.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("fires onClick on click", async () => {
    const handleClick = vi.fn();
    render(
      <Avatar initials="JD" aria-label="Jane Doe" onClick={handleClick} />
    );
    await userEvent.click(screen.getByRole("button", { name: "Jane Doe" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe("Avatar — axe accessibility", () => {
  it("has no violations with initials", async () => {
    const { container } = render(<Avatar initials="JD" aria-label="Jane Doe" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with icon fallback", async () => {
    const { container } = render(<Avatar aria-label="Unknown user" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with image", async () => {
    const { container } = render(
      <Avatar src="https://example.com/photo.jpg" alt="Profile photo" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations when interactive", async () => {
    const { container } = render(
      <Avatar
        initials="JD"
        aria-label="Jane Doe — view profile"
        onClick={() => {}}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with status badge", async () => {
    const { container } = render(
      <Avatar initials="JD" aria-label="Jane Doe" status="online" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations across all status values", async () => {
    const { container } = render(
      <div>
        <Avatar initials="A" aria-label="User A" status="online" />
        <Avatar initials="B" aria-label="User B" status="offline" />
        <Avatar initials="C" aria-label="User C" status="busy" />
        <Avatar initials="D" aria-label="User D" status="away" />
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
