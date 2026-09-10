import { getTranslations } from "next-intl/server"
import Image from "next/image"

const HREF = 'https://5massage.com/'

export const Banner = async () => {
    const t = await getTranslations("programsBanner")

    return (
        <section className="mx-auto w-full max-w-340 px-6 pb-16 md:px-14 md:pb-24">
            <div className="relative flex min-h-70 items-center justify-center overflow-hidden rounded-sm text-center">
                <Image
                    src="/banner/akcziya1.png.avif"
                    alt="Podium Spa"
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
                        {t("titleStart")} <em className="text-accent-light">{t("titleAccent")}</em>
                    </h2>
                    <p className="mb-7 text-sm leading-relaxed text-foreground-muted sm:text-[15px]">
                        {t("text")}
                    </p>
                    <a
                        href={HREF}
                        className="inline-flex rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
                    >
                        {t("cta")}
                    </a>
                </div>
            </div>
        </section>
    )
};
