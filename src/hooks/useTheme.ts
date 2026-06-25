import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";
export type Density = "comfortable" | "compact";

/**
 * Module-level persistence — survives unmount/remount without
 * touching localStorage (sandboxed-rendering safe per tech.md).
 */
let persistedTheme: Theme = "dark";
let persistedDensity: Density = "comfortable";

/**
 * Toggles `data-theme` / `data-density` on `<html>`.
 * Dark is the default. Persists in-memory only (no browser storage APIs).
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(persistedTheme);
  const [density, setDensityState] = useState<Density>(persistedDensity);

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute("data-theme", theme);
    el.setAttribute("data-density", density);
  }, [theme, density]);

  const setTheme = useCallback((t: Theme) => {
    persistedTheme = t;
    setThemeState(t);
  }, []);

  const toggleTheme = useCallback(
    () =>
      setThemeState((prev) => {
        const next = prev === "dark" ? "light" : "dark";
        persistedTheme = next;
        return next;
      }),
    []
  );

  const setDensity = useCallback((d: Density) => {
    persistedDensity = d;
    setDensityState(d);
  }, []);

  return { theme, setTheme, toggleTheme, density, setDensity } as const;
}
