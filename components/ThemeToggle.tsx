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
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80"
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-cyan-400 hover:text-cyan-300"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
