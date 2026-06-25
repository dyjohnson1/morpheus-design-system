import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

/**
 * Foundations — visual reference for the Morpheus token system.
 * Renders color ramp, type scale, space, motion tokens, and both themes.
 */

const swatch = (label: string, cssVar: string) => (
  <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "var(--morph-radius-1)",
        background: `var(${cssVar})`,
        border: "1px solid var(--morph-color-border-subtle)",
      }}
    />
    <div>
      <div style={{ fontFamily: "var(--morph-font-ui)", fontSize: 13, fontWeight: 500 }}>
        {label}
      </div>
      <code style={{ fontFamily: "var(--morph-font-mono)", fontSize: 12, opacity: 0.7 }}>
        {cssVar}
      </code>
    </div>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section style={{ marginBottom: 48 }}>
    <h2
      style={{
        fontFamily: "var(--morph-font-ui)",
        fontSize: 24,
        fontWeight: 600,
        marginBottom: 16,
        color: "var(--morph-color-on-surface)",
      }}
    >
      {title}
    </h2>
    {children}
  </section>
);

const neutralSteps = [
  "1000", "950", "900", "850", "800", "700", "600",
  "500", "400", "300", "200", "150", "100", "50", "0",
];

const accentSteps = ["900", "800", "700", "600", "500", "400", "300", "200", "100"];

const aliasTokens = [
  ["ground", "--morph-color-ground"],
  ["surface", "--morph-color-surface"],
  ["surface-raised", "--morph-color-surface-raised"],
  ["surface-overlay", "--morph-color-surface-overlay"],
  ["on-surface", "--morph-color-on-surface"],
  ["on-surface-muted", "--morph-color-on-surface-muted"],
  ["border-subtle", "--morph-color-border-subtle"],
  ["accent", "--morph-color-accent"],
  ["accent-text", "--morph-color-accent-text"],
  ["focus", "--morph-color-focus"],
];

const typeScale = [
  { role: "display", size: "48/52", weight: 600, tracking: "-0.02em" },
  { role: "headline", size: "32/38", weight: 600, tracking: "-0.015em" },
  { role: "title", size: "24/30", weight: 600, tracking: "-0.01em" },
  { role: "subtitle", size: "18/26", weight: 500, tracking: "-0.005em" },
  { role: "body", size: "16/26", weight: 400, tracking: "0" },
  { role: "body-sm", size: "14/22", weight: 400, tracking: "0" },
  { role: "label", size: "13/16", weight: 500, tracking: "0.01em" },
  { role: "caption", size: "12/16", weight: 400, tracking: "0.02em" },
];

const spaceTokens = [
  ["space-1", "4px"],
  ["space-2", "8px"],
  ["space-3", "12px"],
  ["space-4", "16px"],
  ["space-5", "24px"],
  ["space-6", "32px"],
  ["space-7", "48px"],
  ["space-8", "64px"],
];

const motionTokens = [
  ["t1", "80ms", "micro feedback"],
  ["t2", "140ms", "hover / focus"],
  ["t3", "220ms", "standard (default)"],
  ["t4", "320ms", "surface change"],
  ["t5", "480ms", "expressive (earned)"],
];

const FoundationsPage = () => (
  <div
    style={{
      padding: "var(--morph-space-7)",
      background: "var(--morph-color-ground)",
      color: "var(--morph-color-on-surface)",
      fontFamily: "var(--morph-font-ui)",
      minHeight: "100vh",
    }}
  >
    <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 8 }}>Morpheus foundations</h1>
    <p style={{ color: "var(--morph-color-on-surface-muted)", marginBottom: 48, fontSize: 16 }}>
      Token-driven visual language. Cool blue-black ground, warm cream light, muted-plum signature.
    </p>

    <Section title="Neutral ramp">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {neutralSteps.map((step) =>
          swatch(`neutral-${step}`, `--morph-color-neutral-${step}`)
        )}
      </div>
    </Section>

    <Section title="Accent ramp (muted plum)">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {accentSteps.map((step) =>
          swatch(`accent-${step}`, `--morph-color-accent-${step}`)
        )}
      </div>
    </Section>

    <Section title="Alias tokens (semantic)">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {aliasTokens.map(([label, cssVar]) => swatch(label, cssVar))}
      </div>
    </Section>

    <Section title="Type scale">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {typeScale.map(({ role, size, weight, tracking }) => {
          const [sizePx, lh] = size.split("/");
          return (
            <div key={role} style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
              <span
                style={{
                  fontFamily: "var(--morph-font-ui)",
                  fontSize: `${sizePx}px`,
                  lineHeight: `${lh}px`,
                  fontWeight: weight,
                  letterSpacing: tracking,
                }}
              >
                {role}
              </span>
              <code style={{ fontFamily: "var(--morph-font-mono)", fontSize: 12, opacity: 0.5 }}>
                {size} · {weight} · {tracking}
              </code>
            </div>
          );
        })}
      </div>
    </Section>

    <Section title="Space">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {spaceTokens.map(([name, value]) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: `var(--morph-${name})`,
                height: 24,
                background: "var(--morph-color-accent)",
                borderRadius: "var(--morph-radius-1)",
              }}
            />
            <code style={{ fontFamily: "var(--morph-font-mono)", fontSize: 12 }}>
              --morph-{name} ({value})
            </code>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Motion timing">
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          maxWidth: 480,
          fontFamily: "var(--morph-font-ui)",
          fontSize: 14,
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid var(--morph-color-border-subtle)" }}>
            <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 500 }}>Token</th>
            <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 500 }}>Duration</th>
            <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 500 }}>Use</th>
          </tr>
        </thead>
        <tbody>
          {motionTokens.map(([name, duration, use]) => (
            <tr key={name} style={{ borderBottom: "1px solid var(--morph-color-border-subtle)" }}>
              <td style={{ padding: "8px 12px" }}>
                <code style={{ fontFamily: "var(--morph-font-mono)" }}>--morph-motion-{name}</code>
              </td>
              <td style={{ padding: "8px 12px" }}>{duration}</td>
              <td style={{ padding: "8px 12px", opacity: 0.7 }}>{use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>

    <Section title="Theme comparison">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div
          data-theme="dark"
          style={{
            padding: 24,
            borderRadius: "var(--morph-radius-2)",
            background: "var(--morph-color-neutral-900)",
          }}
        >
          <p style={{ color: "var(--morph-color-neutral-50)", fontWeight: 500, marginBottom: 8 }}>
            Dark (default)
          </p>
          <p style={{ color: "var(--morph-color-neutral-400)", fontSize: 14 }}>
            Cool blue-black ground with warm cream text.
          </p>
          <div
            style={{
              marginTop: 12,
              padding: "8px 16px",
              background: "var(--morph-color-accent-500)",
              borderRadius: "var(--morph-radius-1)",
              color: "var(--morph-color-neutral-0)",
              display: "inline-block",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Accent action
          </div>
        </div>
        <div
          data-theme="light"
          style={{
            padding: 24,
            borderRadius: "var(--morph-radius-2)",
            background: "var(--morph-color-neutral-0)",
          }}
        >
          <p style={{ color: "var(--morph-color-neutral-1000)", fontWeight: 500, marginBottom: 8 }}>
            Light
          </p>
          <p style={{ color: "var(--morph-color-neutral-600)", fontSize: 14 }}>
            Warm cream ground with cool-dark text.
          </p>
          <div
            style={{
              marginTop: 12,
              padding: "8px 16px",
              background: "var(--morph-color-accent-600)",
              borderRadius: "var(--morph-radius-1)",
              color: "var(--morph-color-neutral-0)",
              display: "inline-block",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Accent action
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const meta: Meta = {
  title: "Foundations/Tokens",
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj;

export const ColorRamp: Story = { render: () => <FoundationsPage /> };
