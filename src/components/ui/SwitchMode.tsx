import { useEffect, useState, type FC } from "react";
import { motion } from "motion/react";
import { IoMoon, IoMoonOutline, IoSunny, IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "@/context/ThemeContext";

/* --- Props --- */
export interface SwitchModeProps {
  width?: number;
  height?: number;
  darkColor?: string;
  lightColor?: string;
  knobDarkColor?: string;
  knobLightColor?: string;
  borderDarkColor?: string;
  borderLightColor?: string;
  isDark?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const SwitchMode: FC<SwitchModeProps> = ({
  width = 68,
  height = 34,
  darkColor = "#0B0B0B",
  lightColor = "#FFFFFF",
  knobDarkColor = "#2A2A2E",
  knobLightColor = "#F3F2F7",
  borderDarkColor = "#4C4C50",
  borderLightColor = "#D8D6E0",
  isDark: controlledIsDark,
  onToggle: controlledOnToggle,
  className = "",
}) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isDark = controlledIsDark !== undefined ? controlledIsDark : resolvedTheme === "dark";
  const handleToggle = controlledOnToggle ?? toggleTheme;

  if (!mounted) {
    return <div style={{ width, height }} className={`rounded-full border-2 border-transparent ${className}`} />;
  }

  const iconSize = Math.max(12, height * 0.45);
  const knobSize = height - 4; // Fitted inside border

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex items-center justify-between p-0 rounded-full border-2 transition-colors cursor-pointer shrink-0 select-none ${className}`}
      style={{
        width,
        height,
        borderColor: isDark ? borderDarkColor : borderLightColor,
      }}
    >
      {/* TRACK */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ backgroundColor: isDark ? darkColor : lightColor }}
        transition={{ duration: 0.3 }}
      />

      {/* SLIDING KNOB */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="absolute rounded-full border-2 z-20 shadow-sm"
        style={{
          width: knobSize,
          height: knobSize,
          top: 0,
          right: isDark ? 0 : undefined,
          left: isDark ? undefined : 0,
          backgroundColor: isDark ? knobDarkColor : knobLightColor,
          borderColor: isDark ? borderDarkColor : borderLightColor,
        }}
      />

      {/* SUN */}
      <motion.div
        className="relative z-30 flex items-center justify-center pointer-events-none"
        style={{ width: height - 4, height: height - 4 }}
        animate={{ rotate: isDark ? 45 : 0 }}
        transition={{ stiffness: 20 }}
      >
        {isDark ? (
          <IoSunnyOutline
            color="#8A8A8F"
            fill="#8A8A8F"
            stroke="#8A8A8F"
            style={{ width: iconSize, height: iconSize }}
            className="transition-colors duration-200"
          />
        ) : (
          <IoSunny
            color="#D97706"
            fill="#D97706"
            style={{ width: iconSize, height: iconSize }}
            className="transition-colors duration-200"
          />
        )}
      </motion.div>

      {/* MOON */}
      <motion.div
        className="relative z-30 flex items-center justify-center pointer-events-none"
        style={{ width: height - 4, height: height - 4 }}
        animate={{ rotate: isDark ? 0 : 15 }}
        transition={{ stiffness: 20, damping: 14 }}
      >
        {isDark ? (
          <IoMoon
            color="#F4F4FB"
            fill="#F4F4FB"
            style={{ width: iconSize, height: iconSize }}
            className="transition-colors duration-200"
          />
        ) : (
          <IoMoonOutline
            color="#ABABB4"
            fill="#ABABB4"
            stroke="#ABABB4"
            style={{ width: iconSize, height: iconSize }}
            className="transition-colors duration-200"
          />
        )}
      </motion.div>
    </motion.button>
  );
};

export default SwitchMode;
