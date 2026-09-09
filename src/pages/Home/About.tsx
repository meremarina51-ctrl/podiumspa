"use client"

import { useState } from "react"
import { POINTS, VIDEOS } from "./constants"

export const About = () => {
    const [active, setActive] = useState(0)

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.65fr_1fr] lg:gap-18">
                <div>
                    <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm">
                        <video
                            key={VIDEOS[active]}
                            src={VIDEOS[active]}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 size-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent" />
                    </div>

                    <div className="mt-4 flex gap-3">
                        {VIDEOS.map((src, i) => (
                            <button
                                key={src}
                                type="button"
                                onClick={() => setActive(i)}
                                aria-label={`Видео ${i + 1}`}
                                className={`relative aspect-square w-1/3 overflow-hidden rounded-sm border-2 transition-colors duration-200 ${i === active ? "border-accent" : "border-transparent hover:border-foreground/25"
                                    }`}
                            >
                                <video
                                    src={src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 size-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <span className="text-[11.5px] font-semibold tracking-[0.22em] text-accent-light uppercase">О салоне</span>
                    <h2
                        className="mt-4 mb-6 text-[28px] leading-[1.15] font-medium text-foreground sm:text-[34px] lg:text-[38px]"
                        style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                    >
                        Салон эротического массажа Podium —{" "}
                        <em className="text-accent-light">лучшее место для отдыха</em>
                    </h2>

                    <p className="text-[15px] leading-relaxed text-foreground-muted">
                        Чтобы приятно провести время, не нужно ждать подходящего момента. Сделайте это прямо сейчас в
                        стенах салона Podium! Мужчины очень любят компанию наших потрясающих мастериц, и это неудивительно.
                    </p>

                    <div className="my-8 flex flex-col gap-5">
                        {POINTS.map((text, i) => (
                            <div key={i} className="flex items-baseline gap-4.5">
                                <span
                                    className="shrink-0 text-[15px] text-accent-light"
                                    style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                                >
                                    0{i + 1}
                                </span>
                                <span className="text-[14.5px] leading-relaxed text-foreground">{text}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-[15px] leading-relaxed text-foreground-muted">
                        Не отказывайте себе в удовольствии и проведите время так, как давно мечтали! Ну а наши мастерицы
                        составят вам приятную компанию.
                    </p>
                </div>
            </div>
        </section>
    )
};
