import { describe, it, expect } from "vitest";
import {
  ColorNeutral0,
  ColorNeutral50,
  ColorNeutral400,
  ColorNeutral600,
  ColorNeutral1000,
  ColorAccent300,
  ColorAccent500,
  ColorAccent600,
  ColorAccent700,
} from "../../build/morph-tokens";

/**
 * WCAG 2.1 relative luminance + contrast ratio calculation.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function linearize(channel: number): number {
  return channel <= 0.03928
    ? channel / 12.92
    : Math.pow((channel + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const AA_NORMAL_TEXT = 4.5;

describe("Token contrast — WCAG AA verification", () => {
  describe("dark theme", () => {
    it("on-surface (neutral-50) on ground (neutral-1000) meets AA", () => {
      const ratio = contrastRatio(ColorNeutral50, ColorNeutral1000);
      expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });

    it("on-surface-muted (neutral-400) on ground (neutral-1000) meets AA", () => {
      const ratio = contrastRatio(ColorNeutral400, ColorNeutral1000);
      expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });

    it("accent-text (accent-300) on ground (neutral-1000) meets AA", () => {
      const ratio = contrastRatio(ColorAccent300, ColorNeutral1000);
      expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });

    it("on-accent (neutral-0) on accent (accent-500) meets AA", () => {
      const ratio = contrastRatio(ColorNeutral0, ColorAccent500);
      expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });
  });

  describe("light theme", () => {
    it("on-surface (neutral-1000) on ground (neutral-50) meets AA", () => {
      const ratio = contrastRatio(ColorNeutral1000, ColorNeutral50);
      expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });

    it("on-surface-muted (neutral-600) on ground (neutral-50) meets AA", () => {
      const ratio = contrastRatio(ColorNeutral600, ColorNeutral50);
      expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });

    it("accent-text (accent-700) on ground (neutral-50) meets AA", () => {
      const ratio = contrastRatio(ColorAccent700, ColorNeutral50);
      expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });

    it("on-accent (neutral-0) on accent (accent-600) meets AA", () => {
      const ratio = contrastRatio(ColorNeutral0, ColorAccent600);
      expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });
  });
});
