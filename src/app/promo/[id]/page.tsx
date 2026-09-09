import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PROMOS } from "@/lib/promo";
import { Profile } from "@/pages/PromoProfile/Profile";
import { RelatedPromos } from "@/pages/PromoProfile/RelatedPromos";

export function generateStaticParams() {
    return PROMOS.map((_, i) => ({ id: String(i) }));
}

export default async function PromoProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const index = Number(id);
    const promo = PROMOS[index];

    if (!Number.isInteger(index) || !promo) notFound();

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current={promo.name} />
                <Profile promo={promo} />
                <RelatedPromos currentIndex={index} />
            </main>
            <Footer />
        </>
    )
};
