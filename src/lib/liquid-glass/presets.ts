import type { LiquidGlassTweaks } from "./engine";
import { LIQUID_GLASS_DEFAULTS } from "./engine";

/**
 * Idle glass for the floating nav pill — podium palette (dark frosted glass, soft
 * magenta rim/glow). Mirrors the CSS fallback pill in header-nav.css (--pill-bg is
 * roughly the same dark tone) so swapping WebGL in/out doesn't jump in brightness.
 */
export const PODIUM_GLASS_DEFAULTS: LiquidGlassTweaks = {
  ...LIQUID_GLASS_DEFAULTS,
  ior: 0.2,
  transmission: 1,
  thickness: 2.24,
  dispersion: 1.09,
  roughness: 0.132,
  reflections: 0.74,
  clearcoat: 0.58,
  fresnelPower: 0.5,
  rim: 0.6,
  glow: 0.5,
  dichroic: 0.05,
  spectralSat: 0.3,
  spectralHue: 0.08,
  flareStrength: 0.6,
  specularIntensity: 1,
  creamStrength: 0.4,
  flare: "#f04b93",
  tint: "#d6266f",
  tintStrength: 0.1,
  lensDiameter: 92,
  lensSquashY: 0.62,
  lensChamfer: 12,
  lensFacetInset: 0,
  lensFacetWidth: 3.55,
  lensFacetStrength: 0,
  lensFacetSoft: 2.1,
  lensFacetSpoke: 0,
  lensFacetSpokeWidth: 1.15,
  lensFacetWedge: 0,
  lensFacetWedgeSoft: 1.8,
  lensFacetWedgePower: 1.85,
  lensFacetWedgePhase: 0,
  lensHaloAlpha: 0.3,
  barWidth: 1,
  barHeight: 36,
  barRadius: 999,
  barOffsetY: 0,
  barShadowBlur: 0,
  barShadowY: 12,
  barShadowAlpha: 0,
  innerPadX: 4,
  innerPadY: 3,
  innerRadius: 999,
  // Bar chrome — a real dark-glass gradient (same family as the CSS fallback's
  // --pill-bg), not invisible and not a loud solid accent fill.
  roomLight: 0.14,
  cavity: 0.78,
  cavityTop: 0.85,
  cavityBottom: 0.78,
  contourStrength: 0,
  contourWidth: 2.9,
  contourSoft: 0.3,
  contourColor: "#d6266f",
  followSpring: 90,
  followDamp: 28,
  followStretch: 0,
  followStretchMax: 0,
  hoverLerp: 10,
  sphereGlint: 0.23,
  sphereGlintY: 0.47,
  selectedGlow: 0,
  selectedGlowSpeed: 1.2,
  selectedGlowSpread: 0.9,
  selectedGlowColor: "#f04b93",
  whiteRimColor: "#f04b93",
  whiteRimAlpha: 0.12,
  whiteRimWidth: 1.4,
  whiteRimInset: 0,
  greyRimColor: "#0a0509",
  greyRimAlpha: 0.2,
  greyRimWidth: 1,
  chromeHi: "#241420",
  chromeMid: "#170d14",
  chromeLo: "#0a0509",
  cavityHi: "#1c0f17",
  cavityLo: "#0a0509",
  labelColor: "#f5e9f0",
  roomLightColor: "#f04b93",
  panelBg: "#170d14",
  burgerIconColor: "#f5e9f0",
  mobileLabelColor: "#f5e9f0",
};

/** Hover glass — same idle preset with a slight ior/thickness pop. */
export const PODIUM_GLASS_HOVER: LiquidGlassTweaks = {
  ...PODIUM_GLASS_DEFAULTS,
  ior: 0.43,
  thickness: 2.5,
};

/** Numeric keys that differ between idle and hover — only these lerp on hover. */
export const PODIUM_GLASS_HOVER_KEYS = (
  Object.keys(PODIUM_GLASS_DEFAULTS) as (keyof LiquidGlassTweaks)[]
).filter((k) => {
  const a = PODIUM_GLASS_DEFAULTS[k];
  const b = PODIUM_GLASS_HOVER[k];
  return typeof a === "number" && typeof b === "number" && a !== b;
});
