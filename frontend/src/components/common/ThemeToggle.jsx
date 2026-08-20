import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({ showLabel = false, className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "Turn off dark mode" : "Turn on dark mode"}
      className={
        showLabel
          ? `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50 ${className}`
          : `inline-flex items-center justify-center rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50 ${className}`
      }
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
      {showLabel ? (
        <span>{isDark ? "Light mode" : "Dark mode"}</span>
      ) : null}
    </button>
  );
}
