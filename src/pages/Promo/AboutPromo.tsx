import { Check } from "lucide-react"
import { CHECKLIST } from "./constants"

export const AboutPromo = () => (
    <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
        <h2
            className="mb-10 max-w-165 text-[28px] leading-tight font-medium text-foreground sm:text-[32px] md:mb-14 md:text-[36px]"
            style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
        >
            Акции в салоне эротического массажа <em className="text-accent-light">PODIUM</em>
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
                <p className="mb-6 text-[14.5px] leading-relaxed text-foreground-muted">
                    Куда же без выгодных предложений? В салоне эротического массажа Podium есть немало акций, которые позволят не только сэкономить деньги, но и получить интересные подарки. С таким подходом отдых будет в разы приятнее!
                </p>

                <div className="flex flex-col gap-3.5">
                    {CHECKLIST.map((text) => (
                        <div key={text} className="flex items-baseline gap-3.5">
                            <Check className="relative top-0.5 size-4 shrink-0 text-accent-light" strokeWidth={2.5} />
                            <span className="text-[13.5px] text-foreground">{text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <p className="text-[14.5px] leading-relaxed text-foreground-muted">
                    Если вы хотите получить доступный отдых премиального уровня, Podium — отличная возможность для реализации этой мечты! Заходите к нам и наслаждайтесь профессиональным массажем!
                </p>
                <p className="text-[14.5px] leading-relaxed text-foreground-muted">
                    Многие мужчины считают, что качественный отдых доступен далеко не всем. Наш салон эротического массажа хочет разрушить этот стереотип и доказать: хороший досуг может получить каждый, важно — знать, куда идти. И в этом вы можете убедиться лично, посетив наш салон!
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-foreground-faint italic">
                    Салон не предоставляет услуги интимного характера!
                </p>
            </div>
        </div>
    </section>
);
