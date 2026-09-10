import { getLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NAV_LABELS } from "@/components/constants";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { pick } from "@/lib/i18n-content";
import { AboutStaff } from "@/pages/Staff/AboutStaff";
import { Banner } from "@/pages/Staff/Banner";
import { Staff } from "@/pages/Staff/Staff";

export default async function StaffPage() {
    const locale = await getLocale();

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current={pick(NAV_LABELS.staff, locale)} />
                <Staff />
                <Banner />
                <AboutStaff />
            </main>
            <Footer />
        </>
    )
};
