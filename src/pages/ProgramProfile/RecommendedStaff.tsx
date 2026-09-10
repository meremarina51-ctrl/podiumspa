"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { useRef } from "react"
import { pick } from "@/lib/i18n-content"
import { STAFF } from "@/lib/staff"
import { GRADIENTS } from "@/pages/Staff/constants"
import { RECOMMENDED_COUNT } from "./constants"
import { ROUTES } from "@/lib/routes"

export const RecommendedStaff = () => {
    const t = useTranslations("recommendedStaff")
    const tCommon = useTranslations("common")
    const tStaff = useTranslations("staffPage")
    const locale = useLocale()
    const scrollRef = useRef<HTMLDivElement>(null)
    const staff = STAFF.slice(0, RECOMMENDED_COUNT).map((member, index) => ({ ...member, index }))

    const scrollBy = (direction: 1 | -1) => scrollRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" })

    return (
        <section className="mx-auto w-full max-w-340 px-6 pb-16 md:px-14 md:pb-24">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <h2
                    className="text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                    style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                >
                    {t("titleStart")} <em className="text-accent-light">{t("titleAccent")}</em>
                </h2>
                <Link
                    href={ROUTES.STAFF}
                    className="border-b border-accent-wash-strong pb-1 text-[12.5px] font-semibold tracking-[0.08em] text-accent-light uppercase transition-colors duration-200 hover:text-foreground"
                >
                    {t("viewAll")}
                </Link>
            </div>

            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-2 scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
                >
                    {staff.map((girl, i) => (
                        <Link key={girl.index} href={`${ROUTES.STAFF}/${girl.index}`} className="group block w-40 shrink-0 sm:w-48">
                            <div
                                className="relative aspect-3/4 overflow-hidden rounded-sm transition-transform duration-300 ease-out group-hover:-translate-y-1"
                                style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                            >
                                {girl.photos[0] && (
                                    <Image
                                        src={girl.photos[0]}
                                        alt={pick(girl.name, locale)}
                                        fill
                                        sizes="(min-width: 640px) 192px, 160px"
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <p
                                className="mt-3.5 text-[20px] leading-none text-foreground transition-colors duration-200 group-hover:text-accent-light"
                                style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                            >
                                {pick(girl.name, locale)}{girl.age ? `, ${girl.age}` : ""}
                            </p>
                            <p className="mt-1 text-[12.5px] text-foreground-faint">
                                {girl.height ? `${tStaff("cardHeight")}: ${girl.height} · ` : ""}
                                {girl.weight ? `${tStaff("cardWeight")}: ${girl.weight} · ` : ""}
                                {tStaff("cardBust")}: {girl.bust}
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
