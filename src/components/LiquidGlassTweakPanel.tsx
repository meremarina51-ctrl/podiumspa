"use client";

import { useState } from "react";
import type { LiquidGlassTweaks } from "@/lib/liquid-glass/engine";
import "./liquid-glass-tweak-panel.css";

export type LiquidGlassTweakTabId = "glass" | "chrome" | "colors" | "motion";

export type LiquidGlassFieldDef =
  | {
      kind?: "slider";
      key: keyof LiquidGlassTweaks;
      label: string;
      min: number;
      max: number;
      step: number;
    }
  | {
      kind: "color";
      key: keyof LiquidGlassTweaks;
      label: string;
    };

export function formatLiquidGlassValue(value: number, step: number) {
  if (step >= 1) return String(Math.round(value));
  if (step >= 0.1) return value.toFixed(1);
  if (step >= 0.01) return value.toFixed(2);
  return value.toFixed(3);
}

type TabId = LiquidGlassTweakTabId;

type SliderDef = {
  kind?: "slider";
  key: keyof LiquidGlassTweaks;
  label: string;
  min: number;
  max: number;
  step: number;
};

type ColorDef = {
  kind: "color";
  key: keyof LiquidGlassTweaks;
  label: string;
};

type FieldDef = SliderDef | ColorDef;

const TAB_GLASS: { title: string; items: FieldDef[] }[] = [
  {
    title: "Селектор",
    items: [
      { key: "lensDiameter", label: "Ширина (emerald)", min: 20, max: 280, step: 1 },
      { key: "lensSquashY", label: "Высота · доля от ширины", min: 0.4, max: 1, step: 0.01 },
      { key: "lensChamfer", label: "Срез угла (chamfer)", min: 0, max: 40, step: 0.5 },
      { key: "lensFacetInset", label: "Внутр. периметр · inset", min: 0, max: 28, step: 0.25 },
      { key: "lensFacetWidth", label: "Внутр. периметр · толщина", min: 0.2, max: 8, step: 0.05 },
      { key: "lensFacetSoft", label: "Внутр. периметр · размытие", min: 0.35, max: 5, step: 0.05 },
      { key: "lensFacetStrength", label: "Внутр. периметр · сила", min: 0, max: 2, step: 0.01 },
      { key: "lensFacetSpoke", label: "Грани (спицы) · сила", min: 0, max: 2, step: 0.01 },
      { key: "lensFacetSpokeWidth", label: "Грани (спицы) · толщина", min: 0.25, max: 6, step: 0.05 },
      { key: "lensFacetWedge", label: "Клинья · сила", min: 0, max: 2, step: 0.01 },
      { key: "lensFacetWedgeSoft", label: "Клинья · мягкость края", min: 0.35, max: 8, step: 0.05 },
      { key: "lensFacetWedgePower", label: "Клинья · резкость блика", min: 0.35, max: 4, step: 0.05 },
      { key: "lensFacetWedgePhase", label: "Клинья · сдвиг блика", min: 0, max: 1, step: 0.01 },
      { key: "lensHaloAlpha", label: "Ореол · прозрачность", min: 0, max: 1, step: 0.01 },
      { key: "ior", label: "Преломление (IOR)", min: 0, max: 1.8, step: 0.01 },
      { key: "transmission", label: "Прозрачность", min: 0, max: 1, step: 0.01 },
      { key: "thickness", label: "Толщина / искажение", min: 0.15, max: 2.5, step: 0.01 },
      { key: "dispersion", label: "Дисперсия", min: 0, max: 2, step: 0.01 },
      { key: "roughness", label: "Шероховатость", min: 0, max: 0.4, step: 0.001 },
    ],
  },
  {
    title: "Контур стекла",
    items: [
      { key: "reflections", label: "Отражения", min: 0, max: 1.4, step: 0.01 },
      { key: "clearcoat", label: "Clearcoat", min: 0, max: 1, step: 0.01 },
      { key: "fresnelPower", label: "Fresnel", min: 0.5, max: 6, step: 0.05 },
      { key: "rim", label: "Rim light", min: 0, max: 1.4, step: 0.01 },
      { key: "sphereGlint", label: "Блик · сила", min: 0, max: 2.5, step: 0.01 },
      { key: "sphereGlintY", label: "Блик · вытянутность", min: 0.08, max: 1.4, step: 0.01 },
      { key: "contourStrength", label: "Сила контура", min: 0, max: 2, step: 0.01 },
      { key: "contourWidth", label: "Ширина контура", min: 0.4, max: 18, step: 0.1 },
      { key: "contourSoft", label: "Размытие контура / края", min: 0.3, max: 6, step: 0.05 },
    ],
  },
];

const TAB_CHROME: { title: string; items: FieldDef[] }[] = [
  {
    title: "Бар (тёмный фон)",
    items: [
      { key: "barWidth", label: "Ширина бара", min: 0.4, max: 1, step: 0.01 },
      { key: "barHeight", label: "Высота бара", min: 20, max: 520, step: 1 },
      { key: "barRadius", label: "Скругление бара", min: 0, max: 260, step: 1 },
      { key: "barOffsetY", label: "Сдвиг бара Y", min: -120, max: 120, step: 1 },
      { key: "barShadowBlur", label: "Тень blur", min: 0, max: 60, step: 1 },
      { key: "barShadowY", label: "Тень Y", min: -20, max: 40, step: 1 },
      { key: "barShadowAlpha", label: "Тень alpha", min: 0, max: 1, step: 0.01 },
      { key: "innerPadX", label: "Внутр. отступ X", min: 4, max: 120, step: 1 },
      { key: "innerPadY", label: "Внутр. отступ Y", min: 2, max: 80, step: 1 },
      { key: "innerRadius", label: "Скругление полости", min: 0, max: 200, step: 1 },
    ],
  },
  {
    title: "Рамки",
    items: [
      { key: "whiteRimAlpha", label: "Прозрачность светлой рамки", min: 0, max: 1, step: 0.01 },
      { key: "whiteRimWidth", label: "Толщина светлой рамки", min: 0, max: 16, step: 0.05 },
      { key: "whiteRimInset", label: "Inset рамки", min: 0, max: 12, step: 0.1 },
      { key: "greyRimAlpha", label: "Прозрачность тёмной рамки", min: 0, max: 1, step: 0.01 },
      { key: "greyRimWidth", label: "Толщина тёмной рамки", min: 0, max: 12, step: 0.05 },
      { key: "roomLight", label: "Свет сверху", min: 0, max: 1, step: 0.01 },
    ],
  },
  {
    title: "Блик / объём",
    items: [
      { key: "glow", label: "Spill (не ореол)", min: 0, max: 1, step: 0.01 },
      { key: "flareStrength", label: "Сила блика", min: 0, max: 1, step: 0.01 },
      { key: "specularIntensity", label: "Specular", min: 0, max: 2.5, step: 0.01 },
      { key: "dichroic", label: "Дихроизм", min: 0, max: 1.2, step: 0.01 },
      { key: "spectralHue", label: "Hue спектра", min: -0.5, max: 0.5, step: 0.01 },
      { key: "spectralSat", label: "Насыщенность спектра", min: 0, max: 1.5, step: 0.01 },
      { key: "tintStrength", label: "Сила оттенка", min: 0, max: 1, step: 0.01 },
      { key: "creamStrength", label: "Тёплый cast", min: 0, max: 1, step: 0.01 },
      { key: "cavity", label: "Вогнутый объём", min: 0, max: 1.6, step: 0.01 },
      { key: "cavityTop", label: "Внутр. блик сверху", min: 0, max: 1.5, step: 0.01 },
      { key: "cavityBottom", label: "Внутр. блик снизу", min: 0, max: 1.5, step: 0.01 },
    ],
  },
];

const TAB_COLORS: { title: string; items: FieldDef[] }[] = [
  {
    title: "Пункты",
    items: [{ kind: "color", key: "labelColor", label: "Текст пунктов" }],
  },
  {
    title: "Селектор (стекло)",
    items: [
      { kind: "color", key: "tint", label: "Оттенок объёма" },
      { kind: "color", key: "flare", label: "Цвет блика" },
      { kind: "color", key: "contourColor", label: "Цвет контура" },
      { kind: "color", key: "selectedGlowColor", label: "Свечение selected" },
    ],
  },
  {
    title: "Бар desktop",
    items: [
      { kind: "color", key: "chromeHi", label: "Бар верх" },
      { kind: "color", key: "chromeMid", label: "Бар середина" },
      { kind: "color", key: "chromeLo", label: "Бар низ" },
      { kind: "color", key: "cavityHi", label: "Полость верх" },
      { kind: "color", key: "cavityLo", label: "Полость низ" },
    ],
  },
  {
    title: "Рамки / свет",
    items: [
      { kind: "color", key: "whiteRimColor", label: "Светлая рамка" },
      { kind: "color", key: "greyRimColor", label: "Тёмная рамка" },
      { kind: "color", key: "roomLightColor", label: "Свет сверху" },
    ],
  },
];

const TAB_MOTION: { title: string; items: FieldDef[] }[] = [
  {
    title: "Характер догона",
    items: [
      { key: "followSpring", label: "Жёсткость пружины", min: 40, max: 900, step: 5 },
      { key: "followDamp", label: "Затухание", min: 1, max: 60, step: 0.5 },
      { key: "followStretch", label: "Растяжение от скорости", min: 0, max: 0.2, step: 0.001 },
      { key: "followStretchMax", label: "Макс. растяжение (px)", min: 0, max: 80, step: 1 },
      { key: "hoverLerp", label: "Скорость hover-ответа", min: 0.5, max: 30, step: 0.5 },
    ],
  },
  {
    title: "Свечение selected",
    items: [
      { key: "selectedGlow", label: "Сила свечения", min: 0, max: 2, step: 0.01 },
      { key: "selectedGlowSpeed", label: "Скорость пульса", min: 0.15, max: 3.5, step: 0.05 },
      { key: "selectedGlowSpread", label: "Размытие свечения", min: 0.2, max: 2.5, step: 0.05 },
    ],
  },
];

export const LIQUID_GLASS_TWEAK_TABS: Record<
  LiquidGlassTweakTabId,
  { title: string; items: LiquidGlassFieldDef[] }[]
> = {
  glass: TAB_GLASS,
  chrome: TAB_CHROME,
  colors: TAB_COLORS,
  motion: TAB_MOTION,
};

const TABS = LIQUID_GLASS_TWEAK_TABS;

type Props = {
  open: boolean;
  tweaks: LiquidGlassTweaks;
  onChange: (partial: Partial<LiquidGlassTweaks>) => void;
  onReset: () => void;
  onClose: () => void;
  onExport: () => void;
};

export function LiquidGlassTweakPanel({ open, tweaks, onChange, onReset, onClose, onExport }: Props) {
  const [tab, setTab] = useState<TabId>("glass");
  if (!open) return null;

  const sections = TABS[tab];

  return (
    <div className="lg-tweak-panel" role="dialog" aria-label="Твики стеклянной навигации">
      <header className="lg-tweak-head">
        <strong className="lg-tweak-title">Nav glass</strong>
        <div className="lg-tweak-actions">
          <button type="button" className="lg-tweak-btn" onClick={onExport}>
            Export
          </button>
          <button type="button" className="lg-tweak-btn" onClick={onReset}>
            Reset
          </button>
          <button type="button" className="lg-tweak-btn lg-tweak-close" onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </div>
      </header>

      <div className="lg-tweak-tabs" role="tablist">
        {(Object.keys(TABS) as TabId[]).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={`lg-tweak-tab${tab === id ? " is-on" : ""}`}
            onClick={() => setTab(id)}
          >
            {{ glass: "Стекло", chrome: "Рамки", colors: "Цвета", motion: "Движение" }[id]}
          </button>
        ))}
      </div>

      <div className="lg-tweak-scroll">
        {sections.map((section) => (
          <section key={section.title} className="lg-tweak-section">
            <h3 className="lg-tweak-section-title">{section.title}</h3>
            {section.items.map((item) => {
              if (item.kind === "color") {
                const value = String(tweaks[item.key]);
                return (
                  <label key={item.key} className="lg-tweak-row">
                    <span className="lg-tweak-label">
                      <span>{item.label}</span>
                      <span className="lg-tweak-value">{value}</span>
                    </span>
                    <input
                      type="color"
                      className="lg-tweak-color"
                      value={value}
                      onChange={(e) => onChange({ [item.key]: e.target.value })}
                    />
                  </label>
                );
              }
              const value = Number(tweaks[item.key]);
              return (
                <label key={item.key} className="lg-tweak-row">
                  <span className="lg-tweak-label">
                    <span>{item.label}</span>
                    <span className="lg-tweak-value">{formatLiquidGlassValue(value, item.step)}</span>
                  </span>
                  <input
                    type="range"
                    className="lg-tweak-range"
                    min={item.min}
                    max={item.max}
                    step={item.step}
                    value={value}
                    onChange={(e) => onChange({ [item.key]: Number(e.target.value) })}
                  />
                </label>
              );
            })}
          </section>
        ))}
      </div>
      <p className="lg-tweak-hint">Клавиша 2 — открыть / закрыть</p>
    </div>
  );
}
