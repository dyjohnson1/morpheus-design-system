import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Field } from "./Field";

/* ─── Role and label assertions ─────────────────────────────────────────── */

describe("Field — label and structure", () => {
  it("renders a label associated with the input via htmlFor", () => {
    render(
      <Field label="Email" htmlFor="email-input">
        <input id="email-input" type="email" />
      </Field>
    );
    const label = screen.getByText("Email");
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("for", "email-input");
  });

  it("renders helper text with correct id for aria-describedby", () => {
    const { container } = render(
      <Field label="Name" htmlFor="name-input" helperText="Enter your full name.">
        <input id="name-input" />
      </Field>
    );
    const helper = screen.getByText("Enter your full name.");
    expect(helper).toBeInTheDocument();
    expect(helper).toHaveAttribute("id");
    // The wrapper exposes the describedBy id as a data attribute
    const wrapper = container.firstElementChild!;
    expect(wrapper.getAttribute("data-describedby")).toBe(helper.id);
  });

  it("renders error message that replaces helper text", () => {
    render(
      <Field
        label="Email"
        htmlFor="email-err"
        helperText="We'll never share your email."
        error="Invalid email."
      >
        <input id="email-err" />
      </Field>
    );
    expect(screen.getByText("Invalid email.")).toBeInTheDocument();
    expect(screen.queryByText("We'll never share your email.")).not.toBeInTheDocument();
  });

  it("renders error with role=alert for screen readers", () => {
    render(
      <Field label="Password" htmlFor="pw" error="Too short.">
        <input id="pw" type="password" />
      </Field>
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Too short.");
  });

  it("shows '(required)' indicator when required is true", () => {
    render(
      <Field label="Username" htmlFor="user" required>
        <input id="user" />
      </Field>
    );
    expect(screen.getByText("(required)")).toBeInTheDocument();
  });

  it("does not show required indicator by default", () => {
    render(
      <Field label="Bio" htmlFor="bio">
        <textarea id="bio" />
      </Field>
    );
    expect(screen.queryByText("(required)")).not.toBeInTheDocument();
  });

  it("applies disabled styling class when disabled", () => {
    const { container } = render(
      <Field label="Org" htmlFor="org" disabled>
        <input id="org" disabled />
      </Field>
    );
    const wrapper = container.firstElementChild!;
    expect(wrapper.className).toMatch(/disabled/);
  });

  it("applies error styling class when error is present", () => {
    const { container } = render(
      <Field label="Field" htmlFor="f" error="Bad">
        <input id="f" />
      </Field>
    );
    const wrapper = container.firstElementChild!;
    expect(wrapper.className).toMatch(/error/);
  });

  it("renders boolean error without message text", () => {
    render(
      <Field label="Field" htmlFor="f-bool" error={true}>
        <input id="f-bool" />
      </Field>
    );
    // No error text rendered, but error class applied
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders children in the input slot", () => {
    render(
      <Field label="Search" htmlFor="search">
        <input id="search" data-testid="search-input" />
      </Field>
    );
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });
});

/* ─── Error icon (never color alone) ────────────────────────────────────── */

describe("Field — error icon (not color alone)", () => {
  it("renders an SVG icon alongside the error message", () => {
    const { container } = render(
      <Field label="Email" htmlFor="e" error="Required field.">
        <input id="e" />
      </Field>
    );
    const errorDiv = screen.getByRole("alert");
    const svg = errorDiv.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});

/* ─── Axe accessibility ─────────────────────────────────────────────────── */

describe("Field — axe accessibility", () => {
  it("has no violations — rest state", async () => {
    const { container } = render(
      <Field label="Email" htmlFor="a11y-email">
        <input id="a11y-email" type="email" />
      </Field>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — with helper text", async () => {
    const { container } = render(
      <Field label="Name" htmlFor="a11y-name" helperText="Your full name.">
        <input id="a11y-name" />
      </Field>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — error state", async () => {
    const { container } = render(
      <Field label="Password" htmlFor="a11y-pw" error="Too short.">
        <input id="a11y-pw" type="password" aria-invalid="true" />
      </Field>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — required", async () => {
    const { container } = render(
      <Field label="Username" htmlFor="a11y-user" required>
        <input id="a11y-user" required />
      </Field>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — disabled", async () => {
    const { container } = render(
      <Field label="Org" htmlFor="a11y-org" disabled>
        <input id="a11y-org" disabled />
      </Field>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
