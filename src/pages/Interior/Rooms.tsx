"use client"

import Image from "next/image"
import { useState } from "react"
import { OrderModal } from "@/components/OrderModal"
import { ROOMS } from "./constants"

export const Rooms = () => {
    const [openRoom, setOpenRoom] = useState<string | null>(null)

    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <div className="mb-12 text-center">
                <h1
                    className="text-[38px] leading-none font-medium text-foreground sm:text-[44px] md:text-[52px]"
                    style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                >
                    Интерьер
                </h1>
                <p className="mt-3 text-[14.5px] text-foreground-muted">Апартаменты VIP-класса в самом центре Москвы</p>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {ROOMS.map(({ name, bio, photo }) => (
                    <div key={name} className="flex flex-col gap-4">
                        <div className="relative aspect-square w-full overflow-hidden rounded-sm">
                            <Image
                                src={photo}
                                alt={name}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                            <p
                                className="text-[22px] leading-none font-medium text-foreground"
                                style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                            >
                                {name}
                            </p>
                            <p className="text-[14px] leading-relaxed text-foreground-muted">{bio}</p>
                            <button
                                type="button"
                                onClick={() => setOpenRoom(name)}
                                className="mt-auto inline-flex w-fit items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
                            >
                                Заказать
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <OrderModal title={openRoom ?? ""} open={openRoom !== null} onClose={() => setOpenRoom(null)} />
        </section>
    )
};
