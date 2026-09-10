import { getLocale, getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { pick } from "@/lib/i18n-content"
import { SECTIONS } from "./constants";
import { ROUTES } from "@/lib/routes";

export const Content = async () => {
    const t = await getTranslations("privacyPage")
    const locale = await getLocale()

    return (
        <section className="mx-auto w-full max-w-220 px-6 py-14 md:px-14 md:py-20">
            <h1
                className="mb-12 text-[38px] leading-none font-medium text-foreground sm:text-[44px] md:text-[52px]"
                style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
            >
                {t("titleStart")} <em className="text-accent-light">{t("titleAccent")}</em>
            </h1>

            <div className="flex flex-col gap-10">
                {SECTIONS.map((section, i) => (
                    <div key={i} className="border-t border-border pt-8">
                        <h2
                            className="mb-4 text-[22px] leading-none font-medium text-foreground"
                            style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                        >
                            {pick(section.title, locale)}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {section.paragraphs.map((paragraph, j) => (
                                <p key={j} className="text-[14.5px] leading-relaxed text-foreground-muted">
                                    {pick(paragraph, locale)}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Link
                href={ROUTES.HOME}
                className="mt-14 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
            >
                {t("backHome")}
            </Link>
        </section>
    )
};
