import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ALL_PROGRAMMS } from "@/lib/programms";
import { Profile } from "@/pages/ProgramProfile/Profile";
import { RecommendedStaff } from "@/pages/ProgramProfile/RecommendedStaff";
import { RelatedPrograms } from "@/pages/ProgramProfile/RelatedPrograms";

export function generateStaticParams() {
    return ALL_PROGRAMMS.map((_, i) => ({ id: String(i) }));
}

export default async function ProgramProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const index = Number(id);
    const program = ALL_PROGRAMMS[index];

    if (!Number.isInteger(index) || !program) notFound();

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current={program.name} />
                <Profile program={program} />
                <RelatedPrograms currentIndex={index} />
                <RecommendedStaff />
            </main>
            <Footer />
        </>
    )
};
