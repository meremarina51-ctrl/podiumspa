import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Promo as PromoBanner } from "@/components/Promo";
import { AboutPromo } from "@/pages/Promo/AboutPromo";
import { Catalog } from "@/pages/Promo/Catalog";

export default async function PromoPage() {
    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current="Акции" />
                <PromoBanner variant="page" />
                <Catalog />
                <AboutPromo />
            </main>
            <Footer />
        </>
    )
};
