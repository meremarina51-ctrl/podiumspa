import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AboutPrograms } from "@/pages/Programs/AboutPrograms";
import { Categories } from "@/pages/Programs/Categories";
import { Banner } from "@/pages/Programs/Banner";
import { Programms } from "@/pages/Programs/Programms";
import { Services } from "@/pages/Programs/Services";

export default async function Programs() {
    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current="Программы" />
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
