"use client";

import { useCallback, useEffect, useState } from "react";

export function useTheme() {
  const [theme, setThemeState] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("lm-theme");
    const initial = stored === "light" ? "light" : "dark";
    setThemeState(initial);
  }, []);

  const setTheme = useCallback((next: "dark" | "light") => {
    setThemeState(next);
    window.localStorage.setItem("lm-theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
