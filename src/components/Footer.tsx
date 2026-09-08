import Link from "next/link"
import Image from "next/image"
import { address, hours, phone, ALL_NAV_ITEMS, PROGRAMS } from "@/components/constants"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"

export const Footer = () => (
    <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-20">
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
                <div>
                    <p className="mb-5 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Меню</p>
                    <div className="flex flex-col gap-3">
                        {ALL_NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-[13.5px] font-medium text-foreground-muted transition-colors duration-200 hover:text-accent-light"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/vacancy"
                            className="text-[13.5px] font-medium text-foreground-muted transition-colors duration-200 hover:text-accent-light"
                        >
                            Вакансии
                        </Link>
                    </div>
                </div>

                <div>
                    <p className="mb-5 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Наши программы</p>
                    <div className="flex flex-col gap-3">
                        {PROGRAMS.map((title) => (
                            <Link
                                key={title}
                                href="/programs"
                                className="text-[13.5px] font-medium text-foreground-muted transition-colors duration-200 hover:text-accent-light"
                            >
                                {title}
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="mb-5 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Контакты</p>
                    <p className="mb-3 text-[15px] font-semibold text-foreground">{phone}</p>
                    <a
                        href="https://wa.me/79374338034"
                        className="mb-4 flex items-center gap-2 text-[13px] font-medium text-foreground-muted transition-colors duration-200 hover:text-foreground"
                    >
                        <WhatsAppIcon className="size-3.5 text-[#25D366]" />
                        WhatsApp
                    </a>
                    <p className="text-[13px] leading-relaxed text-foreground-muted">
                        {hours[0]}
                        <br />
                        {hours[1]}
                    </p>
                    <p className="mt-3 text-[13px] leading-relaxed text-foreground-muted">{address}</p>
                </div>

                <div>
                    <p className="mb-5 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Наш телеграм-канал</p>
                    <p className="mb-5 max-w-55 text-[13.5px] leading-relaxed text-foreground-muted">
                        Самые свежие новости и эксклюзивный контент
                    </p>
                    <a
                        href="https://t.me/happy_end_guest_1"
                        className="mb-6 inline-flex w-fit rounded-full bg-accent px-6 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
                    >
                        Подписаться
                    </a>

                    <p className="mb-3 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Принимаем к оплате</p>
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
                </div>
            </div>

            <div className="mt-14 h-px bg-border" />

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2.5">
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
                    <Link href="/" className="transition-colors duration-200 hover:text-foreground">
                        Политика конфиденциальности
                    </Link>
                </div>
            </div>
        </div>
    </footer>
);
