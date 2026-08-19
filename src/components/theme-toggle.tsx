"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors overflow-hidden w-7 h-7 flex items-center justify-center"
      title="Toggle Theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 absolute" />
      <Moon className="h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 absolute" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
