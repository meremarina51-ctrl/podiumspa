"use client"

import { Clock, Maximize2, Wallet, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { OrderModal } from "@/components/OrderModal"
import type { ALL_PROGRAMMS } from "@/lib/programms"

interface IProps {
    program: (typeof ALL_PROGRAMMS)[number]
}

export const Profile = ({ program }: IProps) => {
    const [isOrderOpen, setOrderOpen] = useState(false)
    const [isLightbox, setLightbox] = useState(false)

    const [price, duration] = program.price.split("·").map((part) => part.trim())

    return (
        <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent opacity-15 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent opacity-10 blur-[100px]" />

            <div className="relative mx-auto w-full max-w-340 px-6 py-10 md:px-14">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[440px_1fr]">
                    <button
                        type="button"
                        onClick={() => setLightbox(true)}
                        aria-label="Открыть фото на весь экран"
                        className="group relative aspect-4/5 w-full cursor-zoom-in overflow-hidden rounded-sm"
                    >
                        <Image
                            src={program.photo}
                            alt={program.name}
                            fill
                            sizes="(min-width: 1024px) 440px, 100vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            priority
                        />
                        <div className="absolute top-4 left-4 flex size-8 items-center justify-center rounded-full bg-background/50 text-foreground backdrop-blur-sm">
                            <Maximize2 className="size-3.5" />
                        </div>
                    </button>

                    <div>
                        <span className="mb-3 block text-[11px] font-semibold tracking-[0.15em] text-accent-light uppercase">
                            Программа
                        </span>
                        <h1
                            className="text-[40px] leading-none font-medium text-foreground sm:text-[48px]"
                            style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                        >
                            {program.name}
                        </h1>

                        <div className="mt-7 flex flex-wrap gap-3">
                            {price && (
                                <div className="flex items-center gap-3 rounded-sm border border-border px-4 py-3">
                                    <div className="flex size-8 items-center justify-center rounded-full bg-accent-wash text-accent-light">
                                        <Wallet className="size-4" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Цена</p>
                                        <p className="text-[15px] font-semibold text-foreground">{price}</p>
                                    </div>
                                </div>
                            )}
                            {duration && (
                                <div className="flex items-center gap-3 rounded-sm border border-border px-4 py-3">
                                    <div className="flex size-8 items-center justify-center rounded-full bg-accent-wash text-accent-light">
                                        <Clock className="size-4" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Время</p>
                                        <p className="text-[15px] font-semibold text-foreground">{duration}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="mt-7 max-w-160 text-[14.5px] leading-relaxed text-foreground-muted">
                            {program.bio}
                        </p>

                        <button
                            type="button"
                            onClick={() => setOrderOpen(true)}
                            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
                        >
                            Записаться
                        </button>
                    </div>
                </div>
            </div>

            {isLightbox && (
                <div className="fixed inset-0 z-80 flex items-center justify-center p-4 sm:p-8">
                    <div className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={() => setLightbox(false)} />
                    <button
                        type="button"
                        onClick={() => setLightbox(false)}
                        aria-label="Закрыть"
                        className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground-muted backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-foreground sm:top-6 sm:right-6"
                    >
                        <X className="size-5" />
                    </button>
                    <div className="animate-modal-in relative h-full max-h-[85vh] w-full max-w-4xl">
                        <Image src={program.photo} alt={program.name} fill sizes="90vw" className="object-contain" />
                    </div>
                </div>
            )}

            <OrderModal title={program.name} open={isOrderOpen} onClose={() => setOrderOpen(false)} />
        </section>
    )
};
