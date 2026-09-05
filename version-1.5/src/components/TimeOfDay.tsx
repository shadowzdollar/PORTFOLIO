"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════════════
   TIME PERIODS
   ═══════════════════════════════════════════════════ */
export type TimePeriod = "dawn" | "morning" | "midday" | "afternoon" | "evening" | "night";

export interface TimeState {
  hour: number;
  minute: number;
  period: TimePeriod;
  label: string;
  emoji: string;
  // Scene colors
  skyColor: string;
  ambientColor: string;
  ambientIntensity: number;
  sunColor: string;
  sunIntensity: number;
  sunPosition: [number, number, number];
  fogColor: string;
  fogNear: number;
  fogFar: number;
  lampIntensity: number;
  // UI colors
  bgGradient: string;
  textColor: string;
  accentColor: string;
}

/* ═══════════════════════════════════════════════════
   PERIOD CONFIGS
   ═══════════════════════════════════════════════════ */
const periodConfigs: Record<TimePeriod, Omit<TimeState, "hour" | "minute" | "period" | "label" | "emoji">> = {
  dawn: {
    skyColor: "#2d1b4e",
    ambientColor: "#4a3080",
    ambientIntensity: 0.2,
    sunColor: "#ff9966",
    sunIntensity: 0.4,
    sunPosition: [-8, 1, 5],
    fogColor: "#3d2a5c",
    fogNear: 8,
    fogFar: 22,
    lampIntensity: 0.8,
    bgGradient: "from-indigo-900/40 via-purple-800/20 to-amber-700/30",
    textColor: "#e8dff5",
    accentColor: "#ff9966",
  },
  morning: {
    skyColor: "#87CEEB",
    ambientColor: "#fff5e6",
    ambientIntensity: 0.5,
    sunColor: "#ffeebb",
    sunIntensity: 0.8,
    sunPosition: [-5, 6, 4],
    fogColor: "#f5efe6",
    fogNear: 10,
    fogFar: 28,
    lampIntensity: 0.3,
    bgGradient: "from-sky-100/40 via-amber-50/30 to-cream-100/40",
    textColor: "#2c1810",
    accentColor: "#b85c38",
  },
  midday: {
    skyColor: "#5BA3D9",
    ambientColor: "#ffffff",
    ambientIntensity: 0.6,
    sunColor: "#fff8e7",
    sunIntensity: 1.2,
    sunPosition: [0, 10, 3],
    fogColor: "#f5efe6",
    fogNear: 12,
    fogFar: 30,
    lampIntensity: 0.1,
    bgGradient: "from-sky-200/30 via-white/20 to-cream-100/30",
    textColor: "#2c1810",
    accentColor: "#b85c38",
  },
  afternoon: {
    skyColor: "#7CB9E8",
    ambientColor: "#fff0d4",
    ambientIntensity: 0.45,
    sunColor: "#ffd699",
    sunIntensity: 0.9,
    sunPosition: [5, 5, 4],
    fogColor: "#f5efe6",
    fogNear: 10,
    fogFar: 26,
    lampIntensity: 0.4,
    bgGradient: "from-amber-100/40 via-orange-50/20 to-cream-100/40",
    textColor: "#2c1810",
    accentColor: "#b85c38",
  },
  evening: {
    skyColor: "#1a1a3e",
    ambientColor: "#ff8844",
    ambientIntensity: 0.3,
    sunColor: "#ff6633",
    sunIntensity: 0.3,
    sunPosition: [8, 2, 5],
    fogColor: "#2a1f3d",
    fogNear: 8,
    fogFar: 20,
    lampIntensity: 1.0,
    bgGradient: "from-indigo-900/50 via-orange-800/30 to-amber-900/40",
    textColor: "#f5e6d0",
    accentColor: "#ff9966",
  },
  night: {
    skyColor: "#0a0a2e",
    ambientColor: "#334466",
    ambientIntensity: 0.15,
    sunColor: "#aabbdd",
    sunIntensity: 0.05,
    sunPosition: [0, 8, 5],
    fogColor: "#0a0a2e",
    fogNear: 6,
    fogFar: 18,
    lampIntensity: 1.2,
    bgGradient: "from-slate-900/60 via-indigo-900/40 to-slate-800/50",
    textColor: "#c8d4e8",
    accentColor: "#ffeedd",
  },
};

function getTimePeriod(hour: number): TimePeriod {
  if (hour >= 5 && hour < 7) return "dawn";
  if (hour >= 7 && hour < 11) return "morning";
  if (hour >= 11 && hour < 14) return "midday";
  if (hour >= 14 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 21) return "evening";
  return "night";
}

function getPeriodLabel(period: TimePeriod): string {
  const labels: Record<TimePeriod, string> = {
    dawn: "Early Dawn",
    morning: "Morning Light",
    midday: "High Noon",
    afternoon: "Golden Afternoon",
    evening: "Warm Evening",
    night: "Late Night",
  };
  return labels[period];
}

function getPeriodEmoji(period: TimePeriod): string {
  const emojis: Record<TimePeriod, string> = {
    dawn: "🌅",
    morning: "☀️",
    midday: "🌞",
    afternoon: "🌤️",
    evening: "🌆",
    night: "🌙",
  };
  return emojis[period];
}

/* ═══════════════════════════════════════════════════
   CONTEXT
   ═══════════════════════════════════════════════════ */
const TimeContext = createContext<TimeState | null>(null);

export function useTimeOfDay() {
  const ctx = useContext(TimeContext);
  if (!ctx) {
    // Fallback: return a default midday state
    return {
      hour: 12,
      minute: 0,
      period: "midday" as TimePeriod,
      label: "High Noon",
      emoji: "🌞",
      ...periodConfigs.midday,
    };
  }
  return ctx;
}

/* ═══════════════════════════════════════════════════
   PROVIDER
   ═══════════════════════════════════════════════════ */
export function TimeOfDayProvider({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState<TimeState>(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const period = getTimePeriod(hour);
    const config = periodConfigs[period];
    return {
      hour,
      minute,
      period,
      label: getPeriodLabel(period),
      emoji: getPeriodEmoji(period),
      ...config,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const period = getTimePeriod(hour);
      const config = periodConfigs[period];
      setTime({
        hour,
        minute,
        period,
        label: getPeriodLabel(period),
        emoji: getPeriodEmoji(period),
        ...config,
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <TimeContext.Provider value={time}>
      {children}
    </TimeContext.Provider>
  );
}

/* ═══════════════════════════════════════════════════
   TIME DISPLAY — small clock widget
   ═══════════════════════════════════════════════════ */
export function TimeDisplay({ className = "" }: { className?: string }) {
  const time = useTimeOfDay();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-lg">{time.emoji}</span>
      <div>
        <div className="text-xs font-medium text-wood-700">{time.label}</div>
        <div className="text-[10px] text-wood-400 font-mono">
          {String(time.hour).padStart(2, "0")}:{String(time.minute).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
