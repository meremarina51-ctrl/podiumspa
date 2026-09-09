"use client"

import { RotateCcw, SlidersHorizontal, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Checkbox } from "@/components/Checkbox"
import { STAFF } from "@/lib/staff"
import { EMPTY_FILTERS, GRADIENTS, PAGE_SIZE } from "./constants"

const bustValue = (bust: string) => {
    const match = bust.match(/[\d,.]+/)
    return match ? Number(match[0].replace(",", ".")) : null
}

const isSiliconeBust = (bust: string) => bust.toLowerCase().includes("sil")

export const Staff = () => {
    const [form, setForm] = useState(EMPTY_FILTERS)
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

    const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }))

    const isEmptyFilters = (f: typeof form) =>
        Object.entries(f).every(([key, value]) => value === EMPTY_FILTERS[key as keyof typeof form])

    const isDirty = !isEmptyFilters(form)

    const applyFilters = () => {
        setFilters(form)
        setVisible(PAGE_SIZE)
        setFiltersOpen(false)
    }

    const resetFilters = () => {
        setForm(EMPTY_FILTERS)
        setFilters(EMPTY_FILTERS)
        setVisible(PAGE_SIZE)
    }

    const canReset = isDirty || !isEmptyFilters(filters)
    const activeCount = Object.entries(filters).filter(
        ([key, value]) => value !== EMPTY_FILTERS[key as keyof typeof form]
    ).length

    const filtered = useMemo(() => {
        const isActive =
            filters.ageFrom || filters.ageTo || filters.heightFrom || filters.heightTo ||
            filters.weightFrom || filters.weightTo || filters.bustFrom || filters.bustTo ||
            filters.silicone || filters.hasVideo
        if (!isActive) return STAFF

        return STAFF.filter((girl) => {
            if (filters.ageFrom && (girl.age === null || girl.age < Number(filters.ageFrom))) return false
            if (filters.ageTo && (girl.age === null || girl.age > Number(filters.ageTo))) return false
            if (filters.heightFrom && (girl.height === null || girl.height < Number(filters.heightFrom))) return false
            if (filters.heightTo && (girl.height === null || girl.height > Number(filters.heightTo))) return false
            if (filters.weightFrom && (girl.weight === null || girl.weight < Number(filters.weightFrom))) return false
            if (filters.weightTo && (girl.weight === null || girl.weight > Number(filters.weightTo))) return false

            const bust = bustValue(girl.bust)
            if (filters.bustFrom && (bust === null || bust < Number(filters.bustFrom))) return false
            if (filters.bustTo && (bust === null || bust > Number(filters.bustTo))) return false

            if (filters.silicone && !isSiliconeBust(girl.bust)) return false
            if (filters.hasVideo && !girl.hasVideo) return false

            return true
        })
    }, [filters])

    const rangeGroupClass =
        "flex h-11 items-center gap-2.5 rounded-full border border-border px-4 transition-colors duration-200 focus-within:border-accent/60"
    const rangeInputClass =
        "w-14 bg-transparent text-[13px] text-foreground placeholder:text-foreground-faint focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    const labelClass = "mb-2.5 block text-[11px] font-semibold tracking-[0.1em] text-foreground-faint uppercase"

    const filterFields = (
        <>
            <div className="basis-[calc(50%-0.625rem)] sm:basis-auto">
                <span className={labelClass}>Возраст, лет</span>
                <div className={rangeGroupClass}>
                    <input type="number" value={form.ageFrom} onChange={(e) => set("ageFrom", e.target.value)} placeholder="От" className={rangeInputClass} />
                    <span className="text-foreground-faint">—</span>
                    <input type="number" value={form.ageTo} onChange={(e) => set("ageTo", e.target.value)} placeholder="До" className={rangeInputClass} />
                </div>
            </div>

            <div className="basis-[calc(50%-0.625rem)] sm:basis-auto">
                <span className={labelClass}>Рост, см</span>
                <div className={rangeGroupClass}>
                    <input type="number" value={form.heightFrom} onChange={(e) => set("heightFrom", e.target.value)} placeholder="От" className={rangeInputClass} />
                    <span className="text-foreground-faint">—</span>
                    <input type="number" value={form.heightTo} onChange={(e) => set("heightTo", e.target.value)} placeholder="До" className={rangeInputClass} />
                </div>
            </div>

            <div className="basis-[calc(50%-0.625rem)] sm:basis-auto">
                <span className={labelClass}>Вес, кг</span>
                <div className={rangeGroupClass}>
                    <input type="number" value={form.weightFrom} onChange={(e) => set("weightFrom", e.target.value)} placeholder="От" className={rangeInputClass} />
                    <span className="text-foreground-faint">—</span>
                    <input type="number" value={form.weightTo} onChange={(e) => set("weightTo", e.target.value)} placeholder="До" className={rangeInputClass} />
                </div>
            </div>

            <div className="basis-[calc(50%-0.625rem)] sm:basis-auto">
                <span className={labelClass}>Грудь</span>
                <div className={rangeGroupClass}>
                    <input type="number" step="0.5" value={form.bustFrom} onChange={(e) => set("bustFrom", e.target.value)} placeholder="От" className={rangeInputClass} />
                    <span className="text-foreground-faint">—</span>
                    <input type="number" step="0.5" value={form.bustTo} onChange={(e) => set("bustTo", e.target.value)} placeholder="До" className={rangeInputClass} />
                </div>
            </div>

            <div className="flex basis-full flex-wrap items-center gap-5 sm:basis-auto sm:pb-1.5">
                <Checkbox
                    id="filter-silicone"
                    checked={form.silicone}
                    onChange={(e) => set("silicone", e.target.checked)}
                    label="Силикон"
                />
                <Checkbox
                    id="filter-video"
                    checked={form.hasVideo}
                    onChange={(e) => set("hasVideo", e.target.checked)}
                    label="Есть видео"
                />
            </div>
        </>
    )

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <h2
                    className="text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                    style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                >
                    Девушки <em className="text-accent-light">салона</em>
                </h2>
                <span className="text-[12.5px] font-semibold tracking-[0.08em] text-foreground-faint uppercase">
                    Всего: {STAFF.length}
                </span>
            </div>

            <div className="mb-8 flex items-center gap-3 sm:hidden">
                <button
                    type="button"
                    onClick={() => setFiltersOpen(true)}
                    className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border text-[13px] font-semibold text-foreground transition-colors duration-200 hover:border-accent-light hover:text-accent-light"
                >
                    <SlidersHorizontal className="size-4" />
                    Фильтры
                    {!!activeCount && (
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

            {!filtered.length ? (
                <p className="py-10 text-center text-[14.5px] text-foreground-muted">
                    По заданным параметрам никого не найдено.
                </p>
            ) : (
                <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
                    {filtered.slice(0, visible).map((girl, i) => (
                        <Link key={girl.name} href={`/staff/${STAFF.indexOf(girl)}`} className="group block">
                            <div
                                className="relative aspect-3/4 overflow-hidden rounded-sm transition-transform duration-300 ease-out group-hover:-translate-y-1"
                                style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                            >
                                {girl.photos[0] && (
                                    <Image
                                        src={girl.photos[0]}
                                        alt={girl.name}
                                        fill
                                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <p
                                className="mt-3.5 text-[20px] leading-none text-foreground transition-colors duration-200 group-hover:text-accent-light"
                                style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                            >
                                {girl.name}{girl.age ? `, ${girl.age}` : ""}
                            </p>
                            <p className="mt-1 text-[12.5px] text-foreground-faint">
                                {girl.height ? `Рост: ${girl.height} · ` : ""}
                                {girl.weight ? `Вес: ${girl.weight} · ` : ""}
                                Грудь: {girl.bust}
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
                        className="rounded-full cursor-pointer border border-border px-8 py-4 text-[13.5px] font-semibold tracking-[0.03em] text-foreground transition-colors duration-200 hover:border-accent-light hover:text-accent-light"
                    >
                        Показать ещё
                    </button>
                </div>
            )}
        </section>
    )
};
