import { getTranslations } from "next-intl/server"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { ROUTES } from "@/lib/routes";

export const Hero = async () => {
    const t = await getTranslations("homeHero")
    const tCommon = await getTranslations("common")

    return (
        <section className="relative overflow-hidden bg-background">
            <div className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-accent opacity-15 blur-[110px]" />

            <div className="mx-auto grid w-full max-w-340 grid-cols-1 items-center gap-10 px-6 py-12 sm:gap-12 sm:px-8 sm:py-16 md:px-14 md:py-20 lg:grid-cols-[1fr_auto] lg:py-24">
                <div className="min-w-0 flex flex-col gap-8 sm:gap-10">
                    <div>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-light sm:text-[11.5px] sm:tracking-[0.22em]">
                            {t("eyebrow")}
                        </span>

                        <h1
                            className="mt-4 max-w-120 text-[30px] leading-[1.15] font-medium wrap-break-word text-foreground sm:text-[42px] lg:text-[48px]"
                            style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                        >
                            {t("titleStart")}{" "}
                            <em className="text-accent-light">
                                {t("titleAccent")}
                            </em>
                        </h1>
                    </div>

                    <Link
                        href={ROUTES.CONTACTS}
                        className="inline-flex w-fit items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[13.5px] font-semibold tracking-[0.03em] text-white transition-colors hover:bg-accent-dark"
                    >
                        {tCommon("bookCta")}
                    </Link>
                </div>

                <div className="relative mx-auto w-full max-w-90 pb-14 sm:max-w-120 sm:pb-16 lg:mx-0 lg:w-95 lg:max-w-none">
                    <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm">
                        <Image
                            src="/home/hero.avif"
                            alt=""
                            fill
                            priority
                            sizes="(max-width: 1023px) 90vw, 380px"
                            className="object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,5,9,0.55)_0%,transparent_38%)]" />
                    </div>

                    <div className="absolute inset-x-3 bottom-0 overflow-hidden rounded-2xl border border-foreground/15 bg-background/55 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md">
                        <div className="flex items-center gap-3 px-5 pt-4 pb-3">
                            <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg bg-accent-wash text-accent-light backdrop-blur-sm">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                                    <path d="M4 4h16L12 13Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                                    <path d="M12 13v6M9 19h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[11.5px] leading-[1.4] text-foreground">
                                    {t("giftTitle")}
                                </p>
                                <p className="mt-1 text-[11px] leading-[1.4] text-foreground-muted">
                                    {t("giftSubtitle")}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-border p-3">
                            <Link
                                href={ROUTES.CONTACTS}
                                className="flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-[12px] font-semibold tracking-[0.03em] text-white transition-colors hover:bg-accent-dark"
                            >
                                {t("giftCta")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};
