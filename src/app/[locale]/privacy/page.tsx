import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Content } from "@/pages/Privacy/Content";

export async function generateMetadata() {
    const t = await getTranslations("privacyPage");
    return { title: t("metaTitle") };
}

export default async function PrivacyPage() {
    const t = await getTranslations("privacyPage");

    return (
        <>
            <Header />
            <main>
                <Breadcrumbs current={`${t("titleStart")} ${t("titleAccent")}`} />
                <Content />
            </main>
            <Footer />
        </>
    )
};
