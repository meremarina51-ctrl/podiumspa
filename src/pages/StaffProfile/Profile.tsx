"use client"

import { Cake, Heart, Ruler, Weight } from "lucide-react"
import { useState } from "react"
import { OrderModal } from "@/components/OrderModal"
import { phone } from "@/components/constants"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import type { StaffMember } from "@/lib/staff"
import { WHATSAPP_HREF } from "@/pages/Home/constants"
import { Gallery } from "./Gallery"

interface IProps {
    member: StaffMember
}

export const Profile = ({ member }: IProps) => {
    const [isOrderOpen, setOrderOpen] = useState(false)

    const stats = [
        { label: "Возраст", value: member.age ? `${member.age} лет` : null, icon: Cake },
        { label: "Рост", value: member.height ? `${member.height} см` : null, icon: Ruler },
        { label: "Вес", value: member.weight ? `${member.weight} кг` : null, icon: Weight },
        { label: "Грудь", value: member.bust || null, icon: Heart },
    ].filter((stat): stat is { label: string; value: string; icon: typeof Cake } => Boolean(stat.value))

    return (
        <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent opacity-15 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent opacity-10 blur-[100px]" />

            <div className="relative mx-auto w-full max-w-340 px-6 py-10 md:px-14">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[440px_1fr]">
                    <Gallery photos={member.photos} name={member.name} />

                    <div>
                        <span className="mb-3 block text-[11px] font-semibold tracking-[0.15em] text-accent-light uppercase">
                            Анкета модели
                        </span>
                        <h1
                            className="text-[40px] leading-none font-medium text-foreground sm:text-[48px]"
                            style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                        >
                            {member.name}
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
                            className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
                        >
                            Записаться
                        </button>

                        <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
                            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="text-[15px] font-bold text-foreground">
                                {phone}
                            </a>
                            <a
                                href={WHATSAPP_HREF}
                                aria-label="Написать в WhatsApp"
                                className="flex size-8 items-center justify-center rounded-full bg-[#25D366]/15 transition-opacity duration-200 hover:opacity-80"
                            >
                                <WhatsAppIcon className="size-4 text-[#25D366]" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <OrderModal title={member.name} open={isOrderOpen} onClose={() => setOrderOpen(false)} />
        </section>
    )
};
