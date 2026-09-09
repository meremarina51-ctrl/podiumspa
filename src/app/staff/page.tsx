import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AboutStaff } from "@/pages/Staff/AboutStaff";
import { Banner } from "@/pages/Staff/Banner";
import { Staff } from "@/pages/Staff/Staff";

export default async function StaffPage() {
    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current="Девушки" />
                <Staff />
                <Banner />
                <AboutStaff />
            </main>
            <Footer />
        </>
    )
};
