"use client"

import { Cake, Heart, Ruler, Weight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"
import { OrderModal } from "@/components/OrderModal"
import { phone } from "@/components/constants"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { pick } from "@/lib/i18n-content"
import type { StaffMember } from "@/lib/staff"
import { Gallery } from "./Gallery"
import { WHATSAPP_HREF } from "@/lib/constants"

interface IProps {
    member: StaffMember
}

export const Profile = ({ member }: IProps) => {
    const t = useTranslations("staffProfile");
    const tCommon = useTranslations("common");
    const locale = useLocale();
    const name = pick(member.name, locale);

    const [isOrderOpen, setOrderOpen] = useState(false);

    const stats = [
        { label: t("age"), value: member.age ? t("ageValue", { n: member.age }) : null, icon: Cake },
        { label: t("height"), value: member.height ? t("heightValue", { n: member.height }) : null, icon: Ruler },
        { label: t("weight"), value: member.weight ? t("weightValue", { n: member.weight }) : null, icon: Weight },
        { label: t("bust"), value: member.bust || null, icon: Heart },
    ].filter((stat): stat is { label: string; value: string; icon: typeof Cake } => Boolean(stat.value));

    return (
        <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent opacity-15 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent opacity-10 blur-[100px]" />

            <div className="relative mx-auto w-full max-w-340 px-6 py-10 md:px-14">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[440px_1fr]">
                    <Gallery photos={member.photos} name={name} />

                    <div>
                        <span className="mb-3 block text-[11px] font-semibold tracking-[0.15em] text-accent-light uppercase">
                            {t("eyebrow")}
                        </span>
                        <h1
                            className="text-[40px] leading-none font-medium text-foreground sm:text-[48px]"
                            style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                        >
                            {name}
                        </h1>

                        <div className="mt-7 grid grid-cols-2 gap-3">
                            {stats.map((stat) => {
                                const Icon = stat.icon
                                return (
                                    <div key={stat.label} className="rounded-sm border border-border p-4">
                                        <div className="mb-3 flex size-8 items-center justify-center rounded-full bg-accent-wash text-accent-light">
                                            <Icon className="size-4" />
                                        </div>
                                        <p className="text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">
                                            {stat.label}
                                        </p>
                                        <p className="mt-1 text-[17px] font-semibold text-foreground">{stat.value}</p>
                                    </div>
                                )
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={() => setOrderOpen(true)}
                            className="mt-7 cursor-pointer inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
                        >
                            {tCommon("bookCta")}
                        </button>

                        <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
                            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="text-[15px] font-bold text-foreground">
                                {phone}
                            </a>
                            <a
                                href={WHATSAPP_HREF}
                                aria-label={tCommon("writeWhatsapp")}
                                className="flex size-8 items-center justify-center rounded-full bg-[#25D366]/15 transition-opacity duration-200 hover:opacity-80"
                            >
                                <WhatsAppIcon className="size-4 text-[#25D366]" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <OrderModal title={name} open={isOrderOpen} onClose={() => setOrderOpen(false)} />
        </section>
    )
};
