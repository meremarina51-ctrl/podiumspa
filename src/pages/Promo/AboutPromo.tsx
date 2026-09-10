import { Check } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"
import { pick } from "@/lib/i18n-content"
import { CHECKLIST } from "./constants"

export const AboutPromo = async () => {
    const t = await getTranslations("promoAbout")
    const tCommon = await getTranslations("common")
    const locale = await getLocale()

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <h2
                className="mb-10 max-w-165 text-[28px] leading-tight font-medium text-foreground sm:text-[32px] md:mb-14 md:text-[36px]"
                style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
            >
                {t("titleStart")} <em className="text-accent-light">{t("titleAccent")}</em> {t("titleEnd")}
            </h2>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                <div>
                    <p className="mb-6 text-[14.5px] leading-relaxed text-foreground-muted">
                        {t("paragraph1")}
                    </p>

                    <div className="flex flex-col gap-3.5">
                        {CHECKLIST.map((item, i) => (
                            <div key={i} className="flex items-baseline gap-3.5">
                                <Check className="relative top-0.5 size-4 shrink-0 text-accent-light" strokeWidth={2.5} />
                                <span className="text-[13.5px] text-foreground">{pick(item, locale)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <p className="text-[14.5px] leading-relaxed text-foreground-muted">
                        {t("paragraph2")}
                    </p>
                    <p className="text-[14.5px] leading-relaxed text-foreground-muted">
                        {t("paragraph3")}
                    </p>
                    <p className="mt-2 text-[12px] leading-relaxed text-foreground-faint italic">
                        {tCommon("disclaimer")}
                    </p>
                </div>
            </div>
        </section>
    )
};
