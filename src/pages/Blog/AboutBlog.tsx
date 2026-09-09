import { Check } from "lucide-react";
import { CHECKLIST } from "./constants";

export const AboutBlog = () => (
    <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
        <h2
            className="mb-10 max-w-165 text-[28px] leading-tight font-medium text-foreground sm:text-[32px] md:mb-14 md:text-[36px]"
            style={{ fontFamily: "var(--font-cormorant), Arial, sans-serif" }}
        >
            Статьи об эротическом массаже в салоне <em className="text-accent-light">PODIUM</em>
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
                <p className="mb-6 text-[14.5px] leading-relaxed text-foreground-muted">
                    Если вы хотите приоткрыть для себя завесу тайны и узнать чуточку больше о мире эротики, наши статьи для этого отлично подойдут! Здесь мы обсуждаем все: от классических техник релакса до самых смелых и откровенных программ.
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
                    Первый шаг к мечте – решиться на смелый шаг. Для кого-то это прыжок с парашютом, ну а для кого-то – поход в салон эротического массажа. В своих статьях мы рассматриваем самые распространенные страхи мужчин перед подобного рода отдыхом и рассказываем, как с ними бороться.
                </p>
                <p className="text-[14.5px] leading-relaxed text-foreground-muted">
                    Не обходим стороной и пользу эротического отдыха. Разумеется, такой досуг нельзя назвать лечебным, но некоторые проблемы он все же решить способен. Ну а единственный способ проверить, поможет ли справиться с вашими внутренними демонами сеанс в Podium, можно одним единственным способом. Посетив нас!
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-foreground-faint italic">
                    Салон не предоставляет услуги интимного характера!
                </p>
            </div>
        </div>
    </section>
);
