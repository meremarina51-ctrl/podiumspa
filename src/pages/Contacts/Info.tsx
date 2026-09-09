import { Clock, Mail, MapPin, Send } from "lucide-react"
import Image from "next/image"
import { address, hours, phone } from "@/components/constants"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { YandexMap } from "@/components/YandexMap"
import { EMAIL, WHATSAPP_HREF } from "@/pages/Home/constants"

export const Info = () => (
    <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
        <div className="mb-14 text-center">
            <h1
                className="text-[38px] leading-none font-medium text-foreground sm:text-[44px] md:text-[52px]"
                style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
            >
                Контакты
            </h1>
            <p className="mt-3 text-[14.5px] text-foreground-muted">Свяжитесь с нами удобным способом — мы всегда на связи</p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="rounded-sm border border-border p-6">
                        <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-accent-wash text-accent-light">
                            <span className="text-base font-semibold">+7</span>
                        </div>
                        <p className="mb-3.5 text-base font-semibold text-foreground">{phone}</p>
                        <div className="flex flex-col gap-2">
                            <a
                                href={WHATSAPP_HREF}
                                className="flex items-center gap-2 text-[13px] font-medium text-foreground-muted transition-colors duration-200 hover:text-foreground"
                            >
                                <WhatsAppIcon className="size-3.5 text-[#25D366]" />
                                WhatsApp
                            </a>
                            <a
                                href="https://t.me/happy_end_guest_1"
                                className="flex items-center gap-2 text-[13px] font-medium text-foreground-muted transition-colors duration-200 hover:text-foreground"
                            >
                                <Send className="size-3.5 text-[#29A9EA]" />
                                Telegram
                            </a>
                        </div>
                    </div>

                    <div className="rounded-sm border border-border p-6">
                        <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-accent-wash text-accent-light">
                            <Mail className="size-4.5" />
                        </div>
                        <p className="mb-3 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Email</p>
                        <a
                            href={`mailto:${EMAIL}`}
                            className="text-[15px] font-medium text-foreground transition-colors duration-200 hover:text-accent-light"
                        >
                            {EMAIL}
                        </a>
                    </div>

                    <div className="rounded-sm border border-border p-6">
                        <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-accent-wash text-accent-light">
                            <MapPin className="size-4.5" />
                        </div>
                        <p className="mb-3 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Адрес</p>
                        <p className="text-[15px] leading-relaxed text-foreground">{address}</p>
                    </div>

                    <div className="rounded-sm border border-border p-6">
                        <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-accent-wash text-accent-light">
                            <Clock className="size-4.5" />
                        </div>
                        <p className="mb-3 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Часы работы</p>
                        <p className="text-[15px] text-foreground">{hours[0]}</p>
                        <p className="text-[15px] text-foreground">{hours[1]}</p>
                    </div>
                </div>

                <div className="rounded-sm border border-border p-6">
                    <p className="mb-3.5 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Принимаем к оплате</p>
                    <div className="flex gap-2">
                        <span className="flex h-6.5 w-10 items-center justify-center rounded-[5px] bg-foreground p-1.5">
                            <Image src="/icons/ruble_icon.svg" alt="Наличные" width={28} height={16} className="h-full w-auto object-contain" />
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
                    <p className="mt-4 text-[12.5px] leading-relaxed text-foreground-faint">
                        Работаем по записи — звоните заранее, чтобы забронировать удобное время!
                    </p>
                </div>
            </div>

            <div className="relative min-h-80 w-full overflow-hidden rounded-sm lg:min-h-full">
                <YandexMap />
                <div className="pointer-events-none absolute inset-0 bg-[rgba(10,5,9,0.35)] mix-blend-multiply" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(10,5,9,0.55)_0%,transparent_35%)]" />

                <div className="absolute bottom-6 left-6 max-w-70 rounded-sm border border-border bg-background/70 p-5 backdrop-blur-sm">
                    <p className="mb-1.5 text-[11px] font-semibold tracking-widest text-accent-light uppercase">Podium Spa</p>
                    <p className="text-[13.5px] leading-relaxed text-foreground-muted">{address}</p>
                </div>
            </div>
        </div>
    </section>
);
