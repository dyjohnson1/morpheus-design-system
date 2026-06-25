import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Progress } from "./Progress";

/* ─── Linear — determinate ──────────────────────────────────────────────── */
describe("Progress — linear determinate", () => {
  it("renders with role=progressbar and correct aria values", () => {
    render(<Progress shape="linear" value={50} label="Uploading" />);
    const el = screen.getByRole("progressbar");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-valuenow", "50");
    expect(el).toHaveAttribute("aria-valuemin", "0");
    expect(el).toHaveAttribute("aria-valuemax", "100");
    expect(el).toHaveAttribute("aria-label", "Uploading");
  });

  it("clamps value to 0–max range", () => {
    render(<Progress shape="linear" value={150} label="Over max" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });

  it("clamps negative value to 0", () => {
    render(<Progress shape="linear" value={-10} label="Under min" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("supports custom max", () => {
    render(<Progress shape="linear" value={5} max={10} label="Half" />);
    const el = screen.getByRole("progressbar");
    expect(el).toHaveAttribute("aria-valuenow", "5");
    expect(el).toHaveAttribute("aria-valuemax", "10");
  });

  it("shows visible label when showLabel is true", () => {
    render(<Progress shape="linear" value={30} label="Loading" showLabel />);
    expect(screen.getByText("Loading")).toBeVisible();
  });

  it("hides label visually when showLabel is false", () => {
    render(<Progress shape="linear" value={30} label="Hidden label" />);
    // Label is in the DOM but visually hidden (SR accessible)
    expect(screen.getByText("Hidden label")).toBeInTheDocument();
  });
});

/* ─── Linear — indeterminate ────────────────────────────────────────────── */
describe("Progress — linear indeterminate", () => {
  it("renders without aria-valuenow and with aria-busy", () => {
    render(<Progress shape="linear" label="Loading" />);
    const el = screen.getByRole("progressbar");
    expect(el).not.toHaveAttribute("aria-valuenow");
    expect(el).toHaveAttribute("aria-busy", "true");
  });
});

/* ─── Circular — determinate ────────────────────────────────────────────── */
describe("Progress — circular determinate", () => {
  it("renders with role=progressbar and correct aria values", () => {
    render(<Progress shape="circular" value={75} label="Processing" />);
    const el = screen.getByRole("progressbar");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-valuenow", "75");
    expect(el).toHaveAttribute("aria-valuemin", "0");
    expect(el).toHaveAttribute("aria-valuemax", "100");
  });

  it("renders SVG ring with aria-hidden", () => {
    const { container } = render(
      <Progress shape="circular" value={50} label="Half" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});

/* ─── Circular — indeterminate ──────────────────────────────────────────── */
describe("Progress — circular indeterminate", () => {
  it("renders without aria-valuenow and with aria-busy", () => {
    render(<Progress shape="circular" label="Thinking" />);
    const el = screen.getByRole("progressbar");
    expect(el).not.toHaveAttribute("aria-valuenow");
    expect(el).toHaveAttribute("aria-busy", "true");
  });
});

/* ─── Density / size ────────────────────────────────────────────────────── */
describe("Progress — density", () => {
  it("applies compact class for compact size", () => {
    const { container } = render(
      <Progress shape="linear" value={40} size="compact" label="Compact" />
    );
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("compact");
  });

  it("applies comfortable class by default", () => {
    const { container } = render(
      <Progress shape="linear" value={40} label="Comfortable" />
    );
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("comfortable");
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */
describe("Progress — axe accessibility", () => {
  it("has no violations — linear determinate", async () => {
    const { container } = render(
      <Progress shape="linear" value={50} label="Uploading file" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — linear indeterminate", async () => {
    const { container } = render(
      <Progress shape="linear" label="Loading content" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — circular determinate", async () => {
    const { container } = render(
      <Progress shape="circular" value={75} label="Processing" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — circular indeterminate", async () => {
    const { container } = render(
      <Progress shape="circular" label="Thinking" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with visible label", async () => {
    const { container } = render(
      <Progress shape="linear" value={60} label="Downloading" showLabel />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — compact size", async () => {
    const { container } = render(
      <Progress shape="circular" size="compact" value={30} label="Small spinner" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
