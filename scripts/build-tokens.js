#!/usr/bin/env node
/**
 * Token build script — Style Dictionary v4
 * Generates:
 *   build/morph-tokens.css  — :root (dark default) + [data-theme="light"] overrides
 *   build/morph-tokens.ts   — typed TS exports (dark values as default)
 */
import StyleDictionary from 'style-dictionary';
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Build dark theme (default / :root)
const sdDark = new StyleDictionary({
  source: [
    `${root}/tokens/color.json`,
    `${root}/tokens/core.json`,
    `${root}/tokens/theme/dark.json`
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: `${root}/build/`,
      files: [{
        destination: '_dark.css',
        format: 'css/variables',
        options: { outputReferences: true, selector: ':root' }
      }]
    },
    ts: {
      transformGroup: 'js',
      buildPath: `${root}/build/`,
      files: [{
        destination: 'morph-tokens.ts',
        format: 'javascript/es6'
      }]
    }
  }
});

// Build light theme ([data-theme="light"] overrides — only alias color tokens)
const sdLight = new StyleDictionary({
  source: [
    `${root}/tokens/color.json`,
    `${root}/tokens/core.json`,
    `${root}/tokens/theme/light.json`
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: `${root}/build/`,
      files: [{
        destination: '_light.css',
        format: 'css/variables',
        filter: (token) => token.path[0] === 'morph' && token.path[1] === 'color',
        options: { outputReferences: true, selector: '[data-theme="light"]' }
      }]
    }
  }
});

// Run builds
await sdDark.buildAllPlatforms();
await sdLight.buildAllPlatforms();

// Combine CSS into single file
const darkCss = readFileSync(resolve(root, 'build/_dark.css'), 'utf8');
const lightCss = readFileSync(resolve(root, 'build/_light.css'), 'utf8');

// Preference media-query overrides
const reducedMotionCss = `
/* Reduced motion: collapse all durations to t2 (140ms), springs → standard easing */
@media (prefers-reduced-motion: reduce) {
  :root {
    --morph-motion-duration-t1: 140ms;
    --morph-motion-duration-t3: 140ms;
    --morph-motion-duration-t4: 140ms;
    --morph-motion-duration-t5: 140ms;
    --morph-motion-spring-default: cubic-bezier(0.2,0,0.38,0.9);
    --morph-motion-spring-press: cubic-bezier(0.2,0,0.38,0.9);
  }
}`;

const reducedTransparencyCss = `
/* Reduced transparency: force Tier 2 (solid surface, no blur) */
@media (prefers-reduced-transparency: reduce) {
  :root {
    --morph-color-surface-overlay: var(--color-neutral-800);
  }
  [data-theme="light"] {
    --morph-color-surface-overlay: var(--color-neutral-100);
  }
}`;

const highContrastCss = `
/* High contrast: border-subtle strengthens; accent-text steps up one stop */
@media (prefers-contrast: more) {
  :root {
    --morph-color-border-subtle: var(--color-neutral-600);
    --morph-color-accent-text: var(--color-accent-200);
  }
  [data-theme="light"] {
    --morph-color-border-subtle: var(--color-neutral-300);
    --morph-color-accent-text: var(--color-accent-800);
  }
}`;

const forcedColorsCss = `
/* Forced colors: same strengthening as prefers-contrast */
@media (forced-colors: active) {
  :root {
    --morph-color-border-subtle: var(--color-neutral-600);
    --morph-color-accent-text: var(--color-accent-200);
  }
  [data-theme="light"] {
    --morph-color-border-subtle: var(--color-neutral-300);
    --morph-color-accent-text: var(--color-accent-800);
  }
}`;

const combinedCss = `/**
 * Morpheus Design Tokens — auto-generated, do not edit.
 * Dark theme is default (:root). Light overrides via [data-theme="light"].
 */

${darkCss.replace(/\/\*\*[\s\S]*?\*\/\n\n/, '')}
${lightCss.replace(/\/\*\*[\s\S]*?\*\/\n\n/, '')}
${reducedMotionCss}
${reducedTransparencyCss}
${highContrastCss}
${forcedColorsCss}
`;

writeFileSync(resolve(root, 'build/morph-tokens.css'), combinedCss);

// Clean up intermediate files
import { unlinkSync } from 'node:fs';
try { unlinkSync(resolve(root, 'build/_dark.css')); } catch {}
try { unlinkSync(resolve(root, 'build/_light.css')); } catch {}

console.log('✔ build/morph-tokens.css');
console.log('✔ build/morph-tokens.ts');
