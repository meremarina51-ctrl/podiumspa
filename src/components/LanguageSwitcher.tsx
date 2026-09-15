"use client"

import { Check, ChevronDown } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

export const LanguageSwitcher = () => {
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()
    const t = useTranslations("languageSwitcher")
    const [isOpen, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) return

        const onClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false)
        }

        document.addEventListener("mousedown", onClickOutside);
        document.addEventListener("keydown", onKeyDown);
        
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
            document.removeEventListener("keydown", onKeyDown);
        }
    }, [isOpen])

    const select = (nextLocale: (typeof routing.locales)[number]) => {
        setOpen(false)
        router.replace(pathname, { locale: nextLocale })
    }

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={t("selectLanguage")}
                aria-expanded={isOpen}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-foreground/15 bg-surface/60 px-3 py-1.5 text-[12.5px] font-semibold text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-foreground/30"
            >
                {locale.toUpperCase()}
                <ChevronDown
                    className={`size-3.5 text-foreground-faint transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            <div
                className={`absolute top-full right-0 z-20 mt-2 w-32 overflow-hidden rounded-sm border border-border bg-surface shadow-xl shadow-black/30 transition-all duration-150 ease-out ${isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
                    }`}
            >
                {routing.locales.map((code) => (
                    <button
                        key={code}
                        type="button"
                        onClick={() => select(code)}
                        className={`flex w-full cursor-pointer items-center justify-between px-3.5 py-2.5 text-[13px] font-medium transition-colors duration-200 ${locale === code ? "text-accent-light" : "text-foreground-muted hover:text-foreground"
                            }`}
                    >
                        {t(code)}
                        {locale === code && <Check className="size-3.5" />}
                    </button>
                ))}
            </div>
        </div>
    )
};
