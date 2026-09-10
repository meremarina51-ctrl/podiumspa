import { getLocale, getTranslations } from "next-intl/server";
import { pick } from "@/lib/i18n-content";
import { ADVANTAGES } from "./constants";

export const Advantages = async () => {
    const t = await getTranslations("homeAdvantages")
    const locale = await getLocale()

    return (
    <section className="border-y border-border bg-surface">
        <div className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <div className="mx-auto mb-14 max-w-140 text-center">
                <span className="text-[11.5px] font-semibold tracking-[0.22em] text-accent-light uppercase">{t("eyebrow")}</span>
                <h2
                    className="mt-4 text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                    style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                >
                    {t("titleStart")} <em className="text-accent-light">{t("titleAccent")}</em>
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-x-12 gap-y-13 sm:grid-cols-2 lg:grid-cols-3">
                {ADVANTAGES.map((item, i) => (
                    <div key={i}>
                        <div className="mb-5.5 flex size-13 items-center justify-center rounded-full bg-accent-wash text-accent-light">
                            {item.icon}
                        </div>
                        <p className="text-[14.5px] leading-relaxed text-foreground-muted">{pick(item.text, locale)}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
    )
};
