import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Feed } from "@/pages/Blog/Feed";

export default async function BlogPage() {
    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current="Блог" />
                <Feed />
            </main>
            <Footer />
        </>
    )
};
