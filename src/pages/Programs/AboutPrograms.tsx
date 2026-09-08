import { Check } from "lucide-react"

const CHECKLIST = [
    "У нас собрано множество услуг для отдыха",
    "Вы сможете отдохнуть у нас и 30, и 60, и все 180 минут",
    "Мы расслабляем не только физически, но и эмоционально",
    "Наши администраторы помогут вам при выборе программы",
    "Все процедуры выполняются профессиональными мастерами",
    "Вы можете заказать программу на выезд",
]

export const AboutPrograms = () => (
    <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
        <h2
            className="mb-10 max-w-165 text-[28px] leading-tight font-medium text-foreground sm:text-[32px] md:mb-14 md:text-[36px]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
            Программы в салоне эротического массажа <em className="text-accent-light">PODIUM</em>
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
                <p className="mb-6 text-[14.5px] leading-relaxed text-foreground-muted">
                    Эротический салон Podium — это место, где вы можете воплотить все свои потаённые желания в
                    жизнь. Дайте волю фантазии, а наши девушки порадуют вас своими умениями в сфере релакса.
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
                    Наша задача — организовать досуг, после которого вы почувствуете максимальное расслабление и
                    получите незабываемые эмоции.
                </p>
                <p className="text-[14.5px] leading-relaxed text-foreground-muted">
                    Салон эротического массажа Podium всегда учитывает желания гостей. Если в нашем каталоге вы не
                    нашли подходящей услуги, наши администраторы могут организовать вам отдых по индивидуальным
                    предпочтениям.
                </p>
                <p className="text-[14.5px] leading-relaxed text-foreground-muted">
                    С нами вы можете делиться самым сокровенным. Мы уважаем тайну частной жизни наших гостей и
                    никогда не передаём информацию об их досуге третьим лицам.
                </p>
                <p className="text-[14.5px] leading-relaxed text-foreground-muted">
                    Ещё один интересный бонус Podium — у нас могут отдыхать не только мужчины. Мы разработали
                    программы для девушек, а также для пар.
                </p>

                <p className="mt-2 text-[12px] leading-relaxed text-foreground-faint italic">
                    Салон не предоставляет услуги интимного характера!
                </p>
            </div>
        </div>
    </section>
)
