import { Check } from "lucide-react"
import { CHECKLIST } from "./constants"

export const AboutStaff = () => (
    <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
        <h2
            className="mb-10 max-w-165 text-[28px] leading-tight font-medium text-foreground sm:text-[32px] md:mb-14 md:text-[36px]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
            Массажистки салона эротического массажа <em className="text-accent-light">PODIUM</em>
        </h2>

         <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
                <p className="mb-6 text-[14.5px] leading-relaxed text-foreground-muted">
                    Наши мастера — наша гордость. Да и гости подтверждают наши слова! Только представьте, как вы проводите время в компании одной или нескольких красоток… А потом она радует вас профессиональным массажем. Неплохо, да?
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
                    Салон эротического массажа Podium всегда готов помочь вам в подборе девушки! Вы можете рассказать администратору о своих предпочтениях, и она предложит вам самые подходящие варианты!
                </p>
                <p className="text-[14.5px] leading-relaxed text-foreground-muted">
                    Если вам кажется, что большой выбор массажисток не имеет значения, мы попробуем вас переубедить! Представьте: вы приходите на программу БДСМ релакса с Госпожой (да, такие у нас тоже есть), а проводит её миниатюрная девушка с тонким голоском. Диссонанс, да?
                </p>
                <p className="text-[14.5px] leading-relaxed text-foreground-muted">
                    Именно по этой причине все наши мастера совершенно разные! Есть и стройные, и с формами, высокие и малышки, грубые и нежные. А ещё один интересный факт — у нас немало девушек с силиконовой грудью, а есть и те, у кого натуральная. По этому параметру мужчинам тоже удобно выбирать себе спутницу!
                </p>
                <p className="text-[14.5px] leading-relaxed text-foreground-muted">
                    Ну а самым ненасытным гостям нашего салона эротического массажа мы сможем предложить интересные тандемы — многие наши девочки отлично работают в парах! Всё зависит только от вашего желания!
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-foreground-faint italic">
                    Салон не предоставляет услуги интимного характера!
                </p>
            </div>
        </div>
    </section>
);
