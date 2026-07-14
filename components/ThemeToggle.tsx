"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isMounted) {
    return (
      <button
        type="button"
        aria-label="Téma váltása"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80"
      >
        <Moon size={16} />
      </button>
    );
  }

  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Téma váltása"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-sky-400 hover:text-sky-300 hover:scale-105 active:scale-95 transition-transform"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
