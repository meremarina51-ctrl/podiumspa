import { getLocale, getTranslations } from "next-intl/server"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { pick } from "@/lib/i18n-content"
import { BLOG_POSTS } from "@/lib/blog"
import { formatDate } from "@/lib/formatDate"
import { ROUTES } from "@/lib/routes"

export const PopularCarousel = async () => {
    const t = await getTranslations("blogPopular")
    const locale = await getLocale()
    const popular = BLOG_POSTS
        .map((post, index) => ({ ...post, index }))
        .filter((post) => post.popular);

    if (!popular.length) return null

    return (
        <section className="mx-auto w-full max-w-340 px-6 pt-10 pb-16 md:px-14 md:pt-14 md:pb-20">
            <h2
                className="mb-8 text-[28px] leading-none font-medium text-foreground sm:text-[32px]"
                style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
            >
                {t("titleStart")} <em className="text-accent-light">{t("titleAccent")}</em>
            </h2>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {popular.map((post) => (
                    <Link key={post.index} href={`${ROUTES.BLOG}/${post.index}`} className="group block">
                        <div className="relative aspect-4/3 overflow-hidden rounded-sm">
                            <Image
                                src={post.photo}
                                alt={pick(post.title, locale)}
                                fill
                                sizes="(min-width: 640px) 33vw, 100vw"
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent" />
                        </div>
                        <p className="mt-4 text-[11.5px] font-semibold tracking-[0.08em] text-foreground-faint uppercase">
                            {formatDate(post.date, locale)}
                        </p>
                        <p
                            className="mt-2 text-[22px] leading-tight font-medium text-foreground transition-colors duration-200 group-hover:text-accent-light"
                            style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                        >
                            {pick(post.title, locale)}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    )
};
