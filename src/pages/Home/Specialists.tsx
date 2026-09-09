import Image from "next/image"
import Link from "next/link"
import { STAFF } from "@/lib/staff"
import { GRADIENTS } from "./constants";

const GIRLS = STAFF.slice(0, 8)

export const Specialists = () => (
    <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <h2
                className="text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
                Девушки <em className="text-accent-light">салона</em>
            </h2>
            <Link
                href="/staff"
                className="border-b border-accent-wash-strong pb-1 text-[12.5px] font-semibold tracking-[0.08em] text-accent-light uppercase transition-colors duration-200 hover:text-foreground"
            >
                Смотреть всех
            </Link>
        </div>

        <div className="grid gap-x-5 gap-y-8 grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {GIRLS.map((girl, i) => (
                <Link key={girl.name} href="/staff" className="group block">
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
                        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                    >
                        {girl.name}, {girl.age}
                    </p>
                    <p className="mt-1 text-[12.5px] text-foreground-faint">
                        Рост: {girl.height} · Вес: {girl.weight} · Грудь: {girl.bust}
                    </p>
                </Link>
            ))}
        </div>

        <div className="mt-11 flex justify-center">
            <Link
                href="/staff"
                className="inline-flex items-center justify-center rounded-full border border-border px-8 py-4 text-[13.5px] font-semibold tracking-[0.03em] text-foreground transition-colors duration-200 hover:border-accent-light hover:text-accent-light"
            >
                Смотреть ещё
            </Link>
        </div>
    </section>
);
