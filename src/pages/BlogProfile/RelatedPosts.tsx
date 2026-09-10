"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { useRef } from "react"
import { pick } from "@/lib/i18n-content"
import { BLOG_POSTS } from "@/lib/blog"
import { formatDate } from "@/lib/formatDate"
import { RELATED_COUNT } from "./constants"
import { ROUTES } from "@/lib/routes"

interface IProps {
    currentIndex: number
}

export const RelatedPosts = ({ currentIndex }: IProps) => {
    const t = useTranslations("relatedPosts")
    const tCommon = useTranslations("common")
    const locale = useLocale()
    const scrollRef = useRef<HTMLDivElement>(null)

    const count = Math.min(RELATED_COUNT, BLOG_POSTS.length - 1)
    const related = Array.from({ length: count }, (_, i) => {
        const index = (currentIndex + 1 + i) % BLOG_POSTS.length
        return { ...BLOG_POSTS[index], index }
    })

    const scrollBy = (direction: 1 | -1) => scrollRef.current?.scrollBy({ left: direction * 280, behavior: "smooth" })

    if (!related.length) return null

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
                    href={ROUTES.BLOG}
                    className="border-b border-accent-wash-strong pb-1 text-[12.5px] font-semibold tracking-[0.08em] text-accent-light uppercase transition-colors duration-200 hover:text-foreground"
                >
                    {tCommon("viewAll")}
                </Link>
            </div>

            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-2 scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
                >
                    {related.map((post) => (
                        <Link key={post.index} href={`${ROUTES.BLOG}/${post.index}`} className="group block w-52 shrink-0 sm:w-60">
                            <div className="relative aspect-4/5 overflow-hidden rounded-sm">
                                <Image
                                    src={post.photo}
                                    alt={pick(post.title, locale)}
                                    fill
                                    sizes="(min-width: 640px) 240px, 208px"
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent" />
                                <span className="absolute top-3 left-3 w-fit rounded-full border border-accent/50 bg-background/40 px-2.5 py-1 text-[9.5px] font-semibold tracking-widest text-accent-light uppercase backdrop-blur-sm">
                                    {pick(post.category, locale)}
                                </span>
                            </div>
                            <p
                                className="mt-4 text-[18px] leading-tight font-medium text-foreground transition-colors duration-200 group-hover:text-accent-light"
                                style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                            >
                                {pick(post.title, locale)}
                            </p>
                            <p className="mt-1.5 text-[11.5px] font-semibold tracking-[0.08em] text-foreground-faint uppercase">
                                {formatDate(post.date, locale)}
                            </p>
                        </Link>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => scrollBy(-1)}
                    aria-label={tCommon("carouselBack")}
                    className="absolute top-[32%] -left-4 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background text-foreground shadow-lg transition-colors duration-200 hover:border-foreground/40 lg:flex"
                >
                    <ArrowLeft className="size-4" />
                </button>
                <button
                    type="button"
                    onClick={() => scrollBy(1)}
                    aria-label={tCommon("carouselNext")}
                    className="absolute top-[32%] -right-4 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-accent/50 bg-background text-foreground shadow-lg transition-colors duration-200 hover:border-accent lg:flex"
                >
                    <ArrowRight className="size-4" />
                </button>
            </div>
        </section>
    )
};
