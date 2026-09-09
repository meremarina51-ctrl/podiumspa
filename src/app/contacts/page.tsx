import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Info } from "@/pages/Contacts/Info";

export default async function ContactsPage() {
    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current="Контакты" />
                <Info />
            </main>
            <Footer />
        </>
    )
};
