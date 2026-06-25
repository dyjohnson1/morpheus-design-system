import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { expect } from "vitest";

expect.extend(toHaveNoViolations);

// Radix UI primitives (Tooltip, Popover, etc.) use ResizeObserver internally.
// jsdom does not provide it, so we supply a minimal stub.
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof globalThis.ResizeObserver;

// Radix Popper uses hasPointerCapture / setPointerCapture / releasePointerCapture.
// jsdom does not implement pointer capture APIs.
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {};
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {};
}

// Radix may call scrollIntoView which jsdom doesn't support.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
