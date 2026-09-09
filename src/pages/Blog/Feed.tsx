"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { BLOG_POSTS, CATEGORIES } from "@/lib/blog"
import { formatDate } from "@/lib/formatDate"
import { truncate } from "@/lib/truncate"

export const Feed = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    const posts = useMemo(() => BLOG_POSTS.filter((blog) => !blog.popular).map((post, index) => ({ ...post, index })), [])
    const featured = posts[0]

    const filtered = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts

    return (
        <section className="mx-auto w-full max-w-340 px-6 pb-16 md:px-14 md:pb-24">
            <Link href={`/blog/${featured.index}`} className="group mb-14 block sm:mb-16">
                <div className="grid grid-cols-1 overflow-hidden rounded-sm border border-border lg:grid-cols-2">
                    <div className="relative aspect-4/3 lg:aspect-auto">
                        <Image
                            src={featured.photo}
                            alt={featured.title}
                            fill
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            priority
                        />
                    </div>
                    <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                        <span className="mb-3 w-fit rounded-full border border-accent/50 bg-accent-wash px-3 py-1 text-[10px] font-semibold tracking-widest text-accent-light uppercase">
                            {featured.category}
                        </span>
                        <h1
                            className="mb-4 text-[28px] leading-tight font-medium text-foreground transition-colors duration-200 group-hover:text-accent-light sm:text-[34px]"
                            style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                        >
                            {featured.title}
                        </h1>
                        <p className="mb-6 max-w-125 text-[14px] leading-relaxed text-foreground-muted">
                            {featured.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-5">
                            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 group-hover:bg-accent-dark">
                                Читать полностью
                                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </span>
                            <span className="text-[11.5px] font-semibold tracking-[0.08em] text-foreground-faint uppercase">
                                {formatDate(featured.date)}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
                <div className="flex flex-col gap-10">
                    {!filtered.length ? (
                        <p className="py-10 text-center text-[14.5px] text-foreground-muted">
                            В этой категории пока нет статей.
                        </p>
                    ) : (
                        filtered.map((post) => (
                            <Link
                                key={post.title}
                                href={`/blog/${post.index}`}
                                className="group flex flex-col gap-5 border-b border-border pb-10 last:border-b-0 last:pb-0 sm:flex-row"
                            >
                                <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-sm sm:w-56">
                                    <Image
                                        src={post.photo}
                                        alt={post.title}
                                        fill
                                        sizes="(min-width: 640px) 224px, 100vw"
                                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="mb-2 w-fit text-[10.5px] font-semibold tracking-widest text-accent-light uppercase">
                                        {post.category}
                                    </span>
                                    <p
                                        className="mb-2 text-[21px] leading-tight font-medium text-foreground transition-colors duration-200 group-hover:text-accent-light"
                                        style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                                    >
                                        {post.title}
                                    </p>
                                    <p className="mb-3 text-[13.5px] leading-relaxed text-foreground-muted">
                                        {truncate(post.excerpt, 150)}
                                    </p>
                                    <span className="mt-auto text-[11.5px] font-semibold tracking-[0.08em] text-foreground-faint uppercase">
                                        {formatDate(post.date)}
                                    </span>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                <aside className="flex flex-col gap-8">
                    <div className="rounded-sm border border-border p-6">
                        <p className="mb-4 text-[11px] font-semibold tracking-widest text-foreground-faint uppercase">Категории</p>
                        <div className="flex flex-col gap-1">
                            <button
                                type="button"
                                onClick={() => setActiveCategory(null)}
                                className={`rounded-sm px-3 py-2 text-left text-[13.5px] font-medium transition-colors duration-200 ${activeCategory === null
                                    ? "bg-accent-wash text-accent-light"
                                    : "text-foreground-muted hover:bg-foreground/5 hover:text-foreground"
                                    }`}
                            >
                                Все
                            </button>
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setActiveCategory(category)}
                                    className={`rounded-sm px-3 py-2 text-left text-[13.5px] font-medium transition-colors duration-200 ${activeCategory === category
                                        ? "bg-accent-wash text-accent-light"
                                        : "text-foreground-muted hover:bg-foreground/5 hover:text-foreground"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    )
};
