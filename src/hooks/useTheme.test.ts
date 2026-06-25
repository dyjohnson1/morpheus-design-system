import { renderHook, act } from "@testing-library/react";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    // Reset document attribute before each test
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-density");
  });

  it("defaults to dark theme", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
  });

  it("sets data-theme attribute on document.documentElement", () => {
    renderHook(() => useTheme());
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("toggleTheme switches between dark and light", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("setTheme sets a specific theme", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme("light");
    });
    expect(result.current.theme).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    act(() => {
      result.current.setTheme("dark");
    });
    expect(result.current.theme).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("persists theme in-memory across remounts", () => {
    const { result, unmount } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme("light");
    });
    expect(result.current.theme).toBe("light");

    unmount();

    // Remounting should pick up the persisted value
    const { result: result2 } = renderHook(() => useTheme());
    expect(result2.current.theme).toBe("light");
  });

  it("does not use localStorage or sessionStorage", () => {
    const localSpy = vi.spyOn(Storage.prototype, "setItem");
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(localSpy).not.toHaveBeenCalled();
    localSpy.mockRestore();
  });

  it("manages density alongside theme", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.density).toBe("comfortable");

    act(() => {
      result.current.setDensity("compact");
    });
    expect(result.current.density).toBe("compact");
    expect(document.documentElement.getAttribute("data-density")).toBe("compact");
  });
});
