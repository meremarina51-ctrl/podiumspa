import { getLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NAV_LABELS } from "@/components/constants";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { pick } from "@/lib/i18n-content";
import { AboutBlog } from "@/pages/Blog/AboutBlog";
import { Feed } from "@/pages/Blog/Feed";
import { PopularCarousel } from "@/pages/Blog/PopularCarousel";

export default async function BlogPage() {
    const locale = await getLocale();

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current={pick(NAV_LABELS.blog, locale)} />
                <PopularCarousel />
                <Feed />
                <AboutBlog />
            </main>
            <Footer />
        </>
    )
};
