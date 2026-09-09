import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Content } from "@/pages/Privacy/Content";

export const metadata = {
    title: "Политика конфиденциальности — Podium",
};

export default async function PrivacyPage() {
    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current="Политика конфиденциальности" />
                <Content />
            </main>
            <Footer />
        </>
    )
};
