import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { TELEGRAM_HREF } from "@/lib/constants";

export const TelegramBanner = async () => {
    const t = await getTranslations("homeTelegramBanner")

    return (
        <section className="mx-auto w-full max-w-340 px-6 pb-16 md:px-14 md:pb-24">
            <div className="relative min-h-70 overflow-hidden rounded-sm">
                <Image
                    src="/banner/akcziya2.jpg.avif"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 1280px, 100vw"
                    className="object-cover"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(10,5,9,0.95) 0%, rgba(10,5,9,0.75) 45%, rgba(10,5,9,0.25) 100%)",
                    }}
                />

                <div className="relative flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14">
                    <h3 className="mb-4 max-w-110 text-[26px] leading-tight font-bold text-foreground sm:text-[34px]">
                        {t("title")}
                    </h3>
                    <p className="mb-7 max-w-100 text-sm text-foreground-muted sm:text-[15px]">
                        {t("text")}
                    </p>
                    <Link
                        href={TELEGRAM_HREF}
                        className="inline-flex w-fit items-center gap-2.5 rounded-full border border-foreground/30 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-foreground/50"
                    >
                        {t("cta")}
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
};
