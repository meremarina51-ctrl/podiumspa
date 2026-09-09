import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AboutBlog } from "@/pages/Blog/AboutBlog";
import { Feed } from "@/pages/Blog/Feed";
import { PopularCarousel } from "@/pages/Blog/PopularCarousel";

export default async function BlogPage() {
    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current="Блог" />
                <PopularCarousel />
                <Feed />
                <AboutBlog />
            </main>
            <Footer />
        </>
    )
};
