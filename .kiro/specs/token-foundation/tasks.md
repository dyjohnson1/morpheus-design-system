# Spec: Token Foundation — Tasks

- [x] 1. Init repo: Vite + React + TS (strict), commit scaffold.
- [x] 2. Add Style Dictionary; create `style-dictionary.config.js` with `css` + `ts` platforms.
- [x] 3. Wire `npm run tokens` → outputs `build/morph-tokens.css` + `build/morph-tokens.ts`.
- [x] 4. Author `:root` (dark) + `[data-theme="light"]` from `/tokens/theme/*`.
- [x] 5. Generate preference media-query overrides (reduced-motion, reduced-transparency, contrast/forced-colors).
- [x] 6. Build `useTheme()` hook (toggle + persist `data-theme`).
- [x] 7. Add Vitest contrast test asserting WCAG AA on the key pairings (dark + light).
- [x] 8. Add ESLint rule blocking raw hex/px/ms in `src/components/**`; fail CI on violation.
- [x] 9. Re-export tokens from `src/tokens/index.ts`.
- [x] 10. Storybook: a "Foundations" doc page rendering the full color ramp, type scale, space, motion, and both themes.
