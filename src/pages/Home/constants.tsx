import { Crown, Gift, Heart, Infinity, Martini } from "lucide-react";

export const VIDEOS = [
    "/home/about/podium-part-5.mp4",
    "/home/about/untitled.mp4",
    "/home/about/img_3602.mov",
]

export const POINTS = [
    {
        ru: "Во-первых, у нас собраны совершенно разные типажи. А это значит, любой гость найдёт здесь спутницу себе под стать.",
        en: "First, we bring together a truly diverse range of types — so every guest will find a companion who suits them perfectly.",
    },
    {
        ru: "Во-вторых, все они — профессионалки своего дела. Обучение и опыт позволяют им находить подход даже к самому избалованному мужчине.",
        en: "Second, they're all true professionals. Their training and experience let them find the right approach even for the most demanding man.",
    },
    {
        ru: "В-третьих, они умеют не только работать руками, но и слушать. Можете открыться нашим чаровницам — они сохранят все ваши секреты.",
        en: "Third, they know how to do more than just use their hands — they know how to listen. Feel free to open up to our enchantresses; your secrets are always safe.",
    },
]

export const PHOTOS = [
    "/home/interior/img_9281.avif",
    "/home/interior/img_9282.avif",
    "/home/interior/img_9284.avif",
    "/home/interior/img_9291.avif",
    "/home/interior/img_9294.avif",
    "/home/interior/img_9296.avif",
    "/home/interior/img_9297.avif",
    "/home/interior/img_9300.avif",
]

export const CATEGORY_ICONS = [Gift, Martini, Crown, Heart, Infinity]

export const PROMOS = [
    {
        title: { ru: "Счастливый билет!", en: "Lucky Ticket!" },
        description: { ru: "Беспроигрышная лотерея!", en: "A can't-lose lottery!" },
        image: "/home/promo/pod_vbrmn_banner_long.png.avif",
    },
    {
        title: { ru: "Коктейльная вечеринка!", en: "Cocktail Party!" },
        description: { ru: "Каждый четверг коктейльная вечеринка в Podium spa", en: "Every Thursday is cocktail night at Podium Spa" },
        image: "/home/promo/vecherinka-koktejlnaya-1.png.avif",
    },
    {
        title: { ru: "Мы рады не только мужчинам..", en: "We welcome women too.." },
        description: { ru: "Приятный бонус для милых дам!", en: "A lovely bonus for our lady guests!" },
        image: "/home/promo/solyarij-1.png.avif",
    },
    {
        title: { ru: "Днем с огнем!", en: "Hard to Find Elsewhere!" },
        description: { ru: "Приятный бонус для любителей отдохнуть по будням", en: "A nice bonus for weekday relaxation lovers" },
        image: "/home/promo/vip-programmy.png.avif",
    },
    {
        title: { ru: "Двойной экстаз", en: "Double Ecstasy" },
        description: { ru: "Специально для наших мужчин массаж  в 4 руки в подарок!", en: "A complimentary four-hand massage, just for our men!" },
        image: "/home/promo/lesbi.png.avif",
    },
]

export const QUESTIONS = [
    {
        key: "hairColor",
        title: { ru: "Предпочитаемый цвет волос?", en: "Preferred hair color?" },
        options: [
            { ru: "Блондинка", en: "Blonde" },
            { ru: "Брюнетка", en: "Brunette" },
            { ru: "Рыжая", en: "Redhead" },
            { ru: "Русая", en: "Light brown" },
        ],
    },
    {
        key: "breastSize",
        title: { ru: "Какой размер груди Вы предпочитаете?", en: "What bust size do you prefer?" },
        options: [
            { ru: "1 - 1.5 (маленькая)", en: "1 – 1.5 (small)" },
            { ru: "2 - 3 (средняя)", en: "2 – 3 (medium)" },
            { ru: "3.5 + (большая)", en: "3.5+ (large)" },
        ],
    },
    {
        key: "height",
        title: { ru: "Предпочитаемый рост?", en: "Preferred height?" },
        options: [
            { ru: "150 - 160 см", en: "150–160 cm" },
            { ru: "160 - 170 см", en: "160–170 cm" },
            { ru: "170 - 180 см", en: "170–180 cm" },
            { ru: "180 + см", en: "180+ cm" },
        ],
    },
    {
        key: "bodyType",
        title: { ru: "Какое телосложение Вы предпочитаете?", en: "What body type do you prefer?" },
        options: [
            { ru: "Очень худая", en: "Very slim" },
            { ru: "Стройная", en: "Slender" },
            { ru: "Спортивная", en: "Athletic" },
            { ru: "Пухленькая", en: "Curvy" },
        ],
    },
    {
        key: "age",
        title: { ru: "Возраст", en: "Age" },
        options: [
            { ru: "18 - 21", en: "18–21" },
            { ru: "22 - 25", en: "22–25" },
            { ru: "26 - 30", en: "26–30" },
            { ru: "Не имеет значения", en: "No preference" },
        ],
    },
    {
        key: "location",
        title: { ru: "Где желаете отдохнуть?", en: "Where would you like to relax?" },
        options: [
            { ru: "У себя", en: "At my place" },
            { ru: "В салоне", en: "At the salon" },
        ],
    },
] as const

export const TOTAL_STEPS = QUESTIONS.length
export const CONTACT_STEP = TOTAL_STEPS + 1
export const SUCCESS_STEP = TOTAL_STEPS + 2

export const STEP_IMAGES = [
    "/home/quiz/choise-form-start.png.avif",
    "/home/quiz/choise-form-1.jpg.avif",
    "/home/quiz/choise-form-2.jpg.avif",
    "/home/quiz/choise-form-3.jpg.avif",
    "/home/quiz/choise-form-4.jpg.avif",
    "/home/quiz/choise-form-5.jpg.avif",
    "/home/quiz/choise-form-6.jpg.avif",
    "/home/quiz/choise-form-end.jpg.avif",
    "/home/quiz/choise-form-end.jpg.avif",
]

export const GRADIENTS = [
    "linear-gradient(200deg,#3a1226,#100609)",
    "linear-gradient(200deg,#241019,#0d0608)",
    "linear-gradient(200deg,#2e1420,#0f070c)",
    "linear-gradient(200deg,#2c1018,#0d0608)",
];

export const ADVANTAGES = [
    {
        text: {
            ru: "Каждый день работает не менее 15 девушек. Всего в штате 100 соблазнительных и профессиональных массажисток",
            en: "At least 15 girls work every day. Our full team includes 100 seductive, professional masseuses.",
        },
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
                <path d="M3.5 20c0-3.3 2.5-5 5.5-5s5.5 1.7 5.5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                <circle cx="17" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.7" />
                <path d="M14.8 20c.2-2.7 1.9-4.1 3.7-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        text: {
            ru: "Фотографии на сайте соответствуют действительности, вы всегда можете познакомиться с девушками «заочно»",
            en: "The photos on our site are 100% real — you can always get to know the girls beforehand.",
        },
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="7" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="M8.5 7 10 4.5h4L15.5 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="13.5" r="3.4" stroke="currentColor" strokeWidth="1.7" />
            </svg>
        ),
    },
    {
        text: {
            ru: "Широкий ассортимент программ позволяет выбрать сеанс на любой бюджет и любые предпочтения",
            en: "A wide range of programs lets you choose a session for any budget and any preference.",
        },
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
                <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
                <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
                <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
            </svg>
        ),
    },
    {
        text: {
            ru: "Салон предоставляет услуги на выезд без потери качества исполнения",
            en: "The salon also offers outcall service without any drop in quality.",
        },
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4.5 16V11l1.8-4.5h11.4L19.5 11v5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M4.5 13.5h15" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="7.8" cy="16.8" r="1.5" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="16.2" cy="16.8" r="1.5" stroke="currentColor" strokeWidth="1.7" />
            </svg>
        ),
    },
    {
        text: {
            ru: "Удобное расположение салона позволит без труда добраться из любой части Москвы на общественном или личном транспорте",
            en: "Our convenient location makes it easy to get here from anywhere in Moscow, by public or private transport.",
        },
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11Z" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.7" />
            </svg>
        ),
    },
    {
        text: {
            ru: "Апартаменты VIP-класса и высокий уровень обслуживания",
            en: "VIP-class apartments and a high standard of service.",
        },
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 17h16l-1.4-8-4.1 3.2L12 6l-2.5 6.2L5.4 9 4 17Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
        ),
    },
];
