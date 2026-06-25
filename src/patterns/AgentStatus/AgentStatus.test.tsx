import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { AgentStatus } from "./AgentStatus";

describe("AgentStatus", () => {
  it("exposes a polite live region with the state text", () => {
    render(<AgentStatus state="thinking" />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("Working on it");
  });

  it("conveys state by text, not color alone", () => {
    render(<AgentStatus state="error" />);
    expect(screen.getAllByText("Couldn't complete that").length).toBeGreaterThan(0);
  });

  it("has no axe violations", async () => {
    const { container } = render(<AgentStatus state="waiting-on-you" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
