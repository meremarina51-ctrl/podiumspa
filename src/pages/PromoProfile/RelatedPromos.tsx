"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { PROMOS } from "@/lib/promo"
import { truncate } from "@/lib/truncate"
import { RELATED_COUNT } from "./constants"

interface IProps {
    currentIndex: number
}

export const RelatedPromos = ({ currentIndex }: IProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    const count = Math.min(RELATED_COUNT, PROMOS.length - 1)
    const related = Array.from({ length: count }, (_, i) => {
        const index = (currentIndex + 1 + i) % PROMOS.length
        return { ...PROMOS[index], index }
    })

    const scrollBy = (direction: 1 | -1) => scrollRef.current?.scrollBy({ left: direction * 280, behavior: "smooth" })

    if (!related.length) return null

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <h2
                    className="text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                    style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                >
                    Другие <em className="text-accent-light">акции</em>
                </h2>
                <Link
                    href="/promo"
                    className="border-b border-accent-wash-strong pb-1 text-[12.5px] font-semibold tracking-[0.08em] text-accent-light uppercase transition-colors duration-200 hover:text-foreground"
                >
                    Смотреть все
                </Link>
            </div>

            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {related.map((promo) => (
                        <Link
                            key={promo.name}
                            href={`/promo/${promo.index}`}
                            className={`group block w-52 shrink-0 sm:w-60 ${promo.expired ? "opacity-60 hover:opacity-80" : ""}`}
                        >
                            <div className="relative aspect-4/5 overflow-hidden rounded-sm">
                                <Image
                                    src={promo.photo}
                                    alt={promo.name}
                                    fill
                                    sizes="(min-width: 640px) 240px, 208px"
                                    className={`object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${promo.expired ? "grayscale" : ""}`}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent" />
                                <span
                                    className={`absolute top-3 left-3 w-fit rounded-full border px-2.5 py-1 text-[9.5px] font-semibold tracking-widest uppercase backdrop-blur-sm ${promo.expired
                                        ? "border-foreground/25 bg-background/40 text-foreground-faint"
                                        : "border-accent/50 bg-background/40 text-accent-light"
                                        }`}
                                >
                                    {promo.expired ? "Завершена" : "Акция"}
                                </span>
                            </div>
                            <p
                                className="mt-4 text-[18px] leading-none font-medium text-foreground transition-colors duration-200 group-hover:text-accent-light"
                                style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                            >
                                {promo.name}
                            </p>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-foreground-muted">
                                {truncate(promo.bio, 80)}
                            </p>
                        </Link>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => scrollBy(-1)}
                    aria-label="Назад"
                    className="absolute top-[32%] -left-4 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background text-foreground shadow-lg transition-colors duration-200 hover:border-foreground/40 lg:flex"
                >
                    <ArrowLeft className="size-4" />
                </button>
                <button
                    type="button"
                    onClick={() => scrollBy(1)}
                    aria-label="Вперёд"
                    className="absolute top-[32%] -right-4 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-accent/50 bg-background text-foreground shadow-lg transition-colors duration-200 hover:border-accent lg:flex"
                >
                    <ArrowRight className="size-4" />
                </button>
            </div>
        </section>
    )
};
