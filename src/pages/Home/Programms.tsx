import { getLocale, getTranslations } from "next-intl/server";
import { parseTiers } from "@/lib/parseTiers";
import { ALL_PROGRAMMS } from "@/lib/programms"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { pick } from "@/lib/i18n-content"
import { ROUTES } from "@/lib/routes";

export const Programms = async () => {
    const t = await getTranslations("homeProgramms")
    const locale = await getLocale()
    const PROGRAMS = ALL_PROGRAMMS.slice(0, 4).map((program, index) => ({ ...program, tiers: parseTiers(pick(program.price, locale)), index }))

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <h2
                    className="text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                    style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                >
                    {t("titleStart")} <em className="text-accent-light">{t("titleAccent")}</em>
                </h2>
                <Link
                    href={ROUTES.PROGRAMS}
                    className="border-b border-accent-wash-strong pb-1 text-[12.5px] font-semibold tracking-[0.08em] text-accent-light uppercase transition-colors duration-200 hover:text-foreground"
                >
                    {t("viewAll")}
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-8 max-sm:grid-cols-1 lg:grid-cols-4">
                {PROGRAMS.map((program) => (
                    <div key={program.index} className="group">
                        <Link href={`${ROUTES.PROGRAMS}/${program.index}`} className="group block">
                            <div className="relative aspect-4/5 overflow-hidden rounded-sm">
                                <Image
                                    src={program.photo}
                                    alt={pick(program.name, locale)}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                            </div>
                            <p
                                className="mt-4 text-[22px] leading-none font-medium text-foreground transition-colors duration-200 group-hover:text-accent-light"
                                style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                            >
                                {pick(program.name, locale)}
                            </p>
                            <p className="mt-1.5 text-[14px] whitespace-pre-line text-foreground-faint">
                                {pick(program.price, locale)}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="mt-11 flex justify-center">
                <Link
                    href={ROUTES.PROGRAMS}
                    className="inline-flex items-center justify-center rounded-full border border-border px-8 py-4 text-[13.5px] font-semibold tracking-[0.03em] text-foreground transition-colors duration-200 hover:border-accent-light hover:text-accent-light"
                >
                    {t("showMore")}
                </Link>
            </div>
        </section>
    )
};
