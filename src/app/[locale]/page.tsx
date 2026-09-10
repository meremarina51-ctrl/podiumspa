import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Promo } from "@/components/Promo";
import { About } from "@/pages/Home/About";
import { Advantages } from "@/pages/Home/Advantages";
import { Contacts } from "@/pages/Home/Contacts";
import { Hero } from "@/pages/Home/Hero";
import { Interior } from "@/pages/Home/Interior";
import { Programms } from "@/pages/Home/Programms";
import { Quiz } from "@/pages/Home/Quiz";
import { Specialists } from "@/pages/Home/Specialists";
import { TelegramBanner } from "@/pages/Home/TelegramBanner";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Specialists />
        <Quiz />
        <Programms />
        <Advantages />
        <Promo />
        <About />
        <Interior />
        <TelegramBanner />
        <Contacts />
      </main>
      <Footer />
    </>
  );
};
