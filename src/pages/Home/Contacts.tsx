import { Mail } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { address, hours, phone } from "@/components/constants"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { YandexMap } from "@/components/YandexMap"
import { pick } from "@/lib/i18n-content"
import { EMAIL, WHATSAPP_HREF } from "@/lib/constants"
import { ROUTES } from "@/lib/routes"

export const Contacts = async () => {
    const locale = await getLocale()
    const t = await getTranslations("homeContacts")
    const tCommon = await getTranslations("common")

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <h2
                className="mb-12 text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:mb-14 md:text-[44px]"
                style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
            >
                {t("title")}
            </h2>

            <div className="grid grid-cols-1 gap-10 border-b border-border pb-10 sm:grid-cols-2 lg:grid-cols-[1fr_1.1fr_0.85fr_1fr_auto] lg:items-start lg:gap-8">
                <div>
                    <p className="mb-3.5 text-base font-semibold text-foreground">{phone}</p>
                    <div className="flex flex-col gap-2">
                        <a
                            href={WHATSAPP_HREF}
                            className="flex items-center gap-2 text-[13px] font-medium text-foreground-muted transition-colors duration-200 hover:text-foreground"
                        >
                            <WhatsAppIcon className="size-3.5 text-[#25D366]" />
                            {tCommon("whatsapp")}
                        </a>
                        <a
                            href={`mailto:${EMAIL}`}
                            className="flex items-center gap-2 text-[13px] font-medium text-foreground-muted transition-colors duration-200 hover:text-foreground"
                        >
                            <Mail className="size-3.5 " />
                            {tCommon("email")}
                        </a>
                    </div>
                </div>

                <div>
                    <p className="mb-3 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">{t("address")}</p>
                    <p className="text-[15px] leading-relaxed text-foreground">{pick(address, locale)}</p>
                </div>

                <div>
                    <p className="mb-3 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">{t("hours")}</p>
                    <p className="text-[15px] text-foreground">{pick(hours[0], locale)}</p>
                    <p className="text-[15px] text-foreground">{pick(hours[1], locale)}</p>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-foreground-faint">
                        {t("bookingNote")}
                    </p>
                </div>

                <div>
                    <p className="mb-3.5 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">{t("acceptedPayments")}</p>
                    <div className="flex gap-2">
                        <span className="flex h-6.5 w-10 items-center justify-center rounded-[5px] bg-foreground p-1.5">
                            <Image src="/icons/ruble_icon.svg" alt="МИР" width={28} height={16} className="h-full w-auto object-contain" />
                        </span>
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
                </div>

                <div className="flex items-start">
                    <Link
                        href={ROUTES.CONTACTS}
                        className="inline-flex items-center justify-center rounded-full border border-border px-8 py-4 text-[13.5px] font-semibold tracking-[0.03em] text-foreground transition-colors duration-200 hover:border-accent-light hover:text-accent-light"
                    >
                        {t("allContacts")}
                    </Link>
                </div>
            </div>

            <div className="relative mt-10 h-80 w-full overflow-hidden rounded-sm sm:h-95">
                <YandexMap />
                <div className="pointer-events-none absolute inset-0 bg-[rgba(10,5,9,0.35)] mix-blend-multiply" />
            </div>
        </section>
    )
};
