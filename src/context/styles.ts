import { ThemeColors } from "./ThemeContext";

// Green/Teal Light Palette
export const lightVibrantColors: ThemeColors = {
  background: "#F7F8FB",
  surface: "#FFFFFF",
  surfaceSecondary: "#F0FDFA",
  
  text: "#0F172A",
  textSecondary: "#475569",
  textTertiary: "#94A3B8",
  
  primary: "#0D9488", // Teal Primary
  primaryHover: "#0F766E",
  primaryLight: "rgba(13, 148, 136, 0.12)",
  
  secondary: "#2563EB", // Blue
  success: "#059669",  // Emerald
  warning: "#D97706",  // Amber
  error: "#DC2626",    // Red
  info: "#3B82F6",     // Blue
  
  hover: "#F8FAFC",
  focus: "rgba(13, 148, 136, 0.25)",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
  
  shadow: "rgba(15, 23, 42, 0.08)",
  overlay: "rgba(15, 23, 42, 0.5)",
};

// Green/Teal Dark Palette
export const darkVibrantColors: ThemeColors = {
  background: "#06090F",
  surface: "#0D1424",
  surfaceSecondary: "#111827",
  
  text: "#FFFFFF",
  textSecondary: "#CBD5E1",
  textTertiary: "#94A3B8",
  
  primary: "#2DD4BF", // Bright Teal
  primaryHover: "#14B8A6",
  primaryLight: "rgba(45, 212, 191, 0.18)",
  
  secondary: "#38BDF8", // Sky Blue
  success: "#34D399", // Bright Emerald
  warning: "#FBBF24", // Bright Amber
  error: "#F87171",   // Bright Red
  info: "#60A5FA",    // Bright Blue
  
  hover: "#1E293B",
  focus: "rgba(45, 212, 191, 0.3)",
  border: "rgba(255, 255, 255, 0.14)",
  borderLight: "rgba(255, 255, 255, 0.08)",
  
  shadow: "rgba(0, 0, 0, 0.5)",
  overlay: "rgba(0, 0, 0, 0.75)",
};

// Orange Light Palette
export const lightOrangeColors: ThemeColors = {
  background: "#FAF8F5",
  surface: "#FFFFFF",
  surfaceSecondary: "#FFF7ED",
  
  text: "#0F172A",
  textSecondary: "#475569",
  textTertiary: "#94A3B8",
  
  primary: "#EA580C", // Orange Primary
  primaryHover: "#C2410C",
  primaryLight: "rgba(234, 88, 12, 0.12)",
  
  secondary: "#2563EB",
  success: "#059669",
  warning: "#D97706",
  error: "#DC2626",
  info: "#3B82F6",
  
  hover: "#FFF7ED",
  focus: "rgba(234, 88, 12, 0.25)",
  border: "#E2E8F0",
  borderLight: "#FFEDD5",
  
  shadow: "rgba(15, 23, 42, 0.08)",
  overlay: "rgba(15, 23, 42, 0.5)",
};

// Orange Dark Palette
export const darkOrangeColors: ThemeColors = {
  background: "#06090F",
  surface: "#0D1424",
  surfaceSecondary: "#1C140E",
  
  text: "#FFFFFF",
  textSecondary: "#CBD5E1",
  textTertiary: "#94A3B8",
  
  primary: "#FB923C", // Bright Orange
  primaryHover: "#F97316",
  primaryLight: "rgba(251, 146, 60, 0.18)",
  
  secondary: "#38BDF8",
  success: "#34D399",
  warning: "#FBBF24",
  error: "#F87171",
  info: "#60A5FA",
  
  hover: "#2A1D13",
  focus: "rgba(251, 146, 60, 0.3)",
  border: "rgba(255, 255, 255, 0.14)",
  borderLight: "rgba(251, 146, 60, 0.15)",
  
  shadow: "rgba(0, 0, 0, 0.5)",
  overlay: "rgba(0, 0, 0, 0.75)",
};

// Helper to get active palette based on dark and colorTheme
export function getPaletteColors(isDark: boolean, colorTheme: "green" | "orange"): ThemeColors {
  if (colorTheme === "orange") {
    return isDark ? darkOrangeColors : lightOrangeColors;
  }
  return isDark ? darkVibrantColors : lightVibrantColors;
}

export const createThemedStyles = (colors: ThemeColors, isDark: boolean) => ({
  pageContent: {
    flexGrow: 1,
    overflowY: "auto" as const,
    padding: "18px",
    height: "100%",
    boxSizing: "border-box" as const,
  },

  pageContainer: {
    background: colors.background,
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative" as const,
  },

  form: {
    width: "100%",
    maxWidth: "600px",
    background: colors.surface,
    padding: "40px",
    borderRadius: "20px",
    boxShadow: `0 10px 30px ${colors.shadow}`,
    border: `1px solid ${colors.border}`,
  },

  dashboardContainer: {
    width: "100%",
    maxWidth: "900px",
    background: colors.surface,
    borderRadius: "20px",
    padding: "40px",
    boxShadow: `0 10px 30px ${colors.shadow}`,
    border: `1px solid ${colors.border}`,
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "30px",
    textAlign: "center" as const,
    color: colors.text,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "8px",
    color: colors.textSecondary,
  },

  input: {
    width: "100%",
    padding: "12px 16px",
    border: `1px solid ${colors.border} !important`,
    borderRadius: "8px",
    marginBottom: "20px",
    backgroundColor: colors.surface,
    fontSize: "16px",
    boxSizing: "border-box" as const,
    color: colors.text,
    outline: "none",
    fontFamily: "inherit",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
    marginTop: "30px",
  },

  button: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "8px",
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease",
    boxShadow: `0 4px 15px ${colors.shadow}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  backButton: {
    background: "transparent",
    border: `1px solid ${colors.border}`,
    color: colors.textSecondary,
    boxShadow: "none",
  },

  deleteButton: {
    background: `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`,
  },

  disabledButton: {
    background: colors.border,
    color: colors.textTertiary,
    cursor: "not-allowed",
    boxShadow: "none",
  },

  loadingContainer: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: colors.background,
    color: colors.text,
  },

  listLoaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px",
  },

  loader: {
    border: `4px solid ${colors.borderLight}`,
    borderTop: `4px solid ${colors.primary}`,
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  },

  buttonLoader: {
    width: "20px",
    height: "20px",
    border: `3px solid rgba(255, 255, 255, 0.3)`,
    borderTop: `3px solid #fff`,
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 1s linear infinite",
  },

  card: {
    background: colors.surface,
    borderRadius: "16px",
    padding: "30px",
    marginBottom: "20px",
    boxShadow: `0 8px 25px ${colors.shadow}`,
    border: `1px solid ${colors.border}`,
  },

  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "12px",
    color: colors.text,
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  listContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
  },

  listItemCard: {
    background: colors.surface,
    padding: "20px",
    borderRadius: "16px",
    border: `1px solid ${colors.border}`,
    boxShadow: `0 4px 15px ${colors.shadow}`,
  },

  listItemTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
    margin: 0,
    color: colors.text,
  },

  listItemDetails: {
    fontSize: "14px",
    color: colors.textSecondary,
    margin: "6px 0",
    lineHeight: "1.4",
  },

  themeToggleContainer: {
    position: "absolute" as const,
    top: "20px",
    right: "20px",
    zIndex: 1000,
  },

  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    zIndex: 2000,
  },

  tableHeader: {
    backgroundColor: colors.surfaceSecondary,
    color: colors.textSecondary,
    textTransform: "uppercase" as const,
    fontSize: "12px",
    fontWeight: "bold" as const,
  },

  th: {
    padding: "15px 20px",
    textAlign: "left" as const,
    borderBottom: `1px solid ${colors.border}`,
    color: colors.textSecondary,
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    whiteSpace: "nowrap" as const,
    position: "sticky" as const,
    top: 0,
    backgroundColor: colors.surface,
  },

  td: {
    padding: "15px 20px",
    borderBottom: `1px solid ${colors.border}`,
    color: colors.text,
    fontSize: "14px",
    verticalAlign: "middle" as const,
  },

  switchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    background: colors.surfaceSecondary,
  },

  switchLabel: {
    fontWeight: 600,
    color: colors.textSecondary,
  },

  passwordContainer: { position: "relative" as const },

  eyeIcon: {
    position: "absolute" as const,
    right: "15px",
    top: "13px",
    cursor: "pointer",
    color: colors.textTertiary,
  },

  greenButton: {
    background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`,
  },
  yellowButton: {
    background: `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
  },
  blueButton: {
    background: `linear-gradient(135deg, ${colors.info} 0%, #2563eb 100%)`,
  },
  tealButton: {
    background: `linear-gradient(135deg, ${colors.secondary} 0%, #0891b2 100%)`,
  },
  purpleButton: {
    background: `linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)`,
  },
});

export const globalStyles = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

* {
    transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
    box-sizing: border-box;
}

.gradient-text {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.shimmer-text {
    background: linear-gradient(90deg, var(--color-primary, #0D9488) 0%, var(--color-primaryHover, #2DD4BF) 40%, var(--color-primary, #0D9488) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
}
`;
