#!/usr/bin/env node

/**
 * lint-tokens.js
 * Enforces the token-first governance rule: no raw hex, px, or ms literals
 * in src/components/** source files (excluding stories and tests).
 *
 * Checks .module.css and .tsx files for:
 * - Raw hex colors (#fff, #0C1119, etc.)
 * - Raw px values (16px, 4px, etc.) — 0px, 1px, 2px are allowed
 * - Raw ms values (200ms, 80ms, etc.)
 *
 * Values inside var() fallbacks are allowed: var(--morph-foo, #684E87)
 *
 * Usage:
 *   node scripts/lint-tokens.js          # lint and fail on violations
 *   node scripts/lint-tokens.js --fix    # (future) auto-fix placeholder
 *
 * Exit code 1 if violations found (fails CI).
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const COMPONENTS_DIR = "src/components";
const PATTERNS_DIR = "src/patterns";

// --- Patterns ---

const HEX_PATTERN = /(?<!&)#[0-9a-fA-F]{3,8}\b/g;
const PX_PATTERN = /(?<!\w)[\d.]+px\b/g;
const MS_PATTERN = /(?<!\w)[\d.]+ms\b/g;

// --- Allowlists ---

// Structural px values that aren't design tokens
const ALLOWED_PX = new Set(["0px", "1px", "2px"]);

// CSS properties where component-level px values are acceptable:
// layout constraints, icon/font sizing, positioning, shadows, spacing shorthand.
const LAYOUT_PROPERTY_RE =
  /^\s*(min-width|max-width|min-height|max-height|width|height|font-size|line-height|letter-spacing|top|right|bottom|left|inset|translate|transform|grid-template|grid-auto|flex-basis|stroke-width|border-radius|padding|margin|gap|outline-offset|outline|border|border-width|box-shadow|text-shadow|background|background-image|filter|backdrop-filter|-webkit-backdrop-filter|text-underline-offset|text-decoration-thickness)\s*:/i;
// Also allow inside @supports conditions and custom property declarations
const SUPPORTS_OR_CUSTOM_PROP_RE = /^\s*(@supports|--)/i;

// --- File collection ---

function collectFiles(dir, suffixes, excludePatterns) {
  const results = [];

  function walk(currentDir) {
    let entries;
    try {
      entries = readdirSync(currentDir);
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      let stat;
      try {
        stat = statSync(fullPath);
      } catch {
        continue;
      }

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile()) {
        const matchesSuffix = suffixes.some((s) => fullPath.endsWith(s));
        if (!matchesSuffix) continue;

        const excluded = excludePatterns.some((p) => fullPath.includes(p));
        if (excluded) continue;

        results.push(fullPath);
      }
    }
  }

  walk(dir);
  return results;
}

// --- Helpers ---

function isInsideVarFallback(line, matchIndex) {
  const before = line.slice(0, matchIndex);
  const lastVarOpen = before.lastIndexOf("var(");
  if (lastVarOpen === -1) return false;
  const commaAfterVar = before.indexOf(",", lastVarOpen);
  return commaAfterVar !== -1;
}

function isComment(line) {
  const trimmed = line.trim();
  return (
    trimmed.startsWith("//") ||
    trimmed.startsWith("─")
  );
}

// --- CSS linting ---

function lintCSS(filePath, content) {
  const violations = [];
  const lines = content.split("\n");

  // Track multiline property context
  let inMultilineProperty = null;
  let inBlockComment = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    const trimmed = line.trim();

    // Track block comments
    if (inBlockComment) {
      if (line.includes("*/")) {
        inBlockComment = false;
      }
      continue;
    }
    if (line.includes("/*")) {
      if (!line.includes("*/")) {
        inBlockComment = true;
      }
      continue;
    }

    if (isComment(line)) continue;
    if (trimmed.startsWith("@keyframes")) continue;

    // Detect start of property declaration
    const propMatch = trimmed.match(/^([a-z-]+)\s*:/i);
    if (propMatch) {
      inMultilineProperty = propMatch[1].toLowerCase();
      // Check for multiple declarations on one line — track the last property
      const allPropsFound = [...trimmed.matchAll(/([a-z-]+)\s*:/gi)];
      if (allPropsFound.length > 0) {
        inMultilineProperty = allPropsFound[allPropsFound.length - 1][1].toLowerCase();
      }
    } else if (trimmed === "" || trimmed === "}") {
      inMultilineProperty = null;
    }

    // Check if this line (or multiline context) is in a layout/structural property
    // Also check if any property on the line matches (for multi-property single lines)
    const allPropsOnLine = [...trimmed.matchAll(/([a-z-]+)\s*:/gi)].map(m => m[1].toLowerCase());
    const effectiveProperty = inMultilineProperty || (allPropsOnLine.length > 0 ? allPropsOnLine[allPropsOnLine.length - 1] : null);
    const anyPropIsLayout = allPropsOnLine.some(p => LAYOUT_PROPERTY_RE.test(`${p}:`));
    const isLayoutLine = anyPropIsLayout || (effectiveProperty && LAYOUT_PROPERTY_RE.test(`${effectiveProperty}:`));

    // Reset multiline state AFTER we use it for this line
    if (trimmed.endsWith(";") || trimmed.endsWith("!important;")) {
      inMultilineProperty = null;
    }

    let match;

    // Hex colors
    HEX_PATTERN.lastIndex = 0;
    while ((match = HEX_PATTERN.exec(line)) !== null) {
      if (isInsideVarFallback(line, match.index)) continue;
      violations.push({
        file: filePath,
        line: lineNum,
        column: match.index + 1,
        value: match[0],
        rule: "no-raw-hex",
        message: `Raw hex color "${match[0]}" — use a token variable`,
      });
    }

    // px values — skip on layout/sizing properties, shadow/filter declarations,
    // @supports conditions, custom property definitions, and multiline continuations
    PX_PATTERN.lastIndex = 0;
    while ((match = PX_PATTERN.exec(line)) !== null) {
      if (ALLOWED_PX.has(match[0])) continue;
      if (isInsideVarFallback(line, match.index)) continue;
      if (isLayoutLine) continue;
      if (SUPPORTS_OR_CUSTOM_PROP_RE.test(line)) continue;
      violations.push({
        file: filePath,
        line: lineNum,
        column: match.index + 1,
        value: match[0],
        rule: "no-raw-px",
        message: `Raw px value "${match[0]}" — use a space/size token`,
      });
    }

    // ms values
    MS_PATTERN.lastIndex = 0;
    while ((match = MS_PATTERN.exec(line)) !== null) {
      if (isInsideVarFallback(line, match.index)) continue;
      violations.push({
        file: filePath,
        line: lineNum,
        column: match.index + 1,
        value: match[0],
        rule: "no-raw-ms",
        message: `Raw ms value "${match[0]}" — use a motion token`,
      });
    }
  }

  return violations;
}

// --- TSX linting ---

function lintTSX(filePath, content) {
  const violations = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    if (isComment(line)) continue;
    if (line.includes("import ")) continue;

    let match;

    // Hex colors
    HEX_PATTERN.lastIndex = 0;
    while ((match = HEX_PATTERN.exec(line)) !== null) {
      if (isInsideVarFallback(line, match.index)) continue;
      violations.push({
        file: filePath,
        line: lineNum,
        column: match.index + 1,
        value: match[0],
        rule: "no-raw-hex",
        message: `Raw hex color "${match[0]}" — use a token variable`,
      });
    }

    // String literals with px values
    const STRING_PX = /["'`][^"'`]*?([\d.]+px)[^"'`]*?["'`]/g;
    STRING_PX.lastIndex = 0;
    while ((match = STRING_PX.exec(line)) !== null) {
      const pxVal = match[1];
      if (ALLOWED_PX.has(pxVal)) continue;
      if (line.includes("var(--morph")) continue;
      violations.push({
        file: filePath,
        line: lineNum,
        column: match.index + 1,
        value: pxVal,
        rule: "no-raw-px",
        message: `Raw px value "${pxVal}" — use a token variable`,
      });
    }

    // String literals with ms values
    const STRING_MS = /["'`][^"'`]*?([\d.]+ms)[^"'`]*?["'`]/g;
    STRING_MS.lastIndex = 0;
    while ((match = STRING_MS.exec(line)) !== null) {
      const msVal = match[1];
      violations.push({
        file: filePath,
        line: lineNum,
        column: match.index + 1,
        value: msVal,
        rule: "no-raw-ms",
        message: `Raw ms value "${msVal}" — use a motion token`,
      });
    }
  }

  return violations;
}

// --- Main ---

function main() {
  const dirs = [COMPONENTS_DIR, PATTERNS_DIR];
  const excludePatterns = [".stories.", ".test.", ".spec."];

  let allViolations = [];

  for (const dir of dirs) {
    const cssFiles = collectFiles(dir, [".module.css"], excludePatterns);
    const tsxFiles = collectFiles(dir, [".tsx"], excludePatterns);

    for (const file of cssFiles) {
      const content = readFileSync(file, "utf-8");
      allViolations = allViolations.concat(lintCSS(file, content));
    }

    for (const file of tsxFiles) {
      const content = readFileSync(file, "utf-8");
      allViolations = allViolations.concat(lintTSX(file, content));
    }
  }

  if (allViolations.length === 0) {
    console.log("✓ Token lint: no raw hex/px/ms in src/components/ + src/patterns/");
    process.exit(0);
  }

  // Group by file for readability
  const byFile = new Map();
  for (const v of allViolations) {
    const rel = relative(process.cwd(), v.file);
    if (!byFile.has(rel)) byFile.set(rel, []);
    byFile.get(rel).push(v);
  }

  console.error(
    `\n✗ Token lint: ${allViolations.length} violation(s)\n`
  );
  console.error(
    "  Rule: components/patterns must use var(--morph-*) tokens, not raw values.\n"
  );

  for (const [file, violations] of byFile) {
    console.error(`  ${file}`);
    for (const v of violations) {
      console.error(`    ${v.line}:${v.column}  ${v.message}`);
    }
    console.error("");
  }

  process.exit(1);
}

main();
