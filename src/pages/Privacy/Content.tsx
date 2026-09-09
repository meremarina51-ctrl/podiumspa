import Link from "next/link"
import { SECTIONS } from "./constants";

export const Content = () => (
    <section className="mx-auto w-full max-w-220 px-6 py-14 md:px-14 md:py-20">
        <h1
            className="mb-12 text-[38px] leading-none font-medium text-foreground sm:text-[44px] md:text-[52px]"
            style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
        >
            Политика <em className="text-accent-light">конфиденциальности</em>
        </h1>

        <div className="flex flex-col gap-10">
            {SECTIONS.map((section) => (
                <div key={section.title} className="border-t border-border pt-8">
                    <h2
                        className="mb-4 text-[22px] leading-none font-medium text-foreground"
                        style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
                    >
                        {section.title}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {section.paragraphs.map((paragraph, i) => (
                            <p key={i} className="text-[14.5px] leading-relaxed text-foreground-muted">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <Link
            href="/"
            className="mt-14 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
        >
            На главную
        </Link>
    </section>
);
