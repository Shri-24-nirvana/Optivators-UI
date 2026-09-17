import React, { createContext, useContext, useEffect, useState } from "react";
import {
  lightVibrantColors,
  darkVibrantColors,
  getPaletteColors,
} from "./styles";

export type ThemeMode = "light" | "dark" | "system";
export type Theme = ThemeMode; // Alias for backward compatibility
export type ColorTheme = "green" | "orange";

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  hover: string;
  focus: string;
  border: string;
  borderLight: string;
  shadow: string;
  overlay: string;
  
  // Podium & Hall of Legends Tokens
  podiumBg: string;
  podiumBorder: string;
  podiumGoldPillar: string;
  podiumSilverPillar: string;
  podiumBronzePillar: string;
  podiumGoldBorder: string;
  podiumSilverBorder: string;
  podiumBronzeBorder: string;
  podiumGlow: string;
}

export interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  colorTheme: ColorTheme;
  isDark: boolean;
  isOrange: boolean;
  colors: ThemeColors;
  setTheme: (theme: ThemeMode) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
  toggleTheme: () => void;
  toggleColorTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme");
    return (saved as ThemeMode) || "light";
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    const saved = localStorage.getItem("color-theme") as ColorTheme | null;
    return saved ?? "green";
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (theme === "system") {
      return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return theme === "dark";
  });

  useEffect(() => {
    const updateTheme = () => {
      const shouldBeDark =
        theme === "system"
          ? typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
          : theme === "dark";

      setIsDark(shouldBeDark);

      const root = document.documentElement;

      // Update .dark class
      if (shouldBeDark) {
        root.classList.add("dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.style.colorScheme = "light";
      }

      // Update .theme-orange class
      if (colorTheme === "orange") {
        root.classList.add("theme-orange");
        root.setAttribute("data-theme-color", "orange");
      } else {
        root.classList.remove("theme-orange");
        root.setAttribute("data-theme-color", "green");
      }

      // Get colors based on dark and palette
      const activeColors = getPaletteColors(shouldBeDark, colorTheme);

      // Inject CSS variables to :root
      Object.entries(activeColors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
      root.style.background = activeColors.background;
      root.style.color = activeColors.text;
    };

    updateTheme();

    if (theme === "system" && typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateTheme);
      return () => mediaQuery.removeEventListener("change", updateTheme);
    }
  }, [theme, colorTheme]);

  const handleSetTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleSetColorTheme = (newColor: ColorTheme) => {
    setColorThemeState(newColor);
    localStorage.setItem("color-theme", newColor);
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = isDark ? "light" : "dark";
    handleSetTheme(nextTheme);
  };

  const toggleColorTheme = () => {
    const nextColor: ColorTheme = colorTheme === "orange" ? "green" : "orange";
    handleSetColorTheme(nextColor);
  };

  const colors = getPaletteColors(isDark, colorTheme);
  const resolvedTheme: "light" | "dark" = isDark ? "dark" : "light";
  const isOrange = colorTheme === "orange";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        colorTheme,
        isDark,
        isOrange,
        colors,
        setTheme: handleSetTheme,
        setColorTheme: handleSetColorTheme,
        toggleTheme,
        toggleColorTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback if accessed outside ThemeProvider
    const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
    const isOrange = typeof document !== "undefined" && document.documentElement.classList.contains("theme-orange");
    const colors = getPaletteColors(isDark, isOrange ? "orange" : "green");

    return {
      theme: (isDark ? "dark" : "light") as ThemeMode,
      resolvedTheme: (isDark ? "dark" : "light") as "light" | "dark",
      colorTheme: (isOrange ? "orange" : "green") as ColorTheme,
      isDark,
      isOrange,
      colors,
      setTheme: (t: ThemeMode) => {
        if (t === "dark") {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      },
      setColorTheme: (c: ColorTheme) => {
        if (c === "orange") {
          document.documentElement.classList.add("theme-orange");
          localStorage.setItem("color-theme", "orange");
        } else {
          document.documentElement.classList.remove("theme-orange");
          localStorage.setItem("color-theme", "green");
        }
      },
      toggleTheme: () => {
        const currentlyDark = document.documentElement.classList.contains("dark");
        if (currentlyDark) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        }
      },
      toggleColorTheme: () => {
        const currentlyOrange = document.documentElement.classList.contains("theme-orange");
        if (currentlyOrange) {
          document.documentElement.classList.remove("theme-orange");
          localStorage.setItem("color-theme", "green");
        } else {
          document.documentElement.classList.add("theme-orange");
          localStorage.setItem("color-theme", "orange");
        }
      },
    };
  }
  return context;
};

export default ThemeProvider;
