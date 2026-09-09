"use client"

import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface IProps {
    photos: string[]
    name: string
}

export const Gallery = ({ photos, name }: IProps) => {
    const [index, setIndex] = useState(0)
    const [isLightbox, setLightbox] = useState(false)

    const next = () => setIndex((i) => (i + 1) % photos.length)
    const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length)

    useEffect(() => {
        if (!isLightbox) return

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightbox(false)
            if (e.key === "ArrowRight") next()
            if (e.key === "ArrowLeft") prev()
        }

        document.addEventListener("keydown", onKeyDown)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", onKeyDown)
            document.body.style.overflow = ""
        }
    }, [isLightbox])

    return (
        <div>
            <div
                onClick={() => setLightbox(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setLightbox(true)
                }}
                aria-label="Открыть фото на весь экран"
                className="relative aspect-3/4 w-full cursor-zoom-in overflow-hidden rounded-sm sm:aspect-4/5"
            >
                <Image
                    key={photos[index]}
                    src={photos[index]}
                    alt={`${name}, фото ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="object-cover"
                    priority={index === 0}
                />

                <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex size-8 items-center justify-center rounded-full bg-background/50 text-foreground backdrop-blur-sm">
                    <Maximize2 className="size-3.5" />
                </div>

                {photos.length && (
                    <span className="absolute top-4 right-4 rounded-full bg-background/50 px-3 py-1 text-[11px] font-semibold tracking-widest text-foreground backdrop-blur-sm">
                        {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                    </span>
                )}

                {photos.length && (
                    <>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation()
                                prev()
                            }}
                            aria-label="Предыдущее фото"
                            className="absolute top-1/2 left-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/25 bg-background/40 text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-foreground/50"
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
                            className="absolute top-1/2 right-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-accent/60 bg-background/40 text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-accent"
                        >
                            <ArrowRight className="size-4" />
                        </button>
                    </>
                )}
            </div>

            {photos.length && (
                <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {photos.map((photo, i) => (
                        <button
                            key={photo}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Фото ${i + 1}`}
                            className={`relative aspect-3/4 w-16 shrink-0 overflow-hidden rounded-sm ring-2 transition-all duration-200 sm:w-18 ${i === index ? "ring-accent" : "opacity-55 ring-transparent hover:opacity-90"
                                }`}
                        >
                            <Image src={photo} alt="" fill sizes="80px" className="object-cover" />
                        </button>
                    ))}
                </div>
            )}

            {isLightbox && (
                <div className="fixed inset-0 z-80 flex items-center justify-center p-4 sm:p-8">
                    <div
                        className="absolute inset-0 bg-background/85 backdrop-blur-md"
                        onClick={() => setLightbox(false)}
                    />

                    <button
                        type="button"
                        onClick={() => setLightbox(false)}
                        aria-label="Закрыть"
                        className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground-muted backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-foreground sm:top-6 sm:right-6"
                    >
                        <X className="size-5" />
                    </button>

                    {photos.length > 1 && (
                        <>
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
                        </>
                    )}

                    <div className="animate-modal-in relative h-full max-h-[85vh] w-full max-w-4xl">
                        <Image
                            src={photos[index]}
                            alt={`${name}, фото ${index + 1}`}
                            fill
                            sizes="90vw"
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    )
};
