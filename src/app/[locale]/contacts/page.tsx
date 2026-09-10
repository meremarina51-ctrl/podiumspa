import { getLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NAV_LABELS } from "@/components/constants";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { pick } from "@/lib/i18n-content";
import { Info } from "@/pages/Contacts/Info";

export default async function ContactsPage() {
    const locale = await getLocale();

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current={pick(NAV_LABELS.contacts, locale)} />
                <Info />
            </main>
            <Footer />
        </>
    )
};
