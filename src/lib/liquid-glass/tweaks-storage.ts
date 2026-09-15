import type { LiquidGlassTweaks } from "./engine";

const STORAGE_KEY = "podiumspa-liquid-glass-nav-tweaks-v1";

export function loadGlassTweaks(defaults: LiquidGlassTweaks): LiquidGlassTweaks {
  if (typeof window === "undefined") return { ...defaults };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaults };
    return { ...defaults, ...(JSON.parse(raw) as Partial<LiquidGlassTweaks>) };
  } catch {
    return { ...defaults };
  }
}

export function saveGlassTweaks(tweaks: LiquidGlassTweaks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tweaks));
  } catch {
    /* ignore */
  }
}
