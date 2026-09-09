"use client"

import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { PAGE_SIZE, PHOTOS } from "./constants"

export const Gallery = () => {
    const [visible, setVisible] = useState(PAGE_SIZE)
    const [lightbox, setLightbox] = useState<number | null>(null)

    const next = () => setLightbox((i) => (i === null ? null : (i + 1) % PHOTOS.length))
    const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length))

    useEffect(() => {
        if (lightbox === null) return

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightbox(null)
            if (e.key === "ArrowRight") next()
            if (e.key === "ArrowLeft") prev()
        }

        document.addEventListener("keydown", onKeyDown)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", onKeyDown)
            document.body.style.overflow = ""
        }
    }, [lightbox])

    return (
        <section className="mx-auto w-full max-w-340 px-6 pb-16 md:px-14 md:pb-24">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <h2
                    className="text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                    Фото <em className="text-accent-light">салона</em>
                </h2>
                <span className="text-[12.5px] font-semibold tracking-[0.08em] text-foreground-faint uppercase">
                    Всего: {PHOTOS.length}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {PHOTOS.slice(0, visible).map((photo, i) => (
                    <button
                        key={photo}
                        type="button"
                        onClick={() => setLightbox(i)}
                        aria-label={`Открыть фото ${i + 1}`}
                        className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-sm"
                    >
                        <Image
                            src={photo}
                            alt={`Интерьер салона, фото ${i + 1}`}
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-background/0 transition-colors duration-200 group-hover:bg-background/20" />
                        <div className="absolute top-3 left-3 flex size-7 items-center justify-center rounded-full bg-background/50 text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                            <Maximize2 className="size-3" />
                        </div>
                    </button>
                ))}
            </div>

            {visible < PHOTOS.length && (
                <div className="mt-11 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setVisible((v) => v + PAGE_SIZE)}
                        className="rounded-full border border-border px-8 py-4 text-[13.5px] font-semibold tracking-[0.03em] text-foreground transition-colors duration-200 hover:border-accent-light hover:text-accent-light"
                    >
                        Показать ещё
                    </button>
                </div>
            )}

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

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            prev()
                        }}
                        aria-label="Предыдущее фото"
                        className="absolute top-1/2 left-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/25 bg-background/40 text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-foreground/50 sm:left-6 sm:size-11"
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
                        className="absolute top-1/2 right-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-accent/60 bg-background/40 text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-accent sm:right-6 sm:size-11"
                    >
                        <ArrowRight className="size-4" />
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

                    <span className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs tracking-widest text-foreground-faint">
                        {String(lightbox + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
                    </span>
                </div>
            )}
        </section>
    )
};
