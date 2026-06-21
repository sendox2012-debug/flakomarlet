import { ref, watch, onMounted } from "vue";

export const currentTheme = ref(localStorage.getItem("appTheme") || "dark");

export const themes = {
  dark: {
    name: "Тёмная",
    nameEn: "Dark",
    icon: "🌙",
    vars: {
      "--bg-primary": "#0b1220",
      "--bg-secondary": "#111d33",
      "--bg-card": "rgba(17, 29, 51, 0.7)",
      "--bg-glass": "rgba(17, 29, 51, 0.5)",
      "--bg-input": "rgba(17, 29, 51, 0.6)",
      "--text-primary": "#f1f5f9",
      "--text-secondary": "#94a3b8",
      "--text-muted": "#64748b",
      "--accent-1": "#2563eb",
      "--accent-2": "#3b82f6",
      "--accent-3": "#60a5fa",
      "--accent-glow": "rgba(59, 130, 246, 0.4)",
      "--accent-soft": "rgba(59, 130, 246, 0.15)",
      "--accent-border": "rgba(59, 130, 246, 0.25)",
      "--border": "rgba(148, 163, 184, 0.08)",
      "--danger": "#ef4444",
      "--success": "#10b981",
      "--shadow": "rgba(0,0,0,0.4)",
      "--card-blur": "blur(12px)",
      "--tab-bg": "rgba(17, 29, 51, 0.75)",
      "--modal-bg": "rgba(11, 18, 32, 0.85)",
      "--gradient-start": "#2563eb",
      "--gradient-end": "#60a5fa",
    },
  },
  light: {
    name: "Светлая",
    nameEn: "Light",
    icon: "☀️",
    vars: {
      "--bg-primary": "#f0f4f8",
      "--bg-secondary": "#ffffff",
      "--bg-card": "rgba(255, 255, 255, 0.85)",
      "--bg-glass": "rgba(255, 255, 255, 0.6)",
      "--bg-input": "rgba(241, 245, 249, 0.8)",
      "--text-primary": "#0f172a",
      "--text-secondary": "#475569",
      "--text-muted": "#94a3b8",
      "--accent-1": "#2563eb",
      "--accent-2": "#3b82f6",
      "--accent-3": "#60a5fa",
      "--accent-glow": "rgba(37, 99, 235, 0.25)",
      "--accent-soft": "rgba(37, 99, 235, 0.08)",
      "--accent-border": "rgba(37, 99, 235, 0.15)",
      "--border": "rgba(15, 23, 42, 0.06)",
      "--danger": "#dc2626",
      "--success": "#059669",
      "--shadow": "rgba(0,0,0,0.08)",
      "--card-blur": "blur(12px)",
      "--tab-bg": "rgba(255, 255, 255, 0.85)",
      "--modal-bg": "rgba(240, 244, 248, 0.9)",
      "--gradient-start": "#2563eb",
      "--gradient-end": "#60a5fa",
    },
  },
  pink: {
    name: "Розовая",
    nameEn: "Pink",
    icon: "🌸",
    vars: {
      "--bg-primary": "#1a0a1e",
      "--bg-secondary": "#2d1233",
      "--bg-card": "rgba(45, 18, 51, 0.7)",
      "--bg-glass": "rgba(45, 18, 51, 0.5)",
      "--bg-input": "rgba(45, 18, 51, 0.6)",
      "--text-primary": "#fdf2f8",
      "--text-secondary": "#f9a8d4",
      "--text-muted": "#9d5a84",
      "--accent-1": "#db2777",
      "--accent-2": "#ec4899",
      "--accent-3": "#f472b6",
      "--accent-glow": "rgba(236, 72, 153, 0.4)",
      "--accent-soft": "rgba(236, 72, 153, 0.15)",
      "--accent-border": "rgba(236, 72, 153, 0.25)",
      "--border": "rgba(249, 168, 212, 0.08)",
      "--danger": "#ef4444",
      "--success": "#10b981",
      "--shadow": "rgba(0,0,0,0.4)",
      "--card-blur": "blur(12px)",
      "--tab-bg": "rgba(45, 18, 51, 0.8)",
      "--modal-bg": "rgba(26, 10, 30, 0.85)",
      "--gradient-start": "#db2777",
      "--gradient-end": "#f472b6",
    },
  },
  cyberpunk: {
    name: "Киберпанк",
    nameEn: "Cyberpunk",
    icon: "⚡",
    vars: {
      "--bg-primary": "#0a0a0a",
      "--bg-secondary": "#141414",
      "--bg-card": "rgba(20, 20, 20, 0.8)",
      "--bg-glass": "rgba(20, 20, 20, 0.6)",
      "--bg-input": "rgba(20, 20, 20, 0.7)",
      "--text-primary": "#fbbf24",
      "--text-secondary": "#d97706",
      "--text-muted": "#78716c",
      "--accent-1": "#f59e0b",
      "--accent-2": "#fbbf24",
      "--accent-3": "#fcd34d",
      "--accent-glow": "rgba(245, 158, 11, 0.5)",
      "--accent-soft": "rgba(245, 158, 11, 0.12)",
      "--accent-border": "rgba(245, 158, 11, 0.3)",
      "--border": "rgba(251, 191, 36, 0.1)",
      "--danger": "#ef4444",
      "--success": "#22c55e",
      "--shadow": "rgba(0,0,0,0.6)",
      "--card-blur": "blur(12px)",
      "--tab-bg": "rgba(20, 20, 20, 0.85)",
      "--modal-bg": "rgba(10, 10, 10, 0.9)",
      "--gradient-start": "#f59e0b",
      "--gradient-end": "#fcd34d",
    },
  },
  neon: {
    name: "Неоновая",
    nameEn: "Neon",
    icon: "💜",
    vars: {
      "--bg-primary": "#050510",
      "--bg-secondary": "#0c0c24",
      "--bg-card": "rgba(12, 12, 36, 0.7)",
      "--bg-glass": "rgba(12, 12, 36, 0.5)",
      "--bg-input": "rgba(12, 12, 36, 0.6)",
      "--text-primary": "#e0e7ff",
      "--text-secondary": "#a78bfa",
      "--text-muted": "#6366f1",
      "--accent-1": "#8b5cf6",
      "--accent-2": "#a78bfa",
      "--accent-3": "#c4b5fd",
      "--accent-glow": "rgba(139, 92, 246, 0.5)",
      "--accent-soft": "rgba(139, 92, 246, 0.15)",
      "--accent-border": "rgba(139, 92, 246, 0.3)",
      "--border": "rgba(167, 139, 250, 0.1)",
      "--danger": "#f43f5e",
      "--success": "#34d399",
      "--shadow": "rgba(0,0,0,0.5)",
      "--card-blur": "blur(12px)",
      "--tab-bg": "rgba(12, 12, 36, 0.8)",
      "--modal-bg": "rgba(5, 5, 16, 0.9)",
      "--gradient-start": "#8b5cf6",
      "--gradient-end": "#c4b5fd",
    },
  },
  cold: {
    name: "Холодная",
    nameEn: "Cold",
    icon: "❄️",
    vars: {
      "--bg-primary": "#0c1929",
      "--bg-secondary": "#132742",
      "--bg-card": "rgba(19, 39, 66, 0.7)",
      "--bg-glass": "rgba(19, 39, 66, 0.5)",
      "--bg-input": "rgba(19, 39, 66, 0.6)",
      "--text-primary": "#e0f2fe",
      "--text-secondary": "#7dd3fc",
      "--text-muted": "#38bdf8",
      "--accent-1": "#0284c7",
      "--accent-2": "#0ea5e9",
      "--accent-3": "#38bdf8",
      "--accent-glow": "rgba(14, 165, 233, 0.4)",
      "--accent-soft": "rgba(14, 165, 233, 0.15)",
      "--accent-border": "rgba(14, 165, 233, 0.25)",
      "--border": "rgba(125, 211, 252, 0.08)",
      "--danger": "#ef4444",
      "--success": "#10b981",
      "--shadow": "rgba(0,0,0,0.4)",
      "--card-blur": "blur(12px)",
      "--tab-bg": "rgba(19, 39, 66, 0.8)",
      "--modal-bg": "rgba(12, 25, 41, 0.85)",
      "--gradient-start": "#0284c7",
      "--gradient-end": "#38bdf8",
    },
  },
};

export function useTheme() {
  const applyTheme = (themeName) => {
    const theme = themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    currentTheme.value = themeName;
    localStorage.setItem("appTheme", themeName);
  };

  const setTheme = (themeName) => {
    applyTheme(themeName);

    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.selectionChanged();
    }
  };

  onMounted(() => {
    applyTheme(currentTheme.value);
  });

  return { currentTheme, themes, setTheme };
}
