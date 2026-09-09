import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Gallery } from "@/pages/Interior/Gallery";
import { Rooms } from "@/pages/Interior/Rooms";

export default async function InteriorPage() {
    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current="Интерьер" />
                <Rooms />
                <Gallery />
            </main>
            <Footer />
        </>
    )
};
