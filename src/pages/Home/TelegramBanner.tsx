import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const TelegramBanner = () => (
    <section className="mx-auto w-full max-w-340 px-6 pb-16 md:px-14 md:pb-24">
        <div className="relative min-h-70 overflow-hidden rounded-sm">
            <Image
                src="/banner/akcziya2.jpg.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 1280px, 100vw"
                className="object-cover"
            />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(10,5,9,0.95) 0%, rgba(10,5,9,0.75) 45%, rgba(10,5,9,0.25) 100%)",
                }}
            />

            <div className="relative flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14">
                <h3 className="mb-4 max-w-110 text-[26px] leading-tight font-bold text-foreground sm:text-[34px]">
                    Узнавайте о наших новых девушках и акциях первыми
                </h3>
                <p className="mb-7 max-w-100 text-sm text-foreground-muted sm:text-[15px]">
                    Подписывайтесь на наш телеграм-канал и отдыхайте с комфортом!
                </p>
                <Link
                    href="https://t.me/"
                    className="inline-flex w-fit items-center gap-2.5 rounded-full border border-foreground/30 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-foreground/50"
                >
                    Подписаться
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        </div>
    </section>
)
