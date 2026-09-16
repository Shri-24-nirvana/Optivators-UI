import { FC } from "react";
import { motion } from "motion/react";
import { useTheme } from "@/context/ThemeContext";

interface ThemePaletteToggleProps {
  className?: string;
  showLabels?: boolean;
}

export const ThemePaletteToggle: FC<ThemePaletteToggleProps> = ({
  className = "",
  showLabels = false,
}) => {
  const { colorTheme, setColorTheme } = useTheme();

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full border transition-all duration-200 backdrop-blur-md ${className}`}
      style={{
        background: "var(--surface-elevated)",
        borderColor: "var(--border-strong)",
      }}
      role="group"
      aria-label="Color Theme Selector"
    >
      {/* Green (Emerald) option */}
      <button
        type="button"
        onClick={() => setColorTheme("green")}
        aria-label="Emerald Green Theme"
        title="Emerald Green (White & Green)"
        className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
          colorTheme === "green"
            ? "text-emerald-800 dark:text-emerald-300 shadow-sm"
            : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        }`}
      >
        {colorTheme === "green" && (
          <motion.div
            layoutId="theme-palette-active"
            className="absolute inset-0 rounded-full bg-emerald-500/15 dark:bg-emerald-500/25 border border-emerald-500/40"
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
          />
        )}
        <span className="relative z-10 w-3 h-3 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-400 shadow-[0_0_8px_rgba(13,148,136,0.6)]" />
        {showLabels && <span className="relative z-10 text-[11px]">Green</span>}
      </button>

      {/* Orange (Sunset) option */}
      <button
        type="button"
        onClick={() => setColorTheme("orange")}
        aria-label="Sunset Orange Theme"
        title="Sunset Orange (White & Orange)"
        className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
          colorTheme === "orange"
            ? "text-orange-800 dark:text-orange-300 shadow-sm"
            : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        }`}
      >
        {colorTheme === "orange" && (
          <motion.div
            layoutId="theme-palette-active"
            className="absolute inset-0 rounded-full bg-orange-500/15 dark:bg-orange-500/25 border border-orange-500/40"
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
          />
        )}
        <span className="relative z-10 w-3 h-3 rounded-full bg-gradient-to-tr from-orange-600 to-amber-400 shadow-[0_0_8px_rgba(234,88,12,0.6)]" />
        {showLabels && <span className="relative z-10 text-[11px]">Orange</span>}
      </button>
    </div>
  );
};

export default ThemePaletteToggle;
