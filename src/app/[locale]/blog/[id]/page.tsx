import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { pick } from "@/lib/i18n-content";
import { BLOG_POSTS } from "@/lib/blog";
import { Profile } from "@/pages/BlogProfile/Profile";
import { RelatedPosts } from "@/pages/BlogProfile/RelatedPosts";

export function generateStaticParams() {
    return BLOG_POSTS.map((_, i) => ({ id: String(i) }));
}

export default async function BlogProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const index = Number(id);
    const post = BLOG_POSTS[index];

    if (!Number.isInteger(index) || !post) notFound();

    const locale = await getLocale();

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current={pick(post.title, locale)} />
                <Profile post={post} />
                <RelatedPosts currentIndex={index} />
            </main>
            <Footer />
        </>
    )
};
