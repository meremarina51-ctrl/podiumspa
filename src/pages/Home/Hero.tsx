import Image from "next/image"
import Link from "next/link"

export const Hero = () => (
        <section className="relative overflow-hidden bg-background">
            <div className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-accent opacity-15 blur-[110px]" />

            <div className="mx-auto grid w-full max-w-340 grid-cols-1 items-center gap-10 px-6 py-12 sm:gap-12 sm:px-8 sm:py-16 md:px-14 md:py-20 lg:grid-cols-[1fr_auto] lg:py-24">
                <div className="min-w-0 flex flex-col gap-8 sm:gap-10">
                    <div>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-light sm:text-[11.5px] sm:tracking-[0.22em]">
                            Приватный салон эротического массажа
                        </span>

                        <h1
                            className="mt-4 max-w-120 text-[30px] leading-[1.15] font-medium wrap-break-word text-foreground sm:text-[42px] lg:text-[48px]"
                            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                        >
                            Podium — салон эротического массажа класса{" "}
                            <em className="text-accent-light">VIP</em>
                        </h1>
                    </div>

                    <Link
                        href="/contacts"
                        className="inline-flex w-fit items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[13.5px] font-semibold tracking-[0.03em] text-white transition-colors hover:bg-accent-dark"
                    >
                        Записаться
                    </Link>
                </div>

                <div className="relative mx-auto w-full max-w-90 sm:max-w-120 lg:mx-0 lg:w-95 lg:max-w-none">
                    <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm">
                        <Image
                            src="/home/hero.webp"
                            alt=""
                            fill
                            priority
                            sizes="(max-width: 1023px) 90vw, 380px"
                            className="object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,5,9,0.55)_0%,transparent_38%)]" />
                    </div>

                    <div className="relative mt-4 overflow-hidden rounded-sm border border-border shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
                        <div className="relative h-30 w-full">
                            <Image
                                src="/home/banner/bg-300x213.png.webp"
                                alt=""
                                fill
                                priority
                                sizes="380px"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,5,9,0.35)_0%,rgba(10,5,9,0.85)_100%)]" />

                            <div className="relative flex h-full items-center gap-3 px-5">
                                <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg bg-accent-wash text-accent-light">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 4h16L12 13Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                                        <path d="M12 13v6M9 19h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[11.5px] leading-[1.4] text-foreground">
                                        Подарочные сертификаты для мужчин на эротический массаж
                                    </p>
                                    <p className="mt-1 text-[11px] leading-[1.4] text-foreground-muted">
                                        Устройте ему невероятный сюрприз!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-2 p-3">
                            <Link
                                href="/contacts"
                                className="flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-[12px] font-semibold tracking-[0.03em] text-white transition-colors hover:bg-accent-dark"
                            >
                                Получить
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
