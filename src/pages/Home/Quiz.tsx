"use client"

import { ArrowLeft, ArrowRight, Check, HelpCircle, Phone, User } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { useState } from "react"
import { Checkbox } from "@/components/Checkbox"
import { formatPhone } from "@/lib/formatPhone"
import { pick } from "@/lib/i18n-content"
import { CONTACT_STEP, QUESTIONS, STEP_IMAGES, SUCCESS_STEP, TOTAL_STEPS } from "./constants"

const inputClass =
    "h-12 w-full rounded-[10px] border border-foreground/15 bg-foreground/3 pl-11 pr-4 text-sm text-foreground placeholder:text-foreground-faint transition-colors focus:border-accent/50 focus:bg-foreground/5 focus:outline-none"

const primaryButtonClass =
    "group inline-flex items-center cursor-pointer gap-2 rounded-[10px] bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-accent/30 active:translate-y-0 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-35 disabled:shadow-none"

const secondaryButtonClass =
    "group inline-flex items-center cursor-pointer gap-2 rounded-[10px] border border-foreground/15 px-6 py-3.5 text-sm font-bold text-foreground/70 transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:text-foreground"

const headingFont = { fontFamily: "var(--font-cormorant), Arial, sans-serif" }

export const Quiz = () => {
    const t = useTranslations("homeQuiz")
    const locale = useLocale()
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<string[]>(Array(TOTAL_STEPS).fill(""))
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [consent, setConsent] = useState(false)

    const currentQuestion = step >= 1 && step <= TOTAL_STEPS ? QUESTIONS[step - 1] : null
    const selectedAnswer = currentQuestion ? answers[step - 1] : ""

    const selectAnswer = (value: string) => {
        setAnswers((prev) => {
            const next = [...prev]
            next[step - 1] = value
            return next
        })
    }

    const goNext = () => setStep((s) => s + 1)
    const goBack = () => setStep((s) => Math.max(0, s - 1))

    const canSubmit = name.trim() !== "" && phone.trim() !== "" && consent

    const handleSubmit = () => {
        if (!canSubmit) return

        setStep(SUCCESS_STEP)
    }

    let content: React.ReactNode

    if (step === 0) {
        content = (
            <div key={step} className="animate-step-in flex w-full flex-wrap items-center gap-8 lg:gap-12">
                <div className="relative flex size-20 shrink-0 items-center justify-center sm:size-24">
                    <span className="absolute inset-0 rounded-full bg-accent/10 blur-md" />
                    <span className="absolute inset-0 animate-pulse rounded-full border border-dashed border-accent/40" />
                    <div className="relative flex size-20 items-center justify-center rounded-full border border-accent/40 bg-background/40 sm:size-24">
                        <HelpCircle className="size-8 text-accent sm:size-10" />
                    </div>
                </div>
                <div className="min-w-70 flex-1">
                    <h3 style={headingFont} className="mb-2.5 text-2xl font-medium text-foreground sm:text-[30px]">
                        {t("introTitle")}
                    </h3>
                    <p className="mb-6 max-w-115 text-sm leading-relaxed text-foreground-muted sm:text-[15px]">
                        {t("introText")}
                    </p>
                    <button type="button" onClick={goNext} className={primaryButtonClass}>
                        {t("start")}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        )
    } else if (currentQuestion) {
        content = (
            <div key={step} className="animate-step-in w-full">
                <div className="mb-7 flex flex-wrap items-center gap-3">
                    <div className="flex gap-1.5">
                        {QUESTIONS.map((_, i) => (
                            <span
                                key={i}
                                className={`h-1 w-7 rounded-full transition-colors duration-300 ${i < step ? "bg-accent" : "bg-foreground/15"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="rounded-full bg-foreground/8 px-2.5 py-1 text-[11px] font-bold tracking-wide text-foreground-faint uppercase">
                        {t("questionOf", { step, total: TOTAL_STEPS })}
                    </span>
                </div>

                <h3 style={headingFont} className="mb-5 text-xl font-medium text-foreground sm:text-2xl">
                    {pick(currentQuestion.title, locale)}
                </h3>

                <div className="mb-7 flex flex-col gap-3 sm:max-w-125">
                    {currentQuestion.options.map((option, i) => {
                        const label = pick(option, locale)
                        const active = selectedAnswer === label
                        return (
                            <button
                                key={i}
                                type="button"
                                onClick={() => selectAnswer(label)}
                                className={`flex items-center gap-3 rounded-xl border px-5 py-3.5 text-left text-sm font-semibold transition-all sm:text-[15px] ${active
                                    ? "border-accent bg-accent/10 text-foreground shadow-[0_0_0_1px] shadow-accent/40"
                                    : "border-foreground/15 text-foreground/75 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-foreground/3"
                                    }`}
                            >
                                <span
                                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${active ? "border-accent" : "border-foreground/25"
                                        }`}
                                >
                                    <span
                                        className={`size-2.5 rounded-full bg-accent transition-transform duration-200 ${active ? "scale-100" : "scale-0"
                                            }`}
                                    />
                                </span>
                                {label}
                            </button>
                        )
                    })}
                </div>

                <div className="flex items-center gap-3">
                    <button type="button" onClick={goBack} className={secondaryButtonClass}>
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        {t("back")}
                    </button>
                    <button type="button" onClick={goNext} disabled={!selectedAnswer} className={primaryButtonClass}>
                        {t("nextStep")}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        )
    } else if (step === CONTACT_STEP) {
        content = (
            <div key={step} className="animate-step-in grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
                <div>
                    <h3 style={headingFont} className="mb-2.5 text-2xl font-medium text-foreground sm:text-[28px]">
                        {t("contactTitle")}
                    </h3>
                    <p className="max-w-100 text-sm leading-relaxed text-foreground-muted sm:text-[15px]">
                        {t("contactText")}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
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
                    <div className="relative">
                        <Phone className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground-faint" />
                        <input
                            type="tel"
                            inputMode="tel"
                            value={phone}
                            onChange={(e) => setPhone(formatPhone(e.target.value))}
                            placeholder={t("phonePlaceholder")}
                            maxLength={18}
                            className={inputClass}
                        />
                    </div>

                    <Checkbox
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        label={t("consentLabel")}
                    />

                    <div className="mt-1 flex items-center gap-3">
                        <button type="button" onClick={goBack} className={`${secondaryButtonClass} h-13`}>
                            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                            {t("back")}
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!canSubmit}
                            className={`${primaryButtonClass} h-13 flex-1 justify-center`}
                        >
                            {t("submit")}
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        content = (
            <div key={step} className="animate-step-in flex w-full flex-col items-center py-4 text-center">
                <div className="relative mb-5 flex size-16 items-center justify-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent/20" />
                    <div className="relative flex size-16 items-center justify-center rounded-full bg-accent/15">
                        <Check className="size-7 text-accent" />
                    </div>
                </div>
                <h3 style={headingFont} className="mb-2 text-xl font-medium text-foreground sm:text-2xl">
                    {t("successTitle")}
                </h3>
                <p className="max-w-105 text-sm leading-relaxed text-foreground-muted sm:text-[15px]">
                    {t("successText")}
                </p>
            </div>
        )
    }

    return (
        <section id="quiz" className="px-5 pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
            <div className="mx-auto max-w-200">
                <div className="relative overflow-hidden rounded-[20px] border border-accent/25 p-6 shadow-2xl shadow-black/40 sm:p-8 lg:p-12">
                    {STEP_IMAGES.map((src, i) => (
                        <Image
                            key={`${src}-${i}`}
                            src={src}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 800px, 100vw"
                            priority={i === 0}
                            className={`object-cover transition-opacity duration-500 ease-in-out ${i === step ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    ))}
                    <div className="absolute inset-0 bg-linear-to-b from-background/90 via-background/85 to-background/95" />
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />
                    <div className="pointer-events-none absolute -top-35 -right-15 h-90 w-90 rounded-full bg-accent opacity-15 blur-[90px]" />
                    <div className="pointer-events-none absolute -bottom-24 -left-10 h-60 w-60 rounded-full bg-accent opacity-10 blur-[80px]" />
                    <div className="relative">{content}</div>
                </div>
            </div>
        </section>
    )
};
