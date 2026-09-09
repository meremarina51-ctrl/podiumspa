import Image from "next/image"
import Link from "next/link"

export const Banner = () => (
    <section className="mx-auto w-full max-w-340 px-6 pb-16 md:px-14 md:pb-24">
        <div className="relative flex min-h-70 items-center justify-center overflow-hidden rounded-sm text-center">
            <Image
                src="/banner/akcziya2.jpg.avif"
                alt="Подбор мастера Podium Spa"
                fill
                sizes="(min-width: 1024px) 1280px, 100vw"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/70 to-background/50" />

            <div className="relative max-w-130 px-6 py-16">
                <h2
                    className="mb-3.5 text-[28px] leading-tight font-medium text-foreground sm:text-[34px]"
                    style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                >
                    Не определились с <em className="text-accent-light">выбором?</em>
                </h2>
                <p className="mb-7 text-sm leading-relaxed text-foreground-muted sm:text-[15px]">
                    Отправьте заявку на подбор мастера и получите +30 минут на массаж в подарок!
                </p>
                <Link
                    href="/#quiz"
                    className="inline-flex rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
                >
                    Подобрать
                </Link>
            </div>
        </div>
    </section>
);
