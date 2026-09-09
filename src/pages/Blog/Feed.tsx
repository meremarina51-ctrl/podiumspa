import Image from "next/image"
import Link from "next/link"
import { BLOG_POSTS } from "@/lib/blog"

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })

export const Feed = () => (
    <section className="mx-auto w-full max-w-340 px-6 pb-16 md:px-14 md:pb-24">
        <div className="mb-12 text-center">
            <h1
                className="text-[38px] leading-none font-medium text-foreground sm:text-[44px] md:text-[52px]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
                Блог
            </h1>
            <p className="mt-3 text-[14.5px] text-foreground-muted">Статьи о массаже, отдыхе и жизни салона</p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post, index) => (
                <Link key={post.title} href={`/blog/${index}`} className="group block">
                    <div className="relative aspect-4/5 overflow-hidden rounded-sm">
                        <Image
                            src={post.photo}
                            alt={post.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent" />
                        <span className="absolute top-4 left-4 w-fit rounded-full border border-accent/50 bg-background/40 px-3 py-1 text-[10px] font-semibold tracking-widest text-accent-light uppercase backdrop-blur-sm">
                            {post.category}
                        </span>
                    </div>
                    <p
                        className="mt-4 text-[20px] leading-tight font-medium text-foreground transition-colors duration-200 group-hover:text-accent-light"
                        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                    >
                        {post.title}
                    </p>
                    <p className="mt-1.5 text-[11.5px] font-semibold tracking-[0.08em] text-foreground-faint uppercase">
                        {formatDate(post.date)}
                    </p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-foreground-muted">
                        {post.excerpt}
                    </p>
                </Link>
            ))}
        </div>
    </section>
)
