import { getLocale, getTranslations } from "next-intl/server"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { address, hours, phone, ALL_NAV_ITEMS, PROGRAMS } from "@/components/constants"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { pick } from "@/lib/i18n-content"
import { ROUTES } from "@/lib/routes"
import { TELEGRAM_HREF, WHATSAPP_HREF } from "@/lib/constants"

export const Footer = async () => {
    const locale = await getLocale()
    const t = await getTranslations("footer")
    const tCommon = await getTranslations("common")

    return (
        <footer className="border-t border-border">
            <div className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-20">
                <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
                    <div>
                        <p className="mb-5 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">{t("menu")}</p>
                        <div className="flex flex-col gap-3">
                            {ALL_NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-[13.5px] font-medium text-foreground-muted transition-colors duration-200 hover:text-accent-light"
                                >
                                    {pick(item.name, locale)}
                                </Link>
                            ))}
                            <Link
                                href={ROUTES.VACANCY}
                                className="text-[13.5px] font-medium text-foreground-muted transition-colors duration-200 hover:text-accent-light"
                            >
                                {t("vacancy")}
                            </Link>
                        </div>
                    </div>

                    <div>
                        <p className="mb-5 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">{t("ourPrograms")}</p>
                        <div className="flex flex-col gap-3">
                            {PROGRAMS.map((title) => (
                                <Link
                                    key={title.ru}
                                    href={ROUTES.PROGRAMS}
                                    className="text-[13.5px] font-medium text-foreground-muted transition-colors duration-200 hover:text-accent-light"
                                >
                                    {pick(title, locale)}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="mb-5 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">{t("contacts")}</p>
                        <p className="mb-3 text-[15px] font-semibold text-foreground">{phone}</p>
                        <a
                            href={WHATSAPP_HREF}
                            className="mb-4 flex items-center gap-2 text-[13px] font-medium text-foreground-muted transition-colors duration-200 hover:text-foreground"
                        >
                            <WhatsAppIcon className="size-3.5 text-[#25D366]" />
                            {tCommon("whatsapp")}
                        </a>
                        <p className="text-[13px] leading-relaxed text-foreground-muted">
                            {pick(hours[0], locale)}
                            <br />
                            {pick(hours[1], locale)}
                        </p>
                        <p className="mt-3 text-[13px] leading-relaxed text-foreground-muted">{pick(address, locale)}</p>
                    </div>

                    <div>
                        <p className="mb-5 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">{t("telegramChannel")}</p>
                        <p className="mb-5 max-w-55 text-[13.5px] leading-relaxed text-foreground-muted">
                            {t("telegramBlurb")}
                        </p>
                        <a
                            href={TELEGRAM_HREF}
                            className="mb-6 inline-flex w-fit rounded-full bg-accent px-6 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
                        >
                            {t("subscribe")}
                        </a>

                        <p className="mb-3 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">{t("acceptedPayments")}</p>
                        <div className="flex gap-2">
                            <span className="flex h-6.5 w-10 items-center justify-center rounded-[5px] bg-foreground p-1.5">
                                <Image src="/icons/mir_icon.svg" alt="МИР" width={28} height={16} className="h-full w-auto object-contain" />
                            </span>
                            <span className="flex h-6.5 w-10 items-center justify-center rounded-[5px] bg-foreground p-1.5">
                                <Image src="/icons/visa_icon.svg" alt="Visa" width={28} height={16} className="h-full w-auto object-contain" />
                            </span>
                            <span className="flex h-6.5 w-10 items-center justify-center rounded-[5px] bg-foreground p-1.5">
                                <Image src="/icons/mastercard_icon.svg" alt="Mastercard" width={28} height={16} className="h-full w-auto object-contain" />
                            </span>
                        </div>

                        <div className="mt-5">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>

                <div className="mt-14 h-px bg-border" />

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link href={ROUTES.HOME} className="flex items-center gap-2.5">
                            <span
                                className="h-2.5 w-2.5 shrink-0 rotate-45"
                                style={{ background: "linear-gradient(135deg, var(--accent-light), var(--accent))" }}
                            />
                            <span className="text-lg font-bold tracking-[0.07em] text-foreground">PODIUM</span>
                        </Link>
                        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-bold text-foreground-faint">18+</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-5 text-xs text-foreground-faint">
                        <span>© {new Date().getFullYear()} PODIUM</span>
                        <Link href={ROUTES.PRIVACY} className="transition-colors duration-200 hover:text-foreground">
                            {t("privacyPolicy")}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
};
