import Image from "next/image"

const CATEGORIES = [
    {
        name: 'Массаж для пар',
        photo: '/category/c8e46118e7baae97c-1024x683-1.jpg',
        bio: 'Сделайте свои отношения более яркими и страстными, приходите на сеанс эротического массажа для пар. Наши девушки очаруют и вас, и вашу вторую половинку!'
    },
    {
        name: 'Массаж с двумя девушками',
        photo: '/category/1111-e1672153331538-1024x1024-1.jpg',
        bio: 'Мечтаете провести время в компании обворожительных красоток, которые еще и подарят вам незабываемый релакс?'
    },
    {
        name: 'Урологический массаж',
        photo: '/category/photo_2023-10-11_14-40-14-1.jpg.webp',
        bio: 'Полезная и приятная процедура, которая притягивает внимание многих мужчин. Позвольте себе смелый отдых и посетите одну из программ нашего салона!'
    },
]

export const Categories = () => {
    return (
        <section className="mx-auto w-full max-w-340 px-6 py-16 md:px-14 md:py-24">
            <h2
                className="mb-9 text-[32px] leading-none font-medium text-foreground sm:text-[38px] md:text-[44px]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
                Категории
            </h2>
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {CATEGORIES.map(({ name, bio, photo }) => (
                    <div key={name} className="flex flex-col gap-4">
                        <div className="relative aspect-square w-full overflow-hidden rounded-sm">
                            <Image
                                src={photo}
                                alt={name}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-[19px] font-semibold text-foreground">{name}</p>
                            <p className="text-[14px] leading-relaxed text-foreground-muted">{bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}