export type EaseId =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeOutBack'
  | 'easeOutExpo'
  | 'elasticOut'
  | 'custom';

/** Cubic-bezier control points (CSS-style): (x1, y1, x2, y2). */
export type BezierHandles = [number, number, number, number];

export const EASE_OPTIONS: { id: EaseId; label: string }[] = [
  { id: 'linear', label: 'Linear' },
  { id: 'easeIn', label: 'Ease In' },
  { id: 'easeOut', label: 'Ease Out' },
  { id: 'easeInOut', label: 'Ease In Out' },
  { id: 'easeInCubic', label: 'Ease In Cubic' },
  { id: 'easeOutCubic', label: 'Ease Out Cubic' },
  { id: 'easeInOutCubic', label: 'Ease In Out Cubic' },
  { id: 'easeOutBack', label: 'Ease Out Back' },
  { id: 'easeOutExpo', label: 'Ease Out Expo' },
  { id: 'elasticOut', label: 'Elastic Out' },
  { id: 'custom', label: 'Custom' },
];

/** Approximate CSS cubic-bezier for the editor; math easings stay exact until you drag. */
export const PRESET_BEZIERS: Record<Exclude<EaseId, 'custom'>, BezierHandles> = {
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeOutExpo: [0.16, 1, 0.3, 1],
  elasticOut: [0.5, 1.5, 0.75, 0.9],
};

export interface IntroAnimSettings {
  duration: number;
  ease: EaseId;
  bezier: BezierHandles;
}

export const DEFAULT_INTRO_SETTINGS: IntroAnimSettings = {
  duration: 6.7,
  ease: 'custom',
  bezier: [0.04362978182466251, 1.0152497135947294, 1, 1],
};

function clamp01(t: number) {
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/** Named mathematical easings. */
export function applyEase(id: EaseId, t: number): number {
  const u = clamp01(t);
  switch (id) {
    case 'linear':
      return u;
    case 'easeIn':
      return u * u;
    case 'easeOut':
      return 1 - (1 - u) * (1 - u);
    case 'easeInOut':
      return u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
    case 'easeInCubic':
      return u * u * u;
    case 'easeOutCubic':
      return 1 - Math.pow(1 - u, 3);
    case 'easeInOutCubic':
      return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
    case 'easeOutBack': {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2);
    }
    case 'easeOutExpo':
      return u === 1 ? 1 : 1 - Math.pow(2, -10 * u);
    case 'elasticOut': {
      if (u === 0 || u === 1) return u;
      return Math.pow(2, -10 * u) * Math.sin((u * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
    }
    default:
      return u;
  }
}

function cubicBezierSample(p0: number, p1: number, p2: number, p3: number, t: number) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

function cubicBezierDerivative(p0: number, p1: number, p2: number, p3: number, t: number) {
  const u = 1 - t;
  return 3 * u * u * (p1 - p0) + 6 * u * t * (p2 - p1) + 3 * t * t * (p3 - p2);
}

/** Solve cubic-bezier X for t, then return Y — CSS-compatible. */
export function cubicBezierEase(bezier: BezierHandles, t: number): number {
  const x = clamp01(t);
  if (x === 0 || x === 1) return x;
  const [x1, y1, x2, y2] = bezier;
  let guess = x;
  for (let i = 0; i < 8; i++) {
    const currentX = cubicBezierSample(0, x1, x2, 1, guess);
    const dx = cubicBezierDerivative(0, x1, x2, 1, guess);
    if (Math.abs(dx) < 1e-6) break;
    guess -= (currentX - x) / dx;
    guess = clamp(guess, 0, 1);
  }
  return cubicBezierSample(0, y1, y2, 1, guess);
}

/** Sample intro progress: named math easings, or editable cubic-bezier when Custom. */
export function sampleIntroEase(settings: Pick<IntroAnimSettings, 'ease' | 'bezier'>, t: number): number {
  if (settings.ease === 'custom') return cubicBezierEase(settings.bezier, t);
  return applyEase(settings.ease, t);
}

export function bezierForEase(id: EaseId, current?: BezierHandles): BezierHandles {
  if (id === 'custom') return current ? [...current] as BezierHandles : [...DEFAULT_INTRO_SETTINGS.bezier];
  return [...PRESET_BEZIERS[id]];
}

const STORAGE_T1 = 'podium-glass-t1';
const STORAGE_T2 = 'podium-glass-t2';
const STORAGE_MT1 = 'podium-glass-mt1';
const STORAGE_MT2 = 'podium-glass-mt2';
const STORAGE_INTRO = 'podium-glass-intro';

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function normalizeBezier(value: unknown, fallback: BezierHandles): BezierHandles {
  if (!Array.isArray(value) || value.length !== 4) return [...fallback];
  const nums = value.map(v => Number(v));
  if (nums.some(n => Number.isNaN(n))) return [...fallback];
  return [
    clamp(nums[0], 0, 1),
    clamp(nums[1], -0.5, 1.8),
    clamp(nums[2], 0, 1),
    clamp(nums[3], -0.5, 1.8),
  ];
}

export function loadSavedT1<T>(fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  return readJson<T>(STORAGE_T1) ?? fallback;
}

export function loadSavedT2<T>(fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  return readJson<T>(STORAGE_T2) ?? fallback;
}

export function loadSavedMT1<T>(fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  return readJson<T>(STORAGE_MT1) ?? fallback;
}

export function loadSavedMT2<T>(fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  return readJson<T>(STORAGE_MT2) ?? fallback;
}

export function loadIntroSettings(fallback: IntroAnimSettings = DEFAULT_INTRO_SETTINGS): IntroAnimSettings {
  if (typeof window === 'undefined') return fallback;
  const saved = readJson<Partial<IntroAnimSettings>>(STORAGE_INTRO);
  if (!saved) return fallback;
  return normalizeIntroSettings(saved, fallback);
}

export function normalizeIntroSettings(
  saved: Partial<IntroAnimSettings> | null | undefined,
  fallback: IntroAnimSettings = DEFAULT_INTRO_SETTINGS,
): IntroAnimSettings {
  if (!saved) {
    return { ...fallback, bezier: [...fallback.bezier] };
  }
  const ease = EASE_OPTIONS.some(o => o.id === saved.ease) ? (saved.ease as EaseId) : fallback.ease;
  const duration = typeof saved.duration === 'number' && saved.duration > 0
    ? Math.min(20, Math.max(0.2, saved.duration))
    : fallback.duration;
  const bezier = normalizeBezier(saved.bezier, ease === 'custom' ? fallback.bezier : bezierForEase(ease));
  return { duration, ease, bezier };
}

export function saveT1(tweaks: unknown) {
  localStorage.setItem(STORAGE_T1, JSON.stringify(tweaks));
}

export function saveT2(tweaks: unknown) {
  localStorage.setItem(STORAGE_T2, JSON.stringify(tweaks));
}

export function saveMT1(tweaks: unknown) {
  localStorage.setItem(STORAGE_MT1, JSON.stringify(tweaks));
}

export function saveMT2(tweaks: unknown) {
  localStorage.setItem(STORAGE_MT2, JSON.stringify(tweaks));
}

export function saveIntroSettings(settings: IntroAnimSettings) {
  localStorage.setItem(STORAGE_INTRO, JSON.stringify(settings));
}
