"use client"

import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PHOTOS } from "./constants"

export const Interior = () => {
    const [index, setIndex] = useState(0)
    const [lightbox, setLightbox] = useState<number | null>(null)

    const next = () => setIndex((i) => (i + 1) % PHOTOS.length)
    const prev = () => setIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length)

    useEffect(() => {
        if (lightbox === null) return

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightbox(null)
        }

        document.addEventListener("keydown", onKeyDown)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", onKeyDown)
            document.body.style.overflow = ""
        }
    }, [lightbox])

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <h2
                    className="text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                    Интерьер <em className="text-accent-light">в салоне</em>
                </h2>
                <Link
                    href="/interior"
                    className="border-b border-accent-wash-strong pb-1 text-[12.5px] font-semibold tracking-[0.08em] text-accent-light uppercase transition-colors duration-200 hover:text-foreground"
                >
                    Смотреть все
                </Link>
            </div>

            <div
                onClick={() => setLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setLightbox(index)
                }}
                aria-label="Открыть фото на весь экран"
                className="relative aspect-4/3 w-full cursor-zoom-in overflow-hidden rounded-sm sm:aspect-video lg:aspect-21/8"
            >
                <Image
                    key={PHOTOS[index]}
                    src={PHOTOS[index]}
                    alt={`Интерьер салона, фото ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 1280px, 100vw"
                    className="object-cover"
                    priority={index === 0}
                />

                <div className="absolute top-4 left-4 flex size-8 items-center justify-center rounded-full bg-background/50 text-foreground backdrop-blur-sm sm:size-9">
                    <Maximize2 className="size-3.5" />
                </div>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        prev()
                    }}
                    aria-label="Предыдущее фото"
                    className="absolute top-1/2 left-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/25 bg-background/40 text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-foreground/50 sm:size-11"
                >
                    <ArrowLeft className="size-4" />
                </button>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        next()
                    }}
                    aria-label="Следующее фото"
                    className="absolute top-1/2 right-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-accent/60 bg-background/40 text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-accent sm:size-11"
                >
                    <ArrowRight className="size-4" />
                </button>
            </div>

            <div className="mt-6 flex justify-center gap-2">
                {PHOTOS.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Фото ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-accent" : "w-1.5 bg-foreground/20"}`}
                    />
                ))}
            </div>

            {lightbox !== null && (
                <div className="fixed inset-0 z-80 flex items-center justify-center p-4 sm:p-8">
                    <div
                        className="absolute inset-0 bg-background/85 backdrop-blur-md"
                        onClick={() => setLightbox(null)}
                    />

                    <button
                        type="button"
                        onClick={() => setLightbox(null)}
                        aria-label="Закрыть"
                        className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground-muted backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-foreground sm:top-6 sm:right-6"
                    >
                        <X className="size-5" />
                    </button>

                    <div className="animate-modal-in relative h-full max-h-[85vh] w-full max-w-4xl">
                        <Image
                            src={PHOTOS[lightbox]}
                            alt={`Интерьер салона, фото ${lightbox + 1}`}
                            fill
                            sizes="90vw"
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
        </section>
    )
}
