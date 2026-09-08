"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const SERVICES = [
    {
        name: 'Фетиш',
        options: ['1 000 ₽ · 30 мин', '1 500 ₽ · 60 мин'],
        photo: '/services/photo_2023-10-11_14-39-13.jpg.webp',
    },
    {
        name: 'Совместный душ',
        options: ['500 ₽ · 30 мин', '1 000 ₽ · 60 мин'],
        photo: '/services/photo_2023-10-11_14-39-24.jpg.webp',
    },
    {
        name: 'Массаж простаты',
        options: ['2 000 ₽ · 30 мин'],
        photo: '/services/photo_2023-10-11_14-39-33.jpg.webp',
    },
    {
        name: 'Ветка сакуры',
        options: ['500 ₽ · 30 мин', '1 000 ₽ · 60 мин'],
        photo: '/services/photo_2023-10-11_14-39-44.jpg.webp',
    },
    {
        name: 'Страпон',
        options: ['5 000 ₽ · 60 мин'],
        photo: '/services/photo_2023-10-11_14-39-55.jpg.webp',
    },
    {
        name: 'Массаж горячими апельсинами',
        options: ['1 000 ₽ · 60 мин'],
        photo: '/services/photo_2023-10-11_14-40-04.jpg.webp',
    },
    {
        name: 'Камасутра',
        options: ['1 000 ₽ · 30 мин', '2 000 ₽ · 60 мин'],
        photo: '/services/photo_2023-10-11_14-40-14.jpg.webp',
    },
    {
        name: 'Тайский боди массаж',
        options: ['500 ₽ · 30 мин', '1 000 ₽ · 60 мин'],
        photo: '/services/photo_2023-10-11_14-40-25.jpg.webp',
    },
    {
        name: 'Массаж стоп горячими полотенцами',
        options: ['500 ₽ · 30 мин'],
        photo: '/services/photo_2023-10-11_14-40-35.jpg.webp',
    },
    {
        name: 'Имитация оральных ласк',
        options: ['1 000 ₽ · 30 мин', '1 500 ₽ · 60 мин'],
        photo: '/services/photo_2023-10-11_14-40-45.jpg.webp',
    },
]

export const Services = () => {
    const [index, setIndex] = useState(0)

    const next = () => setIndex((i) => (i + 1) % SERVICES.length)
    const prev = () => setIndex((i) => (i - 1 + SERVICES.length) % SERVICES.length)

    const service = SERVICES[index]

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <h2
                className="mb-9 text-[28px] leading-none font-medium text-foreground sm:text-[32px] md:text-[36px]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
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
                            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
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
