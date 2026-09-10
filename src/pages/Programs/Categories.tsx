import { getLocale, getTranslations } from "next-intl/server"
import Image from "next/image"
import { pick } from "@/lib/i18n-content"
import { CATEGORIES } from "./constants";

export const Categories = async () => {
    const t = await getTranslations("programsCategories")
    const locale = await getLocale()

    return (
    <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
        <h2
            className="mb-9 text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
            style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
        >
            {t("title")}
        </h2>
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map(({ name, bio, photo }, i) => (
                <div key={i} className="flex flex-col gap-4">
                    <div className="relative aspect-square w-full overflow-hidden rounded-sm">
                        <Image
                            src={photo}
                            alt={pick(name, locale)}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="text-[19px] font-semibold text-foreground">{pick(name, locale)}</p>
                        <p className="text-[14px] leading-relaxed text-foreground-muted">{pick(bio, locale)}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
    )
};
