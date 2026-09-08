"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { address, ALL_NAV_ITEMS, hours, LEFT_NAV_ITEMS, phone, RIGHT_NAV_ITEMS } from "@/components/constants"

const navLinkClass = (active: boolean) =>
    `text-[13.5px] font-medium transition-colors duration-200 ease-out ${active ? "text-accent-light" : "text-foreground/62 hover:text-accent-light"
    }`;

export const Header = () => {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!open) return

        document.body.style.overflow = "hidden"
        
        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    return (
        <>
            <header className="sticky top-0 z-50 flex w-full flex-col bg-background/95 backdrop-blur-sm">
                <div className="border-b border-border bg-surface-2 max-lg:hidden">
                    <div className="mx-auto flex h-9.5 w-full max-w-340 items-center justify-between px-14 text-xs text-foreground-faint">
                        <span>{hours.join(", ")}</span>
                        <span className="flex items-center gap-2">
                            {address}
                            <span className="inline-block h-1 w-1 rounded-full bg-foreground-faint" />
                            {phone}
                        </span>
                    </div>
                </div>

                <div className="border-b border-border">
                    <div className="mx-auto grid h-18 w-full max-w-340 grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 md:h-26 md:px-14">
                        <nav className="col-start-1 hidden items-center gap-7.5 lg:flex">
                            {LEFT_NAV_ITEMS.map((item) => (
                                <Link key={item.name} href={item.href} className={navLinkClass(pathname === item.href)}>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <Link href="/" className="group col-start-2 flex items-center gap-2.5 whitespace-nowrap justify-self-start lg:justify-self-auto">
                            <span
                                className="h-3 w-3 shrink-0 rotate-45 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-225"
                                style={{ background: "linear-gradient(135deg, var(--accent-light), var(--accent))" }}
                            />
                            <span className="text-[24px] font-bold tracking-[0.07em] text-foreground transition-colors duration-200 ease-out group-hover:text-accent-light">
                                PODIUM
                            </span>
                        </Link>
                            
                        <div className="col-start-3 flex items-center justify-end gap-7.5">
                            <nav className="hidden items-center gap-7.5 lg:flex">
                                {RIGHT_NAV_ITEMS.map((item) => (
                                    <Link key={item.name} href={item.href} className={navLinkClass(pathname === item.href)}>
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>

                            <Link
                                href="/contacts"
                                className="hidden shrink-0 rounded-full border px-6 py-2.5 text-[13.5px] font-semibold tracking-[0.03em] text-foreground transition-colors hover:bg-accent-wash sm:inline-flex"
                                style={{ borderColor: "rgba(214,38,111,0.5)" }}
                            >
                                Записаться
                            </Link>

                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                aria-label="Открыть меню"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors duration-200 hover:border-foreground/30 lg:hidden"
                            >
                                <Menu className="size-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div
                onClick={() => setOpen(false)}
                aria-hidden="true"
                className={`fixed inset-0 z-60 bg-background/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
            />

            <aside
                className={`fixed top-0 right-0 z-70 flex h-dvh w-full flex-col border-l border-border bg-surface p-6 shadow-2xl shadow-black/40 transition-transform duration-300 ease-out sm:max-w-80 lg:hidden ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="mb-8 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wide text-foreground-faint uppercase">Меню</span>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Закрыть меню"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors duration-200 hover:border-foreground/30"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <nav>
                    <ul className="flex flex-col gap-1">
                        {ALL_NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`block rounded-lg px-3 py-3 text-base font-semibold transition-colors duration-200 ${pathname === item.href
                                        ? "bg-accent-wash text-accent-light"
                                        : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="mt-auto flex flex-col gap-4 border-t border-border pt-6">
                    <Link
                        href="/contacts"
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold tracking-[0.03em] text-white transition-colors duration-200 hover:bg-accent-dark"
                    >
                        Записаться
                    </Link>
                    <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="text-base font-bold text-foreground">
                        {phone}
                    </a>
                    <p className="text-xs leading-relaxed text-foreground-faint">{address}</p>
                </div>
            </aside>
        </>
    )
};
