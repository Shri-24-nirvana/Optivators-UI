import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
export type ColorTheme = "green" | "orange";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  colorTheme: ColorTheme;
  isDark: boolean;
  isOrange: boolean;
  setTheme: (theme: Theme) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
  toggleTheme: () => void;
  toggleColorTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    return saved ?? "light";
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    const saved = localStorage.getItem("color-theme") as ColorTheme | null;
    return saved ?? "green";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    if (theme === "system") {
      return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return theme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    let actualTheme: "light" | "dark" = "light";

    if (theme === "system") {
      actualTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      actualTheme = theme;
    }

    setResolvedTheme(actualTheme);

    if (actualTheme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (colorTheme === "orange") {
      root.classList.add("theme-orange");
      root.setAttribute("data-theme-color", "orange");
    } else {
      root.classList.remove("theme-orange");
      root.setAttribute("data-theme-color", "green");
    }
    localStorage.setItem("color-theme", colorTheme);
  }, [colorTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setColorTheme = (newColor: ColorTheme) => {
    setColorThemeState(newColor);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleColorTheme = () => {
    setColorThemeState((prev) => (prev === "orange" ? "green" : "orange"));
  };

  const isDark = resolvedTheme === "dark";
  const isOrange = colorTheme === "orange";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        colorTheme,
        isDark,
        isOrange,
        setTheme,
        setColorTheme,
        toggleTheme,
        toggleColorTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback if rendered outside ThemeProvider
    const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
    const isOrange = typeof document !== "undefined" && document.documentElement.classList.contains("theme-orange");
    return {
      theme: (isDark ? "dark" : "light") as Theme,
      resolvedTheme: (isDark ? "dark" : "light") as "light" | "dark",
      colorTheme: (isOrange ? "orange" : "green") as ColorTheme,
      isDark,
      isOrange,
      setTheme: (t: Theme) => {
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
}
