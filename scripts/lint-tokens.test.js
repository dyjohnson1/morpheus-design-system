/**
 * Tests for lint-tokens.js patterns.
 * Run with: node scripts/lint-tokens.test.js
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ ${message}`);
  }
}

// --- Inline pattern testing (mirrors lint-tokens.js logic) ---

const HEX_PATTERN = /#[0-9a-fA-F]{3,8}\b/g;
const PX_PATTERN = /(?<!\w)[\d.]+px\b/g;
const MS_PATTERN = /(?<!\w)[\d.]+ms\b/g;
const ALLOWED_PX = new Set(["0px", "1px", "2px"]);

function isInsideVarFallback(line, matchIndex) {
  const before = line.slice(0, matchIndex);
  const lastVarOpen = before.lastIndexOf("var(");
  if (lastVarOpen === -1) return false;
  const commaAfterVar = before.indexOf(",", lastVarOpen);
  return commaAfterVar !== -1;
}

function findHexViolations(line) {
  const violations = [];
  HEX_PATTERN.lastIndex = 0;
  let match;
  while ((match = HEX_PATTERN.exec(line)) !== null) {
    if (!isInsideVarFallback(line, match.index)) {
      violations.push(match[0]);
    }
  }
  return violations;
}

function findPxViolations(line) {
  const violations = [];
  PX_PATTERN.lastIndex = 0;
  let match;
  while ((match = PX_PATTERN.exec(line)) !== null) {
    if (!ALLOWED_PX.has(match[0]) && !isInsideVarFallback(line, match.index)) {
      violations.push(match[0]);
    }
  }
  return violations;
}

function findMsViolations(line) {
  const violations = [];
  MS_PATTERN.lastIndex = 0;
  let match;
  while ((match = MS_PATTERN.exec(line)) !== null) {
    if (!isInsideVarFallback(line, match.index)) {
      violations.push(match[0]);
    }
  }
  return violations;
}

// --- Tests ---

console.log("\nHex color detection:");
assert(findHexViolations("color: #fff;").length === 1, "catches #fff");
assert(findHexViolations("background: #0C1119;").length === 1, "catches #0C1119");
assert(findHexViolations("color: #684E87CC;").length === 1, "catches 8-digit hex");
assert(
  findHexViolations("background: var(--morph-color-accent-600, #684E87);").length === 0,
  "allows hex inside var() fallback"
);
assert(
  findHexViolations("color: var(--morph-color-on-surface);").length === 0,
  "no false positive on token reference"
);

console.log("\nPx value detection:");
assert(findPxViolations("font-size: 16px;").length === 1, "catches 16px");
assert(findPxViolations("width: 240px;").length === 1, "catches 240px");
assert(findPxViolations("gap: 4px;").length === 1, "catches 4px");
assert(findPxViolations("border: 1px solid transparent;").length === 0, "allows 1px (structural)");
assert(findPxViolations("border: 2px solid var(--morph-color-focus);").length === 0, "allows 2px (focus)");
assert(findPxViolations("transform: translateX(0px);").length === 0, "allows 0px");
assert(
  findPxViolations("min-height: var(--morph-control-height);").length === 0,
  "no false positive on token"
);
assert(
  findPxViolations("font-size: var(--morph-font-size-caption, 12px);").length === 0,
  "allows px inside var() fallback"
);

console.log("\nMs value detection:");
assert(findMsViolations("transition: opacity 200ms ease;").length === 1, "catches 200ms");
assert(findMsViolations("animation-delay: 80ms;").length === 1, "catches 80ms");
assert(
  findMsViolations("transition: var(--morph-motion-t2);").length === 0,
  "no false positive on token"
);
assert(
  findMsViolations("duration: var(--morph-motion-t3, 220ms);").length === 0,
  "allows ms inside var() fallback"
);

console.log("\nEdge cases:");
assert(
  findHexViolations("/* fallback color #fff */").length > 0,
  "regex matches hex in comments (main loop filters comments separately)"
);
assert(findPxViolations("padding: 0 var(--morph-space-3);").length === 0, "bare 0 is not flagged");

console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
