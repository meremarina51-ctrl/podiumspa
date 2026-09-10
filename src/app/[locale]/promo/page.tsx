import { getLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NAV_LABELS } from "@/components/constants";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { pick } from "@/lib/i18n-content";
import { Promo as PromoBanner } from "@/components/Promo";
import { AboutPromo } from "@/pages/Promo/AboutPromo";
import { Catalog } from "@/pages/Promo/Catalog";

export default async function PromoPage() {
    const locale = await getLocale();

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current={pick(NAV_LABELS.promo, locale)} />
                <PromoBanner variant="page" />
                <Catalog />
                <AboutPromo />
            </main>
            <Footer />
        </>
    )
};
