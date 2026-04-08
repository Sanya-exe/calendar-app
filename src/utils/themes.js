export const themes = {
  spring: {
    name: "Spring",
    primary: "#22c55e",
    primaryLight: "#4ade80",
    primaryDark: "#16a34a",
    bg: "#f0fdf4",
    bgLight: "#dcfce7",
    accent: "#fce7f3",
    text: "#14532d",
    textSecondary: "#166534",
    border: "#bbf7d0",
    rangeBg: "rgba(34, 197, 94, 0.15)",
    heroImage: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
  },
  summer: {
    name: "Summer",
    primary: "#f97316",
    primaryLight: "#fb923c",
    primaryDark: "#ea580c",
    bg: "#fff7ed",
    bgLight: "#ffedd5",
    accent: "#fef3c7",
    text: "#7c2d12",
    textSecondary: "#9a3412",
    border: "#fed7aa",
    rangeBg: "rgba(249, 115, 22, 0.15)",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  autumn: {
    name: "Autumn",
    primary: "#d97706",
    primaryLight: "#f59e0b",
    primaryDark: "#b45309",
    bg: "#fffbeb",
    bgLight: "#fef3c7",
    accent: "#fde68a",
    text: "#78350f",
    textSecondary: "#92400e",
    border: "#fde68a",
    rangeBg: "rgba(217, 119, 6, 0.15)",
    heroImage: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=800&q=80",
  },
  winter: {
    name: "Winter",
    primary: "#3b82f6",
    primaryLight: "#60a5fa",
    primaryDark: "#2563eb",
    bg: "#eff6ff",
    bgLight: "#dbeafe",
    accent: "#e0f2fe",
    text: "#1e3a8a",
    textSecondary: "#1e40af",
    border: "#bfdbfe",
    rangeBg: "rgba(59, 130, 246, 0.15)",
    heroImage: "https://images.unsplash.com/photo-1483664852095-d6cc6870705d?w=800&q=80",
  },
};

export const getSeasonFromMonth = (month) => {
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
};

export const getThemeForMonth = (month) => {
  const season = getSeasonFromMonth(month);
  return themes[season];
};
