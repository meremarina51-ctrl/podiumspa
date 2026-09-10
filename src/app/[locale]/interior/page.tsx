import { getLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NAV_LABELS } from "@/components/constants";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { pick } from "@/lib/i18n-content";
import { Gallery } from "@/pages/Interior/Gallery";
import { Rooms } from "@/pages/Interior/Rooms";

export default async function InteriorPage() {
    const locale = await getLocale();

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current={pick(NAV_LABELS.interior, locale)} />
                <Rooms />
                <Gallery />
            </main>
            <Footer />
        </>
    )
};
