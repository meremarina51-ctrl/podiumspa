"use client"

import { Menu, X } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import { Link, usePathname } from "@/i18n/navigation"
import { address, ALL_NAV_ITEMS, phone } from "@/components/constants"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { LiquidGlassTweakPanel } from "@/components/LiquidGlassTweakPanel"
import type { LiquidGlassNavHandle, LiquidGlassTweaks } from "@/lib/liquid-glass/engine"
import { mountLiquidGlassNav } from "@/lib/liquid-glass/engine"
import { PODIUM_GLASS_DEFAULTS, PODIUM_GLASS_HOVER, PODIUM_GLASS_HOVER_KEYS } from "@/lib/liquid-glass/presets"
import { loadGlassTweaks, saveGlassTweaks } from "@/lib/liquid-glass/tweaks-storage"
import { pick } from "@/lib/i18n-content"
import { ROUTES } from "@/lib/routes"
import "./header-nav.css"

export const Header = ({ overlay = false }: { overlay?: boolean }) => {
    const pathname = usePathname()
    const locale = useLocale()
    const t = useTranslations("header")
    const tCommon = useTranslations("common")
    const [isOpen, setOpen] = useState(false)
    const [isWide, setIsWide] = useState(false)
    const [glassOk, setGlassOk] = useState(true)
    const [panelOpen, setPanelOpen] = useState(false)
    const [glassTweaks, setGlassTweaks] = useState<LiquidGlassTweaks>(() => loadGlassTweaks(PODIUM_GLASS_DEFAULTS))

    const stageRef = useRef<HTMLElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
    const engineRef = useRef<LiquidGlassNavHandle | null>(null)

    const activeIndex = Math.max(0, ALL_NAV_ITEMS.findIndex((item) => item.href === pathname))
    const labels = ALL_NAV_ITEMS.map((item) => pick(item.name, locale))

    useEffect(() => {
        if (!isOpen) return

        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)")
        const sync = () => setIsWide(mq.matches)
        sync()
        mq.addEventListener("change", sync)
        return () => mq.removeEventListener("change", sync)
    }, [])

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null
            if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable) return
            if (e.key === "2" || e.code === "Digit2") {
                e.preventDefault()
                setPanelOpen((v) => !v)
            }
            if (e.key === "Escape") setPanelOpen(false)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    useEffect(() => {
        if (!isWide || !glassOk) return
        const stage = stageRef.current
        const canvas = canvasRef.current
        if (!stage || !canvas) return

        let handle: LiquidGlassNavHandle | null = null
        try {
            handle = mountLiquidGlassNav({
                canvas,
                stage,
                getButtons: () => linkRefs.current.filter(Boolean) as HTMLElement[],
                initialActive: activeIndex,
                orientation: "horizontal",
                domLabels: false,
                itemLens: true,
                hoverTweaks: PODIUM_GLASS_HOVER,
                hoverBlendKeys: PODIUM_GLASS_HOVER_KEYS,
                onContextLost: () => {
                    handle?.destroy()
                    handle = null
                    engineRef.current = null
                    setGlassOk(false)
                },
            })
            handle.setLabels(labels)
            handle.setTweaks(glassTweaks)
            engineRef.current = handle
        } catch {
            engineRef.current = null
            // Imperative result of an external system (WebGL) failing to initialize —
            // a legitimate setState-in-effect, not derivable during render.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setGlassOk(false)
        }

        return () => {
            handle?.destroy()
            engineRef.current = null
        }
        // Mount once per isWide/glassOk flip — pathname/locale/tweaks pushed via the effects below.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isWide, glassOk])

    useEffect(() => {
        engineRef.current?.setActive(activeIndex)
        engineRef.current?.setLabels(labels)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, locale])

    useEffect(() => {
        engineRef.current?.setTweaks(glassTweaks)
    }, [glassTweaks])

    const onGlassChange = useCallback((partial: Partial<LiquidGlassTweaks>) => {
        setGlassTweaks((prev) => {
            const next = { ...prev, ...partial }
            saveGlassTweaks(next)
            return next
        })
    }, [])

    const onGlassReset = useCallback(() => {
        setGlassTweaks({ ...PODIUM_GLASS_DEFAULTS })
        saveGlassTweaks(PODIUM_GLASS_DEFAULTS)
    }, [])

    const onGlassExport = useCallback(() => {
        const blob = new Blob([JSON.stringify(glassTweaks, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "podium-nav-glass-tweaks.json"
        a.click()
        URL.revokeObjectURL(url)
    }, [glassTweaks])

    const glassPad = Math.ceil(Math.max(glassTweaks.lensDiameter, glassTweaks.lensDiameter * glassTweaks.lensSquashY) * 0.5 + 28)

    const pill = (
        <nav
            ref={(el) => { if (!isWide || !glassOk) stageRef.current = el }}
            className={`podium-nav-pill${isWide && glassOk ? " is-glass" : ""}`}
            aria-label="Main"
        >
            {ALL_NAV_ITEMS.map((item, i) => (
                <Link
                    key={item.href}
                    href={item.href}
                    ref={(el) => { linkRefs.current[i] = el }}
                    className={`podium-nav-link${i === activeIndex ? " is-active" : ""}`}
                    aria-current={i === activeIndex ? "page" : undefined}
                >
                    {pick(item.name, locale)}
                </Link>
            ))}
        </nav>
    )

    return (
        <>
            <div className="podium-nav">
                <Link href={ROUTES.HOME} className="podium-nav-logo group">
                    <span
                        className="h-3 w-3 shrink-0 rotate-45 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-225"
                        style={{ background: "linear-gradient(135deg, var(--accent-light), var(--accent))" }}
                    />
                    <span className="text-[22px] font-bold tracking-[0.07em] text-foreground transition-colors duration-200 ease-out group-hover:text-accent-light">
                        PODIUM
                    </span>
                </Link>

                <div className="hidden lg:block">
                    {isWide && glassOk ? (
                        <div
                            ref={(el) => { stageRef.current = el }}
                            className="podium-nav-glass-stage"
                            style={{ padding: glassPad, margin: -glassPad } as CSSProperties}
                        >
                            <canvas ref={canvasRef} className="podium-nav-glass-canvas" aria-hidden="true" />
                            {pill}
                        </div>
                    ) : (
                        pill
                    )}
                </div>

                <div className="podium-nav-meta hidden lg:flex">
                    <a className="podium-nav-meta-link is-phone" href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
                        {phone}
                    </a>
                    <Link href={ROUTES.CONTACTS} className="podium-nav-cta">
                        {tCommon("bookCta")}
                    </Link>
                    <LanguageSwitcher />
                </div>

                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label={t("openMenu")}
                    className="podium-nav-burger ml-auto flex lg:hidden"
                >
                    <Menu className="size-5" />
                </button>
            </div>

            {!overlay && <div className="podium-nav-spacer" aria-hidden="true" />}

            <div
                onClick={() => setOpen(false)}
                aria-hidden="true"
                className={`fixed inset-0 z-60 bg-background/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
            />

            <aside
                className={`fixed top-0 right-0 z-70 flex h-dvh w-full flex-col border-l border-border bg-surface p-6 shadow-2xl shadow-black/40 transition-transform duration-300 ease-out sm:max-w-80 lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="mb-8 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wide text-foreground-faint uppercase">{t("menu")}</span>
                    <div className="flex items-center gap-2.5">
                        <LanguageSwitcher />
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label={t("closeMenu")}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors duration-200 hover:border-foreground/30"
                        >
                            <X className="size-5" />
                        </button>
                    </div>
                </div>

                <nav>
                    <ul className="flex flex-col gap-1">
                        {ALL_NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`block rounded-lg px-3 py-3 text-base font-semibold transition-colors duration-200 ${pathname === item.href
                                        ? "bg-accent-wash text-accent-light"
                                        : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                                        }`}
                                >
                                    {pick(item.name, locale)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="mt-auto flex flex-col gap-4 border-t border-border pt-6">
                    <Link
                        href={ROUTES.CONTACTS}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold tracking-[0.03em] text-white transition-colors duration-200 hover:bg-accent-dark"
                    >
                        {tCommon("bookCta")}
                    </Link>
                    <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="text-base font-bold text-foreground">
                        {phone}
                    </a>
                    <p className="text-xs leading-relaxed text-foreground-faint">{pick(address, locale)}</p>
                </div>
            </aside>

            <LiquidGlassTweakPanel
                open={panelOpen}
                tweaks={glassTweaks}
                onChange={onGlassChange}
                onReset={onGlassReset}
                onClose={() => setPanelOpen(false)}
                onExport={onGlassExport}
            />
        </>
    )
};
