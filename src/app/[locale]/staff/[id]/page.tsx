import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { pick } from "@/lib/i18n-content";
import { STAFF } from "@/lib/staff";
import { Profile } from "@/pages/StaffProfile/Profile";
import { RecommendedPrograms } from "@/pages/StaffProfile/RecommendedPrograms";
import { RelatedStaff } from "@/pages/StaffProfile/RelatedStaff";

export function generateStaticParams() {
    return STAFF.map((_, i) => ({ id: String(i) }));
}

export default async function StaffProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const index = Number(id);
    const member = STAFF[index];

    if (!Number.isInteger(index) || !member) notFound();

    const locale = await getLocale();

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current={pick(member.name, locale)} />
                <Profile member={member} />
                <RecommendedPrograms />
                <RelatedStaff currentIndex={index} />
            </main>
            <Footer />
        </>
    )
};
