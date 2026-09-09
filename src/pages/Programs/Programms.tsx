"use client"

import { RotateCcw, SlidersHorizontal, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { ALL_PROGRAMMS } from "@/lib/programms"
import { EMPTY_FILTERS, PAGE_SIZE } from "./constants"
import { parseTiers } from "@/lib/parseTiers"

const PROGRAMS = ALL_PROGRAMMS.map((program, index) => ({ ...program, tiers: parseTiers(program.price), index }))

export const Programms = () => {
    const [priceFrom, setPriceFrom] = useState("")
    const [priceTo, setPriceTo] = useState("")
    const [durationFrom, setDurationFrom] = useState("")
    const [durationTo, setDurationTo] = useState("")
    const [filters, setFilters] = useState(EMPTY_FILTERS)
    const [visible, setVisible] = useState(PAGE_SIZE)
    const [filtersOpen, setFiltersOpen] = useState(false)

    useEffect(() => {
        if (!filtersOpen) return

        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = ""
        }
    }, [filtersOpen])

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
        setFiltersOpen(false)
    }

    const resetFilters = () => {
        setPriceFrom("")
        setPriceTo("")
        setDurationFrom("")
        setDurationTo("")
        setFilters(EMPTY_FILTERS)
        setVisible(PAGE_SIZE)
    }

    const isDirty = Boolean(priceFrom || priceTo || durationFrom || durationTo)
    const isFiltersActive = Boolean(filters.priceFrom || filters.priceTo || filters.durationFrom || filters.durationTo)
    const canReset = isDirty || isFiltersActive
    const activeCount = Object.entries(filters).filter(([key, value]) => value !== EMPTY_FILTERS[key as keyof typeof filters]).length

    const rangeGroupClass =
        "flex h-11 items-center gap-2.5 rounded-full border border-border px-4 transition-colors duration-200 focus-within:border-accent/60"

    const rangeInputClass =
        "w-14 bg-transparent text-[13px] text-foreground placeholder:text-foreground-faint focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

    const filterFields = (
        <>
            <div className="basis-[calc(50%-0.625rem)] sm:basis-auto">
                <span className="mb-2.5 block text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Цена, ₽</span>
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

            <div className="basis-[calc(50%-0.625rem)] sm:basis-auto">
                <span className="mb-2.5 block text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Время, мин</span>
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
        </>
    )

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <h2
                className="mb-9 text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
                Программы
            </h2>

            <div className="mb-8 flex items-center gap-3 sm:hidden">
                <button
                    type="button"
                    onClick={() => setFiltersOpen(true)}
                    className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border text-[13px] font-semibold text-foreground transition-colors duration-200 hover:border-accent-light hover:text-accent-light"
                >
                    <SlidersHorizontal className="size-4" />
                    Фильтры
                    {activeCount > 0 && (
                        <span className="flex size-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                            {activeCount}
                        </span>
                    )}
                </button>
                {canReset && (
                    <button
                        type="button"
                        onClick={resetFilters}
                        aria-label="Сбросить фильтры"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors duration-200 hover:border-accent-light hover:text-accent-light"
                    >
                        <RotateCcw className="size-4" />
                    </button>
                )}
            </div>

            <div className="mb-10 hidden flex-wrap items-end gap-6 border-b border-border pb-8 sm:flex">
                {filterFields}

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={applyFilters}
                        disabled={!isDirty}
                        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-foreground/10 disabled:text-foreground-faint disabled:hover:bg-foreground/10"
                    >
                        Применить
                    </button>
                    <button
                        type="button"
                        onClick={resetFilters}
                        disabled={!canReset}
                        aria-label="Сбросить фильтры"
                        className="flex h-11 items-center gap-2 rounded-full border border-border px-4 text-[13px] font-semibold text-foreground-muted transition-colors duration-200 hover:border-accent-light hover:text-accent-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground-muted"
                    >
                        <RotateCcw className="size-3.5" />
                        Сбросить
                    </button>
                </div>
            </div>

            <div
                onClick={() => setFiltersOpen(false)}
                aria-hidden="true"
                className={`fixed inset-0 z-60 bg-background/70 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${filtersOpen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
            />

            <div
                className={`fixed inset-x-0 bottom-0 z-70 flex max-h-[85vh] flex-col rounded-t-2xl border-t border-border bg-surface shadow-2xl shadow-black/40 transition-transform duration-300 ease-out sm:hidden ${filtersOpen ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                <div className="flex items-center justify-between border-b border-border px-6 py-5">
                    <span className="text-xs font-bold tracking-wide text-foreground-faint uppercase">Фильтры</span>
                    <button
                        type="button"
                        onClick={() => setFiltersOpen(false)}
                        aria-label="Закрыть фильтры"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors duration-200 hover:border-foreground/30"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="flex flex-wrap gap-5 overflow-y-auto px-6 py-6">
                    {filterFields}
                </div>

                <div className="flex items-center gap-3 border-t border-border px-6 py-5">
                    <button
                        type="button"
                        onClick={applyFilters}
                        disabled={!isDirty}
                        className="flex-1 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-foreground/10 disabled:text-foreground-faint disabled:hover:bg-foreground/10"
                    >
                        Применить
                    </button>
                    <button
                        type="button"
                        onClick={resetFilters}
                        disabled={!canReset}
                        aria-label="Сбросить фильтры"
                        className="flex h-12 items-center gap-2 rounded-full border border-border px-4 text-[13px] font-semibold text-foreground-muted transition-colors duration-200 hover:border-accent-light hover:text-accent-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground-muted"
                    >
                        <RotateCcw className="size-3.5" />
                        Сбросить
                    </button>
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="py-10 text-center text-[14.5px] text-foreground-muted">
                    По заданным параметрам программ не найдено.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.slice(0, visible).map((program) => (
                        <Link key={program.name} href={`/programs/${program.index}`} className="group block">
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
