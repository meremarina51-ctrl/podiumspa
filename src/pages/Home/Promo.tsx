"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { CATEGORY_ICONS, PROMOS } from "./constants"

export const Promo = () => {
    const [index, setIndex] = useState(0)

    const next = () => setIndex((i) => (i + 1) % PROMOS.length)
    const prev = () => setIndex((i) => (i - 1 + PROMOS.length) % PROMOS.length)

    const main = PROMOS[index]
    const peek = PROMOS[(index + 1) % PROMOS.length]

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <h2
                    className="text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                    Наши <em className="text-accent-light">акции</em>
                </h2>
                <Link
                    href="/promo"
                    className="border-b border-accent-wash-strong pb-1 text-[12.5px] font-semibold tracking-[0.08em] text-accent-light uppercase transition-colors duration-200 hover:text-foreground"
                >
                    Все акции
                </Link>
            </div>

            <div className="flex gap-5 overflow-hidden">
                <div className="relative aspect-4/5 flex-[0_0_100%] overflow-hidden rounded-sm sm:aspect-video xl:aspect-21/8 xl:flex-[0_0_74%]">
                    <Image src={main.image} alt={main.title} fill sizes="(min-width: 1280px) 74vw, 100vw" className="object-cover" priority />
                    <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/55 to-transparent xl:bg-linear-to-r xl:from-background/95 xl:via-background/60 xl:to-transparent" />
                    <div className="relative flex h-full max-w-130 flex-col justify-end px-6 pb-8 sm:justify-center sm:px-14 sm:pb-0">
                        <span className="mb-4 w-fit rounded-full border border-accent/50 px-3.5 py-1.5 text-[11px] font-semibold tracking-widest text-accent-light uppercase xl:mb-5">
                            Акция
                        </span>
                        <h3
                            className="mb-3 text-2xl leading-tight font-medium text-foreground xl:mb-3.5 xl:text-[32px] xl:leading-none"
                            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                        >
                            {main.title}
                        </h3>
                        <p className="mb-5 max-w-100 text-sm leading-relaxed text-foreground-muted xl:mb-6">{main.description}</p>
                        <Link
                            href="/promo"
                            className="w-fit rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark xl:px-7 xl:py-3.5"
                        >
                            Подробнее
                        </Link>
                    </div>
                </div>

                <div className="relative hidden aspect-21/8 flex-[0_0_22%] overflow-hidden rounded-sm xl:block">
                    <Image src={peek.image} alt={peek.title} fill sizes="22vw" className="object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/45 to-background/10" />
                    <div className="relative flex h-full flex-col justify-center px-6">
                        <span className="mb-4 w-fit rounded-full border border-foreground/20 px-3 py-1 text-[10px] font-semibold tracking-[0.08em] text-foreground-faint uppercase">
                            Акция
                        </span>
                        <h3
                            className="text-xl leading-tight font-medium text-foreground/70"
                            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                        >
                            {peek.title}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-2">
                    {PROMOS.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Слайд ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-accent" : "w-1.5 bg-foreground/20"}`}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs tracking-widest text-foreground-faint">
                        {String(index + 1).padStart(2, "0")} / {String(PROMOS.length).padStart(2, "0")}
                    </span>
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Предыдущий слайд"
                        className="flex size-10 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors duration-200 hover:border-foreground/40"
                    >
                        <ArrowLeft className="size-4" />
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Следующий слайд"
                        className="flex size-10 items-center justify-center rounded-full border border-accent/50 text-foreground transition-colors duration-200 hover:border-accent"
                    >
                        <ArrowRight className="size-4" />
                    </button>
                </div>
            </div>

            <div className="mt-9 flex justify-center gap-2.5 sm:gap-4">
                {CATEGORY_ICONS.map((Icon, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={PROMOS[i]?.title ?? `Слайд ${i + 1}`}
                        className={`flex size-11 cursor-pointer shrink-0 items-center justify-center rounded-full transition-colors duration-200 sm:size-12 ${i === index
                            ? "bg-accent text-white"
                            : "bg-accent-wash text-accent-light hover:bg-accent-wash-strong"
                            }`}
                    >
                        <Icon className="size-4.5 sm:size-5" />
                    </button>
                ))}
            </div>
        </section>
    )
};
