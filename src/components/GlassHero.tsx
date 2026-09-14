"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import type { GlassExperience } from "@/lib/glass/glass-experience";
import { GLASS_TWEAKS_MT1, GLASS_TWEAKS_MT2, GLASS_TWEAKS_T1, GLASS_TWEAKS_T2 } from "@/lib/glass/scroll-tweaks";
import { DEFAULT_INTRO_SETTINGS } from "@/lib/glass/intro-easing";
import "./glass-hero.css";

const SLIDE_KEYS = ["welcome", "vipMassage", "giftCard"] as const;

const MOBILE_MQ = "(max-width: 640px)";

function isMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches;
}

export function GlassHero() {
  const t = useTranslations("homeGlassHero");
  const host = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const experience = useRef<GlassExperience | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [paused, setPaused] = useState(false);
  const [slide, setSlide] = useState(0);

  const slides = SLIDE_KEYS.map((key) => ({
    key,
    title: t(`slides.${key}.title`),
    body: t(`slides.${key}.body`),
    note: t(`slides.${key}.note`),
  }));

  useEffect(() => {
    let cancelled = false;
    let instance: GlassExperience | null = null;
    const mountEl = host.current;
    if (!mountEl) return;

    (async () => {
      try {
        const mobile = isMobileViewport();
        const from = mobile ? GLASS_TWEAKS_MT1 : GLASS_TWEAKS_T1;
        const to = mobile ? GLASS_TWEAKS_MT2 : GLASS_TWEAKS_T2;
        const settings = DEFAULT_INTRO_SETTINGS;

        const { createGlassExperience } = await import("@/lib/glass/glass-experience");
        if (cancelled) return;

        instance = await createGlassExperience(mountEl, setSlide);
        if (cancelled) {
          instance.dispose();
          instance = null;
          return;
        }

        experience.current = instance;
        setPaused(instance.paused);
        instance.setScrollMorphEnabled(false);
        instance.setDragEnabled(false);

        const introSeenKey = "podium-glass-intro-seen";
        let skipIntro = false;
        try {
          skipIntro = localStorage.getItem(introSeenKey) === "1";
        } catch {
          /* private mode */
        }

        instance.playIntro(from, to, {
          duration: settings.duration,
          ease: settings.ease,
          bezier: settings.bezier,
          skip: skipIntro,
          onComplete: () => {
            try {
              localStorage.setItem(introSeenKey, "1");
            } catch {
              /* ignore */
            }
          },
        });
        instance.bindScrollTrack(
          track.current,
          mobile ? GLASS_TWEAKS_MT1 : GLASS_TWEAKS_T1,
          mobile ? GLASS_TWEAKS_MT2 : GLASS_TWEAKS_T2,
        );
        setReady(true);
      } catch {
        if (!cancelled) {
          setError(t("webglError"));
        }
      }
    })();

    return () => {
      cancelled = true;
      instance?.dispose();
      if (experience.current === instance) experience.current = null;
      instance = null;
      setReady(false);
      setError("");
    };
    // Mount once — locale text updates via useTranslations without remounting WebGL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function togglePause() {
    if (!experience.current) return;
    const next = !experience.current.paused;
    experience.current.setPaused(next);
    setPaused(next);
  }

  return (
    <section className="glass-hero" aria-label="PODIUM">
      <div className="glass-hero-track" ref={track}>
        <div className="glass-hero-stage">
          <div className="glass-hero-scene" ref={host} aria-hidden="true" />
          <h1 className="sr-only">PODIUM</h1>

          {!ready && (
            <div className="glass-hero-loading" role="status">
              {error || t("loading")}
            </div>
          )}

          {ready && (
            <div className="glass-hero-copy" aria-live="polite">
              {slides.map((item, index) => (
                <article
                  key={item.key}
                  className={`glass-hero-copy-card${slide === index ? " is-active" : ""}`}
                  aria-hidden={slide !== index}
                >
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                  {item.note ? <p className="glass-hero-note">{item.note}</p> : null}
                </article>
              ))}

              <footer className={`glass-hero-footer${ready ? " is-visible" : ""}`}>
                <nav className="glass-hero-controls" aria-label={t("sliderControls")}>
                  <button
                    type="button"
                    className="glass-hero-btn"
                    aria-label={t("prevSlide")}
                    onClick={() => experience.current?.step(-1)}
                  >
                    <ChevronLeft strokeWidth={1.25} />
                  </button>
                  <div className="glass-hero-dots">
                    {[0, 1, 2].map((i) => (
                      <button
                        key={i}
                        type="button"
                        className={`glass-hero-dot${slide === i ? " is-active" : ""}`}
                        aria-label={t("slideNumber", { n: i + 1 })}
                        aria-current={slide === i ? "true" : undefined}
                        onClick={() => experience.current?.goTo(i)}
                      >
                        <span />
                      </button>
                    ))}
                  </div>
                  <span className="glass-hero-count">
                    0{slide + 1}
                    <span> / 03</span>
                  </span>
                  <button
                    type="button"
                    className="glass-hero-btn"
                    aria-label={t("nextSlide")}
                    onClick={() => experience.current?.step(1)}
                  >
                    <ChevronRight strokeWidth={1.25} />
                  </button>
                  <span className="glass-hero-divider" />
                  <button
                    type="button"
                    className="glass-hero-btn"
                    aria-label={paused ? t("resumeSlider") : t("pauseSlider")}
                    onClick={togglePause}
                  >
                    {paused ? <Play strokeWidth={1.25} /> : <Pause strokeWidth={1.25} />}
                  </button>
                </nav>
              </footer>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
