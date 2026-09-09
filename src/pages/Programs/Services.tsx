"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { SERVICES } from "./constants"

export const Services = () => {
    const [index, setIndex] = useState(0)

    const next = () => setIndex((i) => (i + 1) % SERVICES.length)
    const prev = () => setIndex((i) => (i - 1 + SERVICES.length) % SERVICES.length)

    const service = SERVICES[index]

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <h2
                className="mb-9 text-[28px] leading-none font-medium text-foreground sm:text-[32px] md:text-[36px]"
                style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
            >
                Вам может быть <em className="text-accent-light">интересно</em>
            </h2>

            <div className="flex flex-wrap items-center justify-between gap-8">
                <div className="flex min-w-70 flex-1 items-center gap-6">
                    <div className="relative aspect-4/3 w-40 shrink-0 overflow-hidden rounded-sm">
                        <Image
                            key={service.photo}
                            src={service.photo}
                            alt={service.name}
                            fill
                            sizes="160px"
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p
                            className="text-[19px] font-medium text-foreground"
                            style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                        >
                            {service.name}
                        </p>
                        <div className="mt-2 flex flex-col gap-1">
                            {service.options.map((option) => (
                                <p key={option} className="text-[13.5px] text-foreground-faint">
                                    {option}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Предыдущая услуга"
                        className="flex size-10 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors duration-200 hover:border-foreground/40"
                    >
                        <ArrowLeft className="size-4" />
                    </button>
                    <span className="text-xs tracking-widest text-foreground-faint">
                        {String(index + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                    </span>
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Следующая услуга"
                        className="flex size-10 items-center justify-center rounded-full border border-accent/50 text-foreground transition-colors duration-200 hover:border-accent"
                    >
                        <ArrowRight className="size-4" />
                    </button>
                </div>
            </div>
        </section>
    )
}
