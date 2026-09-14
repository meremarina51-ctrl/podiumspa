import * as THREE from 'three';
import type { GlassTweaks } from '@/lib/glass/glass-experience';

/** Opening pose — huge, close-up glass framing before it settles into T2. */
export const GLASS_TWEAKS_T1: GlassTweaks = {
  ior: 1.93,
  transmission: 1,
  thickness: 4,
  dispersion: 10,
  roughness: 0.108,
  clearcoat: 0.09,
  clearcoatRoughness: 0.117,
  iridescence: 0.91,
  iridescenceIOR: 1.34,
  envMapIntensity: 2,
  specularIntensity: 0.55,
  attenuationDistance: 2.8,
  dichroic: 0.16,
  fresnelPower: 0.58,
  filmBase: 155,
  filmAmp: 205,
  exposure: 1.05,
  logoScale: 3000,
  logoX: -2.6492077697613374,
  logoY: -3.731797510537777,
  logoRotY: 0,
  sheen: 0.64,
  sheenRoughness: 0.43,
  metalness: 0,
  color: '#fbd6ea',
  attenuation: '#e2a8c4',
  specularColor: '#fff0f7',
  sheenColor: '#f5d9e8',
  tint: '#f3d4e4',
  tintStrength: 0.38,
  flare: '#f04b93',
  flareStrength: 0.55,
  spectralHue: 0.07,
  spectralSat: 0.64,
  noiseAmount: 0.57,
  noiseScale: 0.029,
  noiseDistort: 0.36,
  creamStrength: 0.45,
};

/** End (resting) pose — small logo settled into its corner. */
export const GLASS_TWEAKS_T2: GlassTweaks = {
  ior: 1.93,
  transmission: 1,
  thickness: 4,
  dispersion: 10,
  roughness: 0.108,
  clearcoat: 0.09,
  clearcoatRoughness: 0.117,
  iridescence: 0.91,
  iridescenceIOR: 1.34,
  envMapIntensity: 2,
  specularIntensity: 0.55,
  attenuationDistance: 2.8,
  dichroic: 0.16,
  fresnelPower: 0.58,
  filmBase: 155,
  filmAmp: 205,
  exposure: 1.05,
  logoScale: 76,
  logoX: 0.15800839054248428,
  logoY: 0.0675339172583076,
  logoRotY: 0,
  sheen: 0.64,
  sheenRoughness: 0.43,
  metalness: 0,
  color: '#fbd6ea',
  attenuation: '#e2a8c4',
  specularColor: '#fff0f7',
  sheenColor: '#f5d9e8',
  tint: '#f3d4e4',
  tintStrength: 0.38,
  flare: '#f04b93',
  flareStrength: 0.55,
  spectralHue: 0.07,
  spectralSat: 0.64,
  noiseAmount: 0.57,
  noiseScale: 0.029,
  noiseDistort: 0.36,
  creamStrength: 0.45,
};

/** Mobile opening pose. */
export const GLASS_TWEAKS_MT1: GlassTweaks = {
  ...GLASS_TWEAKS_T1,
  logoScale: 2200,
  logoX: -1.85,
  logoY: -2.4,
  logoRotY: 0,
};

/** Mobile end pose. */
export const GLASS_TWEAKS_MT2: GlassTweaks = {
  ...GLASS_TWEAKS_T2,
  logoScale: 101,
  logoX: 0.02,
  logoY: 0.04,
  logoRotY: 0,
};

const HEX_KEYS = new Set([
  'color', 'attenuation', 'specularColor', 'sheenColor', 'tint', 'flare',
]);

const _ca = new THREE.Color();
const _cb = new THREE.Color();
const _cm = new THREE.Color();

function lerpHex(a: string, b: string, t: number) {
  try {
    _ca.set(a);
    _cb.set(b);
    _cm.copy(_ca).lerp(_cb, t);
    return `#${_cm.getHexString()}`;
  } catch {
    return t < 0.5 ? a : b;
  }
}

export function lerpGlassTweaks(a: GlassTweaks, b: GlassTweaks, t: number): GlassTweaks {
  const u = Math.min(1, Math.max(0, t));
  const out = { ...a } as GlassTweaks;
  (Object.keys(a) as (keyof GlassTweaks)[]).forEach(key => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === 'number' && typeof bv === 'number') {
      (out as unknown as Record<string, number | string>)[key] = av + (bv - av) * u;
    } else if (typeof av === 'string' && typeof bv === 'string' && HEX_KEYS.has(key)) {
      (out as unknown as Record<string, number | string>)[key] = lerpHex(av, bv, u);
    } else {
      (out as unknown as Record<string, number | string>)[key] = u < 0.5 ? av : bv;
    }
  });
  return out;
}
