import { ALL_PROGRAMMS } from "@/lib/programms"
import Image from "next/image"
import Link from "next/link"

const parseTiers = (price: string) =>
    price
        .split("\n")
        .map((part) => {
            const match = part.match(/([\d\s]+)\s*₽\s*·\s*(\d+)\s*мин/)
            if (!match) return null
            return { price: Number(match[1].replace(/\s/g, "")), duration: Number(match[2]) }
        })
        .filter((tier): tier is { price: number; duration: number } => tier !== null)

const PROGRAMS = ALL_PROGRAMMS.slice(0, 4).map((program) => ({ ...program, tiers: parseTiers(program.price) }))

export const Programms = () => (
    <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <h2
                className="text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
                Популярные <em className="text-accent-light">программы</em>
            </h2>
            <Link
                href="/programs"
                className="border-b border-accent-wash-strong pb-1 text-[12.5px] font-semibold tracking-[0.08em] text-accent-light uppercase transition-colors duration-200 hover:text-foreground"
            >
                Все программы
            </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 max-sm:grid-cols-1 lg:grid-cols-4">
            {PROGRAMS.map((program) => (
                <div key={program.name} className="group">
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
                </div>
            ))}
        </div>

        <div className="mt-11 flex justify-center">
            <Link
                href="/programs"
                className="inline-flex items-center justify-center rounded-full border border-border px-8 py-4 text-[13.5px] font-semibold tracking-[0.03em] text-foreground transition-colors duration-200 hover:border-accent-light hover:text-accent-light"
            >
                Смотреть ещё
            </Link>
        </div>
    </section>
);
