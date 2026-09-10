import { getLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NAV_LABELS } from "@/components/constants";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { pick } from "@/lib/i18n-content";
import { AboutPrograms } from "@/pages/Programs/AboutPrograms";
import { Categories } from "@/pages/Programs/Categories";
import { Banner } from "@/pages/Programs/Banner";
import { Programms } from "@/pages/Programs/Programms";
import { Services } from "@/pages/Programs/Services";

export default async function ProgramsPage() {
    const locale = await getLocale();

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current={pick(NAV_LABELS.programs, locale)} />
                <Categories />
                <Services />
                <Programms />
                <Banner />
                <AboutPrograms />
            </main>
            <Footer />
        </>
    )
};
