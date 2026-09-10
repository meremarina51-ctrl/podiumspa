"use client"

import { Phone, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { TelegramIcon } from "@/components/icons/TelegramIcon"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { TELEGRAM_HREF, WHATSAPP_HREF } from "@/lib/constants"

export const FloatingButton = () => {
    const t = useTranslations("floatingButton")
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

        document.addEventListener("mousedown", onClickOutside)
        document.addEventListener("keydown", onKeyDown)

        return () => {
            document.removeEventListener("mousedown", onClickOutside)
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [isOpen])

    return (
        <div ref={ref} className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
            <div className="flex flex-col items-end gap-3">
                <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("whatsapp")}
                    aria-hidden={!isOpen}
                    tabIndex={isOpen ? 0 : -1}
                    className={`flex size-13 items-center justify-center rounded-full border border-[#25D366]/30 bg-surface text-[#25D366] shadow-lg shadow-black/25 transition-all duration-200 ease-out hover:-translate-y-0.5 ${isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                        }`}
                >
                    <WhatsAppIcon className="size-6" />
                </a>
                <a
                    href={TELEGRAM_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("telegram")}
                    aria-hidden={!isOpen}
                    tabIndex={isOpen ? 0 : -1}
                    className={`flex size-13 items-center justify-center rounded-full border border-[#29A9EA]/30 bg-surface text-[#29A9EA] shadow-lg shadow-black/25 transition-all duration-200 ease-out hover:-translate-y-0.5 ${isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                        }`}
                >
                    <TelegramIcon className="size-6" />
                </a>
            </div>

            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={isOpen ? t("closeMenu") : t("openMenu")}
                className="flex cursor-pointer size-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-transform duration-200 hover:scale-105 active:scale-95"
            >
                {isOpen ? <X className="size-6" /> : <Phone className="size-6" />}
            </button>
        </div>
    )
};
