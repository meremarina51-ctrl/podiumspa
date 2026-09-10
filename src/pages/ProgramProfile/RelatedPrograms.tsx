"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { useRef } from "react"
import { ALL_PROGRAMMS } from "@/lib/programms"
import { pick } from "@/lib/i18n-content"
import { RELATED_COUNT } from "./constants"
import { ROUTES } from "@/lib/routes"

interface IProps {
    currentIndex: number
}

export const RelatedPrograms = ({ currentIndex }: IProps) => {
    const t = useTranslations("relatedPrograms")
    const tCommon = useTranslations("common")
    const locale = useLocale()
    const scrollRef = useRef<HTMLDivElement>(null)

    const count = Math.min(RELATED_COUNT, ALL_PROGRAMMS.length - 1)
    const related = Array.from({ length: count }, (_, i) => {
        const index = (currentIndex + 1 + i) % ALL_PROGRAMMS.length
        return { ...ALL_PROGRAMMS[index], index }
    })

    const scrollBy = (direction: 1 | -1) => scrollRef.current?.scrollBy({ left: direction * 260, behavior: "smooth" })

    if (!related.length) return null

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <h2
                    className="text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                    style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                >
                    {t("titleStart")} <em className="text-accent-light">{t("titleAccent")}</em>
                </h2>
                <Link
                    href={ROUTES.PROGRAMS}
                    className="border-b border-accent-wash-strong pb-1 text-[12.5px] font-semibold tracking-[0.08em] text-accent-light uppercase transition-colors duration-200 hover:text-foreground"
                >
                    {tCommon("viewAll")}
                </Link>
            </div>

            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-2 scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
                >
                    {related.map((program) => (
                        <Link key={program.index} href={`${ROUTES.PROGRAMS}/${program.index}`} className="group block w-44 shrink-0 sm:w-52">
                            <div className="relative aspect-4/5 overflow-hidden rounded-sm">
                                <Image
                                    src={program.photo}
                                    alt={pick(program.name, locale)}
                                    fill
                                    sizes="(min-width: 640px) 208px, 176px"
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                            </div>
                            <p
                                className="mt-4 text-[18px] leading-none font-medium text-foreground transition-colors duration-200 group-hover:text-accent-light"
                                style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                            >
                                {pick(program.name, locale)}
                            </p>
                            <p className="mt-1.5 text-[13px] whitespace-pre-line text-foreground-faint">
                                {pick(program.price, locale)}
                            </p>
                        </Link>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => scrollBy(-1)}
                    aria-label={tCommon("carouselBack")}
                    className="absolute top-[38%] -left-4 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background text-foreground shadow-lg transition-colors duration-200 hover:border-foreground/40 lg:flex"
                >
                    <ArrowLeft className="size-4" />
                </button>
                <button
                    type="button"
                    onClick={() => scrollBy(1)}
                    aria-label={tCommon("carouselNext")}
                    className="absolute top-[38%] -right-4 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-accent/50 bg-background text-foreground shadow-lg transition-colors duration-200 hover:border-accent lg:flex"
                >
                    <ArrowRight className="size-4" />
                </button>
            </div>
        </section>
    )
};
