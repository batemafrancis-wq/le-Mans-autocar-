"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/use-theme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark and light mode"
      className={`group relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-2 text-text transition hover:border-race-red ${className}`}
    >
      <Sun
        size={18}
        className={`absolute transition-all duration-300 ${
          theme === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      />
      <Moon
        size={18}
        className={`absolute transition-all duration-300 ${
          theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}
