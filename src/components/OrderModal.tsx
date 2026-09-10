"use client"

import { Check, Phone, User, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/Checkbox"
import { phone } from "@/components/constants"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { formatPhone } from "@/lib/formatPhone"
import { WHATSAPP_HREF } from "@/lib/constants"

interface IProps {
    title: string
    open: boolean
    onClose: () => void
}

const inputClass =
    "h-12 w-full rounded-[10px] border border-foreground/15 bg-foreground/3 pl-11 pr-4 text-sm text-foreground placeholder:text-foreground-faint transition-colors focus:border-accent/50 focus:bg-foreground/5 focus:outline-none"

const headingFont = { fontFamily: "var(--font-cormorant), Arial, sans-serif" }

export const OrderModal = ({ title, open, onClose }: IProps) => {
    const t = useTranslations("orderModal")
    const tCommon = useTranslations("common")
    const [name, setName] = useState("")
    const [phoneValue, setPhoneValue] = useState("")
    const [isConsent, setConsent] = useState(false)
    const [isSubmitted, setSubmitted] = useState(false)

    const canSubmit = name.trim() !== "" && phoneValue.trim() !== "" && isConsent

    useEffect(() => {
        if (!open) return

        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    useEffect(() => {
        if (open) return

        const timeout = setTimeout(() => {
            setName("")
            setPhoneValue("")
            setConsent(false)
            setSubmitted(false)
        }, 300)

        return () => clearTimeout(timeout)
    }, [open])

    const handleSubmit = () => {
        if (!canSubmit) return
        
        setSubmitted(true)
    }

    return (
        <>
            <div
                onClick={onClose}
                aria-hidden="true"
                className={`fixed inset-0 z-90 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className={`fixed inset-x-0 bottom-0 z-95 max-h-[85vh] w-full overflow-y-auto rounded-t-2xl border-t border-border bg-surface p-6 shadow-2xl shadow-black/40 transition-all duration-300 ease-out sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:max-h-[90vh] sm:w-[calc(100%-2.5rem)] sm:max-w-105 sm:-translate-x-1/2 sm:rounded-[20px] sm:border sm:p-8 ${open
                    ? "translate-y-0 opacity-100 sm:-translate-y-1/2"
                    : "pointer-events-none translate-y-full opacity-100 sm:translate-y-[calc(50%+12px)] sm:opacity-0"
                    }`}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={tCommon("close")}
                    className="absolute cursor-pointer top-5 right-5 flex size-9 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors duration-200 hover:border-foreground/30"
                >
                    <X className="size-4.5" />
                </button>

                {isSubmitted ? (
                    <div className="flex flex-col items-center py-6 text-center">
                        <div className="relative mb-5 flex size-16 items-center justify-center">
                            <span className="absolute inset-0 animate-ping rounded-full bg-accent/20" />
                            <div className="relative flex size-16 items-center justify-center rounded-full bg-accent/15">
                                <Check className="size-7 text-accent" />
                            </div>
                        </div>
                        <h3 style={headingFont} className="mb-2 text-xl font-medium text-foreground sm:text-2xl">
                            {t("submittedTitle")}
                        </h3>
                        <p className="max-w-80 text-sm leading-relaxed text-foreground-muted">
                            {t("submittedText")}
                        </p>
                    </div>
                ) : (
                    <>
                        <h3 style={headingFont} className="mb-3 pr-10 text-[30px] leading-none font-medium text-foreground sm:text-[34px]">
                            {title}
                        </h3>
                        <p className="mb-4 text-[13.5px] text-foreground-muted">{t("bookingNote")}</p>

                        <div className="mb-6 flex items-center gap-2.5">
                            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="text-base font-bold text-foreground">
                                {phone}
                            </a>
                            <a
                                href={WHATSAPP_HREF}
                                aria-label={tCommon("writeWhatsapp")}
                                className="flex size-6 items-center justify-center rounded-full bg-[#25D366]/15"
                            >
                                <WhatsAppIcon className="size-3.5 text-[#25D366]" />
                            </a>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <span className="mb-2 block text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">
                                    {t("nameLabel")}
                                </span>
                                <div className="relative">
                                    <User className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground-faint" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={t("namePlaceholder")}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <span className="mb-2 block text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">
                                    {t("phoneLabel")}
                                </span>
                                <div className="relative">
                                    <Phone className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground-faint" />
                                    <input
                                        type="tel"
                                        inputMode="tel"
                                        value={phoneValue}
                                        onChange={(e) => setPhoneValue(formatPhone(e.target.value))}
                                        placeholder="+7"
                                        maxLength={18}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <Checkbox
                                id="order-consent"
                                checked={isConsent}
                                onChange={(e) => setConsent(e.target.checked)}
                                label={t("consentLabel")}
                            />

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!canSubmit}
                                className="rounded-full cursor-pointer bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-foreground/10 disabled:text-foreground-faint"
                            >
                                {t("submit")}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
};
