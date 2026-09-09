import Image from "next/image"
import Link from "next/link"
import { PROMOS } from "@/lib/promo"
import { truncate } from "@/lib/truncate"

export const Catalog = () => (
    <section className="mx-auto w-full max-w-340 px-6 pb-16 md:px-14 md:pb-24">
        <h2
            className="mb-9 text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
            style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
        >
            Все <em className="text-accent-light">акции</em>
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {PROMOS.map((promo, index) => (
                <Link
                    key={promo.name}
                    href={`/promo/${index}`}
                    className={`group block ${promo.expired ? "opacity-60 hover:opacity-80" : ""}`}
                >
                    <div className="relative aspect-4/5 overflow-hidden rounded-sm">
                        <Image
                            src={promo.photo}
                            alt={promo.name}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className={`object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${promo.expired ? "grayscale" : ""}`}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent" />
                        <span
                            className={`absolute top-4 left-4 w-fit rounded-full border px-3 py-1 text-[10px] font-semibold tracking-widest uppercase backdrop-blur-sm ${promo.expired
                                ? "border-foreground/25 bg-background/40 text-foreground-faint"
                                : "border-accent/50 bg-background/40 text-accent-light"
                                }`}
                        >
                            {promo.expired ? "Акция завершена" : "Акция"}
                        </span>
                    </div>
                    <p
                        className="mt-4 text-[20px] leading-none font-medium text-foreground transition-colors duration-200 group-hover:text-accent-light"
                        style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                    >
                        {promo.name}
                    </p>
                    <p className="mt-1.5 text-[11.5px] font-semibold tracking-[0.08em] text-foreground-faint uppercase">
                        {promo.date}
                    </p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-foreground-muted">
                        {truncate(promo.bio)}
                    </p>
                </Link>
            ))}
        </div>
    </section>
);
