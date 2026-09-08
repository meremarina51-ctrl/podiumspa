"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { ALL_PROGRAMMS } from "@/lib/programms"

const PAGE_SIZE = 6

const parseTiers = (price: string) =>
    price
        .split("\n")
        .map((part) => {
            const match = part.match(/([\d\s]+)\s*₽\s*·\s*(\d+)\s*мин/)
            if (!match) return null
            return { price: Number(match[1].replace(/\s/g, "")), duration: Number(match[2]) }
        })
        .filter((tier): tier is { price: number; duration: number } => tier !== null)

const PROGRAMS = ALL_PROGRAMMS.map((program) => ({ ...program, tiers: parseTiers(program.price) }))

export const Programms = () => {
    const [priceFrom, setPriceFrom] = useState("")
    const [priceTo, setPriceTo] = useState("")
    const [durationFrom, setDurationFrom] = useState("")
    const [durationTo, setDurationTo] = useState("")
    const [filters, setFilters] = useState({ priceFrom: "", priceTo: "", durationFrom: "", durationTo: "" })
    const [visible, setVisible] = useState(PAGE_SIZE)

    const filtered = useMemo(() => {
        const { priceFrom, priceTo, durationFrom, durationTo } = filters
        if (!priceFrom && !priceTo && !durationFrom && !durationTo) return PROGRAMS

        return PROGRAMS.filter((p) =>
            p.tiers.some((tier) => {
                if (priceFrom && tier.price < Number(priceFrom)) return false
                if (priceTo && tier.price > Number(priceTo)) return false
                if (durationFrom && tier.duration < Number(durationFrom)) return false
                if (durationTo && tier.duration > Number(durationTo)) return false
                return true
            })
        )
    }, [filters])

    const applyFilters = () => {
        setFilters({ priceFrom, priceTo, durationFrom, durationTo })
        setVisible(PAGE_SIZE)
    }

    const rangeGroupClass =
        "flex h-11 items-center gap-2.5 rounded-full border border-border px-4 transition-colors duration-200 focus-within:border-accent/60"

    const rangeInputClass =
        "w-14 bg-transparent text-[13px] text-foreground placeholder:text-foreground-faint focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <h2
                className="mb-9 text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
                Программы
            </h2>

            <div className="mb-10 flex flex-wrap items-end gap-6 border-b border-border pb-8">
                <div>
                    <span className="mb-2.5 block text-[11px] font-semibold tracking-[0.1em] text-foreground-faint uppercase">Цена, ₽</span>
                    <div className={rangeGroupClass}>
                        <input
                            type="number"
                            value={priceFrom}
                            onChange={(e) => setPriceFrom(e.target.value)}
                            placeholder="От"
                            className={rangeInputClass}
                        />
                        <span className="text-foreground-faint">—</span>
                        <input
                            type="number"
                            value={priceTo}
                            onChange={(e) => setPriceTo(e.target.value)}
                            placeholder="До"
                            className={rangeInputClass}
                        />
                    </div>
                </div>

                <div>
                    <span className="mb-2.5 block text-[11px] font-semibold tracking-[0.1em] text-foreground-faint uppercase">Время, мин</span>
                    <div className={rangeGroupClass}>
                        <input
                            type="number"
                            value={durationFrom}
                            onChange={(e) => setDurationFrom(e.target.value)}
                            placeholder="От"
                            className={rangeInputClass}
                        />
                        <span className="text-foreground-faint">—</span>
                        <input
                            type="number"
                            value={durationTo}
                            onChange={(e) => setDurationTo(e.target.value)}
                            placeholder="До"
                            className={rangeInputClass}
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={applyFilters}
                    disabled={!priceFrom && !priceTo && !durationFrom && !durationTo}
                    className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-foreground/10 disabled:text-foreground-faint disabled:hover:bg-foreground/10"
                >
                    Применить
                </button>
            </div>

            {filtered.length === 0 ? (
                <p className="py-10 text-center text-[14.5px] text-foreground-muted">
                    По заданным параметрам программ не найдено.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.slice(0, visible).map((program) => (
                        <Link key={program.name} href="/programs" className="group block">
                            <div className="relative aspect-4/5 overflow-hidden rounded-sm">
                                <Image
                                    src={program.photo}
                                    alt={program.name}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                            </div>
                            <p
                                className="mt-4 text-[22px] leading-none font-medium text-foreground transition-colors duration-200 group-hover:text-accent-light"
                                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                            >
                                {program.name}
                            </p>
                            <p className="mt-1.5 text-[14px] whitespace-pre-line text-foreground-faint">
                                {program.price}
                            </p>
                        </Link>
                    ))}
                </div>
            )}

            {visible < filtered.length && (
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
        </section>
    )
}
